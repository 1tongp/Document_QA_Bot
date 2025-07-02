import React from 'react';

function ChatHistory({ messages }) {
    return (
        <div style={styles.chatContainer}>
            {messages.map((msg, index) => (
                <div
                    key={index}
                    style={{
                        ...styles.chatBubble,
                        ...(msg.role === 'user' ? styles.user : styles.bot)
                    }}
                >
                    <div style={styles.bubbleContent}>
                        <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
                    </div>
                    <div style={styles.bubbleContent}>
                        <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.context}
                    </div>
                    <div style={styles.timestamp}>{msg.time}</div>
                </div>
            ))}
        </div>
    );
}

const styles = {
    chatContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginTop: '1rem',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    chatBubble: {
        padding: '10px 14px',
        borderRadius: '16px',
        maxWidth: '80%',
        position: 'relative',
        wordWrap: 'break-word',
    },
    user: {
        backgroundColor: '#daf1ff',
        alignSelf: 'flex-end',
        textAlign: 'right',
    },
    bot: {
        backgroundColor: '#f0f0f0',
        alignSelf: 'flex-start',
        textAlign: 'left',
    },
    bubbleContent: {
        fontSize: '14px',
    },
    timestamp: {
        fontSize: '10px',
        color: '#777',
        marginTop: '4px',
    }
};

export default ChatHistory;
