/**
 * useRoomChannel unit tests
 * Tests pure utility functions — no Supabase connection needed.
 */
import { generateRoomCode, pickColor } from '../../hooks/useRoomChannel';

describe('useRoomChannel utilities', () => {
  describe('generateRoomCode', () => {
    it('generates a 6-character code', () => {
      const code = generateRoomCode();
      expect(code).toHaveLength(6);
    });

    it('uses only uppercase safe characters (no O, I, 0, 1)', () => {
      for (let i = 0; i < 50; i++) {
        const code = generateRoomCode();
        expect(code).toMatch(/^[A-HJ-NP-Z2-9]{6}$/);
      }
    });

    it('generates unique codes on repeated calls', () => {
      const codes = new Set(Array.from({ length: 20 }, generateRoomCode));
      expect(codes.size).toBeGreaterThan(10);
    });
  });

  describe('pickColor', () => {
    it('returns a hex color string', () => {
      const color = pickColor('user123');
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it('is deterministic for the same userId', () => {
      expect(pickColor('alice')).toBe(pickColor('alice'));
      expect(pickColor('bob')).toBe(pickColor('bob'));
    });

    it('returns different colors for different userIds', () => {
      const colors = new Set(['alice', 'bob', 'charlie', 'dave', 'eve', 'frank', 'grace', 'heidi'].map(pickColor));
      expect(colors.size).toBeGreaterThan(1);
    });
  });
});
