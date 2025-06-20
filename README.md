# QA Playwright Automation

End-to-end test automation using Playwright with TypeScript, integrated with Allure reporting and results management.

---

## Prerequisites

- Node.js (recommended version >=16.x)
- [PNPM](https://pnpm.io/) package manager
- Allure CLI installed globally or accessible via PNPM (to generate and view reports)

---

## Installation

1. Clone the repository
```bash
git clone <REPOSITORY_URL>
cd <PROJECT_NAME>
```
2. Install dependencies with PNPM

```bash
pnpm install
```
## Project Structure
tests/ - Contains Playwright test files written in TypeScript

pages/ - Contains Page Object Models for better test organization

utils/ - Contains utility scripts such as Allure setup before tests

allure-results/ - Auto-generated folder with raw test results for Allure

reports/ - Generated Allure report output folder

## Available Scripts
| Command                | Description                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| `pnpm run test`        | Clean Allure results, prepare environment, and run tests headless |
| `pnpm run test:headed` | Run tests with browser UI (headed mode)                           |
| `pnpm run report`      | Generate and open the Allure report from latest test results      |
## Configuration
playwright.config.ts
Defines test settings such as browsers (Chromium, Firefox, WebKit), timeouts, retries, and reporters (including Allure).






 


 
