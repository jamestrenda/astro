import { getBaseUrl } from './sanity';

interface OgImageOptions {
  type?: string;
  id?: string;
}

export function getOgImage({ type, id }: OgImageOptions = {}): string {
  const params = new URLSearchParams();
  if (id) params.set('id', id);
  if (type) params.set('type', type);
  const baseUrl = getBaseUrl();
  const logoUrl = `${baseUrl}/api/og?${params.toString()}`;
  return logoUrl;
}
