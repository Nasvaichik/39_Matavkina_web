package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:8080") // Разрешаем запросы с фронтенда
public class ProductController {
    
    @Autowired
    private ProductRepository productRepository;
    
    // GET все продукты
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    // POST новый продукт
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }
    
    // PUT обновление продукта
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Продукт не найден с id: " + id));
        
        product.setName(productDetails.getName());
        product.setPrice(productDetails.getPrice());
        
        Product updatedProduct = productRepository.save(product);
        return ResponseEntity.ok(updatedProduct);
    }
    
    // DELETE продукта
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Продукт не найден с id: " + id));
        
        productRepository.delete(product);
        return ResponseEntity.noContent().build();
    }
}