import React, { useState } from 'react';
import { Card, TabView, TabPanel } from 'primereact';
import styles from './Category.module.css';
import CategoryList from '../../components/category/List/CategoryList';
import CategoryForm from '../../components/category/Form/CategoryForm';

const Category = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [updateKey, setUpdateKey] = useState(0); // chave para forçar a atualização da lista

    const onEdit = (category) => {
        setCurrentCategory(category);
        setIsEditing(true);
        setActiveIndex(1); // Muda para a aba de Cadastro de Categoria
    };

    const onCancel = () => {
        setIsEditing(false);
        setCurrentCategory(null);
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
        <div className={styles.categoryPage}>
            <Card className={styles.card} title="Gerenciamento de Categorias">
                <TabView
                    className={`${styles.card} ${styles.customTabView}`}
                    activeIndex={activeIndex}
                    onTabChange={handleTabChange}
                >
                    <TabPanel header="Lista de Categorias" className={styles.customTabPanel}>
                        <CategoryList onEdit={onEdit} onUpdate={updateKey} />
                    </TabPanel>
                    <TabPanel header="Cadastro de Categoria" className={styles.customTabPanel}>
                        <CategoryForm category={currentCategory} isEditing={isEditing} onCancel={onCancel} />
                    </TabPanel>
                </TabView>
            </Card>
        </div>
    );
};

export default Category;
