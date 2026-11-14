import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Clock, Calendar } from "lucide-react";

export default function BlogCard({ article }) {
  const date = new Date(article.date).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric"
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent-soft/10"
    >
      <Link to={`/blog/${article.slug}`} className="block relative aspect-4/3 overflow-hidden bg-base">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-mono text-muted">
            {article.category}
          </div>
        )}
        <div className="absolute top-3 left-3 rounded-md bg-base/80 px-2 py-1 text-xs font-medium text-heading backdrop-blur-sm">
          {article.category}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1.5"><Calendar size={13} /> {date}</span>
          <span className="flex items-center gap-1.5"><Clock size={13} /> {article.readingTime} min read</span>
        </div>
        <Link to={`/blog/${article.slug}`}>
          <h3 className="mb-2 text-lg font-bold text-heading transition-colors group-hover:text-accent line-clamp-2">
            {article.title}
          </h3>
        </Link>
        <p className="flex-1 text-sm leading-relaxed text-muted line-clamp-3">
          {article.excerpt}
        </p>
        <Link
          to={`/blog/${article.slug}`}
          className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
        >
          Read Article →
        </Link>
      </div>
    </motion.article>
  );
}