import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { supabase } from "../lib/supabase";
import { articles as staticArticles } from "../data/articles";

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      try {
        // 1. Coba cari di database
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("slug", slug)
          .eq("is_published", true)
          .single();

        if (data && !error) {
          // Samakan format readingTime
          setArticle({ ...data, readingTime: data.readingtime || data.readingTime || 5 });
        } else {
          // 2. Jika tidak ada di database, cari di data statis
          const staticData = staticArticles.find((a) => a.slug === slug);
          setArticle(staticData || null);
        }
      } catch (err) {
        // Fallback jika error
        const staticData = staticArticles.find((a) => a.slug === slug);
        setArticle(staticData || null);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading article...</div>;
  if (!article) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-heading">Article not found</h1>
      <button onClick={() => navigate('/blog')} className="text-accent hover:underline flex items-center gap-2">
        <ArrowLeft size={16} /> Back to Blog
      </button>
    </div>
  );

  // Fungsi render content blok JSON
  const renderContent = (contentArray) => {
    if (!Array.isArray(contentArray)) return null;
    
    return contentArray.map((block, index) => {
      switch (block.type) {
        case "h2":
          return <h2 key={index} className="text-2xl font-bold text-heading mt-10 mb-4">{block.text}</h2>;
        case "h3":
          return <h3 key={index} className="text-xl font-bold text-heading mt-8 mb-3">{block.text}</h3>;
        case "ul":
          return (
            <ul key={index} className="list-disc list-inside space-y-2 my-4 text-body leading-relaxed">
              {block.items?.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          );
        case "blockquote":
          return (
            <blockquote key={index} className="border-l-4 border-accent pl-4 italic my-6 text-muted bg-surface p-4 rounded-r-lg">
              {block.text}
            </blockquote>
          );
        case "code":
          return (
            <div key={index} className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto my-6 text-sm font-mono">
              <pre><code>{block.text}</code></pre>
            </div>
          );
        case "p":
        default:
          return <p key={index} className="text-body leading-relaxed mb-6">{block.text}</p>;
      }
    });
  };

  return (
    <article className="min-h-screen py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline mb-8">
          <ArrowLeft size={16} /> Back to all articles
        </Link>

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-4">
            <span className="font-medium text-accent bg-accent-soft px-3 py-1 rounded-full">{article.category}</span>
            <span className="flex items-center gap-1.5"><Calendar size={16} /> {article.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={16} /> {article.readingTime} min read</span>
            <span className="flex items-center gap-1.5"><User size={16} /> {article.author}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-heading leading-tight mb-6">
            {article.title}
          </h1>

          {article.image && (
            <div className="rounded-2xl overflow-hidden mb-10 aspect-video">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          {renderContent(article.content)}
        </div>
      </div>
    </article>
  );
}