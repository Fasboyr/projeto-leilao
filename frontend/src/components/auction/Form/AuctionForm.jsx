import React, { useState, useEffect } from 'react';
import { Card, Button, InputText, InputNumber, Calendar, Dropdown } from 'primereact';
import styles from './AuctionForm.module.css';
import AuctionService from '../../../services/AuctionService';
import CategoryService from '../../../services/CategoryService';

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
    

    // Simulação de busca de categorias (substituir pela API real)
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
        }
    };

    return (
        <div className={styles.auctionGrid}>
            <div className={styles.fieldGroup}>
                <div className={styles.field}>
                    <label htmlFor="title">Título</label>
                    <InputText
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Digite o título do leilão"
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="description">Descrição</label>
                    <InputText
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Digite a descrição do leilão"
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="category">Categoria</label>
                    <Dropdown
                        id="category"
                        value={category}
                        options={categories.map(cat => ({ label: cat.name}))}
                        onChange={(e) => setCategory(e.value)}
                        placeholder="Selecione uma categoria"
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="startDateTime">Data e Hora de Início</label>
                    <InputText
                        id="startDateTime"
                        value={startDateTime}
                        onChange={(e) => setStartDateTime(e.target.value)}
                        showTime
                        dateFormat="dd/mm/yy"
                        placeholder="DD/MM/AAAA HH/MM"
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="endDateTime">Data de Hora de Término</label>
                    <InputText
                        id="endDateTime"
                        value={endDateTime}
                        onChange={(e) => setEndDateTime(e.target.value)}
                        showTime
                        dateFormat="dd/mm/yy"
                        placeholder="DD/MM/AAAA HH/MM"

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
                <div className={styles.field}>
                    <label htmlFor="incrementValue">Incremento</label>
                    <InputNumber
                        id="incrementValue"
                        value={incrementValue}
                        onValueChange={(e) => setIncrementValue(e.value)}
                        placeholder="Digite o valor de incremento"
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="minimumBid">Lance Mínimo</label>
                    <InputNumber
                        id="minimumBid"
                        value={minimumBid}
                        onValueChange={(e) => setMinimumBid(e.value)}
                        placeholder="Digite o lance mínimo"
                    />
                </div>
            </div>

            <div className={styles.auctionOptions}>
                <Button
                    label="Cancelar"
                    className={`${styles.auctionButtons} p-button-secondary`}
                    onClick={onCancel}
                />
                <Button
                    label="Salvar"
                    className={styles.auctionButtons}
                    onClick={onSave}
                />
            </div>
        </div>
    );
};

export default AuctionForm;
