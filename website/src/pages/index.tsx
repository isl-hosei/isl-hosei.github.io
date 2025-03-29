import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import { FaResearchgate, FaGithub, FaUserCircle, FaGoogle, FaOrcid } from 'react-icons/fa';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}<br></br>知能システム研究室</p>
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

function TeamMembers() {
  const members = [
    { name: '劉 子昂', role: '准教授', img: 'https://github.com/zi-ang-liu.png', link: 'https://zi-ang-liu.github.io/', github: 'https://github.com/zi-ang-liu/', researchgate: 'https://www.researchgate.net/profile/Ziang-Liu-4', google: 'https://scholar.google.com/citations?user=dRuC1OoAAAAJ&hl', orcid: 'https://orcid.org/0000-0002-1364-3502' },
    { name: '学生', role: '四年生', img: 'https://github.com/zi-ang-liu.png' },
    { name: '学生', role: '四年生', img: 'https://github.com/zi-ang-liu.png' },
    { name: '学生', role: '四年生', img: 'https://github.com/zi-ang-liu.png' },
    { name: '学生', role: '四年生', img: 'https://github.com/zi-ang-liu.png' },
    { name: '学生', role: '三年生', img: 'https://github.com/zi-ang-liu.png' },
    { name: '学生', role: '三年生', img: 'https://github.com/zi-ang-liu.png' },
    { name: '学生', role: '三年生', img: 'https://github.com/zi-ang-liu.png' },
    { name: '学生', role: '三年生', img: 'https://github.com/zi-ang-liu.png' },
    { name: '学生', role: '三年生', img: 'https://github.com/zi-ang-liu.png' },
    { name: '学生', role: '三年生', img: 'https://github.com/zi-ang-liu.png' },
  ];

  return (
    <section className={styles.teamMembers}>
      <h2>People</h2>
      <div className={clsx('row', styles.teamMembersRow)}>
        {members.map(({ name, role, img, link, github, researchgate, google, orcid }, index) => (
          <div key={index} className={clsx('col col--2', styles.teamMember)}>
            <div className={styles.card}>
              <img src={img} alt={name} className={styles.teamMemberImage} />
              <div className={styles.teamMemberContent}>
                {/* make name link to homepage if website exist */}
                <h3>{name}</h3>
                <p>{role}</p>
                <div className={styles.socialLinks}>
                  {link && (
                    <Link to={link} className={styles.socialLink}>
                      <FaUserCircle />
                    </Link>
                  )}
                  {github && (
                    <Link to={github} className={styles.socialLink}>
                      <FaGithub />
                    </Link>
                  )}
                  {google && (
                    <Link to={google} className={styles.socialLink}>
                      <FaGoogle />
                    </Link>
                  )}
                  {orcid && (
                    <Link to={orcid} className={styles.socialLink}>
                      <FaOrcid />
                    </Link>
                  )}
                  {researchgate && (
                    <Link to={researchgate} className={styles.socialLink}>
                      <FaResearchgate />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
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
        <TeamMembers />
        <Contact />
      </main>
    </Layout>
  );
}
