# Gemini-to-ChatGPT Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a Chrome extension (Manifest V3) that redesigns Google Gemini's Markdown and conversation area to visually match ChatGPT's typography, list styling, blockquotes, inline code, and code blocks.

**Architecture:** A Manifest V3 Chrome extension injecting a scoped high-specificity stylesheet (`styles/chatgpt-markdown.css`) at `document_start` paired with a non-destructive `MutationObserver` content script (`content/normalizer.js`) at `document_idle` to handle dynamic streaming and structural quirks.

**Tech Stack:** Chrome Extension Manifest V3 (Vanilla JS, CSS, Node.js test runner for normalization tests).

**Spec:** `docs/superpowers/specs/2026-10-17-gemini-chatgpt-redesign-design.md`

## Global Constraints
- Target URL: `https://gemini.google.com/*`
- Manifest version: 3
- Zero external runtime dependencies in production extension
- Strictly non-destructive DOM operations: never destroy Angular internal elements or event listeners (especially code copy/download buttons and math renderers)
- Keep Gemini's native dark background (`#0f0f0f`), sidebar, and input area intact while transforming the chat conversation area to match ChatGPT typography and layout

---

### Task 1: Extension Scaffolding & Manifest

**Files:**
- Create: `manifest.json`
- Create: `scripts/generate-icons.js`
- Create: `icons/icon16.png`, `icons/icon48.png`, `icons/icon128.png`
- Test: `tests/manifest.test.js`

**Interfaces:**
- Consumes: None
- Produces: Chrome extension manifest loading `styles/chatgpt-markdown.css` and `content/normalizer.js`

- [ ] **Step 1: Write test for manifest schema and assets**

Create `tests/manifest.test.js`:
```javascript
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const manifestPath = path.join(__dirname, '../manifest.json');
assert.ok(fs.existsSync(manifestPath), 'manifest.json must exist');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
assert.strictEqual(manifest.manifest_version, 3, 'Must be Manifest V3');
assert.strictEqual(manifest.name, 'Gemini ChatGPT Theme', 'Extension name check');
assert.ok(manifest.content_scripts && manifest.content_scripts.length > 0, 'Must define content scripts');

const cs = manifest.content_scripts[0];
assert.ok(cs.matches.includes('https://gemini.google.com/*'), 'Must match Gemini URL');
assert.ok(cs.css.includes('styles/chatgpt-markdown.css'), 'Must register stylesheet');
assert.ok(cs.js.includes('content/normalizer.js'), 'Must register normalizer script');
assert.strictEqual(cs.run_at, 'document_start', 'CSS must be injected at document_start');

console.log('✓ Manifest tests passed!');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/manifest.test.js`
Expected: FAIL (`manifest.json must exist`)

- [ ] **Step 3: Create icon generator and manifest**

Create `scripts/generate-icons.js`:
Generates standalone PNG icons using a simple canvas or base64 raw PNG bytes for 16x16, 48x48, 128x128.

Create `manifest.json`:
```json
{
  "manifest_version": 3,
  "name": "Gemini ChatGPT Theme",
  "version": "1.0.0",
  "description": "Redesigns Gemini's markdown and conversation typography to match ChatGPT's clean aesthetic.",
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  "content_scripts": [
    {
      "matches": ["https://gemini.google.com/*"],
      "css": ["styles/chatgpt-markdown.css"],
      "js": ["content/normalizer.js"],
      "run_at": "document_start"
    }
  ]
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node tests/manifest.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add manifest.json scripts/ icons/ tests/
git commit -m "feat: setup extension manifest, icons and schema tests"
```

---

### Task 2: ChatGPT Markdown Stylesheet

**Files:**
- Create: `styles/chatgpt-markdown.css`
- Test: `tests/css.test.js`

**Interfaces:**
- Consumes: `.markdown.markdown-main-panel`, `.tutor-markdown-rendering`, `message-content`, `user-query`
- Produces: CSS overrides targeting typography, disc lists, solid-border blockquotes, 6px-radius inline code, and clean code blocks

- [ ] **Step 1: Write test for stylesheet rules**

Create `tests/css.test.js`:
```javascript
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const cssPath = path.join(__dirname, '../styles/chatgpt-markdown.css');
assert.ok(fs.existsSync(cssPath), 'styles/chatgpt-markdown.css must exist');
const css = fs.readFileSync(cssPath, 'utf8');

// Key visual rules
assert.ok(css.includes('ui-sans-serif'), 'Should define ChatGPT sans-serif font stack');
assert.ok(css.includes('list-style-type: disc'), 'Should restore solid disc bullet style');
assert.ok(css.includes('border-left: 3px solid') || css.includes('border-left: 3px'), 'Should define solid left border for blockquotes');
assert.ok(css.includes('mask-image: none'), 'Should disable Gemini hollow SVG bullet mask');
assert.ok(css.includes('border-radius: 0.375rem') || css.includes('border-radius: 6px'), 'Should style inline code with 6px border radius');

console.log('✓ CSS tests passed!');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/css.test.js`
Expected: FAIL (`styles/chatgpt-markdown.css must exist`)

- [ ] **Step 3: Implement `styles/chatgpt-markdown.css`**

Implement comprehensive styles:
- Typography: System sans-serif font stack, 16px body, 1.75 line-height, #ececec text.
- Headings: h1–h4 white (#ffffff), font-weight: 600, 0 horizontal padding offset.
- Bold text: font-weight: 600, color: #ffffff.
- Lists: Remove Gemini's `::before` SVG mask on `li`, restore native disc (L1), circle (L2), square (L3), compact padding (1.5rem), inline `<p>` handling.
- Blockquotes: Normal font (no monospace), no dotted radial-gradient pseudo-element, solid 3px border-left, #d1d5db text color.
- Inline code: monospace stack, subtle rounded-rectangle (`0.375rem`), #ececec color, semi-transparent background (`rgba(255, 255, 255, 0.1)`).
- Code blocks: Clean dark header and body, 8px border radius, subtle border.
- User queries: Rounded chat bubble with #2f2f2f background.

- [ ] **Step 4: Run test to verify it passes**

Run: `node tests/css.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add styles/chatgpt-markdown.css tests/css.test.js
git commit -m "feat: implement ChatGPT markdown stylesheet for Gemini"
```

---

### Task 3: Streaming DOM Normalizer

**Files:**
- Create: `content/normalizer.js`
- Test: `tests/normalizer.test.js`

**Interfaces:**
- Consumes: DOM nodes inside `message-content`, `.markdown`
- Produces: Normalized blockquote contents and `.chatgpt-li-p` classes for list item alignment

- [ ] **Step 1: Write test for normalizer logic**

Create `tests/normalizer.test.js`:
```javascript
const assert = require('assert');
const { JSDOM } = require('jsdom');

// Test helper that executes normalizer functions on mock DOM
const { normalizeBlockquotes, normalizeListItems } = require('../content/normalizer-core.js');

const dom = new JSDOM(`
  <div class="markdown">
    <blockquote><p>"It consumes a significant amount of RAM."</p></blockquote>
    <ul>
      <li><p>Base allocation requires 2GB.</p></li>
      <li>Peak usage scales.</li>
    </ul>
  </div>
`);
const document = dom.window.document;

normalizeBlockquotes(document.querySelector('.markdown'));
const bqText = document.querySelector('blockquote p').textContent;
assert.strictEqual(bqText, 'It consumes a significant amount of RAM.', 'Should strip decorative quotes');

normalizeListItems(document.querySelector('.markdown'));
const li = document.querySelector('li');
assert.ok(li.classList.contains('chatgpt-li-p'), 'Should mark list items containing single paragraph');

console.log('✓ Normalizer logic tests passed!');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/normalizer.test.js`
Expected: FAIL (`Cannot find module '../content/normalizer-core.js'`)

- [ ] **Step 3: Implement `content/normalizer-core.js` and `content/normalizer.js`**

- `content/normalizer-core.js`: Pure functions for:
  - `cleanQuotedBlockquote(blockquote)`: safely removes leading/trailing decorative quotation marks from blockquotes containing a single `<p>`.
  - `normalizeListItems(container)`: tags `<li>` containing solo `<p>` with `chatgpt-li-p` for clean inline rendering.
  - Compatible with both Node (CommonJS export) and browser (`window.GeminiNormalizer`).
- `content/normalizer.js`:
  - Instantiates `MutationObserver` on `.chat-history`, `chat-window-content`, and `body`.
  - Debounced with `requestAnimationFrame`.
  - Uses `WeakSet` to track processed nodes without memory leaks.

- [ ] **Step 4: Run test to verify it passes**

Run: `node tests/normalizer.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add content/ tests/
git commit -m "feat: implement streaming DOM normalizer for Gemini markdown"
```

---

### Task 4: End-to-End Verification on Live Gemini Web App

**Files:**
- Modify: `styles/chatgpt-markdown.css` (refinements based on live page test)
- Modify: `content/normalizer.js` (refinements based on live page test)

**Interfaces:**
- Consumes: Live Gemini DOM (`https://gemini.google.com/app`)
- Produces: Live visual verification comparing side-by-side with user's ChatGPT screenshot

- [ ] **Step 1: Inject extension files into live Gemini session**
Evaluate injection of `chatgpt-markdown.css` and `normalizer.js` into the live Gemini tab.

- [ ] **Step 2: Inspect rendered output and take screenshot**
Verify:
1. Headings are white and flush with body text.
2. Lists use solid disc bullets with compact padding.
3. Blockquotes have solid 3px border-left and clean sans-serif typography.
4. Inline code has 6px rounded corners and soft dark background.
5. Code block retains buttons with dark ChatGPT palette.

- [ ] **Step 3: Commit any final refinements and documentation**

```bash
git add -A
git commit -m "feat: complete Gemini to ChatGPT redesign extension with verification"
```
