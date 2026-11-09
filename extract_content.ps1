$files = Get-ChildItem -Recurse -Include '*.html' -File -Path 'C:/Users/Vlad/Documents/Ptodjec/expmy'
$output = @()
$base = 'C:/Users/Vlad/Documents/Ptodjec/expmy/'
foreach ($f in $files) {
    $relPath = $f.FullName.Substring($base.Length)
    $content = Get-Content $f.FullName -Raw
    $clean = $content
    $clean = [regex]::Replace($clean, '<!--.*?-->', '', 'Singleline')
    $clean = [regex]::Replace($clean, '<script[^>]*>.*?</script>', '', 'Singleline')
    $clean = [regex]::Replace($clean, '<style[^>]*>.*?</style>', '', 'Singleline')
    $clean = [regex]::Replace($clean, '<[^>]+>', ' ')
    $clean = [regex]::Replace($clean, '\s+', ' ')
    $clean = $clean.Trim()
    if ($clean.Length -gt 100) {
        $output += "=== PAGE: $relPath ===" + [Environment]::NewLine + $clean + [Environment]::NewLine + [Environment]::NewLine
    }
}
$output -join '' | Out-File -FilePath 'C:/Users/Vlad/Documents/Ptodjec/expmy/SITE_CONTENT_DOCUMENT.txt' -Encoding UTF8
Write-Host "Done: $($files.Count) files processed"
