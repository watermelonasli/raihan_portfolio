import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Clock, Calendar, User, Link as LinkIcon } from "lucide-react";
import { getArticleBySlug, articles } from "../data/articles";
import BlogCard from "../components/ui/BlogCard";

const slugify = (text) => text.toLowerCase().replace(/[^\w]+/g, "-");

export default function BlogDetail() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const tableOfContents = article.content
    .filter((block) => block.type === "h2")
    .map((block) => ({
      text: block.text,
      id: slugify(block.text),
    }));

  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  const publishDate = new Date(article.date).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric"
  });

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="pt-24 pb-24">
      <header className="mx-auto max-w-3xl px-5 pt-10 pb-12 sm:px-8 text-center">
        <Link
          to="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>
        
        <div className="mb-4 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-muted">
          <span className="rounded-full bg-accent-soft px-3 py-1 text-accent">{article.category}</span>
          <span className="flex items-center gap-1.5"><Calendar size={15} /> {publishDate}</span>
          <span className="flex items-center gap-1.5"><Clock size={15} /> {article.readingTime} min read</span>
        </div>

        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-heading sm:text-4xl md:text-5xl leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center justify-center gap-3">
          <div className="grid size-10 place-items-center rounded-full bg-surface border border-line text-muted">
            <User size={18} />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-heading">{article.author}</p>
            <p className="text-xs text-muted">Author</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 sm:px-8 mb-12">
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-line bg-base">
          {article.image ? (
            <img src={article.image} alt={article.title} className="h-full w-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-muted">Article Image</div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_250px]">
          
          <article className="prose prose-slate dark:prose-invert max-w-none">
            {article.content.map((block, index) => {
              if (block.type === "h2") {
                return (
                  <h2 key={index} id={slugify(block.text)} className="mt-10 mb-4 scroll-mt-24 text-2xl font-bold text-heading">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "p") {
                return <p key={index} className="mb-6 leading-relaxed text-body">{block.text}</p>;
              }
              if (block.type === "ul") {
                return (
                  <ul key={index} className="mb-6 space-y-2 pl-5 list-disc text-body">
                    {block.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                );
              }
              if (block.type === "blockquote") {
                return (
                  <blockquote key={index} className="my-8 border-l-4 border-accent bg-accent-soft px-6 py-4 text-lg italic text-heading rounded-r-lg">
                    "{block.text}"
                  </blockquote>
                );
              }
              if (block.type === "code") {
                return (
                  <div key={index} className="mb-8 overflow-hidden rounded-xl border border-line bg-[#0d1117]">
                    <div className="flex items-center justify-between border-b border-line/50 px-4 py-2 bg-surface/50">
                      <span className="text-xs font-mono text-muted">{block.language}</span>
                    </div>
                    <pre className="p-4 overflow-x-auto text-sm font-mono text-[#c9d1d9]">
                      <code>{block.text}</code>
                    </pre>
                  </div>
                );
              }
              return null;
            })}
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-line bg-surface p-6">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-heading">
                <LinkIcon size={16} className="text-accent" /> Table of Contents
              </h3>
              <nav className="space-y-2.5">
                {tableOfContents.map((toc) => (
                  <a
                    key={toc.id}
                    href={`#${toc.id}`}
                    onClick={(e) => scrollToSection(e, toc.id)}
                    className="block text-sm text-muted transition-colors hover:text-accent"
                  >
                    {toc.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>

      {relatedArticles.length > 0 && (
        <div className="mx-auto max-w-6xl px-5 sm:px-8 mt-24 border-t border-line pt-16">
          <h2 className="mb-8 text-2xl font-bold text-heading">Related Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((related) => (
              <BlogCard key={related.slug} article={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}