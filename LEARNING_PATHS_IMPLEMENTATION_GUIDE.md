# Learning Paths Feature - Implementation Guide

## Quick Start

This guide provides step-by-step instructions to integrate the Learning Paths feature into the Algo platform.

---

## Phase 1: Setup & Data Integration

### Step 1.1: Verify Files Created
All data and component files have been created:
```
✓ src/data/learningPaths.ts
✓ src/components/LearningPaths/TopicCard.tsx
✓ src/components/LearningPaths/PathCard.tsx
✓ src/pages/learning-paths/index.tsx
✓ src/pages/learning-paths/[pathId].tsx
```

### Step 1.2: Create Index File for Components
Create `src/components/LearningPaths/index.ts`:
```bash
# Location: src/components/LearningPaths/index.ts
```

```typescript
export { TopicCard } from './TopicCard';
export { PathCard } from './PathCard';
```

### Step 1.3: Verify Tailwind CSS
Ensure tailwind.config.js includes all required utilities:
```bash
# Check that the following are configured:
# - Grid system (grid, grid-cols-*)
# - Spacing (p, m, gap, etc.)
# - Typography (text-*, font-*)
# - Colors (bg-*, text-*, border-*)
# - Animations (motion-*)
# - Dark mode support
```

---

## Phase 2: Navigation Integration

### Step 2.1: Update Docusaurus Config
Edit `docusaurus.config.js` to add Learning Paths route:

```javascript
// Find the themeConfig.navbar.items array and add:
{
  label: 'Learning Paths',
  to: '/learning-paths',
  position: 'left',
},
```

**Location to add**: Usually after "Roadmap" item

### Step 2.2: Update Sidebar (if using docs sidebar)
Edit `sidebars.js` (if applicable):
```javascript
// Add entry linking to learning paths
{
  type: 'link',
  label: 'Learning Paths',
  href: '/learning-paths',
}
```

---

## Phase 3: Homepage Integration (OPTIONAL)

### Step 3.1: Create Learning Paths Homepage Section
Create `src/components/Homepage/LearningPathsSection.tsx`:

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { learningPaths } from '../../data/learningPaths';
import PathCard from '../LearningPaths/PathCard';

export const LearningPathsSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Choose Your Learning Path
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Select a structured learning journey based on your goals and experience level
          </p>
        </motion.div>

        {/* Paths Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 mb-8"
        >
          {learningPaths.map((path, index) => (
            <PathCard
              key={path.id}
              path={path}
              index={index}
              onExplore={(pathId) => {
                window.location.href = useBaseUrl(`/learning-paths/${pathId}`);
              }}
            />
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href={useBaseUrl('/learning-paths')}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-transform hover:scale-105 dark:bg-blue-700"
          >
            View All Learning Paths →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LearningPathsSection;
```

### Step 3.2: Update Homepage Index
Edit `src/components/Homepage/index.tsx`:

```typescript
// Add import at the top
import LearningPathsSection from './LearningPathsSection';

// Add in the return/render section (after "How It Works" section)
<LearningPathsSection />
```

---

## Phase 4: Testing

### Step 4.1: Run Development Server
```bash
npm run start
```

### Step 4.2: Navigate to Pages
Test the following routes:
- `http://localhost:3000/learning-paths` - Main learning paths page
- `http://localhost:3000/learning-paths/beginner-programmer` - Path detail page
- Check homepage for Learning Paths section (if added)

### Step 4.3: Test Functionality
- [ ] Search filtering works
- [ ] Difficulty filter works
- [ ] Sort options work
- [ ] Topic cards display correctly
- [ ] Navigation between paths works
- [ ] Dark mode looks good
- [ ] Mobile responsive
- [ ] Links to documentation work

---

## Phase 5: Data Customization

### Step 5.1: Add Documentation Links
Update `src/data/learningPaths.ts` to add `docLink` to topics:

```typescript
{
  id: "arrays-dsa",
  title: "Arrays (DSA Focus)",
  // ... other properties
  docLink: "/docs/data-structures/arrays", // Add this
}
```

### Step 5.2: Customize Topic Metadata
Update any topic information:
- Time estimates based on actual data
- Prerequisites based on content structure
- Interview relevance based on interview data

### Step 5.3: Add Path Icons
Paths currently use emojis. To use custom icons:
```typescript
// Option 1: Keep using emojis (current)
icon: "📚"

// Option 2: Use react-icons (if needed)
import { FaBook } from 'react-icons/fa';
// Then in component: <FaBook />
```

---

## Phase 6: Enhancement Features

### Step 6.1: Add Progress Persistence (localStorage)
In `src/pages/learning-paths/[pathId].tsx`:

```typescript
useEffect(() => {
  // Load saved progress
  const saved = localStorage.getItem(`path-progress-${pathId}`);
  if (saved) {
    const { completed, inProgress } = JSON.parse(saved);
    setCompletedTopics(new Set(completed));
    setInProgressTopics(new Set(inProgress));
  }
}, []);

useEffect(() => {
  // Save progress
  localStorage.setItem(
    `path-progress-${pathId}`,
    JSON.stringify({
      completed: Array.from(completedTopics),
      inProgress: Array.from(inProgressTopics),
    })
  );
}, [completedTopics, inProgressTopics]);
```

### Step 6.2: Add Export Feature
```typescript
const exportProgress = () => {
  const data = {
    path: path.name,
    completed: completedTopics.size,
    total: path.topics.length,
    percentage: (completedTopics.size / path.topics.length) * 100,
    timestamp: new Date().toISOString(),
  };
  console.log(JSON.stringify(data, null, 2));
};
```

### Step 6.3: Add Social Sharing
```typescript
const shareProgress = () => {
  const text = `I'm learning DSA with the ${path.name} path! I've completed ${completedTopics.size} out of ${path.topics.length} topics (${stats.progressPercent}%). Join me at ${window.location.href}`;
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
    '_blank'
  );
};
```

---

## Phase 7: Styling Adjustments

### Step 7.1: Match Brand Colors
Update gradient colors in `learningPaths.ts` to match brand:
```typescript
// Adjust these colors to match Algo's branding
color: "from-[YOUR_PRIMARY] to-[YOUR_SECONDARY]"
```

### Step 7.2: Update Font Family
If using custom fonts, update in components:
```typescript
className="font-[your-custom-font]"
```

### Step 7.3: Adjust Spacing
Update Tailwind spacing scale in responsive design if needed.

---

## Phase 8: SEO & Metadata

### Step 8.1: Update Page Titles & Descriptions
Already included in page components via `<Layout>` tag:
```typescript
<Layout
  title="Learning Paths - Algo"
  description="Structured learning paths for DSA mastery"
>
```

### Step 8.2: Add Structured Data (Optional)
Add JSON-LD schema markup in page components.

---

## Phase 9: Performance Optimization

### Step 9.1: Code Splitting
Update `docusaurus.config.js` to enable code splitting:
```javascript
// Already default in Docusaurus 3.x
```

### Step 9.2: Image Optimization
- Emojis are lightweight (unicode)
- No optimization needed for current implementation

### Step 9.3: Component Memoization
Already implemented with React.memo in component definitions.

---

## Phase 10: Accessibility Audit

### Step 10.1: Check Contrast Ratios
Use WebAIM Contrast Checker for:
- Text on colored backgrounds
- Focus indicators

### Step 10.2: Test Keyboard Navigation
- Tab through all interactive elements
- Test arrow keys in dropdowns
- Check focus order

### Step 10.3: Screen Reader Testing
- Test with NVDA (Windows) or VoiceOver (Mac)
- Verify all labels and descriptions are announced

---

## Common Issues & Solutions

### Issue: Pages Not Found
**Solution**: Ensure files are in correct locations:
```
src/pages/learning-paths/index.tsx (main page)
src/pages/learning-paths/[pathId].tsx (detail page)
```

### Issue: Styles Not Applying
**Solution**: 
1. Check Tailwind is installed: `npm ls tailwindcss`
2. Verify tailwind.config.js includes component paths
3. Clear build cache: `npm run clear`

### Issue: Dark Mode Not Working
**Solution**:
1. Check dark mode is enabled in docusaurus.config.js
2. Verify dark: prefixes in Tailwind classes
3. Check browser preference: Settings > Appearance

### Issue: Navigation Link Broken
**Solution**:
1. Use `useBaseUrl()` from @docusaurus/useDocusaurus
2. Verify route matches page file name
3. Check docusaurus.config.js baseUrl

---

## Deployment Checklist

- [ ] All components created and tested
- [ ] Navigation menu updated
- [ ] Homepage section added (if Option A chosen)
- [ ] Routes working correctly
- [ ] Mobile responsive tested
- [ ] Dark mode tested
- [ ] Accessibility audit passed
- [ ] SEO metadata verified
- [ ] Build completes without errors: `npm run build`
- [ ] Deployed to production

---

## Build & Deploy

### Local Testing
```bash
# Build the project
npm run build

# Serve locally
npm run serve
```

### Production Deployment
```bash
# Build and deploy (based on your deployment setup)
npm run deploy
```

---

## File Size Reference

After implementation:
- Learning Paths data: ~15KB (minified)
- Components: ~8KB (minified)
- Total additional: ~23KB (minimal impact)

---

## Future Roadmap

### Short Term (1-2 weeks)
- [ ] User feedback collection
- [ ] Bug fixes and refinements
- [ ] Performance optimizations

### Medium Term (1-2 months)
- [ ] User accounts and progress sync
- [ ] Advanced filtering options
- [ ] Personalized recommendations

### Long Term (3+ months)
- [ ] Video tutorials per topic
- [ ] Interactive code challenges
- [ ] Community discussions
- [ ] Certification program

---

## Support & Feedback

For issues or suggestions:
1. Check GitHub issues
2. Review design document
3. Test with different browsers
4. Collect user feedback via surveys

---

## Additional Resources

- [Docusaurus Documentation](https://docusaurus.io/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Best Practices](https://react.dev/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Last Updated**: 2024
**Version**: 1.0
**Status**: Ready for Implementation
