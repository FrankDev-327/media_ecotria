require('dotenv').config();
module.exports = {
    path: process.env.MAIN_PATH,
    db_name: process.env.MEDIA_DB_NAME,
    _port: process.env.PORT,
}