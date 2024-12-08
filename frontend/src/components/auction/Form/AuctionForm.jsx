import React, { useState, useEffect } from 'react';
import { Card, Button, InputText, InputNumber, Calendar, Dropdown } from 'primereact';
import styles from './AuctionForm.module.css';
import AuctionService from '../../../services/AuctionService';
import CategoryService from '../../../services/CategoryService';
import { FileUpload } from 'primereact/fileupload';
import { useTranslation } from 'react-i18next';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuctionForm = ({ auction, isEditing, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDateTime, setStartDateTime] = useState(null);
    const [endDateTime, setEndDateTime] = useState(null);
    const [status, setStatus] = useState('');
    const [observation, setObservation] = useState('');
    const [incrementValue, setIncrementValue] = useState(0);
    const [minimumBid, setMinimumBid] = useState(0);
    const [category, setCategory] = useState(null); // Estado para categoria selecionada
    const [categories, setCategories] = useState([]); // Estado para lista de categorias
    const [auctionId, setAuctionId] = useState(null); // Nova linha para armazenar o ID
    const auctionService = new AuctionService();
    const categoryService = new CategoryService();
    const userEmail = localStorage.getItem("email");
    const { t } = useTranslation();

    const [images, setImages] = useState([]);

    const onImageUpload = (event) => {
        const uploadedFiles = event.files;
        setImages([...images, ...uploadedFiles]);
    };

    const onImageRemove = (file) => {
        setImages(images.filter((img) => img.name !== file.name));
    };



    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryService.listCategory(); // Supondo que há um método para listar categorias
                setCategories(data);

            } catch (err) {
                console.error("Erro ao buscar categorias:", err);
            }
        };

        fetchCategories();

        if (isEditing && auction) {
            console.log('Auction: ', auction);

            setAuctionId(auction.id)
            setTitle(auction.title);
            setDescription(auction.description);
            setStartDateTime(formatDateTimeToBrazilian(auction.startDateTime));
            setEndDateTime(formatDateTimeToBrazilian(auction.endDateTime));
            setStatus(auction.status);
            setObservation(auction.observation);
            setIncrementValue(auction.incrementValue);
            setMinimumBid(auction.minimumBid);
            setCategory({ label: auction.category.name, value: auction.category });
        }
    }, [isEditing, auction]);

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

    const formatDateTimeForJSON = (dateString) => {
        if (!dateString) return null;

        // Separar data e hora
        const [datePart, timePart] = dateString.split(' ');

        // Separar dia, mês e ano
        const [day, month, year] = datePart.split('/');

        // Combinar no formato ISO esperado pelo backend
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${timePart}:00`;
    };

    const onSave = async () => {
        console.log('Entrou no on save');

        try {
            const data = {
                id: auctionId ? auctionId : null,
                title,
                description,
                startDateTime: formatDateTimeForJSON(startDateTime), // Converter para o formato JSON
                endDateTime: formatDateTimeForJSON(endDateTime),
                observation,
                incrementValue,
                minimumBid,
                category: category.label,
                userEmail
            };

            if (isEditing) {
                console.log('DATA No update: ', data);

                await auctionService.updateAuction(data); // Atualiza se estiver editando
            } else {
                console.log('Entrou no create');
                await auctionService.createAuction(data); // Cria novo leilão
            }
            onCancel(); // Limpa o formulário após salvar
        } catch (err) {
            console.error("Erro ao salvar leilão:", err);
            handleServerError(err);
        }
    };


    const onSaveWithImage = async () => {
        try {
            const formData = new FormData();

            // Cria o JSON do AuctionCreateDTO
            const auctionData = {
                id: auctionId ? auctionId : null,
                title,
                description,
                startDateTime: formatDateTimeForJSON(startDateTime),
                endDateTime: formatDateTimeForJSON(endDateTime),
                observation,
                incrementValue,
                minimumBid,
                category: category.label,
                userEmail
            };

            // Adiciona a parte 'auction' como JSON
            formData.append("auction", new Blob([JSON.stringify(auctionData)], { type: "application/json" }));

            // Adiciona as imagens ao FormData
            images.forEach((image) => formData.append("images", image));

            if (isEditing) {
                await auctionService.updateAuction(formData); // Atualiza se estiver editando
            } else {
                await auctionService.createAuctionWithImage(formData); // Cria novo leilão
            }

            onCancel(); // Limpa o formulário após salvar
        } catch (err) {
            console.error("Erro ao salvar leilão:", err);
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

    return (
        <div className={styles.auctionGrid}>
            <div className={styles.fieldGroup}>
                <div className={styles.field}>
                    <label htmlFor="title">{t('auctionForm.title')}</label>
                    <InputText
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={t('auctionForm.titlePlaceholder')}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="description">{t('auctionForm.description')}</label>
                    <InputText
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={t('auctionForm.descriptionPlaceholder')}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="category">{t('auctionForm.category')}</label>
                    <Dropdown
                        id="category"
                        value={category}
                        options={categories.map(cat => ({ label: cat.name }))}
                        onChange={(e) => setCategory(e.value)}
                        placeholder={t('auctionForm.categoryPlaceholder')}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="startDateTime">{t('auctionForm.startTime')}</label>
                    <InputText
                        id="startDateTime"
                        value={startDateTime}
                        onChange={(e) => setStartDateTime(e.target.value)}
                        showTime
                        dateFormat="dd/mm/yy"
                        placeholder={t('auctionForm.timePlaceholder')}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="endDateTime">{t('auctionForm.endTime')}</label>
                    <InputText
                        id="endDateTime"
                        value={endDateTime}
                        onChange={(e) => setEndDateTime(e.target.value)}
                        showTime
                        dateFormat="dd/mm/yy"
                        placeholder={t('auctionForm.timePlaceholder')}

                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="observation">{t('auctionForm.observation')}</label>
                    <InputText
                        id="observation"
                        value={observation}
                        onChange={(e) => setObservation(e.target.value)}
                        placeholder={t('auctionForm.observationPlaceholder')}

                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="incrementValue">{t('auctionForm.increment')}</label>
                    <InputNumber
                        id="incrementValue"
                        value={incrementValue}
                        onValueChange={(e) => setIncrementValue(e.value)}
                        placeholder={t('auctionForm.incrementPlaceholder')}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="minimumBid">{t('auctionForm.minimumBid')}</label>
                    <InputNumber
                        id="minimumBid"
                        value={minimumBid}
                        onValueChange={(e) => setMinimumBid(e.value)}
                        placeholder={t('auctionForm.minimumBidPlaceholder')}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="images">{t('auctionForm.image')}</label>
                    <FileUpload
                        name="images"
                        accept="image/*"
                        multiple
                        customUpload
                        uploadHandler={(e) => onImageUpload(e)}
                        onRemove={(e) => onImageRemove(e.file)}
                        chooseLabel={t('auctionForm.chooseImage')}
                        uploadLabel="Upload"
                        cancelLabel={t('cancel')}
                    />
                </div>
            </div>

            <div className={styles.auctionOptions}>
                <Button
                    label={t('cancel')}
                    className={`${styles.auctionButtons} p-button-secondary`}
                    onClick={onCancel}
                />
                <Button
                    label={t('profile.save')}
                    className={styles.auctionButtons}
                    onClick={onSave}
                />
            </div>
        </div>
    );
};

export default AuctionForm;
