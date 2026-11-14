import { motion } from "motion/react";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import { profile, socials } from "../../data/profile";

const ICONS = { github: Github, linkedin: Linkedin, instagram: Instagram, mail: Mail };

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionTitle 
          badge="Contact" 
          title="Let's build something" 
          subtitle="Have a project in mind or just want to say hi? Feel free to reach out through my email or social profiles." 
        />

        {/* The grid is now a single, centered column */}
        <div className="mx-auto max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="rounded-3xl border border-line bg-surface p-8 sm:p-12 text-center shadow-xl"
          >
            <div className="mx-auto mb-8 grid size-16 place-items-center rounded-full bg-accent-soft text-accent">
              <Mail size={32} />
            </div>
            
            <h3 className="mb-3 text-2xl font-bold text-heading">Get in touch directly</h3>
            <p className="mb-8 text-muted">I usually reply within 24 hours.</p>

            <a 
              href={`mailto:${profile.email}`} 
              className="group inline-flex items-center gap-3 rounded-full bg-base border border-line px-6 py-4 text-lg font-semibold text-heading transition-all hover:border-accent hover:text-accent hover:scale-105"
            >
              {profile.email}
            </a>

            <div className="mt-12 border-t border-line pt-8">
              <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted">Connect on social media</p>
              <div className="flex justify-center gap-4">
                {socials.map((s) => {
                  const Icon = ICONS[s.icon] ?? Mail;
                  return (
                    <a 
                      key={s.label} 
                      href={s.url} 
                      target="_blank" 
                      rel="noreferrer noopener" 
                      className="grid size-12 place-items-center rounded-2xl border border-line bg-base text-muted transition-all hover:-translate-y-1 hover:border-accent/50 hover:text-accent" 
                      aria-label={s.label}
                    >
                      <Icon size={22} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}