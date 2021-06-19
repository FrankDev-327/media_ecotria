'use strict'

const mongoose = require('mongoose');
const urlPar = { useNewUrlParser: true }
const app = require('./app');
const CronJobManager = require('cron-job-manager');
const { PostModel } = require('./models/index')
const conn = require('./setting/config');

mongoose.Promise = global.Promise;
mongoose.set('debug', true)
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);



mongoose.connect(conn.db_name, urlPar, (err, res) => {
   if (err) {
      console.log('Ocurrió un error: -> ' + err)
   } else {
      try {
         app.listen(conn._port, () => {
            console.log('Conectao al puerto: ' + conn._port);
         });
      } catch (error) {
         console.log('*****' + error.message + '*****')
      }
   }
});

async function insertDataIntoPostModel() {
   try {
      const listPrices = [2004.36, 4514.59, 7522.50, 4742.12, 2452.12]
      const listsNameProducts = ['caballo', 'ganado', 'cebolla', 'tomate', 'ajies', 'yuca', 'pepino']
      const listCategory = ['industria', 'transporte', 'vegetables', 'ganaderia', 'ciraderos']


      for await (let item of listPrices) {
         const arrayData = {
            "titlePost": "Test Listing " + Math.floor(Math.random() * (6 - 1) + 1),
            "price": listPrices[Math.floor(Math.random() * listPrices.length)],
            "descriptionPost": "Listado de prueba, lorem ipsum insofactum",
            "catergory": listCategory[Math.floor(Math.random() * listCategory.length)],
            "address": "Panamá",
            "phoneNumber": "6080-6080",
         }
         let post = new PostModel({ ...arrayData })
         await post.save();
      }

   } catch (error) {
      console.log(error);
   }
}


const manager = new CronJobManager(
   'callingInsertDataIntoPostModel',
   '0-40 * 7-8 * * *',
   () => {
      insertDataIntoPostModel();
   }
)

manager.start('callingInsertDataIntoPostModel');