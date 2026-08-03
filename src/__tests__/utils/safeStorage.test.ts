import {
  safeJsonParse,
  readAlgoProgress,
  writeAlgoProgress,
  normalizeQuizId,
  getQuizAttemptStorageKey,
  markChallengeSolved,
  saveQuizAttemptLocal,
  getUserId,
  extractQuizIdFromStorageKey,
  getAchievementSnapshot,
  safeGetItem,
  safeSetItem,
  safeRemoveItem,
} from '../../utils/safeStorage';

describe('safeStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('extractQuizIdFromStorageKey', () => {
    test('extracts quiz ID for normal user ID without underscores', () => {
      expect(extractQuizIdFromStorageKey('quiz_attempts_user1_arrays')).toBe('arrays');
      expect(extractQuizIdFromStorageKey('quiz_attempts_john_graphs')).toBe('graphs');
    });

    test('extracts quiz ID for user ID with one underscore', () => {
      expect(extractQuizIdFromStorageKey('quiz_attempts_john_doe_arrays')).toBe('arrays');
      expect(extractQuizIdFromStorageKey('quiz_attempts_user_123_sorting')).toBe('sorting');
    });

    test('extracts quiz ID for user ID with multiple underscores', () => {
      expect(extractQuizIdFromStorageKey('quiz_attempts_guest_user_1_arrays')).toBe('arrays');
      expect(extractQuizIdFromStorageKey('quiz_attempts_usr_test_account_99_recursion')).toBe('recursion');
    });

    test('extracts hyphenated quiz IDs and normalizes aliases', () => {
      expect(extractQuizIdFromStorageKey('quiz_attempts_user_123_binary-trees')).toBe('binary-trees');
      expect(extractQuizIdFromStorageKey('quiz_attempts_guest_user_1_binary-tree')).toBe('binary-trees');
      expect(extractQuizIdFromStorageKey('quiz_attempts_john_doe_priority-queues')).toBe('priority-queues');
    });

    test('handles unknown quiz IDs safely', () => {
      expect(extractQuizIdFromStorageKey('quiz_attempts_user_123_custom-algo-quiz')).toBe('custom-algo-quiz');
    });

    test('handles malformed keys and empty inputs without throwing', () => {
      expect(extractQuizIdFromStorageKey('')).toBeNull();
      expect(extractQuizIdFromStorageKey('quiz_attempts_')).toBeNull();
      expect(extractQuizIdFromStorageKey('quiz_attempts_user_')).toBe('user');
      expect(extractQuizIdFromStorageKey('invalid_prefix_key')).toBeNull();
    });
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

  describe('safeGetItem, safeSetItem, safeRemoveItem', () => {
    test('safeSetItem stores value and safeGetItem retrieves it', () => {
      safeSetItem('test_raw_key', 'test_value');
      expect(safeGetItem('test_raw_key')).toBe('test_value');
    });

    test('safeGetItem returns fallback when key does not exist', () => {
      expect(safeGetItem('missing_key', 'default')).toBe('default');
      expect(safeGetItem('missing_key')).toBeNull();
    });

    test('safeRemoveItem removes value from localStorage', () => {
      safeSetItem('to_remove', 'value');
      expect(safeGetItem('to_remove')).toBe('value');
      safeRemoveItem('to_remove');
      expect(safeGetItem('to_remove')).toBeNull();
    });

    test('safeGetItem logs warning and returns fallback when localStorage throws', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('Storage access error');
      });

      const result = safeGetItem('error_key', 'fallback_val');

      expect(result).toBe('fallback_val');
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[Algo] Error reading localStorage key "error_key":',
        expect.any(Error)
      );

      getItemSpy.mockRestore();
      consoleWarnSpy.mockRestore();
    });

    test('safeSetItem logs error when localStorage throws (e.g. QuotaExceededError)', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const setItemSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });

      safeSetItem('quota_key', 'large_value');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[Algo] Error setting localStorage key "quota_key":',
        expect.any(Error)
      );

      setItemSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });

    test('safeRemoveItem logs warning when localStorage throws', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('Remove error');
      });

      safeRemoveItem('remove_err_key');

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[Algo] Error removing localStorage key "remove_err_key":',
        expect.any(Error)
      );

      removeItemSpy.mockRestore();
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

      saveQuizAttemptLocal('user1', 'arrays', {
        score: 9,
        totalQuestions: 10,
        missedQuestionIds: [1, 3],
      });

      const key = getQuizAttemptStorageKey('user1', 'arrays');
      const attempts = safeJsonParse(key, []);
      expect(attempts).toHaveLength(1);
      expect(attempts[0].score).toBe(9);
      expect(attempts[0].missedQuestionIds).toEqual([1, 3]);

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

    test('correctly calculates quiz stats for user IDs containing underscores and hyphenated quiz IDs', () => {
      saveQuizAttemptLocal('john_doe', 'arrays', { score: 10 });
      saveQuizAttemptLocal('guest_user_1', 'binary-tree', { score: 12 }); // 12/12 = 100% (mastered)

      const snapshot = getAchievementSnapshot();
      expect(snapshot.totalQuizzesAttempted).toBe(2);
      expect(snapshot.quizzesPassed).toBe(2);
      expect(snapshot.quizzesMastered).toBe(2);
    });

    test('handles empty storage and malformed keys gracefully', () => {
      localStorage.clear();
      localStorage.setItem('quiz_attempts_', JSON.stringify([{ score: 10 }]));
      localStorage.setItem('quiz_attempts_user_', JSON.stringify([{ score: 10 }]));
      localStorage.setItem('corrupt_quiz_key', 'invalid json');

      const snapshot = getAchievementSnapshot();
      expect(snapshot.totalQuizzesAttempted).toBe(1); // 'user' fallback
      expect(snapshot.quizzesPassed).toBe(1);
    });
  });
});
