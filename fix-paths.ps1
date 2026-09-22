$pagesDir = 'C:\Users\Анна\IdeaProjects\expmy\pages'

Get-ChildItem -Path $pagesDir -Recurse -Filter '*.html' | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    $content = $content -replace '\.\./\.\./assets/', '/assets/'
    $content = $content -replace '\.\./assets/', '/assets/'
    Set-Content $_.FullName $content -Encoding UTF8 -NoNewline
    Write-Host "Fixed: $($_.FullName)"
}

Write-Host "Done!"
