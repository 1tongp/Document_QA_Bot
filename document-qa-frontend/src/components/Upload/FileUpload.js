import React from 'react';
import Layout from '../../Constants/Layout';
import { Colors } from '../../Constants/Colors';
import { UI } from '../../Constants/Messages';
import { Styles } from '../../Constants/Styles';

function FileUpload({ onUpload, showVectorPanel }) {
    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onUpload(file);
        }
    };

    return (
        <div style={styles.container(showVectorPanel)}>
            <h4 style={styles.heading}>{UI.UPLOAD_HEADING}</h4>
            <input
                type="file"
                accept="application/pdf"
                onChange={handleChange}
                style={styles.input}
            />
        </div>
    );
}

const styles = {
    container: (showVectorPanel) => ({
        padding: Layout.mediumMargin,
        marginBottom: Layout.mediumMargin,
        transition: 'width 0.3s ease',
        width: showVectorPanel ? 'calc(100% - 60px)' : '100%',
        backgroundColor: Colors.stoneLighter,
        border: `1px solid ${Colors.taupeLight}`,
        borderRadius: '8px',
        boxSizing: 'border-box',
    }),
    heading: {
        ...Styles.heading4,
        color: Colors.charcoal,
        marginBottom: Layout.smallMargin,
    },
    input: {
        cursor: 'pointer',
        fontSize: '14px',
        padding: '8px 12px',
        backgroundColor: '#fff',
        border: `1px solid ${Colors.taupeLight}`,
        borderRadius: '4px',
    },
};

export default FileUpload;
