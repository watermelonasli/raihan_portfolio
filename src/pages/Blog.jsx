import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Search, Clock, Calendar, ArrowRight } from "lucide-react";
import { articles, blogCategories } from "../data/articles";
import BlogCard from "../components/ui/BlogCard";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const featuredArticle = articles.find((a) => a.featured);
  const isFiltering = searchQuery !== "" || selectedCategory !== "All";

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const gridArticles = isFiltering
    ? filteredArticles
    : filteredArticles.filter((a) => a.slug !== featuredArticle?.slug);

  const visibleArticles = gridArticles.slice(0, visibleCount);

  return (
    <div className="pt-28 pb-24 sm:pt-32">
      <div className="section-shell">
        <div className="mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold tracking-tight text-heading sm:text-5xl"
          >
            Thoughts & <span className="text-gradient">Tutorials</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-muted sm:text-lg"
          >
            I write about web development, design, and the lessons I learn while building things.
          </motion.p>
        </div>

        {!isFiltering && featuredArticle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16 overflow-hidden rounded-3xl border border-line bg-surface shadow-xl group"
          >
            <div className="grid md:grid-cols-2">
              <Link to={`/blog/${featuredArticle.slug}`} className="relative aspect-video md:aspect-auto overflow-hidden bg-base">
                {featuredArticle.image ? (
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm font-mono text-muted">Featured Article</div>
                )}
                <div className="absolute top-4 left-4 rounded-md bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-contrast">
                  Featured
                </div>
              </Link>
              <div className="flex flex-col justify-center p-6 sm:p-10">
                <div className="mb-4 flex items-center gap-4 text-xs font-medium text-muted">
                  <span className="text-accent bg-accent-soft px-2 py-0.5 rounded">{featuredArticle.category}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(featuredArticle.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {featuredArticle.readingTime} min read</span>
                </div>
                <Link to={`/blog/${featuredArticle.slug}`}>
                  <h2 className="mb-3 text-2xl font-bold text-heading transition-colors group-hover:text-accent sm:text-3xl">
                    {featuredArticle.title}
                  </h2>
                </Link>
                <p className="mb-6 text-sm leading-relaxed text-muted sm:text-base line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
                <Link
                  to={`/blog/${featuredArticle.slug}`}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-base border border-line px-5 py-2.5 text-sm font-semibold text-heading transition-all hover:border-accent/50 hover:text-accent"
                >
                  Read Article <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mb-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-wrap justify-center gap-2">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setVisibleCount(6); }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-accent text-accent-contrast"
                    : "bg-surface border border-line text-muted hover:text-heading"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(6); }}
              className="w-full rounded-full border border-line bg-surface py-2.5 pl-10 pr-4 text-sm text-heading placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        {visibleArticles.length > 0 ? (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {visibleArticles.map((article) => (
                <BlogCard key={article.slug} article={article} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-muted">No articles found matching your criteria.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-4 text-sm font-semibold text-accent hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {visibleCount < gridArticles.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-heading transition-all hover:border-accent/50 hover:text-accent"
            >
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
}