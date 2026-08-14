import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { useTOCHighlightObserver } from '../../hooks/useTOCHighlightObserver';
import TOCItems from '../../theme/TOCItems';

// Mock Docusaurus hooks
jest.mock('@docusaurus/theme-common', () => ({
  __esModule: true,
  useThemeConfig: () => ({
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  }),
  useColorMode: () => ({ colorMode: 'light', setColorMode: jest.fn() }),
}));

jest.mock('@docusaurus/theme-common/internal', () => ({
  __esModule: true,
  useTOCHighlight: jest.fn(),
  useFilteredAndTreeifiedTOC: ({ toc }: { toc: unknown[] }) => toc,
}));

jest.mock('@docusaurus/Link', () => ({
  __esModule: true,
  default: ({ to, className, children, dangerouslySetInnerHTML }: any) => (
    <a href={to} className={className}>
      {children}
      {dangerouslySetInnerHTML && <span dangerouslySetInnerHTML={dangerouslySetInnerHTML} />}
    </a>
  ),
}));

const mockToc = [
  { id: 'section-1', value: 'Section 1', level: 2, children: [] },
  { id: 'section-2', value: 'Section 2', level: 2, children: [] },
  { id: 'section-3', value: 'Section 3', level: 3, children: [] },
];

function TestPage() {
  useTOCHighlightObserver({
    linkClassName: 'table-of-contents__link',
    linkActiveClassName: 'table-of-contents__link--active',
  });

  return (
    <div>
      <div className="table-of-contents">
        <TOCItems
          toc={mockToc}
          linkClassName="table-of-contents__link"
          linkActiveClassName="table-of-contents__link--active"
        />
      </div>

      <main>
        <h2 id="section-1">Section 1</h2>
        <p>Content for section 1</p>
        <h2 id="section-2">Section 2</h2>
        <p>Content for section 2</p>
        <h3 id="section-3">Section 3</h3>
        <p>Content for section 3</p>
      </main>
    </div>
  );
}

describe('TOCItems & useTOCHighlightObserver', () => {
  let observeMock: jest.Mock;
  let disconnectMock: jest.Mock;

  beforeEach(() => {
    observeMock = jest.fn();
    disconnectMock = jest.fn();

    window.IntersectionObserver = jest.fn().mockImplementation((callback: any) => {
      (window as any).__intersectionCallback = callback;
      return {
        observe: observeMock,
        unobserve: jest.fn(),
        disconnect: disconnectMock,
      };
    }) as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders TOC links correctly', () => {
    const { container } = render(<TestPage />);
    const link1 = container.querySelector('a[href="#section-1"]');
    const link2 = container.querySelector('a[href="#section-2"]');
    const link3 = container.querySelector('a[href="#section-3"]');

    expect(link1).toBeInTheDocument();
    expect(link2).toBeInTheDocument();
    expect(link3).toBeInTheDocument();
  });

  it('observes heading elements on mount', () => {
    render(<TestPage />);
    expect(observeMock).toHaveBeenCalled();
  });

  it('highlights the active section when IntersectionObserver / scroll triggers', () => {
    const { container } = render(<TestPage />);

    const link1 = container.querySelector('a[href="#section-1"]');
    const link2 = container.querySelector('a[href="#section-2"]');

    expect(link1).toHaveClass('table-of-contents__link--active');

    act(() => {
      const h1 = document.getElementById('section-1');
      const h2 = document.getElementById('section-2');
      const h3 = document.getElementById('section-3');

      if (h1) jest.spyOn(h1, 'getBoundingClientRect').mockReturnValue({ top: -200 } as any);
      if (h2) jest.spyOn(h2, 'getBoundingClientRect').mockReturnValue({ top: 50 } as any);
      if (h3) jest.spyOn(h3, 'getBoundingClientRect').mockReturnValue({ top: 600 } as any);

      window.scrollY = 200;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(link2).toHaveClass('table-of-contents__link--active');
  });

  it('handles edge case when scrolled to top of page', () => {
    const { container } = render(<TestPage />);
    const link1 = container.querySelector('a[href="#section-1"]');

    act(() => {
      window.scrollY = 0;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(link1).toHaveClass('table-of-contents__link--active');
  });
});
