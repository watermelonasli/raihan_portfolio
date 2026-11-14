import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import ProjectCard from "../ui/ProjectCard";
import ProjectModal from "../ui/ProjectModal";
import { projects, projectCategories } from "../../data/projects";

export default function Projects() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory = category === "All" || p.category === category;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.tech.some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [search, category]);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionTitle badge="Portfolio" title="Featured Projects" subtitle="A selection of things I've built — from client work to school projects and weekend experiments." />

        <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-wrap gap-2">
            {projectCategories.map((cat) => (
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