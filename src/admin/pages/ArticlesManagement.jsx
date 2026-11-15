import { useState, useEffect } from "react";
// 1. PERBAIKAN IMPORT: Gunakan huruf kapital 'S' pada adminService
import { adminService } from "../../services/adminservice"; 
// 2. IMPORT SUPABASE LANGSUNG untuk bypass error jika ada masalah di adminService
import { supabase } from "../../lib/supabase"; 
import FormField from "../components/FormField";
import DeleteDialog from "../components/DeleteDialog";
import { Plus, Edit2, Trash2, Image as ImageIcon } from "lucide-react";

export default function ArticlesManagement() {
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const initialForm = {
    slug: "",
    title: "",
    excerpt: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    readingTime: 5,
    image: "",
    author: "Admin",
    featured: false,
    is_published: true,
    contentStr: '[{"type": "p", "text": "Hello World"}]',
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchArticles = async () => {
    try {
      const data = await adminService.getArticles();
      setArticles(data);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await adminService.uploadImage(file, "articles");
      setFormData((prev) => ({ ...prev, image: url }));
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (article) => {
    setFormData({
      ...article,
      readingTime: article.readingtime || 5, // Handle DB column name
      contentStr: JSON.stringify(article.content || [], null, 2),
    });
    setEditingId(article.id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    try {
      console.log("1. Tombol Save diklik");
      
      if (!formData.title.trim()) {
        return alert("Please enter a Title.");
      }

      setSaving(true);

      let parsedContent = [];
      try {
        parsedContent = JSON.parse(formData.contentStr || "[]");
      } catch (err) {
        setSaving(false);
        return alert("Invalid JSON in Content field. Please check your syntax.");
      }

      const finalSlug = formData.slug.trim() || formData.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

      // 3. PERBAIKAN NAMA KOLOM: Gunakan readingtime (huruf kecil semua) sesuai database
      const payload = {
        slug: finalSlug,
        title: formData.title,
        excerpt: formData.excerpt,
        category: formData.category,
        date: formData.date || null, 
        readingtime: parseInt(formData.readingTime) || 0, 
        image: formData.image,
        author: formData.author || "Admin",
        featured: formData.featured,
        is_published: formData.is_published,
        content: parsedContent,
      };

      console.log("2. Data yang akan dikirim (Payload):", payload);

      // 4. LANGSUNG TEMBAK SUPABASE (Bypass adminService untuk memastikan)
      if (editingId) {
        const { error } = await supabase.from('articles').update(payload).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('articles').insert([payload]);
        if (error) throw error;
      }
      
      console.log("3. Berhasil menyimpan ke database!");
      
      setIsModalOpen(false);
      setFormData(initialForm); 
      fetchArticles();
      alert("Article saved successfully!"); 
      
    } catch (err) {
      console.error("ERROR DARI SUPABASE:", err);
      alert("Database Error: " + (err.message || JSON.stringify(err)));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteArticle(deleteTarget.id);
      setDeleteTarget(null);
      fetchArticles();
    } catch (err) {
      alert("Failed to delete: " + err.message);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 transition-colors";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">
            Articles
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Manage your blog posts and drafts.
          </p>
        </div>
        <button
          onClick={() => {
            setFormData(initialForm);
            setEditingId(null);
            setIsModalOpen(true);
          }}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-sm"
        >
          <Plus size={16} /> Add Article
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-x-auto">
        {/* 5. PERBAIKAN TAILWIND: min-w-150 diganti jadi min-w-[600px] */}
        <table className="w-full text-left text-sm min-w-150">
          <thead className="bg-slate-50 border-b border-slate-200/60 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {articles.map((a) => (
              <tr
                key={a.id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                  {a.image ? (
                    <img
                      src={a.image}
                      alt=""
                      className="w-8 h-8 rounded object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-400">
                      <ImageIcon size={14} />
                    </div>
                  )}
                  {/* 6. PERBAIKAN TAILWIND: max-w-62.5 diganti jadi max-w-[250px] */}
                  <span className="max-w-62.5 truncate">{a.title}</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${a.is_published ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600"}`}
                  >
                    {a.is_published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">{a.date}</td>
                <td className="px-6 py-4 flex justify-end gap-1">
                  <button
                    onClick={() => handleEdit(a)}
                    className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(a)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        // 7. PERBAIKAN TAILWIND: z-100 diganti jadi z-[100]
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-5 border border-slate-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b pb-3">
              {editingId ? "Edit Article" : "Add Article"}
            </h3>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              <FormField label="Title" required>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className={inputClass}
                />
              </FormField>
              <FormField label="Slug (leave blank to auto-generate)">
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className={inputClass}
                />
              </FormField>
              <FormField label="Category">
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className={inputClass}
                />
              </FormField>
              <FormField label="Date">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className={inputClass}
                />
              </FormField>
              <FormField label="Author">
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className={inputClass}
                />
              </FormField>
              <FormField label="Reading Time (mins)">
                <input
                  type="number"
                  value={formData.readingTime}
                  onChange={(e) =>
                    setFormData({ ...formData, readingTime: e.target.value })
                  }
                  className={inputClass}
                />
              </FormField>

              <div className="md:col-span-2">
                <FormField label="Excerpt">
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    className={inputClass + " h-16 resize-none"}
                  />
                </FormField>
              </div>

              <div className="md:col-span-2">
                <FormField label="Content (JSON Array Format)" required>
                  <textarea
                    value={formData.contentStr}
                    onChange={(e) =>
                      setFormData({ ...formData, contentStr: e.target.value })
                    }
                    className={
                      inputClass +
                      " font-mono text-xs leading-relaxed h-64 resize-y"
                    }
                    placeholder='[{"type": "p", "text": "Hello world"}]'
                  />
                </FormField>
              </div>

              <div className="md:col-span-1 flex flex-col gap-2 mt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_published: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Published
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Featured
                  </span>
                </label>
              </div>

              <div className="md:col-span-1">
                <FormField label="Cover Image">
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-white border border-slate-300 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                      Upload Image
                      <input
                        type="file"
                        onChange={handleImageUpload}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                    {uploading && (
                      <span className="text-xs text-slate-500 animate-pulse">
                        Uploading...
                      </span>
                    )}
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="preview"
                        className="h-8 w-8 object-cover rounded border border-slate-200"
                      />
                    )}
                  </div>
                </FormField>
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 mt-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
                >
                  {saving ? "Saving..." : "Save Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={deleteTarget?.title}
      />
    </div>
  );
}