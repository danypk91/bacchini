import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const publications = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    year: z.number(),
    journal: z.string().optional(),
    status: z.enum(['submitted', 'accepted', 'published']).default('published'),
    doi: z.string().nullable().optional(),
    arxiv: z.string().nullable().optional(),
    highlight: z.boolean().default(false),
    highlight_label: z.string().nullable().optional(),
    fabio_position: z.enum(['first', 'co-first', 'contributing']).default('contributing'),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    link: z.string().optional(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    title: z.string().optional(),
    role: z.string(),
    photo: z.string().optional(),
    status: z.enum(['current', 'former']).default('current'),
    former_info: z.string().nullable().optional(),
    order: z.number().default(99),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    icon: z.string().optional(),
    color: z.string().optional(),
    order: z.number().default(99),
  }),
});

export const collections = { publications, news, team, research };
