import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import poza1 from './poza1.jpg';
import poza2 from './poza2.jpg';
import poza3 from './poza3.jpg';
import poza4 from './poza4.jpg';

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [topClients, setTopClients] = useState([]);
    const [topServices, setTopServices] = useState([]);
    const [error, setError] = useState(null);

    const images = [
        poza1,
        poza2,
        poza3,
        poza4
    ];

    const descriptions = [
        "La Barbershop-ul nostru, toată lumea este binevenită. Ne mândrim cu un mediu incluziv, unde oferim servicii de calitate indiferent de stilul tău sau de cine ești.",
        "Profesionalismul și tehnica avansată a frizerilor noștri sunt esențiale. La noi, fiecare tunsoare este un exemplu de precizie și stil modern.",
        "Tunsorile noastre nu doar îți oferă un aspect impecabil, ci și o stare de bine. Pleci de la noi mai încrezător și mai fericit.",
        "Oferim servicii de îngrijire a bărbii, personalizate pentru tine. Experimentează precizia și rafinamentul nostru în fiecare detaliu."
    ];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        // Fetch pentru top 3 clienți
        fetch('http://localhost:8081/top-active-clients')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Eroare la preluarea datelor pentru clienți.");
                }
                return response.json();
            })
            .then(data => setTopClients(data))
            .catch(err => setError(err.message));
    
        // Fetch pentru top 3 servicii
        fetch('http://localhost:8081/top-services')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Eroare la preluarea datelor pentru servicii.");
                }
                return response.json();
            })
            .then(data => setTopServices(data))
            .catch(err => setError(err.message));
    }, []);
    

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">Barbershop</div>
                <ul className="nav-links">
                    <li><Link to="/home">Acasa</Link></li>
                    <li><a href="/frizeri">Frizeri</a></li>
                    <li><a href="/appointments">Programari</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>

            <div className="home-content">
                <h1>Bine ai venit la Barbershop!</h1>
                <p>Experiență premium, frizeri dedicați și stiluri care inspiră.</p>
            </div>

            {/* Container principal pentru carduri și slideshow */}
            <div className="main-content">
                {/* Card stânga */}
                <div className="card">
                    <div className="card-inner">
                        <div className="card-front">
                            <p>PRETURI IMBATABILE SE POATE TUNDE ORICINE</p>
                        </div>
                        <div className="card-back">
                            <h3>Lista de prețuri:</h3>
                            <ul>
                                <li>Tuns clasic: 30 RON</li>
                                <li>Tuns modern: 50 RON</li>
                                <li>Aranjat Barba: 25 RON</li>
                                <li>Vopsit Par: 100 RON</li>
                                <li>Tratament Par: 75 RON</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Slideshow */}
                <div className="slideshow">
                    <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="slide-image" />
                    <p className="description">{descriptions[currentIndex]}</p>
                    <div className="nav-btn-container">
                        <button className="nav-btn" onClick={handlePrev}>⟵ Anterior</button>
                        <button className="nav-btn" onClick={handleNext}>Următor ⟶</button>
                    </div>
                </div>

                {/* Card dreapta */}
                <div className="card">
                    <div className="card-inner">
                        <div className="card-front">
                            <p>DOAR 3 MIN DE METROU POATE VENI ORICINE</p>
                        </div>
                        <div className="card-back">
                            <h3>Adresa noastră:</h3>
                            <p>Strada Unirii, Nr. 15</p>
                            <p>București, România</p>
                            <p>3 minute de mers de la stația de metrou Piața Unirii</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secțiunea tabele: Top Clienți și Top Servicii */}
            <div className="stats-section">
    {/* Top 3 Clienți */}
    <div className="stats-table">
        <h2>Top 3 Clienți Activi</h2>
        {error ? (
            <div className="error-message">{error}</div>
        ) : (
            <table>
                <thead>
                    <tr>
                        <th>Nume</th>
                        <th>Prenume</th>
                        <th>Total Programări</th>
                    </tr>
                </thead>
                <tbody>
                    {topClients.map((client, index) => (
                        <tr key={index}>
                            <td>{client.name}</td>
                            <td>{client.prenume}</td>
                            <td>{client.Total_Programari}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>

    {/* Top 3 Servicii */}
    <div className="stats-table">
        <h2>Top 3 Servicii</h2>
        {error ? (
            <div className="error-message">{error}</div>
        ) : (
            <table>
                <thead>
                    <tr>
                        <th>Serviciu</th>
                        <th>Categorie</th>
                        <th>Total Programări</th>
                    </tr>
                </thead>
                <tbody>
                    {topServices.map((service, index) => (
                        <tr key={index}>
                            <td>{service.Serviciu}</td>
                            <td>{service.Categorie}</td>
                            <td>{service.Total_Programari}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
</div>
        </div>
    );
}

export default Home;
