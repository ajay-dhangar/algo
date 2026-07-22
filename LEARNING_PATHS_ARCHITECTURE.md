# Learning Paths - Visual Architecture & Data Flow

## 🏗️ Component Hierarchy

```
App
├── LearningPathsPage (/learning-paths)
│   ├── HeroSection
│   ├── SearchFilterBar
│   │   ├── SearchInput
│   │   ├── DifficultyFilter
│   │   └── SortOptions
│   ├── PathsGrid
│   │   └── PathCard[] (4 paths)
│   │       ├── Icon + Title
│   │       ├── Stats (topics, hours)
│   │       ├── Benefits
│   │       └── Explore Button
│   ├── FeaturesSection
│   │   └── FeatureCard[] (6 features)
│   └── CTASection
│
└── PathDetail (/learning-paths/:pathId)
    ├── HeroSection
    │   ├── Icon + Path Name
    │   ├── Description
    │   └── Stats Cards (5)
    ├── ProgressBar
    ├── ControlsSection
    │   ├── SortDropdown
    │   └── FilterDropdown
    ├── PathInfoSidebar
    │   ├── About This Path
    │   ├── Key Benefits
    │   └── Statistics
    └── TopicsGrid
        └── TopicCard[] (variable)
            ├── Status Badge
            ├── Icon + Title
            ├── Description
            ├── Metadata Grid
            │   ├── Difficulty
            │   ├── Time
            │   ├── Relevance
            │   └── Prerequisites
            ├── Prerequisites Box
            └── Action Buttons
```

---

## 📊 Data Flow Architecture

```
┌─────────────────────────────────────────────────────┐
│             learningPaths.ts                         │
│  (Central Data Store)                               │
├─────────────────────────────────────────────────────┤
│                                                      │
│  learningPaths: LearningPath[]                      │
│  ├── id, name, description, icon, color             │
│  ├── targetAudience, totalHours, difficulty         │
│  ├── keyBenefits[]                                  │
│  └── topics: TopicMetadata[]                        │
│      ├── id, title, difficulty                      │
│      ├── estimatedTime, icon, description           │
│      ├── prerequisites[], interviewRelevance        │
│      └── docLink                                    │
│                                                      │
└──────────┬──────────────────┬───────────────────────┘
           │                  │
           ▼                  ▼
    ┌─────────────┐    ┌─────────────────┐
    │   PathCard  │    │   TopicCard     │
    │ Component   │    │ Component       │
    └────┬────────┘    └────┬────────────┘
         │                  │
         ▼                  ▼
    PathsPage           PathDetail
    (Browse)            (Learn)
```

---

## 🔄 Data Access Patterns

### Pattern 1: Display All Paths
```typescript
// ✅ Used in: LearningPathsPage

import { learningPaths } from 'src/data/learningPaths';

learningPaths.map(path => (
  <PathCard path={path} onExplore={handleExplore} />
))
```

### Pattern 2: Get Specific Path
```typescript
// ✅ Used in: PathDetail page

import { getLearningPathById } from 'src/data/learningPaths';

const path = getLearningPathById(pathId);
if (!path) return <NotFound />;

// Display path details
```

### Pattern 3: Get Specific Topic
```typescript
// ✅ Used in: Topic interactions

import { getTopicById } from 'src/data/learningPaths';

const topic = getTopicById(pathId, topicId);
// Use topic metadata
```

### Pattern 4: Filter Paths
```typescript
// ✅ Used in: LearningPathsPage filters

const filteredPaths = learningPaths.filter(
  path => path.difficulty === selectedDifficulty
);
```

### Pattern 5: Search Topics
```typescript
// ✅ Used in: PathDetail search

const matchingTopics = path.topics.filter(topic =>
  topic.title.toLowerCase().includes(query.toLowerCase())
);
```

---

## 🎯 Component Props & State

### LearningPathsPage Props & State

```typescript
interface LearningPathsPageState {
  selectedPath: string | null
  filters: {
    difficulty: "All" | "Beginner" | "Intermediate" | "Advanced"
    sortBy: "newest" | "duration" | "difficulty"
  }
  searchQuery: string
}

// Computed values
filteredPaths: LearningPath[] = useMemo(...)
```

### PathDetail Props & State

```typescript
interface PathDetailState {
  path: LearningPath
  completedTopics: Set<string>
  inProgressTopics: Set<string>
  sortBy: "order" | "difficulty" | "time"
  filterDifficulty: "All" | "Easy" | "Medium" | "Hard"
}

// Computed values
stats = {
  totalTopics, completedCount, inProgressCount, progressPercent, totalHours
}
```

---

## 🔄 State Management Flow

```
┌─────────────────────────────────────────┐
│  User Interaction                        │
│  (Search, Filter, Sort, Toggle)         │
└─────────────┬───────────────────────────┘
              │
              ▼
    ┌─────────────────────┐
    │  Update Local State │
    │  (setState)         │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────────┐
    │  Recompute Derived      │
    │  Values (useMemo)       │
    └──────────┬──────────────┘
               │
               ▼
    ┌─────────────────────────┐
    │  Re-render Component    │
    │  with New Data          │
    └──────────┬──────────────┘
               │
               ▼
    ┌─────────────────────────┐
    │  Display Updated UI     │
    │  (Framer Motion)        │
    └─────────────────────────┘
```

---

## 📱 Responsive Layout Breakpoints

```
Mobile (<640px)          Tablet (640-1024px)      Desktop (>1024px)
┌──────────────┐        ┌────────────────────┐   ┌────────────────────────┐
│              │        │  [  Path 1 ]  [ P2 ]   │  [ Path 1 ]  [ Path 2 ]  │
│ [Path Card]  │        │  [  Path 3 ]  [ P4 ]   │  [ Path 3 ]  [ Path 4 ]  │
│              │        │                        │                          │
│ [Path Card]  │        │ 2 Columns               │ 2 Columns                │
│              │        │                        │ or 3 Columns             │
│ [Path Card]  │        │                        │                          │
│              │        │                        │                          │
│ [Path Card]  │        │                        │                          │
│              │        │                        │                          │
│              │        │                        │                          │
│  1 Column    │        └────────────────────┘   └────────────────────────┘
└──────────────┘
```

---

## 🎨 Color & Theme System

```
Light Mode                          Dark Mode
┌──────────────────────┐           ┌──────────────────────┐
│ Background: white    │           │ Background: #111827  │
│ Text: #111827        │           │ Text: #f3f4f6        │
│ Border: #e5e7eb      │           │ Border: #374151      │
│ Accent: #3b82f6      │           │ Accent: #60a5fa      │
│                      │           │                      │
│ Path Gradients:      │           │ Path Gradients:      │
│ • Blue → Cyan        │           │ • Blue → Cyan        │
│ • Purple → Pink      │           │ • Purple → Pink      │
│ • Green → Emerald    │           │ • Green → Emerald    │
│ • Yellow → Orange    │           │ • Yellow → Orange    │
└──────────────────────┘           └──────────────────────┘
```

---

## 🔀 Navigation Flow

```
START
  │
  ├─→ /learning-paths ────→ LearningPathsPage
  │                         ├─→ View all 4 paths
  │                         ├─→ Search/Filter
  │                         ├─→ Sort options
  │                         └─→ "Explore Path" button
  │                              │
  │                              ▼
  └──→ /learning-paths/:pathId → PathDetail
       ├─→ View path details
       ├─→ List all topics
       ├─→ Filter topics
       ├─→ Sort topics
       └─→ Track progress
            │
            ├─→ Mark Completed
            ├─→ Mark In Progress
            └─→ View Stats
```

---

## 📦 Data Import/Export Patterns

### Importing Data

```typescript
// Import all learning paths
import { learningPaths } from 'src/data/learningPaths';

// Import specific utilities
import {
  getLearningPathById,
  getTopicById,
  calculateTotalTime,
  getDifficultyColor,
  getRelevanceStars,
} from 'src/data/learningPaths';

// Import types
import type {
  LearningPath,
  TopicMetadata,
  DifficultyLevel,
  InterviewRelevance,
} from 'src/data/learningPaths';
```

### Exporting Components

```typescript
// In src/components/LearningPaths/index.ts
export { TopicCard } from './TopicCard';
export { PathCard } from './PathCard';

// Usage
import { TopicCard, PathCard } from 'src/components/LearningPaths';
```

---

## 🔄 Event Flow Examples

### Example 1: User Searches for "Arrays"

```
1. User types "Arrays" in SearchInput
   │
   ├─→ onChange event triggered
   ├─→ setSearchQuery("Arrays")
   ├─→ Local state updates
   │
2. filteredPaths useMemo recalculates
   ├─→ Filters learningPaths
   ├─→ Matches "Arrays" in name/description
   │
3. Component re-renders
   ├─→ Shows matching paths
   ├─→ Filters applied visually
   │
4. UI displays results
   └─→ "Arrays" highlighted in paths
```

### Example 2: User Marks Topic as Completed

```
1. User clicks "Completed" button on topic
   │
   ├─→ onClick event triggered
   ├─→ toggleCompleted(topicId) called
   ├─→ completedTopics Set updated
   │
2. Component re-renders
   ├─→ TopicCard shows completed state
   ├─→ Progress bar recalculates
   ├─→ Stats update
   │
3. UI shows changes
   ├─→ Green background on topic
   ├─→ Checkmark badge appears
   ├─→ Progress percentage updates
   ├─→ Total stats refresh
   │
4. Optional: Save to localStorage
   └─→ Progress persists on reload
```

---

## 🎬 Animation Sequence

### Path Card Hover Effect

```
1. Initial State
   └─→ y: 0, opacity: 1, shadow: low

2. Hover Detected
   └─→ Transition starts (spring physics)

3. Animation In Progress
   ├─→ y: -8px (lift effect)
   ├─→ shadow: increase (more depth)
   ├─→ duration: ~300ms
   │
4. Final Hover State
   └─→ y: -8px, shadow: high, scale: 1.02

5. Hover Ends
   ├─→ Reverse animation
   ├─→ Return to initial state
   └─→ duration: ~300ms
```

### Progress Bar Fill Animation

```
1. Initial
   └─→ width: 0%

2. Animate to Target Percentage
   ├─→ width: 0% → X% (smooth)
   ├─→ Type: spring
   ├─→ Stiffness: 50
   └─→ Duration: varies (0-2s)

3. Final
   └─→ width: X% (target percentage)
```

---

## 🧪 Component Testing Checklist

### TopicCard Component
- [ ] Renders with all metadata
- [ ] Displays correct difficulty color
- [ ] Shows prerequisites count
- [ ] Interview relevance stars display
- [ ] Status badges show correctly
- [ ] Hover effects work
- [ ] Dark mode displays correctly
- [ ] Mobile layout responsive
- [ ] Links are clickable
- [ ] Icons render properly

### PathCard Component
- [ ] Displays path information
- [ ] Gradient color shows correctly
- [ ] Stats cards visible
- [ ] Benefits list truncates at 2 items
- [ ] Explore button clickable
- [ ] Hover lift effect works
- [ ] Dark mode looks good
- [ ] Mobile fully responsive
- [ ] All 4 paths render
- [ ] No layout shifts

### LearningPathsPage
- [ ] Hero section displays
- [ ] All 4 paths visible in grid
- [ ] Search filters work
- [ ] Difficulty filter works
- [ ] Sort options work
- [ ] Features section visible
- [ ] CTA section present
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Navigation works

### PathDetail Page
- [ ] Path hero renders correctly
- [ ] Progress bar visible
- [ ] Topics list displays all topics
- [ ] Sort works (order, difficulty, time)
- [ ] Filter works (all difficulties)
- [ ] Status toggles work
- [ ] Stats update correctly
- [ ] Dark mode works
- [ ] Back button navigates
- [ ] No console errors

---

## 🚀 Performance Optimization Points

```
Component Rendering
├─→ React.memo on cards (prevent re-renders)
├─→ useMemo for filtered data
├─→ useCallback for event handlers
└─→ Lazy loading for detail pages

Bundle Size
├─→ Tree-shaking unused exports
├─→ Code splitting on routes
└─→ Minification in production

Runtime Performance
├─→ Efficient state updates
├─→ Debounced search input
├─→ Virtualized lists (if needed)
└─→ CSS over JavaScript animations

Network
├─→ No external API calls
├─→ Data bundled with app
└─→ Minimal icon files (emojis)
```

---

## 📊 Sample Data Queries

### Get Total Time Across All Paths
```typescript
const totalHours = learningPaths.reduce(
  (sum, path) => sum + path.totalHours, 
  0
); // Result: 142+ hours
```

### Get All Easy Topics
```typescript
const easyTopics = learningPaths
  .flatMap(path => path.topics)
  .filter(topic => topic.difficulty === 'Easy');
```

### Get Topics Requiring Prerequisites
```typescript
const complexTopics = learningPaths
  .flatMap(path => path.topics)
  .filter(topic => topic.prerequisites.length > 0);
```

### Get High Interview Relevance Topics
```typescript
const importantTopics = learningPaths
  .flatMap(path => path.topics)
  .filter(topic => topic.interviewRelevance >= 4);
```

---

## 🎯 Feature Roadmap

### Phase 1: Core (✅ Complete)
- [x] 4 Learning paths
- [x] Topic metadata system
- [x] React components
- [x] Pages and routing
- [x] Search/filter/sort
- [x] Progress UI

### Phase 2: Enhancement (Upcoming)
- [ ] localStorage persistence
- [ ] User accounts
- [ ] Export progress
- [ ] Social sharing
- [ ] Email reminders

### Phase 3: Advanced (Future)
- [ ] AI recommendations
- [ ] Video tutorials
- [ ] Code playgrounds
- [ ] Community forum
- [ ] Certifications

---

## 🔧 Debugging Tips

### If components aren't rendering:
1. Check TypeScript compilation errors
2. Verify imports are correct
3. Check file paths match actual files
4. Look for React key warnings

### If styles look broken:
1. Verify Tailwind config includes paths
2. Check dark mode toggle works
3. Run `npm run clear` to reset cache
4. Check browser zoom level

### If navigation doesn't work:
1. Verify routes match file structure
2. Check `useBaseUrl()` usage
3. Verify docusaurus.config.js updated
4. Check URL parameters in dynamic routes

### If data is missing:
1. Verify learningPaths.ts exports correctly
2. Check import statements have correct path
3. Verify data structure matches interfaces
4. Check for undefined in console

---

**Visualization Complete!** 📊

Use these diagrams and flows to understand the Learning Paths architecture and implementation.
