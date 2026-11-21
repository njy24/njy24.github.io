import { getCollection, type CollectionEntry } from 'astro:content';
import { path } from '../site';

export function postPath(post: CollectionEntry<'posts'>) {
  return path(post.data.permalink ?? `posts/${post.id}/`);
}

export async function posts() {
  return (await getCollection('posts', ({ data }) => !data.draft && data.date <= new Date()))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id));
}

export function minutes(post: CollectionEntry<'posts'>) {
  const body = post.body ?? '';
  const chinese = (body.match(/[\u3400-\u9fff]/g) ?? []).length;
  const words = (body.replace(/[\u3400-\u9fff]/g, '').match(/\b\w+\b/g) ?? []).length;
  return Math.max(1, Math.ceil(chinese / 350 + words / 220));
}
