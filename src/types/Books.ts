export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type FilterCategory = 'All' | SkillLevel | 'Interview Prep';
export type SortOption = 'rating' | 'title' | 'level';

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  rating: number;
  amazonUrl: string;
  imageUrl: string;
  badge?: string;
  level: SkillLevel;
  tags: string[];
}
