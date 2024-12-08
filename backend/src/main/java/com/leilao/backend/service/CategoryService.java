package com.leilao.backend.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leilao.backend.model.Category;
import com.leilao.backend.model.CategoryCreateDTO;
import com.leilao.backend.model.Person;
import com.leilao.backend.repository.CategoryRepository;
import com.leilao.backend.security.AuthPersonProvider;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AuthPersonProvider authPersonProvider;

    public Category create(CategoryCreateDTO categoryCreateDTO) {
        Person authenticatedPerson = authPersonProvider.getAuthenticatedUserByEmail(categoryCreateDTO.getUserEmail());
        Category category = new Category();
        category.setName(categoryCreateDTO.getName());
        category.setObservation(categoryCreateDTO.getObservation());
        category.setPerson(authenticatedPerson);
        return categoryRepository.save(category);
    }

    public Category update(Category category) {
        Category categorySaved = categoryRepository.findById(category.getId())
                .orElseThrow(() -> new NoSuchElementException("Objeto não encontrado"));
        categorySaved.setName(category.getName());
        return categoryRepository.save(categorySaved);
    }

    public void delete(Long id) {
        Category categorySaved = categoryRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Objeto não encontrado"));
        categoryRepository.delete(categorySaved);
    }

    public List<Category> listAll() {
        return categoryRepository.findAll();
    }

    public Category findByName(String name) {
        return categoryRepository.findByName(name)
                .orElseThrow(() -> new NoSuchElementException("Usuário autenticado não encontrado"));
    }
}