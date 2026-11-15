import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import SectionTitle from "../components/ui/SectionTitle";
import { supabase } from "../lib/supabase";
import { articles as staticArticles } from "../data/articles";

export default function Blog() {
  const [articles, setArticles] = useState(staticArticles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        // Ambil dari database
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("is_published", true)
          .order("date", { ascending: false });

        if (error) throw error;

        // Gabungkan data statis dan data database
        const allArticlesMap = new Map();
        
        // Masukkan data statis dulu
        staticArticles.forEach((a) => allArticlesMap.set(a.slug, a));
        
        // Masukkan data dari database (menimpa statis jika slug-nya sama)
        if (data && data.length > 0) {
          data.forEach((a) => {
            // Samakan format readingtime DB ke readingTime UI
            const normalized = { ...a, readingTime: a.readingtime || a.readingTime || 5 };
            allArticlesMap.set(a.slug, normalized);
          });
        }

        // Urutkan berdasarkan tanggal terbaru
        const combined = Array.from(allArticlesMap.values()).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        
        setArticles(combined);
      } catch (err) {
        console.error("Gagal mengambil artikel:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return (
    <section className="relative min-h-screen py-24 sm:py-32">
      <div className="section-shell">
        <SectionTitle
          badge="Blog"
          title="Thoughts & Experiments"
          subtitle="Writing about web development, design, and everything in between."
        />

        {loading ? (
          <div className="py-20 text-center text-muted">Loading articles...</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface"
              >
                <Link to={`/blog/${article.slug}`} className="block overflow-hidden aspect-video bg-base">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted">No Image</div>
                  )}
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-3 text-xs font-medium text-accent">
                    <span>{article.category}</span>
                  </div>

                  <Link to={`/blog/${article.slug}`}>
                    <h3 className="mb-2 text-xl font-bold text-heading group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="mb-4 flex-1 text-sm text-muted line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between text-xs text-muted">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} /> {article.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} /> {article.readingTime} min
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}