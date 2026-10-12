import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
const site=process.env.PUBLIC_SITE_URL || 'https://dixberfgruas.com.mx';
const base=process.env.SITE_BASE || '/';
export default defineConfig({site,base,trailingSlash:'always',integrations:[sitemap({filter:page=> !/404|aviso-legal|politica-de-privacidad/.test(page)})],devToolbar:{enabled:false}});
