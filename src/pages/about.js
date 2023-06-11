import React from 'react';
import Layout from '@theme/Layout';

export default function About() {
  return (
    <Layout title="About Me" description="About Me">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '20px',
        }}>
        <p>
          By Anthony Stirling
        </p>
      </div>
    </Layout>
  );
}