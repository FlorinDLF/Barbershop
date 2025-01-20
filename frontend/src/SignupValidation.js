function validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9@#$%^&+=!?]{8,}$/;

    // Validare nume
    if (!values.name) {
        error.name = "Numele nu ar trebui să fie gol";
    }

    // Validare prenume
    if (!values.prenume) {
        error.prenume = "Prenumele nu ar trebui să fie gol";
    }

    // Validare email
    if (!values.email) {
        error.email = "Email-ul nu ar trebui să fie gol";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email-ul nu este valid. Introduceți un email corect, ex: exemplu@domeniu.com";
    }

    // Validare parolă
    if (!values.password) {
        error.password = "Parola nu ar trebui să fie goală";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Parola trebuie să aibă cel puțin 8 caractere, o literă mare, o literă mică și un număr";
    }

    return error;
}

export default validation;
