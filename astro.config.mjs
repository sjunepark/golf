// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  experimental: {
    fonts: [
      {
        provider: fontProviders.fontsource(),
        name: "Inter",
        cssVariable: "--font-inter",
      },
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    starlight({
      title: "Golf Documentation",
      description: "Your personal golf documentation and improvement tracking",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com",
        },
      ],
      sidebar: [
        {
          label: "Journal",
          autogenerate: { directory: "journal" },
        },
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
      ],
      customCss: ["./src/styles/global.css"],
    }),
  ],
});
