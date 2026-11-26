# Архитектура сайта Объектив-Эксперт

## 📁 Структура проекта

```
expmy/
├── index.html                    # Главная страница
├── 404.html                      # Страница ошибки
├── privacy.html                  # Политика конфиденциальности
├── robots.txt                    # robots.txt
├── sitemap.xml                   # Карта сайта
├── favicon.svg                   # Фавикон
├── .htaccess                     # Apache конфигурация
├── package.json                  # Зависимости
│
├── assets/                       # ВСЕ ресурсы сайта
│   ├── css/                      # Каскадные таблицы стилей
│   │   ├── main.css              # Точка входа (объединяет все стили)
│   │   ├── main.min.css          # Минифицированная версия
│   │   ├── motion.css            # GSAP-анимации
│   │   ├── motion.min.css        # Минифицированная версия
│   │   │
│   │   ├── base/                 # Базовые стили
│   │   │   ├── variables.css     # CSS-переменные (цвета, отступы, шрифты)
│   │   │   ├── reset.css         # Сброс стилей браузера
│   │   │   ├── layout.css        # Container, section, grid
│   │   │   └── responsive.css    # Breakpoints
│   │   │
│   │   ├── components/           # UI-компоненты
│   │   │   ├── header.css        # Шапка сайта
│   │   │   ├── footer.css        # Подвал сайта
│   │   │   ├── hero.css          # Hero-секция
│   │   │   ├── sections.css      # Общие секции
│   │   │   ├── buttons.css       # Кнопки
│   │   │   ├── cards.css         # Карточки
│   │   │   ├── forms.css         # Формы
│   │   │   ├── tables.css        # Таблицы
│   │   │   ├── steps.css         # Шаги процесса
│   │   │   ├── calculator.css    # Калькулятор
│   │   │   ├── calculator-compact.css
│   │   │   ├── sticky-cta.css    # Липкая кнопка
│   │   │   ├── reviews.css       # Отзывы
│   │   │   ├── guarantees.css    # Гарантии
│   │   │   ├── faq.css           # FAQ аккордеон
│   │   │   ├── contacts.css      # Контакты
│   │   │   ├── tabs.css          # Табы
│   │   │   ├── cta-about.css     # CTA для about
│   │   │   ├── pricing.css       # Цены
│   │   │   ├── animations.css    # Анимации
│   │   │   ├── services-cards.css
│   │   │   ├── case-card.css     # Карточки кейсов
│   │   │   └── hero-extended.css # Расширенный hero
│   │   │
│   │   ├── pages/                # Стили для конкретных страниц
│   │   │   ├── about.css
│   │   │   └── index.css
│   │   │
│   │   └── utilities/            # Утилитарные классы
│   │       └── utilities.css
│   │
│   ├── js/                       # JavaScript
│   │   ├── main.js               # Основной файл
│   │   ├── lib/
│   │   │   └── utils.js          # Утилиты (debounce, throttle)
│   │   ├── modules/              # Модули
│   │   │   ├── burger.js         # Бургер-меню
│   │   │   ├── calculator.js     # Калькулятор стоимости
│   │   │   ├── components-loader.js  # Загрузка header/footer
│   │   │   ├── faq.js            # FAQ аккордеон
│   │   │   ├── smooth-scroll.js  # Плавная прокрутка
│   │   │   ├── tabs.js           # Табы
│   │   │   ├── scroll-animations.js  # Анимации при скролле
│   │   │   ├── motion-injector.js    # GSAP-анимации
│   │   │   ├── motion.js         # Motion-дизайн
│   │   │   ├── 3d-cards.js       # 3D-карточки
│   │   │   ├── marquee.js        # Бегущая строка
│   │   │   ├── clip-reveals.js   # Clip-reveal анимации
│   │   │   ├── page-transitions.js   # Переходы страниц
│   │   │   ├── scroll-velocity.js    # Scroll velocity
│   │   │   ├── lenis-scroll.js       # Smooth scroll (Lenis)
│   │   │   ├── webgl-gradient.js     # WebGL градиенты
│   │   │   ├── custom-cursor.js      # Кастомный курсор
│   │   │   ├── animated-icons.js     # Анимированные иконки
│   │   │   ├── form-micro-interactions.js  # Микро-взаимодействия
│   │   │   ├── section-spotlight.js  # Spotlight секций
│   │   │   ├── section-transitions.js # Переходы секций
│   │   │   ├── header.js           # Логика header
│   │   │   ├── diplomas.js         # Анимация дипломов
│   │   │   ├── review-motion.js    # Motion для review
│   │   │   ├── card-glare.js       # Glare-эффект карточек
│   │   │   ├── gsap-loader.js      # Загрузчик GSAP
│   │   │   └── components.js       # Общие компоненты
│   │   └── *.min.js              # Минифицированные копии (в корне)
│   │
│   ├── fonts/                    # Шрифты Inter
│   │   ├── Inter-Regular.woff(.2)
│   │   ├── Inter-Medium.woff(.2)
│   │   ├── Inter-Bold.woff(.2)
│   │   └── Inter-SemiBold.woff(.2)
│   │
│   └── og-image-1200x630.jpg     # Open Graph изображение
│
├── components/                   # HTML-компоненты для inclusion
│   ├── header.html               # Шапка сайта
│   └── footer.html               # Подвал сайта
│
├── content-extraction/           # Извлечённый контент (Markdown)
│   ├── merged/                   # Слитый контент
│   │   ├── SITE_CONTENT_COMPLETE.md
│   │   └── SITE_CONTENT_REVISED.md
│   └── pages/                    # Контент по страницам
│       ├── root-index.md
│       ├── about.md
│       ├── about-experts.md
│       ├── cases.md
│       ├── contacts.md
│       ├── faq.md
│       ├── offer.md
│       ├── partners.md
│       ├── prices.md
│       ├── root-404.md
│       ├── root-privacy.md
│       ├── thank-you.md
│       ├── services-*.md
│       ├── review-*.md
│       ├── legal-*.md
│       ├── situations-*.md
│       └── services-tovar-*.md
│
├── docs/                         # Документация
│   └── INTEGRATION_COMPLETE.md
│
├── api/                          # API-эндпоинты
│
└── [директории страниц]          # Каждая страница — отдельная папка
    ├── avtotehnicheskaya/
    ├── avtotovarovedcheskaya/
    ├── uzly-i-agregaty/
    ├── tovarovedcheskaya-b2b/
    ├── sudebnaya/
    ├── vnesudebnaya/
    ├── recenziya/
    ├── recenzii-dlya-yuristov/
    ├── dosudebnye-dlya-yurfirmy/
    ├── yuristam/
    ├── o-kompanii/
    ├── eksperty/
    ├── partners/
    ├── faq/
    ├── ceny/
    ├── kontakty/
    ├── oferta/
    ├── politika/
    ├── spasibo/
    ├── diplomy/
    ├── keysy/
    └── ...
```

---

## 🌐 Карта страниц сайта

### АвтоЭксперт (основной бренд)

| Страница | URL | Описание |
|----------|-----|----------|
| **Главная** | `/` | Витрина услуг, эксперты, FAQ, контакты |
| **Автотехническая** | `/avtotehnicheskaya/` | ДТП, обстоятельства, следы, техсостояние |
| ├── Дорога | `/avtotehnicheskaya/doroga/` | |
| ├── Обстоятельства ДТП | `/avtotehnicheskaya/obstoyatelstva-dtp/` | |
| ├── Следы | `/avtotehnicheskaya/sledy/` | |
| └── Техсостояние | `/avtotehnicheskaya/tekhnicheskoe-sostoyanie/` | |
| **Автотовароведческая** | `/avtotovarovedcheskaya/` | ОСАГО, вне рамки |
| ├── ОСАГО | `/avtotovarovedcheskaya/osago/` | |
| └── Вне рамки | `/avtotovarovedcheskaya/vne-ramki/` | |
| **Узлы и агрегаты** | `/uzly-i-agregaty/` | ДВС, АКПП, кузов, тормозная |
| **Товароведческая B2B** | `/tovarovedcheskaya-b2b/` | Экспертиза для бизнеса |
| **О компании** | `/o-kompanii/` | История, миссия |
| **Эксперты** | `/eksperty/` | Команда |
| **Партнёры** | `/partners/` | Партнёрство |
| **Кейсы** | `/keysy/` | Примеры дел |
| **Дипломы** | `/diplomy/` | Сертификаты |
| **FAQ** | `/faq/` | Частые вопросы |
| **Цены** | `/ceny/` | Прайс-лист |
| **Контакты** | `/kontakty/` | Телефон, email, адрес |
| **Спасибо** | `/spasibo/` | Подтверждение формы |

### Рецензент.рус (подраздел «Рецензирование»)

| Страница | URL | Описание |
|----------|-----|----------|
| **Судебная** | `/sudebnaya/` | Судебная рецензия |
| **Внесудебная** | `/vnesudebnaya/` | Внесудебная рецензия |
| **Рецензия** | `/recenziya/` | Общая рецензия |
| **Рецензии для юристов** | `/recenzii-dlya-yuristov/` | |
| **Досудебные для юрфирм** | `/dosudebnye-dlya-yurfirmy/` | |
| **Юристам** | `/yuristam/` | |

### Юридические страницы

| Страница | URL | Описание |
|----------|-----|----------|
| **Оферта** | `/oferta/` | Договор-оферта |
| **Конфиденциальность** | `/privacy.html` | Политика обработки данных |
| **Страница ошибки** | `/404.html` | Страница не найдена |

---

## 🎨 CSS-архитектура

### Система импортов (main.css)

```
main.css
├── BASE (базовые стили)
│   ├── variables.css     → :root переменные (цвета, отступы, шрифты)
│   ├── reset.css         → Сброс стилей браузера
│   ├── layout.css        → Container, section, grid
│   └── responsive.css    → Breakpoints (1024px, 768px, 480px)
│
├── COMPONENTS (UI-компоненты)
│   ├── header.css        → Навигация, логотип, бургер
│   ├── footer.css        → Подвал
│   ├── hero.css          → Главный баннер
│   ├── sections.css      → Общие секц��и
│   ├── buttons.css       → Кнопки
│   ├── cards.css         → Карточки
│   ├── forms.css         → Формы
│   ├── tables.css        → Таблицы
│   ├── steps.css         → Шаги процесса
│   ├── calculator.css    → Калькулятор
│   ├── sticky-cta.css    → Липкая кнопка
│   ├── reviews.css       → Отзывы
│   ├── guarantees.css    → Гарантии
│   ├── faq.css           → FAQ аккордеон
│   ├── contacts.css      → Контакты
│   ├── tabs.css          → Табы
│   ├── cta-about.css     → CTA для about
│   ├── pricing.css       → Цены
│   ├── animations.css    → Анимации
│   ├── services-cards.css → Карточки услуг
│   ├── case-card.css     → Карточки кейсов
│   └── hero-extended.css → Расширенный hero
│
├── PAGES
│   ├── about.css         → О компании
│   └── index.css         → Главная
│
└── UTILITIES
    └── utilities.css     → Утилитарные классы
```

### Breakpoints (адаптивные точки)

| Breakpoint | Устройство | CSS |
|------------|------------|-----|
| **≥1025px** | Десктоп | `@media (min-width: 1025px)` |
| **≤1024px** | Планшеты | `@media (max-width: 1024px)` |
| **≤768px** | Мобильные | `@media (max-width: 768px)` |
| **≤480px** | Маленькие мобильные | `@media (max-width: 480px)` |

---

## ⚙️ JavaScript-модули

### Основные модули (подключаются в index.html)

| Файл | Назначение | Подключается на |
|------|-----------|-----------------|
| `utils.js` | Утилиты (debounce, throttle) | Все страницы |
| `burger.js` | Бургер-меню | Все страницы |
| `calculator.js` | Калькулятор стоимости | Главная, услуги |
| `components-loader.js` | Динамическая загрузка header/footer | Все страницы с `#header-container`, `#footer-container` |
| `faq.js` | FAQ аккордеон | FAQ, услуги |
| `smooth-scroll.js` | Плавная прокрутка к якорям | Все страницы |
| `tabs.js` | Переключение табов | Цены, услуги |
| `scroll-animations.js` | Анимации при скролле (reveal-blur, velocity-blur) | Все страницы |
| `motion-injector.js` | GSAP-анимации (motion-дизайн 2026) | Все страницы |

### Motion-модули (GSAP-анимации)

| Файл | Назначение |
|------|-----------|
| `motion.js` | Базовые motion-анимации |
| `3d-cards.js` | 3D-карточки (`data-3d-card`) |
| `marquee.js` | Бегущая строка |
| `clip-reveals.js` | Clip-reveal анимации |
| `page-transitions.js` | Переходы между страницами |
| `scroll-velocity.js` | Scroll velocity эффекты |
| `lenis-scroll.js` | Smooth scroll (Lenis) |
| `webgl-gradient.js` | WebGL градиенты |
| `custom-cursor.js` | Кастомный курсор |
| `animated-icons.js` | Анимированные иконки |
| `diplomas.js` | Анимация дипломов |
| `review-motion.js` | Motion для review-секций |
| `card-glare.js` | Glare-эффект карточек |
| `form-micro-interactions.js` | Микро-взаимодействия форм |
| `section-spotlight.js` | Spotlight секций |
| `section-transitions.js` | Переходы секций |
| `header.js` | Логика header |
| `gsap-loader.js` | Загрузчик GSAP |
| `components.js` | Общие компоненты |

---

## 🔄 Навигация

### Header навигация
```
Главная → index.html
Услуги → avtotehnicheskaya/, avtotovarovedcheskaya/, uzly-i-agregaty/, tovarovedcheskaya-b2b/
Рецензирование → sudebnaya/, vnesudebnaya/, recenziya/, recenzii-dlya-yuristov/
О компании → o-kompanii/, eksperty/, partners/
Кейсы → keysy/, diplomy/
FAQ → faq/
Цены → ceny/
Контакты → kontakty/
```

### Пути к ресурсам
- **Корень:** `assets/css/main.css`, `assets/js/main.js`
- **Подстраницы:** `../assets/css/main.css`, `../assets/js/main.js`

---

## 📱 Мобильная адаптация

### Breakpoints
| Элемент | 1024px | 768px | 480px |
|---------|--------|-------|-------|
| Hero-заголовок | 2rem | 1.75rem | 1.5rem |
| Заголовки секций | 1.75rem | 1.5rem | 1.375rem |
| Сетка услуг | 2 колонки | 1 колонка | 1 колонка |
| Сетка шагов | 3 колонки | 2 колонки | 1 колонка |
| Карточки | 3 колонки | 1 колонка | 1 колонка |
| Кнопки | auto | 100% width | 100% width |
| Бургер-меню | скрыто | показано | показано |
| Формы | grid | 1 колонка | 1 колонка |

### Проверенные компоненты
- ✅ Header (бургер-меню на мобильных)
- ✅ Hero-секция (адаптивные шрифты)
- ✅ Карточки услуг (1 колонка на мобильных)
- ✅ Калькулятор (полная ширина)
- ✅ Формы (одна колонка)
- ✅ FAQ (аккордеон)
- ✅ Таблицы (горизонтальный скролл)
- ✅ Footer (одна колонка)

---

## ✅ Готовность к миграции

Проект готов к переносу в CMS 1С-Битрикс:
- Плоская структура страниц для инфоблоков `bitrix:news`
- Модульная CSS/JS архитектура
- Компоненты header/footer вынесены в отдельные HTML-файлы
- Контент извлечён в `content-extraction/pages/*.md`
