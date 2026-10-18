package com.example.library;

import com.example.library.entity.Book;
import com.example.library.repository.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;
import java.util.List;

@SpringBootApplication
public class LibraryApplication {

    public static void main(String[] args) {
        SpringApplication.run(LibraryApplication.class, args);
    }

    @Bean
    public CommandLineRunner initDatabase(BookRepository bookRepository) {
        return args -> {
            if (bookRepository.count() == 0) {
                List<Book> initialBooks = List.of(
                        new Book("Clean Code", "Robert C. Martin", new BigDecimal("599.00")),
                        new Book("The Pragmatic Programmer", "Andrew Hunt & David Thomas", new BigDecimal("649.00")),
                        new Book("Design Patterns", "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides", new BigDecimal("799.00")),
                        new Book("Introduction to Algorithms", "Thomas H. Cormen", new BigDecimal("899.50")),
                        new Book("Effective Java", "Joshua Bloch", new BigDecimal("549.00"))
                );
                bookRepository.saveAll(initialBooks);
                System.out.println("Initialized H2 database with " + initialBooks.size() + " starter library books.");
            }
        };
    }
}
