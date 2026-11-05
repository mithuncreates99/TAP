import { test, expect } from '@playwright/test';

test('desktop header, navigation, and hero stay in their own layout', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.goto('/');
  await expect(page).toHaveTitle(/Thelma Agnes Peter/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();

  const positions = await page.evaluate(() => {
    const header = document.querySelector('header').getBoundingClientRect();
    const heading = document.querySelector('h1').getBoundingClientRect();
    return { headerBottom: header.bottom, headingTop: heading.top };
  });
  expect(positions.headingTop).toBeGreaterThanOrEqual(positions.headerBottom);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(pageErrors).toEqual([]);
});

test('interactive stage, case studies, and showcase tabs respond to clicks', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.goto('/');

  const stage = page.locator('#interactive-hero');
  await stage.getByRole('button', { name: /Left: CRM & Automation/ }).click();
  await expect(stage.getByRole('heading', { name: 'End-to-End Requirements & Workflow Automation' })).toBeVisible();

  await stage.getByRole('button', { name: /Right: BI & Photography/ }).click();
  await expect(stage.getByRole('heading', { name: 'Executive BI Storytelling & SLA Optimization' })).toBeVisible();

  const firstCase = page.locator('#case-studies article').first();
  await firstCase.getByRole('button', { name: 'Workflow Architecture' }).click();
  await expect(firstCase.getByText('System & Data Pipeline Architecture')).toBeVisible();
  await firstCase.getByRole('button', { name: 'Executive Summary' }).click();
  await expect(firstCase.getByText('1. Business Problem')).toBeVisible();

  const showcase = page.locator('#framing-the-data');
  await showcase.getByRole('button', { name: 'Executive BI Dashboards' }).click();
  await expect(showcase.getByRole('heading', { name: 'Featured BI & Analytics Engineering Portfolio' })).toBeVisible();
  await showcase.getByRole('button', { name: 'Award Photojournalism' }).click();
  await expect(showcase.getByRole('heading', { name: 'How Award-Winning Photojournalism Elevates Dashboard UX' })).toBeVisible();
});

test('CV and both video assets are published', async ({ page, request }) => {
  await page.goto('/');
  const cvResponse = await request.get('/Thelma_Agnes_Peter_CV_ATS.pdf');
  expect(cvResponse.status()).toBe(200);
  expect(cvResponse.headers()['content-type']).toContain('application/pdf');

  for (const asset of ['/assets/hero_left_center.mp4', '/assets/hero_right.mp4']) {
    const response = await request.get(asset);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('video/mp4');
  }

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download CV' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('Thelma_Agnes_Peter_CV_ATS.pdf');
});

test('mobile layout has no horizontal overflow and stage controls remain usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download CV' })).toBeVisible();

  const positions = await page.evaluate(() => {
    const header = document.querySelector('header').getBoundingClientRect();
    const heading = document.querySelector('h1').getBoundingClientRect();
    return {
      width: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
      headerBottom: header.bottom,
      headingTop: heading.top,
    };
  });
  expect(positions.width).toBeLessThanOrEqual(positions.viewport);
  expect(positions.headingTop).toBeGreaterThanOrEqual(positions.headerBottom);

  const stage = page.locator('#interactive-hero');
  await expect(stage.locator('.absolute.bottom-3.left-3.right-3')).toBeVisible();
  await expect(stage.locator('.pointer-events-none.absolute.bottom-3.right-3')).toBeHidden();
  await stage.getByRole('button', { name: 'CRM' }).click();
  await expect(stage.getByRole('heading', { name: 'End-to-End Requirements & Workflow Automation' })).toBeVisible();
});
