// import React from 'react';
// import Layout from '../../Constants/Layout';

// function ChatHistory({ messages, showVectorPanel }) {

//     return (
//         <div style={styles.chatContainer(showVectorPanel)}>
//             {messages.map((msg, index) => (
//                 <div
//                     key={index}
//                     style={{
//                         ...styles.chatBubble,
//                         ...(msg.role === 'user' ? styles.user : styles.bot)
//                     }}
//                 >
//                     <div style={styles.bubbleContent}>
//                         <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong>
//                         {msg.role === 'bot' ? (
//                             msg.content.split(/\n{2,}|\.\s+/).map((line, i) => (
//                                 <div key={i} style={{ marginTop: '4px' }}>
//                                     {line.trim()}
//                                 </div>
//                             ))
//                         ) : (
//                             ` ${msg.content}`
//                         )}
//                     </div>

//                     {/* <div style={styles.bubbleContent}>
//                         <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.context}
//                     </div> */}
//                     <div style={styles.timestamp}>{msg.time}</div>
//                 </div>
//             ))}
//         </div>
//     );
// }

// const styles = {
//     chatContainer: (showVectorPanel) => ({
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '0.5rem',
//         marginTop: '1rem',
//         marginLeft: Layout.smallMargin,
//         maxWidth: showVectorPanel ? 'calc(100% - 85px)' : '95%',
//         transition: 'max-width 0.3s ease-in-out',
//     }),
    
//     chatBubble: {
//         padding: '10px 14px',
//         borderRadius: '16px',
//         maxWidth: '80%',
//         position: 'relative',
//         wordWrap: 'break-word',
//     },
//     user: {
//         backgroundColor: '#daf1ff',
//         alignSelf: 'flex-end',
//         textAlign: 'right',
//     },
//     bot: {
//         backgroundColor: '#f0f0f0',
//         alignSelf: 'flex-start',
//         textAlign: 'left',
//     },
//     bubbleContent: {
//         fontSize: '14px',
//     },
//     timestamp: {
//         fontSize: '10px',
//         color: '#777',
//         marginTop: '4px',
//     }
// };

// export default ChatHistory;


import React, { useEffect, useRef } from 'react';
import Layout from '../../Constants/Layout';

function ChatHistory({ messages, showVectorPanel }) {
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div style={styles.chatContainer(showVectorPanel)}>
            {messages.map((msg, index) => (
                <div
                    key={index}
                    style={{
                        ...styles.chatBubble,
                        ...(msg.role === 'user' ? styles.user : styles.bot)
                    }}
                >
                    <div style={styles.bubbleContent}>
                        <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong>
                        {msg.role === 'bot' ? (
                            msg.content.split(/\n{2,}|\.\s+/).map((line, i) => (
                                <div key={i} style={{ marginTop: '4px' }}>
                                    {line.trim()}
                                </div>
                            ))
                        ) : (
                            ` ${msg.content}`
                        )}
                    </div>
                    <div style={styles.timestamp}>{msg.time}</div>
                </div>
            ))}
            <div ref={chatEndRef} />
        </div>
    );
}

const styles = {
    chatContainer: (showVectorPanel) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginTop: '1rem',
        marginLeft: Layout.smallMargin,
        maxWidth: showVectorPanel ? 'calc(100% - 85px)' : '95%',
        transition: 'max-width 0.3s ease-in-out',
        overflowY: 'auto',
        maxHeight: '80vh',
    }),
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
