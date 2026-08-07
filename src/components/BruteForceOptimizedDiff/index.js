"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BruteForceOptimizedDiff;
var react_1 = require("react");
var BrowserOnly_1 = require("@docusaurus/BrowserOnly");
var styles_module_css_1 = require("./styles.module.css");
function BruteForceOptimizedDiff(_a) {
    var _b = _a.title, title = _b === void 0 ? "Brute-Force vs Optimized Diff" : _b, _c = _a.bruteForceLabel, bruteForceLabel = _c === void 0 ? "Brute-Force" : _c, _d = _a.optimizedLabel, optimizedLabel = _d === void 0 ? "Optimized" : _d, language = _a.language, bruteForceCode = _a.bruteForceCode, optimizedCode = _a.optimizedCode, annotations = _a.annotations;
    return (<div className={styles_module_css_1.default.container}>
      <div className={styles_module_css_1.default.header}>
        <div>
          <h3 className={styles_module_css_1.default.title}>{title}</h3>
          <p className={styles_module_css_1.default.subTitle}>
            Compare the naive implementation to the optimized version with line-aligned diffs and complexity annotations.
          </p>
        </div>
      </div>

      <div className={styles_module_css_1.default.body}>
        <div className={styles_module_css_1.default.editorPanel}>
          <div className={styles_module_css_1.default.labels}>
            <span className={styles_module_css_1.default.label}>{bruteForceLabel}</span>
            <span className={styles_module_css_1.default.label}>{optimizedLabel}</span>
          </div>
          <div className={styles_module_css_1.default.editorWrapper}>
            <BrowserOnly_1.default fallback={<div className={styles_module_css_1.default.loading}>Loading diff viewer...</div>}>
              {function () {
            var DiffEditor = require("@monaco-editor/react").DiffEditor;
            return (<DiffEditor original={bruteForceCode} modified={optimizedCode} language={language} theme="vs-dark" options={{
                    readOnly: true,
                    renderSideBySide: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 13,
                    automaticLayout: true,
                    renderIndicators: true,
                }}/>);
        }}
            </BrowserOnly_1.default>
          </div>
        </div>

        <aside className={styles_module_css_1.default.annotationPanel}>
          <h4 className={styles_module_css_1.default.annotationHeading}>Why this improves complexity</h4>
          <div className={styles_module_css_1.default.annotationList}>
            {annotations.map(function (annotation, index) { return (<div key={index} className={styles_module_css_1.default.annotationCard}>
                <div className={styles_module_css_1.default.annotationTitle}>{annotation.title}</div>
                {annotation.highlight ? (<div className={styles_module_css_1.default.annotationHighlight}>{annotation.highlight}</div>) : null}
                <p className={styles_module_css_1.default.annotationDescription}>{annotation.description}</p>
              </div>); })}
          </div>
        </aside>
      </div>
    </div>);
}
