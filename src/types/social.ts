import { z } from "zod";

export const socialMediaPlatformsZ = z.union([
  z.literal("behance"),
  z.literal("discord"),
  z.literal("dribbble"),
  z.literal("facebook"),
  z.literal("github"),
  z.literal("instagram"),
  z.literal("linkedin"),
  z.literal("medium"),
  z.literal("pinterest"),
  z.literal("reddit"),
  z.literal("snapchat"),
  z.literal("telegram"),
  z.literal("tiktok"),
  z.literal("tumblr"),
  z.literal("twitch"),
  z.literal("vimeo"),
  z.literal("wechat"),
  z.literal("whatsapp"),
  z.literal("x"),
  z.literal("youtube"),
]);

export const socialMediaProfileZ = z.object({
  _type: z.literal("profile"),
  _key: z.string(),
  handle: z.string(),
  platform: socialMediaPlatformsZ,
  url: z.string().url(),
  notes: z.string(),
});

export const socialZ = z.array(socialMediaProfileZ);

export type Social = z.infer<typeof socialZ>;
