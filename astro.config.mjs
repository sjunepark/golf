// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    starlight({
      title: "초보의 골프 일지",
      description: "초보의 입장에서 골프를 배우며 느끼고배운 모든 것",
      defaultLocale: "ko",
      customCss: [
        // This order has to be maintained for fonts to be applied properly
        "@fontsource-variable/roboto",
        "@fontsource-variable/noto-sans-kr",
        "./src/styles/global.css",
      ],
      sidebar: [
        {
          label: "일지",
          collapsed: false,
          autogenerate: { directory: "journal" },
        },

        {
          label: "스윙",
          collapsed: false,
          autogenerate: { directory: "swing" },
        },

        {
          label: "추천 참고자료",
          collapsed: false,
          autogenerate: { directory: "reference" },
        },

        { label: "Q&A", collapsed: false, autogenerate: { directory: "qna" } },
      ],
    }),
  ],
});
