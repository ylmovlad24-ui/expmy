import sys

# Fix file 1: about/index.html
html_path = r'C:/Users/Vlad/Documents/Ptodjec/expmy/pages/about/index.html'
md_path = r'C:/Users/Vlad/Documents/Ptodjec/expmy/content-extraction/pages/about.md'

# Read HTML file as raw bytes
with open(html_path, 'rb') as f:
    html_bytes = f.read()

# The file has UTF-8 BOM (EF BB BF) at the start
# The Russian text is cp1251 bytes that were saved as UTF-8
# To fix: decode the cp1251 bytes

# Remove BOM if present
if html_bytes[:3] == b'\xef\xbb\xbf':
    html_bytes = html_bytes[3:]

# Decode as cp1251
html_text = html_bytes.decode('cp1251')

# Write back as UTF-8
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html_text)

print(f"File 1 fixed: {len(html_text)} characters written")

# Verify by checking the title
import re
match = re.search(r'<title>(.*?)</title>', html_text)
if match:
    print(f"Title: {match.group(1)}")
