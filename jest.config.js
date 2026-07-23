module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupTests.ts'],
  moduleNameMapper: {
    '^@theme/Layout$': '<rootDir>/src/__tests__/__mocks__/LayoutMock.tsx',
    '^@theme/(.*)$': '<rootDir>/src/__tests__/__mocks__/themeMock.js',
    '^@docusaurus/Link$': '<rootDir>/src/__tests__/__mocks__/LinkMock.tsx',
    '^@docusaurus/BrowserOnly$': '<rootDir>/src/__tests__/__mocks__/BrowserOnlyMock.tsx',
    '^@docusaurus/useDocusaurusContext$': '<rootDir>/src/__tests__/__mocks__/useDocusaurusContextMock.ts',
    '^@docusaurus/(.*)$': '<rootDir>/src/__tests__/__mocks__/docusaurusMock.js',
    '^@monaco-editor/react$': '<rootDir>/src/__tests__/__mocks__/monacoEditorMock.tsx',
    '^@site/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': '<rootDir>/src/__tests__/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__tests__/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
  testMatch: ['**/__tests__/**/*.test.(ts|tsx|js|jsx)'],
};
