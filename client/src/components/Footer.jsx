import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>© {new Date().getFullYear()} StackIt. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

const styles = {
  footer: {
    marginTop: '0',
    padding: '20px 0',
    backgroundColor: '#000', // black background
    borderTop: '1px solid #222', // subtle border if needed
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    textAlign: 'center',
  },
  text: {
    color: '#fff', // white text
    fontSize: '14px',
  },
};
