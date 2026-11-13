Set-Location "C:\Users\Анна\IdeaProjects\expmy"

# Find all HTML files that have Windows-1251 content but UTF-8 declaration
$allHtml = Get-ChildItem -Recurse -Filter "*.html" -File | Where-Object {
    $_.FullName -notmatch '\.gigacode_vsc'
}

$count = 0
foreach ($file in $allHtml) {
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    
    # Skip if no BOM and first bytes are ASCII HTML
    if ($bytes[0] -ne 60) { continue }  # '<'
    
    # Try both encodings
    $utf8Text = [System.Text.Encoding]::UTF8.GetString($bytes)
    $cp1251Text = [System.Text.Encoding]::GetEncoding(1251).GetString($bytes)
    
    # Check if UTF-8 gives mojibake but CP1251 gives correct Russian
    $utf8HasMojibake = $utf8Text -match '[\u0080-\u00FF]{2,}'
    $cp1251HasCyrillic = $cp1251Text -match '[\u0400-\u04FF]'
    $utf8HasCyrillic = $utf8Text -match '[\u0400-\u04FF]'
    
    if ($cp1251HasCyrillic -and -not $utf8HasCyrillic) {
        Write-Host "NEEDS FIX: $($file.FullName)"
        $fixed = [System.Text.Encoding]::UTF8.GetBytes($cp1251Text)
        [System.IO.File]::WriteAllBytes($file.FullName, $fixed)
        $count++
    }
}

Write-Host "`nFixed $count files"
