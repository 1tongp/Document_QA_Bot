import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { fetchMyFiles } from '../../services/api';

function UserFilesSidebar({ activeIndex, onSelect, user, refreshKey }) {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadFiles = async () => {
            try {
                const data = await fetchMyFiles(user.id);
                setFiles(data.map(f => f.filename));
            } catch (err) {
                setError(err.error || 'Failed to load files');
            }
        };
        loadFiles();
    }, [user.id, refreshKey]); // 👈 trigger re-fetch when refreshKey changes

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <Sidebar
            documents={files}
            activeIndex={activeIndex}
            onSelect={onSelect}
        />
    );
}


export default UserFilesSidebar;
