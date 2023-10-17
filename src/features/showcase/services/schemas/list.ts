import { z } from 'zod';

export const PhotosSchema = z.array(
  z.object({
    albumId: z.number().int().nullish(),
    id: z.number().int().nullish(),
    title: z.string().min(1).nullish(),
    url: z.string().url().nullish(),
    thumbnailUrl: z.string().url().nullish(),
  }),
);

export type Photos = z.infer<typeof PhotosSchema>;
