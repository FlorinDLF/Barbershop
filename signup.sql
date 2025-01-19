-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gazdă: 127.0.0.1
-- Timp de generare: ian. 19, 2025 la 03:53 PM
-- Versiune server: 10.4.28-MariaDB
-- Versiune PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Bază de date: `signup`
--

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `categorii`
--

CREATE TABLE `categorii` (
  `Id_Categorie` int(11) NOT NULL,
  `Nume_Categorie` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `categorii`
--

INSERT INTO `categorii` (`Id_Categorie`, `Nume_Categorie`) VALUES
(1, 'Tuns'),
(2, 'Barbă'),
(3, 'Coafat'),
(4, 'Vopsit'),
(5, 'Tratamente');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `clienti`
--

CREATE TABLE `clienti` (
  `Id_Client` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `prenume` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tip_cont` enum('admin','client') DEFAULT 'client'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `clienti`
--

INSERT INTO `clienti` (`Id_Client`, `name`, `prenume`, `email`, `password`, `tip_cont`) VALUES
(1, 'NumeNou', 'PrenumeNou', 'popescu.ion@newmail.com', '$2b$10$W/jubCLpFcNYwvH92kSHvOENU9zEwtnXZBJNhO3FeV9ca/dWbPsiC', 'admin'),
(3, 'Popescu', 'Ion', 'ion.popescu@example.com', '$2b$10$YQfc5pVlSig6n6TdoUh9FuUvztSpzp42FVXv5m9KRUlSb9BguLOaC', 'client'),
(4, 'Ionescu', 'Maria', 'maria.ionescu@example.com', '$2b$10$n5b643KDCpzcalXgN590au25N4LedXpVvqOrIt/04WQX8Zd.ypdTC', 'client'),
(5, 'Georgescu1', 'Andrei', 'andrei.georgescu@example.com', '$2b$10$g.I2F7rsittp2wKyKHR2nuANapWct/ezq8FyYotHkHUZPRPTtpbAG', 'client'),
(6, 'Dumitrul123', 'Ioana', 'ioana.dumitru@example.com', '$2b$10$yVuSMo7wxAylI021PCsmPObuQqw6PTNyqEof9QTZ0et9GJNswDde.', 'client'),
(9, 'Popescu', 'Ion', 'popescu.ion@example.com', '$2b$10$qLUDnuGe4t1k9Vp/YaSKBOmqXusc41gwKmXuVxQ4mVa/kMrKpggda', 'client'),
(11, 'Admin', 'User', 'admin@example.com', '$2b$10$u/u5v7mnYhP3KGeBidKvYOMpB9OZqoJFU1FzYzlkMcBybktIsl.Hu', 'admin'),
(23, 'Florinel', 'Smecherel', 'admin1@gmail.com', '$2b$10$RT3E2gv/pTUkA0b1FIzg0Oxdf8ZNiMyHMAkSzECJCPTC.EH.DtNFK', 'admin'),
(33, 'Popescu', 'Ion', 'popescul.ion@example.com', '$2b$10$hashedPassword1', 'client'),
(36, 'Constantin', 'Alexandru', 'constantin.alexandrul@example.com', '$2b$10$hashedPassword4', 'client'),
(38, 'Test12345', 'Test22', 'admin12@gmail.com', '$2b$10$d8BQcuFKkNDZSCelNrZ96esXxclPqc/kh4AUEnt3ALfe63Ec3ZddK', 'admin'),
(40, 'Dori', 'Pori', 'pori1@gmail.com', '$2b$10$TVbok0wftD7sOxSUb7vn7uZqBmAvfW9V1pZJqIAa0nUMrzti8vXeO', 'client'),
(41, 'Jhon', 'Marston', 'jhon1@gmail.com', '$2b$10$QB2nlwfn6NuY9u9TVVpGueQF3IAiA1JR8XXb18wQMeeh/VGjf7gIK', 'admin'),
(42, 'Gherghisan', 'Andyzzzzzaur', 'andi1@gmail.com', '$2b$10$Z/zmgSaF/5MbxJSy5WNp1.yG9qp7xu6S2nIoHbYhmfUBHOkmgMLEy', 'admin'),
(44, 'Ghergisanescu', 'Andreiescu', 'andi12@gmail.com', '$2b$10$Fdd9ny7iTfC/YcOik8WBlOIz3GgR0V0vlJLeLF5tfqHGhbJjCG3ge', 'admin'),
(45, 'Mihai', 'Leonard', 'pleanta1@gmail.com', '$2b$10$tfd0z7I1bLEDT.5lITww5u08q3cphSh6Qmj6yIa3s7D/FTJjrvH.S', 'admin'),
(46, 'Florinache', 'Davidosel', 'Florinache12@gmail.com', '$2b$10$wpYVfXoXyv7i7GW0ocGiheA7/iLY8NuM8vxYnAI6uTDv9NO07Sl9W', 'client'),
(48, 'Florinel', 'Davidos', 'test1234@gmail.com', '$2b$10$jqJBoJxWyWHhnKfykRMZp.y7QTbzFaFrUXrdGWb0FM.oIX4/aD436', 'client'),
(49, 'Tonia', 'Voicu', 'tonia@gmail.com', '$2b$10$i.MJDY875gV6GY9r25CJYumbCQ2QNTlR7abPn4CCGmeAFJ648uRNS', 'admin'),
(50, 'Bulangiu', 'CatCasa', 'nicdan@gmail.com', '$2b$10$Llz1wDe3Ie/OqXwzaXIW5u1fDD3Yc2pqEXuiYCUeNqoYg/hc4G606', 'client');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `frizeri`
--

CREATE TABLE `frizeri` (
  `Id_Frizer` int(11) NOT NULL,
  `Nume` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Prenume` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Id_Client` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `frizeri`
--

INSERT INTO `frizeri` (`Id_Frizer`, `Nume`, `Prenume`, `Id_Client`) VALUES
(14, 'Popescu', 'Ion', 33),
(17, 'Constantin', 'Alexandru', 36),
(19, 'Test12345', 'Test22', 38),
(21, 'Jhon', 'Marston', 41),
(23, 'Ghergisanescu', 'Andreiescu', 44),
(24, 'Mihai', 'Leonard', 45),
(26, 'Tonia', 'Voicu', 49);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `programari`
--

CREATE TABLE `programari` (
  `Id_Programare` int(11) NOT NULL,
  `Id_Client` int(11) NOT NULL,
  `Id_Frizer` int(11) NOT NULL,
  `Data` date NOT NULL,
  `Ora` time(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `programari`
--

INSERT INTO `programari` (`Id_Programare`, `Id_Client`, `Id_Frizer`, `Data`, `Ora`) VALUES
(7, 40, 19, '2026-12-04', '04:31:00.000000'),
(8, 40, 17, '2024-12-02', '00:43:00.000000'),
(9, 42, 19, '2027-07-12', '00:43:00.000000'),
(10, 40, 19, '2025-12-31', '00:21:00.000000'),
(12, 40, 17, '1312-03-21', '00:31:00.000000'),
(13, 40, 24, '4123-12-05', '00:43:00.000000'),
(14, 40, 19, '1232-12-31', '00:32:00.000000'),
(15, 40, 19, '1234-12-31', '04:31:00.000000'),
(16, 40, 19, '3123-12-04', '00:43:00.000000'),
(17, 46, 14, '2026-12-04', '00:12:00.000000'),
(18, 40, 24, '1232-12-31', '00:32:00.000000'),
(19, 48, 17, '1232-12-31', '00:32:00.000000'),
(20, 48, 21, '3432-06-05', '00:32:00.000000'),
(21, 50, 24, '2025-01-18', '12:30:00.000000');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `programari_servicii`
--

CREATE TABLE `programari_servicii` (
  `Id_ProgramareServiciu` int(11) NOT NULL,
  `Id_Programare` int(11) NOT NULL,
  `Id_Serviciu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `programari_servicii`
--

INSERT INTO `programari_servicii` (`Id_ProgramareServiciu`, `Id_Programare`, `Id_Serviciu`) VALUES
(19, 7, 1),
(20, 7, 4),
(21, 8, 3),
(22, 8, 5),
(23, 9, 4),
(24, 9, 2),
(25, 9, 5),
(26, 10, 1),
(28, 12, 2),
(29, 12, 1),
(30, 12, 4),
(31, 13, 1),
(32, 13, 4),
(33, 14, 5),
(34, 14, 3),
(35, 15, 4),
(36, 15, 2),
(37, 16, 5),
(38, 17, 1),
(39, 17, 4),
(40, 18, 5),
(41, 18, 4),
(42, 19, 1),
(43, 19, 3),
(44, 20, 1),
(45, 20, 4),
(46, 20, 3),
(47, 21, 5);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `servicii`
--

CREATE TABLE `servicii` (
  `Id_Serviciu` int(11) NOT NULL,
  `Nume_Serviciu` varchar(50) NOT NULL,
  `Id_Categorie` int(11) NOT NULL,
  `Pret` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `servicii`
--

INSERT INTO `servicii` (`Id_Serviciu`, `Nume_Serviciu`, `Id_Categorie`, `Pret`) VALUES
(1, 'Tuns clasic', 1, 30.00),
(2, 'Tuns modern', 1, 50.00),
(3, 'Aranjat barbă', 2, 25.00),
(4, 'Vopsit păr', 4, 100.00),
(5, 'Tratament păr', 5, 75.00);

--
-- Indexuri pentru tabele eliminate
--

--
-- Indexuri pentru tabele `categorii`
--
ALTER TABLE `categorii`
  ADD PRIMARY KEY (`Id_Categorie`);

--
-- Indexuri pentru tabele `clienti`
--
ALTER TABLE `clienti`
  ADD PRIMARY KEY (`Id_Client`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexuri pentru tabele `frizeri`
--
ALTER TABLE `frizeri`
  ADD PRIMARY KEY (`Id_Frizer`),
  ADD KEY `Id_Client` (`Id_Client`);

--
-- Indexuri pentru tabele `programari`
--
ALTER TABLE `programari`
  ADD PRIMARY KEY (`Id_Programare`),
  ADD KEY `Id_Client` (`Id_Client`),
  ADD KEY `Id_Frizer` (`Id_Frizer`);

--
-- Indexuri pentru tabele `programari_servicii`
--
ALTER TABLE `programari_servicii`
  ADD PRIMARY KEY (`Id_ProgramareServiciu`),
  ADD KEY `fk_programare` (`Id_Programare`),
  ADD KEY `fk_serviciu` (`Id_Serviciu`);

--
-- Indexuri pentru tabele `servicii`
--
ALTER TABLE `servicii`
  ADD PRIMARY KEY (`Id_Serviciu`),
  ADD KEY `Id_Categorie` (`Id_Categorie`);

--
-- AUTO_INCREMENT pentru tabele eliminate
--

--
-- AUTO_INCREMENT pentru tabele `categorii`
--
ALTER TABLE `categorii`
  MODIFY `Id_Categorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pentru tabele `clienti`
--
ALTER TABLE `clienti`
  MODIFY `Id_Client` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT pentru tabele `frizeri`
--
ALTER TABLE `frizeri`
  MODIFY `Id_Frizer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pentru tabele `programari`
--
ALTER TABLE `programari`
  MODIFY `Id_Programare` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pentru tabele `programari_servicii`
--
ALTER TABLE `programari_servicii`
  MODIFY `Id_ProgramareServiciu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT pentru tabele `servicii`
--
ALTER TABLE `servicii`
  MODIFY `Id_Serviciu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constrângeri pentru tabele eliminate
--

--
-- Constrângeri pentru tabele `frizeri`
--
ALTER TABLE `frizeri`
  ADD CONSTRAINT `frizeri_ibfk_1` FOREIGN KEY (`Id_Client`) REFERENCES `clienti` (`Id_Client`) ON DELETE SET NULL;

--
-- Constrângeri pentru tabele `programari`
--
ALTER TABLE `programari`
  ADD CONSTRAINT `programari_ibfk_1` FOREIGN KEY (`Id_Client`) REFERENCES `clienti` (`Id_Client`) ON DELETE CASCADE,
  ADD CONSTRAINT `programari_ibfk_2` FOREIGN KEY (`Id_Frizer`) REFERENCES `frizeri` (`Id_Frizer`) ON DELETE CASCADE;

--
-- Constrângeri pentru tabele `programari_servicii`
--
ALTER TABLE `programari_servicii`
  ADD CONSTRAINT `fk_programare` FOREIGN KEY (`Id_Programare`) REFERENCES `programari` (`Id_Programare`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_serviciu` FOREIGN KEY (`Id_Serviciu`) REFERENCES `servicii` (`Id_Serviciu`) ON DELETE CASCADE,
  ADD CONSTRAINT `programari_servicii_ibfk_1` FOREIGN KEY (`Id_Programare`) REFERENCES `programari` (`Id_Programare`) ON DELETE CASCADE,
  ADD CONSTRAINT `programari_servicii_ibfk_2` FOREIGN KEY (`Id_Serviciu`) REFERENCES `servicii` (`Id_Serviciu`) ON DELETE CASCADE;

--
-- Constrângeri pentru tabele `servicii`
--
ALTER TABLE `servicii`
  ADD CONSTRAINT `servicii_ibfk_1` FOREIGN KEY (`Id_Categorie`) REFERENCES `categorii` (`Id_Categorie`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
