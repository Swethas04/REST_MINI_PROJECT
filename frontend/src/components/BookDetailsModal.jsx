import React, { useState, useEffect } from 'react';
import { BookOpen, X, Hash, User, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import bookService, { extractErrorMessage } from '../services/bookService';

export default function BookDetailsModal({ bookId, isOpen, onClose, onEdit }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && bookId) {
      setLoading(true);
      setError(null);
      bookService.getBookById(bookId)
        .then((data) => {
          setBook(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(extractErrorMessage(err));
          setLoading(false);
        });
    }
  }, [bookId, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden scale-100 animate-in zoom-in-95 duration-150">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Book Details</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-slate-400">
              <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-sm">Fetching book information from database...</p>
            </div>
          ) : error ? (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Failed to load book</p>
                <p className="text-xs mt-1 text-rose-600">{error}</p>
              </div>
            </div>
          ) : book ? (
            <div className="space-y-4">
              <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Title</span>
                <h4 className="text-lg font-bold text-slate-900 mt-1">{book.title}</h4>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    <Hash className="w-3.5 h-3.5" />
                    Book ID
                  </div>
                  <p className="text-base font-bold text-slate-800">#{book.bookId}</p>
                </div>

                <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    Price
                  </div>
                  <p className="text-base font-bold text-emerald-600">
                    ${Number(book.price).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  <User className="w-3.5 h-3.5" />
                  Author
                </div>
                <p className="text-sm font-semibold text-slate-800">{book.author}</p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onEdit(book);
                  }}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-sm transition"
                >
                  Edit This Book
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
