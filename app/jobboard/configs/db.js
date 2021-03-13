module.exports = {
  HOST: "localhost",
  USER: "admin",
  PASSWORD: "12123",
  DB: "jobboard",
  dialect: "mysql",
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    acquier: 30000,
    idle: 10000
  }
}
/*module.exports = {
  HOST: "34.87.11.222",
  USER: "usrJobboard",
  PASSWORD: "lesiy[Jobboard",
  DB: "jobboard",
  dialect: "mysql",
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    acquier: 30000,
    idle: 10000
  }
}*/