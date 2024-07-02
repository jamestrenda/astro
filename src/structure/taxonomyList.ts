import { type DocumentStore, type SanityDocument } from "sanity";
import type { StructureBuilder } from "sanity/structure";
import { map } from "rxjs/operators";

import type { ReactNode } from "react";
import type { IconProps } from "~/types/icon";
import { getEnv } from "~/utils/env";

type TaxonomyProps = {
  schemaType: string;
  title: string;
  icon?: (props: IconProps) => JSX.Element | ReactNode;
};

const apiVersion = getEnv().PUBLIC_SANITY_STUDIO_API_VERSION;

export default function taxonomyList({
  parent,
  child,
  title,
  S,
  documentStore,
}: {
  parent: TaxonomyProps & { titleFieldName: string; id?: string };
  child: TaxonomyProps;
  id?: string;
  title: string;
  S: StructureBuilder;
  documentStore: DocumentStore;
}) {
  const filter = `_type == "${parent.schemaType}" && !(_id in path("drafts.**"))`;
  const query = `*[${filter}]{ _id, title }`;
  const options = { apiVersion };

  return S.listItem()
    .title(title)
    .id(parent.id || parent.schemaType)
    .icon(parent.icon)
    .child(() =>
      documentStore.listenQuery(query, {}, options).pipe(
        map((parents) =>
          S.list()
            .title(parent.title)
            .items([
              ...parents.map((doc: SanityDocument) =>
                S.listItem({
                  id: doc._id,
                  title: doc[parent.titleFieldName ?? `title`] as string,
                  schemaType: doc._type,
                  icon: parent.icon,
                  child: () =>
                    S.documentTypeList(child.schemaType)
                      .title(child.title)
                      .filter(
                        `_type == $schemaType && parent._ref == $parentId`
                      )
                      .params({
                        schemaType: child.schemaType,
                        parentId: doc._id,
                      })
                      .canHandleIntent(
                        (intentName, params) =>
                          intentName === "create" &&
                          params.template === `${child.schemaType}-taxonomy`
                      )
                      .initialValueTemplates([
                        S.initialValueTemplateItem(
                          `${child.schemaType}-taxonomy`,
                          {
                            id: doc._id,
                          }
                        ),
                      ]),
                })
              ),
            ])
        )
      )
    );
}
