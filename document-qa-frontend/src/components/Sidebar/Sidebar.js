import React from 'react';
import { Colors } from '../../Constants/Colors';
import { Styles } from '../../Constants/Styles';

function Sidebar({ documents, activeIndex, onSelect }) {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Documents</h3>
      <ul style={styles.list}>
        {documents.map((doc, idx) => (
          <li
            key={idx}
            onClick={() => onSelect(idx)}
            style={{
              ...styles.item,
              ...(idx === activeIndex ? styles.active : {})
            }}
            title={doc}
          >
            {doc}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    padding: 0,
  },
  title: {
    ...Styles.heading3,
    marginBottom: '16px',
    color: Colors.taupe,
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    ...Styles.body1,
    color: Colors.taupeLight,
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '6px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  active: {
    backgroundColor: Colors.taupeLight,
    color: Colors.charcoal,
  },
};

export default Sidebar;
