import React, { useState, useEffect } from 'react';
import { Card, Button, Dialog } from 'primereact';
import styles from './AuctionList.module.css';
import AuctionService from '../../../services/AuctionService';

const AuctionList = ({ onEdit, onUpdate }) => {
    const [auctions, setAuctions] = useState([]);
    const [selectedAuction, setSelectedAuction] = useState(null); // Para o modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const auctionService = new AuctionService();
    const userId = localStorage.getItem("userId");

    const fetchAuctions = async () => {
        try {
            const data = await auctionService.listAuctionPublic();
            setAuctions(data);
            console.log('dATA: ', data);
            console.log('User id:', userId);



        } catch (err) {
            console.error("Erro ao buscar categorias:", err);
        }
    };


    useEffect(() => {
        fetchAuctions();
    }, [onUpdate]);

    const onDelete = async (id) => {
        // Lógica para deletar a categoria
        try {
            await auctionService.deleteAuction(id);
            fetchAuctions(); // Recarrega a lista após exclusão
        } catch (err) {
            console.error("Erro ao deletar categoria:", err);
        }
    };

    const showDetails = (auction) => {
        setSelectedAuction(auction);
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
        setSelectedAuction(null);
    };

    const onBid = (id) => {
        console.log(`Dar lance no leilão com ID ${id}`);
        setAuctions(auctions.filter((auction) => auction.id !== id));
    };



    return (
        <div className={styles.card}>
            {Array.isArray(auctions) && auctions.map((auction) => (

                <div
                    key={auction.id}
                    className={styles.auctionItem}
                    onClick={() => showDetails(auction)} // Abre o modal ao clicar em qualquer parte
                >

                    <div className={styles.auctionContent}>
                        <h3>{auction.title}</h3>
                        <p>{auction.description}</p>
                        <div className={styles.actionButtons}>
                            <Button
                                label="Ver Detalhes"
                                className={`p-button-info ${styles.customButton}`}
                                onClick={(e) => {
                                    e.stopPropagation(); // Previne o clique no item
                                    showDetails(auction);
                                }}
                            />
                            {auction.person.id != userId && (
                                <Button
                                    label="Dar Lance"
                                    className={`p-button-sucess ${styles.customButton}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onBid(auction.id);
                                    }}
                                />
                            )}
                            {auction.person.id == userId && (
                                <Button
                                    label="Editar"
                                    className={`p-button-warning ${styles.customButton}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(auction);
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Modal de Detalhes */}
            <Dialog
                header="Detalhes do Leilão"
                visible={isModalVisible}
                className={styles.modalContainer}
                onHide={hideModal}
                modal
            >
                {selectedAuction && (
                    <div className={styles.modalContent}>
                        <h3>{selectedAuction.title}</h3>
                        <p><strong>Descrição:</strong> {selectedAuction.description}</p>
                        <p><strong>Início:</strong> {selectedAuction.startDateTime}</p>
                        <p><strong>Término:</strong> {selectedAuction.endDateTime}</p>
                        <p><strong>Status:</strong> {selectedAuction.status}</p>
                        <p><strong>Observação:</strong> {selectedAuction.observation}</p>
                        <p><strong>Incremento:</strong> {selectedAuction.incrementValue}</p>
                        <p><strong>Lance Mínimo:</strong> {selectedAuction.minimumBid}</p>
                        <p><strong>Categoria:</strong> {selectedAuction.category.name}</p>
                        <p><strong>Responsável:</strong> {selectedAuction.person.name}</p>
                        <div className={styles.modalActionButtons}>
                            {selectedAuction.person.id != userId && (
                                <>
                                    <Button
                                        label="Dar Lance"
                                        className={`p-button-sucess ${styles.customButton}`}
                                        onClick={() => onBid(selectedAuction.id)}
                                    />
                                </>
                            )}
                            {selectedAuction.person.id == userId && (
                                <>
                                    <Button
                                        label="Editar"
                                        className={`p-button-warning ${styles.customButton}`}
                                        onClick={() => onEdit(selectedAuction)}
                                    />
                                    <Button
                                        label="Excluir"
                                        className={`p-button-danger ${styles.customButton}`}
                                        onClick={() => onDelete(selectedAuction.id)} // Corrigido para o id correto
                                    />
                                </>
                            )}
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
};

export default AuctionList;

