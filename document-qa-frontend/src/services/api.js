import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;
// const API_BASE = 'https://document-qa-bot-wcfp.onrender.com';
export const uploadPDF = (file, userId) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId); 
    return axios.post(`${API_BASE}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
    });
};

export const askQuestion = (messages) => {
    return axios.post(`${API_BASE}/ask`, { messages });
};

export const requestPassword = async () => {
    return axios.get(`${API_BASE}/generate-code`);
};

export const verifyPassword = async (code) => {
    return axios.post(`${API_BASE}/verify-code`, { code });
};

export const login = async (username, password) => {
    return axios.post(`${API_BASE}/login`, { username, password });
}

export const fetchMyFiles = async (userId) => {
    const res = await axios.get(`${API_BASE}/my-files`, {
        params: { user_id: userId }
    });
    return res.data.files;
};