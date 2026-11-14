import { motion } from "motion/react";
import { Briefcase, Users, Trophy } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import { experiences } from "../../data/experiences";

const TYPE_ICONS = { internship: Briefcase, organization: Users, competition: Trophy };

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32 bg-surface/30">
      <div className="section-shell">
        <SectionTitle badge="Experience" title="My journey so far" subtitle="Internships, organizations, and competitions that shaped how I work." />

        <div className="mx-auto max-w-3xl">
          <div className="relative border-l-2 border-line pl-6 sm:pl-10">
            {experiences.map((exp, i) => {
              const Icon = TYPE_ICONS[exp.type] || Briefcase;
              return (
                <motion.div key={exp.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: i * 0.1 }} className="relative mb-12 last:mb-0">
                  <span className="absolute -left-8.75 sm:-left-12.75 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-surface text-accent shadow-sm">
                    <Icon size={14} />
                  </span>

                  <div className="rounded-2xl border border-line bg-surface p-6">
                    <div className="mb-2 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                      <h3 className="text-lg font-bold text-heading">{exp.role}</h3>
                      <span className="font-mono text-xs text-accent bg-accent-soft px-2 py-0.5 rounded w-fit">{exp.period}</span>
                    </div>
                    <p className="mb-4 text-sm font-medium text-muted">{exp.organization} · {exp.location}</p>
                    <p className="mb-4 text-sm leading-relaxed text-body">{exp.description}</p>
                    <ul className="space-y-1.5">
                      {exp.highlights.map((h, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-muted">
                          <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}