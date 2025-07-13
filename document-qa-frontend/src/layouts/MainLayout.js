import React, {useState} from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import FileUpload from "../components/Upload/FileUpload";
import ChatHistory from "../components/Chat/ChatHistory";
import QuestionBox from "../components/Chat/QuestionBox";
import VectorDBInfo from "../components/VectorInfo/VectorDBInfo";
import { UI } from "../Constants/Messages";
import { Colors } from "../Constants/Colors";
import { Styles } from "../Constants/Styles";
import Layout from "../Constants/Layout";

function MainLayout({ messages, onUpload, onAsk, uploadedDocs }) {
  const [showVectorPanel, setShowVectorPanel] = useState(true);
  const [activeDocIndex, setActiveDocIndex] = useState(0);

  const documents = uploadedDocs.length > 0 ? uploadedDocs : ['No documents uploaded'];


  const toggleVectorPanel = () => {
    setShowVectorPanel(prev => !prev);
  };

  return (
    <div style={styles.mainLayout}>
      <div style={styles.sidebar}>
        <Sidebar
          documents={documents}
          activeIndex={activeDocIndex}
          onSelect={setActiveDocIndex}
        />
      </div>
      <div
        style={{
          ...styles.chatPanelWrapper,
          transition: "margin-right 0.3s ease-in-out",
        }}
      >

        <div style={styles.chatPanel}>
          <h1 style={styles.header}>{UI.HOME_HEALDER}</h1>
          <FileUpload onUpload={onUpload} showVectorPanel={showVectorPanel} />

          <div style={styles.chatScrollable}>
            <ChatHistory messages={messages} showVectorPanel={showVectorPanel} />
          </div>
        </div>
        <button onClick={toggleVectorPanel} style={styles.toggleButton}>
          {showVectorPanel ? "»" : "☰"}
        </button>


        <div style={styles.questionBoxWrapper}>
          <QuestionBox onAsk={onAsk} showVectorPanel={showVectorPanel} />
        </div>
      </div>
      <div
        style={{
          ...styles.vectorInfo,
          width: showVectorPanel ? "240px" : "0px",
          padding: showVectorPanel ? "24px" : "0px",
          overflow: "hidden",
          transition: "all 0.3s ease",
        }}
      >
        {showVectorPanel && <VectorDBInfo />}
      </div>
    </div>
  );
}

const styles = {
  mainLayout: {
    display: "flex",
    height: "100vh",
    fontFamily: "Inter, sans-serif",
  },
  sidebar: {
    width: "200px",
    backgroundColor: Colors.charcoal,
    padding: "24px",
    flexShrink: 0,
  },
  chatPanelWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  chatPanel: {
    flex: 1,
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: Colors.stoneLight,
    overflow: "hidden",
  },
  chatScrollable: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "16px",

  },
  questionBoxWrapper: {
    padding: "24px 32px",
    borderTop: "1px solid #ccc",
    backgroundColor: Colors.stoneLighter,
    // width: '100%', // <- Ensure full stretch
    // boxSizing: 'border-box', // <- Avoid overflow due to padding
  },
  vectorInfo: {
    backgroundColor: Colors.charcoal,
    flexShrink: 0,
  },
  
  // vectorInfo: {
  //   width: "240px",
  //   padding: "24px",
  //   backgroundColor: Colors.charcoal,
  //   flexShrink: 0,
  //   transform: "translateX(0)",
  //   // position: "absolute",
  //   // top: 0,
  //   right: 0,
  //   // height: "100%",
  //   zIndex: 999
  // },
  header: {
    ...Styles.heading1,
    textAlign: "center",
    paddingBottom: Layout.mediumMargin,
  },
  toggleButton: {
    position: "absolute",
    top: "24px",
    right: "24px",
    fontSize: "24px",
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    zIndex: 1000
  }
  
  
};
export default MainLayout;
