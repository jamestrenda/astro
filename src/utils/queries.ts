import groq from "groq";

const portableTextFragment = groq`
    ...,
    markDefs[]{
        ...,
        _type == "internalRef" => {
            "slug": @.ref.document->slug.current,
            @.ref.document->._type == "post" => {
                "slug": "blog/" + @.ref.document->.slug.current,
            }
        },
        _type == "externalLink" => {
            "url": @.link.url,
            "newWindow": @.link.newWindow
        }
    }
`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
    title,
    body[] {
        ${portableTextFragment}
    }
}`;
