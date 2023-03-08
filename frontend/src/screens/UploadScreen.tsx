import React, { useState } from 'react';

function UploadForm() {
    const [file, setFile] = useState<File | null>(null);

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedFile = event.target.files?.[0];
        setFile(selectedFile || null);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            console.error('Upload failed:', response.statusText);
        } else {
            console.log('Upload successful!');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Choose a file:
                <input type="file" accept="image/,video/" onChange={handleFileChange} />
            </label>
            <button type="submit" disabled={!file}>Upload</button>
        </form>
    );
}

export default UploadForm;