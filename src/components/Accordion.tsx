import {
  Accordion as BaseAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

interface Props {
  data: {
    title: string;
    description: string;
  }[];
}

export function Accordion({ data }: Props) {
  return (
    <BaseAccordion
      type="single"
      className="w-full lg:grid lg:grid-cols-3 lg:gap-8"
    >
      {data?.map((item, i) => {
        return (
          <AccordionItem
            key={i}
            value={`item-${i.toFixed()}`}
            className="[&[data-state=closed]>div]:h-0 lg:[&[data-state=closed]>div]:h-auto"
          >
            <AccordionTrigger className="text-left [&>svg]:h-6 [&>svg]:w-6 md:[&>svg]:h-8 md:[&>svg]:w-8 lg:[&>svg]:hidden lg:cursor-text select-text lg:pointer-events-none">
              {item.title}
            </AccordionTrigger>
            <AccordionContent forceMount>
              <p className="md:text-lg">{item.description}</p>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </BaseAccordion>
  );
}
