const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // React frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexiunea la baza de date
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

// Endpoint pentru adăugare utilizatori (signup)
app.post('/signup', async (req, res) => {
    const { name, prenume, email, password, tip_cont } = req.body;

    // Verifică dacă toate câmpurile necesare sunt prezente
    if (!name || !prenume || !email || !password) {
        return res.status(400).json({ message: "Toate câmpurile sunt obligatorii." });
    }

    try {
        // Verificăm dacă email-ul există deja
        const checkEmailQuery = "SELECT * FROM Clienti WHERE email = ?";
        db.query(checkEmailQuery, [email], async (err, result) => {
            if (err) {
                console.error("Eroare la verificarea email-ului:", err);
                return res.status(500).json({ message: "Eroare la baza de date." });
            }

            if (result.length > 0) {
                // Email-ul există deja
                return res.status(400).json({ message: "Email-ul este deja folosit." });
            }

            // Dacă email-ul nu există, inserăm utilizatorul
            const hashedPassword = await bcrypt.hash(password, 10);
            const sql = "INSERT INTO Clienti (`name`, `prenume`, `email`, `password`, `tip_cont`) VALUES (?)";
            const values = [name, prenume, email, hashedPassword, tip_cont || 'client'];

            db.query(sql, [values], (err, data) => {
                if (err) {
                    console.error("Eroare SQL:", err);
                    return res.status(500).json({ message: "Eroare la baza de date." });
                }
                return res.status(200).json({ message: "Utilizator adăugat cu succes!" });
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Eroare la procesarea parolei." });
    }
});

// Endpoint pentru autentificare (login)
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM Clienti WHERE email = ?";
    const { email, password } = req.body;

    db.query(sql, [email], async (err, data) => {
        if (err) {
            console.error("Eroare la baza de date:", err);
            return res.status(500).json({ message: "Eroare la baza de date." });
        }

        if (data.length > 0) {
            console.log("Rezultat din baza de date:", data);
            const isPasswordCorrect = await bcrypt.compare(password, data[0].password);
            if (isPasswordCorrect) {
                console.log("Autentificare reușită pentru client:", data[0]);
                return res.status(200).json({
                    success: true,
                    message: "Autentificare reușită!",
                    clientId: data[0].Id_Client, // Include clientId
                    tip_cont: data[0].tip_cont, // Include tip_cont
                });
            } else {
                console.log("Parolă incorectă pentru utilizator:", email);
                return res.status(401).json({ success: false, message: "Parolă incorectă." });
            }
        } else {
            console.log("Utilizatorul nu există:", email);
            return res.status(404).json({ success: false, message: "Utilizatorul nu există." });
        }
    });
});

// Endpoint pentru adăugare frizer
app.post('/add-frizer', async (req, res) => {
    const sqlClient = "INSERT INTO Clienti (`name`, `prenume`, `email`, `password`, `tip_cont`) VALUES (?)";
    const sqlFrizer = "INSERT INTO Frizeri (`Nume`, `Prenume`, `Id_Client`) VALUES (?, ?, ?)";

    const { name, prenume, email, password } = req.body;

    console.log("Date primite pentru adăugarea frizerului:", req.body); // Log pentru debugging

    if (!name || !prenume || !email || !password) {
        return res.status(400).json({ message: "Toate câmpurile trebuie completate!" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const valuesClient = [name, prenume, email, hashedPassword, 'admin'];
        db.query(sqlClient, [valuesClient], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Eroare la baza de date (adăugare utilizator)." });
            }

            const idClient = result.insertId; 
            db.query(sqlFrizer, [name, prenume, idClient], (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Eroare la baza de date (adăugare frizer)." });
                }
                return res.status(200).json({ message: "Frizer adăugat cu succes!" });
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Eroare la procesarea parolei." });
    }
});

app.put('/update-user', async (req, res) => {
    const { id_client, name, prenume, requester_type } = req.body;

    console.log("Date primite pentru actualizare:", req.body); // Log pentru debugging

    if (requester_type !== 'admin') {
        return res.status(403).json({ message: "Doar adminii pot actualiza utilizatorii." });
    }

    if (!id_client || (!name && !prenume)) {
        console.error("Câmpuri lipsă:", { id_client, name, prenume }); // Log pentru debugging
        return res.status(400).json({ message: "Câmpuri lipsă pentru actualizare." });
    }

    const updatesClienti = [];
    if (name) updatesClienti.push(`name = '${name}'`);
    if (prenume) updatesClienti.push(`prenume = '${prenume}'`);

    const sqlClienti = `UPDATE Clienti SET ${updatesClienti.join(', ')} WHERE ID_Client = ?`;

    // Actualizăm tabela Clienti
    db.query(sqlClienti, [id_client], (err, resultClienti) => {
        if (err) {
            console.error("Eroare la actualizarea tabelei Clienti:", err);
            return res.status(500).json({ message: "Eroare la baza de date." });
        }

        if (resultClienti.affectedRows > 0) {
            // Verificăm dacă utilizatorul este un frizer
            const checkFrizerQuery = "SELECT * FROM Frizeri WHERE Id_Client = ?";
            db.query(checkFrizerQuery, [id_client], (err, resultFrizerCheck) => {
                if (err) {
                    console.error("Eroare la verificarea frizerului:", err);
                    return res.status(500).json({ message: "Eroare la baza de date." });
                }

                if (resultFrizerCheck.length > 0) {
                    // Dacă este un frizer, actualizăm și tabela Frizeri
                    const updatesFrizeri = [];
                    if (name) updatesFrizeri.push(`Nume = '${name}'`);
                    if (prenume) updatesFrizeri.push(`Prenume = '${prenume}'`);

                    const sqlFrizeri = `UPDATE Frizeri SET ${updatesFrizeri.join(', ')} WHERE Id_Client = ?`;

                    db.query(sqlFrizeri, [id_client], (err, resultFrizeri) => {
                        if (err) {
                            console.error("Eroare la actualizarea tabelei Frizeri:", err);
                            return res.status(500).json({ message: "Eroare la baza de date (Frizeri)." });
                        }

                        return res.status(200).json({ message: "Frizer actualizat cu succes!" });
                    });
                } else {
                    // Dacă nu este un frizer, returnăm succes pentru Clienti
                    return res.status(200).json({ message: "Client actualizat cu succes!" });
                }
            });
        } else {
            return res.status(404).json({ message: "Utilizatorul nu a fost găsit sau datele sunt identice." });
        }
    });
});

app.delete('/delete-user', (req, res) => {
    const { id_client, requester_type } = req.body;

    console.log("Date primite pentru ștergere:", { id_client, requester_type }); // Log pentru debugging

    if (requester_type !== 'admin') {
        return res.status(403).json({ message: "Doar adminii pot șterge utilizatori." });
    }

    // Șterge mai întâi din tabela Frizeri, dacă există o referință
    const sqlDeleteBarber = "DELETE FROM Frizeri WHERE Id_Client = ?";
    db.query(sqlDeleteBarber, [id_client], (err, resultBarber) => {
        if (err) {
            console.error("Eroare la ștergerea frizerului:", err);
            return res.status(500).json({ message: "Eroare la baza de date (ștergere frizer)." });
        }

        console.log(`Frizer șters (dacă a existat):`, resultBarber);

        // După ștergerea din Frizeri, șterge din Clienti
        const sqlDeleteClient = "DELETE FROM Clienti WHERE Id_Client = ?";
        db.query(sqlDeleteClient, [id_client], (err, resultClient) => {
            if (err) {
                console.error("Eroare la ștergerea clientului:", err);
                return res.status(500).json({ message: "Eroare la baza de date (ștergere client)." });
            }

            if (resultClient.affectedRows > 0) {
                console.log("Client șters:", resultClient);
                return res.status(200).json({ message: "Utilizator șters cu succes!" });
            } else {
                return res.status(404).json({ message: "Utilizatorul nu a fost găsit." });
            }
        });
    });
});

app.get('/get-appointments/:id_client', (req, res) => {
    const { id_client } = req.params;

    const sql = `
        SELECT 
            Programari.Id_Programare, 
            Programari.Data, 
            Programari.Ora, 
            CONCAT(Frizeri.Nume, ' ', Frizeri.Prenume) AS Nume_Frizer,
            GROUP_CONCAT(Servicii.Nume_Serviciu SEPARATOR ', ') AS Servicii
        FROM Programari
        INNER JOIN Frizeri ON Programari.Id_Frizer = Frizeri.Id_Frizer
        INNER JOIN programari_servicii ON Programari.Id_Programare = programari_servicii.Id_Programare
        INNER JOIN Servicii ON programari_servicii.Id_Serviciu = Servicii.Id_Serviciu
        WHERE Programari.Id_Client = ?
        GROUP BY Programari.Id_Programare;
    `;

    db.query(sql, [id_client], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Eroare la baza de date." });
        }
        return res.status(200).json(result);
    });
});

app.post('/create-appointment', (req, res) => {
    const { id_client, id_frizer, data, ora, servicii } = req.body;
  
    console.log("Received appointment data:", req.body);
  
    if (!id_client || !id_frizer || !data || !ora || !Array.isArray(servicii) || servicii.length === 0) {
        console.error("Validation failed:", { id_client, id_frizer, data, ora, servicii });
        return res.status(400).json({ message: "Toate câmpurile sunt obligatorii și serviciile trebuie să fie o listă validă!" });
      }      
  
    // Verifică dacă clientul există
    const sqlCheckClient = "SELECT * FROM Clienti WHERE ID_Client = ?";
    db.query(sqlCheckClient, [id_client], (err, result) => {
      if (err || result.length === 0) {
        console.error("Client invalid sau inexistent.");
        return res.status(400).json({ message: "Client invalid!" });
      }
  
      const sqlInsertAppointment = `
          INSERT INTO Programari (Id_Client, Id_Frizer, Data, Ora) VALUES (?, ?, ?, ?)
      `;
      db.query(sqlInsertAppointment, [id_client, id_frizer, data, ora], (err, result) => {
        if (err) {
          console.error("Eroare la inserarea programării:", err);
          return res.status(500).json({ message: "Eroare la baza de date." });
        }
  
        const idProgramare = result.insertId;
        console.log("Appointment created with ID:", idProgramare);
  
        const sqlInsertServices = `
            INSERT INTO programari_servicii (Id_Programare, Id_Serviciu) VALUES ?
        `;
        const serviceValues = servicii.map((idServiciu) => [idProgramare, idServiciu]);
  
        db.query(sqlInsertServices, [serviceValues], (err) => {
          if (err) {
            console.error("Eroare la inserarea serviciilor:", err);
            return res.status(500).json({ message: "Eroare la baza de date." });
          }
  
          console.log("Services added to appointment:", serviceValues);
          return res.status(200).json({ message: "Programare creată cu succes!" });
        });
      });
    });
  });   

  app.get('/get-barbers', (req, res) => {
    const sql = "SELECT Id_Frizer, Nume, Prenume, Id_Client FROM Frizeri;";
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Eroare la interogarea frizerilor:", err);
            return res.status(500).json({ message: "Eroare la baza de date." });
        }

        // Lista de specializări
        const specializari = ["HairStylist", "Barber", "TreatmentBased", "Coafeur"];

        // Adaugă o specializare aleatorie pentru fiecare frizer
        const frizeriCuSpecializari = result.map(frizer => {
            const specializareAleatorie = specializari[Math.floor(Math.random() * specializari.length)];
            return {
                ...frizer,
                Specializare: specializareAleatorie
            };
        });

        console.log("Frizeri cu specializări generate:", frizeriCuSpecializari); // Debugging
        return res.status(200).json(frizeriCuSpecializari);
    });
});

app.get('/barber-stats', (req, res) => {
    const { requester_type } = req.query; // Presupunem că tipul de cont este trimis ca parametru de query

    if (requester_type !== 'admin') {
        return res.status(403).json({ message: "Acces interzis. Doar adminii pot vedea statistici despre frizeri." });
    }

    const sql = `
        SELECT Frizeri.Nume, Frizeri.Prenume, COUNT(Programari.Id_Programare) AS Total_Programari
        FROM Frizeri
        LEFT JOIN Programari ON Frizeri.Id_Frizer = Programari.Id_Frizer
        GROUP BY Frizeri.Id_Frizer;
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Eroare la baza de date." });
        }
        return res.status(200).json(result);
    });
});

app.get('/get-services', (req, res) => {
    const sql = `
        SELECT Servicii.Id_Serviciu, Servicii.Nume_Serviciu, Categorii.Nume_Categorie
        FROM Servicii
        INNER JOIN Categorii ON Servicii.Id_Categorie = Categorii.Id_Categorie
    `;
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Eroare la obținerea serviciilor:", err);
            return res.status(500).json({ message: "Eroare la baza de date." });
        }
        return res.status(200).json(result);
    });
});


app.get('/frequent-clients', (req, res) => {
    const sql = `
        SELECT 
            Clienti.name, 
            Clienti.prenume, 
            COUNT(Programari.Id_Programare) AS Total_Programari
        FROM Clienti
        LEFT JOIN Programari ON Clienti.ID_Client = Programari.Id_Client
        GROUP BY Clienti.ID_Client;
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Eroare la baza de date." });
        }
        return res.status(200).json(result);
    });
});


app.get('/get-clients', (req, res) => {
    const sql = "SELECT ID_Client, name, prenume, email FROM Clienti WHERE tip_cont = 'client';";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Eroare la interogarea clienților:", err);
            return res.status(500).json({ message: "Eroare la baza de date." });
        }
        console.log("Clienți returnați:", result); // Log în backend
        return res.status(200).json(result);
    });
});

app.get('/get-categories', (req, res) => {
    const sql = "SELECT * FROM Categorii;";

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Eroare la interogarea categoriilor:", err);
            return res.status(500).json({ message: "Eroare la baza de date." });
        }
        console.log("Categorii returnate:", result); // Log pentru debugging
        return res.status(200).json(result);
    });
});

// Pornirea serverului
app.listen(8081, () => {
    console.log("Serverul rulează pe portul 8081");
});

app.get('/top-active-clients', (req, res) => {
    const sql = `
        SELECT C.name, 
               C.prenume, 
               (SELECT COUNT(P.Id_Programare) 
                FROM Programari P 
                WHERE P.Id_Client = C.ID_Client) AS Total_Programari
        FROM Clienti C
        ORDER BY Total_Programari DESC
        LIMIT 3;
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Eroare la baza de date:", err);
            return res.status(500).json({ message: "Eroare la baza de date." });
        }
        return res.status(200).json(result);
    });
});

app.get('/service-stats', (req, res) => {
    const sql = `
        SELECT 
            Servicii.Nume_Serviciu, 
            COUNT(programari_servicii.Id_Serviciu) AS Total_Programari
        FROM 
            Servicii
        LEFT JOIN 
            programari_servicii ON Servicii.Id_Serviciu = programari_servicii.Id_Serviciu
        GROUP BY 
            Servicii.Nume_Serviciu
        ORDER BY 
            Total_Programari DESC
        LIMIT 5;
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Eroare la interogarea serviciilor:", err);
            return res.status(500).json({ message: "Eroare la baza de date." });
        }
        res.status(200).json(result);
    });
});

app.get('/top-services', (req, res) => {
    const sql = `
        SELECT S.Nume_Serviciu AS Serviciu,
               C.Nume_Categorie AS Categorie,
               (SELECT COUNT(PS.Id_Serviciu) 
                FROM programari_servicii PS 
                WHERE PS.Id_Serviciu = S.Id_Serviciu) AS Total_Programari
        FROM Servicii S
        JOIN Categorii C ON S.Id_Categorie = C.Id_Categorie
        ORDER BY Total_Programari DESC
        LIMIT 3;
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Eroare la preluarea top 3 servicii:", err);
            return res.status(500).json({ message: "Eroare la baza de date." });
        }
        res.status(200).json(result);
    });
});


app.get('/top-barbers', (req, res) => {
    const sql = `
        SELECT F.Nume, 
               F.Prenume, 
               (SELECT COUNT(P.Id_Programare) 
                FROM Programari P 
                WHERE P.Id_Frizer = F.Id_Frizer) AS Total_Programari
        FROM Frizeri F
        ORDER BY Total_Programari DESC
        LIMIT 3;
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Eroare la preluarea datelor pentru top frizeri:', err);
            return res.status(500).json({ message: 'Eroare la baza de date.' });
        }
        res.status(200).json(result);
    });
});


app.get('/top-days', (req, res) => {
    const sql = `
        SELECT Data,
               (SELECT COUNT(P.Id_Programare) 
                FROM Programari P 
                WHERE P.Data = T.Data) AS Total_Programari
        FROM Programari T
        GROUP BY Data
        ORDER BY Total_Programari DESC
        LIMIT 3;
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Eroare la preluarea top 3 zile:', err);
            return res.status(500).json({ message: 'Eroare la baza de date.' });
        }
        res.status(200).json(result);
    });
});

app.get('/popular-service-by-category', (req, res) => {
    const query = `
        SELECT 
            s.Id_Serviciu, 
            s.Nume_Serviciu, 
            c.Nume_Categorie,
            (
                SELECT COUNT(ps.Id_Serviciu)
                FROM programari_servicii ps
                WHERE ps.Id_Serviciu = s.Id_Serviciu
            ) AS Total_Programari
        FROM Servicii s
        JOIN Categorii c ON s.Id_Categorie = c.Id_Categorie
        WHERE s.Id_Serviciu = (
            SELECT ps.Id_Serviciu
            FROM programari_servicii ps
            JOIN Servicii ss ON ps.Id_Serviciu = ss.Id_Serviciu
            WHERE ss.Id_Categorie = s.Id_Categorie
            GROUP BY ps.Id_Serviciu
            ORDER BY COUNT(ps.Id_Serviciu) DESC
            LIMIT 1
        );
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error('Eroare la preluarea serviciului popular pe categorie:', err);
            return res.status(500).json({ message: 'Eroare la baza de date.' });
        }
        res.status(200).json(result);
    });
});