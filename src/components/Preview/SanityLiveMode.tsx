import { useLiveMode } from "@sanity/react-loader";
import { sanityClient } from "sanity:client";
const studioUrl = import.meta.env.PUBLIC_SANITY_STUDIO_BASE_PATH;

// Default export required for React Lazy loading
// eslint-disable-next-line import/no-default-export
export default function SanityLiveMode() {
  // Enable live queries using the client configuration
  useLiveMode({
    client: sanityClient.withConfig({
      stega: {
        enabled: true,
        studioUrl,
      },
    }),
  });
  return null;
}
