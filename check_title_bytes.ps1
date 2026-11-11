# Check the title tag bytes in the fixed file
$filePath = 'C:/Users/Vlad/Documents/Ptodjec/expmy/pages/about/index.html'
$bytes = [System.IO.File]::ReadAllBytes($filePath)

# Find <title> tag
$titlePos = 0
for ($i = 0; $i -lt ($bytes.Length - 6); $i++) {
    if ($bytes[$i] -eq 60 -and $bytes[$i+1] -eq 116 -and $bytes[$i+2] -eq 105 -and $bytes[$i+3] -eq 116 -and $bytes[$i+4] -eq 108 -and $bytes[$i+5] -eq 101) {
        $titlePos = $i
        break
    }
}

Write-Host "Title tag at position: $titlePos"
Write-Host "Bytes around title:"
$titleEnd = $titlePos
for ($i = $titlePos; $i -lt ($bytes.Length - 8); $i++) {
    if ($bytes[$i] -eq 60 -and $bytes[$i+1] -eq 47 -and $bytes[$i+2] -eq 116 -and $bytes[$i+3] -eq 105 -and $bytes[$i+4] -eq 116 -and $bytes[$i+5] -eq 108 -and $bytes[$i+6] -eq 101 -and $bytes[$i+7] -eq 62) {
        $titleEnd = $i
        break
    }
}

$titleBytes = $bytes[$titlePos..$titleEnd]
Write-Host "Title tag bytes: $($titleBytes -join ' ')"
Write-Host "Title tag bytes (hex): $($titleBytes | ForEach-Object { '{0:X2}' -f $_ } | Join-String -Separator ' ')"

# Decode as UTF-8
$utf8 = [System.Text.Encoding]::UTF8
$titleText = $utf8.GetString($bytes, $titlePos, $titleEnd - $titlePos + 1)
Write-Host "`nTitle tag decoded as UTF-8: $titleText"

# Also decode just the content
$contentBytes = $bytes[($titlePos + 7)..($titleEnd - 8)]
$contentText = $utf8.GetString($contentBytes)
Write-Host "Title content decoded as UTF-8: $contentText"
