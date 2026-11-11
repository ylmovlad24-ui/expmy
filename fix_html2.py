import subprocess
import sys

# Fix file 1: about/index.html
html_path = r'C:/Users/Vlad/Documents/Ptodjec/expmy/pages/about/index.html'

# Read HTML file as raw bytes
with open(html_path, 'rb') as f:
    html_bytes = f.read()

# Remove BOM if present
if html_bytes[:3] == b'\xef\xbb\xbf':
    html_bytes = html_bytes[3:]

# Decode as cp1251
html_text = html_bytes.decode('cp1251')

# Write back as UTF-8 using subprocess
with open(html_path + '.tmp', 'w', encoding='utf-8') as f:
    f.write(html_text)

# Rename the temp file
import os
os.rename(html_path + '.tmp', html_path)

print(f"File 1 fixed: {len(html_text)} characters written")

# Verify by checking the title
import re
with open(html_path, 'r', encoding='utf-8') as f:
    html_text = f.read()
match = re.search(r'<title>(.*?)</title>', html_text)
if match:
    print(f"Title: {match.group(1)}")
