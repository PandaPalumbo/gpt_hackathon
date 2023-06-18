import React, {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import axios from 'axios';
import {Col, Row} from "react-bootstrap";

function Dropzone({onUpload, setLoading}) {
    const [condition, setCondition] = useState("");
    const [ageSize, setAgeSize] = useState("");
    const [type, setType] = useState("");
    const [season, setSeason] = useState("");
    const [occasion, setOccasion] = useState("");
    const [gender, setGender] = useState("");
    const [brand, setBrand] = useState("");
    const [tags, setTags] = useState("");
    const [shipping, setShipping] = useState("");
    const [previewSrc, setPreviewSrc] = useState(null); // New state for storing image URL

    const onDrop = useCallback(async acceptedFiles => {
        setLoading(true);
        const file = acceptedFiles[0];
        setPreviewSrc(URL.createObjectURL(file)); // Generate and store the image URL
        const formData = new FormData();
        formData.append("file", file);
        formData.append("condition", condition);
        formData.append("ageSize", ageSize);
        formData.append("type", type);
        formData.append("season", season);
        formData.append("occasion", occasion);
        formData.append("gender", gender);
        formData.append("brand", brand);
        formData.append("tags", tags);
        formData.append("shipping", shipping);

        // replace with your server URL
        const res = await axios.post("/api/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (res.data) {
            onUpload(res.data);
            setLoading(false);
        }
    }, [onUpload]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    const dropzoneStyle = {
        border: "2px dashed #aaa",
        borderRadius: "5px",
        padding: "20px",
        width: "400px",
        height: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#eee",
        color: "#aaa",
        margin: "auto"
    };

    const selectStyle = {
        margin: 10,
        width: "100%"
    }

    return (
        <Col style={{alignItems: "center"}}>
            <Row>
                <Col style={dropzoneStyle}   {...getRootProps()} >
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </Col>
                <Col>
                    {
                        previewSrc ?
                        <div style={{margin: '1em auto'}}>
                            <img src={previewSrc} alt="Preview" style={{maxWidth: '50%', maxHeight: '50%'}}/>
                        </div> :
                        <h1 style={{textAlign: 'center', margin: "auto", maxWidth: '50%', maxHeight: '50%'}}>
                            Your image will Display here
                        </h1>
                    }
                </Col>
            </Row>
            <Row style={{textAlign: 'center', padding: 10}}>
                <h3>Select some descriptors for your item:</h3>
                <Col>
                    <select style={selectStyle} value={condition} onChange={(e) => setCondition(e.target.value)}>
                        <option value="NWT">New With Tags - NWT</option>
                        <option value="NWOT">New Without Tags - NWOT</option>
                        <option value="LN">Like New - LN</option>
                        <option value="EUC">Excellent Used Condition - EUC</option>
                        <option value="GUC">Good Used Condition - GUC</option>
                        <option value="FUC">Fair Used Condition - FUC</option>
                        <option value="PC">Poor Condition - PC</option>
                    </select>
                </Col>
                <Col>
                    <select style={selectStyle} value={ageSize} onChange={(e) => setAgeSize(e.target.value)}>
                        <optgroup label="Baby">
                            <option value="0-3m">0-3m</option>
                            <option value="3-6m">3-6m</option>
                            <option value="6-9m">6-9m</option>
                            <option value="9-12m">9-12m</option>
                            <option value="12-18m">12-18m</option>
                            <option value="18-24m">18-24m</option>
                        </optgroup>
                        <optgroup label="Toddler">
                            <option value="2T">2T</option>
                            <option value="3T">3T</option>
                            <option value="4T">4T</option>
                            <option value="5T">5T</option>
                        </optgroup>
                        <optgroup label="Kids">
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </optgroup>
                        <optgroup label="Adult">
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </optgroup>
                    </select>
                </Col>
                <Col>
                    <select style={selectStyle} value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="Tops">Tops</option>
                        <option value="Bottoms">Bottoms</option>
                        <option value="Dresses">Dresses</option>
                        <option value="Outerwear">Outerwear</option>
                        <option value="Sleepwear">Sleepwear</option>
                        <option value="Underwear">Underwear</option>
                        <option value="Swimwear">Swimwear</option>
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <select style={selectStyle} value={season} onChange={(e) => setSeason(e.target.value)}>
                        <option value="Summer">Summer</option>
                        <option value="Winter">Winter</option>
                        <option value="Fall">Fall</option>
                        <option value="Spring">Spring</option>
                    </select>
                </Col>
                <Col>
                    <select style={selectStyle} value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                        <option value="Casual">Casual</option>
                        <option value="Formal">Formal</option>
                        <option value="Business Casual">Business Casual</option>
                        <option value="Costumes">Costumes</option>
                        <option value="Sportswear">Sportswear</option>
                        <option value="School">School</option>
                        <option value="Uniform">Uniform</option>
                    </select>
                </Col>
                <Col>
                    <select style={selectStyle} value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Gender Neutral">Gender Neutral</option>
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input placeholder={'Type the brand here'} type={'text'} style={selectStyle} value={brand} onChange={(e) => setBrand(e.target.value)}/>
                </Col>
                <Col>
                    <select style={selectStyle} value={shipping} onChange={(e) => setShipping(e.target.value)}>
                        <option value="Standard">Standard</option>
                        <option value="Express">Express</option>
                        <option value="Free Shipping">Free Shipping</option>
                        <option value="Local Pickup">Local Pickup</option>
                        <option value="Combined Shipping">Combined Shipping</option>
                        <option value="International">International</option>
                    </select>
                </Col>
            </Row>
        </Col>
    )
}

export default Dropzone;
