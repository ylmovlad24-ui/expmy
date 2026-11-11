import re

merged_file = r"C:\Users\Анна\IdeaProjects\expmy\content-extraction\merged\SITE_CONTENT_COMPLETE.md"

with open(merged_file, "r", encoding="utf-8") as f:
    content = f.read()

# Check for HTML tags
html_tags = re.findall(r'<[a-z][^>]*>', content, re.IGNORECASE)
print(f"HTML tags found: {len(html_tags)}")
if html_tags:
    print(f"Sample: {html_tags[:5]}")

# Count headings
headings = re.findall(r'^#{1,6}\s', content, re.MULTILINE)
print(f"Headings found: {len(headings)}")

# Count pages (Source markers)
sources = re.findall(r'^---\s*Source:', content, re.MULTILINE)
print(f"Pages (Source markers): {len(sources)}")

# Get first 500 chars
print(f"\nFirst 500 chars:\n{content[:500]}")
