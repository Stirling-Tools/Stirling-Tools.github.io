import React from 'react';
import Layout from '@theme/Layout';

export default function About() {
  return (
    <Layout title="About Me" description="About Stirling-PDF">

      <div
        style={{
          padding: '3% 10%',
          fontSize: '18px',
        }}>

        <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>About Stirling-PDF</h1>
        

        <h2>Stirling-PDF: The Vision</h2>
        <p>
          Stirling-PDF was born out of a passion for providing tools that are not just affordable, but also trusted and user-friendly. With the vision to fill the void of tools that are too costly or not accessible to everyday individuals, Stirling-PDF prides itself on being free, locally hosted, secure, and absolutely private with no logs or external connections.
        </p>
        <p>
          Currently, our focus is on delivering an impeccable self-hosted PDF manipulation tool, accompanied by dedicated business support for those who seek it. And the good news? Version 1.0.0 is on the horizon, complete with automation support!
        </p>

        <h2>Milestones</h2>
        <p>
          Our commitment to excellence is reflected in the 350k+ downloads Stirling-PDF has received. The community has shown love too, with two Reddit posts garnering 400+ upvotes each.
        </p>

        <h2>The Road Ahead</h2>
        <p>
          The long-term aspiration is clear: to encompass every conceivable PDF manipulation, eliminating the need for pricey Adobe subscriptions for individuals and businesses alike. Our immediate goal? To revolutionize PDF interactions through seamless automation.
        </p>
        <p>
          Engage with us! Join our community on Discord and participate in our discussions on GitHub issues and community posts.
        </p>

		<h2>Funding Model</h2>
		<p>
			Stirling-PDF stands as a testament to the open-source ethos - fully free and transparent. While this approach has enabled widespread access and fostered a sense of community, it also means our funding model heavily relies on voluntary contributions and often means a general lack of funding.
		</p>
		<p>
			We genuinely hope that those who find value in Stirling-PDF will consider supporting us. Your contributions are not just funds; they are endorsements of the product and vision, enabling us to empower even more individuals and businesses around the globe. (And away from adobe!)
		</p>

		<hr style={{ margin: '40px 0' }} />

        <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>About the Founder</h1>
        

        <p>
          Anthony Stilring - Hailing from the UK, my journey began as a passionate software developer, evolving into a dedicated DevOps enthusiast. My love for crafting, making things, and improving systems is what fuels me every day. My interests span from software development to local hosting my own servers with Docker and Unraid.
        </p>

        <h2>Professional Journey</h2>
        <p>
          With 4 years in development and an additional 2 as a DevOps specialist, my experience and dedication led to a proud moment - being a nominee and runner-up for "Innovation of the Year" at the UK IT Industry Awards.
        </p>
      </div>

    </Layout>
  );
}
