import { motion } from "motion/react";

export default function SectionTitle({ badge, title, subtitle, align = "center" }) {
  const isCenter = align === "center";
  return (
    <div className={`mb-12 flex flex-col ${isCenter ? "items-center text-center" : "items-start text-left"}`}>
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 inline-block rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-semibold tracking-wider text-accent uppercase"
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg ${isCenter ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}