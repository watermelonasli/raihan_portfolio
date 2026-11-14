import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import BlogCard from "../ui/BlogCard";
import { articles } from "../../data/articles";

export default function BlogPreview() {
  const latestArticles = articles.slice(0, 3);

  return (
    <section id="blog" className="relative py-24 sm:py-32 bg-surface/30">
      <div className="section-shell">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionTitle badge="Writing" title="Latest Articles" subtitle="I write about React, CSS, and the lessons I learn while building things." align="left" />
          <Link to="/blog" className="mb-12 hidden items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-heading transition-colors hover:border-accent/50 hover:text-accent sm:inline-flex">
            View All Articles <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article) => (
            <BlogCard key={article.slug} article={article} />
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link to="/blog" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-heading transition-colors hover:border-accent/50 hover:text-accent">
            View All Articles <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}