# Fix encoding - file is UTF-8 but contains cp1251 text that was re-encoded
$filePath = 'C:/Users/Vlad/Documents/Ptodjec/expmy/pages/about/index.html'

# Read as UTF-8 (with BOM)
$utf8 = [System.Text.Encoding]::UTF8
$content = [System.IO.File]::ReadAllText($filePath, $utf8)

# The BOM at the start will be the character U+FEFF
# Remove BOM if present
if ($content.StartsWith("`u{FEFF}")) {
    $content = $content.Substring(1)
}

# Now the Russian text is UTF-8 encoded cp1251 bytes
# To fix: encode the UTF-8 string back to bytes, then decode as cp1251
$utf8Bytes = $utf8.GetBytes($content)
$cp1251 = [System.Text.Encoding]::GetEncoding('windows-1251')
$fixedText = $cp1251.GetString($utf8Bytes)

# Write back as UTF-8 with BOM
$utf8WithBom = New-Object System.Text.UTF8Encoding $true
[System.IO.File]::WriteAllText($filePath, $fixedText, $utf8WithBom)
Write-Host "File 1 fixed successfully"

# Show first 300 chars of fixed content
Write-Host "`nFirst 300 chars:"
Write-Host $fixedText.Substring(0, [Math]::Min(300, $fixedText.Length))
