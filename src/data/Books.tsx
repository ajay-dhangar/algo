import { sortBy } from "../utils/jsUtils";
import { Users } from "./bookData"; // Point this to where your BOOKS_DATA array lives

export type Tag = {
  label: string;
  description: string;
  color: string;
};

// Extracted from your BOOKS_DATA tags
export type TagType =
  | "system-design"
  | "backend"
  | "distributed-systems"
  | "visual"
  | "python"
  | "basics"
  | "dsa"
  | "practical"
  | "interview-prep"
  | "java"
  | "academic"
  | "favorite"; // Kept favorite for the sorting algorithm logic

export type BookItem = {
  // id: string;
  title: string;
  author: string;
  description: string;
  rating: number;
  amazonUrl: string;
  imageUrl: string;
  badge: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: TagType[];
};

export const Tags: { [type in TagType]: Tag } = {
  "system-design": {
    label: "System Design",
    description: "Architecture and systems scale",
    color: "#a44fb7",
  },
  backend: {
    label: "Backend",
    description: "Server-side development",
    color: "#026e00",
  },
  "distributed-systems": {
    label: "Distributed Systems",
    description: "Multi-node network computing",
    color: "#8c2f00",
  },
  visual: {
    label: "Visual",
    description: "Illustrated guidebooks",
    color: "#ff4400",
  },
  python: {
    label: "Python",
    description: "Python language examples",
    color: "#3572A5",
  },
  basics: {
    label: "Basics",
    description: "Fundamental concepts",
    color: "#39ca30",
  },
  dsa: {
    label: "DSA",
    description: "Data Structures & Algorithms",
    color: "#007acc",
  },
  practical: {
    label: "Practical",
    description: "Real-world developer applications",
    color: "#dfd545",
  },
  "interview-prep": {
    label: "Interview Prep",
    description: "Coding interview studies",
    color: "#fe6829",
  },
  java: {
    label: "Java",
    description: "Java language implementations",
    color: "#b07219",
  },
  academic: {
    label: "Academic",
    description: "Textbooks and theory curriculum",
    color: "#555555",
  },
  favorite: {
    label: "Favorite",
    description: "Top recommended reads",
    color: "#f06529",
  },
};

export const TagList = Object.keys(Tags) as TagType[];

function sortBooks() {
  // We typecast or map the incoming data tags if they are plain strings
  let result = Users as BookItem[];
  
  // 1. Sort alphabetically by book title
  result = sortBy(result, (book) => book.title.toLowerCase());
  
  // 2. Float "favorite" books to the top of the pile
  result = sortBy(result, (book) => !book.tags.includes("favorite"));
  
  return result;
}

export const sortedBooks = sortBooks();