const bcrypt = require('bcryptjs');
const saltRounds = 10; // Salt rounds determine the complexity of the hashing

async function hashPassword(password) {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        console.error('Error hashing password:', error.message);
    }
}

module.exports = hashPassword;
