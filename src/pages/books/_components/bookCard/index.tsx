import React from 'react';
import clsx from 'clsx';
import Image from '@theme/IdealImage';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';
import FavoriteIcon from '../../../../components/svgIcons/FavoriteIcon';
import Tooltip from '../BookTooltip';
import {
  Tags,
  TagList,
  type TagType,
  type BookItem as BookUser,
  type Tag,
} from '@site/src/data/Books';
import { sortBy } from '@site/src/utils/jsUtils';

const TagComp = React.forwardRef<HTMLLIElement, Tag>(
  ({ label, color, description }, ref) => (
    <li ref={ref} className={styles.tag} title={description}>
      <span className={styles.textLabel}>{label.toLowerCase()}</span>
      <span className={styles.colorLabel} style={{ backgroundColor: color }} />
    </li>
  ),
);

function BookCardTag({ tags }: { tags: TagType[] }) {
  const tagObjects = tags.map((tag) => ({ tag, ...Tags[tag] }));

  // Keep same order for all tags
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    TagList.indexOf(tagObject.tag),
  );

  return (
    <>
      {tagObjectsSorted.map((tagObject, index) => {
        const id = `Book_card_tag_${tagObject.tag}`;

        return (
          <Tooltip
            key={index}
            text={tagObject.description}
            anchorEl="#__docusaurus"
            id={id}
          >
            <TagComp key={index} {...tagObject} />
          </Tooltip>
        );
      })}
    </>
  );
}

function BookCard({ user }: { user: BookUser }) {
  return (
    <li key={user.title} className="card shadow--md">
      <div className={clsx('card__image', styles.BookCardImage)}>
        <Image img={user.imageUrl} alt={user.title} />
      </div>

      <div className="card__body">
        <div className={styles.bookMetadataRow}>
          {user.badge && <span className="badge badge--secondary">{user.badge}</span>}
          {user.level && <span className="badge badge--info">{user.level}</span>}
          {user.rating && <span className={styles.bookRating}>★ {user.rating}</span>}
        </div>

        <div className={clsx(styles.BookCardHeader)}>
          <h4 className={styles.BookCardTitle}>
            <Link href={user.amazonUrl} className={styles.BookCardLink}>
              {user.title}
            </Link>
          </h4>

          {user.tags.includes('favorite') && (
            <FavoriteIcon svgClass={styles.svgIconFavorite} size="small" />
          )}
        </div>
        {user.author && (
          <p className={styles.BookAuthor}>
            <strong><Translate id="Book.card.author">By:</Translate></strong> {user.author}
          </p>
        )}

        <p className={styles.BookCardBody}>
          {user.description?.length > 120
            ? `${user.description.slice(0, 117)}...`
            : user.description}
        </p>

      </div>

      <ul className={clsx('card__footer', styles.cardFooter)}>
        <BookCardTag tags={user.tags} />
      </ul>
    </li>
  );
}

export default React.memo(BookCard);