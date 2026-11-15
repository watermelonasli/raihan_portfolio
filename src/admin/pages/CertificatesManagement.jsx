import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminservice';
import FormField from '../components/FormField';
import DeleteDialog from '../components/DeleteDialog';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

export default function CertificatesManagement() {
  const [certificates, setCertificates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const initialForm = { id: '', title: '', issuer: '', date: '', image: '', category: '' };
  const [formData, setFormData] = useState(initialForm);

  const fetchCertificates = async () => {
    const data = await adminService.getCertificates();
    setCertificates(data);
  };
  useEffect(() => { fetchCertificates(); }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await adminService.uploadImage(file, 'certificates');
      setFormData(prev => ({ ...prev, image: url }));
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: formData.id || Date.now().toString(),
      title: formData.title,
      issuer: formData.issuer,
      date: formData.date,
      image: formData.image,
      category: formData.category
    };

    if (editingId) await adminService.updateCertificate(editingId, payload);
    else await adminService.createCertificate(payload);
    
    setIsModalOpen(false);
    fetchCertificates();
  };

  const handleDelete = async () => {
    await adminService.deleteCertificate(deleteTarget.id);
    setDeleteTarget(null);
    fetchCertificates();
  };

  const inputClass = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 transition-colors";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Certificates</h2>
          <p className="text-slate-500 text-sm mt-1">Manage your awards and credentials.</p>
        </div>
        <button onClick={() => { setFormData(initialForm); setEditingId(null); setIsModalOpen(true); }} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-sm">
          <Plus size={16} /> Add Certificate
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm min-w-150">
          <thead className="bg-slate-50 border-b border-slate-200/60 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-4">Certificate</th>
              <th className="px-6 py-4">Issuer</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {certificates.map(cert => (
              <tr key={cert.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                  {cert.image ? (
                    <img src={cert.image} alt="" className="w-8 h-8 rounded object-cover border border-slate-200" />
                  ) : (
                    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-400"><ImageIcon size={14}/></div>
                  )}
                  {cert.title}
                </td>
                <td className="px-6 py-4 text-slate-600">{cert.issuer}</td>
                <td className="px-6 py-4">
                   <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">{cert.date}</span>
                </td>
                <td className="px-6 py-4 flex justify-end gap-1">
                  <button onClick={() => { setFormData(cert); setEditingId(cert.id); setIsModalOpen(true); }} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => setDeleteTarget(cert)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-8 my-8 border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 border-b pb-4">{editingId ? 'Edit Certificate' : 'Add Certificate'}</h3>
            <form onSubmit={handleSubmit}>
              <FormField label="Title" required><input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className={inputClass} /></FormField>
              <FormField label="Issuer" required><input type="text" required value={formData.issuer} onChange={e => setFormData({...formData, issuer: e.target.value})} className={inputClass} /></FormField>
              <FormField label="Date" required><input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className={inputClass} /></FormField>
              <FormField label="Category"><input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className={inputClass} /></FormField>
              
              <div className="mb-6 mt-2">
                <FormField label="Certificate Image">
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer bg-white border border-slate-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                      Choose Image
                      <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
                    </label>
                    {uploading && <span className="text-sm text-slate-500 animate-pulse">Uploading...</span>}
                    {formData.image && <img src={formData.image} alt="preview" className="h-10 w-10 object-cover rounded border border-slate-200" />}
                  </div>
                </FormField>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-sm">Save Certificate</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title={deleteTarget?.title} />
    </div>
  );
}