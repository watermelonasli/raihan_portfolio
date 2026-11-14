import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import { hardSkills, softSkills, tools } from "../../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-surface/30">
      <div className="section-shell">
        <SectionTitle badge="Skills" title="What I bring to the table" subtitle="The tools and technologies I use to build things, plus the soft skills that keep projects moving." />

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-heading">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">{'</>'}</span>
              Hard Skills
            </h3>
            <div className="space-y-5">
              {hardSkills.map((skill, i) => (
                <div key={skill.name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-heading">{skill.name}</span>
                    <span className="font-mono text-xs text-accent">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-base">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }} className="h-full rounded-full bg-linear-to-r from-accent/50 to-accent" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-heading">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent"><CheckCircle2 size={18} /></span>
              Soft Skills
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {softSkills.map((skill) => (
                <div key={skill.name} className="rounded-xl border border-line bg-surface p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-semibold text-heading text-sm">{skill.name}</h4>
                    <span className="font-mono text-xs text-muted">{skill.level}%</span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted">{skill.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}