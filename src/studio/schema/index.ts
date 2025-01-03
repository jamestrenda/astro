import marquee from "~/studio/schema/objects/marquee";
import client from "./documents/client";
import menu from "./documents/menu";
import page from "./documents/page";
import portfolio from "./documents/portfolio";
import post from "./documents/post";
import principle from "./documents/principle";
import tag from "./documents/tag";
import website from "./documents/website";
import descriptionGrid from "./objects/descriptionGrid";
import externalLink from "./objects/externalLink";
import feature from "./objects/feature";
import gallery from "./objects/gallery";
import hero from "./objects/hero";
import image from "./objects/image";
import link from "./objects/link";
import menuItem from "./objects/menuItem";
import portableText from "./objects/portableText";
import redirect from "./objects/redirect";
import ref from "./objects/ref";
import seo from "./objects/seo";
import footerSettings from "./singletons/footerSettings";
import headerSettings from "./singletons/headerSettings";
import home from "./singletons/home";
import notFoundSettings from "./singletons/notFoundSettings";
import redirectSettings from "./singletons/redirectSettings";
import siteSettings from "./singletons/siteSettings";
import form from "./objects/form";

export const SINGLETON_TYPES = new Set([
  footerSettings.name,
  headerSettings.name,
  home.name,
  "media.tag",
  redirectSettings.name,
  siteSettings.name,
  notFoundSettings.name,
]);

export const schemaTypes = [
  client,
  descriptionGrid,
  externalLink,
  feature,
  footerSettings,
  form,
  gallery,
  headerSettings,
  hero,
  home,
  image,
  link,
  marquee,
  menu,
  menuItem,
  notFoundSettings,
  page,
  portableText,
  portfolio,
  post,
  principle,
  redirect,
  redirectSettings,
  ref,
  seo,
  siteSettings,
  tag,
  website,
];
