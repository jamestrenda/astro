import groq from "groq";

export const imageFieldsFragment = groq`
  _type,
  crop,
  hotspot,
  asset->{
    _id,
    _ref,
    _type,
    altText,
    url,
    description,
    source {
      url
    },
    creditLine,
    metadata {
      lqip,
      dimensions {
        aspectRatio,
        height,
        width
      }
    },
  }`;

export const imageObjectFragment = groq`
  _type,
  altText,
  caption,
  image {
    ${imageFieldsFragment}
  },
  anchor
`;

const seoFragment = groq`
  seo {
    title,
    metaDescription
  }
`;

const portableTextFragment = groq`
    ...,
    markDefs[]{
        _type,
        _key,
        _type == "internalRef" => {
            "slug": @.ref.document->slug.current,
            @.ref.document->._type == "post" => {
                "slug": "blog/" + @.ref.document->.slug.current,
            }
        },
        _type == "externalLink" => {
            "url": @.link.url,
            "newWindow": @.link.newWindow
        },
        !(_type in ["internalRef", "externalLink"]) => {
          ...
        }
    }
`;

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
    title,
    "slug": 'blog/' + slug.current,
    publishedAt,
    excerpt,

}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
    title,
    image {
        ${imageObjectFragment}
    },
    body[] {
        ${portableTextFragment}
    },
    tags[]->{
        "title": '#' + lower(array::join(string::split(title, " "), "-")),
        "slug": 'blog/' + slug.current
    },
}`;

export const INDEX_QUERY = groq`*[_type == "page" && isHomepage == true][0] {
    blocks[] {
      _type,
      _key,
      _type == "portableTextBlock" => {
        portableText[] {
          ${portableTextFragment}
        }
      }
    },
    ${seoFragment},
}`;

export const SETTINGS_QUERY = groq`*[_type == "siteSettings"][0] {
  "siteTitle": coalesce(siteTitle, "Update your site title in the Sanity Studio."),
  "siteUrl": coalesce(siteUrl, "https://www.UPDATE-SITEURL-IN-SANITY-STUDIO.com"),
  "favicon": coalesce(favicon.asset->url, "https://fav.farm/✅"),
}`;

export const REDIRECTS_QUERY = groq`*[_type == "redirectSettings"][0].redirects[]`;

export const REDIRECT_SETTINGS_ID_QUERY = groq`
  *[_type == "redirectSettings"][0]._id
`;
