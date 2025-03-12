import type {
  PortableTextComponentProps,
  PortableTextComponents,
} from '@portabletext/react';
import { stegaClean } from '@sanity/client/stega';
import { Lightbox } from '~/components/Lightbox';
import type { Blockquote } from '~/types/blockquote';
import type { ImageObject } from '~/types/image';
import type { Video as VideoType } from '~/types/video';
import { CodeBlock } from '../CodeBlock';
import { Image } from '../Image';
import { Video } from '../Video';
import { PortableText } from './PortableText';

export const Types: PortableTextComponents['types'] = {
  code: ({ value }: any) => {
    return (
      <div className="peer code-block overflow-hidden rounded-2xl border-8 border-stone-300 peer-[.code-block]:mt-5! dark:border-zinc-950">
        <div className="not-prose rounded-lg bg-background p-1 text-sm dark:inset-ring dark:inset-ring-white/10">
          {value.filename && (
            <div className="px-3.5 pt-3.5 text-xs/3 text-muted dark:text-white/50">
              {value.filename}
            </div>
          )}
          {/* <div className="*:rounded-md *:bg-zinc-500/10! *:p-5 *:inset-ring *:inset-ring-white/10 dark:*:bg-white/5! dark:*:inset-ring-white/5 **:[.line]:isolate"> */}
          <CodeBlock
            code={value.code}
            language={value.language}
            highlightedLines={value.highlightedLines}
          />
          {/* </div> */}
        </div>
      </div>
    );
  },
  blockquote: ({ value }: PortableTextComponentProps<Blockquote>) => {
    const { quote, cite } = value;
    return (
      quote && (
        <div className="space-y-4! rounded-lg bg-zinc-100 p-6 dark:bg-zinc-950 prose-blockquote:border-none prose-blockquote:p-0 prose-blockquote:text-base prose-blockquote:leading-relaxed prose-blockquote:font-normal prose-blockquote:text-muted">
          <blockquote className="*:m-0!">
            <PortableText portableText={quote} />
          </blockquote>
          {cite && (
            <cite className="text-sm *:m-0!">
              <PortableText portableText={cite} />
            </cite>
          )}
        </div>
      )
    );
  },
  imageObject: ({ value }: PortableTextComponentProps<ImageObject>) => {
    return value.image ? (
      <Lightbox className="w-full overflow-hidden">
        <Image
          id={value.image.id}
          asset={value.image}
          // width={1280}
          // height={817}
          // loading="eager"
          mode="cover"
          queryParams={{
            q: 100,
          }}
          className="not-prose rounded-2xl border-8 border-stone-300 dark:border-zinc-950 dark:opacity-80"
        />
      </Lightbox>
    ) : null;
  },
  video: ({ value }: PortableTextComponentProps<VideoType>) => {
    const clean = stegaClean(value);
    return (
      <div className="peer video-block not-prose mt-5 aspect-video w-full overflow-hidden rounded-2xl border-8 border-stone-300 bg-foreground group-[.overlay]:border-transparent peer-[.video-block]:mt-5! dark:border-zinc-950 dark:bg-background">
        <Video {...clean} />
      </div>
    );
  },
  // add more block-level components here.
};
