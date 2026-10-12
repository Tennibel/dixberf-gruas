import {site} from '../data/site';
import {withBase} from '../utils/paths';
export function GET(){
 const rules=import.meta.env.PUBLIC_PREVIEW==='true'
  ? 'User-agent: *\nDisallow: /\n'
  : `User-agent: *\nAllow: /\nDisallow: ${withBase('/api/')}\nSitemap: ${site.url}/sitemap-index.xml\n`;
 return new Response(rules,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
}
