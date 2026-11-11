# Read original file as cp1251 and save as UTF-8
$filePath = 'C:/Users/Vlad/Documents/Ptodjec/expmy/pages/about/index.html'

# Read raw bytes
$bytes = [System.IO.File]::ReadAllBytes($filePath)

# The file has UTF-8 BOM (EF BB BF) at the start
# After that, the Russian text is cp1251 bytes that need to be decoded as cp1251

# Skip the BOM (first 3 bytes) and decode the rest as cp1251
$cp1251 = [System.Text.Encoding]::GetEncoding('windows-1251')
$text = $cp1251.GetString($bytes, 3, $bytes.Length - 3)

# Write as UTF-8 without BOM
$utf8 = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($filePath, $text, $utf8)

Write-Host "File 1 fixed. First 300 chars:"
Write-Host $text.Substring(0, [Math]::Min(300, $text.Length))

# Verify by checking bytes
$checkBytes = [System.IO.File]::ReadAllBytes($filePath)
Write-Host "`nFirst 10 bytes of fixed file: $($checkBytes[0..9] -join ' ')"
