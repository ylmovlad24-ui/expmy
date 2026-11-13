Set-Location "C:\Users\Анна\IdeaProjects\expmy"

$files = @(
    "avtotehnicheskaya\index.html",
    "avtotovarovedcheskaya\index.html",
    "tovarovedcheskaya-b2b\index.html"
)

$backupRoot = ".gigacode_vsc\worktrees\understood-cave"

foreach ($file in $files) {
    $src = Join-Path $backupRoot $file
    $dst = $file
    
    Write-Host "=== $file ==="
    
    if (Test-Path $src) {
        $bytes = [System.IO.File]::ReadAllBytes($src)
        $cp1251Text = [System.Text.Encoding]::GetEncoding(1251).GetString($bytes, 0, [Math]::Min(500, $bytes.Length))
        $utf8Text = [System.Text.Encoding]::UTF8.GetString($bytes, 0, [Math]::Min(500, $bytes.Length))
        
        $cp1251HasCyrillic = $cp1251Text -match '[\u0400-\u04FF]'
        $utf8HasCyrillic = $utf8Text -match '[\u0400-\u04FF]'
        
        Write-Host "UTF-8 Cyrillic: $utf8HasCyrillic"
        Write-Host "CP1251 Cyrillic: $cp1251HasCyrillic"
        
        if ($cp1251HasCyrillic -and -not $utf8HasCyrillic) {
            Write-Host "Source is CP1251 - converting to UTF-8"
            $utf8Bytes = [System.Text.Encoding]::UTF8.GetBytes($cp1251Text)
            [System.IO.File]::WriteAllBytes($dst, $utf8Bytes)
            Write-Host "Copied and converted: $dst"
        } elseif ($utf8HasCyrillic) {
            Write-Host "Source is already UTF-8 - copying as-is"
            Copy-Item $src $dst -Force
            Write-Host "Copied: $dst"
        } else {
            Write-Host "Unknown encoding - copying as-is"
            Copy-Item $src $dst -Force
            Write-Host "Copied: $dst"
        }
    } else {
        Write-Host "NOT FOUND: $src"
    }
}
