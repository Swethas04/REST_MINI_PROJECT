import React from 'react';
import { Eye, Edit3, Trash2, BookOpen, AlertCircle } from 'lucide-react';

export default function BookTable({ books, isLoading, error, onView, onEdit, onDelete, onRetry }) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-12 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-teal-50 text-teal-600 rounded-2xl mb-4">
          <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h4 className="text-base font-semibold text-slate-800">Loading catalog...</h4>
        <p className="text-xs text-slate-500 mt-1">Retrieving latest books from the backend database.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-rose-200 shadow-sm p-10 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-rose-50 text-rose-500 rounded-2xl mb-3">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h4 className="text-base font-semibold text-slate-800">Failed to load books</h4>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition"
          >
            Retry Connection
          </button>
        )}
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-12 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-slate-50 text-slate-400 rounded-2xl mb-4">
          <BookOpen className="w-8 h-8" />
        </div>
        <h4 className="text-base font-bold text-slate-800">No books found</h4>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          The catalog is currently empty or no books match your search filters. Click "Add Book" to create one.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
              <th className="py-3.5 px-6">ID</th>
              <th className="py-3.5 px-6">Book Title</th>
              <th className="py-3.5 px-6">Author</th>
              <th className="py-3.5 px-6">Price</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {books.map((book) => (
              <tr
                key={book.bookId}
                className="hover:bg-slate-50/70 transition-colors duration-150 group"
              >
                <td className="py-4 px-6 text-xs font-semibold text-slate-400">
                  #{book.bookId}
                </td>
                <td className="py-4 px-6 font-semibold text-slate-900 group-hover:text-teal-700 transition">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 text-xs font-bold">
                      {book.title.charAt(0).toUpperCase()}
                    </div>
                    <span>{book.title}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-600 font-medium">
                  {book.author}
                </td>
                <td className="py-4 px-6 font-bold text-slate-900">
                  <span className="text-xs font-normal text-slate-400 mr-0.5">$</span>
                  {Number(book.price).toFixed(2)}
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onView(book.bookId)}
                      title="View Details"
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(book)}
                      title="Edit Book"
                      className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(book)}
                      title="Delete Book"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
