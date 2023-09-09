const Sequelize = require('sequelize')
const db = require('../config/db')

const Product = db.define ('products', {
  code: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cost_price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  sales_price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
})

Product.sync({alter: true})

module.exports = Product 

