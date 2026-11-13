$allHtml = Get-ChildItem -Recurse -Filter "*.html" -File -Path "C:\Users\Анна\IdeaProjects\expmy" | Where-Object {
    $_.FullName -notmatch '\.gigacode_vsc' -and $_.FullName -notmatch 'check-' -and $_.FullName -notmatch 'fix-' -and $_.FullName -notmatch 'recode-'
}

$fixed = 0
foreach ($file in $allHtml) {
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    if ($bytes[0] -ne 60) { continue }
    
    $utf8Text = [System.Text.Encoding]::UTF8.GetString($bytes)
    $cp1251Text = [System.Text.Encoding]::GetEncoding(1251).GetString($bytes)
    
    $utf8HasCyrillic = $utf8Text -match '[\u0400-\u04FF]'
    $cp1251HasCyrillic = $cp1251Text -match '[\u0400-\u04FF]'
    
    if ($cp1251HasCyrillic -and -not $utf8HasCyrillic) {
        Write-Host "NEEDS FIX: $($file.FullName)"
        $fixed++
    }
}

if ($fixed -eq 0) {
    Write-Host "All HTML files are correctly encoded as UTF-8"
} else {
    Write-Host "`n$fixed files still need fixing"
}
