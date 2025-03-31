import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { FaResearchgate, FaGithub, FaUserCircle, FaGoogle, FaOrcid } from 'react-icons/fa';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import { members } from './data/members';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <h1>People</h1>
            </div>
        </header >
    );
}

function TeamMembers() {

    return (
        <section className={styles.teamMembers}>
            <div className={clsx('row', styles.teamMembersRow)}>
                {members.map(({ name, role, img, link, github, researchgate, google, orcid }, index) => (
                    <div key={index} className={clsx('col col--3', styles.teamMember)}>
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

export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`People`}
            description="Description will go into a meta tag in <head />">
            <HomepageHeader />
            <main>
                {/* <HomepageFeatures /> */}
                <TeamMembers />
            </main>
        </Layout>
    );
}
