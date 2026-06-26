module.exports = function remarkComplexityPlugin() {
  return (tree, file) => {
    // Docusaurus parses frontmatter into file.data.frontMatter
    const frontMatter = file.data.frontMatter || {};
    const complexity = frontMatter.complexity;

    if (!complexity) return;

    // Find the first heading (h1) to insert the ComplexityCard below it
    let headingIndex = -1;
    for (let i = 0; i < tree.children.length; i++) {
      if (tree.children[i].type === 'heading' && tree.children[i].depth === 1) {
        headingIndex = i;
        break;
      }
    }

    // If no h1 found, we just insert at the top
    const insertIndex = headingIndex !== -1 ? headingIndex + 1 : 0;

    // Create the MDX JSX node for ComplexityCard
    const complexityNode = {
      type: 'mdxJsxFlowElement',
      name: 'ComplexityCard',
      attributes: [
        {
          type: 'mdxJsxAttribute',
          name: 'best',
          value: complexity.time_best || ''
        },
        {
          type: 'mdxJsxAttribute',
          name: 'average',
          value: complexity.time_average || ''
        },
        {
          type: 'mdxJsxAttribute',
          name: 'worst',
          value: complexity.time_worst || ''
        },
        {
          type: 'mdxJsxAttribute',
          name: 'space',
          value: complexity.space || ''
        }
      ],
      children: []
    };

    // Create an import node for the ComplexityCard component
    const importNode = {
      type: 'mdxjsEsm',
      value: "import ComplexityCard from '@site/src/components/ComplexityCard';",
      data: {
        estree: {
          type: 'Program',
          body: [
            {
              type: 'ImportDeclaration',
              specifiers: [
                {
                  type: 'ImportDefaultSpecifier',
                  local: { type: 'Identifier', name: 'ComplexityCard' }
                }
              ],
              source: { type: 'Literal', value: '@site/src/components/ComplexityCard', raw: "'@site/src/components/ComplexityCard'" }
            }
          ],
          sourceType: 'module'
        }
      }
    };

    // Insert the import statement at the top (index 0)
    tree.children.unshift(importNode);

    // Insert the complexity card after the first heading (adjusting for the newly inserted import)
    tree.children.splice(insertIndex + 1, 0, complexityNode);
  };
};
