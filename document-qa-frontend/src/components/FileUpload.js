import React from 'react';

function FileUpload({ onUpload }) {
    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onUpload(file);
        }
    };

    return (
        <div style={{ marginBottom: '1rem' }}>
            <h4>Upload PDF</h4>
            <input type="file" accept="application/pdf" onChange={handleChange} />
        </div>
    );
}

export default FileUpload;
