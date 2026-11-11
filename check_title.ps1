# Find the actual <title> tag with Russian text
$filePath = 'C:/Users/Vlad/Documents/Ptodjec/expmy/pages/about/index.html'
$bytes = [System.IO.File]::ReadAllBytes($filePath)

# Read as UTF-8
$utf8 = [System.Text.Encoding]::UTF8
$content = $utf8.GetString($bytes)

# Find <title> tag
$titleMatch = [regex]::Match($content, '<title>(.*?)</title>')
if ($titleMatch.Success) {
    $titleContent = $titleMatch.Groups[1].Value
    Write-Host "Title content: $titleContent"
    Write-Host "Title length: $($titleContent.Length)"
    Write-Host "Title bytes (hex):"
    $titleBytes = $utf8.GetBytes($titleContent)
    Write-Host ($titleBytes -join ' ')
    Write-Host ""
    Write-Host "Title bytes as cp1251:"
    $cp1251 = [System.Text.Encoding]::GetEncoding('windows-1251')
    $decoded = $cp1251.GetString($titleBytes)
    Write-Host $decoded
}

# Find the first <h1> tag
$h1Match = [regex]::Match($content, '<h1[^>]*>(.*?)</h1>')
if ($h1Match.Success) {
    $h1Content = $h1Match.Groups[1].Value
    Write-Host "`nH1 content: $h1Content"
    $h1Bytes = $utf8.GetBytes($h1Content)
    Write-Host "H1 bytes (hex):"
    Write-Host ($h1Bytes -join ' ')
    Write-Host ""
    Write-Host "H1 bytes as cp1251:"
    $h1Decoded = $cp1251.GetString($h1Bytes)
    Write-Host $h1Decoded
}
