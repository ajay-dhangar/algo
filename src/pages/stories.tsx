import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const INITIAL_STORIES = [
  {
    username: 'ajay-dhangar',
    name: 'Ajay Dhangar',
    role: 'Founder & Maintainer',
    title: 'Building a Vision from the Ground Up',
    summary: 'The raw truth about navigating failures, late-night code grinds, and building CodeHarborHub to empower global learners.',
    tags: ['Founder', 'Open Source', 'Vision'],
    metric: '100+ PRs Reviewed'
  },
  {
    username: '#',
    name: 'Rohan Sharma',
    role: 'B.Tech Learner',
    title: 'Conquering Graph Algorithms After 4 Failures',
    summary: 'I almost quit coding after struggling with dynamic programming. Finding visual examples changed my entire perspective.',
    tags: ['DSA', 'Resilience', 'Student'],
    metric: '300+ Problems Solved'
  },
  {
    username: '#',
    name: 'Sarah Jenkins',
    role: 'Core Contributor',
    title: 'Overcoming Imposter Syndrome via Git',
    summary: 'How fixing a minor typo inside documentation opened the doors to fixing core logic bugs in open-source systems.',
    tags: ['Git', 'React', 'Community'],
    metric: '12 Contributions'
  }
];

export default function StoriesPage(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const tags = ['All', 'Founder', 'DSA', 'Open Source', 'Resilience', 'React'];

  const filteredStories = selectedTag === 'All' 
    ? INITIAL_STORIES 
    : INITIAL_STORIES.filter(s => s.tags.includes(selectedTag));

  return (
    <Layout
      title="Community Stories"
      description="Real journeys, struggles, losses, and triumphs from our global developers, contributors, and learners."
    >
      {/* Dynamic Styling Overrides */}
      <style dangerouslySetInnerHTML={{__html: `
        .stories-hero {
          background: linear-gradient(135deg, var(--ifm-color-primary-darker) 0%, var(--ifm-color-primary-darkest) 100%);
          color: #ffffff;
          padding: 5rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .stories-hero::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4rem;
          background: linear-gradient(to top, var(--ifm-background-color), transparent);
        }
        .animated-heading {
          animation: fadeInUp 0.8s ease-out;
        }
        .animated-subheading {
          animation: fadeInUp 1s ease-out;
          opacity: 0.9;
          max-width: 700px;
          margin: 0 auto 2rem auto;
        }
        .filter-btn {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          margin: 0.25rem;
        }
        .filter-btn:hover {
          transform: translateY(-2px);
        }
        .story-card-wrapper {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid var(--ifm-color-emphasis-200);
          border-radius: 12px;
          overflow: hidden;
          background: var(--ifm-card-background-color);
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .story-card-wrapper:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(var(--ifm-color-primary-rgb), 0.15);
          border-color: var(--ifm-color-primary);
        }
        .interactive-avatar {
          border: 2px solid var(--ifm-color-primary);
          transition: transform 0.3s ease;
        }
        .story-card-wrapper:hover .interactive-avatar {
          transform: scale(1.1) rotate(4deg);
        }
        .sequence-section {
          background: var(--ifm-color-emphasis-100);
          border-radius: 16px;
          padding: 3rem 2rem;
        }
        
        /* Fixed native layout elements replacing old components */
        .native-step-card {
          background: var(--ifm-background-color);
          border-radius: 8px;
          padding: 1.25rem;
          margin-bottom: 1rem;
          border-left: 4px solid var(--ifm-color-primary);
          box-shadow: var(--ifm-global-shadow-sm);
        }
        .native-step-badge {
          background: var(--ifm-color-primary);
          color: #fff;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: bold;
          text-transform: uppercase;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      <main>
        {/* --- HERO SECTION --- */}
        <section className="stories-hero">
          <div className="container">
            <h1 className="display-3 animated-heading" style={{ fontWeight: 800, letterSpacing: '-1px' }}>
              Real Journeys. Unfiltered Truths.
            </h1>
            <p className="size-lg animated-subheading">
              Behind every successful compile, accepted PR, or cleared interview lies a series of hidden losses, grinding efforts, and monumental breakthroughs. Read our community histories—or tell yours.
            </p>
            <div style={{ animation: 'fadeInUp 1.2s ease-out' }}>
              <a href="#contribute" className="button button--lg button--info margin-right--md shadow--md">
                Share Your Story
              </a>
              <a href="#explore" className="button button--lg button--outline button--secondary">
                Read Catalog
              </a>
            </div>
          </div>
        </section>

        {/* --- MAIN INTERACTIVE SPACE --- */}
        <section id="explore" className="container margin-top--xl margin-bottom--xl">
          
          <div className="row margin-bottom--xl text--center" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="col col--12">
              <h2 className="margin-bottom--md" style={{ fontWeight: 700 }}>Filter Stories By Field</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`button filter-btn ${selectedTag === tag ? 'button--primary' : 'button--outline button--secondary'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="row">
            {filteredStories.map((story) => (
              <div key={story.username} className="col col--4 margin-bottom--lg">
                <div className="story-card-wrapper shadow--sm">
                  
                  <div className="card__header" style={{ padding: '1.5rem 1.5rem 0 1.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      {story.tags.map(t => (
                        <span key={t} className="badge badge--secondary" style={{ fontSize: '0.75rem' }}>{t}</span>
                      ))}
                    </div>
                    <h3 style={{ lineHeight: '1.3', marginBottom: '0.75rem', fontWeight: 700 }}>
                      "{story.title}"
                    </h3>
                  </div>

                  <div className="card__body" style={{ padding: '0 1.5rem 1rem 1rem' }}>
                    <p style={{ color: 'var(--ifm-color-emphasis-700)', fontSize: '0.95rem' }}>
                      {story.summary}
                    </p>
                    <div style={{ marginTop: '1rem', background: 'rgba(var(--ifm-color-primary-rgb), 0.06)', borderRadius: '6px', padding: '0.5rem 0.7rem', display: 'inline-block' }}>
                      <small style={{ fontWeight: 600, color: 'var(--ifm-color-primary)' }}>📈 Achievement: {story.metric}</small>
                    </div>
                  </div>

                  <div className="card__footer" style={{ padding: '0 1.5rem 1.5rem 1.5rem', background: 'transparent' }}>
                    <hr style={{ border: '0', borderTop: '1px solid var(--ifm-color-emphasis-200)', margin: '0 0 1rem 0' }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div className="avatar">
                        <img
                          className="avatar__photo interactive-avatar"
                          src={story.username && story.username !== '#' ? 'https://github.com/' + story.username + '.png' : 'https://github.com/github.png'}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://github.com/github.png';
                          }}
                          alt={story.name}
                          style={{ width: '40px', height: '40px' }}
                        />
                        <div className="avatar__intro" style={{ marginLeft: '0.75rem' }}>
                          <div className="avatar__name" style={{ fontSize: '0.9rem', fontWeight: 600 }}>{story.name}</div>
                          <small className="avatar__subtitle" style={{ fontSize: '0.75rem' }}>{story.role}</small>
                        </div>
                      </div>
                      
                      <Link 
                        className="button button--sm button--link text--primary" 
                        to={`/story/${story.username}`}
                        style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        Read Route →
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- INVITATION & WORKFLOW SECTION --- */}
        <section id="contribute" className="container margin-bottom--xl">
          <div className="sequence-section shadow--md">
            <div className="row" style={{ alignItems: 'center' }}>
              <div className="col col--5 margin-bottom--md">
                <span className="badge badge--warning margin-bottom--sm" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Open Source Initiative</span>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 800, lineHeight: '1.2' }}>
                  Your story could save someone from giving up.
                </h2>
                <p className="margin-top--md" style={{ color: 'var(--ifm-color-emphasis-700)' }}>
                  We don't want clean, polished resumes. We want to hear about the errors that took two days to fix, the initial confusion of your first open-source project, and what finally kept you moving forward.
                </p>
                <div className="card padding--md margin-top--md" style={{ borderLeft: '4px solid var(--ifm-color-primary)', background: 'var(--ifm-background-color)' }}>
                  <p style={{ fontStyle: 'italic', margin: 0, fontSize: '0.9rem' }}>
                    "The tech space feels crowded with experts, but real power lives in the journeys of those who are actively climbing the mountain."
                  </p>
                </div>
              </div>

              <div className="col col--7">
                <h3 className="text--center margin-bottom--md" style={{ fontWeight: 700 }}>How to Submit Yours (Via GitHub)</h3>
                
                {/* Fixed Steps Container avoiding missing module imports */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  
                  <div className="native-step-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '1.1rem' }}>Fork & Clone</strong>
                      <span className="native-step-badge">Step One</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)' }}>
                      Fork the repository `ajay-dhangar/algo` to your personal GitHub account and check out a clean working branch.
                    </p>
                  </div>

                  <div className="native-step-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '1.1rem' }}>Initialize the Entry</strong>
                      <span className="native-step-badge">Step Two</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)' }}>
                      Copy the standard template file from your `story/_template.md` and drop it straight into the `/story/` system directory.
                    </p>
                  </div>

                  <div className="native-step-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '1.1rem' }}>Name the File</strong>
                      <span className="native-step-badge">Step Three</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)' }}>
                      Name your file `your-github-username.mdx` so it mounts cleanly directly to the custom landing parameters layout.
                    </p>
                  </div>

                  <div className="native-step-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '1.1rem' }}>Open the PR</strong>
                      <span className="native-step-badge">Step Four</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)' }}>
                      Push your adjustments and submit your pull request. Once validated, your profile will be automatically built and rendered inside our live matrix.
                    </p>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}