# Direct string replacement approach
# Read the corrupted HTML file
$filePath = 'C:/Users/Vlad/Documents/Ptodjec/expmy/pages/about/index.html'
$html = [System.IO.File]::ReadAllText($filePath)

# Read the MD source
$mdPath = 'C:/Users/Vlad/Documents/Ptodjec/expmy/content-extraction/pages/about.md'
$md = [System.IO.File]::ReadAllText($mdPath)

# The corrupted text is double-encoded UTF-8
# To get the correct replacement text, we need to encode the MD text as UTF-8
# and then decode as cp1251 (to match the corruption pattern)

function Get-CorruptedText($correctText) {
    $utf8 = [System.Text.Encoding]::UTF8
    $cp1251 = [System.Text.Encoding]::GetEncoding('windows-1251')
    
    # Encode as cp1251 to get the bytes
    $cp1251Bytes = $cp1251.GetBytes($correctText)
    
    # Decode those bytes as UTF-8 to get the corrupted text
    $corrupted = [System.Text.Encoding]::UTF8.GetString($cp1251Bytes)
    
    return $corrupted
}

# Test with a known string
$correct = "О компании"
$corrupted = Get-CorruptedText $correct
Write-Host "Correct: '$correct'"
Write-Host "Corrupted: '$corrupted'"

# Check if the corrupted text exists in the HTML
if ($html.Contains($corrupted)) {
    Write-Host "`nFound corrupted text in HTML!"
    $html = $html.Replace($corrupted, $correct)
    Write-Host "Replaced successfully"
} else {
    Write-Host "`nCorrupted text NOT found in HTML"
    Write-Host "HTML contains: $($html.Substring(218, 50))"
}
