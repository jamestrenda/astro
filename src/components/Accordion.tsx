import {
  Accordion as BaseAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Heading } from "~/components/Heading";

interface Props {
  data: {
    title: string;
    description: string;
  }[];
}

export function Accordion({ data }: Props) {
  return (
    <BaseAccordion type="single" collapsible className="w-full">
      {data?.map((item, i) => {
        return (
          <AccordionItem key={i} value={`item-${i.toFixed()}`}>
            <AccordionTrigger>
              <Heading level={3}>{item.title}</Heading>
            </AccordionTrigger>
            <AccordionContent>
              <p
                className="text-lg md
              :text-xl"
              >
                {item.description}
              </p>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </BaseAccordion>
  );
}
