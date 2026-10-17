(() => {
  // Read and inject CSS
  const css = `/* ==========================================================================
   Gemini ChatGPT Redesign Theme
   Transforms Gemini's Markdown rendering & chat conversation to match ChatGPT
   ========================================================================== */

.markdown.markdown-main-panel,
.markdown.tutor-markdown-rendering,
.markdown.md-content,
message-content .markdown {
  font-family: ui-sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
  font-size: 16px !important;
  line-height: 1.75 !important;
  color: #ececec !important;
  letter-spacing: normal !important;
  word-break: break-word !important;
}

.markdown.markdown-main-panel p,
.markdown.tutor-markdown-rendering p,
message-content .markdown p {
  font-family: inherit !important;
  font-size: 16px !important;
  line-height: 1.75 !important;
  color: #ececec !important;
  margin-top: 0 !important;
  margin-bottom: 1rem !important;
  padding: 0 !important;
}

.markdown.markdown-main-panel b,
.markdown.markdown-main-panel strong,
.markdown.tutor-markdown-rendering b,
.markdown.tutor-markdown-rendering strong,
message-content .markdown b,
message-content .markdown strong {
  font-weight: 600 !important;
  color: #ffffff !important;
}

.markdown.markdown-main-panel h1,
.markdown.markdown-main-panel h2,
.markdown.markdown-main-panel h3,
.markdown.markdown-main-panel h4,
.markdown.markdown-main-panel h5,
.markdown.markdown-main-panel h6,
.markdown.tutor-markdown-rendering h1,
.markdown.tutor-markdown-rendering h2,
.markdown.tutor-markdown-rendering h3,
.markdown.tutor-markdown-rendering h4,
message-content .markdown h1,
message-content .markdown h2,
message-content .markdown h3,
message-content .markdown h4 {
  font-family: ui-sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
  font-weight: 600 !important;
  color: #ffffff !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  max-width: 100% !important;
}

.markdown h1 {
  font-size: 1.875rem !important;
  line-height: 2.25rem !important;
  margin-top: 1.75rem !important;
  margin-bottom: 0.75rem !important;
}

.markdown h2 {
  font-size: 1.5rem !important;
  line-height: 2rem !important;
  margin-top: 1.5rem !important;
  margin-bottom: 0.625rem !important;
}

.markdown h3 {
  font-size: 1.25rem !important;
  line-height: 1.75rem !important;
  margin-top: 1.25rem !important;
  margin-bottom: 0.5rem !important;
}

.markdown.markdown-main-panel ul > li::before,
.markdown.tutor-markdown-rendering ul > li::before,
.markdown.markdown-main-panel ol > li::before,
.markdown.tutor-markdown-rendering ol > li::before,
message-content .markdown ul > li::before,
message-content .markdown ol > li::before {
  display: none !important;
  mask-image: none !important;
  -webkit-mask-image: none !important;
  background-image: none !important;
  background: none !important;
  content: none !important;
  width: 0 !important;
  height: 0 !important;
}

.markdown.markdown-main-panel ul,
.markdown.tutor-markdown-rendering ul,
message-content .markdown ul {
  list-style-type: disc !important;
  padding-left: 1.5rem !important;
  padding-inline-start: 1.5rem !important;
  margin-top: 0.5rem !important;
  margin-bottom: 0.75rem !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding-right: 0 !important;
  max-width: 100% !important;
}

.markdown.markdown-main-panel ul ul,
.markdown.tutor-markdown-rendering ul ul,
message-content .markdown ul ul {
  list-style-type: circle !important;
  padding-left: 1.25rem !important;
  padding-inline-start: 1.25rem !important;
  margin-top: 0.25rem !important;
  margin-bottom: 0.25rem !important;
}

.markdown.markdown-main-panel ul ul ul,
.markdown.tutor-markdown-rendering ul ul ul,
message-content .markdown ul ul ul {
  list-style-type: square !important;
  padding-left: 1.25rem !important;
  padding-inline-start: 1.25rem !important;
}

.markdown.markdown-main-panel li,
.markdown.tutor-markdown-rendering li,
message-content .markdown li {
  display: list-item !important;
  padding-left: 0.25rem !important;
  padding-inline-start: 0.25rem !important;
  margin-top: 0.25rem !important;
  margin-bottom: 0.25rem !important;
  line-height: 1.75 !important;
  color: #ececec !important;
}

.markdown li > p,
.markdown li.chatgpt-li-p > p {
  display: inline !important;
  margin: 0 !important;
  padding: 0 !important;
}

.markdown blockquote::before,
.markdown.tutor-markdown-rendering blockquote::before,
.gds-extended-blockquote::before {
  display: none !important;
  content: none !important;
  background-image: none !important;
  background: none !important;
  width: 0 !important;
  height: 0 !important;
}

.markdown blockquote,
.markdown.tutor-markdown-rendering blockquote,
.gds-extended-blockquote {
  border-left: 3px solid rgba(255, 255, 255, 0.25) !important;
  border-inline-start: 3px solid rgba(255, 255, 255, 0.25) !important;
  border-top: none !important;
  border-right: none !important;
  border-bottom: none !important;
  padding: 0.125rem 0 0.125rem 1rem !important;
  padding-inline-start: 1rem !important;
  margin: 0.75rem 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  font-family: inherit !important;
  font-style: normal !important;
  color: #d1d5db !important;
  background: transparent !important;
  max-width: 100% !important;
}

.markdown blockquote p,
.markdown.tutor-markdown-rendering blockquote p {
  font-family: inherit !important;
  font-size: 1rem !important;
  line-height: 1.625 !important;
  color: #d1d5db !important;
  margin: 0 !important;
  padding: 0 !important;
}

.markdown code:not(pre code),
.markdown p code,
.markdown li code,
.markdown blockquote code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
  font-size: 0.875em !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: #ececec !important;
  border-radius: 0.375rem !important;
  padding: 0.15rem 0.375rem !important;
  margin: 0 0.15rem !important;
  border: none !important;
  box-shadow: none !important;
  line-height: inherit !important;
}

code-block .code-block,
.formatted-code-block-internal-container {
  border-radius: 0.5rem !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  overflow: hidden !important;
  background-color: #0d0d0d !important;
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
}

.code-block-decoration,
.code-block-decoration.header-formatted {
  background-color: #212121 !important;
  color: #b4b4b4 !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  font-size: 0.8125rem !important;
  font-family: ui-sans-serif, -apple-system, system-ui, sans-serif !important;
  padding: 0.375rem 0.875rem !important;
}

code-block pre,
code-block .code-block pre {
  background-color: #0d0d0d !important;
  color: #ececec !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  font-size: 0.875rem !important;
  line-height: 1.5 !important;
  padding: 0.875rem !important;
}
`;

  let styleEl = document.getElementById('chatgpt-theme-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'chatgpt-theme-style';
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = css;

  // Run normalizer logic
  const containers = document.querySelectorAll('.markdown.markdown-main-panel, message-content .markdown');
  for (const c of containers) {
    // Strip quotes on blockquotes
    const bqs = c.querySelectorAll('blockquote');
    for (const bq of bqs) {
      const p = bq.querySelector('p');
      if (p) {
        let text = p.textContent.trim();
        if (
          (text.startsWith('"') && text.endsWith('"') && text.length >= 2) ||
          (text.startsWith('“') && text.endsWith('”') && text.length >= 2) ||
          (text.startsWith('\'') && text.endsWith('\'') && text.length >= 2)
        ) {
          p.textContent = text.slice(1, -1).trim();
        }
      }
    }
    // Tag lis with p
    const lis = c.querySelectorAll('li');
    for (const li of lis) {
      if (li.querySelector('p')) {
        li.classList.add('chatgpt-li-p');
      }
    }
    c.classList.add('chatgpt-normalized');
  }

  // Get computed styles after injection
  const getCS = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const s = getComputedStyle(el);
    return {
      fontFamily: s.fontFamily,
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      lineHeight: s.lineHeight,
      color: s.color,
      borderLeft: s.borderLeft,
      borderRadius: s.borderRadius,
      listStyleType: s.listStyleType,
      paddingLeft: s.paddingLeft,
      textContent: el.textContent.slice(0, 100)
    };
  };

  const liBefore = document.querySelector('.markdown ul > li');
  const bqBefore = document.querySelector('.markdown blockquote');

  return {
    injected: true,
    markdownRoot: getCS('.markdown.markdown-main-panel'),
    h3: getCS('.markdown h3'),
    blockquote: getCS('.markdown blockquote'),
    blockquoteP: getCS('.markdown blockquote p'),
    ul: getCS('.markdown ul'),
    nestedUl: getCS('.markdown ul ul'),
    li: getCS('.markdown ul > li'),
    nestedLi: getCS('.markdown ul ul > li'),
    inlineCode: getCS('.markdown code:not(pre code)'),
    codeBlock: getCS('code-block .code-block'),
    liBeforeDisplay: liBefore ? getComputedStyle(liBefore, '::before').display : null,
    bqBeforeDisplay: bqBefore ? getComputedStyle(bqBefore, '::before').display : null
  };
})();
