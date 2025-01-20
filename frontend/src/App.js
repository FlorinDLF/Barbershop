import Login from './Login';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './Signup';
import Home from './Home';
import Frizeri from './Frizeri';
import AdminPage from './AdminPage';
import AppointmentsPage from './AppointmentsPage';
import ContactPage from './ContactPage';
import BarberStatsPage from './BarberStatsPage';
import ClientsStatsPage from './ClientsPageStats';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path="/frizeri" element={<Frizeri />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/barberstats" element={<BarberStatsPage />} />
        <Route path="/clientstats" element={<ClientsStatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
