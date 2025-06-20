import fs from 'fs';
import path from 'path';

export default async function globalSetup() {
  const resultsDir = path.resolve(__dirname, 'allure-results');

 
  if (fs.existsSync(resultsDir)) {
    fs.rmSync(resultsDir, { recursive: true, force: true });
  }

  fs.mkdirSync(resultsDir, { recursive: true });

 

  const envFilePath = path.join(resultsDir, 'environment.properties');
  fs.writeFileSync(
    envFilePath,
    `BROWSER=chromium,firefox,webkit
BROWSER_VERSION=latest
BASE_URL=https://qa-assessment.pages.dev/
TEST_ENV=local\n`
  );

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

 
  const historyDir = path.join(resultsDir, 'history');
  fs.mkdirSync(historyDir, { recursive: true });
}
 