import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

const codeSnippet = `const greet = (name) => {
  console.log(\`Hello, \${name}!\`);
};`;

function CodeBlock() {
  return (
    <Highlight
      theme={themes.nightOwl}
      code={codeSnippet}
      language="javascript"
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px', borderRadius: '8px' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {/* Optional: Add Line Numbers here */}
              <span style={{ marginRight: '10px', opacity: 0.5 }}>{i + 1}</span>
              
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

export default CodeBlock;
