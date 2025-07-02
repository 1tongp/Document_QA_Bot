import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import FileUpload from '../components/Upload/FileUpload';
import ChatHistory from '../components/Chat/ChatHistory';
import QuestionBox from '../components/Chat/QuestionBox';
import VectorDBInfo from '../components/VectorInfo/VectorDBInfo';
import { UI } from '../Constants/Messages';
import { Colors } from '../Constants/Colors';
import { Styles } from '../Constants/Styles';
import Layout from '../Constants/Layout';

function MainLayout({ messages, onUpload, onAsk }) {
  return (
    <div style={styles.mainLayout}>
      <div style={styles.sidebar}>
        <Sidebar />
      </div>
      <div style={styles.chatPanel}>
      <h1 style={styles.header}>{UI.HOME_HEALDER}</h1>
        <FileUpload onUpload={onUpload} />
        <ChatHistory messages={messages} />
        <div style={styles.questionBox}>
          <QuestionBox onAsk={onAsk} />
        </div>
      </div>
      <div style={styles.vectorInfo}>
        <VectorDBInfo />
      </div>
    </div>
  );
}

const styles = {
  mainLayout: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Inter, sans-serif'
  },
  sidebar: {
    width: '240px',
    backgroundColor: Colors.charcoal,
    padding: '24px'
  },
  chatPanel: {
    flex: 1,
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.stoneLighter,
  },
  questionBox: {
    marginTop: 'auto'
  },
  vectorInfo: {
    width: '300px',
    padding: '24px',
    backgroundColor: Colors.charcoal,
    borderLeft: '1px solid #E5E7EB'
  },
  header: {
    ...Styles.heading1,
    textAlign: 'center', // Center horizontally
    paddingBottom: Layout.mediumMargin,
  }
};
export default MainLayout;