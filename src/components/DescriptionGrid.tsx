import type { DescriptionGrid as Props } from "~/types/descriptionGrid";
import { Container } from "./Container";
import { PortableText } from "./PortableText/PortableText";
import {
  Accordion as BaseAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export const DescriptionGrid = ({ header, items }: Props) => {
  return (
    <Container padding={true}>
      <div className="[&_p]:text-xl [&_p]:md:text-2xl [&_p]:max-w-5xl [&_p]:font-light">
        {header && <PortableText portableText={header} />}
      </div>

      <div className="mt-14">
        {items ? (
          //   <Accordion data={principles} client:media="(max-width: 1023px)" />
          <BaseAccordion
            type="multiple"
            className="w-full lg:grid lg:grid-cols-3 lg:gap-8"
          >
            {items?.map((item, i) => {
              return (
                <AccordionItem
                  key={i}
                  value={`item-${i.toFixed()}`}
                  className="[&[data-state=closed]>div]:h-0 lg:[&[data-state=closed]>div]:h-auto lg:border-b-0 dark:border-white/5 last:border-none"
                >
                  <AccordionTrigger className="text-left [&>svg]:h-6 [&>svg]:w-6 md:[&>svg]:h-8 md:[&>svg]:w-8 lg:[&>svg]:hidden lg:cursor-text select-text lg:pointer-events-none">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent
                    forceMount
                    className="[&_p]:text-lg dark:text-white/50"
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
  );
};
