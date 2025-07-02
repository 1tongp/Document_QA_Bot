import React, { useState } from 'react';

function QuestionBox({ onAsk }) {
    const [question, setQuestion] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (question.trim()) {
            onAsk(question);
            setQuestion('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question..."
                style={{ width: '300px', marginRight: '10px' }}
            />
            <button type="submit">Ask</button>
        </form>
    );
}

export default QuestionBox;
