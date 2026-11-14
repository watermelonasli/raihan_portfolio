import { motion } from "motion/react";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function ProjectCard({ project, onOpen }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent-soft/20"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-linear-to-br from-surface to-base">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-6 text-center font-mono text-sm text-muted">
            {project.title} Preview
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-surface/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
            {project.category}
          </span>
          <span className="text-xs font-medium text-muted">{project.year}</span>
        </div>
        <h3 className="mb-2 text-xl font-bold text-heading">{project.title}</h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted line-clamp-2">
          {project.description}
        </p>

        <div className="mb-6 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded-md border border-line bg-base px-2 py-0.5 text-xs text-muted">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
          <button
            onClick={() => onOpen(project)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-heading"
          >
            View Details <ArrowRight size={16} />
          </button>
          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted transition-colors hover:text-accent"
              aria-label="Live Demo"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}