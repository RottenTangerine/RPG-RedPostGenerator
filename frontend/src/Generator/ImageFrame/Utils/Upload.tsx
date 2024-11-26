import React, {useEffect, useRef, useState} from 'react';

interface UploadProps {
    onFileUpload: (file: File) => void;
}

const ImageUpload: React.FC<UploadProps> = ({onFileUpload}) => {
    const dropzoneRef = useRef<HTMLDivElement | null>(null);
    const [previewSrc, setPreviewSrc] = useState<string>('');
    const [isIllegalInput, setIsIllegalInput] = useState<boolean>(false);

    useEffect(() => {
        const dropzone = dropzoneRef.current;

        if (!dropzone) return;

        const handleDragOver = (e: DragEvent) => {
            e.preventDefault();
            dropzone.classList.add('border-indigo-600');
        };

        const handleDragLeave = (e: DragEvent) => {
            e.preventDefault();
            dropzone.classList.remove('border-indigo-600');
        };

        const handleDrop = (e: DragEvent) => {
            e.preventDefault();
            dropzone.classList.remove('border-indigo-600');
            const file = e.dataTransfer?.files[0];
            if (file && isValidFileType(file)) {
                setIsIllegalInput(false)
                displayPreview(file);
            } else {
                setIsIllegalInput(true);
            }
        };

        const handleChange = (e: Event) => {
            const input = e.target as HTMLInputElement;
            const file = input.files?.[0];
            if (file && isValidFileType(file)) {
                setIsIllegalInput(false)
                displayPreview(file);
            } else {
                setIsIllegalInput(true);
            }
        };

        const isValidFileType = (file: File) => {
            const allowedTypes = ['image/png', 'image/jpeg'];
            return allowedTypes.includes(file.type);
        };

        const displayPreview = (file: File) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPreviewSrc(reader.result as string);
            };
            onFileUpload(file);
        };

        dropzone.addEventListener('dragover', handleDragOver);
        dropzone.addEventListener('dragleave', handleDragLeave);
        dropzone.addEventListener('drop', handleDrop);

        const input = document.getElementById('file-upload') as HTMLInputElement;
        input.addEventListener('change', handleChange);

        return () => {
            dropzone.removeEventListener('dragover', handleDragOver);
            dropzone.removeEventListener('dragleave', handleDragLeave);
            dropzone.removeEventListener('drop', handleDrop);
            input.removeEventListener('change', handleChange);
        };
    }, []);

    return (
        <div className="w-[400px] relative border-2 border-gray-300 border-dashed rounded-lg p-6 hover:border-blue-600" ref={dropzoneRef}>
            <input type="file" id="file-upload" accept="image/png, image/jpeg"
                   className="absolute inset-0 w-full h-full opacity-0 z-50"/>
            <div className="text-center">
                <img className="mx-auto h-12 w-12" src="https://www.svgrepo.com/show/357902/image-upload.svg"
                     alt="Upload Icon"/>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                    <label htmlFor="file-upload" className="relative cursor-pointer">
                        <span>Drag and drop</span>
                        <span className="text-indigo-600"> or browse</span>
                        <span> to upload</span>
                    </label>
                </h3>
                <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 10MB</p>
                {isIllegalInput && <p className="mt-4 text-xs text-red-600">Invalid input</p>}
            </div>
            {previewSrc && <img src={previewSrc} className="mt-4 mx-auto max-h-40" alt="Preview"/>}

        </div>
    );
};

export default ImageUpload;
