import menu from "./documents/menu";
import page from "./documents/page";
import post from "./documents/post";
import tag from "./documents/tag";
import externalLink from "./objects/externalLink";
import image from "./objects/image";
import link from "./objects/link";
import menuItem from "./objects/menuItem";
import portableText from "./objects/portableText";
import redirect from "./objects/redirect";
import ref from "./objects/ref";
import seo from "./objects/seo";
import footerSettings from "./singletons/footerSettings";
import headerSettings from "./singletons/headerSettings";
import notFoundSettings from "./singletons/notFoundSettings";
import redirectSettings from "./singletons/redirectSettings";
import siteSettings from "./singletons/siteSettings";

export const SINGLETON_TYPES = new Set([
  footerSettings.name,
  headerSettings.name,
  "media.tag",
  redirectSettings.name,
  siteSettings.name,
  notFoundSettings.name,
]);

export const schemaTypes = [
  externalLink,
  footerSettings,
  headerSettings,
  image,
  link,
  menu,
  menuItem,
  notFoundSettings,
  page,
  portableText,
  post,
  redirect,
  redirectSettings,
  ref,
  seo,
  siteSettings,
  tag,
];
