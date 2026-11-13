$file = "avtotehnicheskaya\index.html"
$bytes = [System.IO.File]::ReadAllBytes($file)
Write-Host "Total bytes: $($bytes.Length)"
Write-Host "First 10 bytes: $($bytes[0]), $($bytes[1]), $($bytes[2]), $($bytes[3]), $($bytes[4]), $($bytes[5]), $($bytes[6]), $($bytes[7]), $($bytes[8]), $($bytes[9])"

# Check for BOM
if ($bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    Write-Host "Encoding: UTF-8 BOM"
} elseif ($bytes[0] -eq 0xFF -and $bytes[1] -eq 0xFE) {
    Write-Host "Encoding: UTF-16 LE BOM"
} elseif ($bytes[0] -eq 0xFE -and $bytes[1] -eq 0xFF) {
    Write-Host "Encoding: UTF-16 BE BOM"
} elseif ($bytes[0] -eq 0x00 -and $bytes[1] -eq 0x00 -and $bytes[2] -eq 0xFE -and $bytes[3] -eq 0xFF) {
    Write-Host "Encoding: UTF-32 LE BOM"
} else {
    Write-Host "No BOM detected"
    
    # Try to decode as different encodings and show first 100 chars
    $utf8 = [System.Text.Encoding]::UTF8.GetString($bytes, 0, [Math]::Min(500, $bytes.Length))
    $cp1251 = [System.Text.Encoding]::GetEncoding(1251).GetString($bytes, 0, [Math]::Min(500, $bytes.Length))
    $koi8r = [System.Text.Encoding]::GetEncoding(20866).GetString($bytes, 0, [Math]::Min(500, $bytes.Length))
    
    Write-Host "`nAs UTF-8: $utf8"
    Write-Host "`nAs Windows-1251: $cp1251"
    Write-Host "`nAs KOI8-R: $koi8r"
}
