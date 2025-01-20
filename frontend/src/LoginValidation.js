function validation(values) {
    let error = {};

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validare email
    if (!values.email) {
        error.email = "Email-ul nu ar trebui să fie gol";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email-ul nu este valid";
    }

    // Validare parolă
    if (!values.password) {
        error.password = "Parola nu ar trebui să fie goală";
    }

    return error;
}

export default validation;
