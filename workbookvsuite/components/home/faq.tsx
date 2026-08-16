import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";

const faqs = [
  {
    question: "What is V-Suite Theme Studio?",
    answer:
      "A visual shadcn/ui theme editor based on the Tweakcn workflow and adapted to the V-Suite design system tokens.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. The main editor and component previews are designed as an open, direct-use experience without a community or account flow.",
  },
  {
    question: "What is the Components view for?",
    answer:
      "It lets you test the active theme on real buttons, forms, feedback states, cards, tabs, tables and loading states before exporting.",
  },
  {
    question: "Does it support light and dark mode?",
    answer:
      "Yes. The V-Suite token source includes both light and dark values, and previews can be switched between modes at any time.",
  },
  {
    question: "Can I use the output in an existing project?",
    answer:
      "Yes. Exported CSS variables and Tailwind mappings are intended for shadcn/ui projects using the same semantic token conventions.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="w-full py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <h2 className="mb-5 text-3xl font-semibold tracking-tight md:text-5xl">FAQ</h2>
            <p className="text-lg text-muted-foreground">
              The fork is intentionally narrower: theme editing, component validation and export.
            </p>
          </motion.div>

          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.question} value={`item-${i}`} className="rounded-lg border bg-card px-4">
                  <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
