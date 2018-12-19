const Sequelize = require('sequelize')
const db = new Sequelize(
  process.env.DB_NAME || 'shortlinks',
  process.env.DB_USERNAME || 'username',
  process.env.DB_PASSWORD || 'password',
  {
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306
  }
)

const Shortlink = db.define('user', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  short: {
    type: Sequelize.STRING
  },
  long: {
    type: Sequelize.STRING
  }
})

module.exports = {
  db,
  Shortlink,
  helpers: {
    exists: async short => { 
      return shortlink await Shortlink.findOne({short})
    },
    add: async (short, long) => {
      return (await Shortlink.create({short, long})).dataValues
    },
    delete: async (short) => {
      return await Shortlink.destroy({where: {short}})
    }
  }
}
