import React, { useState } from 'react';
import styles from './styles.module.css';

interface LanguageItem {
  id: string;
  name: string;
  category: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  color: string;
  iconText: string;
  description: string;
  useCases: string[];
  frameworks: string[];
  projects: string[];
  codeSnippet: string;
  docPath: string;
}

const LANGUAGES_DATA: LanguageItem[] = [
  {
    id: 'python',
    name: 'Python',
    category: ['Beginner Friendly', 'Data & AI', 'Web Dev'],
    difficulty: 'Beginner',
    color: '#3776AB',
    iconText: 'Py',
    description: 'High-level, versatile language known for readability and clean syntax. Perfect starting point for modern developers.',
    useCases: ['AI & Machine Learning', 'Data Science', 'Web Backend', 'Automation'],
    frameworks: ['Django', 'FastAPI', 'PyTorch', 'Pandas'],
    projects: ['Weather CLI App', 'Web Scraper', 'AI Image Classifier'],
    codeSnippet: `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))`,
    docPath: '/docs/languages/python/python-1',
  },
  {
    id: 'cpp',
    name: 'C++',
    category: ['Systems', 'Competitive Programming'],
    difficulty: 'Intermediate',
    color: '#00599C',
    iconText: 'C++',
    description: 'High-performance compiled language offering low-level memory management and rapid execution speed.',
    useCases: ['Game Development', 'Competitive Programming', 'Operating Systems', 'Embedded Systems'],
    frameworks: ['Unreal Engine', 'Qt', 'Boost', 'OpenGL'],
    projects: ['2D Game Engine', 'Memory Allocator', 'Custom Compiler'],
    codeSnippet: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, Algo!" << endl;\n    return 0;\n}`,
    docPath: '/docs/languages/cpp/cpp-1',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: ['Beginner Friendly', 'Web Dev'],
    difficulty: 'Beginner',
    color: '#F7DF1E',
    iconText: 'JS',
    description: 'The standard language of the web. Essential for creating dynamic frontends and scalable backend services.',
    useCases: ['Frontend Web', 'Backend Node.js', 'Fullstack Apps', 'Mobile Apps (React Native)'],
    frameworks: ['React', 'Next.js', 'Express', 'Vue'],
    projects: ['Interactive Quiz App', 'E-commerce UI', 'Real-time Chat App'],
    codeSnippet: `const greet = (name) => \`Hello, \${name}!\`;\nconsole.log(greet("Developer"));`,
    docPath: '/docs/languages/javascript/js-1',
  },
  {
    id: 'java',
    name: 'Java',
    category: ['Enterprise', 'Mobile', 'Web Dev'],
    difficulty: 'Intermediate',
    color: '#ED8B00',
    iconText: 'JV',
    description: 'Object-oriented, platform-independent language powering enterprise systems and Android application development.',
    useCases: ['Enterprise Backends', 'Android Apps', 'Financial Systems', 'Big Data'],
    frameworks: ['Spring Boot', 'Hibernate', 'Android SDK'],
    projects: ['Student Management System', 'Banking API', 'Android Calculator'],
    codeSnippet: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}`,
    docPath: '/docs/languages/java/java-1',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: ['Web Dev'],
    difficulty: 'Intermediate',
    color: '#3178C6',
    iconText: 'TS',
    description: 'Typed superset of JavaScript that compiles to plain JavaScript, enabling robust large-scale web applications.',
    useCases: ['Large Web Applications', 'Fullstack Development', 'Open Source Libraries'],
    frameworks: ['Next.js', 'NestJS', 'tRPC'],
    projects: ['Type-safe Task Tracker', 'REST API Server', 'Design System'],
    codeSnippet: `interface User {\n  id: number;\n  name: string;\n}\nconst user: User = { id: 1, name: "Algo Learner" };`,
    docPath: '/docs/languages/TypeScript/typescript-1',
  },
  {
    id: 'go',
    name: 'Go (Golang)',
    category: ['Systems', 'Web Dev'],
    difficulty: 'Intermediate',
    color: '#00ADD8',
    iconText: 'GO',
    description: 'Designed by Google for simplicity, concurrency, and high performance in cloud infrastructure and microservices.',
    useCases: ['Cloud Computing', 'Microservices', 'DevOps Tools', 'Networking'],
    frameworks: ['Gin', 'Fiber', 'Docker (built in Go)', 'Kubernetes'],
    projects: ['URL Shortener API', 'CLI File Manager', 'Concurrent Web Crawler'],
    codeSnippet: `package main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, Go!")\n}`,
    docPath: '/docs/languages/go/go-1',
  },
  {
    id: 'rust',
    name: 'Rust',
    category: ['Systems'],
    difficulty: 'Advanced',
    color: '#DEA584',
    iconText: 'RS',
    description: 'Empowers developers to build reliable and efficient software with memory safety and zero-cost abstractions.',
    useCases: ['Systems Programming', 'WebAssembly', 'Crypto/Blockchain', 'Game Engines'],
    frameworks: ['Actix Web', 'Tokio', 'Tauri', 'Bevy'],
    projects: ['High-performance HTTP Server', 'Text Editor CLI', 'Wasm Markdown Parser'],
    codeSnippet: `fn main() {\n    println!("Hello, Rust!");\n}`,
    docPath: '/docs/languages/Rust/rust-1',
  },
  {
    id: 'c',
    name: 'C',
    category: ['Systems'],
    difficulty: 'Intermediate',
    color: '#A8B9CC',
    iconText: 'C',
    description: 'The foundational language of modern computer science. Provides direct hardware control and fast performance.',
    useCases: ['OS Kernels', 'Embedded Systems', 'Compilers', 'Database Engines'],
    frameworks: ['POSIX', 'GLib', 'Raylib'],
    projects: ['Custom Shell', 'HTTP Server from Scratch', 'Snake Game in Console'],
    codeSnippet: `#include <stdio.h>\n\nint main() {\n    printf("Hello from C!\\n");\n    return 0;\n}`,
    docPath: '/docs/languages/C/c-1',
  },
  {
    id: 'sql',
    name: 'SQL',
    category: ['Data & AI', 'Beginner Friendly'],
    difficulty: 'Beginner',
    color: '#336791',
    iconText: 'SQL',
    description: 'Standard domain-specific language used to manage, query, and manipulate relational database systems.',
    useCases: ['Database Querying', 'Data Analysis', 'Backend Integration', 'Business Intelligence'],
    frameworks: ['PostgreSQL', 'MySQL', 'SQLite', 'Prisma ORM'],
    projects: ['E-commerce Analytics Queries', 'User Database Schema', 'Sales Report Generator'],
    codeSnippet: `SELECT first_name, last_name \nFROM students \nWHERE score >= 90 \nORDER BY score DESC;`,
    docPath: '/docs/languages/SQL/sql-1',
  },
  {
    id: 'swift',
    name: 'Swift',
    category: ['Mobile'],
    difficulty: 'Intermediate',
    color: '#F05138',
    iconText: 'SW',
    description: 'Powerful, intuitive language created by Apple for building iOS, macOS, watchOS, and visionOS applications.',
    useCases: ['iOS Apps', 'macOS Apps', 'Apple Watch Apps'],
    frameworks: ['SwiftUI', 'UIKit', 'CoreData', 'Combine'],
    projects: ['Habit Tracker iOS App', 'Weather Widget', 'Notes Manager'],
    codeSnippet: `import SwiftUI\n\nstruct ContentView: View {\n    var body: some View {\n        Text("Hello, iOS!")\n    }\n}`,
    docPath: '/docs/languages/swift/introduction',
  },
  {
    id: 'php',
    name: 'PHP',
    category: ['Web Dev'],
    difficulty: 'Beginner',
    color: '#777BB4',
    iconText: 'PHP',
    description: 'Popular server-side scripting language designed for web development and powering CMS platforms.',
    useCases: ['Web Development', 'Content Management Systems (WordPress)', 'API Servers'],
    frameworks: ['Laravel', 'Symfony', 'WordPress'],
    projects: ['Blog Platform', 'E-commerce API', 'User Auth Portal'],
    codeSnippet: `<?php\necho "Hello from PHP!";\n?>`,
    docPath: '/docs/languages/php/php-1',
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    category: ['Mobile', 'Web Dev'],
    difficulty: 'Intermediate',
    color: '#7F52FF',
    iconText: 'KT',
    description: 'Modern, concise, cross-platform language fully supported by Google as the official language for Android.',
    useCases: ['Android App Development', 'Backend Server', 'Cross-platform Mobile'],
    frameworks: ['Jetpack Compose', 'Ktor', 'Spring Boot'],
    projects: ['Fitness Tracker Android App', 'Ktor Microservice', 'Recipe Book App'],
    codeSnippet: `fun main() {\n    println("Hello, Kotlin!")\n}`,
    docPath: '/docs/languages/kotlin/kotlin-1',
  },
];

const CATEGORY_FILTERS = [
  'All',
  'Beginner Friendly',
  'Web Dev',
  'Data & AI',
  'Systems',
  'Mobile',
  'Competitive Programming',
];

export default function ProgrammingHub(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openCodeId, setOpenCodeId] = useState<string | null>(null);

  const filteredLanguages = LANGUAGES_DATA.filter((lang) => {
    const matchesCategory =
      activeCategory === 'All' || lang.category.includes(activeCategory);
    const matchesSearch =
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.useCases.some((uc) =>
        uc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const toggleCode = (id: string) => {
    setOpenCodeId(openCodeId === id ? null : id);
  };

  return (
    <div className={styles.container}>
      {/* Hero Header */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Interactive Programming Hub</h1>
        <p className={styles.heroSubtitle}>
          Explore popular programming languages, understand their best use cases, discover frameworks, inspect code snippets, and follow structured roadmaps.
        </p>
      </div>

      {/* Beginner Roadmap Banner */}
      <div className={styles.roadmapSection}>
        <div className={styles.roadmapTitle}>
          🗺️ Beginner Learning Roadmap: Where to Start?
        </div>
        <div className={styles.roadmapSteps}>
          <div className={styles.roadmapStep}>
            <span className={styles.stepNumber}>Step 1</span>
            <div className={styles.stepTitle}>Pick Your First Language</div>
            <div className={styles.stepDesc}>
              We recommend <strong>Python</strong> for AI & Data, <strong>JavaScript</strong> for Web Development, or <strong>C++</strong> for Systems & DSA.
            </div>
          </div>
          <div className={styles.roadmapStep}>
            <span className={styles.stepNumber}>Step 2</span>
            <div className={styles.stepTitle}>Master Core Fundamentals</div>
            <div className={styles.stepDesc}>
              Learn variables, conditional logic, loops, functions, object-oriented concepts, and basic error handling.
            </div>
          </div>
          <div className={styles.roadmapStep}>
            <span className={styles.stepNumber}>Step 3</span>
            <div className={styles.stepTitle}>Conquer Data Structures (DSA)</div>
            <div className={styles.stepDesc}>
              Apply your language to Arrays, Linked Lists, Trees, Sorting Algorithms, and Dynamic Programming.
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search language, use case, or framework..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterTags}>
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${
                activeCategory === cat ? styles.filterBtnActive : ''
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      {filteredLanguages.length === 0 ? (
        <div className={styles.noResults}>
          <h3>No matching programming languages found</h3>
          <p>Try searching for another keyword or switching your filter tag.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredLanguages.map((lang) => (
            <div key={lang.id} className={styles.card}>
              <div>
                <div className={styles.cardHeader}>
                  <div className={styles.langInfo}>
                    <div
                      className={styles.langIcon}
                      style={{ backgroundColor: lang.color }}
                    >
                      {lang.iconText}
                    </div>
                    <h2 className={styles.langTitle}>{lang.name}</h2>
                  </div>
                  <span
                    className={`${styles.badge} ${
                      lang.difficulty === 'Beginner'
                        ? styles.badgeBeginner
                        : lang.difficulty === 'Intermediate'
                        ? styles.badgeIntermediate
                        : styles.badgeAdvanced
                    }`}
                  >
                    {lang.difficulty}
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <p className={styles.description}>{lang.description}</p>

                  <div className={styles.metaSection}>
                    <div className={styles.metaLabel}>Best Use Cases</div>
                    <div className={styles.tagList}>
                      {lang.useCases.map((uc) => (
                        <span key={uc} className={styles.tag}>
                          {uc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.metaSection}>
                    <div className={styles.metaLabel}>Frameworks & Libraries</div>
                    <div className={styles.tagList}>
                      {lang.frameworks.map((fw) => (
                        <span key={fw} className={styles.tag}>
                          {fw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    className={styles.codeToggle}
                    onClick={() => toggleCode(lang.id)}
                  >
                    {openCodeId === lang.id ? '▼ Hide Code Example' : '▶ View Code Example'}
                  </button>

                  {openCodeId === lang.id && (
                    <pre className={styles.codeBlock}>
                      <code>{lang.codeSnippet}</code>
                    </pre>
                  )}
                </div>
              </div>

              <div className={styles.cardFooter}>
                <a href={lang.docPath} className={styles.cardBtn}>
                  Start Learning {lang.name} →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
