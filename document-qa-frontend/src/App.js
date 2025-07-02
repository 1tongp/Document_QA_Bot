import React, { useState } from 'react';
import FileUpload from './components/Upload/FileUpload';
import QuestionBox from './components/Chat/QuestionBox';
import ChatHistory from './components/Chat/ChatHistory';
import { uploadPDF, askQuestion } from './services/api';
import MainLayout from './layouts/MainLayout';

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
    // <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
    //   <h2>Document Q&A Bot</h2>
    //   <FileUpload onUpload={handlePDFUpload} />
    //   <QuestionBox onAsk={handleAsk} />
    //   <ChatHistory messages={chatHistory} />

    //   {contextChunks.length > 0 && (
    //     <div style={{ padding: '1rem', marginTop: '1rem', backgroundColor: '#f9f9f9' }}>
    //       <h4>📄 Context Used:</h4>
    //       <ul>
    //         {contextChunks.map((chunk, idx) => (
    //           <li key={idx} style={{ marginBottom: '0.5rem' }}>
    //             <pre style={{ whiteSpace: 'pre-wrap' }}>{chunk}</pre>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   )}
    // </div>
    <MainLayout
      messages={chatHistory}
      onUpload={handlePDFUpload}
      onAsk={handleAsk}
    />
  );
}
export default App;
