import React from "react";
import Link from "@docusaurus/Link";

export default function RelatedTopics({ topics = [] }) {
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
                        <Link to={`/docs/${topic}`}>
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
