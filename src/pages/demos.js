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

        <h1>Check out our Demos</h1>
		
		 <p>
          <a href="https://stirlingpdf.io/" target="_blank" rel="noopener noreferrer">
            <strong>Stirling-PDF:</strong> The demo of the latest tag with security mode enabled and running the full version.
          </a>
        </p>
        <p>
          <a href="https://stirlingpdf.io:8081/" target="_blank" rel="noopener noreferrer">
            <strong>Stirling-PDF Ultra Lite:</strong> This version is without security enabled.
          </a>
        </p>
      </div>
    </Layout>
  );
}