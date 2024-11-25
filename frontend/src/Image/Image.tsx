import React, {useState} from 'react';
import axios from 'axios';
import Upload from './Upload';

// upload to parent component
interface UploadProps{
    responseUpload: (response_data: string) => void;
}

const ImageFrame: React.FC<UploadProps> = ({responseUpload}) => {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Handle from subcomponent
    const handleFileUpload = (selectedFile: File) => {
        setFile(selectedFile);
    };


    // Submit image
    const handleSubmit = () => {
        if (file) {
            setIsLoading(true)
            const formData = new FormData();
            formData.append('image', file);

            axios.post('http://127.0.0.1:5000/receipts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log(response.data.message);
                    responseUpload(response.data.message);
                })
                .catch(error => {
                    console.error('There was an error uploading the file!', error);
                })
                .finally(() => {
                    setIsLoading(false)
                });
        } else {
            alert("No file uploaded!");
        }
    };

    return (
        <div className={`relative ${isLoading ? 'opacity-50 pointer-events-none':''}`}>
            <Upload onFileUpload={handleFileUpload}/>
            <div>
                <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ImageFrame;
