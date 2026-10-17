/**
 * Gemini ChatGPT Theme - Content Script Normalizer
 * Continuously watches for streaming Markdown messages and normalizes structural quirks.
 */
(function () {
  'use strict';

  const core = window.GeminiNormalizerCore || {
    cleanQuotedBlockquotes: function (c) {
      if (!c || !c.querySelectorAll) return;
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
    },
    normalizeListItems: function (c) {
      if (!c || !c.querySelectorAll) return;
      const lis = c.querySelectorAll('li');
      for (const li of lis) {
        if (li.querySelector('p') && !li.classList.contains('chatgpt-li-p')) {
          li.classList.add('chatgpt-li-p');
        }
      }
    },
    normalizeMarkdownContainer: function (c) {
      if (!c) return;
      this.cleanQuotedBlockquotes(c);
      this.normalizeListItems(c);
      if (c.classList && !c.classList.contains('chatgpt-normalized')) {
        c.classList.add('chatgpt-normalized');
      }
    }
  };

  let scheduled = false;
  const pendingNodes = new Set();

  function processPendingNodes() {
    scheduled = false;
    // Query all markdown containers in view
    const containers = document.querySelectorAll(
      '.markdown.markdown-main-panel, .markdown.tutor-markdown-rendering, message-content .markdown'
    );
    for (const container of containers) {
      core.normalizeMarkdownContainer(container);
    }
    pendingNodes.clear();
  }

  function scheduleNormalization() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(processPendingNodes);
    }
  }

  // Initial pass on existing content
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleNormalization);
  } else {
    scheduleNormalization();
  }

  // Set up MutationObserver to capture live streamed chunks
  const observer = new MutationObserver(function (mutations) {
    let shouldUpdate = false;
    for (const m of mutations) {
      if (m.type === 'childList' && m.addedNodes.length > 0) {
        shouldUpdate = true;
        break;
      }
    }
    if (shouldUpdate) {
      scheduleNormalization();
    }
  });

  observer.observe(document.documentElement || document.body, {
    childList: true,
    subtree: true
  });

  console.log('[Gemini ChatGPT Theme] Normalizer initialized successfully.');
})();
