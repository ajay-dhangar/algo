import { BookItem } from "./Books";

export const Users: BookItem[] = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    description: "The absolute gold standard for transitioning from basic algorithms to production system design. It unpicks the internal data structures of databases, distributed queues, indexing, and storage engines.",
    imageUrl: require("/books/ddia.jpg"),
    amazonUrl: "https://link.amazon/B0jir2qzL",
    badge: "Kindle Edition",
    level: "Advanced",
    rating: 4.1,
    tags: ["system-design", "backend", "distributed-systems", "favorite"],
  },
    // // Grokking Algorithms
  {
    title: "Grokking Algorithms",
    author: "Aditya Y. Bhargava",
    description: "A fully illustrated, visual guide that breaks down complex data structures and algorithmic concepts into easy-to-digest real-world scenarios. Perfect for beginners.",
    imageUrl: require("/books/grokking.jpg"),
    amazonUrl: "https://link.amazon/B04uqG7qB",
    badge: "Paperback",
    level: "Beginner",
    rating: 4.8,
    tags: ["visual", "python", "basics"],
  },

  {
    title: "The Algorithm Design Manual",
    author: "Steven S. Skiena",
    description: "Widely considered the best practical algorithm reference for working engineers. The first half explains algorithmic design theory, while the second half acts as a comprehensive catalog of data structures and algorithmic implementations.",
    imageUrl: require("/books/tadm.jpg"),
    amazonUrl: "https://link.amazon/B01HBMTVg",
    badge: "Kindle Edition",
    level: "Intermediate",
    rating: 4.4,
    tags: ["dsa", "practical", "interview-prep"],
  },
  
  {
    title: "Algorithms",
    author: "Robert Sedgewick, Kevin Wayne",
    description: "The leading textbook on algorithms used in university classrooms globally. It features highly optimized Java implementations for sorting, searching, graph processing, and string parsing.",
    imageUrl: require("/books/algorithms.jpg"),
    amazonUrl: "https://link.amazon/B09CmvQtf",
    badge: "Hardcover",
    level: "Intermediate",
    rating: 4.6,
    tags: ["dsa", "java", "academic"],
  },
];