import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Toast from './components/Toast';
import ConfirmDialog from './components/ConfirmDialog';
import BookForm from './components/BookForm';
import BookDetailsModal from './components/BookDetailsModal';
import Dashboard from './pages/Dashboard';
import BooksPage from './pages/BooksPage';
import bookService, { extractErrorMessage } from './services/bookService';

export default function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Navigation
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Form Modal State (Add & Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  // Details Modal State
  const [detailsState, setDetailsState] = useState({
    isOpen: false,
    bookId: null,
  });

  // Delete Confirmation State
  const [deleteState, setDeleteState] = useState({
    isOpen: false,
    book: null,
    isLoading: false,
  });

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  // Fetch all books from Spring Boot REST API
  const fetchBooks = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    else setIsRefreshing(true);
    setError(null);

    try {
      const data = await bookService.getAllBooks();
      setBooks(data);
    } catch (err) {
      const message = extractErrorMessage(err);
      setError(message);
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Open Add Modal
  const handleOpenAddModal = () => {
    setEditingBook(null);
    setIsFormOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (book) => {
    setEditingBook(book);
    setIsFormOpen(true);
  };

  // Submit Book (Create or Update)
  const handleFormSubmit = async (formData) => {
    setIsFormSubmitting(true);
    try {
      if (editingBook) {
        // HTTP PUT /api/books/{id}
        const updated = await bookService.updateBook(editingBook.bookId, formData);
        setBooks((prev) =>
          prev.map((b) => (b.bookId === updated.bookId ? updated : b))
        );
        showToast(`Book "${updated.title}" updated successfully!`, 'success');
      } else {
        // HTTP POST /api/books
        const created = await bookService.createBook(formData);
        setBooks((prev) => [created, ...prev]);
        showToast(`Book "${created.title}" added to catalog!`, 'success');
      }
      setIsFormOpen(false);
      setEditingBook(null);
    } catch (err) {
      showToast(extractErrorMessage(err), 'error');
    } finally {
      setIsFormSubmitting(false);
    }
  };

  // Delete Flow
  const handleRequestDelete = (book) => {
    setDeleteState({
      isOpen: true,
      book,
      isLoading: false,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteState.book) return;
    setDeleteState((prev) => ({ ...prev, isLoading: true }));

    try {
      // HTTP DELETE /api/books/{id}
      await bookService.deleteBook(deleteState.book.bookId);
      setBooks((prev) => prev.filter((b) => b.bookId !== deleteState.book.bookId));
      showToast(`Book "${deleteState.book.title}" was removed from the catalog.`, 'info');
      setDeleteState({ isOpen: false, book: null, isLoading: false });
    } catch (err) {
      showToast(extractErrorMessage(err), 'error');
      setDeleteState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleCancelDelete = () => {
    setDeleteState({ isOpen: false, book: null, isLoading: false });
  };

  // View Details Flow
  const handleViewDetails = (bookId) => {
    setDetailsState({
      isOpen: true,
      bookId,
    });
  };

  const handleCloseDetails = () => {
    setDetailsState({
      isOpen: false,
      bookId: null,
    });
  };

  const pageTitle = activeTab === 'dashboard' ? 'Overview Dashboard' : 'Book Management';
  const breadcrumb = activeTab === 'dashboard' ? 'Dashboard' : 'Catalog';

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={handleOpenAddModal}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        totalBooks={books.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          pageTitle={pageTitle}
          breadcrumb={breadcrumb}
          onOpenAddModal={handleOpenAddModal}
          onRefresh={() => fetchBooks(true)}
          isRefreshing={isRefreshing}
          onOpenMobileMenu={() => setMobileOpen(true)}
        />

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' ? (
            <Dashboard
              books={books}
              isLoading={isLoading}
              error={error}
              onNavigateToBooks={() => setActiveTab('books')}
              onOpenAddModal={handleOpenAddModal}
              onView={handleViewDetails}
              onEdit={handleOpenEditModal}
              onDelete={handleRequestDelete}
              onRetry={() => fetchBooks(false)}
            />
          ) : (
            <BooksPage
              books={books}
              isLoading={isLoading}
              error={error}
              onOpenAddModal={handleOpenAddModal}
              onView={handleViewDetails}
              onEdit={handleOpenEditModal}
              onDelete={handleRequestDelete}
              onRefresh={() => fetchBooks(true)}
              isRefreshing={isRefreshing}
            />
          )}
        </main>
      </div>

      {/* Add / Edit Book Modal Form */}
      <BookForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingBook(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingBook}
        isLoading={isFormSubmitting}
      />

      {/* Book Details View Modal */}
      <BookDetailsModal
        isOpen={detailsState.isOpen}
        bookId={detailsState.bookId}
        onClose={handleCloseDetails}
        onEdit={(book) => {
          handleCloseDetails();
          handleOpenEditModal(book);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteState.isOpen}
        title="Delete Library Book"
        message="Are you sure you want to permanently remove this title from the library database?"
        bookTitle={deleteState.book?.title}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={deleteState.isLoading}
      />

      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={closeToast} />
    </div>
  );
}
