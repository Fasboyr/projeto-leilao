import React, { useState, useEffect } from 'react';
import { Card, Button, InputText } from 'primereact';
import styles from './CategoryForm.module.css';
import CategoryService from '../../../services/CategoryService';
import { useTranslation } from 'react-i18next';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryForm = ({ category, isEditing, onCancel }) => {
    const [name, setName] = useState('');
    const [observation, setObservation] = useState('');
    const [id, setId] = useState(null); // Nova linha para armazenar o ID
    const categoryService = new CategoryService();
    const userEmail = localStorage.getItem("email");
    const { t } = useTranslation();
    useEffect(() => {
        if (isEditing && category) {
            console.log(category);

            setName(category.name);
            setObservation(category.observation);
            setId(category.id); // Atualiza o ID para edição
        }
    }, [isEditing, category]);

    const onSave = async () => {
        try {
            if (isEditing) {
                const data = { id, name, observation, userEmail };
                console.log('Entrou no update');

                await categoryService.updateCategory(data); // Atualiza se estiver editando
            } else {
                console.log('Entrou no create');

                const data = { name, observation, userEmail };

                await categoryService.createCategory(data); // Cria nova categoria
            }
            onCancel(); // Limpa o formulário após salvar
        } catch (err) {
            console.error("Erro ao salvar categoria:", err);
            handleServerError(err);
        }
    };


    const handleServerError = (err) => {
        if (err.response) {
            switch (err.response.status) {
                case 404:
                    toast.error(t('error.categoryNotFound')); // Categoria não encontrado
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
        <div className={styles.categoryGrid}>
            <div className={styles.fieldGroup}>
                <div className={styles.field}>
                    <label htmlFor="name">{t('categoryForm.name')}</label>
                    <InputText
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('categoryForm.namePlaceHolder')}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="observation">{t('categoryForm.observation')}</label>
                    <InputText
                        id="observation"
                        value={observation}
                        onChange={(e) => setObservation(e.target.value)}
                        placeholder={t('categoryForm.observationPlaceholder')}
                    />
                </div>
            </div>

            <div className={styles.categoryOptions}>
                <Button
                    label={t('cancel')}
                    className={`${styles.categoryButtons} p-button-secondary`}
                    onClick={onCancel}
                />
                <Button
                    label={t('profile.save')}
                    className={styles.categoryButtons}
                    onClick={onSave}
                />
            </div>
        </div>
    );
};

export default CategoryForm;
