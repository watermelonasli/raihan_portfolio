import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import ProjectCard from "../ui/ProjectCard";
import ProjectModal from "../ui/ProjectModal";

// 1. Import the hook and rename static projects to staticProjects
import { useSupabaseData } from "../../hooks/useSupabaseData";
import { projects as staticProjects, projectCategories } from "../../data/projects";

export default function Projects() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  // 2. Fetch from Supabase (falls back to static if DB is empty)
  const { data: projects } = useSupabaseData('projects', staticProjects, { is_published: true });

  // 3. Create a dynamic category list based on the DB + static categories
  const availableCategories = useMemo(() => {
    const dbCategories = projects.map(p => p.category).filter(Boolean);
    // Combine static categories with new DB categories, removing duplicates
    const allCats = [...new Set([...projectCategories.filter(c => c !== "All"), ...dbCategories])];
    return ["All", ...allCats];
  }, [projects]);

  // 4. Add `projects` to the dependency array so search/filter updates when DB data loads
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory = category === "All" || p.category === category;
      
      // Safety check in case title or tech is missing
      const titleMatch = p.title ? p.title.toLowerCase().includes(search.toLowerCase()) : false;
      const techMatch = p.tech ? p.tech.some(t => t.toLowerCase().includes(search.toLowerCase())) : false;
      
      const matchSearch = titleMatch || techMatch;
      return matchCategory && matchSearch;
    });
  }, [projects, search, category]);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionTitle badge="Portfolio" title="Featured Projects" subtitle="A selection of things I've built — from client work to school projects and weekend experiments." />

        <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-wrap gap-2">
            {/* 5. Use the dynamic availableCategories */}
            {availableCategories.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${category === cat ? "bg-accent text-accent-contrast" : "bg-surface border border-line text-muted hover:text-heading"}`}>{cat}</button>
            ))}
          </div>
          
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input type="text" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-full border border-line bg-surface py-2 pl-9 pr-4 text-sm text-heading placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-20 text-center text-muted">No projects found matching your criteria.</div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  );
}