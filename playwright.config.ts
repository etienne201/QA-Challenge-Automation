import { defineConfig } from '@playwright/test';
import path from 'path';

// Résolution du chemin absolu vers le fichier globalSetup.ts
const globalSetupPath = path.resolve(__dirname, 'globalSetup.ts');

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 }
  },
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox', use: { browserName: 'firefox' } },
    { name: 'WebKit', use: { browserName: 'webkit' } }
  ],
  // IMPORTANT: Indiquer le chemin vers le fichier TS pour globalSetup
  globalSetup: globalSetupPath,
});
