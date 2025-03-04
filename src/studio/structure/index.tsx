import {
  ArrowLeftRightIcon,
  ClipboardPenIcon,
  CompassIcon,
  FileXIcon,
  FilesIcon,
  GalleryVerticalEndIcon,
  GlobeIcon,
  HomeIcon,
  MenuIcon,
  NotebookPenIcon,
  NotebookTextIcon,
  RssIcon,
  SettingsIcon,
  SmileIcon,
  TagIcon,
} from 'lucide-react';
import { apiVersion } from 'sanity.config';
import type { StructureResolver } from 'sanity/structure';
import { getHomepageId } from '~/utils/getHomepageId';
import { HomeSettingsIcon } from '../icons/home-settings';
import taxonomyList from './taxonomyList';

export const structure: StructureResolver = async (S, context) => {
  const homepageId = await getHomepageId(context.documentStore);

  const chooseHomepage = S.defaultDocument({
    schemaType: 'home',
    documentId: 'home',
  }).title('Home Settings');

  const homeSettings = S.listItem()
    .title('Home')
    .id('home')
    .icon(HomeSettingsIcon)
    .child(chooseHomepage);

  const home = S.listItem()
    .title('Home')
    .icon(HomeIcon)
    .child(() => {
      if (!homepageId) return chooseHomepage;
      return S.document().schemaType('page').documentId(homepageId);
    });

  const pages = S.listItem()
    .title('Pages')
    .icon(FilesIcon)
    .child(
      S.documentTypeList('page')
        .filter(
          `_type == "page" && _id != $id && !(_id in path("drafts." + $id))`,
        )
        .params({ id: homepageId })
        .apiVersion(apiVersion)
        .title('Pages'),
    );

  const blog = S.listItem()
    .title('Blog')
    .icon(RssIcon)
    .child(
      S.list()
        .title('Blog')
        .items([
          S.listItem()
            .title('All Posts')
            .id('all')
            .icon(RssIcon)
            .child(S.documentTypeList('post').title('All Posts')),
          S.divider(),
          S.listItem()
            .title('Published')
            .id('published')
            .schemaType('post')
            .icon(NotebookTextIcon)
            .child(
              S.documentList()
                .filter(`_type == "post" && !(_id in path("drafts.**"))`)
                .apiVersion(apiVersion)
                .title('Published Posts')
                .menuItems(S.documentTypeList('post').getMenuItems())
                .canHandleIntent(
                  (intentName, params) =>
                    intentName === 'create' && params.template === `post`,
                ),
            ),
          S.listItem()
            .title('Drafts')
            .id('drafts')
            .schemaType('post')
            .icon(NotebookPenIcon)
            .child(
              S.documentList()
                .filter(`_type == "post" && _id in path("drafts.**")`)
                .apiVersion(apiVersion)
                .title('Drafts')
                .menuItems(S.documentTypeList('post').getMenuItems())
                .canHandleIntent(
                  (intentName, params) =>
                    intentName === 'create' && params.template === `post`,
                ),
            ),
          taxonomyList({
            parent: {
              schemaType: 'tag',
              title: 'Tags',
              icon: TagIcon,
              titleFieldName: 'title',
            },
            child: {
              schemaType: 'post',
              title: 'Posts',
              // icon: HeartHandshakeIcon,
            },
            title: 'By Tag',
            S,
            documentStore: context.documentStore,
          }),
        ]),
    );

  const principles = S.listItem()
    .title('Guiding Principles')
    .icon(CompassIcon)
    .child(S.documentTypeList('principle').title('Guiding Principles'));

  const redirects = S.listItem()
    .title('Redirects')
    .icon(ArrowLeftRightIcon)
    .child(
      S.defaultDocument({
        schemaType: 'redirectSettings',
        documentId: 'redirectSettings',
      }).title('Redirects'),
    );

  const clients = S.listItem()
    .title('Clients')
    .icon(SmileIcon)
    .child(S.documentTypeList('client').title('Clients'));

  const recipes = S.listItem()
    .title('Recipes')
    // .icon(SmileIcon)
    .child(S.documentTypeList('recipe').title('Recipes'));

  const ingredients = S.listItem()
    .title('Ingredients')
    // .icon(SmileIcon)
    .child(S.documentTypeList('ingredient').title('Ingredients'));

  const projects = S.listItem()
    .title('Projects')
    .icon(GalleryVerticalEndIcon)
    .child(
      S.list()
        .title('Projects')
        .items([
          S.listItem()
            .title('Websites')
            .icon(GlobeIcon)
            .child(S.documentTypeList('website').title('Websites')),
        ]),
    );

  const forms = S.listItem()
    .title('Forms')
    .icon(ClipboardPenIcon)
    .child(S.documentTypeList('baseForm').title('Forms'));

  const settings = S.listItem()
    .title('Settings')
    .icon(SettingsIcon)
    .child(
      S.list()
        .title('Settings')
        .items([
          S.listItem()
            .title('Global')
            .id('global')
            .icon(GlobeIcon)
            .child(
              S.defaultDocument({
                schemaType: 'siteSettings',
                documentId: 'siteSettings',
              }).title('Global Settings'),
            ),
          homeSettings,
          S.divider(),
          S.listItem()
            .title('Header')
            .icon(HeaderIcon)
            .child(
              S.defaultDocument({
                schemaType: 'headerSettings',
                documentId: 'headerSettings',
              }).title('Header Settings'),
            ),
          S.listItem()
            .title('Footer')
            .schemaType('post')
            .icon(FooterIcon)
            .child(
              S.defaultDocument({
                schemaType: 'footerSettings',
                documentId: 'footerSettings',
              }).title('Footer Settings'),
            ),
          S.listItem()
            .title('Menus')
            .icon(MenuIcon)
            .child(S.documentTypeList('menu').title('Menus')),
          S.divider(),
          redirects,
          S.listItem()
            .title('404 - Not Found')
            .id('404')
            .icon(FileXIcon)
            .child(
              S.defaultDocument({
                schemaType: 'notFoundSettings',
                documentId: 'notFoundSettings',
              }).title('404 Settings'),
            ),
        ]),
    );
  return S.list()
    .id('root')
    .title('Content')
    .items([
      home,
      S.divider(),
      pages,
      blog,
      principles,
      projects,
      clients,
      recipes,
      ingredients,
      forms,
      S.divider(),
      settings,
    ]);
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
