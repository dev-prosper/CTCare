# CTCare: Sick Leave Management System

CTcare is an internal web application designed to help employees, managers, and HR teams efficiently manage sick leave. It replaces manual email and spreadsheet processes with a single source of truth fully integrated into the Microsoft 365 ecosystem.

---

## The Team

- Olamileka Abolade
- Mimidoo Ucheagwu
- Dorathy Osuman
- Angelo Akuhwa
- Prosper Ikechukwu

These limitations cause errors, delays, and lack of transparency in sick leave management.

---

## Problem We're Solving

- Employees submit sick leave requests via email.
- Managers and HR track leave balances manually using Excel.
- Doctor’s notes are scattered as attachments without centralized management.
- No real-time visibility on balances, approvals, or leave trends.

These limitations cause errors, delays, and lack of transparency in sick leave management.

---

## Our Solution

CTcare offers a streamlined, automated platform:

- **Employee self-service:** Request sick leave, view balances, and upload doctor’s notes.
- **Manager view:** Approve/reject requests, see team calendars, and identify overlaps.
- **HR dashboard:** Monitor requests globally, track balances, generate reports, and configure leave policies.
- **Automation:** Notifications via Email and Teams, calendar sync with Outlook/Teams, secure attachment handling.
- **Reporting:** Insights on usage trends, absenteeism, and entitlement breaches.

---

## Project Overview

This project is a modern, production-ready Nextjs starter kit that includes:

* **NextJS** with **TypeScript**
* **Tailwind CSS** for utility-first styling
* **ShadCN UI** for pre-built components
* **Zustand** for global state management
* **React Query** for server state and data fetching
* **Axios** for request handling
* **Husky** for commit linting

This setup accelerates feature development and enforces consistency across UIs.

---

## Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js** (v18.x LTS or higher)
* **pnpm** (preferred)

  * Install via Corepack: `corepack enable && corepack prepare pnpm@latest --activate`
* **Git** for version control

If using **npm** or **yarn**, commands below can be adjusted accordingly.

---

## Getting Started

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/dev-prosper/CT-Care.git
cd ct-care
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Variables

Create a `.env` file in the project root containing:

```ini
NEXT_PUBLIC_API_BASE_URL=https://api.yourservice.com
```

### 4. Run the Development Server

```bash
pnpm dev
```

Open your browser to [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

* **`pnpm dev`** – start Vite development server
* **`pnpm build`** – build production assets
* **`pnpm preview`** – preview the production build locally
* **`pnpm lint`** – run ESLint check
* **`pnpm format`** – run Prettier formatting
* **`pnpm test`** – run tests (Vitest + React Testing Library)

Adjust scripts in `package.json` as needed.

---

## Folder Structure

```text
src/
├── app/       #pages and layouts
├── components/       # Reusable UI components (Button, TextInput, Card, etc.)
├── services/            # axiosInstance and refresh-service
├── constants/          # constant details
├── services/         # HTTP client & API wrappers
│   └── httpClient.ts
├── schema/          # schemas for requests  (e.g. ToastProvider)
├── types/          # type interfaces
├── store/          # Zustand store
├── public/          # public files e.g Images
```

