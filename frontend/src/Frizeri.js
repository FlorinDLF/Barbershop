import React, { useState, useEffect } from 'react';
import './BarbersPage.css';
import { useNavigate } from 'react-router-dom';

function BarbersPage() {
    const [barbers, setBarbers] = useState([]);
    const [topBarbers, setTopBarbers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Preluare date despre frizeri
    useEffect(() => {
        fetch('http://localhost:8081/get-barbers')
            .then((res) => res.json())
            .then((data) => {
                console.log("Frizeri preluați:", data); // Debugging
                setBarbers(data);
            })
            .catch((err) => console.error('Eroare la preluarea frizerilor:', err));

        // Fetch pentru top 3 frizeri
        fetch('http://localhost:8081/top-barbers')
        .then((res) => res.json())
        .then((data) => setTopBarbers(data))
        .catch((err) => console.error('Eroare la preluarea topului pentru frizeri:', err));
}, []);

    const handleBarberSelect = (barberId) => {
        localStorage.setItem("selectedBarberId", barberId); // Salvăm ID-ul frizerului selectat
        navigate('/appointments'); // Redirecționăm către pagina de programări
    };

    return (
        <div className="barbers-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-logo">Barbershop</div>
                <ul className="navbar-links">
                    <li><a href="/home">Acasă</a></li>
                    <li><a href="/frizeri">Frizeri</a></li>
                    <li><a href="/appointments">Programări</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>

            {/* Top 3 Frizeri */}
            <div className="top-barbers">
    <h2>Top 3 Frizeri</h2>
    <table className="top-barbers-table">
        <thead>
            <tr>
                <th>Nume</th>
                <th>Prenume</th>
                <th>Total Programări</th>
            </tr>
        </thead>
        <tbody>
            {topBarbers.map((barber, index) => (
                <tr key={index}>
                    <td>{barber.Nume}</td>
                    <td>{barber.Prenume}</td>
                    <td>{barber.Total_Programari}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>


            {/* Conținut principal */}
            <div className="content">
                <h1>Frizerii Noștri</h1>
                <p>Alege unul dintre frizerii noștri pentru a continua cu programarea.</p>

                <div className="barbers-grid">
                    {barbers.map((barber) => (
                        <div key={barber.Id_Frizer} className="barber-card">
                            <h3>{barber.Nume} {barber.Prenume}</h3>
                            <p><strong>Specializare:</strong> {barber.Specializare || "General"}</p>
                            <button onClick={() => handleBarberSelect(barber.Id_Frizer)}>Continuă cu Programarea</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BarbersPage;
