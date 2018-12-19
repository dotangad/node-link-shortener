const {db, Shortlink} = require('./db')

async function main() {
  await db.sync({force: true})
  await db.close()
}

main()