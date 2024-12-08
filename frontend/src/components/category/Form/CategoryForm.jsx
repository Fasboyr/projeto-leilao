import React, { useState, useEffect } from 'react';
import { Card, Button, InputText } from 'primereact';
import styles from './CategoryForm.module.css';
import CategoryService from '../../../services/CategoryService';

const CategoryForm = ({ category, isEditing, onCancel }) => {
    const [name, setName] = useState('');
    const [observation, setObservation] = useState('');
    const [id, setId] = useState(null); // Nova linha para armazenar o ID
    const categoryService = new CategoryService();
    const userEmail = localStorage.getItem("email");

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
        }
    };

    return (
        <div className={styles.categoryGrid}>
            <div className={styles.fieldGroup}>
                <div className={styles.field}>
                    <label htmlFor="name">Nome</label>
                    <InputText
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite o nome da categoria"
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="observation">Observação</label>
                    <InputText
                        id="observation"
                        value={observation}
                        onChange={(e) => setObservation(e.target.value)}
                        placeholder="Digite uma observação (opcional)"
                    />
                </div>
            </div>

            <div className={styles.categoryOptions}>
                <Button
                    label="Cancelar"
                    className={`${styles.categoryButtons} p-button-secondary`}
                    onClick={onCancel}
                />
                <Button
                    label="Salvar"
                    className={styles.categoryButtons}
                    onClick={onSave}
                />
            </div>
        </div>
    );
};

export default CategoryForm;
