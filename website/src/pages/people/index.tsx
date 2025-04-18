import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
// import HomepageFeatures from '@site/src/components/HomepageFeaturçes';
import { FaResearchgate, FaGithub, FaUserCircle, FaGoogle, FaOrcid } from 'react-icons/fa';
import Heading from '@theme/Heading';

import styles from './index.module.css';

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

// members data in here
const members = [
    {
        name: '劉 子昂',
        role: '准教授',
        img: 'https://github.com/zi-ang-liu.png',
        link: 'https://zi-ang-liu.github.io/',
        github: 'https://github.com/zi-ang-liu/',
        researchgate: 'https://www.researchgate.net/profile/Ziang-Liu-4',
        google: 'https://scholar.google.com/citations?user=dRuC1OoAAAAJ&hl',
        orcid: 'https://orcid.org/0000-0002-1364-3502'
    },

    {
        name: '学生',
        role: '四年生',
        img: 'https://github.com/isl-hosei.png'
    },

    { name: '学生', role: '四年生', img: 'https://github.com/isl-hosei.png' },
    { name: '学生', role: '四年生', img: 'https://github.com/isl-hosei.png' },
    { name: '学生', role: '四年生', img: 'https://github.com/isl-hosei.png' },
    { name: '学生', role: '三年生', img: 'https://github.com/isl-hosei.png' },
    { name: '学生', role: '三年生', img: 'https://github.com/isl-hosei.png' },
    { name: '学生', role: '三年生', img: 'https://github.com/isl-hosei.png' },
    { name: '学生', role: '三年生', img: 'https://github.com/isl-hosei.png' },
    { name: '学生', role: '三年生', img: 'https://github.com/isl-hosei.png' },
    { name: '学生', role: '三年生', img: 'https://github.com/isl-hosei.png' },
];

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