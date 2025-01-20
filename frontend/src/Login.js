import React, { useState } from 'react';
import './Login.css';
import Logo from './Logo.png';
import Logo1 from './Logo1.png';
import { Link, useNavigate } from 'react-router-dom';
import validation from './LoginValidation';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("HandleSubmit apelat");
        const validationErrors = validation(values);
        console.log("Erori de validare:", validationErrors);
        setErrors(validationErrors);
    
        if (!validationErrors.email && !validationErrors.password) {
            console.log("Trimitem datele către server:", values);
            try {
                const response = await fetch('http://localhost:8081/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
    
                const result = await response.json();
                console.log("Răspuns server:", result);
    
                if (response.status === 200) {
                    alert(result.message);
    
                    // Salvează ID-ul clientului și tipul de cont în localStorage
                    console.log("Client ID primit de la server:", result.clientId);
                    console.log("Tip cont primit de la server:", result.tip_cont);
                    localStorage.setItem("clientId", result.clientId);
                    localStorage.setItem("tipCont", result.tip_cont);
    
                    // Redirecționează în funcție de tipul contului
                    if (result.tip_cont === 'admin') {
                        navigate('/admin');
                    } else if (result.tip_cont === 'client') {
                        navigate('/home');
                    } else {
                        console.error("Tip cont necunoscut:", result.tip_cont);
                        alert("Eroare: Tip cont necunoscut!");
                    }
                } else {
                    setServerError(result.message);
                }
            } catch (error) {
                console.error('Eroare la conectarea cu serverul:', error);
                setServerError('Eroare la conectarea cu serverul.');
            }
        }
    };            
    return (
        <div className='body'>
            <img src={Logo} alt="Logo" />
            <div className='form'>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder="Introduceți Email" name='email' onChange={handleInput}></input>
                        {errors.email && <span className='danger'>{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor="parola">Parola</label>
                        <input type="password" placeholder="Introduceți Parolă" name='password' onChange={handleInput}></input>
                        {errors.password && <span className='danger'>{errors.password}</span>}
                    </div>
                    <button type='submit'>Log In</button>
                    <p>Vrei să-ți faci freza? Sau barba? Sau nu ai cont? Nu-ți face griji! Poți crea unul accesând butonul de mai jos.</p>
                    <Link to="/signup">
                        <button>Creați un cont</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
