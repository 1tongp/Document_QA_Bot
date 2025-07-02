import React from 'react';
import Layout from '../../Constants/Layout';

function FileUpload({ onUpload }) {
    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onUpload(file);
        }
    };

    return (
        <div style={styles.container}>
            <h4 style={styles.heading}>Upload PDF</h4>
            <input type="file" accept="application/pdf" onChange={handleChange} style={styles.input} />
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: '#F3F4F6', // Light gray background
        padding: Layout.mediumMargin,
        marginBottom: Layout.mediumMargin,
        // position: 'absolute',
        // right: '1rem', // Position the component to the right
        // top: '1rem',   // Adjust the vertical position as needed
    },
    heading: {
        marginBottom: Layout.smallMargin,
    },
    input: {
        cursor: 'pointer',
    },
};

export default FileUpload;
