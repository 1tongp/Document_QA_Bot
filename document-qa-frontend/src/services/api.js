import axios from 'axios';

// const API_BASE = 'http://127.0.0.1:5000';
const API_BASE = 'https://document-qa-bot-wcfp.onrender.com';
export const uploadPDF = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${API_BASE}/upload`, formData);
};

export const askQuestion = (messages) => {
    return axios.post(`${API_BASE}/ask`, { messages });
};

export const requestPassword = async () => {
    return axios.get('/generate-code');
};

export const verifyPassword = async (code) => {
    return axios.post('/verify-code', { code });
};