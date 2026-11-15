export default function DeleteDialog({ isOpen, onClose, onConfirm, title, loading }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 transition-opacity">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 border border-slate-100 transform transition-all">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Delete Item</h3>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
          Are you sure you want to delete <strong className="text-slate-800">"{title}"</strong>? This action cannot be undone and will permanently remove the data.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} disabled={loading} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading} className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-sm disabled:opacity-50">
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}