import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function RelatedTopics({ topics = [] }) {
    const docsBase = useBaseUrl("docs/");

    if (!topics.length) return null;

    return (
        <div
            style={{
                marginTop: "40px",
                paddingTop: "20px",
                borderTop: "1px solid #444",
            }}
        >
            <h2>Related Topics</h2>

            <ul>
                {topics.map((topic, index) => (
                    <li key={index}>
                        <Link to={`${docsBase}${topic}`}>
                            {topic
                                .split("/")
                                .pop()
                                .replace(/-/g, " ")
                                .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}