import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <nav className="navbar">
        <div className="logo">Barbershop</div>
        <div className="nav-links">
          <a href="/home">Acasă</a>
          <a href="/frizeri">Frizeri</a>
          <a href="/appointments">Programări</a>
          <a href="/contact">Contact</a>
        </div>
      </nav>

      <div class="contact-container">
    <h1 class="contact-title">Trimite-ne un mesaj</h1>
    <form class="contact-form">
        <div class="form-group">
            <label for="name">Nume</label>
            <input type="text" id="name" placeholder="Introduceți numele" />
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Introduceți email-ul" />
        </div>
        <div class="form-group">
            <label for="message">Mesaj</label>
            <textarea id="message" placeholder="Scrieți mesajul aici"></textarea>
        </div>
        <button type="submit" class="submit-button">TRIMITE</button>
    </form>
    <div class="map-container">
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24135.84592518316!2d26.0828188!3d44.4326746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff3a4aefb357%3A0x953cde09837268e4!2sPia%C8%9Ba%20Unirii%2C%20Bucure%C8%99ti!5e0!3m2!1sen!2sro!4v1684358534782!5m2!1sen!2sro" 
            allowfullscreen="" 
            loading="lazy"
        ></iframe>
    </div>
</div>

    </div>
  );
};

export default ContactPage;
