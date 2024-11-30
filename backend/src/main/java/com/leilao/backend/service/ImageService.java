package com.leilao.backend.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leilao.backend.model.Image;
import com.leilao.backend.repository.ImageRepository;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public Image create(Image image) {
        return imageRepository.save(image);
    }

    public Image update(Image image) {
        Image imageSaved = imageRepository.findById(image.getId())
                .orElseThrow(() -> new NoSuchElementException("Objeto não encontrado."));
        imageSaved.setRegistrationDateTime(image.getRegistrationDateTime());
        imageSaved.setImageName(image.getImageName());
        imageSaved.setAuction(image.getAuction());
        return imageRepository.save(imageSaved);
    }

    public void delete(Long id) {
        Image imageSaved = imageRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Objeto não encontrado."));
        imageRepository.delete(imageSaved);
    }

    public List<Image> listAll() {
        return imageRepository.findAll();
    }
}