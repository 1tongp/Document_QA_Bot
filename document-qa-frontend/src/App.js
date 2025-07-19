import React, { useState } from 'react';
import FileUpload from './components/Upload/FileUpload';
import QuestionBox from './components/Chat/QuestionBox';
import ChatHistory from './components/Chat/ChatHistory';
import { uploadPDF, askQuestion } from './services/api';
import MainLayout from './layouts/MainLayout';
import Login from './components/Authenication/Login';

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [contextChunks, setContextChunks] = useState([]);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const MAX_MESSAGES = 12;

  const handlePDFUpload = async (file, user) => {
    console.log("Uploading file: for user:", user);
    try {
      await uploadPDF(file, user.id);
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

    const placeholderBotMsg = {
      role: 'bot',
      content: 'Bot is typing...',
      chunks: [],
      context: '',
      time: new Date().toLocaleTimeString()
    };
    setChatHistory([...trimmedMessages, placeholderBotMsg]);

    try {
      const res = await askQuestion(trimmedMessages);
      if (res.data.warning === 'no_document') {
        alert("📄 Please upload a document before asking.");
        return;
      }

      const realBotMsg = {
        role: 'bot',
        content: res.data.answer,
        chunks: res.data.chunks_used || [],
        context: res.data.context || '',
        time: new Date().toLocaleTimeString()
      };
      setChatHistory([...trimmedMessages, realBotMsg]);
      setContextChunks(res.data.chunks_used || []);
    } catch (err) {
      console.error("Ask failed", err);
    }
  };

  console.log("App mounted with user:", user);
  return (
    <>
      <header style={styles.header}>
        <h2>📄 Document QA Bot</h2>
        {isLoggedIn ? (
          <div style={styles.profileIcon} onClick={() => window.location.href = '/profile'}>
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)} style={styles.loginButton}>
            Login
          </button>
        )}
      </header>

      {!isLoggedIn && showLogin && (
        <Login
          onLogin={(userInfo) => {
            setIsLoggedIn(true);
            setUser(userInfo);
            setShowLogin(false);
          }}
        />
      )}
      {isLoggedIn && (
        <MainLayout
          messages={chatHistory}
          onUpload={(file) => handlePDFUpload(file, user)} 
          onAsk={handleAsk}
          uploadedDocs={uploadedDocs}
          user={user}
        />
      )}
    </>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    alignItems: 'center',
  },
  profileIcon: {
    backgroundColor: '#777',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '18px',
  },
  loginButton: {
    backgroundColor: '#555',
    color: '#fff',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default App;
