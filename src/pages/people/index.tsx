import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
// import HomepageFeatures from '@site/src/components/HomepageFeaturçes';
// import { FaResearchgate, FaGithub, FaUserCircle, FaGoogle, FaOrcid } from 'react-icons/fa';
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

const faculty = [
    {
        name: '劉 子昂',
        role: '准教授',
        img: 'https://github.com/zi-ang-liu.png',
        // link: 'https://zi-ang-liu.github.io/',
        // github: 'https://github.com/zi-ang-liu/',
        // researchgate: 'https://www.researchgate.net/profile/Ziang-Liu-4',
        // google: 'https://scholar.google.com/citations?user=dRuC1OoAAAAJ&hl',
        // orcid: 'https://orcid.org/0000-0002-1364-3502'
    }
];

const b4 = [
    {
        name: '竹上瑛貴',
    },
    {
        name: '久賀菜千帆',
    },
    {
        name: '小槌陽介',
    },
    {
        name: '佐藤克海',
    },
];

const b3 = [
    {
        name: '小川知波',
    },
    {
        name: '川上利一朗',
    },
    {
        name: '鈴木雅人',
    },
    {
        name: '高石和輝',
    },
    {
        name: '竹内栄貴',
    },
    {
        name: '藤井千晴',
    },
    {
        name: '藤牧瑞輝',
    },
    {
        name: '本田渉',
    },
];

function FacultyMembers() {

    return (
        <section className={styles.teamMembers}>
            <h2>教員</h2>
            <div className={clsx('row', styles.teamMembersRow)}>
                {faculty.map(({ name, role, img, link, github, researchgate, google, orcid }, index) => (
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

// In the first row, show ""


export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`People`}
            description="Description will go into a meta tag in <head />">
            <HomepageHeader />
            <main>
                <FacultyMembers />
            </main>
        </Layout>
    );
}