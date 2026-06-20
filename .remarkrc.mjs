import remarkFrontmatter from 'remark-frontmatter';
import remarkMdx from 'remark-mdx';
import remarkMath from 'remark-math';
import remarkPresetLintRecommended from 'remark-preset-lint-recommended';
import remarkLintHeadingIncrement from 'remark-lint-heading-increment';
import remarkLintFencedCodeFlag from 'remark-lint-fenced-code-flag';
import remarkLintStrongMarker from 'remark-lint-strong-marker';

export default {
  plugins: [
    remarkFrontmatter,
    remarkMdx,
    remarkMath,
    remarkPresetLintRecommended,
    remarkLintHeadingIncrement,
    [remarkLintFencedCodeFlag, true],
    [remarkLintStrongMarker, '*'],
  ],
}