import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Code, Briefcase, Award, FileText, CheckCircle, Clock } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    skills: 0, projects: 0, experiences: 0, certificates: 0, articles: 0, published: 0, drafts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      // Using count: 'exact' and head: true is the fastest way to get counts
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
    }
    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Skills', value: stats.skills, icon: Code, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Total Projects', value: stats.projects, icon: Briefcase, color: 'text-cyan-600', bg: 'bg-cyan-100' },
    { title: 'Experiences', value: stats.experiences, icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'Certificates', value: stats.certificates, icon: Award, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { title: 'Total Articles', value: stats.articles, icon: FileText, color: 'text-slate-600', bg: 'bg-slate-200' },
    { title: 'Published', value: stats.published, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Drafts', value: stats.drafts, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  if (loading) return <div className="text-slate-500">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Overview</h2>
        <p className="text-slate-500">Welcome back. Here is your portfolio summary.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${card.bg} ${card.color}`}>
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{card.title}</p>
              <p className="text-2xl font-bold text-slate-800">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}