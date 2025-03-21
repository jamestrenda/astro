import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as BaseAccordion,
} from '~/components/ui/accordion';
import type { DescriptionGrid as Props } from '~/types/descriptionGrid';
import { Container } from './Container';
import { PortableText } from './PortableText/PortableText';

export const DescriptionGrid = ({ header, items }: Props) => {
  return (
    <div className="relative">
      {/* TODO: // add that neat hover effect that reveals a grid background image */}
      <Container padding={true}>
        <div className="[&_p]:max-w-5xl [&_p]:text-xl [&_p]:font-light [&_p]:text-muted md:[&_p]:text-2xl">
          {header && <PortableText portableText={header} />}
        </div>
        <div className="mt-14">
          {items ? (
            <BaseAccordion
              type="multiple"
              className="w-full lg:grid lg:grid-cols-3 lg:gap-4"
            >
              {items?.map((item, i) => {
                return (
                  <AccordionItem
                    key={i}
                    value={`item-${i.toFixed()}`}
                    className="border-stone-300 backdrop-blur-md transition delay-75 hover:delay-0 dark:border-zinc-950 dark:bg-black/30 max-lg:-mx-4 max-lg:px-4 max-lg:last:border-none max-lg:hover:bg-stone-300/50 max-lg:data-[state=open]:bg-stone-300/50 max-lg:dark:hover:bg-black/20 max-lg:dark:data-[state=open]:bg-black/20 lg:rounded-lg lg:border lg:border-b-0 lg:border-solid lg:bg-zinc-100 lg:p-8 lg:dark:bg-black/30 [&[data-state=closed]>div]:h-0 lg:[&[data-state=closed]>div]:h-auto"
                  >
                    {/* TODO: could this implementation cause accessbility issues for larger screens where the button is useless? Could/should I add some kind of aria attributes to address it? */}
                    <AccordionTrigger className="select-text text-left lg:pointer-events-none lg:cursor-text [&>svg]:h-6 [&>svg]:w-6 md:[&>svg]:h-8 md:[&>svg]:w-8 lg:[&>svg]:hidden">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent
                      forceMount
                      className="text-muted max-lg:pr-12 [&_p]:text-base [&_p]:lg:text-lg"
                    >
                      {item.description && (
                        <PortableText portableText={item.description} />
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </BaseAccordion>
          ) : null}
        </div>
      </Container>
    </div>
  );
};
