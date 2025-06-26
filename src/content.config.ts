import { defineCollection, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        tags: z
          .array(
            z.enum([
              "기본",
              "스윙",
              "드라이버",
              "우드",
              "아이언",
              "웨지",
              "퍼터",
              "백스윙",
              "다운스윙",
              "팔로우스루",
              "그립",
              "어드레스",
              "하는 것",
              "되는 것",
            ]),
          )
          .optional(),
        location: z.enum(["연습장", "필드"]).optional(),
      }),
    }),
  }),
};
