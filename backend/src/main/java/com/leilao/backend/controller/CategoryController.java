package com.leilao.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leilao.backend.model.Category;
import com.leilao.backend.model.CategoryCreateDTO;
import com.leilao.backend.service.CategoryService;

import lombok.Data;

@RestController
@RequestMapping("/api/category")
@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    // @PreAuthorize("hasRole('ADMIN')")
    public Category create(@RequestBody CategoryCreateDTO category) {
        System.out.println("Entrou no controller, dados:" + category);
        return categoryService.create(category);
    }

    @PutMapping
    // @PreAuthorize("hasRole('ADMIN')")
    public Category update(@RequestBody Category category) {
        return categoryService.update(category);
    }

    @GetMapping
    public List<Category> listAll() {
        return categoryService.listAll();
    }

    @DeleteMapping("/{id}")
    // @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable("id") Long id) {
        
        System.out.println("Entrou no controller, id:" + id);
        categoryService.delete(id);
    }

}

