import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
// import { useColorMode } from "@docusaurus/theme-common";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import styles from "./styles.module.css";

const DocsRating = ({ label }) => {
  if (!ExecutionEnvironment.canUseDOM) return null;

  const location = useLocation();
  // const { colorMode } = useColorMode();
  const DiscordInviteURL = "https://discord.gg/8p9Z6jkVru";
  const openDocIssueURL =
    `https://github.com/codeharborhub/codeharborhub.github.io/issues/new?assignees=&labels=&template=---doc-error-report.md&title=Issue with codeharborhub.github.io${location.pathname}`;
  const docEnhancementURL =
    `https://github.com/codeharborhub/codeharborhub.github.io/issues/new?assignees=&labels=&template=---doc-site-enhancement-request.md&title=Doc enhancement request for codeharborhub.github.io${location.pathname}`;

  const [haveVoted, setHaveVoted] = useState(false);
  const [liked, setLiked] = useState(false);

  const giveFeedback = (value) => {
    if (window.ga) {
      window.ga("send", {
        hitType: "event",
        eventCategory: "button",
        eventAction: "feedback",
        eventLabel: label,
        eventValue: value,
      });
    }
    setLiked(value === 1);
    setHaveVoted(true);
  };

  return (
    <div className={`${styles.docsRating} margin-auto margin-top--lg`}>
      {haveVoted ? (
        liked ? (
          <div className={styles.thankYou}>🎉 Thanks for letting us know!</div>
        ) : (
          <div className={styles.feedbackLinks}>
            <p>Thanks for your feedback! Need help or have suggestions?</p>
            <p>
              • Ask a question on our{" "}
              <a href={DiscordInviteURL} target="_blank" rel="noopener noreferrer">
                Discord Channel
              </a>
              <br />
              • <a href={openDocIssueURL}>Report a problem</a> <br />
              • <a href={docEnhancementURL}>Suggest an improvement</a>
            </p>
          </div>
        )
      ) : (
        <div className="text--center">
          <h3 className={styles.heading}>Was this topic helpful?</h3>
          <div className={styles.buttonGroup}>
            <button
              className={styles.voteBtn}
              onClick={() => giveFeedback(1)}
              aria-label="Yes"
            >
              <FiThumbsUp className={styles.icon} />
              <span>Yes</span>
            </button>
            <button
              className={styles.voteBtn}
              onClick={() => giveFeedback(0)}
              aria-label="No"
            >
              <FiThumbsDown className={styles.icon} />
              <span>No</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocsRating;
