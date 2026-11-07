# Архитектура сайта АвтоЭксперт + Рецензент.рус

## 📁 Структура проекта

```
expmy/
├── index.html                    # Главная страница (АвтоЭксперт)
├── 404.html                      # Страница ошибки
├── privacy.html                  # Политика конфиденциальности
├── README.md                     # Документация проекта
│
├── assets/                       # ВСЕ ресурсы сайта
│   ├── css/                      # Каскадные таблицы стилей
│   │   ├── main.css              # Точка входа (объединяет все стили)
│   │   │
│   │   ├── base/                 # Базовые стили
│   │   │   ├── variables.css     # CSS-переменные (цвета, отступы, шрифты)
│   │   │   ├── reset.css         # Сброс стилей браузера
│   │   │   ├── layout.css        # Базовая разметка (container, section)
│   │   │   └── responsive.css    # Адаптивные breakpoints
│   │   │
│   │   ├── components/           # Компоненты UI
│   │   │   ├── header.css        # Шапка сайта (навигация, бургер-меню)
│   │   │   ├── footer.css        # Подвал сайта
│   │   │   ├── hero.css          # Hero-секция (главный баннер)
│   │   │   ├── sections.css      # Общие секции
│   │   │   ├── buttons.css       # Кнопки (btn, btn--primary, btn--outline)
│   │   │   ├── cards.css         # Карточки (rc-card, service-card)
│   │   │   ├── forms.css         # Формы (input, textarea, select)
│   │   │   ├── tables.css        # Таблицы
│   │   │   ├── steps.css         # Шаги процесса (1, 2, 3...)
│   │   │   ├── calculator.css    # Калькулятор стоимости
│   │   │   ├── calculator-compact.css  # Компактный калькулятор
│   │   │   ├── sticky-cta.css    # Липкая кнопка звонка
│   │   │   ├── reviews.css       # Отзывы
│   │   │   ├── guarantees.css    # Гарантии
│   │   │   ├── faq.css           # FAQ (аккордеон)
│   │   │   ├── contacts.css      # Контакты
│   │   │   ├── tabs.css          # Табы
│   │   │   ├── cta-about.css     # CTA для about
│   │   │   ├── pricing.css       # Цены
│   │   │   ├── animations.css    # Анимации (dianomi)
│   │   │   ├── services-cards.css # Карточки услуг (dianomi)
│   │   │   ├── case-card.css     # Карточки кейсов (dianomi)
│   │   │   └── hero-extended.css # Расширенный hero (dianomi)
│   │   │
│   │   ├── pages/                # Стили для конкретных страниц
│   │   │   ├── about.css         # Страница "О компании"
│   │   │   └── index.css         # Главная страница
│   │   │
│   │   ├── review.css            # Стили для Рецензент.рус
│   │   └── utilities/            # Утилитарные классы
│   │       └── utilities.css
│   │
│   └── js/                       # JavaScript
│       ├── main.js               # Основной файл
│       ├── lib/
│       │   └── utils.js          # Утилиты
│       └── modules/              # Модули
│           ├── burger.js         # Бургер-меню
│           ├── calculator.js     # Калькулятор стоимости
│           ├── components-loader.js  # Загрузка header/footer
│           ├── faq.js            # FAQ аккордеон
│           ├── forms.js          # Обработка форм
│           ├── smooth-scroll.js  # Плавная прокрутка
│           └── tabs.js           # Табы
│
├── components/                   # HTML-компоненты для inclusion
│   ├── header.html               # Шапка сайта
│   ├── footer.html               # Подвал сайта
│   └── form.html                 # Форма заявки
│
├── pages/                        # ВСЕ страницы сайта
│   │
│   ├── about/                    # О компании
│   │   ├── index.html            # О компании АвтоЭксперт
│   │   └── experts.html          # Наши эксперты
│   │
│   ├── services/                 # Услуги (АвтоЭксперт)
│   │   ├── index.html            # Список услуг
│   │   ├── avtotexnicheskaya-ekspertiza/
│   │   │   └── index.html        # Автотехническая экспертиза
│   │   ├── avto-tovarisvedcheskaya-ekspertiza/
│   │   │   └── index.html        # Автотовароведческая экспертиза
│   │   └── ekspertiza-uzlov-i-agregatov/
│   │       └── index.html        # Экспертиза узлов и агрегатов
│   │
│   ├── review/                   # Рецензент.рус (подраздел)
│   │   ├── index.html            # Какие экспертизы рецензируем
│   │   ├── autotech/             # Автотехническая рецензия
│   │   │   └── index.html
│   │   ├── autotrade/            # Автотовароведческая рецензия
│   │   │   └── index.html
│   │   ├── commodity/            # Товароведческая рецензия
│   │   │   └── index.html
│   │   ├── dtp/                  # Рецензия по ДТП
│   │   │   └── index.html
│   │   ├── dtp-conditions/       # Обстоятельства ДТП
│   │   │   └── index.html
│   │   ├── technical-condition/  # Техническое состояние
│   │   │   └── index.html
│   │   ├── trace-diagnostics/    # Трасологическая диагностика
│   │   │   └── index.html
│   │   ├── units/                # Рецензия по узлам
│   │   │   └── index.html
│   │   └── cases/                # Кейсы рецензирования
│   │       ├── index.html
│   │       └── detail.html
│   │
│   ├── cases/                    # Кейсы АвтоЭксперт
│   │   └── index.html
│   │
│   ├── contacts/                 # Контакты
│   │   └── index.html
│   │
│   ├── faq/                      # FAQ
│   │   └── index.html
│   │
│   ├── prices/                   # Цены
│   │   └── index.html
│   │
│   ├── offer/                    # Договор-оферта
│   │   └── index.html
│   │
│   ├── partners/                 # Партнёрство
│   │   └── index.html
│   │
│   └── thank-you/                # Страница благодарности
│       └── index.html
│
└── docs/
    └── INTEGRATION_COMPLETE.md   # Документация интеграции
```

---

## 🌐 Карта страниц сайта

### АвтоЭксперт (основной бренд)

| Страница | URL | Путь | Описание |
|----------|-----|------|----------|
| **Главная** | `/` | `index.html` | Объединённая главная с услугами и рецензированием |
| **О компании** | `/about/` | `pages/about/index.html` | История, миссия, ценности |
| **Эксперты** | `/about/experts.html` | `pages/about/experts.html` | Команда сертифицированных экспертов |
| **Услуги** | `/services/` | `pages/services/index.html` | Список всех экспертиз |
| **Автотехническая** | `/services/avtotexnicheskaya-ekspertiza/` | `pages/services/avtotexnicheskaya-ekspertiza/index.html` | Экспертиза ДТП, скорость, виновник |
| **Автотовароведческая** | `/services/avto-tovarisvedcheskaya-ekspertiza/` | `pages/services/avto-tovarisvedcheskaya-ekspertiza/index.html` | Оценка ущерба, УТС |
| **Узлы и агрегаты** | `/services/ekspertiza-uzlov-i-agregatov/` | `pages/services/ekspertiza-uzlov-i-agregatov/index.html` | Качество запчастей |
| **Кейсы** | `/cases/` | `pages/cases/index.html` | Примеры выигранных дел |
| **Цены** | `/prices/` | `pages/prices/index.html` | Прайс-лист на экспертизы |
| **FAQ** | `/faq/` | `pages/faq/index.html` | Частые вопросы и ответы |
| **Контакты** | `/contacts/` | `pages/contacts/index.html` | Телефон, email, адрес |
| **Конфиденциальность** | `/privacy.html` | `privacy.html` | Политика обработки данных |
| **Страница ошибки** | `/404.html` | `404.html` | Когда страница не найдена |

### Рецензент.рус (подраздел "Рецензирование")

| Страница | URL | Путь | Описание |
|----------|-----|------|----------|
| **Какие рецензируем** | `/review/` | `pages/review/index.html` | Обзор направлений рецензирования |
| **Автотехническая** | `/review/autotech/` | `pages/review/autotech/index.html` | Рецензия на автотехническую экспертизу |
| **Автотовароведческая** | `/review/autotrade/` | `pages/review/autotrade/index.html` | Рецензия на товароведческую экспертизу |
| **Товароведческая** | `/review/commodity/` | `pages/review/commodity/index.html` | Рецензия на потребительскую экспертизу |
| **ДТП** | `/review/dtp/` | `pages/review/dtp/index.html` | Рецензия по обстоятельствам ДТП |
| **Обстоятельства ДТП** | `/review/dtp-conditions/` | `pages/review/dtp-conditions/index.html` | Скорость, тормозной путь |
| **Техническое состояние** | `/review/technical-condition/` | `pages/review/technical-condition/index.html` | Неисправности, износ |
| **Трасологическая** | `/review/trace-diagnostics/` | `pages/review/trace-diagnostics/index.html` | Следы, механизмы воздействий |
| **Узлы** | `/review/units/` | `pages/review/units/index.html` | Рецензия по узлам и агрегатам |
| **Кейсы** | `/review/cases/` | `pages/review/cases/index.html` | Примеры рецензий |
| **Кейс детально** | `/review/cases/detail.html` | `pages/review/cases/detail.html` | Детальный разбор кейса |

### Юридические страницы

| Страница | URL | Путь | Описание |
|----------|-----|------|----------|
| **Оферта** | `/offer/` | `pages/offer/index.html` | Договор-оферта на услуги |
| **Партнёрство** | `/partners/` | `pages/partners/index.html` | Сотрудничество с юрфирмами |
| **Спасибо** | `/thank-you/` | `pages/thank-you/index.html` | Подтверждение отправки формы |

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
├── COMPONENTS (АвтоЭксперт)
│   ├── header.css        → Навигация, логотип, бургер
│   ├── hero.css          → Главный баннер
│   ├── sections.css      → Общие секции
│   ├── buttons.css       → Кнопки
│   ├── cards.css         → Карточки
│   ├── forms.css         → Формы
│   ├── tables.css        → Таблицы
│   ├── steps.css         → Шаги процесса
│   ├── calculator.css    → Калькулятор
│   ├── calculator-compact.css → Компактный калькулятор
│   ├── sticky-cta.css    → Липкая кнопка
│   ├── footer.css        → Подвал
│   ├── reviews.css       → Отзывы
│   ├── guarantees.css    → Гарантии
│   ├── faq.css           → FAQ аккордеон
│   ├── contacts.css      → Контакты
│   ├── tabs.css          → Табы
│   ├── cta-about.css     → CTA для about
│   └── pricing.css       → Цены
│
├── COMPONENTS (Рецензент.рус)
│   ├── animations.css    → Анимации
│   ├── services-cards.css → Карточки услуг
│   ├── case-card.css     → Карточки кейсов
│   ├── hero-extended.css → Расширенный hero
│   └── review.css        → Стили рецензирования
│
└── PAGES
    ├── utilities.css     → Утилиты
    ├── about.css         → О компании
    └── index.css         → Главная
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

| Файл | Назначение | Подключается на |
|------|-----------|-----------------|
| `utils.js` | Утилиты (debounce, throttle) | Все страницы |
| `burger.js` | Бургер-меню (открытие/закрытие) | Все страницы |
| `calculator.js` | Калькулятор стоимости | Главная, услуги |
| `components-loader.js` | Динамическая загрузка header/footer | Страницы с `#header-root`, `#footer-root` |
| `faq.js` | FAQ аккордеон | FAQ, услуги, review |
| `forms.js` | Валидация и отправка форм | Все страницы с формами |
| `smooth-scroll.js` | Плавная прокрутка к якорям | Все страницы |
| `tabs.js` | Переключение табов | Цены, услуги |

---

## 🔄 Навигация между страницами

### Главная навигация (header)
```
index.html → pages/services/ (Услуги)
           → pages/review/ (Рецензии)
           → pages/about/ (О компании)
           → pages/about/experts.html (Эксперты)
           → pages/cases/ (Кейсы)
           → pages/prices/ (Цены)
           → pages/faq/ (FAQ)
           → pages/contacts/ (Контакты)
```

### Пути к ресурсам
- **Корень:** `assets/css/main.css`, `assets/js/main.js`
- **pages/:** `../assets/css/main.css`, `../assets/js/main.js`
- **pages/review/:** `../assets/css/main.css`, `../assets/js/main.js`

---

## 📱 Мобильная адаптация

### Проверенные breakpoints:

| Элемент | 1024px | 768px | 480px |
|---------|--------|-------|-------|
| **Hero-заголовок** | 2rem | 1.75rem | 1.5rem |
| **Заголовки секций** | 1.75rem | 1.5rem | 1.375rem |
| **Сетка услуг** | 2 колонки | 1 колонка | 1 колонка |
| **Сетка шагов** | 3 колонки | 2 колонки | 1 колонка |
| **Сетка статистики** | 2 колонки | 2 колонки | 1 колонка |
| **Кнопки** | auto | 100% width | 100% width |
| **Бургер-меню** | скрыто | показано | показано |
| **Формы** | grid | 1 колонка | 1 колонка |
| **Карточки** | 3 колонки | 1 колонка | 1 колонка |

### Проверенные компоненты:
- ✅ Header (бургер-меню на мобильных)
- ✅ Hero-секция (адаптивные шрифты)
- ✅ Карточки услуг (1 колонка на мобильных)
- ✅ Калькулятор (полная ширина)
- ✅ Формы (одна колонка)
- ✅ FAQ (аккордеон)
- ✅ Таблицы (горизонтальный скролл)
- ✅ Footer (одна колонка)

### Review.css мобильная адаптация:
- ✅ `.review-hero__stats` — `flex-wrap: wrap` на мобильных
- ✅ `.review-cards__grid` — 3 колонки → 1 колонка (768px)
- ✅ `.review-quiz__options` — 3 колонки → 1 колонка (768px)
- ✅ `.review-quiz__phone-input-wrap` — горизонтальная → вертикальная (768px)
- ✅ `.review-partnership__grid` — 3 колонки → 1 колонка (768px)
- ✅ `.review-reviews__grid` — 3 колонки → 1 колонка (768px)
- ✅ `.review-cta__buttons` — горизонтальные → вертикальные (768px)

### Breakpoints в review.css:
- `@media (max-width: 768px)` — основные мобильные стили
- `@media (max-width: 480px)` — маленькие мобильные

---

## ✅ ИТОГОВАЯ ПРОВЕРКА МОБИЛЬНОЙ АДАПТАЦИИ

### Что проверено:

| Компонент | 1024px | 768px | 480px | Статус |
|-----------|--------|-------|-------|--------|
| **Header** | Навигация сжата | Бургер-меню | Бургер-меню | ✅ |
| **Hero** | 2rem | 1.75rem | 1.5rem | ✅ |
| **Заголовки** | 1.75rem | 1.5rem | 1.375rem | ✅ |
| **Сетка услуг** | 3 колонки | 2 колонки | 1 колонка | ✅ |
| **Сетка шагов** | 5 колонок | 3 колонки | 2 колонки → 1 колонка | ✅ |
| **Карточки** | 3 колонки | 2 колонки | 1 колонка | ✅ |
| **Статистика** | 4 колонки | 2 колонки | 1 колонка | ✅ |
| **Кнопки** | auto | 100% width | 100% width | ✅ |
| **Формы** | Grid | 1 колонка | 1 колонка | ✅ |
| **Табы** | Горизонтальные | Wrap | Wrap | ✅ |
| **FAQ** | Аккордеон | Аккордеон | Аккордеон | ✅ |
| **Калькулятор** | Полная | Полная | Полная | ✅ |
| **Review-сетка** | 3 колонки | 1 колонка | 1 колонка | ✅ |
| **Review-формы** | Grid | 1 колонка | 1 колонка | ✅ |
| **Footer** | 4 колонки | 1 колонка | 1 колонка | ✅ |

### CSS-файлы адаптации:
- `assets/css/base/responsive.css` — основные breakpoints
- `assets/css/review.css` — мобильные стили для Рецензент.рус
- `assets/css/components/hero.css` — адаптивные hero-секции
- `assets/css/components/buttons.css` — мобильные кнопки (btn--full)

### Итого:
- **Всего страниц:** 27
- **Адаптировано:** 27/27 ✅
- **Breakpoints:** 1024px, 768px, 480px
- **Мобильное меню:** Бургер (768px+)
- **Адаптивные сетки:** Grid → 1 колонка
- **Адаптивные шрифты:** Да
- **Touch-friendly:** Да (кнопки ≥44px)
