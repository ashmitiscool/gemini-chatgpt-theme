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
assert.ok(css.includes('font-weight: 600'), 'Should style bold/headings with 600 weight');
assert.ok(css.includes('chatgpt-li-p') || css.includes('li > p'), 'Should handle list item paragraph spacing');
assert.ok(css.includes('708px'), 'Should enforce 708px centered content column to prevent widescreen misalignment');

console.log('✓ CSS tests passed!');
