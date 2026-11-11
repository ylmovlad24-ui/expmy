# The file has double-encoding issue. Let's try to understand it better.
# Read raw bytes
$filePath = 'C:/Users/Vlad/Documents/Ptodjec/expmy/pages/about/index.html'
$bytes = [System.IO.File]::ReadAllBytes($filePath)

# Check if it starts with UTF-8 BOM
Write-Host "First 3 bytes: $($bytes[0]) $($bytes[1]) $($bytes[2])"
Write-Host "Is UTF-8 BOM: $($bytes[0] -eq 239 -and $bytes[1] -eq 187 -and $bytes[2] -eq 191)"

# The BOM bytes are 239,187,191 (0xEF,0xBB,0xBF)
# After BOM, the Russian text bytes are: 208,191,209,151,208,133...
# These are UTF-8 encoded bytes for Cyrillic characters

# Let's check: what if the file was saved as cp1251, then the BOM was prepended?
# In that case, the Russian text would be raw cp1251 bytes

# Check a known string: "Объектив-Эксперт" in cp1251
$cp1251 = [System.Text.Encoding]::GetEncoding('windows-1251')
$original = "Объектив-Эксперт"
$cp1251Bytes = $cp1251.GetBytes($original)
Write-Host "`n'Объектив-Эксперт' in cp1251:"
Write-Host ($cp1251Bytes -join ' ')

# Now let's find these bytes in the file
$pos = -1
for ($i = 3; $i -lt ($bytes.Length - $cp1251Bytes.Length); $i++) {
    if ($bytes[$i] -eq $cp1251Bytes[0]) {
        $match = $true
        for ($j = 1; $j -lt $cp1251Bytes.Length; $j++) {
            if ($bytes[$i+$j] -ne $cp1251Bytes[$j]) {
                $match = $false
                break
            }
        }
        if ($match) {
            $pos = $i
            break
        }
    }
}

if ($pos -ge 0) {
    Write-Host "`nFound 'Объектив-Эксперт' (cp1251) at position: $pos"
    Write-Host "Bytes at that position: $($bytes[$pos..($pos+$cp1251Bytes.Length-1)] -join ' ')"
} else {
    Write-Host "`n'Объектив-Эксперт' (cp1251) NOT found in file"
}

# Try searching for the UTF-8 encoded version
$utf8 = [System.Text.Encoding]::UTF8
$utf8Bytes = $utf8.GetBytes($original)
Write-Host "`n'Объектив-Эксперт' in UTF-8:"
Write-Host ($utf8Bytes -join ' ')

$pos2 = -1
for ($i = 3; $i -lt ($bytes.Length - $utf8Bytes.Length); $i++) {
    if ($bytes[$i] -eq $utf8Bytes[0]) {
        $match = $true
        for ($j = 1; $j -lt $utf8Bytes.Length; $j++) {
            if ($bytes[$i+$j] -ne $utf8Bytes[$j]) {
                $match = $false
                break
            }
        }
        if ($match) {
            $pos2 = $i
            break
        }
    }
}

if ($pos2 -ge 0) {
    Write-Host "`nFound 'Объектив-Эксперт' (UTF-8) at position: $pos2"
} else {
    Write-Host "`n'Объектив-Эксперт' (UTF-8) NOT found in file"
}
