# Check the current state of the target file
$targetPath = 'C:/Users/Vlad/Documents/Ptodjec/expmy/pages/about/index.html'
$bytes = [System.IO.File]::ReadAllBytes($targetPath)

# Find <title> tag
$titlePos = -1
for ($i = 0; $i -lt ($bytes.Length - 6); $i++) {
    if ($bytes[$i] -eq 60 -and $bytes[$i+1] -eq 116 -and $bytes[$i+2] -eq 105 -and $bytes[$i+3] -eq 116 -and $bytes[$i+4] -eq 108 -and $bytes[$i+5] -eq 101) {
        $titlePos = $i
        break
    }
}

Write-Host "Title tag at position: $titlePos"

# Get title content bytes
$titleEndPos = -1
for ($i = $titlePos + 7; $i -lt ($bytes.Length - 8); $i++) {
    if ($bytes[$i] -eq 60 -and $bytes[$i+1] -eq 47 -and $bytes[$i+2] -eq 116 -and $bytes[$i+3] -eq 105 -and $bytes[$i+4] -eq 116 -and $bytes[$i+5] -eq 108 -and $bytes[$i+6] -eq 101 -and $bytes[$i+7] -eq 62) {
        $titleEndPos = $i
        break
    }
}

Write-Host "Title end at position: $titleEndPos"

# Get title content bytes (between <title> and </title>)
$contentStart = $titlePos + 7
$contentLength = $titleEndPos - $contentStart
$contentBytes = $bytes[$contentStart..($contentStart + $contentLength - 1)]

Write-Host "Title content length: $contentLength"
Write-Host "First 20 title content bytes: $($contentBytes[0..19] -join ' ')"
Write-Host "First 20 title content bytes (hex): $($contentBytes[0..19] | ForEach-Object { '{0:X2}' -f $_ } | ForEach-Object { $_ + ' ' })"

# Decode as UTF-8
$utf8 = [System.Text.Encoding]::UTF8
$contentText = $utf8.GetString($contentBytes)
Write-Host "`nTitle content as UTF-8: $contentText"

# Try decoding as cp1251
$cp1251 = [System.Text.Encoding]::GetEncoding('windows-1251')
$contentText1251 = $cp1251.GetString($contentBytes)
Write-Host "Title content as cp1251: $contentText1251"
