require('dotenv').config();
const path = require('path')
const cors = require('cors');
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer');
const vision = require('@google-cloud/vision');
const jsonminify = require("jsonminify");
const { Configuration, OpenAIApi } = require("openai");
const cleanDeep = require("clean-deep");


const client = new vision.ImageAnnotatorClient({
    keyFilename: "./API.json"
});
const upload = multer({dest: 'uploads/'});

const configuration = new Configuration({
    apiKey: process.env.CHAT_GPT,
});
const openai = new OpenAIApi(configuration);


async function generateAdViaGPT(visionAIResult){
    try{
        let minify = jsonminify(JSON.stringify(cleanDeep(visionAIResult)));
        const {data} =  await openai.createCompletion({
            max_tokens: 1500,
            model: "text-davinci-003",
            prompt: `Generate an ad for this item based on this JSON data: ${minify}`,
        });
        return data.choices[0].text.replace('\n', ' ');
    } catch (e) {
        console.error(e)
        return 'Error generating ad, please try again!'
    }
}

const app = express();
app.use(cors({
    origin: '*'
}))
app.use(bodyParser.json())

app.post('/api/upload', upload.single('file'), async (req, res, next) => {
    const {body} = req;
    try {
        const [result] = await client.annotateImage({
            image: {
                source: {
                    filename: req.file.path
                }
            },
            features: [
                { type: 'LABEL_DETECTION' },
                { type: 'TEXT_DETECTION' },
                // { type: 'DOCUMENT_TEXT_DETECTION' },
                // { type: 'SAFE_SEARCH_DETECTION' },
                // { type: 'FACE_DETECTION' },
                // { type: 'LANDMARK_DETECTION' },
                { type: 'LOGO_DETECTION' },
                { type: 'IMAGE_PROPERTIES' },
                // { type: 'CROP_HINTS' },
                // { type: 'WEB_DETECTION' },
                // { type: 'OBJECT_LOCALIZATION' }
            ],
        });
        // For simplicity, we'll just log the result and send it as the response.
        const GPTAd = await generateAdViaGPT({...result, ...body});
        res.json(GPTAd);
    } catch (error) {
        return 'Error generating ad, please try again!'
    }
});


app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use(express.static("../client/public"));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Listen on the port ${PORT}`));
