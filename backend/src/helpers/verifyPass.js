const bcrypt = require('bcryptjs');

async function verifyPassword(enteredPassword, hashedPassword) {
    try {
        const result = await bcrypt.compare(enteredPassword, hashedPassword);
        return result;
    } catch (error) {
        console.error('Error comparing passwords:', error.message);
    }
}

module.exports = { verifyPassword };
