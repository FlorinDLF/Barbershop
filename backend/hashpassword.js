const bcrypt = require('bcrypt');

(async () => {
    const password = "ParolaAdmin123"; // Parola pe care o dorești
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Parola criptată:", hashedPassword);
})();
