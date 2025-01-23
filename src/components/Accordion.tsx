import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as BaseAccordion,
} from '~/components/ui/accordion';

interface Props {
  data: {
    title: string;
    description: string;
  }[];
}

export function Accordion({ data }: Props) {
  return (
    <BaseAccordion
      type="multiple"
      className="w-full lg:grid lg:grid-cols-3 lg:gap-8"
    >
      {data?.map((item, i) => {
        return (
          <AccordionItem
            key={i}
            value={`item-${i.toFixed()}`}
            className="last:border-none dark:border-white/5 lg:border-b-0 [&[data-state=closed]>div]:h-0 lg:[&[data-state=closed]>div]:h-auto"
          >
            <AccordionTrigger className="select-text text-left lg:pointer-events-none lg:cursor-text [&>svg]:h-6 [&>svg]:w-6 md:[&>svg]:h-8 md:[&>svg]:w-8 lg:[&>svg]:hidden">
              {item.title}
            </AccordionTrigger>
            <AccordionContent forceMount>
              <p className="text-lg dark:text-white/50">{item.description}</p>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </BaseAccordion>
  );
}
