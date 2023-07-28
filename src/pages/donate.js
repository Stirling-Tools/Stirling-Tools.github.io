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
          Spearheaded by Anthony Stirling—a dedicated DevOps software developer from the UK—Our goal is simple: to develop fully local, trusted and personal software to improve productivity for businesses and personal use alike.
        </p>


        <h2>🌟 Why Your Support Matters</h2>

        <ul>
          <li>💖 Your support ensures our ongoing innovation and refinement.</li>
          <li>⚙️ Funds are utilized to ensure support can be provided to users and their issues</li>
          <li>🙏 Your support empowers us to provide unparalleled tools, creating a lasting impact in the software arena.</li>
        </ul>

        <p>
          Apart from fueling our innovation, your contributions help maintain server costs to offer demo experiences, and give us access to essential tools like ChatGPT Monthly Subscription to aid in developemnt.
        </p>

        <h2>🔗 Extend Your Support</h2>

         <div style={{ display: 'flex', gap: '20px', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <a href="http://paypal.me/froodleplex" target="_blank" rel="noopener noreferrer">
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
