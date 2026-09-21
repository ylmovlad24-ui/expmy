# План исправления оформления калькулятора на главной странице

> Дата: 2026-08-22 | Статус: готов к реализации

## Контекст
Калькулятор стоимости экспертизы на главной странице (`index.html`, секция `.price-calc`) частично оформлен, но есть несоответствия общей дизайн-системе и проблемы с доступностью.

## Выявленные проблемы

| # | Проблема | Файл | Приоритет |
|---|----------|------|-----------|
| 1 | Нет `aria-label`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow` у `<input type="range">` | `index.html` | 🔴 Критично |
| 2 | JS не обновляет `aria-valuenow` при движении ползунка | `js/script.js` | 🔴 Критично |
| 3 | Нет `:focus-visible` для `.price-calc__range` (клавиатурная навигация) | `css/components.css` | 🟡 Важно |
| 4 | Нет `:focus-visible` для `.price-calc__tier` (клавиатурная навигация) | `css/components.css` | 🟡 Важно |
| 5 | Нет `::-moz-range-track` стилизации для Firefox | `css/components.css` | 🟢 Средне |
| 6 | Нет `::-webkit-slider-runnable-track` стилизации | `css/components.css` | 🟢 Средне |
| 7 | Fill-бар при `val=1` имеет 0% ширины — нет визуальной обратной связи | `js/script.js` | 🟢 Косметика |

## Детальный план

### Шаг 1. HTML: добавить aria-атрибуты к range-input
**Файл:** `index.html`
**Секция:** `<input type="range" id="damage-count" class="price-calc__range" min="1" max="15" value="1" step="1">`

**Заменить на:**
```html
<input type="range" id="damage-count" class="price-calc__range" min="1" max="15" value="1" step="1"
       aria-label="Количество повреждений"
       aria-valuemin="1"
       aria-valuemax="15"
       aria-valuenow="1">
```

### Шаг 2. JS: обновлять aria-valuenow
**Файл:** `js/script.js`
**Функция:** `updatePrice()`

**В конец функции добавить:**
```js
// Обновить aria-valuenow для доступности
if (priceRange) {
  priceRange.setAttribute('aria-valuenow', val);
}
```

### Шаг 3. CSS: :focus-visible для range
**Файл:** `css/components.css`
**После:** блока `.price-calc__range::-moz-range-thumb:hover`

**Добавить:**
```css
/* Focus visible для клавиатурной навигации */
.price-calc__range:focus-visible {
  outline: 3px solid var(--primary, #2A5B9A);
  outline-offset: 4px;
  border-radius: 4px;
}
```

### Шаг 4. CSS: :focus-visible для тарифов
**Файл:** `css/components.css`
**После:** блока `.price-calc__tier--active .price-calc__tier-price`

**Добавить:**
```css
.price-calc__tier:focus-visible {
  outline: 3px solid var(--primary, #2A5B9A);
  outline-offset: 2px;
}
```

### Шаг 5. CSS: Firefox range track
**Файл:** `css/components.css`
**После:** блока `.price-calc__range::-moz-range-thumb:hover`

**Добавить:**
```css
.price-calc__range::-moz-range-track {
  height: 8px;
  border-radius: 4px;
  background: var(--border, #E0E4E8);
}
```

### Шаг 6. CSS: WebKit slider track
**Файл:** `css/components.css`
**После:** блока `.price-calc__range`

**Добавить:**
```css
.price-calc__range::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 4px;
  background: var(--border, #E0E4E8);
}
```

### Шаг 7. JS: минимальная ширина fill-бара
**Файл:** `js/script.js`
**Место:** блок fill в `updatePrice()`

**Заменить:**
```js
sliderFill.style.width = pct + '%';
```

**На:**
```js
sliderFill.style.width = Math.max(pct, 5) + '%';
```

## Соответствие дизайн-системе

Все изменения используют существующие CSS-переменные из `base.css`:
- `--primary: #2A5B9A` — основной синий для фокуса и акцентов
- `--accent: #E67E22` — оранжевый для CTA
- `--border: #E0E4E8` — серый для треков
- `--card-radius: 8px` — скругление карточек
- `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)` — spring-анимации
- `--transition-fast: 0.15s` / `--transition-normal: 0.3s` — тайминги

## Порядок выполнения
1. ✅ Шаг 1 — HTML (aria-атрибуты)
2. ✅ Шаг 2 — JS (aria-valuenow)
3. ✅ Шаг 3 — CSS (:focus-visible range)
4. ✅ Шаг 4 — CSS (:focus-visible tiers)
5. ✅ Шаг 5 — CSS (Firefox track)
6. ✅ Шаг 6 — CSS (WebKit track)
7. ✅ Шаг 7 — JS (fill-бар)
