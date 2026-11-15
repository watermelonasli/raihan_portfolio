import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminservice';
import FormField from '../components/FormField';
import DeleteDialog from '../components/DeleteDialog';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

export default function ProjectsManagement() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const initialForm = {
    id: '', title: '', category: '', year: '', featured: false, thumbnail: '', tagline: '', description: '',
    techStr: '', demoUrl: '', repoUrl: '',
    problem: '', objectivesStr: '', responsibilitiesStr: '', featuresStr: ''
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchProjects = async () => {
    const data = await adminService.getProjects();
    setProjects(data);
  };
  useEffect(() => { fetchProjects(); }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await adminService.uploadImage(file, 'projects');
      setFormData(prev => ({ ...prev, thumbnail: url }));
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      ...project,
      techStr: project.tech ? project.tech.join(', ') : '',
      demoUrl: project.links?.demo || '',
      repoUrl: project.links?.repo || '',
      problem: project.details?.problem || '',
      objectivesStr: project.details?.objectives?.join('\n') || '',
      responsibilitiesStr: project.details?.responsibilities?.join('\n') || '',
      featuresStr: project.details?.features?.join('\n') || '',
    });
    setEditingId(project.id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: formData.id || formData.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
      title: formData.title,
      category: formData.category,
      year: formData.year,
      featured: formData.featured,
      thumbnail: formData.thumbnail,
      tagline: formData.tagline,
      description: formData.description,
      tech: formData.techStr.split(',').map(s => s.trim()).filter(Boolean),
      links: { demo: formData.demoUrl, repo: formData.repoUrl },
      details: {
        problem: formData.problem,
        objectives: formData.objectivesStr.split('\n').filter(Boolean),
        responsibilities: formData.responsibilitiesStr.split('\n').filter(Boolean),
        features: formData.featuresStr.split('\n').filter(Boolean)
      }
    };

    if (editingId) await adminService.updateProject(editingId, payload);
    else await adminService.createProject(payload);
    
    setIsModalOpen(false);
    fetchProjects();
  };

  const handleDelete = async () => {
    await adminService.deleteProject(deleteTarget.id);
    setDeleteTarget(null);
    fetchProjects();
  };

  const inputClass = "w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 transition-colors";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Projects</h2>
          <p className="text-slate-500 text-sm mt-1">Manage your portfolio case studies.</p>
        </div>
        <button onClick={() => { setFormData(initialForm); setEditingId(null); setIsModalOpen(true); }} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-sm">
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm min-w-150">
          <thead className="bg-slate-50 border-b border-slate-200/60 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Featured</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                  {p.thumbnail ? (
                    <img src={p.thumbnail} alt="" className="w-8 h-8 rounded object-cover border border-slate-200" />
                  ) : (
                    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-400"><ImageIcon size={14}/></div>
                  )}
                  {p.title}
                </td>
                <td className="px-6 py-4">
                   <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">{p.category}</span>
                </td>
                <td className="px-6 py-4 text-slate-600">{p.featured ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 flex justify-end gap-1">
                  <button onClick={() => handleEdit(p)} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => setDeleteTarget(p)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-5 border border-slate-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b pb-3">{editingId ? 'Edit Project' : 'Add Project'}</h3>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField label="Project Title" required><input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className={inputClass} /></FormField>
              <FormField label="Category"><input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className={inputClass} /></FormField>
              <FormField label="Year"><input type="text" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className={inputClass} /></FormField>
              <FormField label="Tagline"><input type="text" value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} className={inputClass} /></FormField>
              
              <div className="md:col-span-2">
                <FormField label="Short Description"><textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className={inputClass + " h-16 resize-none"} /></FormField>
              </div>

              <FormField label="Tech Stack (comma separated)"><input type="text" value={formData.techStr} onChange={e => setFormData({...formData, techStr: e.target.value})} className={inputClass} /></FormField>
              <FormField label="Featured?"><label className="flex items-center gap-2 mt-1 cursor-pointer"><input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" /> <span className="text-sm text-slate-700">Show at top of portfolio</span></label></FormField>

              <FormField label="Live Demo URL"><input type="url" value={formData.demoUrl} onChange={e => setFormData({...formData, demoUrl: e.target.value})} className={inputClass} /></FormField>
              <FormField label="Repository URL"><input type="url" value={formData.repoUrl} onChange={e => setFormData({...formData, repoUrl: e.target.value})} className={inputClass} /></FormField>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 my-1">
                <div className="md:col-span-2"><h4 className="text-sm font-semibold text-slate-800 mb-1">Project Details (JSON Arrays)</h4><p className="text-xs text-slate-500 mb-1">Put one item per line.</p></div>
                <FormField label="Problem Statement"><textarea value={formData.problem} onChange={e => setFormData({...formData, problem: e.target.value})} className={inputClass + " h-16 resize-none"} /></FormField>
                <FormField label="Objectives (1 per line)"><textarea value={formData.objectivesStr} onChange={e => setFormData({...formData, objectivesStr: e.target.value})} className={inputClass + " h-16 resize-none"} /></FormField>
                <FormField label="Responsibilities (1 per line)"><textarea value={formData.responsibilitiesStr} onChange={e => setFormData({...formData, responsibilitiesStr: e.target.value})} className={inputClass + " h-16 resize-none"} /></FormField>
                <FormField label="Features (1 per line)"><textarea value={formData.featuresStr} onChange={e => setFormData({...formData, featuresStr: e.target.value})} className={inputClass + " h-16 resize-none"} /></FormField>
              </div>

              <div className="md:col-span-2">
                <FormField label="Thumbnail Image">
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer bg-white border border-slate-300 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                      Choose File
                      <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
                    </label>
                    {uploading && <span className="text-sm text-slate-500 animate-pulse">Uploading...</span>}
                    {formData.thumbnail && <img src={formData.thumbnail} alt="preview" className="h-8 w-8 object-cover rounded border border-slate-200" />}
                  </div>
                </FormField>
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 mt-2 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-1.5 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-sm">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title={deleteTarget?.title} />
    </div>
  );
}