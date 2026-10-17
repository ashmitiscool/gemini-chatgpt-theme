/**
 * Core DOM normalization utilities for Gemini Markdown responses
 * Shared between Node test runner and Chrome extension content script
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.GeminiNormalizerCore = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /**
   * Strips redundant outer decorative quotation marks from blockquotes
   * E.g. Gemini outputs: <blockquote><p>"It consumes a significant amount of RAM."</p></blockquote>
   */
  function cleanQuotedBlockquotes(container) {
    if (!container || !container.querySelectorAll) return;
    const blockquotes = container.querySelectorAll('blockquote');
    for (const bq of blockquotes) {
      const p = bq.querySelector('p');
      if (p) {
        let text = p.textContent.trim();
        // Check if wrapped in straight or curly quotes
        if (
          (text.startsWith('"') && text.endsWith('"') && text.length >= 2) ||
          (text.startsWith('“') && text.endsWith('”') && text.length >= 2) ||
          (text.startsWith('\'') && text.endsWith('\'') && text.length >= 2)
        ) {
          p.textContent = text.slice(1, -1).trim();
        }
      }
    }
  }

  /**
   * Tags list items that contain paragraph elements to enforce inline bullet flow
   */
  function normalizeListItems(container) {
    if (!container || !container.querySelectorAll) return;
    const listItems = container.querySelectorAll('li');
    for (const li of listItems) {
      const p = li.querySelector('p');
      if (p && !li.classList.contains('chatgpt-li-p')) {
        li.classList.add('chatgpt-li-p');
      }
    }
  }

  /**
   * Applies all normalizations to a Markdown container
   */
  function normalizeMarkdownContainer(container) {
    if (!container) return;
    cleanQuotedBlockquotes(container);
    normalizeListItems(container);
    if (container.classList && !container.classList.contains('chatgpt-normalized')) {
      container.classList.add('chatgpt-normalized');
    }
  }

  return {
    cleanQuotedBlockquotes: cleanQuotedBlockquotes,
    normalizeListItems: normalizeListItems,
    normalizeMarkdownContainer: normalizeMarkdownContainer
  };
});
