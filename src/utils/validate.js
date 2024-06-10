
export const checkValidData = (email, password) => {
    const isEmailValid = (/^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/).test(email);
    //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    const isPasswordValid = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(password);

    if (!isEmailValid) {
        return "Invalid email";
    }
    if (!isPasswordValid) {
        return "Invalid password";
    }
    return null;
}
