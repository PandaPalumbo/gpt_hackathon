import React, {useState} from "react";
import Dropzone from '../Dropzone';
import {Spinner} from "react-bootstrap";

function Home() {
    const [uploadResult, setUploadResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = (result) => {
        setUploadResult(result);
    };

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px"
    };

    const columnStyle = {
        padding: "10px",
        margin: "auto",
        width: "75%",
    };

    const heightBox = {
        padding: 15,
        height: 500,
    }

    return (
        <div style={containerStyle}>
            <h1>
                Resale Writer AI
            </h1>
            <h3>
                Drop some images to begin!
            </h3>
            <div style={columnStyle}>
                <Dropzone setLoading={setLoading} onUpload={handleUpload}/>
            </div>
            <div style={{...columnStyle, ...heightBox}}>
                {
                    loading ? <Spinner/> :
                        uploadResult ?
                            <h3>{uploadResult}</h3>
                            :
                            <h3>
                                Your Ad will appear here once you've uploaded a picture!
                            </h3>
                }
            </div>
        </div>
    );
}

export default Home;
