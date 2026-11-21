import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Actions also supports deploying this source as a project site.
const repository = process.env.GITHUB_REPOSITORY;
const owner = repository?.split('/')[0];
const repo = repository?.split('/')[1];
const site = process.env.SITE_URL || (owner ? `https://${owner}.github.io` : 'https://njy24.github.io');
const base = process.env.BASE_PATH || (repo && repo.toLowerCase() !== `${owner}.github.io`.toLowerCase() ? `/${repo}` : '/');

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } } },
});
