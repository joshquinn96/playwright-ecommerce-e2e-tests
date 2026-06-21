import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 0,
  
  /* Maximum time one test can run for. */
  timeout: 60 * 1000,
  expect: {
    timeout: 10000
  },
  
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    trace: 'on', // off, on
  },
});
