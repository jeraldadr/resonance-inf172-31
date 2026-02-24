import { Outlet, useNavigate, useLocation } from 'react-router';
import { Music, LayoutDashboard, BarChart3, Users, User, Plus } from 'lucide-react';
import { useApp } from '../context';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/dashboard/insights', label: 'Insights', icon: BarChart3 },
  { path: '/dashboard/community', label: 'Community', icon: Users },
  { path: '/dashboard/profile', label: 'Profile', icon: User },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useApp();

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-100 flex flex-col">
        {/* Logo */}
        <div className="p-5 border-b border-slate-100">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 w-full hover:opacity-80 transition-opacity"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-200">
              <Music className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
            </div>
            <span className="text-slate-900" style={{ fontWeight: 700, fontSize: '1.1rem' }}>Resonance</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => {
            const active = isActive(item.path, item.exact);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                  active
                    ? 'bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-700 shadow-sm border border-violet-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
                style={{ fontWeight: active ? 600 : 500 }}
              >
                <item.icon className={`w-4.5 h-4.5 w-[18px] h-[18px] ${active ? 'text-violet-600' : 'text-slate-400'}`} />
                {item.label}
                {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500" />}
              </button>
            );
          })}
        </nav>

        {/* Quick Check-In Button */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={() => navigate('/onboarding')}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-indigo-200 text-sm"
            style={{ fontWeight: 600 }}
          >
            <Plus className="w-4 h-4" />
            New Check-In
          </button>

          {/* User avatar */}
          <div className="flex items-center gap-3 mt-4 px-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-sm flex-shrink-0" style={{ fontWeight: 700 }}>
              {userData.username[0]}
            </div>
            <div className="min-w-0">
              <div className="text-slate-800 text-sm truncate" style={{ fontWeight: 600 }}>{userData.username}</div>
              <div className="text-slate-400 text-xs">{userData.checkIns.length} check-ins</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
