import { test, expect } from '@playwright/test';

test('the homepage presents a business and operations professional profile', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page).toHaveTitle(/Thelma Agnes Peter/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('complex work');
  await expect(page.getByText('Business and Research Analyst', { exact: false }).first()).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download CV' }).first()).toBeVisible();

  const positions = await page.evaluate(() => ({
    headerBottom: document.querySelector('header').getBoundingClientRect().bottom,
    headingTop: document.querySelector('h1').getBoundingClientRect().top,
    scrollWidth: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  expect(positions.headingTop).toBeGreaterThanOrEqual(positions.headerBottom);
  expect(positions.scrollWidth).toBeLessThanOrEqual(positions.viewport);
  expect(pageErrors).toEqual([]);
});

test('professional experience is public-safe and retains the three employers', async ({ page }) => {
  await page.goto('/');
  const experience = page.locator('#experience');
  await expect(experience.getByRole('heading', { name: 'KLA' })).toBeVisible();
  await expect(experience.getByRole('heading', { name: 'Stellantis' })).toBeVisible();
  await expect(experience.getByRole('heading', { name: 'Bible Tours' })).toBeVisible();
  await expect(experience.getByText('Oct 2024 – Mar 2025')).toBeVisible();
  await expect(experience.getByText('Jun 2023 – Jun 2024')).toBeVisible();
  await expect(experience.getByText('Mar 2025 – Present')).toBeVisible();

  const publicCopy = await page.locator('body').innerText();
  for (const term of [
    'Site24x7',
    'OpManager',
    'Applications Manager',
    'ServiceNow / Resolve',
    'Reduced infrastructure downtime by 15%',
    'Employee Performance & HR Analytics Suite',
    'Synthetic Operations Analytics Dashboard',
    'CRM Lead Routing',
  ]) {
    expect(publicCopy).not.toContain(term);
  }
  await expect(experience.getByText('confidential project details are not reproduced')).toBeVisible();
});

test('professional strengths, education, certifications and recognition are visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#strengths').getByRole('heading', { name: 'Professional strengths' })).toBeVisible();
  await expect(page.locator('#strengths').getByText('Business Analysis')).toBeVisible();
  await expect(page.locator('#strengths').getByText('Operations & Coordination')).toBeVisible();
  await expect(page.locator('#strengths').getByText('Research & Reporting')).toBeVisible();

  const education = page.locator('#education');
  await expect(education.getByText('B.Tech — Computer Science & Business Systems')).toBeVisible();
  await expect(education.getByText('8.91 / 10')).toBeVisible();
  await expect(education.getByText('AI-Powered Business Analyst Professional')).toBeVisible();

  const recognition = page.locator('#recognition');
  await expect(recognition.getByText('9+ awards')).toBeVisible();
  await expect(recognition.getByText('Best International Press Photojournalist at SSN University MUN (2023)')).toBeVisible();
  await expect(recognition.getByText('Vice President — Camogenics & Department of CSE')).toBeVisible();
});

test('CV is available as a downloadable PDF', async ({ page, request }) => {
  await page.goto('/');
  const cvResponse = await request.get('/Thelma_Agnes_Peter_CV_ATS.pdf');
  expect(cvResponse.status()).toBe(200);
  expect(cvResponse.headers()['content-type']).toContain('application/pdf');

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download CV' }).first().click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('Thelma_Agnes_Peter_CV_ATS.pdf');
});

test('mobile navigation scrolls to the main profile sections', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const mobileNav = page.getByRole('navigation', { name: 'Mobile and tablet navigation' });

  for (const [label, selector] of [
    ['Experience', '#experience'],
    ['Strengths', '#strengths'],
    ['Education', '#education'],
    ['Recognition', '#recognition'],
  ]) {
    await mobileNav.getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(selector.slice(1)));
    const offset = await page.evaluate((targetSelector) => ({
      headerBottom: document.querySelector('header').getBoundingClientRect().bottom,
      targetTop: document.querySelector(targetSelector).getBoundingClientRect().top,
    }), selector);
    expect(offset.targetTop).toBeGreaterThanOrEqual(offset.headerBottom - 1);
  }
});

test('common phone, tablet and desktop widths have no horizontal overflow', async ({ page }) => {
  const widths = [320, 360, 375, 390, 414, 430, 640, 768, 820, 1024, 1280, 1440];
  await page.goto('/');

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    const layout = await page.evaluate(() => {
      const header = document.querySelector('header').getBoundingClientRect();
      const hero = document.querySelector('h1').getBoundingClientRect();
      const mobileNav = document.querySelector('nav[aria-label="Mobile and tablet navigation"]');
      const desktopNav = document.querySelector('nav[aria-label="Primary navigation"]');
      return {
        width: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
        headerRight: header.right,
        heroLeft: hero.left,
        heroRight: hero.right,
        mobileNavVisible: mobileNav ? getComputedStyle(mobileNav).display !== 'none' : false,
        desktopNavVisible: desktopNav ? getComputedStyle(desktopNav).display !== 'none' : false,
      };
    });
    expect(layout.width, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(width);
    expect(layout.headerRight).toBeLessThanOrEqual(width);
    expect(layout.heroLeft).toBeGreaterThanOrEqual(0);
    expect(layout.heroRight).toBeLessThanOrEqual(width);
    if (width < 768) expect(layout.mobileNavVisible).toBe(true);
    if (width >= 768) expect(layout.desktopNavVisible).toBe(true);
  }
});
