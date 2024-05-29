import React from 'react';
import Layout from '@theme/Layout';

export default function Donate() {
  return (
    <Layout title="Support Stirling-PDF Development" description="Empowering Businesses with Tailored Software Solutions">

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3% 10%',
      }}>

        <h1>Help Shape the Future of Stirling-PDF</h1>

        <p>
          Our goal is simple: to develop fully local, trusted and personal software to improve productivity for businesses and personal use alike.
        </p>


        <h2>🌟 Why Your Support Matters</h2>
        <p>
          Your contributions help maintain server costs to offer demo experiences, and give us access to essential tools to aid in developemnt.<br></br>

          Stirling-PDF is a free, open-source project created by passionate developers in their spare time. We don't earn enough to make this a full-time endeavor. <br></br>
          Your support is crucial in allowing us to dedicate more time and resources to this project. <br></br>
          It ensures our ongoing innovation, refinement and support towards users<br></br>

        </p>

        <h2>🔗 Extend Your Support</h2>

         <div style={{ display: 'flex', gap: '20px', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <a href="https://www.paypal.com/donate/?hosted_button_id=MN7JPG5G6G3JL" target="_blank" rel="noopener noreferrer">
            <button style={{ padding: '10px 20px', fontSize: '18px', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#0070ba', color: '#ffffff' }}>Support with PayPal</button>
          </a>
          <a href="https://github.com/sponsors/Frooodle" target="_blank" rel="noopener noreferrer">
            <button style={{ padding: '10px 20px', fontSize: '18px', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#333', color: '#ffffff' }}>Become a GitHub Sponsor</button>
          </a>
        </div>

       
      </div>

    </Layout>
  );
}
