import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github, FileText, CheckCircle2 } from "lucide-react";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (project) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [project]);

  if (!project) return null;

  const { details, links } = project;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-base/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line p-5">
            <div>
              <span className="text-xs font-medium text-accent">{project.category}</span>
              <h2 className="text-xl font-bold text-heading">{project.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full border border-line p-2 text-muted hover:bg-base hover:text-heading transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8">
            <div className="mb-8 aspect-video w-full overflow-hidden rounded-xl bg-base border border-line">
              {project.thumbnail ? (
                <img src={project.thumbnail} alt={project.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-muted font-mono">Preview</div>
              )}
            </div>

            <div className="mb-8 flex flex-wrap gap-3">
              {links.demo && (
                <a href={links.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast hover:scale-105 transition-transform">
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
              {links.repo && (
                <a href={links.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-line bg-base px-4 py-2 text-sm font-semibold text-heading hover:border-accent/40 transition-colors">
                  <Github size={16} /> Repository
                </a>
              )}
              {links.docs && (
                <a href={links.docs} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-line bg-base px-4 py-2 text-sm font-semibold text-heading hover:border-accent/40 transition-colors">
                  <FileText size={16} /> Documentation
                </a>
              )}
            </div>

            <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
              <div className="space-y-8">
                <section>
                  <h3 className="mb-3 text-lg font-semibold text-heading">The Problem</h3>
                  <p className="text-sm leading-relaxed text-muted">{details.problem}</p>
                </section>

                <section>
                  <h3 className="mb-3 text-lg font-semibold text-heading">Objectives</h3>
                  <ul className="space-y-2">
                    {details.objectives.map((obj, i) => (
                      <li key={i} className="flex gap-2 text-sm text-muted">
                        <CheckCircle2 size={18} className="shrink-0 text-accent" /> {obj}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="mb-3 text-lg font-semibold text-heading">Main Features</h3>
                  <ul className="space-y-2">
                    {details.features.map((feat, i) => (
                      <li key={i} className="flex gap-2 text-sm text-muted">
                        <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" /> {feat}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="mb-3 text-lg font-semibold text-heading">Project Story</h3>
                  <p className="text-sm leading-relaxed text-muted">{details.story}</p>
                </section>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-heading">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="rounded-md bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">{t}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-heading">My Role</h4>
                  <ul className="space-y-2">
                    {details.responsibilities.map((resp, i) => (
                      <li key={i} className="text-sm text-muted">• {resp}</li>
                    ))}
                  </ul>
                </div>

                {details.feedback && details.feedback.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-heading">Feedback</h4>
                    {details.feedback.map((fb, i) => (
                      <blockquote key={i} className="rounded-xl border-l-2 border-accent bg-base p-3 text-sm italic text-muted">
                        "{fb.quote}"
                        <footer className="mt-2 text-xs font-semibold not-italic text-heading">— {fb.name}, {fb.role}</footer>
                      </blockquote>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}