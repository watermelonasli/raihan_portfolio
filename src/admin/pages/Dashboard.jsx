import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Code, Briefcase, Award, FileText, CheckCircle, Clock, Database } from 'lucide-react';
// Import your static data
import { projects as staticProjects } from '../../data/projects';

export default function Dashboard() {
  const [stats, setStats] = useState({
    skills: 0, projects: 0, experiences: 0, certificates: 0, articles: 0, published: 0, drafts: 0
  });
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const fetchStats = async () => {
    const [
      { count: skills }, { count: projects }, { count: experiences }, 
      { count: certificates }, { count: articles }, { count: published }, { count: drafts }
    ] = await Promise.all([
      supabase.from('skills').select('*', { count: 'exact', head: true }),
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('experiences').select('*', { count: 'exact', head: true }),
      supabase.from('certificates').select('*', { count: 'exact', head: true }),
      supabase.from('articles').select('*', { count: 'exact', head: true }),
      supabase.from('articles').select('*', { count: 'exact', head: true }).eq('is_published', true),
      supabase.from('articles').select('*', { count: 'exact', head: true }).eq('is_published', false),
    ]);

    setStats({
      skills: skills || 0, projects: projects || 0, experiences: experiences || 0,
      certificates: certificates || 0, articles: articles || 0, published: published || 0, drafts: drafts || 0
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Function to migrate static projects to the database
  const handleSeedProjects = async () => {
    if (!window.confirm("This will copy your static projects into Supabase. Continue?")) return;
    setSeeding(true);
    try {
      // Use upsert so it doesn't fail if you already added some of them
      const { error } = await supabase.from('projects').upsert(staticProjects);
      if (error) throw error;
      alert("Static projects successfully migrated to database!");
      fetchStats(); // Refresh the counts
    } catch (err) {
      alert("Migration failed: " + err.message);
    } finally {
      setSeeding(false);
    }
  };

  const cards = [
    { title: 'Total Skills', value: stats.skills, icon: Code },
    { title: 'Total Projects', value: stats.projects, icon: Briefcase },
    { title: 'Experiences', value: stats.experiences, icon: Briefcase },
    { title: 'Certificates', value: stats.certificates, icon: Award },
    { title: 'Total Articles', value: stats.articles, icon: FileText },
    { title: 'Published', value: stats.published, icon: CheckCircle },
    { title: 'Drafts', value: stats.drafts, icon: Clock },
  ];

  if (loading) return <div className="text-slate-500 text-sm animate-pulse">Loading dashboard data...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Dashboard Overview</h2>
          <p className="text-slate-500 text-sm mt-1">A summary of your portfolio content.</p>
        </div>
        
        {/* Temporary Seed Button */}
        <button 
          onClick={handleSeedProjects} 
          disabled={seeding}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-200 disabled:opacity-50"
        >
          <Database size={16} />
          {seeding ? 'Migrating...' : 'Migrate Static Projects'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200/60 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm font-medium text-slate-500">{card.title}</p>
              <card.icon size={18} className="text-slate-400" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}