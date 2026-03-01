# Civilian Law of Knowledge

A mobile app that helps incarcerated individuals, families, and civilians understand the legal system, organize their documents, and learn their rights through educational tools and AI explanations.

> **Disclaimer:** This app provides educational information only. It does not constitute legal advice. Always consult a qualified attorney for your specific legal situation.

---

## Features

| Feature | Description |
|---|---|
| **Know Your Rights** | Constitutional protections explained in plain language |
| **Law Library** | Searchable database of laws and rights by category |
| **My Case** | Track charges, court dates, contacts, and notes locally |
| **Document Wallet** | Organize legal document metadata (Affidavit, Docket, Disposition, Probation, Expungement, Other) |
| **Grievance Filing** | Step-by-step guides, templates, and state-specific processes |
| **Family Support** | Resources for housing, food, jobs, reentry, and rehab alternatives |
| **Ask AI** | Educational AI assistant for legal questions |
| **Profile** | User name, privacy toggles, saved document/case counts |
| **Inmate Search** | Links to all 50 state DOC portals + federal BOP |
| **Law Alerts** | Recent legal updates with priority flags |

---

## Tech Stack

- **Expo** (React Native) — cross-platform mobile + web
- **TypeScript** — full type safety
- **Expo Router** — file-based navigation with Bottom Tabs
- **AsyncStorage / SecureStore** — local-only data persistence
- **NativeWind (Tailwind CSS)** — dark-theme UI with gold accent
- **tRPC + React Query** — typed API layer
- **Vitest** — unit tests

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) v9+ (`npm install -g pnpm`)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- Expo Go app on your iOS / Android device **or** a simulator

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/Civilian-app-of-law-knowledge/Civilian-app-of-law-knowlege.git
cd Civilian-app-of-law-knowlege
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables (optional — only needed for AI assistant)

```bash
cp .env.example .env   # if .env.example exists
# Add your API keys if needed
```

The AI assistant tab works with a local dev server. Without configuration it will return a helpful error message.

### 4. Start the development server

```bash
pnpm dev
```

This starts both the Metro bundler (Expo) and the local Express/tRPC server concurrently.

- **Mobile:** Scan the QR code with Expo Go
- **Web:** Open [http://localhost:8081](http://localhost:8081) in your browser

### 5. Run on a specific platform

```bash
pnpm run android    # Android emulator
pnpm run ios        # iOS simulator (macOS only)
```

---

## Project Structure

```
app/                    # Expo Router screens (file-based routing)
  (tabs)/               # Bottom tab screens
    index.tsx           # Home
    search.tsx          # Inmate & case search
    family.tsx          # Family support hub
    rights.tsx          # Law library / Know Your Rights
    assistant.tsx       # Ask AI chat interface
    profile.tsx         # User profile & privacy settings
  my-case/              # Legal case tracker screens
  document-wallet.tsx   # Document wallet screen
  grievances.tsx        # Grievance filing guide
  ...                   # 50+ other educational screens

components/             # Reusable UI components
  screen-container.tsx
  footer.tsx
  ui/
    icon-symbol.tsx

constants/
  theme.ts              # Color palette

data/
  legal-content.ts      # All mock/seed data (rights, law updates, facilities, etc.)

hooks/
  use-colors.ts         # Theme color hook

lib/
  case-storage.ts       # AsyncStorage CRUD for cases, court dates, contacts
  document-wallet.ts    # AsyncStorage CRUD for document wallet + user profile
  calendar-sync.ts      # Expo Calendar integration
  notifications.ts      # Expo Notifications scheduling
  case-sharing.ts       # QR code case sharing

server/
  routers.ts            # tRPC router (AI assistant, auth)
  _core/                # Express server, LLM integration

tests/                  # Vitest unit tests
```

---

## Running Tests

```bash
pnpm test
```

---

## Linting & Type Checking

```bash
pnpm lint          # ESLint
pnpm check         # TypeScript type check
pnpm format        # Prettier
```

---

## Navigation

The app uses Expo Router with a **bottom tab** layout:

| Tab | Icon | Description |
|---|---|---|
| Home | 🏠 | Dashboard with quick actions and law updates |
| Search | 🔍 | Inmate & case search across all 50 states |
| Family | ❤️ | Family support resources |
| Rights | 🛡️ | Law library and constitutional rights |
| Ask AI | 💬 | Educational AI legal assistant |
| Profile | 👤 | User profile & privacy settings |

---

## Data & Privacy

- **All user data is stored locally** on the device using AsyncStorage / SecureStore.
- No personal information is uploaded to any server.
- The app does not require account creation or login.
- The AI assistant sends only the text of your question to the server; no identifying information.

---

## Design

- **Dark background** (`#0D0D0D`) with **gold accent** (`#C9A84C`)
- Rounded cards with border highlights
- Accessible text sizes and contrast ratios
- Fully responsive for mobile and web

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is for educational purposes. See [LICENSE](LICENSE) for details.
