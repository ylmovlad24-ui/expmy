$file = "avtotehnicheskaya\index.html"
$bytes = [System.IO.File]::ReadAllBytes($file)
$utf8Text = [System.Text.Encoding]::UTF8.GetString($bytes, 0, [Math]::Min(500, $bytes.Length))
$cp1251Text = [System.Text.Encoding]::GetEncoding(1251).GetString($bytes, 0, [Math]::Min(500, $bytes.Length))

"=== UTF-8 ==="
$utf8Text | Out-File -FilePath "utf8-result.txt" -Encoding utf8
"=== CP1251 ==="
$cp1251Text | Out-File -FilePath "cp1251-result.txt" -Encoding utf8

"Done" | Out-File -FilePath "check-done.txt" -Encoding utf8
