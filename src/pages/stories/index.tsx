import React, { JSX, useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { INITIAL_STORIES, AVAILABLE_TAGS } from "../../data/storiesData";
import styles from "./stories.module.css";

export default function StoriesPage(): JSX.Element {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const filteredStories =
    selectedTag === "All"
      ? INITIAL_STORIES
      : INITIAL_STORIES.filter((s) => s.tags.includes(selectedTag));

  return (
    <Layout
      title="Community Stories"
      description="Real journeys, struggles, losses, and triumphs from our global developers, contributors, and learners."
    >
      <main>
        {/* --- HERO SECTION --- */}
        <section className={styles.storiesHero}>
          <div className="container">
            <h1
              className={`display-3 ${styles.animatedHeading}`}
              style={{ fontWeight: 800, letterSpacing: "-1px" }}
            >
              Real Journeys. Unfiltered Truths.
            </h1>
            <p className={`${styles.animatedSubheading}`}>
              Behind every successful compile, accepted PR, or cleared interview
              lies a series of hidden losses, grinding efforts, and monumental
              breakthroughs. Read our community histories—or tell yours.
            </p>
            <div style={{ animation: "fadeInUp 1.2s ease-out" }}>
              <Link
                to="#contribute"
                className="button button--lg button--info margin-right--md shadow--md"
              >
                Share Your Story
              </Link>
              <Link
                to="#explore"
                className="button button--lg button--outline button--secondary"
              >
                Read Catalog
              </Link>
          </div>
        </section>

        {/* --- MAIN INTERACTIVE SPACE --- */}
        <section id="explore" className="px-4 margin-top--xl margin-bottom--xl">
          <div
            className="row margin-bottom--xl text--center"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="col col--12">
              <h2 className="margin-bottom--md" style={{ fontWeight: 700 }}>
                Filter Stories By Field
              </h2>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                {AVAILABLE_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`button ${styles.filterBtn} ${
                      selectedTag === tag
                        ? "button--primary"
                        : "button--outline button--secondary"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="row">
            {filteredStories.map((story) => (
              <div
                key={story.username}
                className="col col--4 margin-bottom--lg"
              >
                <div className={`${styles.storyCardWrapper} shadow--sm`}>
                  <div
                    className="card__header"
                    style={{ padding: "1.5rem 1.5rem 0 1.5rem" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "0.25rem",
                        marginBottom: "1rem",
                        flexWrap: "wrap",
                      }}
                    >
                      {story.tags.map((t) => (
                        <span
                          key={t}
                          className="badge badge--secondary"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3
                      style={{
                        lineHeight: "1.3",
                        marginBottom: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      "{story.title}"
                    </h3>
                  </div>

                  <div
                    className="card__body"
                    style={{ padding: "0 1.5rem 1rem 1rem" }}
                  >
                    <p
                      style={{
                        color: "var(--ifm-color-emphasis-700)",
                        fontSize: "0.95rem",
                      }}
                    >
                      {story.summary}
                    </p>
                    <div
                      style={{
                        marginTop: "1rem",
                        background: "rgba(var(--ifm-color-primary-rgb), 0.06)",
                        borderRadius: "6px",
                        padding: "0.5rem 0.7rem",
                        display: "inline-block",
                      }}
                    >
                      <small
                        style={{
                          fontWeight: 600,
                          color: "var(--ifm-color-primary)",
                        }}
                      >
                        📈 Achievement: {story.metric}
                      </small>
                    </div>
                  </div>

                  <div
                    className="card__footer"
                    style={{
                      padding: "0 1.5rem 1.5rem 1.5rem",
                      background: "transparent",
                    }}
                  >
                    <hr
                      style={{
                        border: "0",
                        borderTop: "1px solid var(--ifm-color-emphasis-200)",
                        margin: "0 0 1rem 0",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="avatar">
                        <img
                          className={`avatar__photo ${styles.interactiveAvatar}`}
                          src={
                            story.username && story.username !== "#"
                              ? "https://github.com/" + story.username + ".png"
                              : "https://github.com/github.png"
                          }
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "https://github.com/github.png";
                          }}
                          alt={story.name}
                          style={{ width: "40px", height: "40px" }}
                        />
                        <div
                          className="avatar__intro"
                          style={{ marginLeft: "0.75rem" }}
                        >
                          <div
                            className="avatar__name"
                            style={{ fontSize: "0.9rem", fontWeight: 600 }}
                          >
                            {story.name}
                          </div>
                          <small
                            className="avatar__subtitle"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {story.role}
                          </small>
                        </div>
                      </div>

                      {story.username && story.username !== "#" ? (
                        <Link
                          className="button button--sm button--link text--primary"
                          to={"/story/" + story.username}
                          style={{
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          Read Route →
                        </Link>
                      ) : (
                        <span
                          style={{
                            fontSize: "0.85rem",
                            color: "var(--ifm-color-emphasis-600)",
                            fontWeight: 600,
                          }}
                        >
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- INVITATION & WORKFLOW SECTION --- */}
        <section id="contribute" className="px-4 margin-bottom--xl">
          <div className={`${styles.sequenceSection} shadow--md`}>
            <div className="row" style={{ alignItems: "center" }}>
              <div className="col col--5 margin-bottom--md">
                <span
                  className="badge badge--warning margin-bottom--sm"
                  style={{ textTransform: "uppercase", letterSpacing: "1px" }}
                >
                  Open Source Initiative
                </span>
                <h2
                  style={{
                    fontSize: "2.25rem",
                    fontWeight: 800,
                    lineHeight: "1.2",
                  }}
                >
                  Your story could save someone from giving up.
                </h2>
                <p
                  className="margin-top--md"
                  style={{ color: "var(--ifm-color-emphasis-700)" }}
                >
                  We don't want clean, polished resumes. We want to hear about
                  the errors that took two days to fix, the initial confusion of
                  your first open-source project, and what finally kept you
                  moving forward.
                </p>
                <div
                  className="card padding--md margin-top--md"
                  style={{
                    borderLeft: "4px solid var(--ifm-color-primary)",
                    background: "var(--ifm-background-color)",
                  }}
                >
                  <p
                    style={{
                      fontStyle: "italic",
                      margin: 0,
                      fontSize: "0.9rem",
                    }}
                  >
                    "The tech space feels crowded with experts, but real power
                    lives in the journeys of those who are actively climbing the
                    mountain."
                  </p>
                </div>
              </div>

              <div className="col col--7">
                <h3
                  className="text--center margin-bottom--md"
                  style={{ fontWeight: 700 }}
                >
                  How to Submit Yours (Via GitHub)
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <div className={styles.nativeStepCard}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <strong style={{ fontSize: "1.1rem" }}>
                        Fork & Clone
                      </strong>
                      <span className={styles.nativeStepBadge}>Step One</span>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.9rem",
                        color: "var(--ifm-color-emphasis-700)",
                      }}
                    >
                      Fork the repository `ajay-dhangar/algo` to your personal
                      GitHub account and check out a clean working branch.
                    </p>
                  </div>

                  <div className={styles.nativeStepCard}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <strong style={{ fontSize: "1.1rem" }}>
                        Initialize the Entry
                      </strong>
                      <span className={styles.nativeStepBadge}>Step Two</span>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.9rem",
                        color: "var(--ifm-color-emphasis-700)",
                      }}
                    >
                      Copy the standard template file from your
                      `story/_template.md` and drop it straight into the
                      `/story/` system directory.
                    </p>
                  </div>

                  <div className={styles.nativeStepCard}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <strong style={{ fontSize: "1.1rem" }}>
                        Name the File
                      </strong>
                      <span className={styles.nativeStepBadge}>Step Three</span>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.9rem",
                        color: "var(--ifm-color-emphasis-700)",
                      }}
                    >
                      Name your file `your-github-username.mdx` so it mounts
                      cleanly directly to the custom landing parameters layout.
                    </p>
                  </div>

                  <div className={styles.nativeStepCard}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <strong style={{ fontSize: "1.1rem" }}>
                        Open the PR
                      </strong>
                      <span className={styles.nativeStepBadge}>Step Four</span>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.9rem",
                        color: "var(--ifm-color-emphasis-700)",
                      }}
                    >
                      Push your adjustments and submit your pull request. Once
                      validated, your profile will be automatically built and
                      rendered inside our live matrix.
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