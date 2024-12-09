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
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [auctionId, setAuctionId] = useState(null);
    const [images, setImages] = useState([]);
    const [savedImages, setSavedImages] = useState([]);

    const auctionService = new AuctionService();
    const categoryService = new CategoryService();
    const userEmail = localStorage.getItem("email");
    const { t } = useTranslation();
    const IMAGE_BASE_PATH = '/images';

    const onImageUpload = (event) => {
        const uploadedFiles = event.files;
        setImages([...images, ...uploadedFiles]);
    };

    const onImageRemove = (file) => {
        setImages(images.filter((img) => img.name !== file.name));
    };

    const onSavedImageRemove = (file) => {
        setSavedImages((prevImages) =>
            prevImages.map((img) =>
                img.name === file.name
                    ? { ...img, delete: true }
                    : img
            )
        );
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryService.listCategory();
                setCategories(data);
            } catch (err) {
                console.error("Erro ao buscar categorias:", err);
            }
        };

        fetchCategories();

        if (isEditing && auction) {
            setAuctionId(auction.id);
            setTitle(auction.title);
            setDescription(auction.description);
            setStartDateTime(formatDateTimeToBrazilian(auction.startDateTime));
            setEndDateTime(formatDateTimeToBrazilian(auction.endDateTime));
            setStatus(auction.status);
            setObservation(auction.observation);
            setIncrementValue(auction.incrementValue);
            setMinimumBid(auction.minimumBid);
            setCategory({ label: auction.category.name, value: auction.category });

            if (auction.images && auction.images.length > 0) {
                const existingImages = auction.images.map((image) => ({
                    name: image.imageName,
                    preview: `${IMAGE_BASE_PATH}/${image.imageName}`,
                    delete: false,
                }));
                setSavedImages(existingImages);
            }
        }
    }, [isEditing, auction]);

    const formatDateTimeToBrazilian = (dateTimeString) => {
        if (!dateTimeString) return null;

        try {
            const date = new Date(dateTimeString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            return `${day}/${month}/${year} ${hours}:${minutes}`;
        } catch (error) {
            console.error("Erro ao formatar a data e hora:", error);
            return null;
        }
    };

    const formatDateTimeForJSON = (dateString) => {
        if (!dateString) return null;
        const [datePart, timePart] = dateString.split(' ');
        const [day, month, year] = datePart.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${timePart}:00`;
    };

    const onSave = async () => {
        try {
            const formData = new FormData();

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
                userEmail,
                image: savedImages ? savedImages : null,
            };

            formData.append("auction", new Blob([JSON.stringify(auctionData)], { type: "application/json" }));
            images.forEach((image) => formData.append("images", image));

            if (isEditing) {
                await auctionService.updateAuction(formData);
            } else {
                await auctionService.createAuction(formData);
            }

            onCancel();
        } catch (err) {
            console.error("Erro ao salvar leilão:", err);
            handleServerError(err);
        }
    };

    const handleServerError = (err) => {
        if (err.response) {
            switch (err.response.status) {
                case 404:
                    toast.error(t('error.auctionNotFound'));
                    break;
                case 500:
                    toast.error(t('error.errorServer'));
                    break;
                default:
                    toast.error(t('error.errorUnexpected'));
            }
        } else {
            toast.error(t('error.errorNetwork'));
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
                    <div className={styles.field}>
                        {savedImages.length > 0 && ( // Renderiza apenas se houver imagens salvas
                            <>
                                <label>{t('auctionForm.savedImages')}</label>
                                <div className={styles.imagePreviewContainer}>
                                    {savedImages.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`${styles.imagePreview} ${image.delete ? styles.imageDeleted : ''}`} // Adiciona estilo acinzentado se delete=true
                                        >
                                            <img
                                                src={image.preview}
                                                alt={image.name}
                                                className={`${styles.galleryImage} ${image.delete ? styles.imageDeleted : ''}`} // Acinzentar imagem
                                            />
                                            <Button
                                                icon={image.delete ? "pi pi-undo" : "pi pi-times"} // Altera o ícone com base no estado
                                                className={`p-button-sm ${image.delete ? "p-button-secondary" : "p-button-danger"}`} // Altera estilo do botão
                                                onClick={() =>
                                                    setSavedImages((prevImages) =>
                                                        prevImages.map((img) =>
                                                            img.name === image.name
                                                                ? { ...img, delete: !img.delete } // Alterna o estado delete
                                                                : img
                                                        )
                                                    )
                                                }
                                                tooltip={
                                                    image.delete
                                                        ? t('auctionForm.undoRemoveButton') 
                                                        : t('auctionForm.removeSavedButton') 
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>


                    {/* Componente FileUpload para novas imagens */}
                    <div className={styles.field}>
                        <label>{t('auctionForm.uploadImages')}</label>
                        <FileUpload
                            name="images"
                            accept="image/*"
                            multiple
                            customUpload
                            uploadHandler={onImageUpload}
                            onRemove={(e) => onImageRemove(e.file)}
                            chooseLabel={t('auctionForm.chooseImage')}
                            uploadLabel="Upload"
                            cancelLabel={t('cancel')}
                        />
                    </div>


                </div>
            </div>
            <div className={styles.auctionOptions}>
                <Button
                    label={t('cancel')}
                    className="p-button-secondary"
                    onClick={onCancel}
                />
                <Button
                    label={t('profile.save')}
                    onClick={onSave}
                />
            </div>
        </div>

    );
};

export default AuctionForm;
