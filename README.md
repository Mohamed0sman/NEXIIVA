<div align="center">

<img src="./public/assets/nexiiva_official_logo.png" alt="NEXIIVA Logo" width="420" />

### Industrial Process Operator Training Simulator (OTS)
**Bespoke Dynamic Digital Twins for Oil Refineries, Petrochemicals & Gas Plants**

[![React](https://img.shields.io/badge/React-19.0-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Security](https://img.shields.io/badge/OT%2FIT-Air--Gapped%20Purdue%20Level%202%2F3-emerald?style=flat-square)](https://nexiiva.com)
[![Showcase](https://img.shields.io/badge/GEF%202026-Cairo%20Official%20Showcase-purple?style=flat-square)](https://nexiiva.com)

[Live Web Demo](http://localhost:5173/) · [Report & Architecture](./docs/architecture.md) · [Request 90-Day Pilot](#commercial-tracks)

---

</div>

## 📌 Executive Summary

**NEXIIVA** solves the single biggest bottleneck in industrial process safety: **Over 80% of refinery and chemical units operate without operator training simulators (OTS)** because legacy vendors (Honeywell UniSim, Aspen HYSYS, Yokogawa OmegaLand) charge **$52,000 to $110,000+** per unit and take **6 to 9 months** of manual engineering.

NEXIIVA turns complex refinery P&ID blueprints into plant-specific, high-fidelity dynamic simulators in **~1 week** at **90% lower cost** (~$4.5K–$5.3K Year-1 launch or an $800 entry pilot), deployable **100% offline inside air-gapped refinery control rooms** or via an isolated private cloud.

---

## ⚡ Core Technical Innovations

### 1. Automated P&ID Neural Ingestion Engine
- Proprietary computer vision and equation synthesis engine parses raw refinery P&ID schematics.
- Auto-identifies equipment nodes, instrumentation loops, and control valves across **387 equipment types**.
- Compiles rigorous thermodynamic equations of state (Peng-Robinson EOS, Antoine equations, Bernoulli hydraulics) in days rather than months.

### 2. Dual-Screen DCS Control Room Workstation
- **Interactive PFD Simulator**: Live atmospheric distillation column (CDU-100) with dynamic tray temperatures, vapor/liquid mass balances, and clickable PID faceplates.
- **Authentic Software Inspection**: Direct inspection of real running production screens from the pitch deck (`CDU/VDU Console`, `OTS Builder Canvas`, `12 Live Trend Charts`).
- **Playable 30-Second Crisis Drill**: Real-time incident response drill (Reflux pump trip & overpressure) with flashing alarms, audible DCS klaxons, and automated competency certification.

### 3. The 387 Industrial Equipment Codex
- Covers 19 industrial process domains:
  - **Fractionation & Separation** (Atmospheric towers, vacuum towers, debutanizers).
  - **Fired Heaters & Heat Transfer** (Cabin furnaces, thermosiphon reboilers, shell-and-tube exchangers).
  - **Rotating Machinery** (Centrifugal pumps, multi-stage wet gas compressors).
  - **Instrumentation & Control** (Split-range pressure controllers, cascade loops).
  - **Safety & Relief Systems** (SIL-3 emergency shutdown matrices, PSV relief valves).

### 4. 100% Air-Gapped OT/IT Cybersecurity Architecture
- Runs on a compact **2U ruggedized local server** installed on the plant's internal training network.
- **Zero internet connection required**; zero P&ID proprietary drawings or operational telemetry ever leave the refinery perimeter (Purdue Model Level 2/3).
- Optional **Isolated Private Cloud VPC** for regional training centers and engineering academies.

---

## 📊 Boardroom Economics vs. Legacy Vendors

| Metric | Legacy Vendors (Honeywell / AspenTech) | Specialist Simulators | NEXIIVA Platform |
| :--- | :--- | :--- | :--- |
| **First-Year Cost** | ~$110,000+ per unit | $52,000 – $73,000 | **~$4.5K – $5.3K** (or **$800 Pilot**) |
| **Delivery Time** | 6 to 9 Months | 3 to 5 Months | **~1 Week (7 Days)** |
| **P&ID Customization** | Expensive add-on consulting | Limited | **Full plant-specific P&ID match** |
| **Air-Gap Capability** | Heavy hardware lock-in | Complex setup | **100% Offline Local Rack Server** |
| **Annual Renewal** | $25,000+ / year | $12,000+ / year | **$800 / year flat** |

---

## 🎯 Commercial Tracks

1. **Refinery Evaluation Pilot**: **$800** (3-month evaluation on a core unit).
2. **Cloud OTS Deployment**: **$5,180 Year 1** ($1K config + $1K unit build + $600 training + $800/yr renewal + $10/trainee-hr).
3. **On-Premise Air-Gapped OTS**: **$5,320 Year 1** ($4K unit build + $1K/station + $600 training).
4. **Training Centers & Academies**: Volume seat licensing ($100–$500 per trainee).

---

## 👨‍💼 Founder & Engineering Pedigree

**Eng. Mostafa Adel** — Founder & Lead Process Architect
- **10+ years frontline operations and process engineering**:
  - **MIDOR Refinery** (Middle East Oil Refinery, Alexandria) — Egypt's most complex conversion refinery.
  - **TCI Sanmar Chemicals** (Port Said) — Largest caustic soda/chlorine facility in the MENA region.
  - **Agiba Petroleum Company** — Western Desert oil & gas production and processing.
  - **Port Harcourt Refinery (Nigeria)** — Rehabilitation, revamp & DCS commissioning.

> *"When a crude charge pump trips at 3:00 AM, operators don't need a 500-page manual. They need muscle memory trained on exact unit dynamics."*

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: React 19 + TypeScript 5.5 + Vite 6
- **Styling & Theme**: Tailwind CSS 3.4 (Deep Cosmos Obsidian `#03050C` / `#04060E`, Electric Violet `#8E42FE`, Royal Cobalt Blue `#3361FC`, Cyan `#06B6D4`)
- **Sound Engine**: Web Audio API Procedural Synthesizer (`utils/audio.ts`) for tactile relay switches and DCS alarms
- **Icons**: Lucide React
- **Bilingual Engine**: Context-driven real-time English and Arabic (RTL) localization (`Cairo` & `Inter` typography)

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- Node.js 18+ or 20+
- npm 9+

### Installation & Run

```bash
# 1. Clone repository
git clone https://github.com/Mohamed0sman/NEXIIVA.git
cd NEXIIVA

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 📜 Intellectual Property & Notice

© 2026 NEXIIVA Simulation Technologies. All rights reserved.  
Official Showcase Project for the **Entrepreneurs Investment Program (EIP)** · **GEF 2026 Cairo**.
