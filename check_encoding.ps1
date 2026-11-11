# Check raw bytes of file
$bytes = [System.IO.File]::ReadAllBytes('C:/Users/Vlad/Documents/Ptodjec/expmy/pages/about/index.html')
Write-Host "Byte count: $($bytes.Length)"
Write-Host "First 100 bytes: $($bytes[0..99] -join ',')"

# Try to decode as cp1251
$cp1251 = [System.Text.Encoding]::GetEncoding('windows-1251')
$text1251 = $cp1251.GetString($bytes)
Write-Host "`nFirst 200 chars decoded as cp1251:"
Write-Host $text1251.Substring(0, [Math]::Min(200, $text1251.Length))

# Check if file is already UTF-8 or cp1251
$utf8 = [System.Text.Encoding]::UTF8
Write-Host "`nFirst 100 bytes as UTF-8:"
Write-Host $utf8.GetString($bytes[0..99])
