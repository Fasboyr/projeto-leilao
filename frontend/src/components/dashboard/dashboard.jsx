import React from 'react';
import styles from './dashboard.module.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useTranslation } from 'react-i18next';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    // Dados fictícios para preencher o dashboard
    const leiloesAtivos = 12;
    const totalVendas = 1500000;
    const totalVendasMensais = [350000, 450000, 300000, 250000, 400000, 500000]; 
    const ultimosItensArrematados = [
        { nome: t('dashboard.itemName1'), valor: 'R$ 10.000' },
        { nome: t('dashboard.itemName2'), valor: 'R$ 7.500' },
        { nome: t('dashboard.itemName3'), valor: 'R$ 15.000' },
    ];
    const ultimosUsuariosCadastrados = ['João Silva', 'Maria Pereira', 'Carlos Souza'];
    const meses = [t('dashboard.march'), t('dashboard.april'), t('dashboard.may'), t('dashboard.june'), t('dashboard.july'), t('dashboard.august')];

    // Dados para os gráficos
    const leiloesData = {
        labels: meses,
        datasets: [
            {
                label: t('dashboard.auctions'),
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const vendasData = {
        labels: meses,
        datasets: [
            {
                label: t('dashboard.total'),
                data: [500000, 600000, 700000, 800000, 900000, 1000000],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const vendasMensaisData = {
        labels: meses,
        datasets: [
            {
                label: t('dashboard.monthly'),
                data: totalVendasMensais,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.leftSection}>
                <Card title={t('dashboard.auctions')} >
                    <div className={styles.cardContent}>
                        <p><strong>{leiloesAtivos}</strong> {t('dashboard.moment')}</p>
                        <Bar data={leiloesData} options={{ responsive: true }} />
                    </div>
                </Card>
                <Card title={t('dashboard.auctioned')}>
                    <ul className={styles.cardList}>
                        {ultimosItensArrematados.map((item, index) => (
                            <li key={index}>
                                {item.nome} - {item.valor}
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

            <div className={styles.centerSection}>
                <Card title={t('dashboard.monthly')}>
                    <div className={styles.cardContent}>
                        <Bar data={vendasMensaisData} options={{ responsive: true }} />
                    </div>
                </Card>
            </div>

            <div className={styles.rightSection}>
                <Card title={t('dashboard.subscribed')}>
                    <ul className={styles.cardList}>
                        {ultimosUsuariosCadastrados.map((usuario, index) => (
                            <li key={index}>{usuario}</li>
                        ))}
                    </ul>
                </Card>

                <Card title={t('dashboard.sales')}>
                    <div className={styles.cardContent}>
                        <p>
                            <strong>{totalVendas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong> {t('dashboard.realized')}
                        </p>
                        <Bar data={vendasData} options={{ responsive: true }} />
                    </div>
                </Card>
            </div>

            {/* Botões para troca de idioma 
            <div className={styles.languageOptions}>
                <Button label="English" onClick={() => changeLanguage('en')} />
                <Button label="Português" onClick={() => changeLanguage('pt')} />
            </div>
            */}
        </div>
    );
};

export default Dashboard;
