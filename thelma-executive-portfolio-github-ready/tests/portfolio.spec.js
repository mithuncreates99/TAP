import { test, expect, devices } from '@playwright/test';

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
  await stage.getByRole('button', { name: /Left: CRM Workflow Demo/ }).click();
  await expect(stage.getByRole('heading', { name: 'CRM Lead Routing & SLA Simulator' })).toBeVisible();

  await stage.getByRole('button', { name: /Right: Independent Analytics Demo/ }).click();
  await expect(stage.getByRole('heading', { name: 'Retail Operations & Fulfilment Dashboard' })).toBeVisible();

  const firstExperience = page.locator('#case-studies article').first();
  await expect(firstExperience.getByRole('heading', { name: 'KLA' })).toBeVisible();
  await firstExperience.getByRole('button', { name: 'Key Contributions' }).click();
  await expect(firstExperience.getByText('Transferable Contributions (High-Level)')).toBeVisible();
  await firstExperience.getByRole('button', { name: 'Role Overview' }).click();
  await expect(firstExperience.getByText('1. Role Context')).toBeVisible();

  const showcase = page.locator('#framing-the-data');
  await showcase.getByRole('button', { name: 'CRM Workflow Simulator' }).click();
  await showcase.getByLabel('Estimated budget (€)').fill('80000');
  await showcase.getByLabel('Lead source').selectOption('Referral');
  await showcase.getByRole('button', { name: 'Run routing simulation' }).click();
  await expect(showcase.getByText('Priority queue', { exact: true })).toBeVisible();
  await showcase.getByRole('button', { name: 'Operations Analytics' }).click();
  await expect(showcase.getByRole('heading', { name: 'Synthetic Operations Analytics Dashboard' })).toBeVisible();
  await showcase.getByLabel('Region').selectOption('East');
  await expect(showcase.getByText('291', { exact: true })).toBeVisible();
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
  await expect(page.getByRole('link', { name: 'CV', exact: true })).toBeVisible();

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
  await expect(stage.getByRole('heading', { name: 'CRM Lead Routing & SLA Simulator' })).toBeVisible();
});


test('mobile and tablet widths keep the header, hero, and page inside the viewport', async ({ page }) => {
  const widths = [320, 360, 375, 390, 414, 430, 640, 768, 820, 1024, 1280, 1440];
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    const layout = await page.evaluate(() => {
      const rect = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const r = element.getBoundingClientRect();
        return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height };
      };
      const mobileNav = document.querySelector('nav[aria-label="Mobile and tablet navigation"]');
      const zoneControls = document.querySelector('#interactive-hero video')?.parentElement?.querySelector('div.absolute.top-2');
      const proofCard = document.querySelector('#interactive-hero video')?.parentElement?.querySelector('div.absolute.bottom-3.left-3.right-3');
      const ctas = [...document.querySelectorAll('[data-testid="hero-ctas"] a')].map((el) => {
        const r = el.getBoundingClientRect();
        return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, height: r.height };
      });
      return {
        width: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
        header: rect('header'),
        brand: rect('header a[href="#interactive-hero"]'),
        cv: rect('header a[download]'),
        mobileNavVisible: mobileNav ? getComputedStyle(mobileNav).display !== 'none' : false,
        mobileNav: rect('nav[aria-label="Mobile and tablet navigation"]'),
        navItems: mobileNav ? [...mobileNav.querySelectorAll('a')].map((el) => {
          const r = el.getBoundingClientRect();
          return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, height: r.height };
        }) : [],
        zoneControls: rect('#interactive-hero video') ? (() => {
          const r = zoneControls.getBoundingClientRect();
          return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, height: r.height };
        })() : null,
        proofCard: rect('#interactive-hero video') ? (() => {
          const r = proofCard.getBoundingClientRect();
          return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, height: r.height };
        })() : null,
        ctas,
        stage: rect('#interactive-hero video'),
      };
    });

    expect(layout.width, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(width);
    expect(layout.header.right).toBeLessThanOrEqual(width);
    expect(layout.brand.left).toBeGreaterThanOrEqual(0);
    expect(layout.cv.right).toBeLessThanOrEqual(width);
    expect(layout.cv.left).toBeGreaterThanOrEqual(layout.brand.right - 1);
    expect(Math.abs(layout.cv.top - layout.brand.top)).toBeLessThan(10);
    expect(layout.mobileNavVisible, `mobile/tablet nav hidden at ${width}px`).toBe(true);
    expect(layout.mobileNav.top).toBeGreaterThanOrEqual(Math.max(layout.brand.bottom, layout.cv.bottom) - 1);
    for (const item of layout.navItems) {
      expect(item.left).toBeGreaterThanOrEqual(0);
      expect(item.right).toBeLessThanOrEqual(width);
      expect(item.height).toBeGreaterThanOrEqual(44);
    }
    for (const cta of layout.ctas) {
      expect(cta.left).toBeGreaterThanOrEqual(0);
      expect(cta.right).toBeLessThanOrEqual(width);
      expect(cta.height).toBeGreaterThanOrEqual(44);
    }
    expect(layout.zoneControls.height).toBeGreaterThanOrEqual(44);
    expect(layout.proofCard.left).toBeGreaterThanOrEqual(0);
    expect(layout.proofCard.right).toBeLessThanOrEqual(width);
    expect(layout.zoneControls.bottom).toBeLessThan(layout.proofCard.top);
  }
});

test('mobile navigation scrolls sections below the sticky header', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const mobileNav = page.getByRole('navigation', { name: 'Mobile and tablet navigation' });

  for (const [label, selector] of [
    ['Professional Experience', '#case-studies'],
    ['Honors & Certifications', '#honors-grid'],
    ['Independent Demos', '#framing-the-data'],
  ]) {
    await mobileNav.getByRole('link', { name: label }).click();
    await expect(page).toHaveURL(new RegExp(selector.slice(1)));
    const offset = await page.evaluate((targetSelector) => {
      const header = document.querySelector('header').getBoundingClientRect();
      const target = document.querySelector(targetSelector).getBoundingClientRect();
      return { headerBottom: header.bottom, targetTop: target.top };
    }, selector);
    expect(offset.targetTop).toBeGreaterThanOrEqual(offset.headerBottom - 1);
  }
});

test('touch-enabled phone can switch all hero zones and tabs with taps', async ({ browser }) => {
  const phone = devices['iPhone 13'];
  const context = await browser.newContext({
    ...phone,
    baseURL: 'http://127.0.0.1:4173/',
  });
  const page = await context.newPage();

  try {
    await page.goto('/');
    const stage = page.locator('#interactive-hero');
    const videos = stage.locator('video');
    const playButton = stage.getByTestId('video-play-button');

    // A phone should expose an explicit user-gesture fallback before playback.
    await expect(playButton).toBeVisible();
    await playButton.tap();
    await expect.poll(
      () => videos.nth(0).evaluate((video) => !video.paused),
      { timeout: 10000 }
    ).toBe(true);
    await expect(playButton).toBeHidden();

    for (const [label, heading, videoIndex] of [
      ['CRM', 'CRM Lead Routing & SLA Simulator', 0],
      ['Awards', '9+ MUN Press Awards, 8.91 GPA & VP Leadership', 0],
      ['BI', 'Retail Operations & Fulfilment Dashboard', 1],
    ]) {
      await stage.getByRole('button', { name: label }).tap();
      await expect(stage.getByRole('heading', { name: heading })).toBeVisible();
      await expect.poll(
        () => videos.nth(videoIndex).evaluate((video) => !video.paused),
        { timeout: 10000 }
      ).toBe(true);
    }

    const showcase = page.locator('#framing-the-data');
    await showcase.getByRole('button', { name: 'Ops' }).tap();
    await expect(showcase.getByRole('heading', { name: 'Synthetic Operations Analytics Dashboard' })).toBeVisible();
    await showcase.getByRole('button', { name: 'Photo' }).tap();
    await expect(showcase.getByRole('heading', { name: 'How Award-Winning Photojournalism Elevates Dashboard UX' })).toBeVisible();
  } finally {
    await context.close();
  }
});
