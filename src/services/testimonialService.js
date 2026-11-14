import { supabase } from "../lib/supabase";

export async function getTestimonials() {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data.map((t) => ({
    id: t.id,
    name: t.author_name,
    role: t.author_role || "Guest",
    organization: t.organization || "Visitor",
    quote: t.message,
    avatar: t.avatar,
    rating: 5, // Default rating
  }));
}

export async function submitTestimonial(data) {
  const { error } = await supabase.from("testimonials").insert([
    {
      author_name: data.name,
      author_role: data.role,
      message: data.message,
    },
  ]);

  if (error) throw new Error(error.message);
  return true;
}