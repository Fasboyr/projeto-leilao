package com.leilao.backend.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leilao.backend.model.Auction;

import com.leilao.backend.model.AuctionCreateDTO;
import com.leilao.backend.model.Category;
import com.leilao.backend.model.Person;
import com.leilao.backend.repository.AuctionRepository;
import com.leilao.backend.security.AuthPersonProvider;

@Service
public class AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private AuthPersonProvider authPersonProvider;

    public Auction create(AuctionCreateDTO auctionCreateDTO) {
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

        return auctionRepository.save(auction);
    }

    public Auction update(AuctionCreateDTO auctionCreateDTO) {
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
        return auctionRepository.findByStatus("Aberto");
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