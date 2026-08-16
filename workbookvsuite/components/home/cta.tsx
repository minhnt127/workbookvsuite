import { Button } from "@/components/ui/button";
import { ArrowRight, Boxes } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="relative isolate w-full overflow-hidden border-y bg-primary py-20 text-primary-foreground md:py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary to-primary/80" />
      <div className="container relative mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-6 text-center"
        >
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            Build the theme and verify the components in one place.
          </h2>
          <p className="max-w-2xl text-primary-foreground/80 md:text-lg">
            Start with the V-Suite token set, customize it visually, then inspect how the theme behaves across reusable UI primitives.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/editor/theme">
              <Button size="lg" variant="secondary" className="rounded-full px-7">
                Open theme editor
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/editor/theme?p=components">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-primary-foreground/30 bg-transparent px-7 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Boxes className="size-4" />
                View components
              </Button>
            </Link>
          </div>
          <p className="text-sm text-primary-foreground/75">No login required for the core workflow.</p>
        </motion.div>
      </div>
    </section>
  );
}
