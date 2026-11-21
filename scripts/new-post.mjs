import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const [slug, title = '未命名文章'] = process.argv.slice(2);
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error('用法：npm run new -- my-first-post "文章标题"（文件名使用小写英文、数字和连字符）');
  process.exit(1);
}
const directory = resolve('src/content/posts');
await mkdir(directory, { recursive: true });
const file = resolve(directory, `${slug}.md`);
const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const body = `---\ntitle: ${JSON.stringify(title)}\ndescription: "在这里写一句摘要"\ndate: ${today}\ntags: []\ndraft: true\n---\n\n从这里开始写作。\n`;
try { await writeFile(file, body, { flag: 'wx' }); }
catch (error) { console.error(error.code === 'EEXIST' ? '文章已存在，请使用其他文件名。' : error.message); process.exit(1); }
console.log(`已创建草稿：${file}\n发布前将 draft 改为 false。`);
