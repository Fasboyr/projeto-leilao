import React from 'react';
import styles from './AdminDashboard.module.css';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, BarElement);

const AdminDashboard = () => {
    const salesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Sales',
                data: [500, 700, 800, 600, 900, 1100, 1300],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
            }
        ]
    };

    const auctionsData = {
        labels: ['Last Week', 'This Week'],
        datasets: [
            {
                label: 'Active Auctions',
                data: [20, 35],
                backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)'],
                borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)'],
                borderWidth: 1,
            }
        ]
    };

    return (
        <div className={styles.background}>
            <div className={styles.card}>
                <div className={styles.header}>Admin Dashboard</div>
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <h3>Total Auctions</h3>
                        <p>150</p>
                    </div>
                    <div className={styles.stat}>
                        <h3>Recent Items Sold</h3>
                        <p>45</p>
                    </div>
                    <div className={styles.stat}>
                        <h3>New Users</h3>
                        <p>20</p>
                    </div>
                    <div className={styles.stat}>
                        <h3>Total Sales</h3>
                        <p>$25,000</p>
                    </div>
                </div>
                <div className={styles.charts}>
                    <div className={styles.chart}>
                        <h4>Sales Over Time</h4>
                        <Line data={salesData} options={{ maintainAspectRatio: false }} />
                    </div>
                    <div className={styles.chart}>
                        <h4>Active Auctions Comparison</h4>
                        <Bar data={auctionsData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
