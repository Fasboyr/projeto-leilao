import React, { useState } from 'react';
import { Card, TabView, TabPanel } from 'primereact';
import styles from './Auction.module.css';
import AuctionList from '../../components/auction/List/AuctionList';
import AuctionForm from '../../components/auction/Form/AuctionForm';
import { useTranslation } from 'react-i18next';

const Auction = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [currentAuction, setCurrentAuction] = useState(null);
    const [updateKey, setUpdateKey] = useState(0); // chave para forçar a atualização da lista

    const onEdit = (auction) => {
        setCurrentAuction(auction);
        setIsEditing(true);
        setActiveIndex(1); // Muda para a aba de Cadastro de Categoria
    };

    const onCancel = () => {
        setIsEditing(false);
        setCurrentAuction(null);
        setActiveIndex(0); // Volta para a aba de Lista de Categorias
    };

    const handleTabChange = (e) => {
        setActiveIndex(e.index);
        if (e.index === 0) {
            // Ao voltar para a aba de "Lista de Categorias", atualiza os dados
            setUpdateKey((prev) => prev + 1); // Força a atualização da lista
        }
    };

    return (
        <div className={styles.auctionPage}>
            <Card className={styles.card} title={t('auction.title')}>
                <TabView
                    className={`${styles.card} ${styles.customTabView}`}
                    activeIndex={activeIndex}
                    onTabChange={handleTabChange}
                >
                    <TabPanel header={t('auction.auctionList')} className={styles.customTabPanel}>
                        <AuctionList onEdit={onEdit} onUpdate={updateKey} />
                    </TabPanel>
                    <TabPanel header={t('auction.auctionForm')} className={styles.customTabPanel}>
                        <AuctionForm auction={currentAuction} isEditing={isEditing} onCancel={onCancel} />
                    </TabPanel>
                </TabView>
            </Card>
        </div>
    );
};

export default Auction;
