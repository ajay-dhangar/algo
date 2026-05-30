export type TourPlacement = "top" | "bottom" | "left" | "right" | "center";

export interface SiteTourStep {
  id: string;
  title: string;
  body: string;
  /** CSS selector; omitted for centered steps */
  target?: string;
  placement?: TourPlacement;
  /** Shown when target is not found on the current page */
  hint?: string;
}

export const SITE_TOUR_STORAGE_KEY = "algo-site-tour-completed";

/** Eight-step site tour (Skip available on every step). */
export const SITE_TOUR_STEPS: SiteTourStep[] = [
  {
    id: "tutorial",
    title: "Step 1 of 8 — Tutorial (Docs)",
    body: "Welcome to Algo. The Tutorial is your main library—algorithms, data structures, and languages—in the docs sidebar. Click Tutorial anytime to learn.",
    target: ".algo-tour-step-tutorial",
    placement: "bottom",
    hint: "Use the Tutorial link in the top navbar to open the docs.",
  },
  {
    id: "sidebar",
    title: "Step 2 of 8 — Topic sidebar",
    body: "Topics are grouped here: fundamentals, basic structures, Extra (graphs, DP, sorting), and cheatsheets. New learners: start with Programming Fundamentals or Basic Data Structures.",
    target: ".theme-doc-sidebar-container",
    placement: "right",
    hint: "Open Tutorial from the navbar—the topic list appears on the left of doc pages.",
  },
  {
    id: "roadmap",
    title: "Step 3 of 8 — Learning roadmap",
    body: "Pick Topic For Contribution opens the DSA roadmap—see what to study next or which topics need documentation. Ideal for GSSoC and open-source contributors.",
    target: ".algo-tour-step-roadmap",
    placement: "bottom",
  },
  {
    id: "interview",
    title: "Step 4 of 8 — Interview prep",
    body: "More → Top DSA Questions leads to the DSA Interview section—interview-focused paths separate from the main Tutorial.",
    target: ".algo-tour-step-more",
    placement: "bottom",
    hint: "Open the More menu on the right, then choose Top DSA Questions.",
  },
  {
    id: "playground",
    title: "Step 5 of 8 — Playground",
    body: "More → Playground: run JavaScript in the browser; Python, C++, and Java run when the backend is started locally. Try code right after reading a topic.",
    target: ".algo-tour-step-more",
    placement: "bottom",
    hint: "Open More → Playground to write and run snippets.",
  },
  {
    id: "quizzes",
    title: "Step 6 of 8 — Quizzes",
    body: "More → Quizzes covers arrays, stacks, trees, and more. Enter a username to track attempts when the API is available. Quiz Solutions and Leaderboard are in the same menu.",
    target: ".algo-tour-step-more",
    placement: "bottom",
    hint: "Open More → Quizzes to test your knowledge.",
  },
  {
    id: "graphs",
    title: "Step 7 of 8 — Graphs & advanced topics",
    body: "In Tutorial, go to Extra → Graphs for BFS, DFS, and shortest paths. Sorting and searching are under Extra → Algorithms; dynamic programming under Extra → Dynamic Programming.",
    target: ".algo-tour-step-tutorial",
    placement: "bottom",
    hint: "Open Tutorial, then browse Extra → Graphs in the sidebar.",
  },
  {
    id: "finish",
    title: "Step 8 of 8 — Start learning",
    body: "Suggested path: roadmap → sorting & searching → core structures → graphs → quizzes & interview prep. Reopen this tour from the Tour button or add ?tour=1 to the URL.",
    placement: "center",
  },
];
