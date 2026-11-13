$file = "avtotehnicheskaya\index.html"
$bytes = [System.IO.File]::ReadAllBytes($file)
$text = [System.Text.Encoding]::UTF8.GetString($bytes, 0, [Math]::Min(1000, $bytes.Length))
$text | Out-File -FilePath "verify-avto.txt" -Encoding utf8
