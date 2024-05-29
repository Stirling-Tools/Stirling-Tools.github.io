import React from 'react';
import Layout from '@theme/Layout';

export default function Donate() {
  return (
    <Layout title="Donate" description="Donate">
      
		<div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3% 10%',
      }}>
        <h1>Check out our Demo</h1>
        <p>
          <a href="https://stirlingpdf.io/" target="_blank" rel="noopener noreferrer">
            <strong>Stirling-PDF:</strong> The demo of the latest tag without security mode enabled and running the full version with all its features!.
          </a>
        </p>
      </div>
    </Layout>
  );
}