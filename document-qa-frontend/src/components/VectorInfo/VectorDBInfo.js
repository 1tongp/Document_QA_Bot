import React from 'react';
import { Styles } from '../../Constants/Styles';
import { Colors } from '../../Constants/Colors';

function VectorDBInfo() {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Chunking and Vector DB</h3>
      <p style={styles.text}>
        This method involves dividing a document into smaller chunks and creating embeddings
        stored in a vector database for semantic retrieval.
      </p>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Inter, sans-serif',
    padding: 0,
  },
  title: {
    ...Styles.heading3,
    color: Colors.taupe, 
    marginBottom: '16px'
  },
  text: {
    ...Styles.body1,
    color: Colors.taupeLight, 
  }
};

export default VectorDBInfo;