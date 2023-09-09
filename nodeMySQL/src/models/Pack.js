const Sequelize = require('sequelize')
const db = require('../config/db')

const Pack = db.define ('packs', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  pack_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  product_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  qty: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
})

Pack.sync({alter: true})

module.exports = Pack 

