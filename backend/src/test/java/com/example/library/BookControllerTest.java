package com.example.library;

import com.example.library.entity.Book;
import com.example.library.repository.BookRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        bookRepository.deleteAll();
    }

    @Test
    @DisplayName("POST /api/books - Should successfully create a book and return 201 Created")
    void testCreateBookSuccess() throws Exception {
        Map<String, Object> request = new HashMap<>();
        request.put("title", "Clean Architecture");
        request.put("author", "Robert C. Martin");
        request.put("price", 620.00);

        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.bookId").isNumber())
                .andExpect(jsonPath("$.title").value("Clean Architecture"))
                .andExpect(jsonPath("$.author").value("Robert C. Martin"))
                .andExpect(jsonPath("$.price").value(620.00));
    }

    @Test
    @DisplayName("GET /api/books - Should retrieve all books and return 200 OK")
    void testGetAllBooks() throws Exception {
        bookRepository.save(new Book("Book One", "Author One", new BigDecimal("199.99")));
        bookRepository.save(new Book("Book Two", "Author Two", new BigDecimal("299.99")));

        mockMvc.perform(get("/api/books"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].title").value("Book One"))
                .andExpect(jsonPath("$[1].title").value("Book Two"));
    }

    @Test
    @DisplayName("GET /api/books/{id} - Should retrieve book by ID and return 200 OK")
    void testGetBookByIdSuccess() throws Exception {
        Book saved = bookRepository.save(new Book("Refactoring", "Martin Fowler", new BigDecimal("750.00")));

        mockMvc.perform(get("/api/books/{id}", saved.getBookId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.bookId").value(saved.getBookId()))
                .andExpect(jsonPath("$.title").value("Refactoring"))
                .andExpect(jsonPath("$.author").value("Martin Fowler"))
                .andExpect(jsonPath("$.price").value(750.00));
    }

    @Test
    @DisplayName("PUT /api/books/{id} - Should update existing book and return 200 OK")
    void testUpdateBookSuccess() throws Exception {
        Book saved = bookRepository.save(new Book("Old Title", "Old Author", new BigDecimal("100.00")));

        Map<String, Object> updateRequest = new HashMap<>();
        updateRequest.put("title", "Updated Title");
        updateRequest.put("author", "Updated Author");
        updateRequest.put("price", 250.00);

        mockMvc.perform(put("/api/books/{id}", saved.getBookId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.bookId").value(saved.getBookId()))
                .andExpect(jsonPath("$.title").value("Updated Title"))
                .andExpect(jsonPath("$.author").value("Updated Author"))
                .andExpect(jsonPath("$.price").value(250.00));
    }

    @Test
    @DisplayName("DELETE /api/books/{id} - Should delete book and return 204 No Content")
    void testDeleteBookSuccess() throws Exception {
        Book saved = bookRepository.save(new Book("To Delete", "Delete Author", new BigDecimal("50.00")));

        mockMvc.perform(delete("/api/books/{id}", saved.getBookId()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/books/{id}", saved.getBookId()))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("GET /api/books/{id} - Should return 404 Not Found for nonexistent ID")
    void testGetBookByIdNotFound() throws Exception {
        mockMvc.perform(get("/api/books/99999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.message", containsString("Book not found with id: 99999")));
    }

    @Test
    @DisplayName("POST /api/books - Should reject invalid blank title with 400 Bad Request")
    void testCreateBookInvalidTitle() throws Exception {
        Map<String, Object> request = new HashMap<>();
        request.put("title", "");
        request.put("author", "Valid Author");
        request.put("price", 100.00);

        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.fieldErrors.title").exists());
    }

    @Test
    @DisplayName("POST /api/books - Should reject invalid blank author with 400 Bad Request")
    void testCreateBookInvalidAuthor() throws Exception {
        Map<String, Object> request = new HashMap<>();
        request.put("title", "Valid Title");
        request.put("author", "   ");
        request.put("price", 100.00);

        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.fieldErrors.author").exists());
    }

    @Test
    @DisplayName("POST /api/books - Should reject negative price with 400 Bad Request")
    void testCreateBookNegativePrice() throws Exception {
        Map<String, Object> request = new HashMap<>();
        request.put("title", "Valid Title");
        request.put("author", "Valid Author");
        request.put("price", -49.99);

        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.fieldErrors.price").exists());
    }

    @Test
    @DisplayName("POST /api/books - Should return 400 Bad Request for malformed JSON")
    void testCreateBookMalformedJson() throws Exception {
        String malformedJson = "{ \"title\": \"Broken JSON\", \"price\": }";

        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(malformedJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.error").value("Malformed Request"));
    }
}
