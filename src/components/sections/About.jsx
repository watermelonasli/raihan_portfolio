import { motion } from "motion/react";
import { GraduationCap, Code2, Users, Target, Briefcase } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";

const CARDS = [
  { icon: Code2, title: "Interests", text: "Front-End architecture, interactive design, and performance optimization." },
  { icon: Target, title: "Career Goals", text: "Become a Front-End Engineer who builds products that solve real, everyday problems for small businesses." },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionTitle badge="About Me" title="The person behind the code" align="left" />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <p className="leading-relaxed text-body">I'm <strong className="text-heading">Raihan</strong>, a Front-End Web Developer based in Banjarmasin. I started coding because I was curious about how things made — and now I get to build them. I am also passionate about creating intuitive user experiences and writing clean, maintainable code.</p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {CARDS.map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/30">
                <card.icon className="mb-3 text-accent" size={24} />
                <h3 className="mb-1 font-semibold text-heading">{card.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}