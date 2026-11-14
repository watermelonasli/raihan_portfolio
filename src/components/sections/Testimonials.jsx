import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Star, Send, MessageSquare } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import { testimonials as initialTestimonials } from "../../data/testimonials";

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", role: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const savedReviews = localStorage.getItem("portfolio-testimonials");
    if (savedReviews) {
      setReviews([...JSON.parse(savedReviews), ...initialTestimonials]);
    } else {
      setReviews(initialTestimonials);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    setIsSubmitting(true);

    const newReview = {
      id: `user-${Date.now()}`,
      name: form.name,
      role: form.role || "Guest",
      organization: "Website Visitor",
      quote: form.message,
      rating: 5,
      isNew: true, 
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    const userReviews = updatedReviews.filter((r) => r.id.startsWith("user-"));
    localStorage.setItem("portfolio-testimonials", JSON.stringify(userReviews));

    setForm({ name: "", role: "", message: "" });
    setIsSubmitting(false);
    setSuccess(true);

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionTitle badge="Testimonials" title="What people say" subtitle="Feedback from mentors, clients, and teammates. Feel free to leave a message below!" />

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-16 max-w-3xl rounded-3xl border border-line bg-surface p-6 sm:p-8 shadow-xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-accent-soft text-accent">
              <MessageSquare size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-heading">Leave a Testimonial</h3>
              <p className="text-sm text-muted">Your message will appear instantly.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <input type="text" placeholder="Your Name *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-line bg-base px-4 py-3 text-sm text-heading placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
              </div>
              <div>
                <input type="text" placeholder="Your Role / Company (Optional)" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full rounded-xl border border-line bg-base px-4 py-3 text-sm text-heading placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
              </div>
            </div>
            <div>
              <textarea rows={3} placeholder="Write your message here... *" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full resize-none rounded-xl border border-line bg-base px-4 py-3 text-sm text-heading placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted">
                {success ? (
                  <span className="text-green-500 font-medium animate-pulse">✓ Message posted successfully!</span>
                ) : (
                  "* Required fields"
                )}
              </p>
              <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-accent-contrast transition-transform hover:scale-105 disabled:opacity-50">
                Post Message <Send size={16} />
              </button>
            </div>
          </form>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {reviews.map((testimonial, i) => (
              <motion.div key={testimonial.id} initial={{ opacity: 0, y: 20, scale: testimonial.isNew ? 0.9 : 1 }} animate={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: testimonial.isNew ? 0 : i * 0.1 }} className={`relative flex flex-col justify-between rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md ${testimonial.isNew ? "border-accent/50 bg-accent-soft/10 ring-1 ring-accent/20" : "border-line bg-surface"}`}>
                <Quote className="absolute right-6 top-6 text-accent/10" size={48} />
                <div>
                  <div className="mb-4 flex gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} size={14} fill={idx < testimonial.rating ? "currentColor" : "none"} className={idx >= testimonial.rating ? "opacity-30" : ""} />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-body italic relative z-10">"{testimonial.quote}"</p>
                </div>
                
                <div className="mt-6 flex items-center gap-3 border-t border-line pt-4">
                  <div className="grid size-10 place-items-center rounded-full bg-accent-soft text-sm font-bold text-accent">
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-heading">{testimonial.name}</p>
                    <p className="text-xs text-muted">{testimonial.role}</p>
                    <p className="text-[10px] text-muted/70">{testimonial.organization}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}