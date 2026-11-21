export const site = {
  name: 'njy24 的博客',
  author: 'njy24',
  title: '写下来，慢慢想。',
  description: '记录学习、实践，以及日常里值得留下的想法。',
  github: 'https://github.com/njy24',
};

export function path(url = '') {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
}

export function date(value: Date) {
  return value.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' }).replaceAll('/', '.');
}
