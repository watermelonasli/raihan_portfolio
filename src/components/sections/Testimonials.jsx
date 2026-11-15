import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "../../lib/supabase";
import SectionTitle from "../ui/SectionTitle";
import { MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Ambil data saat halaman dimuat
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      setTestimonials(data || []);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      // 1. Kirim ke database
      const { data, error } = await supabase
        .from("testimonials")
        .insert([{ name, role, message }])
        .select(); // .select() mengembalikan data yang baru masuk

      if (error) throw error;

      // 2. Tambahkan data baru ke state agar langsung muncul tanpa reload
      if (data && data.length > 0) {
        setTestimonials((prev) => [data[0], ...prev]);
      }

      // 3. Reset form dan tampilkan pesan sukses
      setName("");
      setRole("");
      setMessage("");
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      alert("Gagal mengirim testimonial: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full rounded-lg border border-line bg-base px-4 py-2.5 text-sm text-heading placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors";

  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionTitle 
          badge="Testimonials" 
          title="What people say" 
          subtitle="Feedback from clients, teammates, and mentors I've worked with." 
        />

        <div className="grid gap-12 lg:grid-cols-5 items-start">
          
          {/* KIRI: Form Input (Lebar 2/5) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="lg:col-span-2 rounded-2xl border border-line bg-surface p-6 sm:p-8"
          >
            <h3 className="text-xl font-bold text-heading mb-2 flex items-center gap-2">
              <MessageSquare size={20} className="text-accent" /> Leave a message
            </h3>
            <p className="text-sm text-muted mb-6">
              Worked with me before? Feel free to drop a comment below!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-heading mb-1.5">Name *</label>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className={inputClass} 
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-heading mb-1.5">Role / Company (Optional)</label>
                <input 
                  type="text" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                  className={inputClass} 
                  placeholder="e.g. Frontend Developer at Company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-heading mb-1.5">Message *</label>
                <textarea 
                  required 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  className={inputClass + " h-32 resize-none"} 
                  placeholder="What was it like working with me?"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-contrast hover:bg-accent/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : <><Send size={16} /> Submit Testimonial</>}
              </button>

              <AnimatePresence>
                {submitSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-200"
                  >
                    <CheckCircle2 size={16} /> Thank you! Your message has been posted.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* KANAN: List Testimonial (Lebar 3/5) */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center text-muted py-10">Loading testimonials...</div>
            ) : testimonials.length === 0 ? (
              <div className="text-center text-muted py-10 border border-dashed border-line rounded-2xl">
                No testimonials yet. Be the first to leave one!
              </div>
            ) : (
              <div className="space-y-4 max-h-150 overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence>
                  {testimonials.map((t, i) => (
                    <motion.div 
                      key={t.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-2xl border border-line bg-surface p-6"
                    >
                      <p className="text-body leading-relaxed mb-4 italic">"{t.message}"</p>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent font-bold">
                          {t.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-heading text-sm">{t.name}</h4>
                          {t.role && <p className="text-xs text-muted">{t.role}</p>}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}