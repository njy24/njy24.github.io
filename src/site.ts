export const site = {
  name: 'njy24 的个人网站',
  author: 'njy24',
  description: 'njy24 的个人网站、文章与项目。',
  introduction: '',
  github: 'https://github.com/njy24',
};

export function path(url = '') {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
}

export function date(value: Date) {
  return value.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' }).replaceAll('/', '.');
}
