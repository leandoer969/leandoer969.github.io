# Tech & Health Color Palette Design Document

## Overview

This document presents a six-tone color palette optimized for a technology-driven healthcare environment. All primary tones are designed to work with `text-offWhite` (`#F8F9FA`) for high legibility and accessibility. Each primary color is paired with its complementary accent to provide visual harmony and emphasis for UI components such as buttons, badges, alerts, and charts.

---

## Color Palette

| Name             | Tailwind Class   | Hex       | Complementary Hex | Complementary Use                                      |
| ---------------- | ---------------- | --------- | ----------------- | ------------------------------------------------------ |
| **Tech Blue**    | `bg-blue-600`    | `#2563EB` | `#DA9C14`         | Golden accent for highlights, chart bars, hover states |
| **Human Teal**   | `bg-teal-500`    | `#14B8A6` | `#EB4759`         | Soft coral for badges, links, interactive elements     |
| **Vital Green**  | `bg-emerald-500` | `#10B981` | `#EF467E`         | Muted magenta overlays or progress indicators          |
| **Soft Slate**   | `bg-slate-400`   | `#64748B` | `#9B8B74`         | Warm taupe accents for borders, dividers               |
| **Care Purple**  | `bg-purple-400`  | `#A78BFA` | `#587405`         | Olive-green call-outs for status chips                 |
| **Alert Orange** | `bg-orange-400`  | `#FB923C` | `#046DC3`         | Rich blue for critical alerts, badges, icons           |

---

## Usage Guidelines

1. **Accessibility & Contrast**
   - All primary background colors meet WCAG AA standards for `#F8F9FA` (`text-offWhite`).
   - Use contrast-checking tools when adjusting shades.

2. **Primary vs. Accent**
   - Use **primary colors** (`techBlue`, `humanTeal`, etc.) for button backgrounds, cards, section headers.
   - Use **complementary hues** sparingly to draw attention: badges, notification dots, chart highlights.

3. **Examples**

   ```html
   <!-- Primary Button -->
   <button class="bg-techBlue text-offWhite rounded px-4 py-2">
     Start Session
   </button>

   <!-- Accent Badge -->
   <span class="text-offWhite rounded-full bg-[#DA9C14] px-2 py-1">New</span>
   ```

4. **Consistency**
   - Define all colors in `tailwind.config.js` under `extend.colors`.
   - Create helper classes if needed, e.g., `.text-accent-coral` or `.bg-accent-gold`.

5. **Brand Adaptation**
   - These base tones can be tweaked ±100 shade levels (e.g., `blue-700` for darker emphasis) to fit your brand’s existing hues.

---

## Tailwind Configuration Snippet

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        techBlue: '#2563EB',
        humanTeal: '#14B8A6',
        vitalGreen: '#10B981',
        softSlate: '#64748B',
        carePurple: '#A78BFA',
        alertOrange: '#FB923C',
        accentGold: '#DA9C14',
        accentCoral: '#EB4759',
        accentMagenta: '#EF467E',
        accentTaupe: '#9B8B74',
        accentOlive: '#587405',
        accentBlue: '#046DC3',
        offWhite: '#F8F9FA',
      },
    },
  },
};
```

---

## Conclusion

This palette balances the trustworthiness and clarity of tech-focused blues and teals with the warmth and vitality of greens, purples, and oranges. Complementary accents provide flexible highlights without compromising accessibility and cohesion.
