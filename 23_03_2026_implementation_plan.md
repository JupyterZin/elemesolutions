# Implementation Plan — "Experimentar" (Try Out) Buttons on Problem Cards

**Date:** 2026-03-23
**Status:** Draft — Pending Approval
**Scope:** Add interactive "Try Out" modal demos to the 3 problem-cards on the Eleme Solutions landing page
**Target Audience:** PMEs industriais na zona de Estarreja (metalurgia, plásticos, moldes, alimentar)

---

## 1. Objective

Each problem-card currently describes a pain point in text. Visitors read it, but they don't *feel* it. The goal is to add a **"Experimentar"** button to each card that opens a modal showing a **visual before/after mock** — a concrete preview of what Eleme Solutions can fix.

This transforms the problem section from passive reading into active engagement. The visitor sees their own reality (the "before") and the possible future (the "after"), making the value proposition tangible.

---

## 2. Design Decisions

### 2.1 Interaction Model
- **Modal overlay** (centered, dimmed backdrop)
- Triggered by an "Experimentar" button at the bottom of each problem-card
- Close via X button, backdrop click, or ESC key
- Smooth fade-in/out animation
- Responsive: full-width on mobile, max ~900px on desktop
- Body scroll locked while modal is open

### 2.2 Modal Layout
Each modal follows a consistent structure:

```
┌──────────────────────────────────────────────────┐
│  [X]                                             │
│                                                  │
│  Problem Title (e.g. "Folhas de Cálculo...")     │
│  Short context line                              │
│                                                  │
│  ┌─────────────────┐   ┌─────────────────┐      │
│  │     ANTES        │   │     DEPOIS       │      │
│  │                  │   │                  │      │
│  │  (visual mock)   │   │  (visual mock)   │      │
│  │                  │   │                  │      │
│  └─────────────────┘   └─────────────────┘      │
│                                                  │
│  Key insight text (1-2 lines)                    │
│                                                  │
│  [ Falar Connosco → ]                            │
│                                                  │
└──────────────────────────────────────────────────┘
```

On mobile: stacks vertically (Before on top, After below).

### 2.3 CTA Inside Modal
Each modal ends with a **"Falar Connosco"** button linking to the contact section — capitalize on the engagement moment.

---

## 3. Content Plan — The Three Modals

All data is **fictional**. Company names, numbers, and scenarios are illustrative. No real company names or real data will be used.

### 3.1 Modal 1 — "Folhas de Cálculo a Controlar Processos Críticos"

**Context line:** *"Uma empresa industrial com 45 colaboradores gere toda a previsão de produção em Excel."*

**ANTES (The Problem):**
Mock of a chaotic spreadsheet rendered in HTML/CSS:
- Company: **"Sousa & Filhos, Metalurgia Lda."** (fictional)
- A table showing "Previsão de Produção — Março 2026" with:
  - Multiple colored cells (red warnings, yellow highlights — no consistency)
  - A broken formula showing `#REF!` in one cell
  - A cell with a comment: "Pedro, confirma este valor!"
  - Column headers: Produto | Qtd Prevista | Qtd Real | Desvio | Notas
  - 5-6 rows of plausible industrial products (e.g., "Perfil Aço 40mm", "Chapa Galv. 2mm", "Tubo Inox 25mm")
  - Row with manual coloring showing values don't match
  - Footer: "Última atualização: há 3 dias (por email)"
- Visual style: made to look like a messy spreadsheet (grid lines, cell backgrounds, monospace font)

**DEPOIS (The Solution):**
Mock of a clean ERP-style dashboard:
- Same data but organized in a clean table with status indicators (green/yellow/red dots)
- No formula errors — all values computed
- "Atualizado: há 2 minutos" with a green live indicator
- A small chart showing forecast vs actual trend
- Badge: "3 alertas ativos" (clickable-looking)
- Clean typography, consistent colors, professional layout

**Key insight:** *"De 5 ficheiros espalhados por email para uma fonte única de verdade. Desvio de previsão reduzido de 30% para menos de 8%."*

---

### 3.2 Modal 2 — "Introdução Manual de Dados Entre Sistemas"

**Context line:** *"Uma fábrica de componentes plásticos perde 2-3 horas/dia a copiar dados entre sistemas."*

**ANTES (The Problem):**
Visual workflow diagram showing manual chaos:
- Company: **"Ribeiro Plásticos Industriais"** (fictional)
- Flow: `Encomenda (email)` → `Copiar para Excel` → `Inserir no ERP` → `Atualizar produção (outro Excel)` → `Enviar fatura (manual)`
- Each arrow has a warning icon and time label: "~15 min", "~20 min"
- Error callouts: "Erro de digitação: 500 un. → 5000 un." and "Dados desatualizados — fatura com preço errado"
- Total time shown: **"2h 45min/dia em trabalho manual"**
- A small "person" icon looking stressed at a desk with multiple screens

**DEPOIS (The Solution):**
Clean automated flow diagram:
- Same process but: `Encomenda (portal)` → automatic arrow → `ERP (auto)` → automatic arrow → `Produção (sync)` → automatic arrow → `Fatura (auto)`
- Each arrow is smooth with a checkmark: "Automático", "< 1 seg"
- One single entry point, everything flows
- Total time: **"15 min/dia — apenas validação"**
- Error rate: **"< 1% (validação automática)"**
- A small "person" icon now reviewing a dashboard calmly

**Key insight:** *"O mesmo processo, sem copiar um único valor à mão. 2h45 por dia devolvidas à equipa operacional."*

---

### 3.3 Modal 3 — "Zero Visibilidade Sobre Custos Reais"

**Context line:** *"O diretor de uma empresa alimentar demora 4 horas por semana a montar relatórios de custos."*

**ANTES (The Problem):**
Mock of scattered, disconnected data:
- Company: **"Costa & Martins Alimentar, Lda."** (fictional)
- Visual: 3-4 overlapping "documents" (styled like paper sheets) with:
  - A PDF icon: "Relatório_Custos_Fev_v3_FINAL_v2.pdf"
  - An Excel icon: "Margens_2026_backup_pedro.xlsx"
  - An email snippet: "Segue em anexo os números atualizados (acho)"
  - A post-it note: "Perguntar ao Carlos os valores da linha 3"
- Below: a question mark with text: "Margem real da Linha A? Ninguém sabe dizer com certeza."
- Metric box (grayed out): "Custo/unidade: ???"

**DEPOIS (The Solution):**
Mock of a real-time dashboard:
- Clean dashboard with 3 KPI cards at top:
  - "Margem Bruta Linha A: **34.2%**" (green arrow up)
  - "Custo/Unidade Médio: **€2.47**" (stable, blue)
  - "Eficiência Produção: **87%**" (yellow, with alert icon)
- A bar chart: "Margem por Linha de Produção" showing 4 bars (Linha A, B, C, D)
- A trend line: "Evolução Custo Matéria-Prima (últimos 6 meses)"
- Bottom: "Alerta: Linha C abaixo do objetivo de margem (< 20%)" with orange indicator
- Timestamp: "Dados atualizados em tempo real"

**Key insight:** *"De 4 horas a consolidar PDFs para respostas instantâneas. Decisões baseadas em dados, não em impressões."*

---

## 4. Technical Implementation Plan

### 4.1 Tech Approach
Pure HTML/CSS/JS — no dependencies. Consistent with the existing vanilla stack.

### 4.2 Files to Modify

| File | Changes |
|------|---------|
| `index.html` | Add "Experimentar" button to each problem-card. Add modal HTML at the bottom of `<body>` (3 modals). |
| `css/styles.css` | Add modal styles (overlay, container, responsive layout, before/after grid, mock spreadsheet styles, mock dashboard styles, mock workflow diagram styles). |
| `js/main.js` | Add modal open/close logic, ESC key handler, body scroll lock, focus trap for accessibility. |

### 4.3 Implementation Steps

#### Step 1 — Modal Infrastructure (CSS + JS)
- Create reusable `.tryout-modal` overlay and `.tryout-modal__content` container
- Implement open/close JS logic with data attributes (`data-modal="modal-1"`)
- Add fade animation (opacity + transform)
- Body scroll lock (`overflow: hidden` on `<body>`)
- ESC to close, backdrop click to close
- Focus trap (tab cycling within modal) for accessibility
- `aria-modal="true"`, `role="dialog"`, proper labeling

#### Step 2 — "Experimentar" Button on Cards
- Add a `<button class="tryout-btn" data-modal="tryout-1">Experimentar</button>` to each problem-card
- Style: outline button with orange border, hover fills orange
- Position: bottom of card, after the paragraph text
- Card needs slight padding adjustment to accommodate button

#### Step 3 — Modal 1: Spreadsheet Before/After
- **Before:** HTML table styled to look like a spreadsheet (`.mock-spreadsheet`)
  - Grid lines, cell colors, monospace font
  - `#REF!` error cell, comment bubble, colored warnings
  - 5-6 rows of fictional industrial product data
- **After:** Clean dashboard mockup (`.mock-dashboard`)
  - Status dots (green/yellow/red), clean table
  - Mini SVG chart (forecast vs actual)
  - Live indicator, alert badge
- All content in Portuguese

#### Step 4 — Modal 2: Manual Process Before/After
- **Before:** CSS flow diagram (`.mock-workflow`)
  - Boxes connected by arrows with warning icons
  - Time labels on each step
  - Error callout boxes
- **After:** Streamlined flow diagram
  - Same boxes, automated arrows with checkmarks
  - Time reduction highlighted
  - Error rate metric

#### Step 5 — Modal 3: Visibility Before/After
- **Before:** Overlapping document mockups (`.mock-documents`)
  - Styled paper sheets with file icons
  - Email snippet, post-it note
  - Unknown metric boxes
- **After:** Dashboard mockup (`.mock-kpi-dashboard`)
  - KPI cards with values and trend arrows
  - Bar chart (CSS-only or inline SVG)
  - Trend line (inline SVG)
  - Alert notification

#### Step 6 — Responsive Adjustments
- Desktop: side-by-side before/after (2-column grid)
- Tablet (< 1024px): still side-by-side but tighter
- Mobile (< 768px): stacked vertically (before on top, after below)
- Modal: max-width 900px on desktop, full-width with padding on mobile
- Mock elements scale down gracefully (fewer rows in tables, smaller charts)

#### Step 7 — Polish & Accessibility
- `prefers-reduced-motion`: disable fade animations
- Screen reader support: `aria-label` on modals, `sr-only` text for visual elements
- Keyboard navigation: focus returns to trigger button on close
- Test on mobile Safari, Chrome, Firefox
- Verify no layout shifts when opening/closing modals

---

## 5. Mock Data Guidelines

**Critical Rule:** All company names, person names, and data values are **fictional**. They should feel realistic for the Estarreja industrial context but must not reference any real entity.

### Fictional Company Names (pre-approved for use):
- **Sousa & Filhos, Metalurgia Lda.** — metalwork/steel
- **Ribeiro Plásticos Industriais** — plastic components
- **Costa & Martins Alimentar, Lda.** — food processing

### Fictional Person Names (for comments, notes):
- Pedro, Ana, Carlos, Marta, Rui

### Product/Data Examples:
- Industrial: Perfil Aço 40mm, Chapa Galvanizada 2mm, Tubo Inox 25mm, Parafuso M8, Flange DN50
- Plastic: Componente A-200, Caixa Técnica CT-15, Conector Rápido CR-8
- Food: Linha A (Conservas), Linha B (Congelados), Linha C (Embalamento), Linha D (Temperos)

### Numeric Values:
- Production quantities: 500-15000 units range
- Costs: EUR 1.20 - EUR 45.00 per unit range
- Margins: 15%-45% range
- Time savings: realistic (hours → minutes)
- Error rates: 5-12% → < 1%

---

## 6. Design Tokens (Consistent with Existing Site)

| Token | Value | Usage |
|-------|-------|-------|
| Primary accent | `#F47B20` (orange) | Buttons, highlights, "after" accents |
| Error/warning | `#e74c3c` | "Before" errors, broken formulas |
| Success | `#27ae60` | "After" indicators, improvements |
| Background overlay | `rgba(11, 29, 51, 0.75)` | Modal backdrop |
| Card background | `#f5f5f5` | Before mock containers |
| Dashboard background | `#ffffff` | After mock containers |
| Serif heading | `"Times New Roman", serif` | Modal titles |
| Sans body | `"Inter", sans-serif` | Modal body text |
| Monospace (spreadsheet) | `"Courier New", monospace` | Spreadsheet mock cells |

---

## 7. Content Localization

All modal content is in **Portuguese (PT-PT)**, matching the existing site:

| English concept | Portuguese text |
|----------------|-----------------|
| Try out | Experimentar |
| Before | Antes |
| After | Depois |
| Close | Fechar |
| Talk to us | Falar Connosco |
| Updated | Atualizado |
| Automatic | Automático |
| Alert | Alerta |
| Real margin | Margem real |
| Production line | Linha de produção |

---

## 8. Success Criteria

- [ ] Each problem-card has a visible "Experimentar" button
- [ ] Clicking the button opens the corresponding modal with before/after content
- [ ] Modals are accessible (keyboard nav, screen readers, focus management)
- [ ] Responsive: works on mobile, tablet, and desktop
- [ ] All data is fictional — no real company names, no real data
- [ ] Before/after contrast is immediately visible and compelling
- [ ] Each modal has a CTA linking to the contact section
- [ ] No external dependencies added (stays vanilla HTML/CSS/JS)
- [ ] Page load performance not degraded (modals are in the DOM but hidden)
- [ ] Animations respect `prefers-reduced-motion`

---

## 9. Estimated Effort by Step

| Step | Description | Complexity |
|------|-------------|-----------|
| 1 | Modal infrastructure (CSS + JS) | Medium |
| 2 | "Experimentar" button on cards | Low |
| 3 | Modal 1 — Spreadsheet mock | High (most visual detail) |
| 4 | Modal 2 — Workflow diagram mock | Medium |
| 5 | Modal 3 — Dashboard/KPI mock | High |
| 6 | Responsive adjustments | Medium |
| 7 | Polish & accessibility | Medium |

**Recommended order:** Steps 1 → 2 → 3 → 6 → 7 (validate full flow with one modal) → 4 → 5 (replicate pattern for remaining modals).

---

## 10. What This Does NOT Include

- No backend / server-side logic
- No real data connections or APIs
- No interactive calculators or user input fields inside modals
- No A/B testing infrastructure
- No analytics tracking (can be added later)
- No changes to other sections of the page

---

## 11. Open Questions for Review

1. **Animation style:** Should the before/after have a slider (drag to reveal) or be static side-by-side? Side-by-side is simpler and recommended.
2. **Scroll behavior inside modal:** If modal content exceeds viewport on mobile, should the modal itself scroll? (Recommended: yes, with internal scroll.)
3. **Button label:** "Experimentar" vs "Ver Exemplo" vs "Demonstração" — which resonates best with the target audience?
