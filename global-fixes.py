import os
import re

# Корневая директория проекта
ROOT = r"C:\Users\Анна\IdeaProjects\expmy"

# Файлы для обработки (все HTML)
def get_html_files():
    html_files = []
    for root, dirs, files in os.walk(ROOT):
        # Пропускаем content-extraction и node_modules
        if 'content-extraction' in root or 'node_modules' in root:
            continue
        for f in files:
            if f.endswith('.html'):
                html_files.append(os.path.join(root, f))
    return html_files

# Замены: (pattern, replacement)
replacements = [
    # 1. Бренд
    ("Рецензент.рус", "Объектив-Эксперт"),
    ("рецензент.рус", "objektiv-expert.ru"),
    ("info@рецензент.рус", "info@objektiv-expert.ru"),
    
    # 2. Телефоны
    ("+7 960 998-77-88", "+7 (905) 983-09-69"),
    ("+79609987788", "+79059830969"),
    
    # 3. Цифры
    ("500+", "1 200+"),
    ("×35", "×10"),
    ("×116", "×10"),
    ("×17", "×10"),
    ("×28", "×10"),
    ("420 000 ₽", "340 000 ₽"),
    ("420,000", "340,000"),
    
    # 4. "10 лет на рынке" — удалить
    # 5. "15+ лет опыта" — удалить (только про компанию, не про конкретного эксперта)
    
    # 6. Опечатки
    ("занизжению", "занижению"),
    ("занизилa", "занизила"),  # латинская 'a'
    ("занизжение", "занижение"),
    ("Энергопакет страховой", "Страховая считает ремонт по своим прайсам"),
    
    # 7. CTA
    ("Запросить консультацию", "Получить ответ за 15 минут"),
    ("Узнать, сколько можете получить", "Получить ответ за 15 минут"),
    
    # 8. Время ответа
    ("в течение 2 часов", "в течение 15 минут"),
    ("2 часа", "15 минут"),
    
    # 9. Адрес
    ("г. Москва, ул. Примерная, д. 1, офис 100", "г. Барнаул, пер. Прудской, 69а, офис 67"),
    ("г. Москва", "г. Барнаул"),
]

# Специальные замены (нужна логика)
def special_replacements(content):
    # Удалить "10 лет на рынке"
    content = re.sub(r'10 лет на рынке', '', content)
    
    # Удалить "15+ лет опыта" (только если не про конкретного эксперта)
    # Это сложнее — нужно оставить для карточек экспертов
    # Пока пропустим
    
    # Удалить пустые строки после удаления текста
    content = re.sub(r'\n{4,}', '\n\n\n', content)
    
    return content

# Обработка
html_files = get_html_files()
modified_count = 0

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Применяем замены
    for pattern, replacement in replacements:
        content = content.replace(pattern, replacement)
    
    # Специальные замены
    content = special_replacements(content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        modified_count += 1
        print(f"Modified: {os.path.relpath(filepath, ROOT)}")

print(f"\nTotal modified: {modified_count} files")
