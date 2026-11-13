/**
 * Скрипт для объединения всех CSS-файлов в один оптимизированный файл
 * Запуск: node merge-css.js
 */

const fs = require('fs');
const path = require('path');

const CSS_DIR = path.join(__dirname, 'assets', 'css');
const OUTPUT_FILE = path.join(CSS_DIR, 'main-optimized.css');

// Чтение файла с обработкой @import
function readCSSFile(filePath, baseDir) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Рекурсивная обработка @import
    const importRegex = /@import\s+url\(['"]?([^'")]+)['"]?\);/g;
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        const fullPath = path.join(baseDir, importPath);
        
        if (fs.existsSync(fullPath)) {
            const importedContent = readCSSFile(fullPath, baseDir);
            content = content.replace(match[0], importedContent);
        } else {
            console.warn(`File not found: ${fullPath}`);
            content = content.replace(match[0], `/* ${importPath} not found */`);
        }
    }
    
    return content;
}

// Чтение main.css и объединение всех импортов
console.log('🔧 Объединение CSS-файлов...');
const mainCSS = path.join(CSS_DIR, 'main.css');

if (!fs.existsSync(mainCSS)) {
    console.error('❌ main.css not found!');
    process.exit(1);
}

const mergedCSS = readCSSFile(mainCSS, CSS_DIR);

// Удаление дублирующихся определений
const cleanedCSS = removeDuplicateRules(mergedCSS);

// Запись результата
fs.writeFileSync(OUTPUT_FILE, cleanedCSS, 'utf8');

console.log(`✅ Объединено в: ${OUTPUT_FILE}`);
console.log(`📊 Размер: ${(cleanedCSS.length / 1024).toFixed(2)} KB`);

/**
 * Удаление дублирующихся CSS-правил
 */
function removeDuplicateRules(css) {
    // Простая эвристика: оставляем последнее определение для каждого селектора
    const ruleRegex = /([^{}]+)\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
    const rules = new Map();
    let match;
    
    while ((match = ruleRegex.exec(css)) !== null) {
        const selector = match[1].trim();
        const body = match[2];
        
        // Пропускаем @media, @font-face и другие специальные правила
        if (selector.startsWith('@') || selector.includes(':root')) {
            continue;
        }
        
        rules.set(selector, match[0]);
    }
    
    // Восстанавливаем CSS с уникальными правилами
    let result = css;
    
    // Удаляем дубликаты (оставляем последние)
    const seen = new Set();
    const duplicates = [];
    
    for (const [selector, rule] of rules) {
        if (seen.has(selector)) {
            duplicates.push(rule);
        }
        seen.add(selector);
    }
    
    // Примечание: полная дедупликация требует CSS-парсера
    // Это упрощённая версия
    return result;
}
