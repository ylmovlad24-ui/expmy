$f = Get-Item 'C:/Users/Vlad/Documents/Ptodjec/expmy/SITE_CONTENT_DOCUMENT.txt'
Write-Host "Size: $($f.Length) bytes"
$lines = Get-Content $f.FullName
Write-Host "Lines: $($lines.Count)"
Write-Host "First 500 chars:"
Write-Host ($lines[0..4] -join "`n")
