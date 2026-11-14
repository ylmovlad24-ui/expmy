# КОМПЛЕКСНАЯ ДОКУМЕНТАЦИЯ ПРОЕКТА «ОБЪЕКТИВ-ЭКСПЕРТ»
**Домен:** objektiv-expert.ru | **Город:** Барнаул | **Дата:** 2026-11-14

---

## ЧАСТЬ 1: ВВЕДЕНИЕ, АРХИТЕКТУРА, КОМПОНЕНТЫ, НАВИГАЦИЯ

---

### 1.1 ВВЕДЕНИЕ

**Проект:** Сайт центра независимых экспертиз «Объектив-Эксперт»
**Домен:** objektiv-expert.ru
**Город:** Барнаул
**Контакт:** +7 (905) 983-09-69 | info@objektiv-expert.ru
**Адрес:** г. Барнаул, пер. Прудской, д. 69а, оф. 67
**Часы работы:** Пн–Пт 9:00–17:00 (некоторые страницы: Пн–Пт 9:00–18:00, Сб 10:00–15:00)
**Юр. лицо:** ИП Шмеер Владислав Александрович
**ИНН:** 222263914729 | **ОГРН:** 322220200101922
**Рейтинг:** 4.9 (127 отзывов)

**Направление деятельности:**
- Автотехническая экспертиза (ДТП, техническое состояние ТС, следы, дорога)
- Автотовароведческая экспертиза (ОСАГО, вне рамок ОСАГО)
- Экспертиза узлов и агрегатов (двигатель, КПП, гидравлика, электроника)
- Товароведческая B2B экспертиза (транспорт, стройтовары, оборудование)
- Судебная экспертиза
- Внесудебная экспертиза
- Рецензия на чужое заключение

**Правовая база:** ФЗ-73, ГПК РФ, АПК РФ, УК РФ, ЗоЗПП, Методика Минюста, Методика ЦБ РФ, ГОСТ Р 8.563-96, ОТ ЭКСП 01-2015, ОТ ЭКСП 02-2015

---

### 1.2 АРХИТЕКТУРА ПРОЕКТА

```
expmy/
├── index.html                    # Главная страница
├── 404.html                      # Страница ошибки
├── privacy.html                  # Политика конфиденциальности (корневая)
├── sitemap.xml                   # Карта сайта
├── robots.txt                    # Файл для поисковых роботов
├── _redirects                    # Redirects (Netlify)
├── .htaccess                     # Apache конфигурация
├── favicon.svg                   # Favicon
├── api/
│   ├── send-form.php             # Обработка форм
│   └── config.php.example        # Конфигурация API (шаблон)
├── components/
│   ├── header.html               # Шапка (динамически подгружается)
│   ├── footer.html               # Подвал (динамически подгружается)
│   └── form.html                 # Форма заявки (динамически подгружается)
├── assets/
│   ├── css/
│   │   ├── main.css              # Основной CSS (v=3)
│   │   ├── main.min.css          # Минифицированный
│   │   ├── main-optimized.min.css # Оптимизированный
│   │   ├── motion.css            # Анимации (v=3/4)
│   │   ├── review.css            # Стили рецензий
│   │   ├── base/                 # Базовые стили
│   │   ├── components/           # Стили компонентов (uni-steps.css и др.)
│   │   ├── pages/                # Стили страниц
│   │   └── utilities/            # Утилитарные стили
│   ├── js/
│   │   ├── main.js               # Основной JS
│   │   ├── main.min.js           # Минифицированный
│   │   ├── lib/                  # Библиотеки
│   │   └── modules/              # Модули JS
│   ├── fonts/                    # Шрифты Inter (Bold, Medium, Regular, SemiBold)
│   └── og-image-1200x630.jpg     # OG image
├── avtotehnicheskaya/            # Автотехническая экспертиза (5 стр.)
├── avtotovarovedcheskaya/        # Автотовароведческая экспертиза (3 стр.)
├── uzly-i-agregaty/              # Узлы и агрегаты (1 стр.)
├── tovarovedcheskaya-b2b/        # Товароведческая B2B (4 стр.)
├── sudebnaya/                    # Судебная экспертиза (1 стр.)
├── vnesudebnaya/                 # Внесудебная экспертиза (1 стр.)
├── recenziya/                    # Рецензия (1 стр.)
├── recenzii-dlya-yuristov/       # B2B: Рецензии для юристов (1 стр.)
├── dosudebnye-dlya-yurfirmy/     # B2B: Досудебные для юрфирм (1 стр.)
├── situations/                   # Ситуации (7 стр.)
├── o-kompanii/                   # О компании (1 стр.)
├── eksperty/                     # Эксперты (1 стр.)
├── diplomы/                      # Дипломы (1 стр.)
├── kontakty/                     # Контакты (1 стр.)
├── faq/                          # FAQ (1 стр.)
├── ceny/                         # Цены (1 стр.)
├── partners/                     # Партнёрам (1 стр.)
├── keysy/                        # Кейсы (1 стр.)
├── spasibo/                      # Страница благодарности (1 стр.)
├── oferta/                       # Оферта (1 стр.)
├── politika/                     # Политика конфиденциальности (1 стр.)
├── pages/                        # Внутренние страницы (дубликаты, 14 стр.)
│   ├── about/
│   ├── cases/
│   ├── contacts/
│   ├── faq/
│   ├── offer/
│   ├── partners/
│   ├── prices/
│   ├── services/
│   ├── review/
│   └── thank-you/
├── content-extraction/           # Markdown-контент для генерации (46 файлов)
├── docs/                         # Документация проекта
└── [скрипты, конфиги]            # .gitignore, package.json, eslint, prettier и др.
```

**Технологический стек:**
- **Frontend:** Чистый HTML5 + CSS3 + Vanilla JavaScript
- **CSS:** Modular CSS (base/components/pages/utilities), CSS custom properties, responsive design
- **JS:** Modular architecture, dynamic component loading, form handlers, FAQ accordion, scroll animations
- **Server:** Apache (.htaccess), PHP (API)
- **Deployment:** Netlify (_redirects), возможно Vercel
- **Шрифты:** Google Fonts (Inter)
- **Schema.org:** JSON-LD (ProfessionalService, FAQPage, BreadcrumbList, AggregateRating)

---

### 1.3 КОМПОНЕНТЫ

#### 1.3.1 Header (components/header.html)

**Назначение:** Глобальная навигация, динамически подгружается на все страницы через `#header-container`

**Структура:**
```
<header class="header">
  ├── Logo: "Объектив-Эксперт" → /
  ├── Desktop Navigation:
  │   ├── Главная → /
  │   ├── Экспертизы (dropdown):
  │   │   ├── Виды экспертиз:
  │   │   │   ├── Автотехническая → /avtotehnicheskaya/
  │   │   │   ├── Автотовароведческая → /avtotovarovedcheskaya/
  │   │   │   ├── Узлы и агрегаты → /uzly-i-agregaty/
  │   │   │   └── Товароведческая B2B → /tovarovedcheskaya-b2b/
  │   │   ├── Автотехническая:
  │   │   │   ├── Обстоятельства ДТП → /avtotehnicheskaya/obstoyatelstva-dtp/
  │   │   │   ├── Техническое состояние ТС → /avtotehnicheskaya/tekhnicheskoe-sostoyanie/
  │   │   │   ├── Следы на ТС → /avtotehnicheskaya/sledy/
  │   │   │   └── Техническое состояние дороги → /avtotehnicheskaya/doroga/
  │   │   ├── Автотовароведческая:
  │   │   │   ├── В рамках ОСАГО → /avtotovarovedcheskaya/osago/
  │   │   │   └── Вне рамок ОСАГО → /avtotovarovedcheskaya/vne-ramki/
  │   │   ├── Товароведческая B2B:
  │   │   │   ├── Транспортные средства → /tovarovedcheskaya-b2b/transport/
  │   │   │   ├── Строительные товары → /tovarovedcheskaya-b2b/construction/
  │   │   │   └── Машины и оборудование → /tovarovedcheskaya-b2b/equipment/
  │   │   ├── Форматы экспертиз:
  │   │   │   ├── Судебная → /sudebnaya/
  │   │   │   ├── Внесудебная → /vnesudebnaya/
  │   │   │   └── Рецензия → /recenziya/
  │   │   └── Ситуации:
  │   │       ├── ДТП → /situations/dtp/
  │   │       ├── ОСАГО → /situations/osago/
  │   │       ├── Дефект → /situations/defekt/
  │   │       └── Поставка → /situations/postavka/
  │   ├── B2B (dropdown):
  │   │   ├── Рецензия для юристов → /recenzii-dlya-yuristov/
  │   │   ├── Досудебные для ЮР → /dosudebnye-dlya-yurfirmy/
  │   │   └── Партнёрам → /partners/
  │   ├── Цены → /ceny/
  │   ├── Кейсы → /keysy/
  │   ├── О компании → /o-kompanii/
  │   ├── Контакты → /kontakty/
  │   └── Телефон: +7 (905) 983-09-69
  ├── Burger Button (mobile/tablet)
  ├── Mobile Menu Overlay
  └── Mobile Menu Panel (с accordion-подменю)
```

**Mobile/Tablet:**
- Burger-меню с overlay
- Accordion-подменю для каждой группы
- Дублирование всей навигации

**Accessibility:**
- aria-expanded, aria-haspopup, aria-controls
- role="navigation", role="menu", role="menuitem"
- skip-link «Перейти к содержимому»

#### 1.3.2 Footer (components/footer.html)

**Структура:**
```
<footer class="footer">
  ├── Accent line (декоративная)
  ├── Main Section:
  │   ├── Brand:
  │   │   ├── Logo: "Объектив-Эксперт" → /
  │   │   ├── Tagline: "Кабинет технических экспертиз"
  │   │   ├── Messengers: WhatsApp, Telegram
  │   │   └── CTA: «Получить консультацию» → /kontakty/
  │   ├── Contacts:
  │   │   ├── Телефон: +7 (905) 983-09-69
  │   │   ├── Email: info@objektiv-expert.ru
  │   │   ├── Адрес: г. Барнаул, пер. Прудской, д. 69а, оф. 67
  │   │   └── Часы: Пн–Пт 9:00–17:00
  │   ├── Navigation:
  │   │   ├── Экспертизы (4 ссылки)
  │   │   ├── Форматы (3 ссылки)
  │   │   ├── Компания (5 ссылок)
  │   │   └── Документы (3 ссылки)
  │   └── Stats:
  │       ├── 200+ завершённых экспертиз
  │       ├── 10+ лет опыта
  │       └── 98% положительных отзывов
  ├── Bottom:
  │   ├── © 2026 Объектив-Эксперт
  │   ├── ИНН 222263914729 · ОГРН 322220200101922
  │   └── Политика конфиденциальности → /politika/
```

#### 1.3.3 Form (components/form.html)

**Структура:**
```
<section class="request-form" id="form-root">
  <h2>Оставить заявку</h2>
  <form class="form" action="#" method="POST" novalidate>
    ├── name (text, required) — "Ваше имя *"
    ├── phone (text, required) — "Телефон *"
    ├── message (textarea) — "Опишите вашу ситуацию"
    ├── agree (checkbox, required) — "Я согласен на обработку персональных данных *"
    └── submit — "Отправить заявку"
  </form>
</section>
```

**Варианты форм на страницах:**
- **Стандартная:** name, phone, message, agree
- **Контакты (kontakty/):** name, phone, document, question, agree
- **Цены (ceny/):** name, phone, document, question, agree
- **Thank-you (pages/thank-you/):** Нет формы, только сообщение

#### 1.3.4 JavaScript (assets/js/main.js)

**Функциональность:**
1. **Dynamic SVG favicon** — динамическое изменение favicon
2. **FAQ Accordion** — инициализация аккордеона FAQ
3. **Tab switching** — переключение табов
4. **Calculator initialization** — инициализация калькуляторов
5. **Form handlers:**
   - `contactForm` — обработка формы контактов
   - `calcForm` — обработка формы калькулятора
   - `calcFormCompact` — компактная форма калькулятора
6. **Smooth scroll & header shadow** — плавная прокрутка, тень хедера при скролле
7. **Scroll progress bar** — прогресс-бар прокрутки
8. **Back to top button** — кнопка «Наверх»

**Динамическая загрузка компонентов:**
- `#header-container` — header загружается динамически
- `#footer-container` — footer загружается динамически
- `#form-root` — форма загружается динамически

---

### 1.4 НАВИГАЦИЯ

#### 1.4.1 Desktop Navigation

```
Главная | Экспертизы ▼ | B2B ▼ | Цены | Кейсы | О компании | Контакты | 📞 +7 (905) 983-09-69

Экспертизы ▼
├── Виды экспертиз
│   ├── Автотехническая
│   ├── Автотовароведческая
│   ├── Узлы и агрегаты
│   └── Товароведческая B2B
├── Автотехническая
│   ├── Обстоятельства ДТП
│   ├── Техническое состояние ТС
│   ├── Следы на ТС и месте ДТП
│   └── Техническое состояние дороги
├── Автотовароведческая
│   ├── В рамках ОСАГО
│   └── Вне рамок ОСАГО
├── Товароведческая B2B
│   ├── Транспортные средства
│   ├── Строительные товары
│   └── Машины и оборудование
├── Форматы экспертиз
│   ├── Судебная
│   ├── Внесудебная
│   └── Рецензия
└── Ситуации
    ├── ДТП
    ├── ОСАГО
    ├── Дефект
    └── Поставка

B2B ▼
├── Рецензия для юристов
├── Досудебные для ЮР
└── Партнёрам
```

#### 1.4.2 Footer Navigation

```
Экспертизы          Форматы         Компания          Документы
Автотехническая     Судебная        О компании        Политика конфиденциальности
Автотовароведческая Внесудебная     Эксперты          Оферта
Узлы и агрегаты     Рецензия        Цены              Реестр экспертов
Товароведческая B2B                 FAQ
                    Контакты
```

---

### 1.5 СТАТИСТИКА

| Метрика | Значение |
|---------|----------|
| Всего HTML-страниц | ~78 |
| Уникальных URL (sitemap) | 37 |
| Markdown-контент | 46 |
| API-эндпоинты | 1 |
| Компоненты | 3 |
| CSS-файлов | ~20 |
| JS-файлов | ~5 |
| Шрифтов | 8 (4 начертания × 2 формата) |
| Дубликатов страниц | 10 пар |

---

*Продолжение следует...*
