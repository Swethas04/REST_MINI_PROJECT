# 📚 Library Book Management System

A full-stack, production-grade Library Book Management System built from scratch with **Java 17**, **Spring Boot 3**, **Spring Data JPA**, **H2 In-Memory Database**, **React (Vite)**, and **Tailwind CSS**.

This project provides an interactive, responsive user interface connected to a robust RESTful API with automated database synchronization, strict request validation, and centralized exception handling.

---

## 🌟 Key Features

- **Full CRUD Operations**:
  - **Create**: Add new books with title, author, and price.
  - **Read**: View the full catalog in an interactive table or inspect individual book details.
  - **Update**: Edit existing book records with pre-populated values and validation.
  - **Delete**: Safely delete books with an accessible confirmation modal.
- **Dynamic Live Analytics**:
  - Total Books Count.
  - Unique Authors registered across the catalog.
  - Average Book Price calculated dynamically.
  - Total Inventory Valuation.
- **Client & Server-side Validation**:
  - Non-blank title and author.
  - Non-negative price validation with instant feedback.
  - Protection against accidental double-submissions.
- **Responsive Modern UI**:
  - Designed with Tailwind CSS and Lucide React icons.
  - Slate/Navy dark sidebar navigation with mobile collapsible menu.
  - Instant live search filtering books by title, author, or ID.
  - Toast feedback notifications for all actions.
- **Embedded Database & Zero-Setup**:
  - Built-in H2 in-memory SQL database with web console enabled at `/h2-console`.
- **Automated Testing & API Docs**:
  - Suite of JUnit 5 and MockMvc automated tests.
  - Ready-to-import Postman collection.

---

## 🧱 Architectural Overview

```
+-------------------------------------------------------+
|                React + Vite Frontend                  |
|          (Components, Axios HTTP Client, UI)          |
+---------------------------+---------------------------+
                            |  JSON / REST APIs
                            v  (Port 8080)
+-------------------------------------------------------+
|               Spring Boot REST Controller             |
|         (@RestController, @CrossOrigin, @Valid)       |
+---------------------------+---------------------------+
                            |  DTOs & Entity mapping
                            v
+-------------------------------------------------------+
|                  BookService Layer                    |
|          (Business Logic & @Transactional)            |
+---------------------------+---------------------------+
                            |
                            v
+-------------------------------------------------------+
|                 BookRepository (JPA)                  |
|             (Spring Data JPA & Hibernate)             |
+---------------------------+---------------------------+
                            |  SQL Queries
                            v
+-------------------------------------------------------+
|              H2 In-Memory SQL Database                |
|               (jdbc:h2:mem:librarydb)                 |
+-------------------------------------------------------+
```

### Beginner-Friendly Concepts (For College Faculty Review)

| Layer | Role & Explanation |
| :--- | :--- |
| **Frontend (React)** | The client-side visual layer running in the user's browser. It captures user inputs (clicks, forms, searches), renders the UI, and sends asynchronous HTTP requests to the backend. |
| **Backend (Spring Boot)** | The server-side application logic. It receives HTTP requests, validates inputs, coordinates business rules, controls security/CORS, and talks to the database. |
| **Database (H2)** | The persistent data store. It organizes books into relational tables with schemas, constraints, and auto-incrementing primary keys. |
| **REST API** | The communication contract between frontend and backend. Uses standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) with JSON payloads to transmit structured data. |

---

## 🗂️ Project Folder Structure

```
library-book-management/
│
├── backend/
│   ├── pom.xml                                    # Maven dependencies & build configuration
│   └── src/
│       ├── main/
│       │   ├── java/com/example/library/
│       │   │   ├── LibraryApplication.java       # Main entry point & starter seed data
│       │   │   ├── config/
│       │   │   │   └── CorsConfig.java           # Cross-Origin Resource Sharing configuration
│       │   │   ├── controller/
│       │   │   │   └── BookController.java       # REST endpoints (/api/books)
│       │   │   ├── dto/
│       │   │   │   └── BookRequest.java          # Request body DTO with Jakarta Validation
│       │   │   ├── entity/
│       │   │   │   └── Book.java                 # JPA Entity mapped to H2 "books" table
│       │   │   ├── exception/
│       │   │   │   ├── ResourceNotFoundException.java
│       │   │   │   └── GlobalExceptionHandler.java # Centralized @RestControllerAdvice
│       │   │   ├── repository/
│       │   │   │   └── BookRepository.java       # Spring Data JPA interface
│       │   │   └── service/
│       │   │       └── BookService.java          # Business logic implementation
│       │   └── resources/
│       │       └── application.properties        # Server port & H2 database configuration
│       └── test/
│           └── java/com/example/library/
│               └── BookControllerTest.java       # MockMvc & JUnit 5 test suite
│
├── frontend/
│   ├── package.json                               # NPM scripts & dependencies
│   ├── index.html                                 # HTML5 entry page with Google Fonts
│   ├── vite.config.js                             # Vite dev server configuration
│   ├── tailwind.config.js                         # Tailwind CSS styling tokens
│   ├── postcss.config.js                          # PostCSS setup
│   ├── .env                                       # Local environment variables
│   ├── .env.example                               # Sample environment template
│   └── src/
│       ├── components/
│       │   ├── BookDetailsModal.jsx               # Inspect individual book view
│       │   ├── BookForm.jsx                       # Add & Edit modal with validation
│       │   ├── BookTable.jsx                      # Catalog table with action triggers
│       │   ├── ConfirmDialog.jsx                  # Delete confirmation modal
│       │   ├── Header.jsx                         # Top navigation header
│       │   ├── SearchBar.jsx                      # Live filtering search input
│       │   ├── Sidebar.jsx                        # Navy dark navigation sidebar
│       │   ├── StatCard.jsx                       # Analytics KPI cards
│       │   └── Toast.jsx                          # Toast notification alerts
│       ├── pages/
│       │   ├── Dashboard.jsx                      # Overview KPIs & recent items
│       │   └── BooksPage.jsx                      # Full catalog management view
│       ├── services/
│       │   └── bookService.js                     # Centralized Axios API service
│       ├── App.jsx                                # Root application component & state
│       ├── main.jsx                               # React DOM bootstrap
│       └── index.css                              # Tailwind utilities & custom styles
│
├── postman/
│   └── Library-Book-Management.postman_collection.json # Ready-to-import Postman suite
│
└── README.md                                      # Comprehensive documentation
```

---

## 💻 Tech Stack & Versions

- **Java**: OpenJDK / Oracle JDK 17
- **Backend Framework**: Spring Boot 3.2.5
- **ORM / Persistence**: Spring Data JPA / Hibernate
- **Database**: H2 Database Engine (In-Memory)
- **Validation**: Jakarta Bean Validation (`jakarta.validation-api`)
- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **HTTP Client**: Axios 1.7+

---

## ⚙️ Prerequisites

Before running the project locally, ensure you have:
1. **Java Development Kit (JDK) 17+** installed:
   ```bash
   java -version
   ```
2. **Apache Maven 3.8+** installed:
   ```bash
   mvn -version
   ```
3. **Node.js 18+ and npm 9+** installed:
   ```bash
   node -v
   npm -v
   ```

---

## 🚀 Step-by-Step Execution Guide

### 1. Start the Backend API (Terminal 1)

```bash
cd backend
mvn spring-boot:run
```

- Backend runs at: `http://localhost:8080`
- REST API Base: `http://localhost:8080/api/books`
- H2 Database Console: `http://localhost:8080/h2-console`

### 2. Start the Frontend Application (Terminal 2)

In a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

- Frontend runs at: `http://localhost:5173`
- Open your browser to `http://localhost:5173` to interact with the full dashboard.

---

## 🗄️ H2 Database Configuration

The application uses an embedded in-memory database managed by Spring Boot. No database installation is necessary.

- **JDBC URL**: `jdbc:h2:mem:librarydb`
- **Driver Class**: `org.h2.Driver`
- **Username**: `sa`
- **Password**: *(leave blank)*
- **Console Web URL**: `http://localhost:8080/h2-console`

> **Note on In-Memory Databases**: The H2 in-memory database resets when the Spring Boot server process stops. On every startup, five classic computer science books are automatically seeded via `initDatabase` CommandLineRunner so the catalog is never blank.

---

## 🔌 REST API Endpoints Specification

| Method | Endpoint | Description | Request Body | Success Status |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/books` | Get all books (supports `?search=` query) | None | `200 OK` |
| `GET` | `/api/books/{id}` | Get book by ID | None | `200 OK` / `404 Not Found` |
| `POST` | `/api/books` | Create a new book | JSON (`title`, `author`, `price`) | `201 Created` |
| `PUT` | `/api/books/{id}` | Update existing book by ID | JSON (`title`, `author`, `price`) | `200 OK` / `404 Not Found` |
| `DELETE` | `/api/books/{id}` | Delete book by ID | None | `204 No Content` / `404 Not Found` |

### Sample JSON Payloads

#### Create / Update Request
```json
{
  "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
  "author": "Robert C. Martin",
  "price": 599.00
}
```

#### Success Response (201 Created / 200 OK)
```json
{
  "bookId": 1,
  "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
  "author": "Robert C. Martin",
  "price": 599.00
}
```

#### Validation Error Response (400 Bad Request)
```json
{
  "timestamp": "2026-10-11T22:00:00",
  "status": 400,
  "error": "Validation Error",
  "message": "Input validation failed. Please correct the highlighted errors.",
  "fieldErrors": {
    "title": "Title is required and cannot be blank",
    "price": "Price must be non-negative"
  }
}
```

#### Not Found Response (404 Not Found)
```json
{
  "timestamp": "2026-10-11T22:00:00",
  "status": 404,
  "error": "Not Found",
  "message": "Book not found with id: 999"
}
```

---

## 🧪 Running Automated Tests

Run the full suite of backend integration and unit tests using Maven:

```bash
cd backend
mvn test
```

Test coverage includes:
1. Book creation with 201 response.
2. Full catalog retrieval with 200 response.
3. ID retrieval with 200 response.
4. Book update with 200 response.
5. Book deletion with 204 response.
6. Non-existent ID handling with 404 response.
7. Blank title rejection with 400 response.
8. Blank author rejection with 400 response.
9. Negative price rejection with 400 response.
10. Malformed JSON handling with 400 response.

---

## 📬 Postman Testing Instructions

1. Open Postman.
2. Click **Import** in the upper left.
3. Select the file: `postman/Library-Book-Management.postman_collection.json`.
4. Ensure the `baseUrl` variable points to `http://localhost:8080/api`.
5. Execute requests sequentially:
   - Create Book
   - Get All Books
   - Get Book By ID
   - Update Book
   - Delete Book
   - Invalid Book ID (asserts 404)
   - Invalid Request Body (asserts 400)

---

## 🛠️ Common Errors & Troubleshooting

1. **Port 8080 Already in Use (`BindException`)**:
   - Check what process is using port 8080: `lsof -i :8080`
   - Kill the process: `kill -9 <PID>`, or change `server.port=8081` in `backend/src/main/resources/application.properties` and update `VITE_API_BASE_URL` in `frontend/.env`.

2. **CORS Errors (`Access to XMLHttpRequest has been blocked`)**:
   - Spring Boot has CORS enabled in both `BookController.java` (`@CrossOrigin`) and `CorsConfig.java` for `http://localhost:5173`. Ensure your frontend runs on port 5173.

3. **Frontend Shows "Cannot reach backend server"**:
   - Verify the Spring Boot application is running in terminal 1.
   - Test `curl http://localhost:8080/api/books` in terminal to confirm connectivity.
