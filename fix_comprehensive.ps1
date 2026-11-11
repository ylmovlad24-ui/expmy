# Comprehensive encoding fix script
# The file has double-encoded UTF-8 (cp1251 bytes re-encoded as UTF-8)
# Fix: encode UTF-8 text to bytes, then decode as cp1251

function Fix-Encoding($text) {
    $utf8 = [System.Text.Encoding]::UTF8
    $cp1251 = [System.Text.Encoding]::GetEncoding('windows-1251')
    
    # Encode the UTF-8 text back to bytes
    $utf8Bytes = $utf8.GetBytes($text)
    
    # Decode those bytes as cp1251
    $decoded = $cp1251.GetString($utf8Bytes)
    
    return $decoded
}

# Test with a known corrupted string
$corrupted = "Р В РЎвЂ"  # This is what we see in the file
$fixed = Fix-Encoding $corrupted
Write-Host "Corrupted: '$corrupted'"
Write-Host "Fixed: '$fixed'"
Write-Host ""

# Now apply to the entire file
$filePath = 'C:/Users/Vlad/Documents/Ptodjec/expmy/pages/about/index.html'

# Read the file as UTF-8
$utf8 = [System.Text.Encoding]::UTF8
$content = $utf8.GetString([System.IO.File]::ReadAllBytes($filePath))

# Apply the fix to the entire content
$fixedContent = Fix-Encoding $content

# Write back as UTF-8
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($filePath, $fixedContent, $utf8NoBom)

Write-Host "File 1 fixed successfully"

# Verify by checking the title
$titleMatch = [regex]::Match($fixedContent, '<title>(.*?)</title>')
if ($titleMatch.Success) {
    Write-Host "`nTitle after fix: $($titleMatch.Groups[1].Value)"
}
