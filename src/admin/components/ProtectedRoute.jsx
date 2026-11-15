import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';

export default function ProtectedRoute() {
  const { user, loading } = useAdminAuth();

  // 1. Tampilkan loading screen saat mengecek session Supabase
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-medium">
        Checking authentication...
      </div>
    );
  }

  // 2. Jika tidak ada user (belum login), tendang ke halaman login
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // 3. Jika ada user, izinkan akses ke halaman admin
  return <Outlet />;
}