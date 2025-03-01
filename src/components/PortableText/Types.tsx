import { Image } from '../Image';
import { PortableText } from './PortableText';

export const Types: any = {
  // code: ({ value }: { value: Props }) => {
  //   console.log(value);
  //   return (
  //     <div className="not-prose rounded-lg bg-zinc-950 p-1 text-sm scheme-dark in-data-stack:rounded-none dark:inset-ring dark:inset-ring-white/10 in-data-stack:dark:inset-ring-0">
  //       <div className="px-3 pt-0.5 pb-1.5 text-xs/5 text-zinc-400 dark:text-white/50">
  //         {value.language}
  //       </div>
  //       <div className="*:flex *:*:max-w-none *:*:shrink-0 *:*:grow *:overflow-auto *:rounded-md *:bg-white/10! *:p-5 *:inset-ring *:inset-ring-white/10 dark:*:bg-white/5! dark:*:inset-ring-white/5 **:[.line]:isolate">
  //         <Code code={value.code} lang={value.language} theme="dark-plus" />
  //       </div>
  //     </div>
  //   );
  // },
  blockquote: ({ value }) => {
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
  imageObject: ({ value }) => {
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
