# Объектив-Эксперт — Сайт независимой экспертизы

Сайт центра независимых технических экспертиз в Барнауле (objektiv-expert.ru).

## Бренды

- **АвтоЭксперт** — автотехнические и автотовароведческие экспертизы
- **Рецензент.рус** — рецензирование экспертиз (ФЗ-73)

## Структура сайта

```
/
├── index.html                          # Главная страница
├── 404.html                            # Страница ошибки
├── privacy.html                        # Политика конфиденциальности
│
├── avtotehnicheskaya/                  # Автотехническая экспертиза
│   ├── index.html
│   ├── doroga/                         # Дорога
│   ├── obstoyatelstva-dtp/             # Обстоятельства ДТП
│   ├── sledy/                          # Следы на месте ДТП
│   └── tekhnicheskoe-sostoyanie/       # Техническое состояние ТС
│
├── avtotovarovedcheskaya/              # Автотовароведческая экспертиза
│   ├── index.html
│   ├── osago/                          # ОСАГО
│   └── vne-ramki/                      # Вне рамки
│
├── uzly-i-agregaty/                    # Экспертиза узлов и агрегатов
├── tovarovedcheskaya-b2b/              # Товароведческая B2B
│
├── sudebnaya/                          # Судебная экспертиза
├── vnesudebnaya/                       # Внесудебная экспертиза
├── recenziya/                          # Рецензия
├── recenzii-dlya-yuristov/             # Рецензии для юристов
├── dosudebnye-dlya-yurfirmy/           # Досудебные для юрфирм
├── yuristam/                           # Юристам
│
├── o-kompanii/                         # О компании
├── eksperty/                           # Эксперты
├── partners/                           # Партнёрство
├── faq/                                # Частые вопросы
├── ceny/                               # Цены
├── kontakty/                           # Контакты
├── oferta/                             # Оферта
├── politika/                           # Политика конфиденциальности
├── spasibo/                            # Страница благодарности
├── diplomy/                            # Дипломы
├── keysy/                              # Кейсы
│
├── assets/                             # Ресурсы
├── components/                         # HTML-компоненты
├── content-extraction/                 # Извлечённый контент (Markdown)
└── docs/                               # Документация
```

## Ресурсы

### CSS (модульная архитектура)

```
assets/css/
├── main.css            # Точка входа
├── main.min.css        # Минифицированная версия
├── motion.css          # GSAP-анимации
├── motion.min.css      # Минифицированная версия
│
├── base/               # Базовые стили
│   ├── variables.css   # CSS-переменные
│   ├── reset.css       # Сброс стилей
│   ├── layout.css      # Container, section, grid
│   └── responsive.css  # Breakpoints
│
├── components/         # UI-компоненты
│   ├── header.css
│   ├── footer.css
│   ├── hero.css
│   ├── sections.css
│   ├── buttons.css
│   ├── cards.css
│   ├── forms.css
│   ├── tables.css
│   ├── steps.css
│   ├── calculator.css
│   ├── calculator-compact.css
│   ├── sticky-cta.css
│   ├── reviews.css
│   ├── guarantees.css
│   ├── faq.css
│   ├── contacts.css
│   ├── tabs.css
│   ├── cta-about.css
│   ├── pricing.css
│   ├── animations.css
│   ├── services-cards.css
│   ├── case-card.css
│   ├── hero-extended.css
│   └── ...
│
├── pages/              # Стили для конкретных страниц
│   ├── about.css
│   └── index.css
│
└── utilities/          # Утилитарные классы
    └── utilities.css
```

### JavaScript (модульная архитектура)

```
assets/js/
├── main.js             # Основной файл
├── lib/
│   └── utils.js        # Утилиты
├── modules/            # Модули
│   ├── burger.js       # Бургер-меню
│   ├── calculator.js   # Калькулятор стоимости
│   ├── components-loader.js  # Загрузка header/footer
│   ├── faq.js          # FAQ аккордеон
│   ├── smooth-scroll.js # Плавная прокрутка
│   ├── tabs.js         # Табы
│   ├── scroll-animations.js  # Анимации при скролле
│   ├── motion-injector.js    # GSAP-анимации
│   ├── motion.js       # Motion-дизайн
│   ├── 3d-cards.js     # 3D-карточки
│   ├── marquee.js      # Бегущая строка
│   ├── clip-reveals.js # Clip-reveal анимации
│   ├── page-transitions.js   # Переходы между страницами
│   ├── scroll-velocity.js    # Scroll velocity
│   ├── lenis-scroll.js       # Smooth scroll (Lenis)
│   ├── webgl-gradient.js     # WebGL градиенты
│   ├── custom-cursor.js      # Кастомный курсор
│   ├── animated-icons.js     # Анимированные иконки
│   ├── form-micro-interactions.js  # Микро-взаимодействия форм
│   ├── section-spotlight.js  # Spotlight секций
│   ├── section-transitions.js # Переходы секций
│   ├── header.js             # Логика header
│   ├── diplomas.js           # Анимация дипломов
│   ├── review-motion.js      # Motion для review
│   ├── card-glare.js         # Glare-эффект карточек
│   ├── gsap-loader.js        # Загрузчик GSAP
│   └── components.js         # Общие компоненты
│
└── *.min.js          # Минифицированные копии (дубли в корне)
```

## Зависимости

```json
{
  "dependencies": {
    "@fontsource/inter": "^5.3.0"
  },
  "devDependencies": {
    "eslint": "^8.56.0",
    "prettier": "^3.2.0",
    "terser": "^5.51.2"
  }
}
```

## Скрипты

```bash
npm run lint    # ESLint
npm run format  # Prettier
```

## Breakpoints

| Breakpoint | Устройство |
|------------|------------|
| ≥1025px    | Десктоп    |
| ≤1024px    | Планшеты   |
| ≤768px     | Мобильные  |
| ≤480px     | Маленькие мобильные |

## Компоненты

Header и footer загружаются динамически через `components-loader.js` из файлов `components/header.html` и `components/footer.html`.

## Готовность к миграции

Проект готов к переносу в CMS 1С-Битрикс. Структура страниц плоская и логична для переноса в инфоблоки `bitrix:news`.
