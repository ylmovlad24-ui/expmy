# Read as cp1251, fix BOM, write as UTF-8
$filePath = 'C:/Users/Vlad/Documents/Ptodjec/expmy/pages/about/index.html'

# Read as cp1251
$cp1251 = [System.Text.Encoding]::GetEncoding('windows-1251')
$text1251 = $cp1251.GetString([System.IO.File]::ReadAllBytes($filePath))

# Remove the BOM characters (п»ї = U+FEFF in cp1251)
# The BOM bytes EF BB BF in cp1251 are: п(0xEF) »(0xBB) ў(0xBF)
# In Unicode, these are U+043F, U+00BB, U+0443
# But the UTF-8 BOM U+FEFF is what we want to remove

# Actually, let's just check what the first characters are
Write-Host "First 5 chars: '$($text1251.Substring(0,5))'"
Write-Host "Char codes: $([int]$text1251[0]) $([int]$text1251[1]) $([int]$text1251[2])"

# The UTF-8 BOM (EF BB BF) when read as cp1251 becomes:
# 0xEF = п (U+043F)
# 0xBB = » (U+00BB)
# 0xBF = ў (U+0443)
# But PowerShell might be showing them differently

# Let's just strip the first 3 bytes and decode the rest as cp1251
$bytes = [System.IO.File]::ReadAllBytes($filePath)
# Skip the first 3 bytes (UTF-8 BOM)
$text1251NoBom = $cp1251.GetString($bytes, 3, $bytes.Length - 3)

Write-Host "`nFirst 300 chars without BOM:"
Write-Host $text1251NoBom.Substring(0, [Math]::Min(300, $text1251NoBom.Length))

# Now write as UTF-8
$utf8 = [System.Text.Encoding]::UTF8
[System.IO.File]::WriteAllText($filePath, $text1251NoBom, $utf8)
Write-Host "`nFile 1 fixed successfully"
