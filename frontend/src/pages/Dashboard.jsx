import React from 'react';
import { BookOpen, Users, DollarSign, TrendingUp, ArrowRight, PlusCircle, Sparkles, AlertCircle } from 'lucide-react';
import StatCard from '../components/StatCard';
import BookTable from '../components/BookTable';

export default function Dashboard({
  books,
  isLoading,
  error,
  onNavigateToBooks,
  onOpenAddModal,
  onView,
  onEdit,
  onDelete,
  onRetry,
}) {
  // Compute real dynamic statistics directly from API data
  const totalBooks = books.length;

  const uniqueAuthors = React.useMemo(() => {
    const authors = new Set(books.map((b) => b.author.trim().toLowerCase()));
    return authors.size;
  }, [books]);

  const averagePrice = React.useMemo(() => {
    if (totalBooks === 0) return '0.00';
    const sum = books.reduce((acc, curr) => acc + Number(curr.price || 0), 0);
    return (sum / totalBooks).toFixed(2);
  }, [books, totalBooks]);

  const totalValue = React.useMemo(() => {
    const sum = books.reduce((acc, curr) => acc + Number(curr.price || 0), 0);
    return sum.toFixed(2);
  }, [books]);

  // Top 5 recently added / latest books (ID descending)
  const recentBooks = React.useMemo(() => {
    return [...books].sort((a, b) => b.bookId - a.bookId).slice(0, 5);
  }, [books]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Live Full-Stack System
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Library Book Management System
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Manage your books with full CRUD capabilities, real-time database synchronization, and modern analytics powered by Spring Boot and React.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-teal-500/25 transition"
            >
              <PlusCircle className="w-4 h-4" />
              Add First Book
            </button>
            <button
              onClick={onNavigateToBooks}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs sm:text-sm backdrop-blur-sm border border-white/10 transition"
            >
              <span>Explore All Books</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Section (Calculated from Real API Data) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            System Overview & Metrics
          </h3>
          <span className="text-xs text-slate-400 font-medium">Computed live from H2 database</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Books"
            value={isLoading ? '...' : totalBooks}
            subtitle={`${totalBooks} volumes registered`}
            icon={BookOpen}
            color="blue"
          />
          <StatCard
            title="Unique Authors"
            value={isLoading ? '...' : uniqueAuthors}
            subtitle="Across entire catalog"
            icon={Users}
            color="emerald"
          />
          <StatCard
            title="Average Book Price"
            value={isLoading ? '...' : `$${averagePrice}`}
            subtitle="Mean cost per title"
            icon={DollarSign}
            color="amber"
          />
          <StatCard
            title="Total Inventory Value"
            value={isLoading ? '...' : `$${totalValue}`}
            subtitle="Combined catalog valuation"
            icon={TrendingUp}
            color="purple"
          />
        </div>
      </section>

      {/* Recently Added Books Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recently Added Books</h3>
            <p className="text-xs text-slate-500">Latest titles registered in the library</p>
          </div>
          <button
            onClick={onNavigateToBooks}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-teal-700 transition"
          >
            <span>View All ({totalBooks})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <BookTable
          books={recentBooks}
          isLoading={isLoading}
          error={error}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onRetry={onRetry}
        />
      </section>
    </div>
  );
}
