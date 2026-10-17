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
assert.ok(cs.js.includes('content/normalizer-core.js'), 'Must register normalizer-core script');
assert.ok(cs.js.includes('content/normalizer.js'), 'Must register normalizer script');
assert.strictEqual(cs.run_at, 'document_start', 'CSS must be injected at document_start');

// Check icons
assert.ok(manifest.icons && manifest.icons['16'] && manifest.icons['48'] && manifest.icons['128'], 'Must define icons');
assert.ok(fs.existsSync(path.join(__dirname, '..', manifest.icons['16'])), 'icon16.png must exist');
assert.ok(fs.existsSync(path.join(__dirname, '..', manifest.icons['48'])), 'icon48.png must exist');
assert.ok(fs.existsSync(path.join(__dirname, '..', manifest.icons['128'])), 'icon128.png must exist');

console.log('✓ Manifest tests passed!');
