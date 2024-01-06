import React from 'react';
import Layout from '@theme/Layout';

export default function Contact() {
  return (
    <Layout title="Contact Us">

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3% 10%',
      }}>

        <h1>Contact Us</h1>
        <p>We value your feedback and inquiries. Please feel free to reach out to us through any of the following platforms:</p>

        <div style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <a 
            href="https://discord.gg/Cn8pWhQRxZ" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ fontSize: '20px', textDecoration: 'underline', color: '#7289DA', cursor: 'pointer' }} // Enhanced Discord link styling
          >
            🎧 Join our Discord community
          </a>
          
          <a 
            href="https://github.com/Stirling-Tools/Stirling-PDF/issues"
            target="_blank" 
            rel="noopener noreferrer"
            style={{ fontSize: '20px', textDecoration: 'underline', color: '#0366d6', cursor: 'pointer' }} // Enhanced GitHub link styling
          >
            🐞 Report an Issue on GitHub
          </a>

          <a 
            href="https://github.com/Stirling-Tools/Stirling-PDF/discussions"
            target="_blank" 
            rel="noopener noreferrer"
            style={{ fontSize: '20px', textDecoration: 'underline', color: '#0366d6', cursor: 'pointer' }} // Enhanced GitHub link styling
          >
            💬 Join our GitHub Discussions
          </a>
        </div>

        <p>Thank you for being a part of our community!</p>

      </div>

    </Layout>
  );
}
