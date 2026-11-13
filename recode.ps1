Set-Location "C:\Users\Анна\IdeaProjects\expmy"

$files = @(
    "avtotehnicheskaya\index.html",
    "avtotovarovedcheskaya\index.html",
    "tovarovedcheskaya-b2b\index.html"
)

foreach ($file in $files) {
    $fullPath = Join-Path $PWD $file
    if (Test-Path $fullPath) {
        $content = [System.IO.File]::ReadAllText($fullPath, [System.Text.Encoding]::GetEncoding(1251))
        [System.IO.File]::WriteAllText($fullPath, $content, [System.Text.Encoding]::UTF8)
        Write-Host "OK: $file"
    } else {
        Write-Host "NOT FOUND: $file"
    }
}
