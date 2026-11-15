import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Code, Briefcase, Award, FileText, LogOut, Menu, X, User, ExternalLink, Calendar } from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Skills', path: '/admin/skills', icon: Code },
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Experience', path: '/admin/experience', icon: Calendar },
    { name: 'Certificates', path: '/admin/certificates', icon: Award },
    { name: 'Articles', path: '/admin/articles', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 text-zinc-400 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-zinc-800">
          <span className="text-white font-semibold text-lg tracking-tight flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-zinc-950 text-xs font-bold">P</div>
            Portfolio<span className="text-zinc-500 font-normal">Admin</span>
          </span>
          <button className="lg:hidden text-zinc-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4 space-y-1 mt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-zinc-800/80 text-white shadow-sm' 
                    : 'hover:bg-zinc-900 hover:text-zinc-200'
                }`
              }
            >
              <item.icon size={18} className="opacity-80" />
              <span>{item.name}</span>
            </NavLink>
          ))}

          <div className="pt-6 mt-6 border-t border-zinc-800/50">
            <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-900 hover:text-zinc-200 transition-colors">
              <ExternalLink size={18} className="opacity-80" />
              <span>View Portfolio</span>
            </a>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors mt-1">
              <LogOut size={18} className="opacity-80" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-slate-500 hover:text-slate-800 transition" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 text-sm font-medium text-slate-700 bg-slate-100/80 border border-slate-200 py-1.5 px-3 rounded-full hover:bg-slate-200/50 transition cursor-default">
              <div className="bg-white p-1 rounded-full shadow-sm">
                <User size={14} className="text-slate-600" />
              </div>
              <span className="max-w-37.5 truncate">{user?.email || 'Admin'}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}