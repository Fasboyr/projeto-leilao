import React from 'react';
import './dashboard.css';
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
    const totalVendasMensais = [350000, 450000,300000, 250000, 400000, 500000]; // Dados fictícios mensais
    const ultimosItensArrematados = [
        { nome: 'Lote 1 - Boi Nelore', valor: 'R$ 10.000' },
        { nome: 'Lote 2 - Vaca Leiteira', valor: 'R$ 7.500' },
        { nome: 'Lote 3 - Touro Brahman', valor: 'R$ 15.000' },
    ];
    const ultimosUsuariosCadastrados = ['João Silva', 'Maria Pereira', 'Carlos Souza'];
    const meses = ['Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago'];
    
    // Dados para os gráficos
    const leiloesData = {
        labels: meses,
        datasets: [
            {
                label: 'Leilões Ativos',
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
                label: 'Total de Vendas',
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
                label: 'Total de Vendas Mensais',
                data: totalVendasMensais,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="dashboard-container">
            <div className="left-section">
                {/* Leilões Ativos */}
                <Card title="Leilões Ativos">
                    <div className="card-content">
                        <p><strong>{leiloesAtivos}</strong> leilões ativos atualmente.</p>
                        <Bar data={leiloesData} options={{ responsive: true }} />
                    </div>
                </Card>

                {/* Últimos Itens Arrematados */}
                <Card title="Últimos Itens Arrematados">
                    <ul className="card-list">
                        {ultimosItensArrematados.map((item, index) => (
                            <li key={index}>
                                {item.nome} - {item.valor}
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

            <div className="center-section">
                {/* Total de Vendas Mensais */}
                <Card title="Total de Vendas Mensais">
                    <div className="card-content">
                        
                        <Bar data={vendasMensaisData} options={{ responsive: true }} />
                    </div>
                </Card>
            </div>

            <div className="right-section">
                {/* Últimos Usuários Cadastrados */}
                <Card title="Últimos Usuários Cadastrados">
                    <ul className="card-list">
                        {ultimosUsuariosCadastrados.map((usuario, index) => (
                            <li key={index}>{usuario}</li>
                        ))}
                    </ul>
                </Card>

                <Card title="Total de Vendas Realizadas">
                    <div className="card-content">
                        <p>
                            <strong>{totalVendas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong> em vendas realizadas.
                        </p>
                        <Bar data={vendasData} options={{ responsive: true }} />
                    </div>
                </Card>
            </div>

            {/* Botões para troca de idioma 
            <div className="language-options">
                <Button label="English" onClick={() => changeLanguage('en')} />
                <Button label="Português" onClick={() => changeLanguage('pt')} />
            </div>
            */}
        </div>
    );
};

export default Dashboard;
