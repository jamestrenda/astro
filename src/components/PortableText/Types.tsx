import type {
  PortableTextComponentProps,
  PortableTextComponents,
} from '@portabletext/react';
import type { Blockquote } from '~/types/blockquote';
import type { ImageObject } from '~/types/image';
import { CodeBlock } from '../CodeBlock';
import { Image } from '../Image';
import { PortableText } from './PortableText';

export const Types: PortableTextComponents['types'] = {
  code: ({ value }: any) => {
    return (
      <div className="overflow-hidden rounded-[16px] border-8 border-stone-300 dark:border-zinc-950">
        <div className="not-prose rounded-lg bg-background p-1 text-sm dark:inset-ring dark:inset-ring-white/10">
          {value.filename && (
            <div className="px-3.5 pt-3.5 text-xs/3 text-muted dark:text-white/50">
              {value.filename}
            </div>
          )}
          {/* <div className="*:rounded-md *:bg-zinc-500/10! *:p-5 *:inset-ring *:inset-ring-white/10 dark:*:bg-white/5! dark:*:inset-ring-white/5 **:[.line]:isolate"> */}
          <CodeBlock code={value.code} language={value.language} />
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
        className="mx-auto block rounded-lg"
      />
    ) : null;
  },
  // add more block-level components here.
};
