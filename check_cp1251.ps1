# Try reading as cp1251 directly
$filePath = 'C:/Users/Vlad/Documents/Ptodjec/expmy/pages/about/index.html'
$bytes = [System.IO.File]::ReadAllBytes($filePath)

# Check first few bytes
Write-Host "First 10 bytes: $($bytes[0..9] -join ' ')"

# Try reading as cp1251
$cp1251 = [System.Text.Encoding]::GetEncoding('windows-1251')
$text1251 = $cp1251.GetString($bytes)
Write-Host "`nFirst 300 chars as cp1251:"
Write-Host $text1251.Substring(0, [Math]::Min(300, $text1251.Length))

# Check for BOM in cp1251
Write-Host "`nFirst char as cp1251: '$($text1251[0])' (code: $([int]$text1251[0]))"

# The BOM (EF BB BF) in cp1251 would be three separate characters
# EF = п, BB = , BF = ў
Write-Host "BOM bytes as cp1251 chars: '$($cp1251.GetString(@(0xEF,0xBB,0xBF)))'"
