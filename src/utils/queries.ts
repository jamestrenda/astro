import groq, { defineQuery } from 'groq';

const titleFragment = groq`
  "title": coalesce(seo.title, blocks[_type == "hero"][0].valueProposition[_type == "block" && style == "h1"][0].children[0].text, ^.title, title, 'Untitled')
`;

const linkFragment = groq`
  "_key": @.link[0]._key,
  "_type": @.link[0]._type,
  "linkText": coalesce(linkText, @.link[0].document->title),
  @.link[0]._type == "internalRef" => {
    @.link[0].document->_type in ["page"] => {
      "linkText": coalesce(linkText, @.link[0].document->title),
      "slug": @.link[0].document->slug.current
    },
    @.link[0].document->_type in ["post"] => {
      "linkText": coalesce(linkText, @.link[0].document->title),
      "slug": "blog/" + @.link[0].document->slug.current
    },
    @.link[0].document->_type in ["tag"] => {
      "linkText": coalesce(linkText, @.link[0].document->title),
      "slug": "blog/tag/" + @.link[0].document->slug.current
    },
    "anchor": @.link[0].anchor,
    "params": @.link[0].q[]
  },
  @.link[0]._type == "externalLink" => {
    "url": coalesce(@.link[0].url, '#'),
    "newWindow": @.link[0].newWindow
  },
  @.link[0]._type == "relativeUrl" => {
    "url": coalesce(@.link[0].url, '#'),
  },
`;

const ogFieldsFragment = groq`
  _id,
  _type,
  "title": select(
    defined(og.title) => og.title,
    defined(seo.title) => seo.title,
    _type == "post" && defined(title) => title,
    _type == "page" => blocks[_type == "hero"][0].valueProposition[_type == "block" && style == "h1"][0].children[0].text,
    defined(title) => title,
    'Untitled'
  ),
  "description": select(
    defined(og.description) => og.description,
    defined(seo.metaDescription) => seo.metaDescription,
    _type == "post" && defined(excerpt) => excerpt,
    _type == "tag" && defined(description) => description,
    ''
  ),
  "image": image.asset->url + "?w=566&h=566&dpr=2&fit=max",
  "dominantColor": image.asset->metadata.palette.dominant.background,
  "seoImage": seo.image.asset->url + "?w=1200&h=630&dpr=2&fit=max", 
  "logo": *[_type == "siteSettings"][0].logo.asset->url + "?w=80&h=40&dpr=3&fit=max&q=100",
  "date": coalesce(publishedAt, _createdAt)
`;
export const imageFieldsFragment = groq`
  _type,
  "id": asset._ref,
  "preview": asset->metadata.lqip,
  hotspot,
  crop,
  "altText": asset->altText,
`;

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
  "seo": {
    ${titleFragment},
    image {
      ${imageFieldsFragment}
    },
    "metaDescription": coalesce(metaDescription, @.description),
    keywords[]
  }
`;

const portableTextBlockFragment = groq`
  ...,
  _type == "block" => {
    ...,
    "anchor": lower(array::join(string::split(array::join(string::split(children[0].text, " "), "-"), ":"), "")) + "-" + _key
  },
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
      "newWindow": @.link.newWindow,
    },
    !(_type in ["internalRef", "externalLink"]) => {
      ...
    }
  }
`;

const portableTextFragment = groq`
    ${portableTextBlockFragment},
    _type == "blockquote" => {
      quote[] {
        ${portableTextBlockFragment}
      },
      cite[] {
        ${portableTextBlockFragment}
      }
    },
    _type == "code" => {
      language,
      code,
      highlightedLines,
      filename
    },
    _type == "imageObject" => {
      ${imageObjectFragment}
    },
    _type == "video" => {
      ...wistiaMedia,
      _type,
      thumbnailAltText
    }
`;

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
  fieldErrorMessage,
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
      "fields": *[_type == ^.^.^._type && defined(slug) && slug.current == ^.^.^.slug.current][0].blocks[_type == "form"][0].form->customFormFields[] {
        ${customFormFieldsFragment}
      },
      "honeypot": *[_type == ^.^.^._type && defined(slug) && slug.current == ^.^.^.slug.current][0].blocks[_type == "form"][0].form->_id
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
          mobileImage {
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
  _type == "textMarqueeBlock" => {
    marquees[] {
      _type,
      _key,
      speed,
      direction,
      items[] {
        _type,
        _key,
        value,
        featured
      }
    }
  },
`;

export const INDEX_QUERY = groq`*[_id == "home"][0].homepage-> {
  _type,
  _id,
  "slug": coalesce(slug.current, ""),
  blocks[] {
    ${blocksFragment}
  },
  ${seoFragment}
}`;

export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0] {
  _type,
  _id,
  "slug": coalesce(slug.current, ""),
  blocks[] {
    ${blocksFragment}
  },
  ${seoFragment}
}`;

export const PAGES_QUERY = groq`*[_type == "page" && defined(slug.current)] {
  _type,
  _id,
  "slug": coalesce(slug.current, ""),
}`;

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
  title,
  "slug": 'blog/' + slug.current,
  publishedAt,
  excerpt,
}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
  _type,
  _id,
  title,
  excerpt,
  "updatedAt": select(dateTime(_updatedAt) > dateTime(publishedAt) + 60*60*24*1 => _updatedAt, null),
  publishedAt,
  repo,
  image {
      ${imageObjectFragment}
  },
  body[] {
      ${portableTextFragment}
  },
  tags[]->{
      title,
      "slug": slug.current
  },
  "toc": body[_type == "block" && style in ["h2", "h3"]] {
    _type,
    _key,
    style,
    "text": children[0].text,
    "anchor": lower(array::join(string::split(array::join(string::split(children[0].text, " "), "-"), ":"), "")) + "-" + _key
  },
  ${seoFragment}
}`;

export const POSTS_BY_TAG_QUERY = groq`{
  "tag": *[_type == "tag" && slug.current == $tag][0] {
    _type,
    _id,
    title,
    description,
    ${seoFragment}
  },
  "posts": *[_type == "post" && $tag in tags[]->slug.current][0...9] {
    _type,
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    tags[]->{
        title,
        "slug": slug.current
    } | order(title asc)
  }
}`;

export const RECIPES_QUERY = groq`*[_type == "recipe" && defined(slug.current)] | order(_createdAt desc) {
  title,
  "slug": 'recipes/' + slug.current,
  publishedAt,
  description
}`;

export const RECIPE_QUERY = groq`*[_type == "recipe" && slug.current == $slug][0] {
  _type,
  _id,
  title,
  gallery {
    _type,
    images[] {
      ${imageObjectFragment}
    }
  },
  ingredients[] {
    ingredient-> {
        title,
        url,
        description
    },
    measurement {
        amount,
        unit
    },
    notes
  },
  instructions[] {
      ${portableTextFragment}
  },
  notes[] {
      ${portableTextFragment}
  }
}`;

export const queryHomePageOGData = defineQuery(/* groq */ `
  *[_id == "homeSettings"][0].homepage->{
    ${ogFieldsFragment}
  }
`);

export const queryPageOGData = defineQuery(/* groq */ `
  *[_type == "page" && _id == $id][0]{
    ${ogFieldsFragment}
  }
`);

export const queryPostOGData = defineQuery(/* groq */ `
  *[_type == "post" && _id == $id][0]{
    ${ogFieldsFragment}
  }
`);

export const queryTagOGData = defineQuery(/* groq */ `
  *[_type == "tag" && _id == $id][0]{
    ${ogFieldsFragment}
  }
`);

export const queryGenericPageOGData = defineQuery(/* groq */ `
  *[ defined(slug.current) && _id == $id][0]{
    ${ogFieldsFragment}
  }
`);

export const FORM_QUERY = groq`*[_type == $_type && defined(slug) && slug.current == $slug][0].blocks[_type == "form"][0].form->{
  emailSubject,
  emailTo,
  "fields": customFormFields[] {
    ${customFormFieldsFragment}
  },
  "honeypot": _id
}`;

export const FROM_EMAIL_QUERY = groq`*[_type == "siteSettings"][0].orgEmails[isPrimary == true][0].email`;

export const SETTINGS_QUERY = groq`*[_type == "siteSettings"][0] {
  "siteTitle": coalesce(siteTitle, "Update your site title in the Sanity Studio."),
  "siteUrl": coalesce(siteUrl, "https://www.UPDATE-SITEURL-IN-SANITY-STUDIO.com"),
  "favicon": coalesce(favicon.asset->url, "https://fav.farm/✅"),
  "social": social.profiles[] {
    _type,
    _key,
    handle,
    platform,
    url,
    notes,
  },
  "footer": *[_type == "footerSettings"][0] {
    "menus": footerMenus[]-> {
        _type,
        _id,
        title,
        items[] {
          _type,
          _key,
          link {
            ${linkFragment}
          }
        }
      },
  }
}`;

export const REDIRECTS_QUERY = groq`coalesce(*[_type == "redirectSettings"][0].redirects[], [])`;

export const REDIRECT_SETTINGS_ID_QUERY = groq`
  *[_type == "redirectSettings"][0]._id
`;
