import { test, expect } from '@playwright/test';

test('navigation, search, empty results, and theme persistence', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '近期活动', exact: true })).toBeVisible();
  const index = await (await request.get('/search.json')).json();
  await expect(page.locator('.post-row')).toHaveCount(Math.min(index.length, 8));
  await page.getByRole('button', { name: /切换到/ }).click();
  const theme = await page.locator('html').getAttribute('data-theme');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme!);
  await page.getByRole('link', { name: '搜索文章', exact: true }).click();
  await page.getByRole('searchbox').fill('不存在的词xyz');
  await expect(page.getByRole('status')).toContainText('没有找到');
  await page.getByRole('searchbox').fill('<img src=x onerror=alert(1)>');
  await expect(page.getByRole('status')).toContainText('没有找到');
  await page.getByRole('searchbox').fill('');
  await expect(page.locator('#search-results article')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('all internal links and assets resolve; feeds contain published posts only', async ({ page, request }) => {
  const queue = ['/'];
  const seen = new Set<string>();
  while (queue.length) {
    const route = queue.shift()!;
    if (seen.has(route)) continue;
    seen.add(route);
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    const urls = await page.locator('a[href], link[href], script[src], img[src]').evaluateAll(elements => elements.map(el => el.getAttribute('href') || el.getAttribute('src')).filter(Boolean));
    for (const value of urls) {
      if (!value?.startsWith('/') || value.startsWith('//')) continue;
      const url = value.split('#')[0].split('?')[0];
      if (url.endsWith('/')) { if (!seen.has(url)) queue.push(url); }
      else { const resource = await request.get(url); expect(resource.status(), url).toBe(200); }
    }
  }
  const index = await (await request.get('/search.json')).json();
  const rss = await (await request.get('/rss.xml')).text();
  expect((rss.match(/<item>/g) || []).length).toBe(index.length);
  expect(rss).toContain('https://njy24.github.io/');
  expect(seen.size).toBeGreaterThanOrEqual(5);
});

test('mobile reading layout does not overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const route of ['/', '/archive/', '/tags/', '/about/', '/activities/', '/projects/', '/contact/', '/search/']) {
    await page.goto(route);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true);
  }
});

test('capture desktop and mobile layouts for visual review', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto('/');
  await page.screenshot({ path: testInfo.outputPath('desktop.png'), fullPage: true });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({ path: testInfo.outputPath('mobile.png'), fullPage: true });
});
