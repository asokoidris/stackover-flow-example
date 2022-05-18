require('dotenv').config();

module.exports = {
    TEST_DB: process.env.TEST_DB,
    DATA_DB: process.env.DATABASE_URI,
    JWTSecret: process.env.JWT_Secret
};