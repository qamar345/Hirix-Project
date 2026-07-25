const fs = require('fs');
const path = require('path');

const srcDir = 'D:\\Qamar Pc Data\\EzitechSol\\Hirix-Project\\hirix-client\\src';

function getRelativePath(filePath) {
  const rel = path.relative(path.dirname(filePath), srcDir).replace(/\\/g, '/');
  return rel ? rel + '/api' : './api';
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  if (!content.includes('localhost:9000')) return false;

  const relPath = getRelativePath(filePath);
  const hasAxiosImport = content.includes('import axios from');

  // Remove unused date-fns/locale id import
  content = content.replace(/import\s*\{[^}]*\bid\b[^}]*\}\s*from\s*['"]date-fns[\/\\]locale['"];?\n?/g, '');

  // Replace axios import with API import
  if (hasAxiosImport) {
    content = content.replace(/import axios from ["']axios["'];?/g, `import API, { BASE_URL } from "${relPath}";`);
  } else {
    const firstImportMatch = content.match(/^import .+$/m);
    if (firstImportMatch) {
      content = content.replace(firstImportMatch[0], firstImportMatch[0] + `\nimport API, { BASE_URL } from "${relPath}";`);
    }
  }

  // Replace axios.* with API.*
  content = content.replace(/\baxios\.get\b/g, 'API.get');
  content = content.replace(/\baxios\.post\b/g, 'API.post');
  content = content.replace(/\baxios\.put\b/g, 'API.put');
  content = content.replace(/\baxios\.delete\b/g, 'API.delete');

  // Replace image src: `http://localhost:9000${variable}`
  content = content.replace(/`http:\/\/localhost:9000(\$\{[^`]+\})`/g, '`${BASE_URL}$1`');

  // Replace baseURL variable
  content = content.replace(/const baseURL\s*=\s*["']http:\/\/localhost:9000["'];?/g, 'const baseURL = BASE_URL;');

  // Replace quoted URL strings
  content = content.replace(/["']http:\/\/localhost:9000(\/[^"']+)["']/g, '"$1"');

  // Replace template literal URLs
  content = content.replace(/`http:\/\/localhost:9000(\/[^`]+)`/g, '`$1`');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  let updated = [];
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory() && f !== 'node_modules' && f !== 'dist') {
      updated = updated.concat(walk(full));
    } else if (f.endsWith('.jsx') || f.endsWith('.js')) {
      if (processFile(full)) updated.push(full.replace(srcDir + '\\', ''));
    }
  }
  return updated;
}

const updated = walk(srcDir);
console.log('Updated files:');
updated.forEach(f => console.log(' -', f));
console.log('\nTotal:', updated.length, 'files updated');
