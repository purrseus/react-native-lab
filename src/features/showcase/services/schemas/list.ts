import { z } from 'zod';

export const PhotosSchema = z.array(
  z.object({
    albumId: z.number().int().optional().nullable(),
    id: z.number().int().optional().nullable(),
    title: z.string().min(1).optional().nullable(),
    url: z.string().url().optional().nullable(),
    thumbnailUrl: z.string().url().optional().nullable(),
  }),
);

export type Photos = z.infer<typeof PhotosSchema>;
