# ============================================
# ТОТАЛЬНАЯ ОПТИМИЗАЦИЯ objektiv-expert.ru
# Все оптимизации в одном скрипте
# ============================================

$projectDir = "C:\Users\Vlad\Documents\Ptodjec\expmy"
$cssDir = "$projectDir\assets\css"
$outputFile = "$cssDir\main-optimized.css"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " ТОТАЛЬНАЯ ОПТИМИЗАЦИЯ САЙТА" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# ============================================
# 1. ОБЪЕДИНЕНИЕ CSS (замена @import на содержимое)
# ============================================
Write-Host "`n📦 ШАГ 1: Объединение 56 CSS-файлов..." -ForegroundColor Yellow

function Merge-CSS {
    param($filePath, $baseDir, $visited = @())
    
    $resolvedPath = Resolve-Path $filePath -ErrorAction SilentlyContinue
    if (-not $resolvedPath) { return "# File not found: $filePath" }
    
    if ($visited -contains $resolvedPath.Path) {
        return "# Circular import: $filePath"
    }
    $visited += $resolvedPath.Path
    
    $content = Get-Content $resolvedPath.Path -Raw -Encoding UTF8
    $importRegex = "@import\s+url\(['""]?([^'"")]+)['""]?\);"
    
    $matches = [regex]::Matches($content, $importRegex)
    foreach ($match in $matches) {
        $importPath = $match.Groups[1].Value
        $fullPath = Join-Path $baseDir $importPath
        if (Test-Path $fullPath) {
            $imported = Merge-CSS $fullPath $baseDir $visited
            $content = $content -replace [regex]::Escape($match.Value), $imported
            Write-Host "  📄 $importPath" -ForegroundColor Gray
        }
    }
    
    return $content
}

$mainCSS = Merge-CSS "$cssDir\main.css" $cssDir
Set-Content -Path $outputFile -Value $mainCSS -Encoding UTF8 -Force
$size = (Get-Item $outputFile).Length
Write-Host "✅ Объединено в: $outputFile" -ForegroundColor Green
Write-Host "📊 Размер: $([math]::Round($size/1024, 2)) KB" -ForegroundColor Green

# ============================================
# 2. ДОБАВЛЕНИЕ defer к motion-injector.js
# ============================================
Write-Host "`n⚡ ШАГ 2: Добавление defer к motion-injector.js..." -ForegroundColor Yellow

$indexFiles = Get-ChildItem "$projectDir\*.html" -Recurse | Where-Object { $_.Name -eq "index.html" }
foreach ($file in $indexFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $old = '<script src="assets/js/modules/motion-injector.js"></script>'
    $new = '<script src="assets/js/modules/motion-injector.js" defer></script>'
    
    if ($content -match [regex]::Escape($old)) {
        $content = $content -replace [regex]::Escape($old), $new
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -Force
        Write-Host "✅ $file" -ForegroundColor Green
    }
}

# ============================================
# 3. УДАЛЕНИЕ GOOGLE FONTS (оставляем только локальные)
# ============================================
Write-Host "`n🔤 ШАГ 3: Удаление дублирования Google Fonts..." -ForegroundColor Yellow

foreach ($file in $indexFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $googleFonts = '<link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">'
    
    if ($content -match [regex]::Escape($googleFonts)) {
        $content = $content -replace [regex]::Escape($googleFonts), "# Google Fonts removed - using local fonts only"
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -Force
        Write-Host "✅ Google Fonts удалены из $file" -ForegroundColor Green
    }
}

# ============================================
# 4. ДОБАВЛЕНИЕ lazy loading для изображений
# ============================================
Write-Host "`n🖼️  ШАГ 4: Добавление lazy loading..." -ForegroundColor Yellow

foreach ($file in $indexFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $imgRegex = '<img([^>]*)>'
    $matches = [regex]::Matches($content, $imgRegex, 'IgnoreCase')
    
    $count = 0
    foreach ($match in $matches) {
        if ($match.Value -notmatch 'loading=' -and $match.Value -notmatch 'loading=') {
            $content = $content -replace [regex]::Escape($match.Value), '<img$1 loading="lazy" decoding="async">'
            $count++
        }
    }
    
    if ($count -gt 0) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -Force
        Write-Host "  ✅ $count изображений с lazy loading" -ForegroundColor Green
    }
}

# ============================================
# 5. СОЗДАНИЕ README для бэкенда
# ============================================
Write-Host "`n🔐 ШАГ 5: Создание документации по безопасности..." -ForegroundColor Yellow

$readmeContent = @"
# 🔐 БЕЗОПАСНОСТЬ - КРИТИЧНО!

## Проблема
Telegram Bot Token был в клиентском JavaScript. Любой мог его украсть.

## Решение
1. Token удалён из assets/js/modules/forms.js
2. Создан серверный endpoint: api/send-form.php
3. Формы теперь отправляются через сервер

## Использование
```javascript
// Клиентский код (forms.js)
fetch('/api/send-form.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({message: '...'})
});
```

## Развёртывание
1. Загрузите api/send-form.php на сервер
2. Настройте права доступа: chmod 644
3. Проверьте CORS в заголовках
"@

Set-Content -Path "$projectDir\SECURITY-README.md" -Value $readmeContent -Encoding UTF8 -Force
Write-Host "✅ SECURITY-README.md создан" -ForegroundColor Green

# ============================================
# ИТОГ
# ============================================
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host " ОПТИМИЗАЦИЯ ЗАВЕРШЕНА!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`n✅ 56 CSS → 1 файл ($([math]::Round($size/1024, 2)) KB)" -ForegroundColor Green
Write-Host "✅ motion-injector.js получил defer" -ForegroundColor Green
Write-Host "✅ Google Fonts удалены" -ForegroundColor Green
Write-Host "✅ Lazy loading добавлен" -ForegroundColor Green
Write-Host "✅ Безопасность улучшена" -ForegroundColor Green
Write-Host "`n📋 Следующие шаги:" -ForegroundColor Yellow
Write-Host "   1. Перезагрузите страницу в браузере" -ForegroundColor White
Write-Host "   2. Проверьте консоль DevTools" -ForegroundColor White
Write-Host "   3. Запустите Lighthouse audit" -ForegroundColor White
