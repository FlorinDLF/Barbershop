import React, { useState } from 'react';
import './Login.css';
import Logo from './Logo.png';
import validation from './SignupValidation';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [values, setValues] = useState({
        name: '',
        prenume: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(''); // Declarăm starea pentru erorile serverului
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validation(values);
        setErrors(validationErrors);
    
        if (!validationErrors.email && !validationErrors.password) {
            try {
                console.log("Date trimise spre server:", values);
                const response = await fetch('http://localhost:8081/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
    
                const result = await response.json();
    
                if (response.status === 200) {
                    alert(result.message); // Utilizator adăugat cu succes
                    navigate('/');
                } else if (response.status === 400) {
                    // Email-ul este deja folosit
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: result.message,
                    }));
                } else {
                    console.error("Eroare server:", result);
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
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nume</label>
                        <input type="text" placeholder="Introduceți Nume" name='name' onChange={handleInput} />
                        {errors.name && <span className='danger'>{errors.name}</span>}
                    </div>
                    <div>
                        <label htmlFor="prenume">Prenume</label>
                        <input type="text" placeholder="Introduceți Prenume" name='prenume' onChange={handleInput} />
                        {errors.prenume && <span className='danger'>{errors.prenume}</span>}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Introduceți Email" name='email' onChange={handleInput} />
                        {errors.email && <span className='danger'>{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor="password">Parola</label>
                        <input type="password" placeholder="Introduceți Parolă" name='password' onChange={handleInput} />
                        {errors.password && <span className='danger'>{errors.password}</span>}
                    </div>
                    <button type='submit'>Creare Cont</button>
                    {serverError && <p className='danger'>{serverError}</p>} {/* Afișăm eroarea serverului */}
                </form>
            </div>
        </div>
    );
}

export default Signup;
