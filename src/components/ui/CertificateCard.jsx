import { motion } from "motion/react";
import { Award, ExternalLink } from "lucide-react";

export default function CertificateCard({ certificate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all hover:border-accent/40"
    >
      <div className="relative aspect-video bg-linear-to-br from-surface to-base p-4 flex items-center justify-center border-b border-line">
        {certificate.image ? (
          <img
            src={certificate.image}
            alt={certificate.title}
            className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100 rounded-md"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        ) : (
          <Award size={48} className="text-accent/40" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-2 text-xs font-medium uppercase tracking-wider text-accent">
          {certificate.category}
        </span>
        <h3 className="mb-1 font-bold text-heading leading-snug line-clamp-2">
          {certificate.title}
        </h3>
        <p className="text-sm text-muted">{certificate.issuer}</p>
        <p className="mt-1 text-xs font-mono text-muted">
          {new Date(certificate.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
        </p>
        <a
          href={certificate.credentialUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-heading transition-colors"
        >
          View Certificate <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  );
}