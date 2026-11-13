# Конвертация файлов из CP1251 в UTF-8 без BOM
$dirs = @("avtotovarovedcheskaya", "tovarovedcheskaya-b2b")
$total = 0

foreach ($dir in $dirs) {
    $files = Get-ChildItem -Path $dir -Filter "*.html" -Recurse
    foreach ($f in $files) {
        $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
        
        # Пробуем CP1251
        try {
            $cp1251 = [System.Text.Encoding]::GetEncoding(1251)
            $text = $cp1251.GetString($bytes)
            $utf8NoBom = New-Object System.Text.UTF8Encoding $false
            $outBytes = $utf8NoBom.GetBytes($text)
            [System.IO.File]::WriteAllBytes($f.FullName, $outBytes)
            $total++
        } catch {
            Write-Host "Error: $($_.Exception.Message)"
        }
    }
}

Write-Host "Converted $total files from CP1251 to UTF-8"

# Проверка
$checkFile = "avtotovarovedcheskaya/osago/index.html"
$text = [System.IO.File]::ReadAllText($checkFile, [System.Text.Encoding]::UTF8)
$idx = $text.IndexOf('<title>')
$endIdx = $text.IndexOf('</title>', $idx) + 8
Write-Host "Check: $($text.Substring($idx, $endIdx - $idx))"
