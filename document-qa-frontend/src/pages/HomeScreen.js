import React from 'react';
import { motion } from 'framer-motion';
import Login from '../components/Authenication/Login';

const features = [
    "Direct answers grounded in your documents",
    "No hallucination from unrelated sources",
    "Private and secure document handling",
    "Context-aware responses from your files",
    "Faster insights without reading the full document"
];

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function HomeScreen({ onLogin, onRegisterClick }) {
    return (
        <div style={styles.container}>
            <motion.div
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.2 } } }}
                style={styles.box}
            >
                <motion.h1 variants={fadeInUp} style={styles.title}>
                    📄 Welcome to Document QA Bot
                </motion.h1>
                <motion.p variants={fadeInUp} style={styles.description}>
                    Ask precise questions and get direct answers from your uploaded PDFs.
                    Unlike general chatbots, our system reads your documents to deliver accurate, context-rich responses.
                </motion.p>

                <motion.ul variants={fadeInUp} style={styles.bulletList}>
                    {features.map((feature, idx) => (
                        <li key={idx} style={styles.listItem}>{feature}</li>
                    ))}
                </motion.ul>

                <motion.div variants={fadeInUp} style={styles.loginSection}>
                    <Login onLogin={onLogin} />
                    <p style={styles.register}>
                        Don't have an account? <span onClick={onRegisterClick} style={styles.link}>Register here</span>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        background: 'linear-gradient(to right, #2c3e50, #3498db)',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '20px',
        color: '#fff'
    },
    box: {
        maxWidth: '600px',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 0 20px rgba(0,0,0,0.2)',
        textAlign: 'left'
    },
    title: {
        fontSize: '2rem',
        marginBottom: '16px',
        // textAlign: 'center',
        textAlign: 'left'
    },
    description: {
        fontSize: '1rem',
        marginBottom: '20px',
        // textAlign: 'center',
        textAlign: 'left'
    },
    bulletList: {
        marginBottom: '30px',
        paddingLeft: '20px'
    },
    listItem: {
        fontSize: '0.95rem',
        marginBottom: '8px'
    },
    loginSection: {
        backgroundColor: '#fff',
        color: '#000',
        padding: '20px',
        borderRadius: '8px',
    },
    register: {
        marginTop: '12px',
        fontSize: '0.9rem',
        textAlign: 'center'
    },
    link: {
        color: '#3498db',
        cursor: 'pointer',
        textDecoration: 'underline'
    }
};

export default HomeScreen;
