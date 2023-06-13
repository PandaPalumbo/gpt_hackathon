require('dotenv').config();
const path = require('path')
const cors = require('cors');
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer');
const vision = require('@google-cloud/vision');
const jsonminify = require("jsonminify");


const client = new vision.ImageAnnotatorClient({
    keyFilename: "./API.json"
});
const upload = multer({dest: 'uploads/'});

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "YOUR_API_KEY_HERE",
});
const openai = new OpenAIApi(configuration);


async function generateAdViaGPT(visionAIResult){
    try{
        return await openai.createCompletion({
            max_tokens: 2700,
            model: "text-davinci-003",
            prompt: `Generate an ad for this item based on this JSON data: ${jsonminify(JSON.stringify(visionAIResult))}`,
        });
    } catch (e) {
        console.error(e)
    }
}

const app = express();
app.use(cors({
    origin: '*'
}))
app.use(bodyParser.json())

app.post('/api/upload', upload.single('file'), async (req, res, next) => {
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
        console.log(result);
        const GPTAd = await generateAdViaGPT(result);
        console.log(GPTAd);
        res.json(result);

    } catch (error) {
        console.error(error);
    }
});


app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use(express.static("../client/public"));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Listen on the port ${PORT}`));
