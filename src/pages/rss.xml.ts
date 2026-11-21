import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { posts, postPath } from '../lib/posts';
import { site } from '../site';
export async function GET(context: APIContext) {
  return rss({ title: site.name, description: site.description, site: context.site!, items: (await posts()).map(p => ({ title: p.data.title, description: p.data.description, pubDate: p.data.date, link: postPath(p) })), customData: '<language>zh-cn</language>' });
}
