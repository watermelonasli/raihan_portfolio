import { supabase } from "../lib/supabase";

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  // Mapping data dari Supabase agar sesuai dengan format UI frontend kita
  return data.map((p) => ({
    id: p.slug, 
    title: p.title,
    category: "Web App", // Default category jika belum ada di DB
    year: new Date(p.created_at).getFullYear().toString(),
    featured: p.is_featured,
    thumbnail: p.thumbnail,
    tagline: "Project Overview",
    description: p.description,
    tech: p.technologies || [],
    links: {
      demo: p.demo_url,
      repo: p.github_url,
      docs: p.documentation,
    },
    details: {
      problem: p.problem_statement,
      objectives: p.objectives || [],
      responsibilities: p.role || [], // DB pakai 'role', UI pakai 'responsibilities'
      features: p.features || [],
      screenshots: p.screenshots || [],
      story: p.project_story,
      feedback: p.feedback || [],
    },
  }));
}