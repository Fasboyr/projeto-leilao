import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import styles from './CategoryList.module.css';
import CategoryService from '../../../services/CategoryService';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';

const CategoryList = ({ onEdit, onUpdate }) => {
    const [categories, setCategories] = useState([]);
    const categoryService = new CategoryService();
    const { t } = useTranslation();

    const fetchCategories = async () => {
        try {
            const data = await categoryService.listCategory();
            setCategories(data);
        } catch (err) {
            console.error("Erro ao buscar categorias:", err);
            handleServerError(err);
        }
    };

    // Chama fetchCategories quando o componente é montado ou quando onUpdate mudar
    useEffect(() => {
        fetchCategories();
    }, [onUpdate]);

    const onDelete = async (id) => {
        // Lógica para deletar a categoria
        try {
            await categoryService.deleteCategory(id);
            fetchCategories(); // Recarrega a lista após exclusão
        } catch (err) {
            handleServerError(err);
        }
    };


    const handleServerError = (err) => {
        if (err.response) {
            switch (err.response.status) {
                case 404:
                    toast.error(t('error.categoryNotFound')); // Leilão não encontrado
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
        <div className={styles.card}>
            {categories.map((category) => (
                <div key={category.id} className={styles.categoryItem}>
                    <div className={styles.categoryContent}>
                        <div>
                            <h3>{category.name}</h3>
                            <p>{category.observation}</p>
                        </div>
                        <div className={styles.actionButtons}>
                            <Button
                                label={t('editButton')}
                                className={`p-button-warning ${styles.customButton}`}
                                onClick={() => onEdit(category)}
                            />
                            <Button
                                label={t('deleteButton')}
                                className={`p-button-danger ${styles.customButton}`}
                                onClick={() => onDelete(category.id)}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
