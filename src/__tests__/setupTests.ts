import '@testing-library/jest-dom';

// Global ResizeObserver Mock
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Global IntersectionObserver Mock
global.IntersectionObserver = class IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};

// Global matchMedia Mock
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Global window.scrollTo & Element.prototype.scrollIntoView Mocks
window.scrollTo = jest.fn();
if (typeof Element.prototype.scrollIntoView !== 'function') {
  Element.prototype.scrollIntoView = jest.fn();
}

// Global URL.createObjectURL & URL.revokeObjectURL Mocks for JSDOM
if (typeof URL.createObjectURL !== 'function') {
  URL.createObjectURL = jest.fn(() => 'blob:mock-url');
}
if (typeof URL.revokeObjectURL !== 'function') {
  URL.revokeObjectURL = jest.fn();
}

// Global Worker Mock simulating execution for useConsoleCapture
if (typeof global.Worker === 'undefined' || (global.Worker as any).name === 'MockWorker') {
  class MockWorker {
    onmessage: ((e: any) => void) | null = null;
    onerror: ((e: any) => void) | null = null;

    postMessage(data: { code?: string } | any) {
      const code = data?.code || '';
      const logs: string[] = [];
      const origLog = console.log;
      const origErr = console.error;
      console.log = (...args: any[]) => logs.push(args.map(String).join(' '));
      console.error = (...args: any[]) => logs.push('❌ Error: ' + args.map(String).join(' '));
      try {
        // eslint-disable-next-line no-new-func
        new Function(code)();
      } catch (err: any) {
        const msg = err instanceof Error ? err.message : String(err);
        logs.push('❌ Error: ' + msg);
      } finally {
        console.log = origLog;
        console.error = origErr;
      }
      setTimeout(() => {
        this.onmessage?.({ data: { logs } });
      }, 0);
    }

    terminate() {}
    addEventListener() {}
    removeEventListener() {}
    dispatchEvent() {
      return true;
    }
  }
  (global as any).Worker = MockWorker;
}

// Global performance marks and measures
if (!performance.mark) {
  performance.mark = jest.fn();
}
if (!performance.measure) {
  performance.measure = jest.fn();
}
