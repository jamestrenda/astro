import { MenuIcon, SettingsIcon, Unlink } from "lucide-react";
import type { StructureResolver } from "sanity/structure";

export const settings: StructureResolver = async (S, context) =>
  S.listItem()
    .title("Settings")
    .icon(SettingsIcon)
    .child(
      S.list()
        .title("Settings")
        .items([
          S.listItem()
            .title("Header")
            .icon(HeaderIcon)
            .child(
              S.defaultDocument({
                schemaType: "headerSettings",
                documentId: "headerSettings",
              }).title("Header Settings")
            ),
          S.divider(),
          S.listItem()
            .title("Footer")
            .schemaType("post")
            .icon(FooterIcon)
            .child(
              S.defaultDocument({
                schemaType: "footerSettings",
                documentId: "footerSettings",
              }).title("Footer Settings")
            ),
          S.listItem()
            .title("Menus")
            .icon(MenuIcon)
            .child(S.documentTypeList("menu").title("Menus")),
          S.listItem()
            .title("404 Settings")
            .id("404")
            .icon(Unlink)
            .child(
              S.defaultDocument({
                schemaType: "notFoundSettings",
                documentId: "notFoundSettings",
              }).title("404 Settings")
            ),
          S.listItem()
            .title("General")
            .icon(SettingsIcon)
            .child(
              S.defaultDocument({
                schemaType: "siteSettings",
                documentId: "siteSettings",
              }).title("Site Settings")
            ),
        ])
    );

const HeaderIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-panel-top-dashed"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M14 9h1" />
      <path d="M19 9h2" />
      <path d="M3 9h2" />
      <path d="M9 9h1" />
    </svg>
  );
};

const FooterIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-panel-bottom-dashed"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M14 15h1" />
      <path d="M19 15h2" />
      <path d="M3 15h2" />
      <path d="M9 15h1" />
    </svg>
  );
};
