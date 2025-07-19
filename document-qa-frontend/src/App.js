import React, { useState, useEffect } from 'react';
import FileUpload from './components/Upload/FileUpload';
import QuestionBox from './components/Chat/QuestionBox';
import ChatHistory from './components/Chat/ChatHistory';
import { uploadPDF, askQuestion, verifyPassword, requestPassword } from './services/api';
import MainLayout from './layouts/MainLayout';

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [contextChunks, setContextChunks] = useState([]);
  const [accessGranted, setAccessGranted] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [uploadedDocs, setUploadedDocs] = useState([]);


  const MAX_MESSAGES = 12;
  
  const handlePDFUpload = async (file) => {
    try {
      await uploadPDF(file);
      setUploadedDocs(prev => [...prev, file.name]);
      setChatHistory([]);
      setContextChunks([]);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleAsk = async (question) => {
    const newUserMsg = {
      role: 'user',
      content: question,
      time: new Date().toLocaleTimeString()
    };
    const updatedMessages = [...chatHistory, newUserMsg];
    const trimmedMessages = updatedMessages.slice(-MAX_MESSAGES);

    try {
      const res = await askQuestion(trimmedMessages);
      if (res.data.warning === 'no_document') {
        alert("📄 Please upload a document before asking.");
        return;
      }
      const botMsg = {
        role: 'bot',
        content: res.data.answer,
        chunks: res.data.chunks_used || [],
        context: res.data.context || '',
        time: new Date().toLocaleTimeString()
      };
      setChatHistory([...updatedMessages, botMsg]);
      setContextChunks(res.data.chunks_used || []);
    } catch (err) {
      console.error("Ask failed", err);
    }
  };

  const handleSubmit = async () => {
    if (!password || password.length !== 6) {
      setError('Please enter a 6-digit code.');
      return;
    }

    try {
      setError('');
      const res = await verifyPassword(password);

      if (res.data.success) {
        setAccessGranted(true);
      } else {
        setError('Invalid code. Please try again.');
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError('Invalid or expired code.');
      } else {
        setError('Server error. Please try again later.');
      }
    }
  };
  
  
  

  // useEffect(() => {
  //   requestPassword(); // auto-send the code when page loads
  // }, []);

  if (!accessGranted) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>🔒 Enter Access Code</h2>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter code"
        />
        <button onClick={handleSubmit}>Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  return (
    <MainLayout
      messages={chatHistory}
      onUpload={handlePDFUpload}
      onAsk={handleAsk}
      uploadedDocs={uploadedDocs}
    />
  );
}

export default App;
