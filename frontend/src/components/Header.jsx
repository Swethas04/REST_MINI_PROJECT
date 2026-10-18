import React from 'react';
import { Menu, Plus, BookOpen, ChevronRight, RefreshCw } from 'lucide-react';

export default function Header({
  pageTitle,
  breadcrumb,
  onOpenAddModal,
  onRefresh,
  isRefreshing,
  onOpenMobileMenu,
}) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between">
      {/* Left side: Mobile Toggle + Title + Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-0.5">
            <span>Library System</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-slate-600 font-semibold">{breadcrumb || pageTitle}</span>
          </nav>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-none">
            {pageTitle}
          </h2>
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-2.5">
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Refresh Catalog Data"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl border border-slate-200 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-teal-600' : ''}`} />
          </button>
        )}

        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm shadow-teal-200 transition"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Book</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </header>
  );
}
