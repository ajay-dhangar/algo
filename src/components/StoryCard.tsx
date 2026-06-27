import React from 'react';
import Link from '@docusaurus/Link';

interface StoryCardProps {
  title: string;
  author: string;
  username: string;
  role: string;
  tag: string;
  summary: string;
}

export default function StoryCard({ title, author, username, role, tag, summary }: StoryCardProps) {
  return (
    <div 
      className="card margin-bottom--md" 

      style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
    >
      <div className="card__header">
        <span className="badge badge--primary margin-bottom--sm">{tag}</span>
        <h3>{title}</h3>
        <div className="avatar">
          <img
            className="avatar__photo"
            src={`https://github.com/${username}.png`}
            alt={`${author}'s avatar`}
          />
          <div className="avatar__intro">
            <div className="avatar__name">{author}</div>
            <small className="avatar__subtitle">{role}</small>
          </div>
        </div>
      </div>
      <div className="card__body">
        <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)' }}>{summary}</p>
      </div>
      <div className="card__footer">
        {username && username !== '#' ? (
          <Link className="button button--outline button--primary button--block" to={'/story/' + username}>
            Read Full Story →
          </Link>
        ) : (
          <button className="button button--outline button--secondary button--block" disabled>
            Story Coming Soon
          </button>
        )}
      </div>
    </div>
  );
}
