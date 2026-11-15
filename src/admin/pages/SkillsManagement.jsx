import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import FormField from '../components/FormField';
import DeleteDialog from '../components/DeleteDialog';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function SkillsManagement() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: 'Frontend', level: 50, description: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchSkills = async () => {
    try {
      const data = await adminService.getSkills();
      setSkills(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await adminService.updateSkill(editingId, formData);
      } else {
        await adminService.createSkill({ ...formData, display_order: skills.length, is_visible: true });
      }
      setIsModalOpen(false);
      fetchSkills();
    } catch (err) {
      alert("Error saving skill: " + err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteSkill(deleteTarget.id);
      setDeleteTarget(null);
      fetchSkills();
    } catch (err) {
      alert("Error deleting skill: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Skills</h2>
          <p className="text-slate-500 text-sm mt-1">Manage your technical and soft skills.</p>
        </div>
        <button 
          onClick={() => { setFormData({ name: '', category: 'Frontend', level: 50, description: '' }); setEditingId(null); setIsModalOpen(true); }} 
          className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-sm"
        >
          <Plus size={16} /> Add Skill
        </button>
      </div>

      {/* Table */}
      {loading ? <p className="text-slate-500 text-sm">Loading...</p> : (
        <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200/60 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Level</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {skills.map((skill) => (
                <tr key={skill.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900">{skill.name}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                      {skill.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{skill.level}%</td>
                  <td className="px-6 py-4 flex justify-end gap-1">
                    <button onClick={() => { setFormData(skill); setEditingId(skill.id); setIsModalOpen(true); }} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => setDeleteTarget(skill)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {skills.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                    No skills found. Click "Add Skill" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900 mb-5">{editingId ? 'Edit Skill' : 'Add Skill'}</h3>
            <form onSubmit={handleSubmit}>
              
              {/* Standardized Input Classes */}
              <FormField label="Skill Name" required>
                <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 transition-colors" />
              </FormField>
              
              <FormField label="Category" required>
                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 transition-colors">
                  <option>Frontend</option><option>Backend</option><option>Tools</option><option>Soft Skills</option>
                </select>
              </FormField>
              
              <FormField label="Level (%)" required>
                <input type="number" min="0" max="100" required value={formData.level} onChange={e => setFormData({ ...formData, level: parseInt(e.target.value) })} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 transition-colors" />
              </FormField>

              <div className="flex justify-end gap-3 mt-8 pt-5 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-sm">Save Skill</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title={deleteTarget?.name} />
    </div>
  );
}