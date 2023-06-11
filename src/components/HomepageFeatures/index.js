import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
{
    title: 'Powerful PDF Tools',
    Svg: require('@site/static/img/tools.svg').default,
    description: (
      <>
        Stirling PDF provides you with powerful tools to manage your PDF files.
        Merge, split, or convert your PDF files with ease.
      </>
    ),
  },
	{
    title: 'Secure and Reliable',
    Svg: require('@site/static/img/lock.svg').default,
    description: (
      <>
        Your files' security is our priority. Stirling PDF does not maintain any files, tracking or data.
		It operates fully on your local machine, ensuring privacy and control over your data. 
      </>
    ),
  },
  {
    title: 'Personalized for you',
    Svg: require('@site/static/img/person.svg').default,
    description: (
      <>
        Stirling-PDF is designed with user-centricity in mind. 
		The interface, App name and description is all customizable, letting you adjust the settings according to your preferences and needs.
      </>
    ),
  },
  
  
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
