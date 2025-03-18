import type { ArticleList as Props } from '~/types/articleList';
import { formatDate } from '~/utils/misc';
import { Badge } from './Badge';
import { Container } from './Container';
import { Heading } from './Heading';
import { Overline } from './Overline';
import { PortableText } from './PortableText/PortableText';

export const ArticleList = ({ header, articles }: Props) => {
  return (
    <Container className="my-16">
      {articles.length > 0 ? (
        <>
          {header && (
            <div className="mx-auto my-14 flex max-w-2xl flex-col items-center text-center">
              <PortableText portableText={header} />
            </div>
          )}
          <div className="mx-auto grid grid-cols-1 grid-rows-[repeat(4,_auto)] gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {articles.map((post) => (
              <a
                key={post._id}
                href={`/blog/${post.slug}`}
                className="contents"
              >
                <article className="group row-span-4 grid grid-rows-subgrid gap-3 space-y-3 rounded-lg bg-background/70 p-8 shadow-sm shadow-stone-300 transition duration-200 hover:bg-background dark:bg-zinc-950 dark:shadow-none dark:hover:bg-cyan-950/25 dark:hover:backdrop-blur-md">
                  {post.publishedAt ? (
                    <Overline className="mb-0">
                      {formatDate(post.publishedAt)}
                    </Overline>
                  ) : (
                    <span className="my-0" />
                  )}
                  <Heading level="h2" variant="h3" className="my-0">
                    {post.title}
                  </Heading>
                  <p className="text-muted">{post.excerpt}</p>
                  <ul className="flex flex-wrap gap-2">
                    {Array.isArray(post.tags) &&
                      post.tags.map((tag) => (
                        <Badge className="pointer-events-none bg-zinc-200 dark:bg-zinc-900 dark:group-hover:bg-cyan-950/50">
                          {tag.title}
                        </Badge>
                      ))}
                  </ul>
                </article>
              </a>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center">No articles found.</p>
      )}
    </Container>
  );
};
