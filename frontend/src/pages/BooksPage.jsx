import React, { useState, useMemo } from 'react';
import { Plus, BookMarked, Search, RefreshCw, Filter } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import BookTable from '../components/BookTable';

export default function BooksPage({
  books,
  isLoading,
  error,
  onOpenAddModal,
  onView,
  onEdit,
  onDelete,
  onRefresh,
  isRefreshing,
}) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter books in real-time matching title or author case-insensitively
  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return books;
    const query = searchQuery.trim().toLowerCase();
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        b.bookId.toString().includes(query)
    );
  }, [books, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Book Management
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
                {books.length} {books.length === 1 ? 'Book' : 'Books'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Browse, search, edit, and organize all volumes in the library collection.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-teal-600' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm shadow-teal-200 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Book</span>
            </button>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by book title or author..."
          />

          <div className="text-xs text-slate-500 w-full sm:w-auto text-left sm:text-right font-medium">
            Showing <strong className="text-slate-800">{filteredBooks.length}</strong> of{' '}
            <strong className="text-slate-800">{books.length}</strong> records
          </div>
        </div>
      </div>

      {/* Main Table */}
      <BookTable
        books={filteredBooks}
        isLoading={isLoading}
        error={error}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        onRetry={onRefresh}
      />
    </div>
  );
}
