import { buildPublicProfileSnapshot, getPublicProfileSettings, savePublicProfileSettings, getPublicProfileBadgeMarkdown } from '../../utils/publicProfile';

describe('public profile utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns a private snapshot by default when no visibility setting exists', () => {
    const snapshot = buildPublicProfileSnapshot({
      username: 'ada',
      displayName: 'Ada Lovelace',
      email: 'ada@example.com',
    });

    expect(snapshot.isPublic).toBe(false);
    expect(snapshot.visibleSections).toEqual([]);
    expect(snapshot.username).toBe('ada');
  });

  it('persists and reads public profile settings', () => {
    savePublicProfileSettings({
      isPublic: true,
      username: 'ada',
      displayName: 'Ada Lovelace',
      bio: 'Building better study habits.',
      showSolvedProblems: true,
      showQuizMastery: true,
      showStreak: true,
      allowBadgeEmbed: true,
    });

    const settings = getPublicProfileSettings();
    expect(settings?.isPublic).toBe(true);
    expect(settings?.bio).toBe('Building better study habits.');
    expect(settings?.showSolvedProblems).toBe(true);
  });

  it('creates markdown for a GitHub README badge', () => {
    const markdown = getPublicProfileBadgeMarkdown('ada');
    expect(markdown).toContain('/u/ada/badge');
    expect(markdown).toContain('Algo profile');
  });
});
