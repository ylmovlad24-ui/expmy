import os
import glob

pages_dir = r"C:\Users\Анна\IdeaProjects\expmy\content-extraction\pages"
merged_file = r"C:\Users\Анна\IdeaProjects\expmy\content-extraction\merged\SITE_CONTENT_COMPLETE.md"

# Read all md files
md_files = sorted(glob.glob(os.path.join(pages_dir, "*.md")))

with open(merged_file, "w", encoding="utf-8") as outfile:
    for f in md_files:
        with open(f, "r", encoding="utf-8") as infile:
            content = infile.read()
            outfile.write(content)
            outfile.write("\n")
        print(f"Added: {os.path.basename(f)}")

print(f"\nDone! Total files merged: {len(md_files)}")
