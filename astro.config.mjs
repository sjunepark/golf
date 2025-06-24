// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],
	experimental: {
		fonts: [{
			provider: fontProviders.fontsource(),
			name: "Inter",
			cssVariable: "--font-inter"
		}]
	}
});
