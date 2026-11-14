# КОМПЛЕКСНАЯ ДОКУМЕНТАЦИЯ ПРОЕКТА «ОБЪЕКТИВ-ЭКСПЕРТ» — ЧАСТЬ 5: АКТИВЫ, API, ОШИБКИ, РЕКОМЕНДАЦИИ

---

## 5.1 CSS-АРХИТЕКТУРА

### Структура CSS

```
assets/css/
├── main.css              # Основной файл (v=3)
├── main.min.css          # Минифицированная версия
├── main-optimized.min.css # Оптимизированная версия
├── motion.css            # Анимации и переходы (v=3/4)
├── review.css            # Стили для страниц рецензий
├── review.min.css        # Минифицированная review.css
├── base/                 # Базовые стили
│   ├── (reset, typography, colors, layout)
├── components/           # Стили компонентов
│   ├── uni-steps.css     # Пошаговые шаги (4 шага)
│   ├── header.css        # Стили хедера
│   ├── footer.css        # Стили футера
│   ├── form.css          # Стили форм
│   ├── hero.css          # Стили hero-секций
│   └── ...
├── pages/                # Стили страниц
│   ├── vnesudebnaya.css  # Стили для внесудебной/судебной/рецензия
│   ├── avtotehnicheskaya.css # Стили автотехнической
│   ├── avtotovarovedcheskaya.css # Стили автотовароведческой
│   ├── tovarovedcheskaya-b2b.css # Стили B2B
│   ├── recenziya-main.css # Стили рецензии
│   ├── sudebnaya.css     # Стили судебной
│   └── ...
└── utilities/            # Утилитарные стили (helper classes)
```

### CSS Custom Properties (переменные)
- Цвета: `--primary`, `--secondary`, `--text`, `--text-light`, `--bg`, `--bg-light`
- Отступы: `--spacing-sm`, `--spacing-md`, `--spacing-lg`
- Шрифты: `--font-main` (Inter)
- Breakpoints: `--bp-sm`, `--bp-md`, `--bp-lg`, `--bp-xl`

---

## 5.2 JS-АРХИТЕКТУРА

### Структура JS

```
assets/js/
├── main.js               # Основной файл
├── main.min.js           # Минифицированный
├── lib/                  # Библиотеки
│   └── (подключаются)
└── modules/              # Модули
    └── (функциональность)
```

### Функциональность main.js

| Функция | Описание |
|---------|----------|
| Dynamic SVG favicon | Динамическое изменение favicon |
| FAQ Accordion | Инициализация аккордеона FAQ |
| Tab switching | Переключение табов |
| Calculator init | Инициализация калькуляторов |
| contactForm | Обработка формы контактов |
| calcForm | Обработка формы калькулятора |
| calcFormCompact | Компактная форма калькулятора |
| Smooth scroll | Плавная прокрутка к якорям |
| Header shadow | Тень хедера при скролле |
| Scroll progress bar | Прогресс-бар прокрутки |
| Back to top | Кнопка «Наверх» |

---

## 5.3 ШРИФТЫ

| Начертание | Файлы |
|------------|-------|
| Inter-Regular | Inter-Regular.woff, Inter-Regular.woff2 |
| Inter-Medium | Inter-Medium.woff, Inter-Medium.woff2 |
| Inter-Bold | Inter-Bold.woff, Inter-Bold.woff2 |
| Inter-SemiBold | Inter-SemiBold.woff, Inter-SemiBold.woff2 |

**Подключение:** Google Fonts (Inter:wght@400,500,600,700)

---

## 5.4 ИЗОБРАЖЕНИЯ

| Файл | Назначение |
|------|-----------|
| favicon.svg | SVG favicon |
| favicon.ico | ICO favicon (fallback) |
| assets/og-image-1200x630.jpg | Open Graph image (jpg) |
| assets/og-image-1200x630.svg | Open Graph image (svg) |
| assets/img/og-services.jpg | OG image для services/ |
| assets/img/og-tech.jpg | OG image для автотехнической |
| assets/img/og-tovareved.jpg | OG image для товароведческой |
| assets/img/og-uzlov.jpg | OG image для узлов/агрегатов |
| assets/img/og-avto.jpg | OG image для автотоваров |
| assets/img/og-parts.jpg | OG image для запчастей |
| assets/img/og-cases.jpg | OG image для кейсов |
| assets/img/og-prices.jpg | OG image для цен |
| assets/img/og-faq.jpg | OG image для FAQ |
| assets/img/og-about.jpg | OG image для о компании |
| diploma-bakalavra.jpg | Диплом бакалавра |

---

## 5.5 API

### api/send-form.php
**Назначение:** Обработка отправки форм
**Входные данные:** name, phone, message/document, question, agree
**Метод:** POST

### api/config.php.example
**Назначение:** Шаблон конфигурации API
**Статус:** Пример (не активный конфиг)

---

## 5.6 КОНФИГУРАЦИЯ

### .htaccess
Apache конфигурация (переадресации, MIME-типы, заголовки безопасности)

### robots.txt
Файл для поисковых роботов (разрешение/запрет индексации)

### sitemap.xml
37 URL в sitemap (основные страницы, без дубликатов pages/)

### _redirects
Netlify redirects (переадресации)

### package.json
Node.js зависимости (dev-депенденции для сборки/оптимизации)

### .eslintrc.json
ESLint конфигурация

### .prettierrc
Prettier конфигурация

---

## 5.7 КОНТЕНТ (content-extraction/)

### content-extraction/pages/ (46 Markdown-файлов)

| Файл | Соответствующая страница | Статус |
|------|------------------------|--------|
| root-index.md | index.html | ✅ |
| root-404.md | 404.html | ✅ |
| root-privacy.md | privacy.html | ✅ |
| about.md | o-kompanii/index.html | ✅ |
| about-experts.md | eksperty/index.html | ✅ |
| contacts.md | kontakty/index.html | ✅ |
| faq.md | faq/index.html | ✅ |
| offer.md | oferta/index.html | ✅ |
| partners.md | partners/index.html | ✅ |
| prices.md | ceny/index.html | ✅ |
| cases.md | pages/cases/index.html | ✅ |
| thank-you.md | spasibo/index.html | ✅ |
| legal-court.md | sudebnaya/index.html | ✅ |
| legal-informal.md | vnesudebnaya/index.html | ✅ |
| legal-review.md | recenziya/index.html | ✅ |
| review-index.md | pages/review/ | ✅ |
| review-autotech.md | pages/review/autotech/ | ✅ |
| review-autotrade.md | — | ❌ Нет соответствующей страницы |
| review-cases.md | pages/review/cases/index.html | ✅ |
| review-cases-detail.md | pages/review/cases/detail.html | ✅ |
| review-commodity.md | — | ❌ Нет соответствующей страницы |
| review-dtp.md | pages/review/dtp/ | ✅ |
| review-dtp-conditions.md | pages/review/dtp-conditions/ | ✅ |
| review-technical-condition.md | — | ❌ Нет соответствующей страницы |
| review-trace-diagnostics.md | pages/review/trace-diagnostics/ | ✅ |
| review-units.md | — | ❌ Нет соответствующей страницы |
| services-index.md | pages/services/index.html | ✅ |
| services-automobile.md | — | ❌ Нет соответствующей страницы |
| services-autotech.md | — | ❌ Нет соответствующей страницы |
| services-autotrade.md | — | ❌ Нет соответствующей страницы |
| services-parts.md | — | ❌ Нет соответствующей страницы |
| services-tovarovedcheskaya.md | — | ❌ Нет соответствующей страницы |
| services-tovar-byt-himiya.md | — | ❌ Нет соответствующей страницы |
| services-tovar-dom.md | — | ❌ Нет соответствующей страницы |
| services-tovar-electro.md | — | ❌ Нет соответствующей страницы |
| services-tovar-mashiny.md | — | ❌ Нет соответствующей страницы |
| services-tovar-meditsinskie.md | — | ❌ Нет соответствующей страницы |
| services-tovar-odezda.md | — | ❌ Нет соответствующей страницы |
| services-tovar-parfum.md | — | ❌ Нет соответствующей страницы |
| services-tovar-sport.md | — | ❌ Нет соответствующей страницы |
| services-tovar-stroitelnye.md | — | ❌ Нет соответствующей страницы |
| services-tovar-transport.md | — | ❌ Нет соответствующей страницы |
| situations-dtp.md | situations/dtp/ | ✅ |
| situations-goods.md | situations/goods/ | ✅ |
| situations-insurance.md | situations/insurance/ | ✅ |
| situations-parts.md | situations/parts/ | ✅ |

**Итого:** 31 из 46 markdown-файлов соответствуют существующим страницам
**Остальные 15:** Не используются / устаревшие / для будущих страниц

---

## 5.8 КРИТИЧЕСКИЕ ОШИБКИ

### 5.8.1 Mojibake (битая кодировка в JSON-LD)

| Файл | Проблема |
|------|----------|
| `404.html` | JSON-LD: `"РћР±СЉРµРєС‚РёРІ-Р­РєСЃРїРµСЂС‚"` вместо «Объектив-Эксперт» |
| `privacy.html` | JSON-LD: `"РћР±СЉРµРєС‚РёРІ-Р­РєСЃРїРµСЂС‚"` вместо «Объектив-Эксперт» |
| `avtotehnicheskaya/obstoyatelstva-dtp/` | JSON-LD: `"РћР±СЉРµРєС‚РёРІ-Р­РєСЃРїРµСЂС‚"` вместо «Объектив-Эксперт» |

**Причина:** JSON-LD записан в UTF-8, но браузер читает как Windows-1251
**Решение:** Перекодировать JSON-LD в UTF-8

### 5.8.2 Ошибки в Schema.org (неверный адрес)

| URL | Ожидаемый адрес | Фактический адрес |
|-----|----------------|-------------------|
| `/pages/services/avtotexnicheskaya-ekspertiza/` | Барнаул | Чебоксары |
| `/pages/services/avto-tovarisvedcheskaya-ekspertiza/` | Барнаул | Чебоксары |
| `/pages/services/ekspertiza-uzlov-i-agregatov/` | Барнаул | Владивосток |

### 5.8.3 Неестественные Title

| URL | Title | Проблема |
|-----|-------|----------|
| `/pages/services/avtotexnicheskaya-ekspertiza/` | «Автотехническая экспертиза в суде в 13.1, 13.2, 13.3» | Неестественный, keyword-stuffing |
| `/pages/services/avto-tovarisvedcheskaya-ekspertiza/` | «Товароведческая экспертиза в Чебоксарах, Казани, Москве, Нижнем, Йошкар-Оле» | Перечисление городов, неестественный |

---

## 5.9 РЕКОМЕНДАЦИИ

### Критические (P0)
1. **Исправить mojibake** в JSON-LD на 404.html, privacy.html, obstoyatelstva-dtp/
2. **Исправить адрес** в Schema.org на pages/services/*/
3. **Установить canonical** на основные страницы для всех дубликатов (pages/about/, pages/contacts/, pages/faq/, pages/prices/, pages/offer/, pages/partners/, pages/thank-you/, cases/, keysy/)
4. **301 Redirect** для всех дубликатов на основные страницы

### Высокий приоритет (P1)
5. **Добавить breadcrumbs** на все service sub-pages и B2B pages
6. **Уменьшить длину Title** на /situations/dtp/ (74 символа) — обрезать до ~65
7. **Удалить устаревший контент** pages/services/ (3 страницы с неверными данными)
8. **Удалить неиспользуемые markdown-файлы** (15 файлов из content-extraction/)

### Средний приоритет (P2)
9. **Добавить OG image** для каждой страницы (сейчас используется один og-image-1200x630.jpg)
10. **Добавить карту** (Яндекс/Google) на kontakty/ и spaсibo/
11. **Добавить карту** на o-kompanii/
12. **Унифицировать часы работы** (Пн–Пт 9:00–17:00 vs 9:00–18:00, Сб 10:00–15:00)
13. **Добавить микроразметку** AggregateRating на все страницы (сейчас только на некоторых)

### Низкий приоритет (P3)
14. **Оптимизировать изображения** (сжать JPG, добавить WebP)
15. **Добавить lazy-loading** для всех изображений
16. **Добавить preload** для шрифтов и критического CSS
17. **Создать XML sitemap** с актуальными URL
18. **Настроить 404** для перенаправления на главную или популярные страницы

---

## 5.10 ИТОГОВАЯ СТАТИСТИКА

| Метрика | Значение |
|---------|----------|
| Всего HTML-страниц | ~78 |
| Уникальных URL (sitemap) | 37 |
| Дубликатов страниц | 10 пар |
| Markdown-контент | 46 (31 используется, 15 устарело) |
| API-эндпоинты | 1 |
| CSS-файлов | ~20 |
| JS-файлов | ~5 |
| Шрифтов | 8 (4 начертания × 2 формата) |
| Изображений OG | 12 |
| Критических ошибок | 3 (mojibake) + 3 (Schema.org) |
| CTA-элементов | ~30 форм/кнопок |
| FAQ-вопросов | ~50 (на всех страницах) |

---

## 5.11 ЧЕК-ЛИСТ ДЛЯ РАЗРАБОТКИ

### Перед деплоем проверить:
- [ ] Кодировка UTF-8 для всех файлов
- [ ] JSON-LD без mojibake
- [ ] Canonical URL на каждой странице
- [ ] Title длина ≤ 70 символов
- [ ] Meta description 120-160 символов
- [ ] OG image для каждой страницы
- [ ] Schema.org с правильным адресом (Барнаул)
- [ ] Breadcrumbs на всех вложенных страницах
- [ ] Alt-теги на всех изображениях
- [ ] Favicon (SVG + ICO)
- [ ] robots.txt разрешает индексацию
- [ ] sitemap.xml актуален
- [ ] Формы отправляются на api/send-form.php
- [ ] HTTPS работает корректно
- [ ] Мобильная версия адаптивна
- [ ] PageSpeed > 80

---

**Конец документации.**
