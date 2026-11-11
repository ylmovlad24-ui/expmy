# Read the original file (before any modifications)
# First, let's restore the original file from the content-extraction folder
$originalPath = 'C:/Users/Vlad/Documents/Ptodjec/expmy/content-extraction/pages/about/index.html'
$targetPath = 'C:/Users/Vlad/Documents/Ptodjec/expmy/pages/about/index.html'

# Check if original exists
if (Test-Path $originalPath) {
    Write-Host "Original file found at: $originalPath"
    $origBytes = [System.IO.File]::ReadAllBytes($originalPath)
    Write-Host "Original file size: $($origBytes.Length)"
    Write-Host "First 10 bytes: $($origBytes[0..9] -join ' ')"
} else {
    Write-Host "Original file NOT found at: $originalPath"
}

# Check target file
$targetBytes = [System.IO.File]::ReadAllBytes($targetPath)
Write-Host "`nTarget file size: $($targetBytes.Length)"
Write-Host "First 10 bytes: $($targetBytes[0..9] -join ' ')"
