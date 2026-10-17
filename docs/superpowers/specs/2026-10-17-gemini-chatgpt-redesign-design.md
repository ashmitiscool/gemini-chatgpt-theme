# Design Specification: Gemini-to-ChatGPT Redesign Chrome Extension

## 1. Overview
This Chrome extension redesigns the Google Gemini web application (`https://gemini.google.com/*`) to match the clean, readable, high-contrast Markdown and message presentation of ChatGPT (as seen in the provided user screenshots).

By user preference (Option B & Approach 1), the scope focuses strictly on the **Markdown & Chat Area** while keeping Gemini's native sidebar, navigation, and input bar integrated seamlessly against the dark theme.

## 2. Technical Architecture
The extension is built as a Manifest V3 Chrome Extension with no external runtime dependencies:

```
gemini_webapp_redesign/
├── manifest.json
├── content/
│   └── normalizer.js
├── styles/
│   └── chatgpt-markdown.css
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-10-17-gemini-chatgpt-redesign-design.md
```

### 2.1 Injection Strategy
- **`styles/chatgpt-markdown.css`**: Injected at `run_at: "document_start"` to prevent any Flash of Unstyled Content (FOUC).
- **`content/normalizer.js`**: Injected at `run_at: "document_idle"` to observe response streaming via `MutationObserver` and normalize structural Markdown quirks.

## 3. Visual & Style Specifications (CSS)

### 3.1 Typography & Color Hierarchy
- **Font Stack**: `ui-sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` overrides `"Google Sans Flex"` inside `.markdown.markdown-main-panel`.
- **Base Body Text**:
  - `font-size: 16px` (`1rem`)
  - `line-height: 1.75` (`28px`)
  - `color: #ececec` (crisp light gray)
  - `letter-spacing: normal`
- **Strong / Bold (`b`, `strong`)**:
  - `font-weight: 600`
  - `color: #ffffff`
  - Ensures key concept callouts ("**Kernel:**", "**Daemon:**") visually pop with clear distinction from body text.
- **Headings (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`)**:
  - `color: #ffffff`
  - `font-weight: 600`
  - `h1`: `1.875rem` (`30px`), `line-height: 2.25rem`, `margin: 1.5rem 0 0.75rem 0`
  - `h2`: `1.5rem` (`24px`), `line-height: 2rem`, `margin: 1.5rem 0 0.75rem 0`
  - `h3`: `1.25rem` (`20px`), `line-height: 1.75rem`, `margin: 1.25rem 0 0.5rem 0`
  - Remove Gemini's horizontal padding (`padding: 0 !important`) so headings align flush with paragraphs and lists.

### 3.2 Lists & Nested Lists
- **Disable Gemini Pseudo-Elements**:
  - `ul > li::before { display: none !important; mask-image: none !important; content: none !important; }`
  - Overrides the custom hollow SVG circle mask injected by Gemini on all list levels.
- **ChatGPT List Styling**:
  - `list-style-type: disc !important` on level 1 `ul`
  - `list-style-type: circle !important` on level 2 `ul ul`
  - `list-style-type: square !important` on level 3 `ul ul ul`
  - `ol`: `list-style-type: decimal !important`
  - `padding-left: 1.5rem !important` (`24px`)
  - `margin: 0.5rem 0 !important`
- **List Item Spacing (`li`)**:
  - `margin-top: 0.25rem; margin-bottom: 0.25rem;`
  - `padding-left: 0.25rem !important;` (removes Gemini's excessive `36px` li padding)
  - `li > p`: Flattened margins (`margin: 0 !important; display: inline-block;`) to prevent awkward line breaks and bullet misalignments.

### 3.3 Blockquotes (`blockquote`)
- **Remove Gemini Quirks**:
  - Remove `font-family: "Google Sans Code", monospace !important;`
  - Remove `blockquote::before` (which draws the dotted radial-gradient).
- **ChatGPT Blockquote Styling**:
  - `border-left: 3px solid rgba(255, 255, 255, 0.25) !important;`
  - `padding-left: 1rem !important;`
  - `margin: 0.75rem 0 !important;`
  - `font-family: inherit !important;`
  - `font-style: normal;`
  - `color: #d1d5db !important;`

### 3.4 Inline Code & Code Blocks
- **Inline Code (`:not(pre) > code`)**:
  - `font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;`
  - `font-size: 0.875em !important;`
  - `background-color: rgba(255, 255, 255, 0.1) !important;`
  - `color: #ececec !important;`
  - `border-radius: 0.375rem !important;` (`6px`)
  - `padding: 0.15rem 0.375rem !important;`
  - Overrides Gemini's `9999px` oval pill shape and dim `0.55` opacity.
- **Code Blocks (`code-block .code-block`)**:
  - `border-radius: 0.5rem !important;`
  - `border: 1px solid rgba(255, 255, 255, 0.1) !important;`
  - Header toolbar background: `#1e1e1e !important;`
  - Code area background: `#0d0d0d !important;`
  - Preserve Gemini's native copy and download buttons.

### 3.5 Message Containers & User Queries
- User query bubble: styled cleanly with ChatGPT-like rounded bubble (`background-color: #2f2f2f !important; border-radius: 1.25rem; padding: 0.75rem 1.25rem; color: #ffffff;`).
- Response actions bar (thumbs up/down, copy, retry): align cleanly with ChatGPT's muted icon opacity (`0.6`) and subtle hover effect.

## 4. DOM Normalizer (`content/normalizer.js`)
- Runs a non-destructive `MutationObserver` on `message-content` and `.markdown` elements.
- **Operations performed**:
  1. **Quotation mark normalization in blockquotes**: Strips redundant outer decorative quotation marks (`"..."`) that Gemini sometimes leaves around single-paragraph quotes.
  2. **List item paragraph flattening**: Adds `.chatgpt-li-p` class to list items containing solo `<p>` elements to ensure crisp inline vertical alignment with bullet discs.
  3. **Performance optimization**: Debounces mutation handling with `requestAnimationFrame` and `WeakSet` caching of already-processed elements so streaming remains 60fps smooth.

## 5. Verification Plan
1. Validate syntax of `manifest.json`, `chatgpt-markdown.css`, and `normalizer.js`.
2. Load extension in Chrome via `chrome-devtools-mcp` or Developer Mode.
3. Test against live Gemini chat with headings, lists, sub-lists, blockquotes, inline code, and code blocks.
4. Verify visual fidelity against the ChatGPT reference screenshot.
