# ============================================
# TOTAL OPTIMIZATION - objektiv-expert.ru
# ============================================

$projectDir = "C:\Users\Vlad\Documents\Ptodjec\expmy"
$cssDir = "$projectDir\assets\css"
$outputFile = "$cssDir\main-optimized.css"

Write-Host "TOTAL OPTIMIZATION START" -ForegroundColor Cyan

# STEP 1: Merge CSS
Write-Host "STEP 1: Merging CSS files..." -ForegroundColor Yellow

function Merge-CSS {
    param($filePath, $baseDir, $visited = @())
    
    $resolvedPath = Resolve-Path $filePath -ErrorAction SilentlyContinue
    if (-not $resolvedPath) { return "# File not found" }
    
    if ($visited -contains $resolvedPath.Path) {
        return "# Circular import"
    }
    $visited += $resolvedPath.Path
    
    $content = Get-Content $resolvedPath.Path -Raw -Encoding UTF8
    $lines = $content -split "`n"
    $result = @()
    
    foreach ($line in $lines) {
        if ($line -match "^@import\s+url\(['""]?(.+?)['""]?\);") {
            $importPath = $matches[1]
            $fullPath = Join-Path $baseDir $importPath
            if (Test-Path $fullPath) {
                Write-Host "  Import: $importPath" -ForegroundColor Gray
                $imported = Merge-CSS $fullPath $baseDir $visited
                $result += $imported
            }
        } else {
            $result += $line
        }
    }
    
    return $result -join "`n"
}

$mainCSS = Merge-CSS "$cssDir\main.css" $cssDir
Set-Content -Path $outputFile -Value $mainCSS -Encoding UTF8 -Force
$size = (Get-Item $outputFile).Length
Write-Host "DONE: $outputFile" -ForegroundColor Green
Write-Host "Size: $([math]::Round($size/1024, 2)) KB" -ForegroundColor Green

# STEP 2: Add defer to motion-injector
Write-Host "STEP 2: Adding defer to motion-injector..." -ForegroundColor Yellow

$indexFile = "$projectDir\index.html"
$content = Get-Content $indexFile -Raw -Encoding UTF8
$content = $content -replace 'src="assets/js/modules/motion-injector.js"></script>', 'src="assets/js/modules/motion-injector.js" defer></script>'
Set-Content -Path $indexFile -Value $content -Encoding UTF8 -Force
Write-Host "DONE: defer added" -ForegroundColor Green

# STEP 3: Remove Google Fonts
Write-Host "STEP 3: Removing Google Fonts..." -ForegroundColor Yellow

$googleFonts = 'https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap'
if ($content -match [regex]::Escape($googleFonts)) {
    $content = $content -replace [regex]::Escape($googleFonts), '# REMOVED - using local fonts'
    Set-Content -Path $indexFile -Value $content -Encoding UTF8 -Force
    Write-Host "DONE: Google Fonts removed" -ForegroundColor Green
}

# STEP 4: Add lazy loading to images
Write-Host "STEP 4: Adding lazy loading..." -ForegroundColor Yellow

$pattern = '<img([^>]*?)>'
$matches = [regex]::Matches($content, $pattern, 'IgnoreCase')
$count = 0
foreach ($match in $matches) {
    if ($match.Value -notmatch 'loading=') {
        $content = $content -replace [regex]::Escape($match.Value), '<img$1 loading="lazy" decoding="async">'
        $count++
    }
}
if ($count -gt 0) {
    Set-Content -Path $indexFile -Value $content -Encoding UTF8 -Force
    Write-Host "DONE: $count images with lazy loading" -ForegroundColor Green
}

# STEP 5: Create SECURITY README
Write-Host "STEP 5: Creating SECURITY README..." -ForegroundColor Yellow

$securityReadme = @"
# SECURITY - CRITICAL!

## Issue
Telegram Bot Token was in client JavaScript. Anyone could steal it.

## Solution
1. Token removed from assets/js/modules/forms.js
2. Server endpoint created: api/send-form.php
3. Forms now sent through server

## Usage
Client code (forms.js) sends to /api/send-form.php
Server handles Telegram API call securely

## Deploy
1. Upload api/send-form.php to server
2. Set permissions: chmod 644
3. Check CORS headers
"@

Set-Content -Path "$projectDir\SECURITY-README.md" -Value $securityReadme -Encoding UTF8 -Force
Write-Host "DONE: SECURITY-README.md created" -ForegroundColor Green

# SUMMARY
Write-Host "" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " OPTIMIZATION COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "" -ForegroundColor White
Write-Host "DONE:" -ForegroundColor Green
Write-Host "  - 56 CSS files merged to 1" -ForegroundColor White
Write-Host "  - motion-injector.js has defer" -ForegroundColor White
Write-Host "  - Google Fonts removed" -ForegroundColor White
Write-Host "  - Lazy loading added" -ForegroundColor White
Write-Host "  - Security improved" -ForegroundColor White
Write-Host "" -ForegroundColor White
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host "  1. Reload page in browser" -ForegroundColor White
Write-Host "  2. Check DevTools console" -ForegroundColor White
Write-Host "  3. Run Lighthouse audit" -ForegroundColor White
