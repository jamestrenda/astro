import type { StructureResolver } from "sanity/structure";
import {
  ArrowLeftRightIcon,
  MenuIcon,
  NotebookPenIcon,
  NotebookTextIcon,
  RssIcon,
  SettingsIcon,
  SlidersHorizontal,
  TagIcon,
  UnlinkIcon,
} from "lucide-react";
import taxonomyList from "./taxonomyList";

export const structure: StructureResolver = async (S, context) => {
  const blog = S.listItem()
    .title("Blog")
    .icon(RssIcon)
    .child(
      S.list()
        .title("All Posts")
        .items([
          S.listItem()
            .title("All Posts")
            .id("all")
            .icon(RssIcon)
            .child(S.documentTypeList("post").title("All Posts")),
          S.divider(),
          S.listItem()
            .title("Published")
            .id("published")
            .schemaType("post")
            .icon(NotebookTextIcon)
            .child(
              S.documentList()
                .filter(`_type == "post" && !(_id in path("drafts.**"))`)
                .title("Published Posts")
                .menuItems(S.documentTypeList("post").getMenuItems())
                .canHandleIntent(
                  (intentName, params) =>
                    intentName === "create" && params.template === `post`
                )
            ),
          S.listItem()
            .title("Drafts")
            .id("drafts")
            .schemaType("post")
            .icon(NotebookPenIcon)
            .child(
              S.documentList()
                .filter(`_type == "post" && _id in path("drafts.**")`)
                .title("Drafts")
                .menuItems(S.documentTypeList("post").getMenuItems())
                .canHandleIntent(
                  (intentName, params) =>
                    intentName === "create" && params.template === `post`
                )
            ),
          taxonomyList({
            parent: {
              schemaType: "tag",
              title: "Tags",
              icon: TagIcon,
              titleFieldName: "title",
            },
            child: {
              schemaType: "post",
              title: "Posts",
              // icon: HeartHandshakeIcon,
            },
            title: "By Tag",
            S,
            documentStore: context.documentStore,
          }),
        ])
    );

  const redirects = S.listItem()
    .title("Redirects")
    .icon(ArrowLeftRightIcon)
    .child(
      S.defaultDocument({
        schemaType: "redirectSettings",
        documentId: "redirectSettings",
      }).title("Redirects")
    );

  const settings = S.listItem()
    .title("Settings")
    .icon(SettingsIcon)
    .child(
      S.list()
        .title("Settings")
        .items([
          S.listItem()
            .title("General")
            .icon(SlidersHorizontal)
            .child(
              S.defaultDocument({
                schemaType: "siteSettings",
                documentId: "siteSettings",
              }).title("Site Settings")
            ),
          S.divider(),
          S.listItem()
            .title("Header")
            .icon(HeaderIcon)
            .child(
              S.defaultDocument({
                schemaType: "headerSettings",
                documentId: "headerSettings",
              }).title("Header Settings")
            ),
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
          S.divider(),
          redirects,
          S.listItem()
            .title("404 Settings")
            .id("404")
            .icon(UnlinkIcon)
            .child(
              S.defaultDocument({
                schemaType: "notFoundSettings",
                documentId: "notFoundSettings",
              }).title("404 Settings")
            ),
        ])
    );
  return S.list()
    .id("root")
    .title("Everything")
    .items([blog, S.divider(), settings]);
};

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
