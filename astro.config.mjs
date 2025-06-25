// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import starlight from "@astrojs/starlight";
import { sidebar } from "./astro.sidebar";

// https://astro.build/config
export default defineConfig({
  experimental: {
    fonts: [
      {
        provider: fontProviders.fontsource(),
        name: "Inter",
        cssVariable: "--font-inter",
      },
      {
        provider: fontProviders.fontsource(),
        name: "Noto Sans KR",
        cssVariable: "--font-noto-sans-kr",
      },
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    starlight({
      title: "초보의 골프 일지",
      description: "초보의 입장에서 골프를 배우며 느끼고배운 모든 것",
      defaultLocale: "ko",
      customCss: ["./src/styles/global.css"],
      sidebar,
    }),
  ],
});
