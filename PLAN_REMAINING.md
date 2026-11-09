# Объектив-Эксперт — план оставшихся работ

> GitHub Pages: https://ylmovlad24-ui.github.io/expmy/
> Бренд: Объектив-Эксперт, Барнаул, пер. Прудской 69а, офис 67
> Телефон: +7 (905) 983-09-69 / +79059830969
> Email: info@objektiv-expert.ru

---

## Уже сделано

- [x] Путь components.js исправлен (43 файла): ../assets/... -> ../../assets/...
- [x] Опечатка занизилa -> занизила в header и insurance
- [x] Удалены дублирующие breadcrumbs в dtp и parts
- [x] Страницы ситуаций dtp, insurance, parts, goods: title + Барнаул, таблица форматов, placeholder формы, отзывы выше гарантий, Schema.org FAQPage + BreadcrumbList (+ProfessionalService на insurance)
- [x] services/court/index.html — Schema.org
- [x] services/review/index.html — Schema.org + блок признаков плохой экспертизы
- [x] sitemap.xml (43 URL) и robots.txt

---

## Осталось сделать

### 1. pages/faq/index.html — КРИТИЧНО
- [ ] autoexpert.ru -> https://ylmovlad24-ui.github.io/expmy/ (canonical/og/twitter)
- [ ] АвтоЭксперт -> Объектив-Эксперт
- [ ] +79619962067 -> +79059830969; +7 (961) 996-20-67 -> +7 (905) 983-09-69
- [ ] info@autoexpert.ru -> info@objektiv-expert.ru
- [ ] адрес Schema.org: Москва, ул. Примерная -> Барнаул, пер. Прудской, д. 69а, офис 67
- [ ] areaServed: Москва -> Барнаул
- [ ] исправить страховая занизил payout -> русский текст
- [ ] ссылки ../pages/cases/ -> ../cases/; ../pages/contacts/ -> ../contacts/
- [ ] проверить загрузчик: ../../assets/js/modules/components.js
- [ ] добавить Schema.org FAQPage
- [ ] навигация-табы: ДТП / Страховая / Дилер / Товар / Рецензия
- [ ] мини-CTA после каждого блока FAQ

### 2. components/footer.html
- [ ] битые ссылки /pages/services/automobile/ и /pages/services/tovarovedcheskaya/ -> /services/court/
- [ ] проверить телефон/адрес/домен в футере

### 3. pages/about/index.html
- [ ] удалить JSON-артефакт с текстом section__subtitle

### 4. pages/cases/index.html
- [ ] пути ../pages/contacts/ -> ../contacts/; ../pages/services/... -> ../services/...

### 5. pages/about/experts.html и pages/partners/index.html
- [ ] проверить наполнение; если пустые — наполнить

### 6. index.html (главная)
- [ ] блок-диагностика: какой формат нужен (3 кнопки)
- [ ] floating CTA: звонок + WhatsApp
- [ ] ROI-блок на страницу ДТП (проверить)

### 7. Конверсия
- [ ] floating CTA с WhatsApp на всех страницах
- [ ] sticky mini-bar с цифрами доверия

### 8. SEO/дизайн
- [ ] services/informal/index.html — Schema.org FAQPage (проверить)
- [ ] BreadcrumbList Schema.org на services/* при необходимости
- [ ] title с Барнаул на services/* при необходимости
- [ ] стилизовать блок Какие ответы получите как фрагмент заключения

---

## Порядок
1. pages/faq/index.html
2. components/footer.html + pages/about/index.html + pages/cases/index.html
3. Главная + floating CTA с WhatsApp
4. experts/partners, informal
5. SEO-мелочи и дизайн
