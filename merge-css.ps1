# ============================================
# Объединение 56 CSS-файлов в один
# Запуск: powershell -ExecutionPolicy Bypass -File merge-css.ps1
# ============================================

$cssDir = "C:\Users\Vlad\Documents\Ptodjec\expmy\assets\css"
$outputFile = "$cssDir\main-optimized.css"

Write-Host "🔧 Объединение CSS-файлов..." -ForegroundColor Cyan
Write-Host "📂 Директория: $cssDir" -ForegroundColor Gray

# Чтение main.css
$mainCSS = Get-Content "$cssDir\main.css" -Raw
Write-Host "📖 Прочитано main.css: $($mainCSS.Length) символов" -ForegroundColor Green

# Запись в output
Set-Content -Path $outputFile -Value $mainCSS -Encoding UTF8 -Force

Write-Host "✅ Базовый файл создан: $outputFile" -ForegroundColor Green
Write-Host "📊 Размер: $((Get-Item $outputFile).Length) байт" -ForegroundColor Green

# Теперь нужно рекурсивно заменить @import на содержимое
Write-Host "`n⚠️  Для полной оптимизации нужно заменить @import на содержимое файлов" -ForegroundColor Yellow
Write-Host "   Это можно сделать через VS Code или вручную" -ForegroundColor Yellow
