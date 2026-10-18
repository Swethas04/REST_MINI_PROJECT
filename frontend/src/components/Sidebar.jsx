import React from 'react';
import { LayoutDashboard, BookMarked, PlusCircle, BookOpen, Layers, X, Database } from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  onOpenAddModal,
  mobileOpen,
  setMobileOpen,
  totalBooks = 0,
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'books',
      label: 'All Books',
      icon: BookMarked,
      badge: totalBooks > 0 ? totalBooks : null,
    },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Logo Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 flex items-center justify-center shadow-lg shadow-teal-500/20 font-bold">
              <BookOpen className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                Libro<span className="text-teal-400">Hub</span>
              </h1>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                Library System
              </span>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Navigation
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-teal-400/20 text-teal-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 pb-2 px-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Quick Actions
            </p>
          </div>

          <button
            onClick={() => {
              onOpenAddModal();
              if (mobileOpen) setMobileOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 transition shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-teal-400" />
            <span>Add New Book</span>
          </button>
        </div>

        {/* Database Status footer card */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-teal-400" /> H2 Database Active
              </p>
              <p className="text-[10px] text-slate-400 truncate">Port 8080 • In-Memory</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
