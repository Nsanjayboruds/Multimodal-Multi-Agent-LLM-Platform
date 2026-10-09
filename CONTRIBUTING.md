# Contributing to E.D.I.T.H. AI

First off, thank you for considering contributing to E.D.I.T.H. AI! It's people like you that make open-source software such a great community.

## 🧠 Project Architecture Overview

E.D.I.T.H. AI is a multi-agent system built on a microservices architecture. Before contributing, please familiarize yourself with the [System Architecture](./docs/ARCHITECTURE.md).

- **Frontend:** React, Vite, Tailwind CSS, Redux.
- **Backend Services:** Node.js, Express, LangGraph, MongoDB, Redis.
- **Gateway:** Proxies traffic from the frontend to the isolated microservices (`:9001` to `:9004`).

## 🛠️ Local Development Setup

To contribute, you'll need to run the entire stack locally. 

1. **Fork & Clone** the repository.
2. Ensure you have **Redis** running locally on port `6379`.
3. Create all required `.env` files across the 6 directories as documented in the [README.md](./README.md).
4. Start the backend: `cd backend && npm install && npm run dev`
5. Start the frontend: `cd frontend && npm install && npm run dev`

---

## 🌱 Branching Strategy

We follow a strict branching model:

- `main` — Production-ready, stable code. Do not push directly to main.
- `develop` — The active development branch. 
- **Feature Branches** — Branched from `develop`. 
  - Naming convention: `feat/your-feature-name` or `fix/your-bug-fix`.

---

## 💻 Coding Standards

### Frontend (React/Vite)
- Use Functional Components and React Hooks exclusively.
- Styling is strictly handled via **Tailwind CSS**. Avoid inline styles or custom CSS files unless absolutely necessary.
- Ensure all UI components follow the dark, glassmorphic design language of the project.

### Backend (Node.js)
- Ensure all API routes are fully documented in `docs/API.md` if modified.
- All microservices use standard ES Modules (`import`/`export`).
- Always handle errors gracefully and pass them to the Express `next()` middleware to prevent microservice crashes.

---

## 📝 Commit Message Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages. This helps automatically generate changelogs.

**Format:**
```
<type>[optional scope]: <description>
```

**Allowed Types:**
- `feat:` A new feature.
- `fix:` A bug fix.
- `docs:` Documentation only changes.
- `style:` Changes that do not affect the meaning of the code (white-space, formatting, etc).
- `refactor:` A code change that neither fixes a bug nor adds a feature.
- `perf:` A code change that improves performance.
- `test:` Adding missing tests or correcting existing tests.

**Example:**
`feat(agent): add audio transcription agent`

---

## 🚀 Submitting a Pull Request

1. Push your branch to your fork: `git push origin feat/your-feature-name`
2. Open a Pull Request targeting the `develop` branch.
3. Ensure your PR description clearly describes the problem and solution.
4. Wait for a maintainer to review your code! We aim to review PRs within 48 hours.
