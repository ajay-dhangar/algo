import React, { JSX, useState, useMemo, useEffect } from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import Head from "@docusaurus/Head";
import FavoriteIcon from '../../components/svgIcons/FavoriteIcon';
import BookTagSelect, {
  readSearchTags,
} from './_components/BookTagSelect';
import BookFilterToggle, {
  type Operator,
  readOperator,
} from './_components/BookFilterToggle';
import BookCard from './_components/bookCard';
import {
  sortedBooks,
  Tags,
  TagList,
  type BookItem,
  type TagType,
} from '@site/src/data/Books';
import BookTooltip from './_components/BookTooltip';

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Translate, { translate } from '@docusaurus/Translate';
import { useHistory, useLocation } from '@docusaurus/router';
import { usePluralForm } from '@docusaurus/theme-common';
import { motion } from "framer-motion";
import styles from './styles.module.css';

type UserState = {
  scrollTopPosition: number;
  focusedElementId: string | undefined;
};

function restoreUserState(userState: UserState | null) {
  const { scrollTopPosition, focusedElementId } = userState ?? {
    scrollTopPosition: 0,
    focusedElementId: undefined,
  };
  
  document.getElementById(focusedElementId)?.focus();
  window.scrollTo({ top: scrollTopPosition });
}

export function prepareUserState(): UserState | undefined {
  if (ExecutionEnvironment.canUseDOM) {
    return {
      scrollTopPosition: window.scrollY,
      focusedElementId: document.activeElement?.id,
    };
  }

  return undefined;
}

const SearchNameQueryKey = 'name';

function readSearchName(search: string) {
  return new URLSearchParams(search).get(SearchNameQueryKey);
}

function filterUsers(
  users: BookItem[],
  selectedTags: TagType[],
  operator: Operator,
  searchName: string | null,
) {
  if (searchName) {
    // eslint-disable-next-line no-param-reassign
    users = users.filter((user) =>
      user.title.toLowerCase().includes(searchName.toLowerCase()),
    );
  }
  if (selectedTags.length === 0) {
    return users;
  }
  return users.filter((user) => {
    if (user.tags.length === 0) {
      return false;
    }
    if (operator === 'AND') {
      return selectedTags.every((tag) => user.tags.includes(tag));
    }
    return selectedTags.some((tag) => user.tags.includes(tag));
  });
}

function useFilteredUsers() {
  const location = useLocation<UserState>();
  const [operator, setOperator] = useState<Operator>('OR');
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [searchName, setSearchName] = useState<string | null>(null);
  useEffect(() => {
    setSelectedTags(readSearchTags(location.search));
    setOperator(readOperator(location.search));
    setSearchName(readSearchName(location.search));
    restoreUserState(location.state);
  }, [location]);

  return useMemo(
    () => filterUsers(sortedBooks, selectedTags, operator, searchName),
    [selectedTags, operator, searchName],
  );
}

function BookHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg">
      <div className="mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
            Algorithms & Data Structures <span className="text-[var(--ifm-color-primary)]">Library</span>
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
            Level up your DSA knowledge with curated textbooks, perfect for any skill level. Start reading today.
          </p>
        </div>
    </section>
  );
}

function useSiteCountPlural() {
  const { selectMessage } = usePluralForm();
  return (sitesCount: number) =>
    selectMessage(
      sitesCount,
      translate(
        {
          id: 'Book.filters.resultCount',
          description:
            'Pluralized label for the number of sites found on the Book. Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: '1 site|{sitesCount} sites',
        },
        {sitesCount},
      ),
    );
}

function BookFilters() {
  const filteredUsers = useFilteredUsers();
  const siteCountPlural = useSiteCountPlural();
  return (
    <section className="container margin-top--l margin-bottom--lg">
      <div className={clsx('margin-bottom--sm', styles.filterCheckbox)}>
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              delay: 0.2,
            }}
          >
            <Translate id="Book.filters.title">Filters</Translate>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              delay: 0.3,
            }}
          >
            <span>{siteCountPlural(filteredUsers.length)}</span>
          </motion.div>
        </div>
        <BookFilterToggle />
      </div>
      <motion.ul
                initial={{ opacity: 0}}
                whileInView={{ opacity: 1}}
                viewport={{ once: true }}
                transition={{
                  duration: 4,
                  type: "spring",
                  stiffness: 100,
                  delay: 0.5,
                }}
                className={clsx('clean-list', styles.checkboxList)}
              >
        {TagList.map((tag, i) => {
          const {label, description, color} = Tags[tag];
          const id = `Book_checkbox_id_${tag}`;

          return (
            <li key={i} className={styles.checkboxListItem}>
              <BookTooltip
                id={id}
                text={description}
                anchorEl="#__docusaurus"
              >
                <BookTagSelect
                  tag={tag}
                  id={id}
                  label={label}
                  icon={
                    tag === 'favorite' ? (
                      <FavoriteIcon svgClass={styles.svgIconFavoriteXs} />
                    ) : (
                      <span
                        style={{
                          backgroundColor: color,
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          marginLeft: 8,
                        }}
                      />
                    )
                  }
                />
              </BookTooltip>
            </li>
          );
        })}
      </motion.ul>
    </section>
  );
}

const favoriteUsers = sortedBooks.filter((user) =>
  user.tags.includes('favorite'),
);
const otherUsers = sortedBooks.filter(
  (user) => !user.tags.includes('favorite'),
);

function SearchBar() {
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = useState<string | null>(null);
  useEffect(() => {
    setValue(readSearchName(location.search));
  }, [location]);
  return (
    <div className={styles.searchContainer}>
      <input
        id="searchbar"
        placeholder={translate({
          message: 'Search for book name...',
          id: 'Book.searchBar.placeholder',
        })}
        value={value ?? undefined}
        onInput={(e) => {
          setValue(e.currentTarget.value);
          const newSearch = new URLSearchParams(location.search);
          newSearch.delete(SearchNameQueryKey);
          if (e.currentTarget.value) {
            newSearch.set(SearchNameQueryKey, e.currentTarget.value);
          }
          history.push({
            ...location,
            search: newSearch.toString(),
            state: prepareUserState(),
          });
          setTimeout(() => {
            document.getElementById('searchbar')?.focus();
          }, 0);
        }}
      />
    </div>
  );
}

function BookCards() {
  const filteredUsers = useFilteredUsers();

  if (filteredUsers.length === 0) {
    return (
      <section className="margin-top--lg margin-bottom--xl">
        <div className="container padding-vert--md text--center">
          <h2>
            <Translate id="Book.usersList.noResult">No result</Translate>
          </h2>
          <SearchBar />
        </div>
      </section>
    );
  }

  return (
    <section className="margin-top--lg margin-bottom--xl">
      {filteredUsers.length === sortedBooks.length ? (
        <>
          <div className={styles.BookFavorite}>
            <div className="container">
              <div
                className={clsx(
                  'margin-bottom--md',
                  styles.BookFavoriteHeader,
                )}
              >
                <motion.h2
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    stiffness: 100,
                    delay: 0.3,
                  }}
                >
                  <Translate id="Book.favoritesList.title">
                    Our favorites
                  </Translate>
                </motion.h2>
                <motion.h2
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    stiffness: 100,
                    delay: 0.3,
                  }}
                >
                  <FavoriteIcon svgClass={styles.svgIconFavorite} />
                </motion.h2>
                <SearchBar />
              </div>
              <motion.ul
                initial={{ opacity: 0}}
                whileInView={{ opacity: 1}}
                viewport={{ once: true }}
                transition={{
                  duration: 4,
                  type: "spring",
                  stiffness: 100,
                  delay: 0.4,
                }}
                className={clsx('container', 'clean-list', styles.BookList)}
              >

                {favoriteUsers.map((user) => (
                  <BookCard key={user.title} user={user} />
                ))}
              </motion.ul>
            </div>
          </div>
          <div className="container margin-top--lg">
            <motion.h2
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 100,
                delay: 0.5,
              }}
              className={styles.BookHeader}
            >
              <Translate id="Book.usersList.allUsers">All sites</Translate>
            </motion.h2>
            <motion.ul
              initial={{ opacity: 0}}
              whileInView={{ opacity: 1}}
              viewport={{ once: true }}
              transition={{
                duration: 4,
                type: "spring",
                stiffness: 100,
                delay: 0.5,
              }}
              className={clsx('clean-list', styles.BookList)}
            >
              {otherUsers.map((user) => (
                <BookCard key={user.title} user={user} />
              ))}
            </motion.ul>
          </div>
        </>
      ) : (
        <div className="container">
          <div
            className={clsx('margin-bottom--md', styles.BookFavoriteHeader)}
          >
            <SearchBar />
          </div>
          <ul className={clsx('clean-list', styles.BookList)}>
            {filteredUsers.map((user) => (
              <BookCard key={user.title} user={user} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default function Book(): JSX.Element {
  return (
    <Layout
      title={"Advanced Reference Stack"}
      description="Interactive index of algorithms resources configured with sorting and live category search filtering capabilities."
    >
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5832817025080991"
          crossOrigin="anonymous"
         />
        <script
          async
          custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
         />
        <meta name="google-adsense-account" content="ca-pub-5832817025080991" />
      </Head>
      <main className="margin-vert--lg">
        <BookHeader />
        <BookFilters />
        <BookCards />
      </main>
    </Layout>
  );
}
