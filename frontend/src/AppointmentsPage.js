import React, { useState, useEffect } from "react";
import "./AppointmentsPage.css";

const AppointmentsPage = () => {
  const [barbers, setBarbers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [topDays, setTopDays] = useState([]); // Adăugat pentru top 3 zile
  const [error, setError] = useState(null); // Adăugat pentru gestionarea erorilor

  useEffect(() => {
    const storedBarberId = localStorage.getItem("selectedBarberId");
    if (storedBarberId) {
      setSelectedBarber(storedBarberId);
      localStorage.removeItem("selectedBarberId");
    }
  }, []);

  useEffect(() => {
    const clientId = localStorage.getItem("clientId");
    if (clientId) {
      fetch(`http://localhost:8081/get-appointments/${clientId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Programări primite:", data);
          setAppointments(data);
        })
        .catch((error) =>
          console.error("Eroare la preluarea programărilor:", error)
        );
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:8081/get-barbers")
      .then((response) => response.json())
      .then((data) => setBarbers(data))
      .catch((error) => console.error("Eroare la preluarea frizerilor:", error));

    fetch("http://localhost:8081/get-categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) =>
        console.error("Eroare la preluarea categoriilor:", error)
      );

    fetch("http://localhost:8081/get-services")
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
        setAvailableServices(data);
      })
      .catch((error) =>
        console.error("Eroare la preluarea serviciilor:", error)
      );
      fetch("http://localhost:8081/top-days")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Eroare la preluarea topului pentru zile.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Date top zile:", data); // Adaugă acest log
        setTopDays(data);
      })
      .catch((error) => {
        console.error(error);
        setError("Nu s-au putut încărca datele pentru topul zilelor.");
      });
  }, []);

  const toggleServiceSelection = (serviceId) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices((prev) => prev.filter((id) => id !== serviceId));
    } else {
      setSelectedServices((prev) => [...prev, serviceId]);
    }
  };

  const handleServiceSelect = (serviceId) => {
    const selectedService = availableServices.find(
      (service) => service.Id_Serviciu === parseInt(serviceId)
    );
    setSelectedServices((prev) => [...prev, selectedService]);
    setAvailableServices((prev) =>
      prev.filter((service) => service.Id_Serviciu !== parseInt(serviceId))
    );
  };

  const handleRemoveService = (serviceId) => {
    const removedService = selectedServices.find(
      (service) => service.Id_Serviciu === serviceId
    );
    setSelectedServices((prev) =>
      prev.filter((service) => service.Id_Serviciu !== serviceId)
    );
    setAvailableServices((prev) => [...prev, removedService]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const clientId = localStorage.getItem("clientId");
    console.log("ID client obținut din localStorage:", clientId);

    if (!clientId || !selectedBarber || !selectedDate || !selectedTime || selectedServices.length === 0) {
      alert("Toate câmpurile trebuie completate!");
      return;
    }

    const appointmentData = {
      id_client: clientId,
      id_frizer: selectedBarber,
      data: selectedDate,
      ora: selectedTime,
      servicii: selectedServices.map((service) => parseInt(service.Id_Serviciu)),
    };

    console.log("Data sent to server:", appointmentData);

    fetch("http://localhost:8081/create-appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointmentData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Eroare la crearea programării.");
        }
        return response.json();
      })
      .then((data) => {
        alert("Programare creată cu succes!");
        setSelectedBarber("");
        setSelectedDate("");
        setSelectedTime("");
        setSelectedServices([]);
      })
      .catch((error) => {
        console.error("Eroare la crearea programării:", error);
        alert("Eroare la crearea programării.");
      });
  };

  return (
    <div className="appointments-page">
      <nav className="navbar">
        <div className="logo">Barbershop</div>
        <div className="links">
          <a href="/home">Acasă</a>
          <a href="/frizeri">Frizeri</a>
          <a href="/appointments">Programări</a>
          <a href="/contact">Contact</a>
        </div>
      </nav>
      <div className="appointments-container">
        <h1 className="section-title">Programările Tale</h1>
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Ora</th>
              <th>Frizer</th>
              <th>Servicii</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment.Id_Programare}>
                  <td>{appointment.Data}</td>
                  <td>{appointment.Ora}</td>
                  <td>{appointment.Nume_Frizer}</td>
                  <td>{appointment.Servicii}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Nu ai nicio programare, dar îți poți face!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Formular pentru creare programări */}
      <div className="appointments-form-container">
        <h2 className="section-subtitle">Adaugă o Programare Nouă</h2>
        <form className="appointment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="barber">Frizer:</label>
            <select
              id="barber"
              value={selectedBarber}
              onChange={(e) => setSelectedBarber(e.target.value)}
            >
              <option value="" disabled>
                Selectați un frizer
              </option>
              {barbers.map((barber) => (
                <option key={barber.Id_Frizer} value={barber.Id_Frizer}>
                  {barber.Nume} {barber.Prenume}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Data:</label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Ora:</label>
            <input
              type="time"
              id="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="services">Servicii:</label>
            <select
              id="services"
              value=""
              onChange={(e) => handleServiceSelect(e.target.value)}
            >
              <option value="" disabled>
                Selectați un serviciu
              </option>
              {availableServices.map((service) => (
                <option key={service.Id_Serviciu} value={service.Id_Serviciu}>
                  {service.Nume_Serviciu} ({service.Nume_Categorie})
                </option>
              ))}
            </select>
            <ul className="selected-services-list">
              {selectedServices.map((service) => (
                <li key={service.Id_Serviciu}>
                  {service.Nume_Serviciu}{" "}
                  <button
                    type="button"
                    onClick={() => handleRemoveService(service.Id_Serviciu)}
                  >
                    Eliminați
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button type="submit" className="submit-button">
            Creează Programare
          </button>
        </form>
      </div>
    {/* Tabel cu Top 3 Zile */}
    <div className="top-days-container">
        <h2 className="section-subtitle">Top 3 Zile cu Cele Mai Multe Programări</h2>
        {error ? (
          <p>{error}</p>
        ) : (
          <table className="top-days-table">
            <thead>
              <tr>
                <th>Zi</th>
                <th>Total Programări</th>
              </tr>
            </thead>
            <tbody>
  {topDays.map((day, index) => {
    const dateObj = new Date(day.Data); // Creează un obiect Date
    const formattedDate = dateObj.toLocaleDateString("ro-RO", {
      weekday: "long", // Afișează ziua săptămânii
      day: "numeric",
      month: "long",
      year: "numeric",
    }); // Format: "Duminică, 1 Decembrie 2024"

    return (
      <tr key={index}>
        <td>{formattedDate}</td>
        <td>{day.Total_Programari}</td>
      </tr>
    );
  })}
</tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;
