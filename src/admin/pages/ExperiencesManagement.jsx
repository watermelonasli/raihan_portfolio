import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminservice';
import FormField from '../components/FormField';
import DeleteDialog from '../components/DeleteDialog';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function ExperiencesManagement() {
  const [experiences, setExperiences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const initialForm = { id: '', type: 'internship', role: '', organization: '', period: '', location: '', description: '', highlightsStr: '' };
  const [formData, setFormData] = useState(initialForm);

  const fetchExperiences = async () => {
    const data = await adminService.getExperiences();
    setExperiences(data);
  };
  useEffect(() => { fetchExperiences(); }, []);

  const handleEdit = (exp) => {
    setFormData({
      ...exp,
      highlightsStr: exp.highlights ? exp.highlights.join('\n') : ''
    });
    setEditingId(exp.id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: formData.id || Date.now().toString(),
      type: formData.type,
      role: formData.role,
      organization: formData.organization,
      period: formData.period,
      location: formData.location,
      description: formData.description,
      highlights: formData.highlightsStr.split('\n').filter(Boolean)
    };

    if (editingId) await adminService.updateExperience(editingId, payload);
    else await adminService.createExperience(payload);
    
    setIsModalOpen(false);
    fetchExperiences();
  };

  const handleDelete = async () => {
    await adminService.deleteExperience(deleteTarget.id);
    setDeleteTarget(null);
    fetchExperiences();
  };

  const inputClass = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 transition-colors";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Experiences</h2>
          <p className="text-slate-500 text-sm mt-1">Manage your work history and organizations.</p>
        </div>
        <button onClick={() => { setFormData(initialForm); setEditingId(null); setIsModalOpen(true); }} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-sm">
          <Plus size={16} /> Add Experience
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm min-w-150">
          <thead className="bg-slate-50 border-b border-slate-200/60 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Organization</th>
              <th className="px-6 py-4">Period</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {experiences.map(exp => (
              <tr key={exp.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 font-medium text-slate-900">{exp.role}</td>
                <td className="px-6 py-4 text-slate-600">{exp.organization}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">{exp.period}</span>
                </td>
                <td className="px-6 py-4 flex justify-end gap-1">
                  <button onClick={() => handleEdit(exp)} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => setDeleteTarget(exp)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 sm:p-8 my-8 border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 border-b pb-4">{editingId ? 'Edit Experience' : 'Add Experience'}</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              <FormField label="Role / Title" required><input type="text" required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className={inputClass} /></FormField>
              <FormField label="Organization"><input type="text" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} className={inputClass} /></FormField>
              <FormField label="Period"><input type="text" value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} className={inputClass} placeholder="e.g. Sep 2025 — Nov 2025" /></FormField>
              <FormField label="Location"><input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className={inputClass} /></FormField>
              
              <div className="md:col-span-2">
                <FormField label="Description"><textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className={inputClass} rows="2" /></FormField>
              </div>
              <div className="md:col-span-2">
                <FormField label="Highlights (1 per line)"><textarea value={formData.highlightsStr} onChange={e => setFormData({...formData, highlightsStr: e.target.value})} className={inputClass} rows="3" /></FormField>
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 mt-6 pt-5 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-sm">Save Experience</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title={deleteTarget?.role} />
    </div>
  );
}