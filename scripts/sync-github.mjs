import { readFile, writeFile } from 'node:fs/promises';

const username = 'njy24';
const output = new URL('../src/data/github.json', import.meta.url);
const cached = JSON.parse(await readFile(output, 'utf8'));
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'njy24-personal-website' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function api(path) {
  const response = await fetch(`https://api.github.com${path}`, { headers, signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
  return response.json();
}

try {
  const repos = (await api(`/users/${username}/repos?sort=pushed&per_page=30`))
    .filter(repo => !repo.fork && !repo.private && !repo.archived)
    .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at));
  const projects = repos.map(repo => ({
    name: repo.name,
    url: repo.html_url,
    homepage: /^https?:\/\//.test(repo.homepage ?? '') ? repo.homepage : '',
    description: repo.description ?? '',
    language: repo.language ?? '',
    stars: repo.stargazers_count,
    updated: repo.pushed_at,
  }));
  const commits = await Promise.allSettled(repos.slice(0, 5).map(async repo => {
    return (await api(`/repos/${username}/${encodeURIComponent(repo.name)}/commits?per_page=3`))
      .map(entry => ({
        repository: `${username} / ${repo.name}`,
        repositoryUrl: repo.html_url,
        sha: entry.sha,
        url: entry.html_url,
        message: entry.commit.message.split('\n')[0],
        date: entry.commit.committer.date,
      }));
  }));
  const activities = commits.every(result => result.status === 'fulfilled')
    ? commits.flatMap(result => result.value).sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, 15)
    : cached.activities;
  await writeFile(output, JSON.stringify({ updated: new Date().toISOString(), projects, activities }, null, 2) + '\n');
  console.log(`GitHub: ${projects.length} public projects, ${activities.length} activities.`);
} catch (error) {
  console.warn(`GitHub refresh unavailable; using saved public data. ${error.message}`);
}
