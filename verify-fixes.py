import os
import re

ROOT = r"C:\Users\Анна\IdeaProjects\expmy"

def check_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    issues = []
    
    # 1. Проверка бренда
    if 'Рецензент.рус' in content:
        issues.append('Found: Рецензент.рус')
    
    # 2. Проверка телефонов
    if '+7 960 998-77-88' in content:
        issues.append('Found: +7 960 998-77-88')
    if '+79609987788' in content:
        issues.append('Found: +79609987788')
    
    # 3. Проверка цифр
    if '500+' in content and '1 200+' not in content:
        issues.append('Found: 500+ (должно быть 1 200+)')
    if '×35' in content:
        issues.append('Found: ×35 (должно быть ×10)')
    if '×116' in content:
        issues.append('Found: ×116 (должно быть ×10)')
    if '×17' in content:
        issues.append('Found: ×17 (должно быть ×10)')
    if '×28' in content:
        issues.append('Found: ×28 (должно быть ×10)')
    
    # 4. Проверка "10 лет на рынке"
    if '10 лет на рынке' in content:
        issues.append('Found: 10 лет на рынке (должно быть удалено)')
    
    # 5. Проверка опечаток
    if 'занизжению' in content:
        issues.append('Found: занизжению (должно быть занижению)')
    if 'занизжение' in content:
        issues.append('Found: занизжение (должно быть занижение)')
    
    return issues

# Проверяем все HTML файлы
html_files = []
for root, dirs, files in os.walk(ROOT):
    if 'content-extraction' in root or 'node_modules' in root:
        continue
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

total_issues = 0
files_with_issues = 0

for filepath in html_files:
    issues = check_file(filepath)
    if issues:
        files_with_issues += 1
        total_issues += len(issues)
        rel_path = os.path.relpath(filepath, ROOT)
        print(f"\n{rel_path}:")
        for issue in issues:
            print(f"  - {issue}")

print(f"\n{'='*60}")
print(f"ИТОГО: {len(html_files)} файлов проверено")
print(f"Файлов с проблемами: {files_with_issues}")
print(f"Общее количество проблем: {total_issues}")

if total_issues == 0:
    print("\n✅ Все проверки пройдены успешно!")
else:
    print(f"\n⚠️ Найдено {total_issues} проблем, требующих исправления.")
