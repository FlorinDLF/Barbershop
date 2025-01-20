import React, { useState, useEffect } from 'react';
import './AdminPage.css';

function AdminPage() {
    const [selectedOption, setSelectedOption] = useState(null);
    
    const [popularServices, setPopularServices] = useState([]);

    const [barberView, setBarberView] = useState(null);

    const [newBarber, setNewBarber] = useState({
        name: '',
        prenume: '',
        email: '',
        password: ''
    });
    

    // State-uri pentru clienți
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientDetails, setClientDetails] = useState({ name: '', prenume: '' });

    // State-uri pentru frizeri
    const [barbers, setBarbers] = useState([]);
    const [selectedBarber, setSelectedBarber] = useState(null);
    const [barberDetails, setBarberDetails] = useState({ name: '', prenume: '' });

    const [feedbackMessage, setFeedbackMessage] = useState('');

    // Preluare clienți
    useEffect(() => {
        if (selectedOption === 'clients') {
            fetch('http://localhost:8081/get-clients')
                .then((res) => res.json())
                .then((data) => {
                    console.log("Date clienți primite de la server:", data); // Debugging
                    setClients(data);
                })
                .catch((err) => console.error('Eroare la preluarea clienților:', err));
        }
    }, [selectedOption]);
    
    // Preluare frizeri
    useEffect(() => {
        if (selectedOption === 'barbers') {
            fetch('http://localhost:8081/get-barbers')
                .then((res) => res.json())
                .then((data) => setBarbers(data))
                .catch((err) => console.error('Eroare la preluarea frizerilor:', err));
        }
    }, [selectedOption]);

    useEffect(() => {
        if (selectedOption === 'popular-services') {
            fetch('http://localhost:8081/popular-service-by-category')
                .then((res) => res.json())
                .then((data) => setPopularServices(data))
                .catch((err) => console.error('Eroare la preluarea serviciilor populare:', err));
        }
    }, [selectedOption]);    

    // Funcții pentru gestionarea clienților
    const handleClientChange = (event) => {
        console.log("Valoare brută selectată:", event.target.value);

        const clientIdRaw = event.target.value;
        console.log("Valoare brută selectată:", clientIdRaw);
        
        const clientId = parseInt(clientIdRaw, 10); // Convertim valoarea brută în număr
        console.log("ID selectat (convertit):", clientId);
    
        const client = clients.find((c) => c.ID_Client === clientId);
        console.log("Client găsit:", client);
    
        if (!client) {
            console.error("Clientul selectat nu a fost găsit. ID:", clientId);
            return;
        }
    
        setSelectedClient(client);
        setClientDetails({ name: client.name, prenume: client.prenume });
    };        
    
    const handleUpdateClient = async () => {
        if (!clientDetails.name || !clientDetails.prenume) {
            alert("Asigură-te că toate câmpurile sunt completate înainte de a actualiza.");
            return;
        }
    
        console.log("Date trimise pentru actualizare:", {
            id_client: selectedClient.ID_Client,
            name: clientDetails.name,
            prenume: clientDetails.prenume,
        });
    
        try {
            const response = await fetch('http://localhost:8081/update-user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_client: selectedClient.ID_Client,
                    name: clientDetails.name,
                    prenume: clientDetails.prenume,
                    requester_type: 'admin',
                }),
            });
    
            const result = await response.json();
            if (response.status === 200) {
                alert(result.message);
                // Actualizează lista clienților local
                setClients((prev) =>
                    prev.map((client) =>
                        client.ID_Client === selectedClient.ID_Client
                            ? { ...client, name: clientDetails.name, prenume: clientDetails.prenume }
                            : client
                    )
                );
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Eroare la actualizarea clientului:', error);
        }
    };
    
    const handleAddBarber = async () => {
        console.log("Date frizer nou:", newBarber); // Debugging pentru a vedea datele din `newBarber`
    
        if (!newBarber.name || !newBarber.prenume || !newBarber.email || !newBarber.password) {
            alert("Toate câmpurile trebuie completate!");
            return;
        }
        
        try {
            const response = await fetch('http://localhost:8081/add-frizer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBarber),
            });
    
            const result = await response.json();
            if (response.status === 200) {
                alert(result.message);
                setBarbers((prev) => [...prev, { Nume: newBarber.name, Prenume: newBarber.prenume }]);
                setNewBarber({ name: '', prenume: '', email: '', password: '' }); // Resetăm câmpurile
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Eroare la adăugarea frizerului:", error);
        }
    };    

    const handleDeleteClient = async () => {
        if (!selectedClient || !selectedClient.ID_Client) {
            alert("Selectează un client înainte de a încerca să ștergi.");
            console.log("Valoare selectedClient:", selectedClient); // Log pentru debugging
            return;
        }
    
        console.log("ID client trimis pentru ștergere:", selectedClient.ID_Client);
    
        try {
            const response = await fetch('http://localhost:8081/delete-user', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_client: selectedClient.ID_Client,
                    requester_type: 'admin',
                }),
            });
    
            const result = await response.json();
            console.log("Răspuns primit de la server:", result); // Log pentru debugging
    
            if (response.status === 200) {
                alert(result.message);
                setClients((prev) =>
                    prev.filter((client) => client.ID_Client !== selectedClient.ID_Client)
                );
                setSelectedClient(null);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Eroare la ștergerea clientului:', error);
        }
    };    

    // Funcții pentru gestionarea frizerilor
    const handleBarberChange = (event) => {
        const barberId = event.target.value;
        const barber = barbers.find((b) => b.Id_Frizer.toString() === barberId);
        setSelectedBarber(barber);
        setBarberDetails({ name: barber.Nume, prenume: barber.Prenume });
    };

    const handleUpdateBarber = async () => {
        if (!selectedBarber) return;

        try {
            const response = await fetch('http://localhost:8081/update-user', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_client: selectedBarber.Id_Client,
                    name: barberDetails.name,
                    prenume: barberDetails.prenume,
                    requester_type: 'admin',
                }),
            });

            const result = await response.json();
            if (response.status === 200) {
                setFeedbackMessage(result.message);
                setBarbers((prev) =>
                    prev.map((barber) =>
                        barber.Id_Frizer === selectedBarber.Id_Frizer
                            ? { ...barber, Nume: barberDetails.name, Prenume: barberDetails.prenume }
                            : barber
                    )
                );
            } else {
                setFeedbackMessage(result.message);
            }
        } catch (error) {
            console.error('Eroare la actualizarea frizerului:', error);
        }
    };

    const handleDeleteBarber = async () => {
        if (!selectedBarber) return;

        try {
            const response = await fetch('http://localhost:8081/delete-user', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_client: selectedBarber.Id_Client,
                    requester_type: 'admin',
                }),
            });

            const result = await response.json();
            if (response.status === 200) {
                setFeedbackMessage(result.message);
                setBarbers((prev) => prev.filter((barber) => barber.Id_Frizer !== selectedBarber.Id_Frizer));
                setSelectedBarber(null);
            } else {
                setFeedbackMessage(result.message);
            }
        } catch (error) {
            console.error('Eroare la ștergerea frizerului:', error);
        }
    };

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
            <div className="admin-content">
                <h1>Panou de administrare</h1>
                <div className="admin-options">
                    <button onClick={() => setSelectedOption('clients')}>Gestionare Clienți</button>
                    <button onClick={() => setSelectedOption('barbers')}>Gestionare Frizeri</button>
                    <button onClick={() => setSelectedOption('popular-services')}>Servicii Populare</button>
                </div>

                {selectedOption === 'clients' && (
                    <div className="clients-section">
                        <h2>Clienți</h2>
                        <select onChange={handleClientChange} defaultValue="">
                            <option value="" disabled>
                                Selectați un client
                            </option>
                            {clients && clients.length > 0 ? (
                                clients.map((client) => (
                                    <option key={client.ID_Client} value={client.ID_Client}>
                                        {client.name} {client.prenume}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Nicio opțiune disponibilă</option>
                            )}
                        </select>

                        {/* Afișăm detaliile și butoanele doar dacă există un client selectat */}
                        {selectedClient && (
                            <div className="client-details">
                                <h3>Detalii Client</h3>
                                <label>Nume:</label>
                                <input
                                    type="text"
                                    value={clientDetails.name}
                                    onChange={(e) =>
                                        setClientDetails((prev) => ({ ...prev, name: e.target.value }))
                                    }
                                />
                                <label>Prenume:</label>
                                <input
                                    type="text"
                                    value={clientDetails.prenume}
                                    onChange={(e) =>
                                        setClientDetails((prev) => ({ ...prev, prenume: e.target.value }))
                                    }
                                />
                                <p><strong>Email:</strong> {selectedClient.email}</p>

                                <div className="buttons">
                                    <button onClick={handleUpdateClient}>Actualizare</button>
                                    <button onClick={handleDeleteClient}>Ștergere</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

{selectedOption === 'popular-services' && (
    <div className="popular-services-section">
        <h2>Cel Mai Popular Serviciu Din Fiecare Categorie</h2>
        <ul>
            {popularServices.length > 0 ? (
                popularServices.map((service, index) => (
                    <li key={index}>
                        <strong>Categorie:</strong> {service.Nume_Categorie} <br />
                        <strong>Serviciu:</strong> {service.Nume_Serviciu} <br />
                        <strong>Rezervări:</strong> {service.Total_Programari}
                    </li>
                ))
            ) : (
                <p>Nu există date disponibile.</p>
            )}
        </ul>
    </div>
)}

{selectedOption === 'barbers' && (
    <div className="barbers-section">
        <h2>Frizeri</h2>
        <div className="barber-options">
            <button onClick={() => setBarberView('edit')}>Modificare Frizeri</button>
            <button onClick={() => setBarberView('add')}>Adăugare Frizer Nou</button>
        </div>

        {/* Secțiunea pentru modificare */}
        {barberView === 'edit' && (
            <>
                <h3>Selectați un frizer:</h3>
                <select onChange={handleBarberChange} defaultValue="">
                    <option value="" disabled>
                        Selectați un frizer
                    </option>
                    {barbers.map((barber) => (
                        <option key={barber.Id_Frizer} value={barber.Id_Frizer}>
                            {barber.Nume} {barber.Prenume}
                        </option>
                    ))}
                </select>

                {selectedBarber && (
                    <div className="barber-details">
                        <h3>Detalii Frizer</h3>
                        <label>Nume:</label>
                        <input
                            type="text"
                            value={barberDetails.name}
                            onChange={(e) => setBarberDetails({ ...barberDetails, name: e.target.value })}
                        />
                        <label>Prenume:</label>
                        <input
                            type="text"
                            value={barberDetails.prenume}
                            onChange={(e) => setBarberDetails({ ...barberDetails, prenume: e.target.value })}
                        />
                        <div className="buttons">
                            <button onClick={handleUpdateBarber}>Actualizare</button>
                            <button onClick={handleDeleteBarber}>Ștergere</button>
                        </div>
                    </div>
                )}
            </>
        )}

        {/* Secțiunea pentru adăugare */}
        {barberView === 'add' && (
            <div className="add-barber">
                <h3>Adăugare Frizer Nou</h3>
                <label>Nume:</label>
                <input
                    type="text"
                    value={newBarber.name}
                    onChange={(e) => setNewBarber({ ...newBarber, name: e.target.value })}
                />
                <label>Prenume:</label>
                <input
                    type="text"
                    value={newBarber.prenume}
                    onChange={(e) => setNewBarber({ ...newBarber, prenume: e.target.value })}
                />
                <label>Email:</label>
                <input
                    type="email"
                    value={newBarber.email}
                    onChange={(e) => setNewBarber({ ...newBarber, email: e.target.value })}
                />
                <label>Parolă:</label>
                <input
                    type="password"
                    value={newBarber.password}
                    onChange={(e) => setNewBarber({ ...newBarber, password: e.target.value })}
                />
                <button onClick={handleAddBarber}>Adăugare</button>
            </div>
        )}
    </div>
)}

                {feedbackMessage && <p>{feedbackMessage}</p>}
            </div>
        </div>
    );
}

export default AdminPage;
