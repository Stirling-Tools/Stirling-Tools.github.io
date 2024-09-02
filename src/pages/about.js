import React from 'react';
import Layout from '@theme/Layout';

export default function About() {
  return (
    <Layout title="About" description="About Stirling-PDF">
      <div
        style={{
          padding: '3% 25%',
          fontSize: '18px',
        }}>
        <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>About Stirling-PDF</h1>
        
        <p>
          Stirling PDF is a powerful, locally-hosted web application for PDF manipulation and processing, designed with privacy as a core principles. Developed as an open-source project, Stirling PDF offers a comprehensive suite of tools to handle all your PDF needs efficiently, while ensuring that your documents never leave your control. Unlike cloud-based web solutions, Stirling PDF processes everything locally meaning all files never leave your network. This privacy-first approach makes Stirling PDF an ideal choice for handling sensitive documents in both personal and professional contexts.
        </p>

        <h2>Our Vision</h2>
        <p>
          Stirling-PDF was created to provide a locally-hosted alternative to online PDF tools, ensuring complete privacy and control over your documents. The application is continuously improved through community contributions, with new features and language support added regularly. Our long-term goal is to provide comprehensive PDF manipulation capabilities, eliminating the need for expensive Adobe subscriptions. In the short term, we're focused on revolutionizing PDF interactions through seamless automation and ensuring a quick clean UI for simple operations.
        </p>

        <h2>Milestones</h2>
        <p>
          Our community has shown tremendous support, with two Reddit posts receiving over 400 upvotes each. Stirling-PDF is ranked among the top 20 Java apps by GitHub stars and in the top 400 overall, with over 5 million Docker downloads.
        </p>

        <h2>Get Involved</h2>
        <p>
          Whether you're an individual user, part of a business, or a developer looking to integrate PDF capabilities into your workflow, Stirling PDF offers a flexible and powerful solution for all your PDF manipulation needs. Join our community on Discord or GitHub and discuss at upcoming features. We'd love to hear your feedback and ideas!
        </p>

        <hr style={{ margin: '40px 0' }} />

        <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>About the Founder</h1>
        <p>
          I'm Anthony Stirling from the UK. I started as a passionate software developer and grew into a dedicated DevOps enthusiast. My love for creating, making things, and improving systems drives me every day. My interests range from software development to hosting my own privacy focused selfhosted tech.
        </p>

        <h2>Professional Journey</h2>
        <p>
          With 5 years in development and 3 years as a DevOps specialist, I've gained a lot of experience. A proud moment for me was being nominated and becoming a runner-up for "Innovation of the Year" at the UK IT Industry Awards representing my previous employer.
        </p>
      </div>
    </Layout>
  );
}