const { Sequelize } = require('sequelize');
require('dotenv').config()

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

sequelize.authenticate().then(()=>{
  console.log("conexão realizada com sucesso")
}).catch((err)=>{
  console.log(err, "Conexão com banco não realizada")
})

module.exports = sequelize