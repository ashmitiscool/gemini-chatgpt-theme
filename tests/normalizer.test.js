const assert = require('assert');

// Require the normalizer core logic
const { cleanQuotedBlockquotes, normalizeListItems, normalizeMarkdownContainer } = require('../content/normalizer-core.js');

// Minimal DOM mock helper
class MockClassList {
  constructor() { this.classes = new Set(); }
  add(c) { this.classes.add(c); }
  remove(c) { this.classes.delete(c); }
  contains(c) { return this.classes.has(c); }
}

class MockElement {
  constructor(tagName, textContent = '') {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.classList = new MockClassList();
    this._textContent = textContent;
  }
  get textContent() {
    if (this.children.length === 0) return this._textContent;
    return this.children.map(c => c.textContent).join('');
  }
  set textContent(val) {
    this._textContent = val;
    this.children = [];
  }
  appendChild(child) {
    this.children.push(child);
    return child;
  }
  querySelectorAll(sel) {
    const results = [];
    function search(node) {
      for (const child of node.children) {
        if (sel === 'blockquote' && child.tagName === 'BLOCKQUOTE') results.push(child);
        else if (sel === 'li' && child.tagName === 'LI') results.push(child);
        else if (sel === 'p' && child.tagName === 'P') results.push(child);
        else if (sel === 'ul' && child.tagName === 'UL') results.push(child);
        search(child);
      }
    }
    search(this);
    return results;
  }
  querySelector(sel) {
    const list = this.querySelectorAll(sel);
    return list.length > 0 ? list[0] : null;
  }
}

// Test 1: Blockquote quote stripping
const root = new MockElement('div');
const bq = new MockElement('blockquote');
const p = new MockElement('p', '"It consumes a significant amount of RAM."');
bq.appendChild(p);
root.appendChild(bq);

cleanQuotedBlockquotes(root);
assert.strictEqual(p.textContent, 'It consumes a significant amount of RAM.', 'Should strip outer quotes from blockquote paragraph');

// Test 2: Smart list item paragraph tagging
const ul = new MockElement('ul');
const li = new MockElement('li');
const lip = new MockElement('p', 'Base allocation requires 2GB.');
li.appendChild(lip);
ul.appendChild(li);
root.appendChild(ul);

normalizeListItems(root);
assert.ok(li.classList.contains('chatgpt-li-p'), 'Should mark list item with chatgpt-li-p');

// Test 3: Container runner
normalizeMarkdownContainer(root);
assert.ok(root.classList.contains('chatgpt-normalized'), 'Should mark container as normalized');

console.log('✓ Normalizer unit tests passed!');
