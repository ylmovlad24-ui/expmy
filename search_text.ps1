# Check what the actual corrupted text looks like
$filePath = 'C:/Users/Vlad/Documents/Ptodjec/expmy/pages/about/index.html'
$bytes = [System.IO.File]::ReadAllBytes($filePath)

# Find "О компании" in cp1251 encoding
$cp1251 = [System.Text.Encoding]::GetEncoding('windows-1251')
$correctText = "О компании"
$cp1251Bytes = $cp1251.GetBytes($correctText)

Write-Host "Looking for: '$correctText'"
Write-Host "In cp1251 bytes: $($cp1251Bytes -join ' ')"
Write-Host "In cp1251 hex: $($cp1251Bytes | ForEach-Object { '{0:X2}' -f $_ } | ForEach-Object { $_ + ' ' })"

# Search for these bytes in the file
$found = $false
for ($i = 0; $i -lt ($bytes.Length - $cp1251Bytes.Length); $i++) {
    $match = $true
    for ($j = 0; $j -lt $cp1251Bytes.Length; $j++) {
        if ($bytes[$i+$j] -ne $cp1251Bytes[$j]) {
            $match = $false
            break
        }
    }
    if ($match) {
        Write-Host "`nFound at position: $i"
        Write-Host "Context: $($bytes[($i-10)..($i+$cp1251Bytes.Length+10)] -join ' ')"
        $found = $true
        break
    }
}

if (-not $found) {
    Write-Host "`nNOT found in file"
    
    # Try searching for the UTF-8 encoded version
    $utf8 = [System.Text.Encoding]::UTF8
    $utf8Bytes = $utf8.GetBytes($correctText)
    Write-Host "`nTrying UTF-8 bytes: $($utf8Bytes -join ' ')"
    Write-Host "In UTF-8 hex: $($utf8Bytes | ForEach-Object { '{0:X2}' -f $_ } | ForEach-Object { $_ + ' ' })"
    
    for ($i = 0; $i -lt ($bytes.Length - $utf8Bytes.Length); $i++) {
        $match = $true
        for ($j = 0; $j -lt $utf8Bytes.Length; $j++) {
            if ($bytes[$i+$j] -ne $utf8Bytes[$j]) {
                $match = $false
                break
            }
        }
        if ($match) {
            Write-Host "`nFound UTF-8 version at position: $i"
            $found = $true
            break
        }
    }
    
    if (-not $found) {
        Write-Host "UTF-8 version also NOT found"
    }
}
