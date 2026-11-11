$pagesDir = "C:\Users\Анна\IdeaProjects\expmy\content-extraction\pages"
$mergedFile = "C:\Users\Анна\IdeaProjects\expmy\content-extraction\merged\SITE_CONTENT_COMPLETE.md"

$files = Get-ChildItem "$pagesDir\*.md" | Sort-Object Name

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    $content += "`n"
    [System.IO.File]::AppendAllText($mergedFile, $content, [System.Text.Encoding]::UTF8)
    Write-Host ("Added: " + $f.Name)
}

Write-Host "`nDone! Total files merged: " + $files.Count
