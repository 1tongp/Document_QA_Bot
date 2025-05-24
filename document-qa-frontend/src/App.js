// import React, { useState } from 'react';
// import FileUpload from './components/FileUpload';
// import QuestionBox from './components/QuestionBox';
// import ChatHistory from './components/ChatHistory';
// import { uploadPDF, askQuestion } from './services/api';

// function App() {
//   const [text, setText] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);

//   const handlePDFUpload = async (file) => {
//     try {
//       const res = await uploadPDF(file);
//       setText(res.data.text);
//       setChatHistory([]);  
//     } catch (err) {
//       console.error("Upload failed:", err);
//     }
//   };


//   const MAX_MESSAGES = 12;  // e.g. last 6 user+bot exchanges

//   const handleAsk = async (question) => {
//     const newUserMsg = {
//       role: 'user',
//       content: question,
//       time: new Date().toLocaleTimeString()
//     };
//     const updatedMessages = [...chatHistory, newUserMsg];
//     const trimmedMessages = updatedMessages.slice(-MAX_MESSAGES);
//     try {
//       const res = await askQuestion(trimmedMessages, text);
//       const botMsg = {
//         role: 'assistant',
//         content: res.data.answer,
//         time: new Date().toLocaleTimeString()
//       };

//       setChatHistory([...updatedMessages, botMsg]);
//     } catch (err) {
//       console.error("Ask failed", err);
//     }
//   };


//   return (
//     <div>
//       <h2>Document Q&A Bot</h2>
//       <FileUpload onUpload={handlePDFUpload} />
//       <QuestionBox onAsk={handleAsk} />
//       <ChatHistory messages={chatHistory} />
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import QuestionBox from './components/QuestionBox';
import ChatHistory from './components/ChatHistory';
import { uploadPDF, askQuestion } from './services/api';

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [contextChunks, setContextChunks] = useState([]);

  const handlePDFUpload = async (file) => {
    try {
      await uploadPDF(file);
      setChatHistory([]);  // Clear chat after new upload
      setContextChunks([]);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const MAX_MESSAGES = 12;

  const handleAsk = async (question) => {
    const newUserMsg = {
      role: 'user',
      content: question,
      time: new Date().toLocaleTimeString()
    };
    const updatedMessages = [...chatHistory, newUserMsg];
    const trimmedMessages = updatedMessages.slice(-MAX_MESSAGES);

    try {
      const res = await askQuestion(trimmedMessages); // <-- No more text
      const botMsg = {
        role: 'assistant',
        content: res.data.answer,
        chunks: res.data.context_chunks || [],
        context: res.data.context || '',
        time: new Date().toLocaleTimeString()
      };

      setChatHistory([...updatedMessages, botMsg]);
      setContextChunks(res.data.context_chunks || []);
    } catch (err) {
      console.error("Ask failed", err);
    }
  };

  return (
    <div>
      <h2>Document Q&A Bot</h2>
      <FileUpload onUpload={handlePDFUpload} />
      <QuestionBox onAsk={handleAsk} />
      <ChatHistory messages={chatHistory} />

      {contextChunks.length > 0 && (
        <div style={{ padding: '1rem', marginTop: '1rem', backgroundColor: '#f9f9f9' }}>
          <h4>📄 Context Used:</h4>
          <ul>
            {contextChunks.map((chunk, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>
                <pre style={{ whiteSpace: 'pre-wrap' }}>{chunk}</pre>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
