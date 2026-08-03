import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

interface Props {
  tags: string[];
}

export default function AlgorithmTags({ tags }: Props) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={styles.container}>
      {tags.map((tag) => (
        <Link
          key={tag}
          to={`/tags/${tag.toLowerCase()}`}
          className={styles.tag}
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}