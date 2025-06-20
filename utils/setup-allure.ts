// File: utils/setup-allure.ts
import fs from 'fs';
import path from 'path';

const resultsDir = path.resolve(__dirname, '../allure-results');

// Step 0: Clean previous allure-results folder
if (fs.existsSync(resultsDir)) {
  fs.rmSync(resultsDir, { recursive: true, force: true });
}
fs.mkdirSync(resultsDir, { recursive: true });

// Step 1: Write environment.properties
const envFilePath = path.join(resultsDir, 'environment.properties');
fs.writeFileSync(
  envFilePath,
  `BROWSER=chromium,firefox,webkit
BROWSER_VERSION=latest
BASE_URL=https://qa-assessment.pages.dev/
TEST_ENV=local\n`
);

// Step 2: Write executor.json
const executorPath = path.join(resultsDir, 'executor.json');
fs.writeFileSync(
  executorPath,
  JSON.stringify(
    {
      name: 'Playwright CLI',
      type: 'playwright',
      url: 'https://qa-assessment.pages.dev/',
      buildName: 'Local Cross-Browser Test',
      buildUrl: 'http://localhost:59812',
      reportName: 'User Profile Automation Report',
    },
    null,
    2
  )
);

// Step 3: Ensure history directory exists
const historyDir = path.join(resultsDir, 'history');
fs.mkdirSync(historyDir, { recursive: true });
