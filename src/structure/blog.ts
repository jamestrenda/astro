import { RssIcon } from "lucide-react";
import type { StructureResolver } from "sanity/structure";

export const blog: StructureResolver = async (S, context) =>
  S.listItem()
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
            .icon(RssIcon)
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
            .icon(RssIcon)
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
        ])
    );
