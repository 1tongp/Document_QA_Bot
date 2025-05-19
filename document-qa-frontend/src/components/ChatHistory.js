import React from 'react';
import './ChatHistory.css';

function ChatHistory({ messages }) {
    return (
        <div className="chat-container">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`chat-bubble ${msg.role === 'user' ? 'user' : 'bot'}`}
                >
                    <div className="bubble-content">
                        <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
                    </div>
                    <div className="timestamp">{msg.time}</div>
                </div>
            ))}
        </div>
    );
}

export default ChatHistory;
