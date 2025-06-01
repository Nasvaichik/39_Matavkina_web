package com.example.demo.model;  // Указываем пакет

import jakarta.persistence.*;    // Импорты для JPA

@Entity                         // Говорим Spring, что это сущность БД
@Table(name = "products")       // Название таблицы в БД
public class Product {
    
    @Id                         // Поле id - первичный ключ
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Автоинкремент
    private Long id;
    
    private String name;        // Название продукта
    private double price;       // Цена
    
    // Пустой конструктор (обязателен для Spring Data JPA)
    public Product() {}
    
    // Конструктор с параметрами
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
    
    // Геттеры и сеттеры (обязательны)
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public double getPrice() {
        return price;
    }
    
    public void setPrice(double price) {
        this.price = price;
    }
}