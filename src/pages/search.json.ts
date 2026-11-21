import { posts, postPath } from '../lib/posts';
import { date } from '../site';
export async function GET() {
  return Response.json((await posts()).map(p => ({ title: p.data.title, description: p.data.description, tags: p.data.tags, body: p.body, url: postPath(p), date: date(p.data.date) })));
}
