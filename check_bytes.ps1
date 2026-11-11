# Check bytes around title tag
$filePath = 'C:/Users/Vlad/Documents/Ptodjec/expmy/pages/about/index.html'
$bytes = [System.IO.File]::ReadAllBytes($filePath)

# Find "<title>" position
$titlePos = 0
for ($i = 0; $i -lt ($bytes.Length - 7); $i++) {
    if ($bytes[$i] -eq 60 -and $bytes[$i+1] -eq 116 -and $bytes[$i+2] -eq 105 -and $bytes[$i+3] -eq 116 -and $bytes[$i+4] -eq 108 -and $bytes[$i+5] -eq 101 -and $bytes[$i+6] -eq 103) {
        $titlePos = $i
        break
    }
}

Write-Host "Title tag found at position: $titlePos"
Write-Host "Bytes around title tag:"
$bytes[($titlePos)..($titlePos+200)] -join ' '
