/**
 * Простой скрипт для объединения CSS-файлов
 * Запуск: node merge-css-simple.js
 */

const fs = require('fs');
const path = require('path');

const CSS_DIR = path.join(__dirname, 'assets', 'css');
const OUTPUT_FILE = path.join(CSS_DIR, 'main-optimized.css');

console.log('🔧 Объединение CSS-файлов...');
console.log(`📂 Директория: ${CSS_DIR}`);

// Чтение файла с обработкой @import
function readCSSFile(filePath, baseDir, visited = new Set()) {
    const resolvedPath = path.resolve(filePath);
    
    // Защита от циклических импортов
    if (visited.has(resolvedPath)) {
        return `/* Circular import detected: ${filePath} */`;
    }
    visited.add(resolvedPath);
    
    if (!fs.existsSync(resolvedPath)) {
        console.warn(`⚠️  File not found: ${resolvedPath}`);
        return `/* ${filePath} not found */`;
    }
    
    let content = fs.readFileSync(resolvedPath, 'utf8');
    
    // Рекурсивная обработка @import
    const importRegex = /@import\s+url\(['"]?([^'")]+)['"]?\);/g;
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        const fullPath = path.join(baseDir, importPath);
        
        console.log(`  📄 Importing: ${importPath}`);
        const importedContent = readCSSFile(fullPath, baseDir, visited);
        content = content.replace(match[0], importedContent);
    }
    
    return content;
}

try {
    const mainCSS = path.join(CSS_DIR, 'main.css');
    
    if (!fs.existsSync(mainCSS)) {
        console.error('❌ main.css not found!');
        process.exit(1);
    }
    
    console.log('\n📖 Чтение main.css...');
    const mergedCSS = readCSSFile(mainCSS, CSS_DIR);
    
    console.log('\n✍️  Запись объединённого файла...');
    fs.writeFileSync(OUTPUT_FILE, mergedCSS, 'utf8');
    
    const fileSize = Buffer.byteLength(mergedCSS, 'utf8');
    console.log(`\n✅ Успешно объединено!`);
    console.log(`📊 Размер: ${(fileSize / 1024).toFixed(2)} KB`);
    console.log(`📁 Файл: ${OUTPUT_FILE}`);
    
} catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
}
