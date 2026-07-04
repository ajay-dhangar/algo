# Learning Paths Feature - Quick Reference Guide

## Overview

The Learning Paths feature provides guided learning journeys for DSA learners at different skill levels.

**4 Learning Paths:**
1. 📚 New to Programming (16 hours)
2. 🚀 New to Data Structures & Algorithms (29 hours)
3. 💼 Placement Preparation (45 hours)
4. 🏆 Competitive Programming (52 hours)

---

## Directory Structure

```
src/
├── data/
│   └── learningPaths.ts          # Data definitions
├── components/
│   └── LearningPaths/            # Learning Paths components
│       ├── TopicCard.tsx         # Individual topic display
│       ├── PathCard.tsx          # Individual path display
│       └── index.ts              # Exports
└── pages/
    └── learning-paths/           # Learning Paths pages
        ├── index.tsx             # Main paths list
        └── [pathId].tsx          # Individual path detail
```

---

## Key Components

### 1. Data Structure (`learningPaths.ts`)

**TopicMetadata Interface:**
```typescript
{
  id: string                      // Unique identifier
  title: string                   // Topic name
  difficulty: "Easy" | "Medium" | "Hard"
  estimatedTime: number           // Hours
  prerequisites: string[]         // Topic IDs
  interviewRelevance: 1 | 2 | 3 | 4 | 5
  description: string
  icon?: string                   // Emoji
  docLink?: string                // URL to documentation
}
```

**LearningPath Interface:**
```typescript
{
  id: string                      // Path identifier
  name: string                    // Display name
  description: string
  icon: string                    // Emoji
  color: string                   // Tailwind gradient class
  targetAudience: string
  totalHours: number
  topics: TopicMetadata[]
  keyBenefits: string[]
  difficulty: "Beginner" | "Intermediate" | "Advanced"
}
```

### 2. Topic Card Component

**Props:**
```typescript
interface TopicCardProps {
  topic: TopicMetadata
  index: number
  isCompleted?: boolean
  isInProgress?: boolean
}
```

**Features:**
- Status badges (Completed/In Progress)
- Metadata display (difficulty, time, relevance)
- Prerequisites visualization
- Action buttons (Read Docs, Start Learning)

### 3. Path Card Component

**Props:**
```typescript
interface PathCardProps {
  path: LearningPath
  index: number
  onExplore?: (pathId: string) => void
}
```

**Features:**
- Path overview with gradient
- Stats (topics, hours)
- Key benefits preview
- Explore button

### 4. Learning Paths Page

**Route:** `/learning-paths`

**Features:**
- Display all 4 paths in 2x2 grid
- Search and filter options
- Sort by newest/duration/difficulty
- "Why Choose Our Learning Paths" section
- CTA section

### 5. Path Detail Page

**Route:** `/learning-paths/:pathId`

**Features:**
- Individual path overview
- Progress tracking
- Topic list with sorting/filtering
- Path info sidebar
- Statistics display

---

## Customization Guide

### Add New Learning Path

**Step 1:** Define path topics in `src/data/learningPaths.ts`

```typescript
const newPathTopics: TopicMetadata[] = [
  {
    id: "topic-1",
    title: "Topic 1",
    difficulty: "Easy",
    estimatedTime: 2,
    prerequisites: [],
    interviewRelevance: 4,
    description: "Description here",
    icon: "📚",
  },
  // ... more topics
];
```

**Step 2:** Create path object

```typescript
{
  id: "new-path-id",
  name: "🎯 New Path Name",
  description: "Path description",
  icon: "🎯",
  color: "from-color-500 to-color-600",  // Tailwind class
  targetAudience: "Audience description",
  totalHours: 30,
  topics: newPathTopics,
  keyBenefits: ["Benefit 1", "Benefit 2"],
  difficulty: "Intermediate",
}
```

**Step 3:** Add to learningPaths array

```typescript
export const learningPaths: LearningPath[] = [
  // ... existing paths
  newPath,
];
```

### Add New Topic to Existing Path

**In `learningPaths.ts`:**

```typescript
const newTopic: TopicMetadata = {
  id: "new-topic-id",
  title: "New Topic",
  difficulty: "Medium",
  estimatedTime: 2.5,
  prerequisites: ["existing-topic-id"],
  interviewRelevance: 4,
  description: "Topic description",
  icon: "🔧",
  docLink: "/docs/path/to/doc",
};

// Add to relevant path's topics array
dsaFundamentalsTopics.push(newTopic);
```

### Update Path Metadata

**Colors (Gradients):**
```typescript
// Modify the color property
color: "from-blue-500 to-cyan-500"  // Blue to Cyan
color: "from-red-500 to-pink-500"   // Red to Pink
color: "from-green-500 to-teal-500" // Green to Teal
```

**Difficulty Colors:**
- Easy: Green (#10b981)
- Medium: Amber (#f59e0b)
- Hard: Red (#ef4444)

**Interview Relevance:**
- 1 star: Not commonly asked
- 2 stars: Occasionally asked
- 3 stars: Regularly asked
- 4 stars: Frequently asked
- 5 stars: Essential

---

## Component Usage Examples

### Using TopicCard

```typescript
import { TopicCard } from '@/components/LearningPaths';
import { TopicMetadata } from '@/data/learningPaths';

const topic: TopicMetadata = { /* ... */ };

<TopicCard
  topic={topic}
  index={0}
  isCompleted={false}
  isInProgress={true}
/>
```

### Using PathCard

```typescript
import { PathCard } from '@/components/LearningPaths';
import { LearningPath } from '@/data/learningPaths';

const path: LearningPath = { /* ... */ };

<PathCard
  path={path}
  index={0}
  onExplore={(pathId) => navigate(`/learning-paths/${pathId}`)}
/>
```

### Importing Learning Paths Data

```typescript
import {
  learningPaths,
  getLearningPathById,
  getTopicById,
  calculateTotalTime,
  getDifficultyColor,
  getRelevanceStars,
} from '@/data/learningPaths';

// Get all paths
const allPaths = learningPaths;

// Get specific path
const path = getLearningPathById('placement-prep');

// Get specific topic
const topic = getTopicById('placement-prep', 'binary-search');

// Calculate total time
const totalTime = calculateTotalTime(path.topics);

// Get difficulty styling
const diffClass = getDifficultyColor('Medium');

// Get stars
const stars = getRelevanceStars(5); // "⭐⭐⭐⭐⭐"
```

---

## Styling Reference

### Colors

**Primary Gradients:**
- Blue/Cyan: `from-blue-500 to-cyan-500`
- Purple/Pink: `from-purple-500 to-pink-500`
- Green/Emerald: `from-green-500 to-emerald-500`
- Yellow/Orange: `from-yellow-500 to-orange-500`

**Text Colors:**
- Primary: `text-gray-900 dark:text-white`
- Secondary: `text-gray-600 dark:text-gray-400`
- Muted: `text-gray-500 dark:text-gray-500`

**Background Colors:**
- Light: `bg-gray-50 dark:bg-gray-900`
- Card: `bg-white dark:bg-gray-800`
- Hover: `bg-gray-100 dark:bg-gray-700/50`

### Spacing Scale

```
0.25rem (xs) - 4px
0.5rem (sm) - 8px
1rem (md) - 16px
1.5rem (lg) - 24px
2rem (xl) - 32px
3rem (2xl) - 48px
```

### Typography

**Heading Sizes:**
- H1: `text-4xl md:text-5xl` (60px)
- H2: `text-3xl` (30px)
- H3: `text-2xl` (24px)
- H4: `text-xl` (20px)

**Font Weights:**
- Regular: `font-normal` (400)
- Medium: `font-medium` (500)
- Semibold: `font-semibold` (600)
- Bold: `font-bold` (700)

---

## States & Status

### Topic Status States

**Default (Not Started)**
```
Border: gray-200 (light) / gray-700 (dark)
Background: white / gray-800
```

**In Progress**
```
Border: blue-500/50
Background: blue-50 / blue-900/20
Indicator: "In Progress" badge
```

**Completed**
```
Border: green-500/50
Background: green-50 / green-900/20
Indicator: "✓ Completed" badge
```

### Path Progress

- **Not Started**: No progress
- **In Progress**: 1-99% complete
- **Completed**: 100% complete

---

## Responsive Breakpoints

- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (2-3 columns)

---

## Dark Mode Support

All components include dark mode variants using Tailwind's `dark:` prefix.

**Key dark mode classes:**
```typescript
bg-white dark:bg-gray-800
text-gray-900 dark:text-white
border-gray-200 dark:border-gray-700
```

---

## Animations

### Framer Motion Variants

**Card Entrance:**
```typescript
{
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}
```

**Card Hover:**
```typescript
{
  hover: {
    y: -8,
    transition: { type: "spring", stiffness: 300 }
  }
}
```

**Progress Bar:**
```typescript
{
  initial: { width: 0 },
  animate: { width: `${percentage}%` },
  transition: { type: "spring", stiffness: 50 }
}
```

---

## Routes & Navigation

### Available Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/learning-paths` | LearningPathsPage | Main hub with all paths |
| `/learning-paths/:pathId` | PathDetail | Individual path detail |
| `/learning-paths/beginner-programmer` | PathDetail | Beginner path |
| `/learning-paths/dsa-fundamentals` | PathDetail | DSA path |
| `/learning-paths/placement-prep` | PathDetail | Placement prep path |
| `/learning-paths/competitive-programming` | PathDetail | Competitive programming path |

### Navigation Links

```typescript
// Main paths page
useBaseUrl('/learning-paths')

// Specific path
useBaseUrl('/learning-paths/placement-prep')

// Back from detail
useBaseUrl('/learning-paths')
```

---

## Helper Functions

All in `src/data/learningPaths.ts`:

```typescript
// Get path by ID
getLearningPathById(id: string): LearningPath | undefined

// Get topic by ID and path ID
getTopicById(pathId: string, topicId: string): TopicMetadata | undefined

// Calculate total hours for topics array
calculateTotalTime(topics: TopicMetadata[]): number

// Get difficulty styling class
getDifficultyColor(difficulty: DifficultyLevel): string

// Get star rating string
getRelevanceStars(relevance: InterviewRelevance): string
```

---

## Performance Tips

1. **Use Memoization**: Components use `React.memo` for optimization
2. **Lazy Load**: Detail pages only load when visited
3. **Optimize Images**: Use SVG emojis (lightweight)
4. **Code Splitting**: Automatic with Docusaurus

---

## Testing Checklist

- [ ] All 4 paths display correctly
- [ ] Search filtering works
- [ ] Difficulty filtering works
- [ ] Sorting works (newest, duration, difficulty)
- [ ] Topic cards display all metadata
- [ ] Prerequisites show correctly
- [ ] Dark mode displays correctly
- [ ] Mobile layout responsive
- [ ] Links navigate correctly
- [ ] Progress tracking works
- [ ] No console errors

---

## Common Tasks

### Find a Specific Path

```typescript
const path = learningPaths.find(p => p.id === 'placement-prep');
```

### Get Total Topics Count

```typescript
const totalTopics = learningPaths.reduce((sum, p) => sum + p.topics.length, 0);
```

### Get Average Path Duration

```typescript
const avgDuration = learningPaths.reduce((sum, p) => sum + p.totalHours, 0) / learningPaths.length;
```

### Filter Paths by Difficulty

```typescript
const advancedPaths = learningPaths.filter(p => p.difficulty === 'Advanced');
```

### Get Topics by Difficulty

```typescript
const hardTopics = path.topics.filter(t => t.difficulty === 'Hard');
```

---

## Troubleshooting

### Topics Not Showing
- Check topic ID matches in prerequisites
- Verify topic is added to path.topics array
- Check for typos in topic ID

### Styling Broken
- Verify Tailwind classes are spelled correctly
- Check dark: prefix for dark mode
- Clear Next.js cache: `npm run clear`

### Navigation Not Working
- Use `useBaseUrl()` hook
- Check route path matches file name
- Verify docusaurus.config.js baseUrl

### Data Not Loading
- Check learningPaths.ts is exported correctly
- Verify import statement uses correct path
- Check browser console for errors

---

## Quick Links

- [Design Document](./LEARNING_PATHS_DESIGN.md)
- [Implementation Guide](./LEARNING_PATHS_IMPLEMENTATION_GUIDE.md)
- [Data Structure](./src/data/learningPaths.ts)
- [Main Page](./src/pages/learning-paths/index.tsx)
- [Detail Page](./src/pages/learning-paths/[pathId].tsx)

---

**Version**: 1.0
**Last Updated**: 2024
**Maintained By**: Algo Development Team
