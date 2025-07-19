import React, { useState } from 'react';
import { Colors } from '../../Constants/Colors';
import { UI } from '../../Constants/Messages';

function QuestionBox({ onAsk, showVectorPanel }) {
    const [question, setQuestion] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (question.trim()) {
            onAsk(question);
            setQuestion('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={UI.ASK_QUESTION_PLACEHOLDER}
                style={{
                    ...styles.input,
                    width: showVectorPanel ? '300px' : '100%',
                }}
            />
            <button type="submit" style={styles.button}>{UI.ASK_BUTTON}</button>
        </form>
    );
}

const styles = {
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
    },
    input: {
        padding: '8px',
        fontSize: '14px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        flexGrow: 1,
    },
    button: {
        padding: '8px 16px',
        fontSize: '14px',
        border: 'none',
        backgroundColor: Colors.charcoal,
        color: 'white',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default QuestionBox;
