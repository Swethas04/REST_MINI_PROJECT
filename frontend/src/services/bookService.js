import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Normalizes error messages from the backend or network
 */
export const extractErrorMessage = (error) => {
  if (error.response) {
    if (error.response.data) {
      if (error.response.data.fieldErrors) {
        return Object.values(error.response.data.fieldErrors).join(', ');
      }
      if (error.response.data.message) {
        return error.response.data.message;
      }
    }
    return `Server Error: HTTP ${error.response.status}`;
  } else if (error.request) {
    return 'Cannot reach the backend server. Please verify Spring Boot is running on port 8080.';
  } else {
    return error.message || 'An unexpected error occurred.';
  }
};

export const bookService = {
  // GET /api/books (optionally filtered by search)
  getAllBooks: async (search = '') => {
    const params = search && search.trim() ? { search: search.trim() } : {};
    const response = await apiClient.get('/books', { params });
    return response.data;
  },

  // GET /api/books/{id}
  getBookById: async (id) => {
    const response = await apiClient.get(`/books/${id}`);
    return response.data;
  },

  // POST /api/books
  createBook: async (bookData) => {
    const payload = {
      title: bookData.title.trim(),
      author: bookData.author.trim(),
      price: parseFloat(bookData.price),
    };
    const response = await apiClient.post('/books', payload);
    return response.data;
  },

  // PUT /api/books/{id}
  updateBook: async (id, bookData) => {
    const payload = {
      title: bookData.title.trim(),
      author: bookData.author.trim(),
      price: parseFloat(bookData.price),
    };
    const response = await apiClient.put(`/books/${id}`, payload);
    return response.data;
  },

  // DELETE /api/books/{id}
  deleteBook: async (id) => {
    const response = await apiClient.delete(`/books/${id}`);
    return response.data;
  },
};

export default bookService;
