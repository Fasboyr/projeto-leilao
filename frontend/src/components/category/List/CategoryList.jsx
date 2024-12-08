import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import styles from './CategoryList.module.css';
import CategoryService from '../../../services/CategoryService';

const CategoryList = ({ onEdit, onUpdate }) => {
    const [categories, setCategories] = useState([]);
    const categoryService = new CategoryService();

    const fetchCategories = async () => {
        try {
            const data = await categoryService.listCategory();
            setCategories(data);
        } catch (err) {
            console.error("Erro ao buscar categorias:", err);
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
            console.error("Erro ao deletar categoria:", err);
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
                                label="Editar"
                                className={`p-button-warning ${styles.customButton}`}
                                onClick={() => onEdit(category)}
                            />
                            <Button
                                label="Excluir"
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
