import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        {/* <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading> */}
        <h1>{siteConfig.title}</h1>
        <p className="hero__subtitle">
          {siteConfig.tagline}
          <br />知能システム研究室</p>
        {/* <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            About
          </Link>
        </div> */}
      </div>
    </header >
  );
}

function Contact() {
  return (
    <section className={styles.contact}>
      <h2>Contact</h2>
      <div className={styles.addressSection}>
        <address>
          〒184-8584 東京都小金井市梶野町3-7-2<br />
          法政大学 理工学部 経営システム工学科
        </address>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        {/* <HomepageFeatures /> */}
        <Contact />
      </main>
    </Layout>
  );
}