# Fix encoding - double-encoded UTF-8 (cp1251 bytes re-encoded as UTF-8)
$filePath = 'C:/Users/Vlad/Documents/Ptodjec/expmy/pages/about/index.html'

# Read as UTF-8
$utf8 = [System.Text.Encoding]::UTF8
$content = [System.IO.File]::ReadAllText($filePath, $utf8)

# Remove BOM if present
if ($content.StartsWith("`u{FEFF}")) {
    $content = $content.Substring(1)
}

# The text is double-encoded: cp1251 bytes were saved as UTF-8
# To fix: encode as UTF-8 to get bytes, then decode as cp1251
$utf8Bytes = $utf8.GetBytes($content)
$cp1251 = [System.Text.Encoding]::GetEncoding('windows-1251')
$fixedText = $cp1251.GetString($utf8Bytes)

# Verify the fix
Write-Host "First 300 chars of fixed content:"
Write-Host $fixedText.Substring(0, [Math]::Min(300, $fixedText.Length))

# Check title specifically
$titleMatch = [regex]::Match($fixedText, '<title>(.*?)</title>')
if ($titleMatch.Success) {
    Write-Host "`nTitle after fix: $($titleMatch.Groups[1].Value)"
}

# Write back as UTF-8 with BOM
$utf8WithBom = New-Object System.Text.UTF8Encoding $true
[System.IO.File]::WriteAllText($filePath, $fixedText, $utf8WithBom)
Write-Host "`nFile 1 fixed successfully"
