# Southern Haulers SOTA Platform

This quick start guide walks you through setting up the development environment for the
Southern Haulers state‑of‑the‑art logistics platform. The project is organized as a mono‑repo using
npm workspaces. Each logical area of the platform lives in its own package or app.

## Prerequisites

* **Node.js 18+** – Install from [nodejs.org](https://nodejs.org/). We recommend using `nvm` or similar
  version managers.
* **npm** – Comes bundled with Node.js. Yarn or pnpm may work but are not officially supported here.
* **Git** – To clone this repository and contribute.

## Repository Structure

```
.
├── apps
│   ├── web         # Public marketing site + portals (client, admin, driver, enterprise, quote‑crm)
│   ├── admin       # Placeholder for a dedicated admin UI (future)
│   ├── driver      # Placeholder for the driver PWA (future)
│   ├── recruiting  # Placeholder for AI recruiting dashboards (future)
│   └── quote-crm   # Placeholder for the proprietary CRM/CPQ (future)
├── packages
│   ├── ui          # Shared React components and design tokens
│   ├── db          # Database client abstractions (Supabase/Postgres)
│   └── auth        # Authentication helpers (WorkOS integration)
├── integration
│   └── portpro     # Feature‑flagged PortPro API client and webhooks
├── docs            # Project documentation
└── ...
```

## Getting Started

1. **Install dependencies**

   Run the following in the root of the repository:

   ```bash
   npm install
   ```

   This installs dev dependencies at the root. The individual apps (e.g. `apps/web`) specify their own
   dependencies; you can install them individually if required.

2. **Run the web app**

   The `apps/web` package hosts the public site and portals. To start it in development mode:

   ```bash
   cd apps/web
   npm install # install its dependencies (Next.js, React)
   npm run dev
   ```

   This will launch Next.js on [http://localhost:3000](http://localhost:3000). Explore the home page and
   placeholders for the various portals.

3. **Next Steps**

   The current codebase provides placeholders and a basic design system. The real power of the
   Southern Haulers platform will come from implementing:

   * Supabase database schemas and row‑level security policies in `packages/db`.
   * WorkOS authentication flows in `packages/auth`.
   * Live dashboards and agentic workflows in the web app pages.
   * PortPro API integration under `integration/portpro` when the `PORTPRO_ENABLED` flag is true.

Refer to the architectural guidelines in the project README for more details on how to structure
features as you build them. Feel free to open issues or pull requests as you expand this platform.