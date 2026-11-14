import { motion } from "motion/react";
import { ArrowRight, Download, Mail, Github, Linkedin, Instagram } from "lucide-react";
import { profile, socials } from "../../data/profile";

const ICONS = { github: Github, linkedin: Linkedin, instagram: Instagram, mail: Mail };

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16">
      <div className="glow-orb left-[-10%] top-[20%] h-[40vw] w-[40vw] animate-float-slow" />
      <div className="glow-orb right-[-10%] bottom-[10%] h-[30vw] w-[30vw] opacity-20" style={{ animationDelay: "2s" }} />

      <div className="section-shell relative z-10 grid w-full items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="order-2 lg:order-1">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-sm font-medium text-accent">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              {profile.availability}
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Hi, I'm <span className="text-gradient">{profile.shortName}</span>.
          </motion.h1>

          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-4 text-xl font-semibold text-heading sm:text-3xl">
            {profile.title}
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-3 text-sm font-mono text-muted sm:text-base">
            {profile.class} · {profile.competency}
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-6 max-w-xl leading-relaxed text-body sm:text-lg">
            {profile.tagline}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition-transform hover:scale-105">
              View Projects <ArrowRight size={16} />
            </a>
            <a href={profile.cvFile} download className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-6 py-3 text-sm font-semibold text-heading backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-accent">
              Download CV <Download size={16} />
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }} className="mt-10 flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">Follow</span>
            <div className="h-px w-8 bg-line" />
            {socials.map((s) => {
              const Icon = ICONS[s.icon] ?? Mail;
              return (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer noopener" className="text-muted transition-colors hover:text-accent" aria-label={s.label}>
                  <Icon size={20} />
                </a>
              );
            })}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-full bg-accent/20 blur-3xl" />
            <div className="overflow-hidden rounded-4xl border border-line bg-surface shadow-2xl rotate-3 transition-transform duration-500 hover:rotate-0">
              <div className="aspect-3/4 w-64 sm:w-72 lg:w-80">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center bg-linear-to-br from-surface to-base p-6 text-center">
                    <span className="text-6xl font-bold text-accent/50 font-mono">R</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}