import React, { useEffect, useState } from 'react';
import './BarberStatsPage.css';

const BarberStatsPage = () => {
    const [stats, setStats] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8081/barber-stats?requester_type=admin')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Eroare la preluarea datelor.");
                }
                return response.json();
            })
            .then(data => setStats(data))
            .catch(err => setError(err.message));
    }, []);

    if (error) {
        return (
            <div className="error-message">
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Reîncearcă</button>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <nav className="navbar">
                            <div className="logo">Barbershop</div>
                            <ul className="nav-links">
                                <li><a href="/admin">Admin</a></li>
                                <li><a href="/barberstats">FrizeriStats</a></li>
                                <li><a href="/clientstats">ClientiStats</a></li>
                            </ul>
                        </nav>
            <div className="stats-content">
                <h1>Statistici Frizeri</h1>
                {stats.length > 0 ? (
                    <table className="stats-table">
                        <thead>
                            <tr>
                                <th>Nume</th>
                                <th>Prenume</th>
                                <th>Total Programări</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.map((stat, index) => (
                                <tr key={index}>
                                    <td>{stat.Nume}</td>
                                    <td>{stat.Prenume}</td>
                                    <td>{stat.Total_Programari}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-data-message">Nu există statistici disponibile pentru frizeri.</p>
                )}
            </div>
        </div>
    );
};

export default BarberStatsPage;
