import { Boxes, Code, Contrast, FileCode, Layers, Paintbrush } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    title: "Color Control",
    description: "Tune semantic colors for surfaces, actions, feedback states, borders and focus rings.",
    icon: <Paintbrush className="size-6" />,
  },
  {
    title: "Typography Settings",
    description: "Use the V-Suite font stack with Inter, Georgia and Geist Mono across previews.",
    icon: <FileCode className="size-6" />,
  },
  {
    title: "Tailwind v4 & v3",
    description: "Export theme variables and Tailwind mappings for existing shadcn/ui projects.",
    icon: <Code className="size-6" />,
  },
  {
    title: "Detailed Properties",
    description: "Fine-tune radius, spacing, shadows, fonts and mode-specific theme values.",
    icon: <Layers className="size-6" />,
  },
  {
    title: "Contrast Checker",
    description: "Review foreground and background pairs while the theme changes in real time.",
    icon: <Contrast className="size-6" />,
  },
  {
    title: "Component Catalog",
    description: "Validate every theme against buttons, forms, feedback, navigation and data display.",
    icon: <Boxes className="size-6" />,
  },
];

export function Features() {
  return (
    <section id="features" className="relative isolate w-full py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/50 to-transparent" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-4"
          >
            <h2 className="text-left text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              One theme workspace,
              <br className="hidden lg:block" />
              <span className="text-muted-foreground">all component states.</span>
            </h2>
            <p className="max-w-md text-lg text-muted-foreground">
              The editor stays focused on design-system work instead of social, community or paid flows.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="group h-full rounded-2xl border bg-card p-6 shadow-xs transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
