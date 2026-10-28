
function validatePassword(password) {
    if (typeof password !== "string") {
        return false;
    }

    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialCharacter = /[^A-Za-z0-9]/.test(password);

    return (
        hasMinLength &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecialCharacter
    );
}

module.exports = validatePassword;
