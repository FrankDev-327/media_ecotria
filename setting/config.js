require('dotenv').config();
module.exports = {
    path: process.env.MAIN_PATH,
    db_name: process.env.PLACES_DB_NAME,
    _port: process.env.PORT,
}