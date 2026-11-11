# Direct text replacement approach
# Read the corrupted HTML file
$filePath = 'C:/Users/Vlad/Documents/Ptodjec/expmy/pages/about/index.html'
$corruptedHtml = [System.IO.File]::ReadAllText($filePath)

# Read the MD source
$mdPath = 'C:/Users/Vlad/Documents/Ptodjec/expmy/content-extraction/pages/about.md'
$mdContent = [System.IO.File]::ReadAllText($mdPath)

# The corrupted text is double-encoded UTF-8 (cp1251 bytes re-encoded as UTF-8)
# To fix: encode as UTF-8 to get bytes, then decode as cp1251, then re-encode as UTF-8

# Function to fix a single string
function Fix-Encoding($str) {
    $utf8 = [System.Text.Encoding]::UTF8
    $cp1251 = [System.Text.Encoding]::GetEncoding('windows-1251')
    $utf8Bytes = $utf8.GetBytes($str)
    return $cp1251.GetString($utf8Bytes)
}

# Test with a known string
$test = "Р В РЎвЂ"
$fixed = Fix-Encoding $test
Write-Host "Test: '$test' -> '$fixed'"
