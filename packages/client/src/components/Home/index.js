import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from 'axios';

function Dropzone() {
    const onDrop = useCallback(async acceptedFiles => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("file", file);

        // replace with your server URL
        const res = await axios.post("/api/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (res.data) {
            console.log('Image uploaded successfully');
        }
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the image here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}

export default Dropzone;
