# КОМПЛЕКСНАЯ ДОКУМЕНТАЦИЯ ПРОЕКТА «ОБЪЕКТИВ-ЭКСПЕРТ» — ЧАСТЬ 3: НАВИГАЦИОННАЯ КАРТА

---

## 3.1 ИЕРАРХИЯ САЙТА

```
┌─────────────────────────────────────────────────────────────────────┐
│                           ГЛАВНАЯ (/)                               │
└────────────┬──────────────────────────┬─────────────────────────────┘
             │                          │
     ┌───────▼────────┐          ┌──────▼──────────────┐
     │  УСЛУГИ        │          │  КОМПАНИЯ           │
     │  (экспертизы)  │          │  (инфо)             │
     └───────┬────────┘          └──────┬──────────────┘
             │                          │
  ┌──────────┼──────────┐               ├─ О компании (/o-kompanii/)
  │          │          │               ├─ Эксперты (/eksperty/)
  │          │          │               ├─ Дипломы (/diplomy/)
  ▼          ▼          ▼               └─ Контакты (/kontakty/)
Автотехни-  Автотоваро- Товароведч.
ческая      веческая    B2B
(5 стр.)    (3 стр.)    (4 стр.)
  │          │           │
  ├─ Обстоя-  ├─ В рам-  ├─ Транспортные
  │  тельства │  ках ОСА- │   средства
  │  ДТП      │  ГО       │   (/tovarovedcheskaya-b2b/transport/)
  │  (doroga) │  (osago)  │
  ├─ Техни-    ├─ Вне      ├─ Строительные
  │  ческое    │  рамок     │   товары
  │  состояние │  ОСАГО     │   (/tovarovedcheskaya-b2b/construction/)
  │  ТС        │  (vne-     │
  │  (tekhnich- │  ramki)   │
  │  skoe)     │           ├─ Машины и
  ├─ Следы      │           │   оборудование
  │  на ТС      │           │   (/tovarovedcheskaya-b2b/equipment/)
  │  и месте    │           │
  │  ДТП        │           │
  │  (sledy)    │           │
  └─ Дорога     │           │
     (doroga)   │           │
                │           │
  Узлы и агрегаты           │
  (/uzly-i-agregaty/)      │
  (4 категории)             │
                            │
  Форматы экспертиз          │
  ├─ Судебная (/sudebnaya/) │
  ├─ Внесудебная (/vnesudeb- │
  │   naya/)                │
  └─ Рецензия (/recenziya/) │
                            │
  B2B услуги                │
  ├─ Рецензии для юристов   │
  │  (/recenzii-dlya-yurist- │
  │   ov/)                  │
  ├─ Досудебные для юрфирм  │
  │  (/dosudebnye-dlya-yur- │
  │   firmy/)               │
  └─ Партнёрам (/partners/) │
                            │
  Ситуации                  │
  ├─ ДТП (/situations/dtp/) │
  ├─ ОСАГО (/situations/    │
  │    osago/)              │
  ├─ Дефект (/situations/   │
  │    defekt/)             │
  ├─ Поставка (/situations/ │
  │    postavka/)           │
  ├─ Некачественный товар   │
  │  (/situations/goods/)   │
  ├─ Страховая занизила     │
  │  выплату (/situations/  │
  │    insurance/)          │
  └─ Запчасти (/situations/ │
       parts/)              │
                            │
  Инфо-страницы             │
  ├─ Цены (/ceny/)          │
  ├─ Кейсы (/keysy/)        │
  ├─ FAQ (/faq/)            │
  ├─ Оферта (/oferta/)      │
  ├─ Политика (/politika/)  │
  ├─ Спасибо (/spasibo/)    │
  └─ 404 (/404.html)        │
```

---

## 3.2 СТРУКТУРА МЕНЮ (HEADER)

### Desktop

```
Главная
Экспертизы ▼
├── Виды экспертиз
│   ├── Автотехническая
│   ├── Автотовароведческая
│   ├── Узлы и агрегаты
│   └── Товароведческая B2B
├── Автотехническая ▼
│   ├── Обстоятельства ДТП
│   ├── Техническое состояние ТС
│   ├── Следы на ТС и месте ДТП
│   └── Техническое состояние дороги
├── Автотовароведческая ▼
│   ├── В рамках ОСАГО
│   └── Вне рамок ОСАГО
├── Товароведческая B2B ▼
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

Цены
Кейсы
О компании
Контакты
📞 +7 (905) 983-09-69
```

### Mobile/Tablet

Та же структура, но:
- Burger-кнопка для открытия меню
- Accordion-подменю (раскрываются по клику)
- Дублирование всех ссылок
- Отдельная CTA-кнопка «Получить консультацию»

---

## 3.3 BREADCRUMBS (ХЛЕБНЫЕ КРОШКИ)

### На каких страницах есть breadcrumbs:

| Страница | Breadcrumbs |
|----------|-------------|
| `/situations/goods/` | Главная → Ситуации → Товар некачественный |
| `/situations/insurance/` | Главная → Ситуации → Страховая занизила выплату |
| `/situations/parts/` | Главная → Ситуации → Запчасть сломалась |
| `/pages/services/tovarovedcheskaya/*/` | Главная → Товароведческая экспертиза → Категория |

### Структура breadcrumbs для situations/:
```
Главная → Ситуации → [Название ситуации]
```

### Структура breadcrumbs для pages/services/tovarovedcheskaya/*:
```
Главная → Товароведческая экспертиза → [Категория товаров]
```

### Страницы БЕЗ breadcrumbs (нужно добавить):
- Все service sub-pages (avtotehnicheskaya/doroga, avtotovarovedcheskaya/osago и т.д.)
- Все B2B pages
- Все review pages
- Страницы situations/dtp, situations/osago, situations/defekt, situations/postavka
- Все внутренние страницы pages/

---

## 3.4 ВНУТРЕННЯЯ ПЕРЕЛИНКОВКА

### Основные мосты (cross-links):

| Страница | Ссылается на |
|----------|-------------|
| Главная | situations/*, avtotehnicheskaya/*, avtotovarovedcheskaya/*, uzly-i-agregaty/, tovarovedcheskaya-b2b/*, sudebnaya/, vnesudebnaya/, recenziya/, kontakty/, ceny/, keysy/, o-kompanii/, diplomy/, eksperty/ |
| avtotehnicheskaya/ | obstoyatelstva-dtp/, tekhnicheskoe-sostoyanie/, sledy/, doroga/, sudebnaya/, vnesudebnaya/, recenziya/ |
| avtotovarovedcheskaya/ | osago/, vne-ramki/, sudebnaya/, vnesudebnaya/, recenziya/ |
| uzly-i-agregaty/ | sudebnaya/, vnesudebnaya/, recenziya/, reestr.roscert.ru |
| tovarovedcheskaya-b2b/ | transport/, construction/, equipment/ |
| situations/dtp/ | avtotehnicheskaya/ |
| situations/osago/ | avtotovarovedcheskaya/ |
| situations/defekt/ | uzly-i-agregaty/ |
| situations/postavka/ | tovarovedcheskaya-b2b/ |
| situations/goods/ | pages/services/tovarovedcheskaya/* (10 категорий) |
| situations/insurance/ | — |
| situations/parts/ | — |
| sudebnaya/ | avtotehnicheskaya/, avtotovarovedcheskaya/, uzly-i-agregaty/, tovarovedcheskaya-b2b/, ceny/, reestr.roscert.ru |
| vnesudebnaya/ | — |
| recenziya/ | — |
| recenzii-dlya-yuristov/ | — |
| dosudebnye-dlya-yurfirmy/ | — |
| partners/ | recenzii-dlya-yuristov/, dosudebnye-dlya-yurfirmy/ |
| footer | avtotehnicheskaya/, avtotovarovedcheskaya/, uzly-i-agregaty/, tovarovedcheskaya-b2b/, sudebnaya/, vnesudebnaya/, recenziya/, o-kompanii/, eksperty/, ceny/, faq/, kontakty/, politika/, oferta/, reestr.roscert.ru |

### CTA-элементы (call-to-action):

| Тип CTA | Где встречается | Куда ведёт |
|---------|----------------|------------|
| «Бесплатная консультация» | Главная, recenziya/, situations/* | tel:+79059830969 или #contact-form |
| «Рассчитать стоимость» | Главная, situations/insurance/ | #materials-form |
| «Получить консультацию» | avtotehnicheskaya/, avtotovarovedcheskaya/, uzly-i-agregaty/, tovarovedcheskaya-b2b/, vnesudebnaya/, footer | #contact-form |
| «Обсудить дело» | sudebnaya/ | #cta-section |
| «Прислать заключение» | recenziya/ | #cta-section |
| «Получить консультацию» (footer) | footer | /kontakty/ |
| «Вернуться на главную» | 404/, spasibo/ | / |

---

## 3.5 ФОРМЫ НА СТРАНИЦАХ

| URL | Форма | Поля | Action |
|-----|-------|------|--------|
| Главная | #contact-form, #materials-form | name, phone, message, agree | POST |
| avtotehnicheskaya/* | CTA section | name, phone, message, agree | POST |
| avtotovarovedcheskaya/* | CTA section | name, phone, message, agree | POST |
| uzly-i-agregaty/ | CTA form | name, phone, message, agree | POST |
| tovarovedcheskaya-b2b/* | CTA section | name, phone, message, agree | POST |
| sudebnaya/ | CTA section | name, phone, message, agree | POST |
| vnesudebnaya/ | CTA section | name, phone, message, agree | POST |
| recenziya/ | CTA section | name, phone, message, agree | POST |
| recenzii-dlya-yuristov/ | CTA form | name, phone, message, agree | POST |
| dosudebnye-dlya-yurfirmy/ | CTA form | name, phone, message, agree | POST |
| situations/* | CTA form | name, phone, message, agree | POST |
| kontakty/ | Контактная форма | name, phone, document, question, agree | POST |
| ceny/ | Форма расчёта | name, phone, document, question, agree | POST |
| partners/ | Обсудить сотрудничество | name, phone, message, agree | POST |

**Страницы БЕЗ формы:**
- 404.html
- privacy.html
- o-kompanii/
- eksperty/
- diplomы/
- faq/
- oferta/
- politika/
- spasibo/
- keysy/

---

*Продолжение следует...*
