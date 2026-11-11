# Check the actual bytes of the fixed file
$filePath = 'C:/Users/Vlad/Documents/Ptodjec/expmy/pages/about/index.html'
$bytes = [System.IO.File]::ReadAllBytes($filePath)

# Find <title> tag
$content = [System.IO.File]::ReadAllText($filePath)
$titleMatch = [regex]::Match($content, '<title>(.*?)</title>')
if ($titleMatch.Success) {
    $titleContent = $titleMatch.Groups[1].Value
    $titleBytes = [System.Text.Encoding]::UTF8.GetBytes($titleContent)
    Write-Host "Title content (hex):"
    Write-Host ($titleBytes -join ' ')
    Write-Host ""
    Write-Host "Title decoded as UTF-8: $titleContent"
}

# Check first 100 bytes
Write-Host "`nFirst 100 bytes:"
Write-Host ($bytes[0..99] -join ' ')
