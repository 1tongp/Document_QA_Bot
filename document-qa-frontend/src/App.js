// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [file, setFile] = useState(null);
//   const [text, setText] = useState('');
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append('file', file);

//     const response = await axios.post('http://127.0.0.1:5000/upload', formData);
//     setText(response.data.text);
//   };

//   const handleAsk = async () => {
//     const response = await axios.post('http://127.0.0.1:5000/ask', {
//       question,
//       context: text
//     });
//     setAnswer(response.data.answer);
//   };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>📄 Document Q&A Chatbot</h2>

//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload PDF</button>

//       {text && (
//         <>
//           <h4>Ask a question:</h4>
//           <input
//             type="text"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             style={{ width: '300px' }}
//           />
//           <button onClick={handleAsk}>Ask</button>
//         </>
//       )}

//       {answer && (
//         <>
//           <h4>🧠 Answer:</h4>
//           <p>{answer}</p>
//         </>
//       )}
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
  const [text, setText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handlePDFUpload = async (file) => {
    try {
      const res = await uploadPDF(file);
      setText(res.data.text);
      setChatHistory([]);  
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };


  const MAX_MESSAGES = 12;  // e.g. last 6 user+bot exchanges

  const handleAsk = async (question) => {
    const newUserMsg = {
      role: 'user',
      content: question,
      time: new Date().toLocaleTimeString()
    };
    const updatedMessages = [...chatHistory, newUserMsg];
    const trimmedMessages = updatedMessages.slice(-MAX_MESSAGES);
    try {
      const res = await askQuestion(trimmedMessages, text);
      const botMsg = {
        role: 'assistant',
        content: res.data.answer,
        time: new Date().toLocaleTimeString()
      };

      setChatHistory([...updatedMessages, botMsg]);
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
    </div>
  );
}

export default App;
