package com.leilao.backend.service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.leilao.backend.model.Auction;

import com.leilao.backend.model.AuctionCreateDTO;
import com.leilao.backend.model.Category;
import com.leilao.backend.model.Image;
import com.leilao.backend.model.Person;
import com.leilao.backend.repository.AuctionRepository;
import com.leilao.backend.security.AuthPersonProvider;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Collectors;

@Service
public class AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private AuthPersonProvider authPersonProvider;

    public Auction create(AuctionCreateDTO auctionCreateDTO, List<MultipartFile> images) {
        Person person = authPersonProvider.getAuthenticatedUserByEmail(auctionCreateDTO.getUserEmail());
        Category category = categoryService.findByName(auctionCreateDTO.getCategory());

        Auction auction = new Auction();

        auction.setTitle(auctionCreateDTO.getTitle());
        auction.setDescription(auctionCreateDTO.getDescription());
        auction.setStartDateTime(auctionCreateDTO.getStartDateTime());
        auction.setEndDateTime(auctionCreateDTO.getEndDateTime());
        auction.setObservation(auctionCreateDTO.getObservation());
        auction.setIncrementValue(auctionCreateDTO.getIncrementValue());
        auction.setMinimumBid(auctionCreateDTO.getMinimumBid());
        auction.setCategory(category);
        auction.setPerson(person);
        auction.setStatus("Aberto");

        if (images != null && !images.isEmpty()) {
            List<Image> imageList = saveImages(images, auction);
            auction.setImages(imageList);
        }

        return auctionRepository.save(auction);
    }

    private List<Image> saveImages(List<MultipartFile> images, Auction auction) {
        return images.stream().map(image -> {
            try {
                String fileName = saveImageToFileSystem(image);
                Image newImage = new Image();
                newImage.setImageName(fileName);
                newImage.setRegistrationDateTime(new Date());
                newImage.setAuction(auction);
                return newImage;
            } catch (Exception e) {
                throw new RuntimeException("Erro ao salvar a imagem", e);
            }
        }).collect(Collectors.toList());
    }

    private String saveImageToFileSystem(MultipartFile image) throws Exception {
        Path uploadDir = Paths.get("frontend/public/images");
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Files.write(uploadDir.resolve(fileName), image.getBytes());
        return fileName;
    }

    public Auction update(AuctionCreateDTO auctionCreateDTO, List<MultipartFile> images) {
        System.out.println("Entrou no update");

        Auction auctionSaved = auctionRepository.findById(auctionCreateDTO.getId())
                .orElseThrow(() -> new NoSuchElementException("Leilão não encontrado."));
        Category category = categoryService.findByName(auctionCreateDTO.getCategory());
        auctionSaved.setTitle(auctionCreateDTO.getTitle());
        auctionSaved.setDescription(auctionCreateDTO.getDescription());
        auctionSaved.setStartDateTime(auctionCreateDTO.getStartDateTime());
        auctionSaved.setEndDateTime(auctionCreateDTO.getEndDateTime());
        auctionSaved.setObservation(auctionCreateDTO.getObservation());
        auctionSaved.setIncrementValue(auctionCreateDTO.getIncrementValue());
        auctionSaved.setMinimumBid(auctionCreateDTO.getMinimumBid());
        auctionSaved.setCategory(category);

        if (images != null && !images.isEmpty()) {
            List<Image> imageList = saveImages(images, auctionSaved);
            auctionSaved.setImages(imageList);
        }
        return auctionRepository.save(auctionSaved);
    }

    public void delete(Long id) {
        Auction auctionSaved = auctionRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Leilão não encontrado"));

        auctionSaved.setStatus("Fechado");
        auctionRepository.save(auctionSaved);
    }

    public List<Auction> listAll() {
        Person authenticatedUser = authPersonProvider.getAuthenticatedUser();
        return auctionRepository.findByPerson(authenticatedUser);
    }

    public List<Auction> listAllPublic() {
        // Retorna apenas leilões com status "Aberto"
        try {
            return auctionRepository.findByStatus("Aberto");
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Erro ao listar leilões públicos", e);
        }
    }

    public Auction findById(Long id) {
        Person authenticatedUser = authPersonProvider.getAuthenticatedUser();
        Auction auction = auctionRepository.findByIdAndPerson(id, authenticatedUser);
        if (auction == null) {
            throw new NoSuchElementException("Leilão não encontrado ou não pertence ao usuário autenticado");
        }
        return auction;
    }
}