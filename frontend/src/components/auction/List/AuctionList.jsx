import React, { useState, useEffect } from 'react';
import { Card, Button, Dialog } from 'primereact';
import styles from './AuctionList.module.css';
import AuctionService from '../../../services/AuctionService';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';

const AuctionList = ({ onEdit, onUpdate }) => {
    const [auctions, setAuctions] = useState([]);
    const [selectedAuction, setSelectedAuction] = useState(null); // Para o modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const auctionService = new AuctionService();
    const IMAGE_BASE_PATH = '/images';


    const { t } = useTranslation();
    const userId = localStorage.getItem("userId");

    const fetchAuctions = async () => {
        try {
            const data = await auctionService.listAuctionPublic();
            setAuctions(data);
            console.log('dATA: ', data);
            console.log('User id:', userId);
        } catch (err) {
            console.error("Erro ao buscar leilões:", err);
            handleServerError(err);
        }
    };


    const handleServerError = (err) => {
        if (err.response) {
            switch (err.response.status) {
                case 404:
                    toast.error(t('error.auctionNotFound')); // Leilão não encontrado
                    break;
                case 500:
                    toast.error(t('error.errorServer')); // Erro interno do servidor
                    break;
                default:
                    toast.error(t('error.errorUnexpected')); // Erro inesperado
            }
        } else {
            toast.error(t('error.errorNetwork')); // Erro de rede
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
            console.error("Erro ao deletar leilao:", err);
            handleServerError(err);
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

    const formatDateTimeToBrazilian = (dateTimeString) => {
        if (!dateTimeString) {
            console.error("Data e hora inválidas fornecidas:", dateTimeString);
            return null;
        }

        try {
            // Parse da string para um objeto Date
            const date = new Date(dateTimeString);

            // Extrair partes da data
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa de 0
            const year = date.getFullYear();

            // Extrair partes da hora
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            // Formatar no padrão dd/MM/aaaa hh:mm
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        } catch (error) {
            console.error("Erro ao formatar a data e hora:", error);
            return null;
        }
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
                                label={t('auctionList.detailsButton')}
                                className={`p-button-info ${styles.customButton}`}
                                onClick={(e) => {
                                    e.stopPropagation(); // Previne o clique no item
                                    showDetails(auction);
                                }}
                            />
                            {auction.person.id != userId && (
                                <Button
                                    label={t('auctionList.bidButton')}
                                    className={`p-button-sucess ${styles.customButton}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onBid(auction.id);
                                    }}
                                />
                            )}
                            {auction.person.id == userId && (
                                <Button
                                    label={t('editButton')}
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
                        <p><strong>{t('auctionList.description')}:</strong> {selectedAuction.description}</p>
                        <p><strong>{t('auctionList.startTime')}:</strong> {formatDateTimeToBrazilian(selectedAuction.startDateTime)}</p>
                        <p><strong>{t('auctionList.endTime')}:</strong> {formatDateTimeToBrazilian(selectedAuction.endDateTime)}</p>
                        <p><strong>{t('auctionList.observation')}:</strong> {selectedAuction.observation}</p>
                        <p><strong>{t('auctionList.increment')}:</strong> {selectedAuction.incrementValue}</p>
                        <p><strong>{t('auctionList.minimumBid')}:</strong> {selectedAuction.minimumBid}</p>
                        <p><strong>{t('auctionList.category')}:</strong> {selectedAuction.category.name}</p>
                        <p><strong>{t('auctionList.responsible')}:</strong> {selectedAuction.person.name}</p>

                        <div className={styles.modalActionButtons}>
                            {selectedAuction.person.id != userId && (
                                <>
                                    <Button
                                        label={t('auctionList.bidButton')}
                                        className={`p-button-sucess ${styles.customButton}`}
                                        onClick={() => onBid(selectedAuction.id)}
                                    />
                                </>
                            )}
                            {selectedAuction.person.id == userId && (
                                <>
                                    <Button
                                        label={t('editButton')}
                                        className={`p-button-warning ${styles.customButton}`}
                                        onClick={() => onEdit(selectedAuction)}
                                    />
                                    <Button
                                        label={t('deleteButton')}
                                        className={`p-button-danger ${styles.customButton}`}
                                        onClick={() => onDelete(selectedAuction.id)} // Corrigido para o id correto
                                    />
                                </>
                            )}
                        </div>

                        <div className={styles.imageGallery}>
                            {selectedAuction.images && selectedAuction.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={`${IMAGE_BASE_PATH}/${image.imageName}`}
                                    alt={`Imagem ${index + 1} de ${selectedAuction.title}`}
                                    className={styles.galleryImage}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
};

export default AuctionList;

