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
    <div className="relative">
      {/* TODO: // add that neat hover effect that reveals a grid background image */}
      <Container padding={true}>
        <div className="[&_p]:text-xl [&_p]:md:text-2xl [&_p]:max-w-5xl [&_p]:font-light text-muted">
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
                    className="[&[data-state=closed]>div]:h-0 lg:[&[data-state=closed]>div]:h-auto lg:border-b-0 max-lg:last:border-none lg:border lg:border-solid lg:p-8 lg:rounded-lg lg:bg-indigo-50 lg:dark:bg-black/30 dark:border-transparent max-lg:hover:bg-indigo-50  transition hover:delay-0 delay-75 max-lg:-mx-4 max-lg:px-4"
                  >
                    {/* TODO: could this implementation cause accessbility issues for larger screens where the button is useless? Could/should I add some kind of aria attributes to address it? */}
                    <AccordionTrigger className="text-left [&>svg]:h-6 [&>svg]:w-6 md:[&>svg]:h-8 md:[&>svg]:w-8 lg:[&>svg]:hidden lg:cursor-text select-text lg:pointer-events-none">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent
                      forceMount
                      className="[&_p]:text-lg dark:text-muted max-lg:pr-12"
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
