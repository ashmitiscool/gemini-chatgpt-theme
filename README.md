# Gemini ChatGPT Redesign - Chrome Extension

A lightweight, zero-dependency Chrome Extension (Manifest V3) that transforms Google Gemini's Markdown rendering and conversation typography to match ChatGPT's clean, high-contrast aesthetic.

## Features

- **ChatGPT Typography & Contrast:** Replaces Gemini's light-weight `"Google Sans Flex"` with ChatGPT's clean system sans stack (`ui-sans-serif, -apple-system, Segoe UI...`), crisp white headings (`font-weight: 600`), and bright bold accents.
- **Solid Bullets & Clear List Hierarchy:** Replaces Gemini's custom hollow SVG circle bullets and excessive 36px indent with ChatGPT's solid disc bullets (`•`) for primary lists, hollow circle (`◦`) for level 2, and square (`▪`) for level 3.
- **Clean Blockquotes:** Strips Gemini's monospace font and dotted radial-gradient pseudo-element, replacing them with ChatGPT's sleek 3px solid left border and normal text styling.
- **Refined Inline Code:** Converts Gemini's 9999px pill shapes into ChatGPT's subtle 6px rounded rectangles with soft contrast backgrounds.
- **Dark Theme Code Blocks:** Refines code block cards with dark ChatGPT header toolbars while fully preserving Gemini's native copy and download buttons.
- **Streaming DOM Normalizer:** Automatically normalizes Markdown quirks and redundant quotation marks in real-time as responses stream from Gemini using a non-destructive `MutationObserver`.

## Installation Instructions

1. Open Google Chrome.
2. In the URL address bar, navigate to `chrome://extensions`.
3. In the top right corner, toggle **Developer mode** to **ON**.
4. Click the **Load unpacked** button in the top left.
5. In the file selector dialog, choose this extension folder:
   ```
   C:\Users\ashmi\Coding\Projects\gemini_webapp_redesign
   ```
6. Open or refresh [Google Gemini](https://gemini.google.com/app).
7. Enjoy ChatGPT-style Markdown formatting on all Gemini conversations!

## Project Structure

```
gemini_webapp_redesign/
├── manifest.json              # Chrome Extension Manifest V3 configuration
├── styles/
│   └── chatgpt-markdown.css   # ChatGPT typography, lists, blockquotes & code overrides
├── content/
│   ├── normalizer-core.js     # Shared DOM normalization logic
│   └── normalizer.js          # Streaming MutationObserver content script
├── icons/                     # Extension icons (16px, 48px, 128px)
├── scripts/
│   └── generate-icons.js      # Icon generator script
├── tests/                     # Unit & integration test suite
│   ├── manifest.test.js       # Manifest schema validation
│   ├── css.test.js            # CSS rule validation
│   └── normalizer.test.js     # DOM normalizer logic tests
└── docs/                      # Design specs & implementation plans
```

## Running Tests

To run the automated test suite:
```bash
node tests/manifest.test.js
node tests/css.test.js
node tests/normalizer.test.js
```
