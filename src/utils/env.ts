import { z } from 'zod';

// export const projectId = import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID!;
// export const dataset = import.meta.env.PUBLIC_SANITY_STUDIO_DATASET!;
// export const apiVersion = import.meta.env.PUBLIC_SANITY_STUDIO_API_VERSION!;

const schema = z.object({
  PUBLIC_SANITY_STUDIO_PROJECT_ID: z.string(),
  PUBLIC_SANITY_STUDIO_DATASET: z.enum(['production', 'staging'] as const),
  PUBLIC_SANITY_API_READ_TOKEN: z.string(),
  PUBLIC_SANITY_STUDIO_BASE_PATH: z.string(),
  PUBLIC_SANITY_STUDIO_PREVIEW_URL: z.string().url(),
  PUBLIC_SANITY_STUDIO_API_VERSION: z.string(),
  WISTIA_TOKEN: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof schema> {}
  }
}

export function init() {
  const parsed = schema.safeParse(process.env);

  if (parsed.success === false) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors,
    );

    throw new Error('Invalid environment variables');
  }
}

export function getEnv() {
  return {
    PUBLIC_SANITY_STUDIO_PROJECT_ID: import.meta.env
      .PUBLIC_SANITY_STUDIO_PROJECT_ID!,
    PUBLIC_SANITY_STUDIO_DATASET: import.meta.env.PUBLIC_SANITY_STUDIO_DATASET!,
    PUBLIC_SANITY_API_READ_TOKEN: import.meta.env.PUBLIC_SANITY_API_READ_TOKEN!,
    PUBLIC_SANITY_STUDIO_BASE_PATH: import.meta.env
      .PUBLIC_SANITY_STUDIO_BASE_PATH!,
    PUBLIC_SANITY_STUDIO_PREVIEW_URL: import.meta.env
      .PUBLIC_SANITY_STUDIO_PREVIEW_URL!,
    PUBLIC_SANITY_STUDIO_API_VERSION: import.meta.env
      .PUBLIC_SANITY_STUDIO_API_VERSION!,
    WISTIA_TOKEN: import.meta.env.WISTIA_TOKEN!,
  };
}

type ENV = ReturnType<typeof getEnv>;

declare global {
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}
