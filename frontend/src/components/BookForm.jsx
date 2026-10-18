import React, { useState, useEffect } from 'react';
import { BookOpen, X, Check, DollarSign, User, AlertCircle } from 'lucide-react';

export default function BookForm({ isOpen, onClose, onSubmit, initialData = null, isLoading = false }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        author: initialData.author || '',
        price: initialData.price !== undefined ? initialData.price.toString() : '',
      });
    } else {
      setFormData({
        title: '',
        author: '',
        price: '',
      });
    }
    setErrors({});
    setTouched({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validateField = (name, value) => {
    let error = '';
    if (name === 'title') {
      if (!value || !value.trim()) {
        error = 'Book title is required.';
      }
    }
    if (name === 'author') {
      if (!value || !value.trim()) {
        error = 'Author name is required.';
      }
    }
    if (name === 'price') {
      if (value === '' || value === null || value === undefined) {
        error = 'Price is required.';
      } else if (isNaN(Number(value))) {
        error = 'Price must be a valid number.';
      } else if (Number(value) < 0) {
        error = 'Price cannot be negative.';
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const titleErr = validateField('title', formData.title);
    const authorErr = validateField('author', formData.author);
    const priceErr = validateField('price', formData.price);

    const validationErrors = {
      title: titleErr,
      author: authorErr,
      price: priceErr,
    };

    setErrors(validationErrors);
    setTouched({ title: true, author: true, price: true });

    if (titleErr || authorErr || priceErr) {
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      author: formData.author.trim(),
      price: parseFloat(formData.price),
    });
  };

  const isEditMode = !!initialData?.bookId;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden scale-100 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isEditMode ? 'Edit Book Details' : 'Add New Library Book'}
              </h3>
              <p className="text-xs text-slate-500">
                {isEditMode
                  ? `Updating record for Book ID #${initialData.bookId}`
                  : 'Fill in the information below to add a book to the catalog.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="book-title" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Book Title <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="book-title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Clean Code"
                disabled={isLoading}
                className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition ${
                  errors.title && touched.title
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
                    : 'border-slate-200 focus:border-teal-600 focus:ring-teal-500/20'
                }`}
              />
            </div>
            {errors.title && touched.title && (
              <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Author */}
          <div>
            <label htmlFor="book-author" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Author <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="book-author"
                name="author"
                type="text"
                value={formData.author}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Robert C. Martin"
                disabled={isLoading}
                className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition ${
                  errors.author && touched.author
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
                    : 'border-slate-200 focus:border-teal-600 focus:ring-teal-500/20'
                }`}
              />
            </div>
            {errors.author && touched.author && (
              <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.author}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label htmlFor="book-price" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Price (USD / ₹) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <DollarSign className="w-4 h-4" />
              </div>
              <input
                id="book-price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="599.00"
                disabled={isLoading}
                className={`w-full pl-9 pr-3.5 py-2.5 bg-white border rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition ${
                  errors.price && touched.price
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
                    : 'border-slate-200 focus:border-teal-600 focus:ring-teal-500/20'
                }`}
              />
            </div>
            {errors.price && touched.price && (
              <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.price}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-sm shadow-teal-200 transition flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  {isEditMode ? 'Update Book' : 'Save Book'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
