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

const descriptionFragment = groq`
  description[] {
    ${portableTextFragment}
  }
`;

const descriptionItemFragment = groq`
  title,
  ${descriptionFragment}
`;

const descriptionItemReferenceFragment = groq`
  "title": @->title,
  "description": @->${descriptionFragment}
`;

const formFieldsFragment = groq`
  _type,
  _key,
  fieldLabel,
  fieldPlaceholder,
  required,
  _type == "formField" => {
    fieldType,
  },
  fieldType == "email" => {
    replyToEmail,
  },
  _type == "formTextarea" => {
    fieldMaxLength
  }
`;

// TODO: I was previously using this in two places, but now that I'm re-using the FORM_QUERY instead, I may not need this fragment anymore
const customFormFieldsFragment = groq`
  ${formFieldsFragment},
  _type == "formGroup" => {
    _type,
    _key,
    label,
    fields[] {
      ${formFieldsFragment}
    }
  }
`;

// TODO: Thinking about having a separate query for the honeypot field only, but then I'd to make two API calls for every form submission
export const formQueryFragment = groq`
  "fields": *[_type == $_type][0].blocks[_type == "form"][0].form->customFormFields[] {
    ${customFormFieldsFragment}
  },
  "honeypot": *[_type == $_type][0].blocks[_type == "form"][0].form->_id
`;

const blocksFragment = groq`
  _type,
  _key,
  _type == "descriptionGrid" => {
    header[] {
      ${portableTextFragment}
    },
    items[] {
      ${descriptionItemFragment},
      _type == "reference" => {
        ${descriptionItemReferenceFragment}
      }
    }
  },
  _type == "form" => {
    text[] {
      ${portableTextFragment}
    },
    form-> {
      _type,
      ${formQueryFragment}
    }
  },
  _type == "hero" => {
    valueProposition[] {
      ${portableTextFragment}
    },
    logos[] {
      _type,
      _key,
      speed,
      direction,
      "items": items.images[] {
        _key,
        ${imageObjectFragment}
      }
    },
    image {
      ${imageObjectFragment}
    }
  },
  _type == "portfolio" => {
    title,
    items[] {
      "id": _ref,
      _key,
      _type == "reference" => @-> {
        _type,
        _type == "website" => {
          "client": select(defined(client->shortName) => client->shortName, defined(client->name) => client->name, ''),
          title,
          description[] {
            ${portableTextFragment}
          },
          "url": select(defined(url) => url, defined(client->website) => client->website, '#'),
          image {
            ${imageObjectFragment}
          },
          features[] {
            _key,
            _type,
            name,
            description
          }
        }
      }
    }
  },
  _type == "textBlock" => {
    portableText[] {
      ${portableTextFragment}
    }
  },
`;

export const INDEX_QUERY = groq`*[_type == "page" && isHomepage == true][0] {
    _type,
    "slug": coalesce(slug.current, ""),
    blocks[] {
      ${blocksFragment}
    },
    ${seoFragment},
}`;

export const FORM_QUERY = groq`{
  ${formQueryFragment}
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
