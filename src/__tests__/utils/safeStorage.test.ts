import {
  safeJsonParse,
  readAlgoProgress,
  writeAlgoProgress,
  normalizeQuizId,
  getQuizAttemptStorageKey,
  markChallengeSolved,
  saveQuizAttemptLocal,
  getUserId,
  getAchievementSnapshot,
} from '../../utils/safeStorage';

describe('safeStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('safeJsonParse', () => {
    test('returns parsed JSON data on successful read', () => {
      localStorage.setItem('test_key', JSON.stringify({ a: 1, b: 'hello' }));
      const result = safeJsonParse('test_key', { a: 0, b: '' });
      expect(result).toEqual({ a: 1, b: 'hello' });
    });

    test('returns fallback value if key does not exist', () => {
      const result = safeJsonParse('non_existent', { fallback: true });
      expect(result).toEqual({ fallback: true });
    });

    test('handles invalid/corrupted JSON by logging warning, clearing key, and returning fallback', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      localStorage.setItem('corrupt_key', '{ invalid json ...');

      const result = safeJsonParse('corrupt_key', 'default_value');

      expect(result).toBe('default_value');
      expect(consoleWarnSpy).toHaveBeenCalled();
      expect(localStorage.getItem('corrupt_key')).toBeNull();

      consoleWarnSpy.mockRestore();
    });
  });

  describe('readAlgoProgress & writeAlgoProgress', () => {
    test('reads and writes progress data correctly and dispatches progressUpdated event', () => {
      const dispatchSpy = jest.spyOn(window, 'dispatchEvent');

      writeAlgoProgress({ 'topic-1': true, 'topic-1_title': 'Topic 1' });

      const progress = readAlgoProgress();
      expect(progress).toEqual({ 'topic-1': true, 'topic-1_title': 'Topic 1' });
      expect(dispatchSpy).toHaveBeenCalled();

      dispatchSpy.mockRestore();
    });
  });

  describe('normalizeQuizId & getQuizAttemptStorageKey', () => {
    test('normalizes alias quiz IDs', () => {
      expect(normalizeQuizId('graph')).toBe('graphs');
      expect(normalizeQuizId('binary-tree')).toBe('binary-trees');
      expect(normalizeQuizId('custom-quiz')).toBe('custom-quiz');
    });

    test('constructs proper storage key', () => {
      const key = getQuizAttemptStorageKey('User123', 'graph');
      expect(key).toBe('quiz_attempts_user123_graphs');
    });
  });

  describe('markChallengeSolved', () => {
    test('marks a challenge as solved in localStorage and dispatches event', () => {
      const dispatchSpy = jest.spyOn(window, 'dispatchEvent');

      markChallengeSolved('graph-01', 'Graph Representation');

      const progress = readAlgoProgress();
      expect(progress['graph-01']).toBe(true);
      expect(progress['graph-01_title']).toBe('Graph Representation');
      expect(progress.lastActiveAt).toBeDefined();

      expect(dispatchSpy).toHaveBeenCalled();

      dispatchSpy.mockRestore();
    });
  });

  describe('saveQuizAttemptLocal', () => {
    test('saves quiz attempt to localStorage and dispatches quizCompleted event', () => {
      const dispatchSpy = jest.spyOn(window, 'dispatchEvent');

      saveQuizAttemptLocal('user1', 'arrays', { score: 9, totalQuestions: 10 });

      const key = getQuizAttemptStorageKey('user1', 'arrays');
      const attempts = safeJsonParse(key, []);
      expect(attempts).toHaveLength(1);
      expect(attempts[0].score).toBe(9);

      expect(dispatchSpy).toHaveBeenCalled();

      dispatchSpy.mockRestore();
    });
  });

  describe('getUserId', () => {
    test('returns null if window/localStorage is missing or empty', () => {
      expect(getUserId()).toBeNull();
    });

    test('returns accountId from session data if present', () => {
      localStorage.setItem(
        'algo.auth.session.v1',
        JSON.stringify({ accountId: 'usr_abc123' })
      );
      expect(getUserId()).toBe('usr_abc123');
    });

    test('falls back to quiz_userId if session is absent', () => {
      localStorage.setItem('quiz_userId', 'usr_fallback');
      expect(getUserId()).toBe('usr_fallback');
    });
  });

  describe('getAchievementSnapshot', () => {
    test('calculates correct completion count, streak, and quiz stats', () => {
      markChallengeSolved('topic-1', 'Topic One');
      markChallengeSolved('topic-2', 'Topic Two');

      saveQuizAttemptLocal('user1', 'arrays', { score: 10, totalQuestions: 10 });

      const snapshot = getAchievementSnapshot();
      expect(snapshot.completedCount).toBe(2);
      expect(snapshot.completedTopics).toContain('topic-1');
      expect(snapshot.completedTopics).toContain('topic-2');
      expect(snapshot.totalQuizzesAttempted).toBeGreaterThanOrEqual(1);
    });
  });
});
