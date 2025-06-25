import { defineCollection, z } from "astro:content";

const journal = defineCollection({
  type: "content",
  schema: z
    .object({
      title: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()).optional(),
      location: z.string().optional(),
    })
    .strict(),
});

const guides = defineCollection({
  type: "content",
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()).optional(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.string().optional(),
    })
    .strict(),
});

export const collections = {
  journal,
  guides,
};
