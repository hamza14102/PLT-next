import { useState } from 'react';
import MDInput from '/components/MDInput';
import MDButton from '/components/MDButton';

async function uploadImageToAPI(image) {
    const apiUrl = 'https://t141t9eeu2.execute-api.us-east-2.amazonaws.com/default/production-ai-s3-uploads-lambda'; // Replace this with your actual API endpoint
    const base64Image = await convertImageToBase64(image);

    const response = await fetch(apiUrl, {
        method: 'POST',
        body: base64Image,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Image upload failed');
    }

    const responseData = await response.json();
    return responseData;
}

async function convertImageToBase64(image) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]); // Extract base64 data from Data URL
        reader.onerror = reject;
        reader.readAsDataURL(image);
    });
}

function ImageUploader() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [response, setResponse] = useState(null);

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (selectedImage) {
            try {
                const response = await uploadImageToAPI(selectedImage);
                setResponse(response);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <MDInput type="file" accept="image/*" onChange={handleImageChange} />
            <MDButton onClick={handleUpload}>Upload Image</MDButton>
            {response && (
                <div>
                    <p>Response from API:</p>
                    <pre>{response['image_key']}</pre>
                </div>
            )}
        </div>
    );
}

export default ImageUploader;
