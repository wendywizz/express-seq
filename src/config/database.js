const localDB = {
  development: {
    host: process.env.LOCAL_DEV_HOST,
    username: process.env.LOCAL_DEV_USER,
    password: process.env.LOCAL_DEV_PASSWORD,
    database: process.env.LOCAL_DEV_DATABASE,
    dialect: process.env.LOCAL_DEV_DIALECT,
    port: process.env.LOCAL_DEV_PORT,
    pool: {
      max: Number(process.env.LOCAL_DEV_POOL_MAX),
      min: Number(process.env.LOCAL_DEV_POOL_MIN),
      acquier: Number(process.env.LOCAL_DEV_POOL_ACQUIER),
      idle: Number(process.env.LOCAL_DEV_POOL_IDLE)
    }
  },
  production: {
    host: process.env.LOCAL_PROD_HOST,
    username: process.env.LOCAL_PROD_USER,
    password: process.env.LOCAL_PROD_PASSWORD,
    database: process.env.LOCAL_PROD_DATABASE,
    dialect: process.env.LOCAL_PROD_DIALECT,
    port: process.env.LOCAL_PROD_PORT,
    pool: {
      max: Number(process.env.LOCAL_PROD_POOL_MAX),
      min: Number(process.env.LOCAL_PROD_POOL_MIN),
      acquier: Number(process.env.LOCAL_PROD_POOL_ACQUIER),
      idle: Number(process.env.LOCAL_PROD_POOL_IDLE)
    }
  },
}

const ployloraDB = {
  development: {
    host: process.env.PLOYLORA_DEV_HOST,
    username: process.env.PLOYLORA_DEV_USER,
    password: process.env.PLOYLORA_DEV_PASSWORD,
    database: process.env.PLOYLORA_DEV_DATABASE,
    dialect: process.env.PLOYLORA_DEV_DIALECT,
    port: process.env.PLOYLORA_DEV_PORT,
    pool: {
      max: Number(process.env.PLOYLORA_DEV_POOL_MAX),
      min: Number(process.env.PLOYLORA_DEV_POOL_MIN),
      acquier: Number(process.env.PLOYLORA_DEV_POOL_ACQUIER),
      idle: Number(process.env.PLOYLORA_DEV_POOL_IDLE)
    }
  },
  production: {
    host: process.env.PLOYLORA_PROD_HOST,
    username: process.env.PLOYLORA_PROD_USER,
    password: process.env.PLOYLORA_PROD_PASSWORD,
    database: process.env.PLOYLORA_PROD_DATABASE,
    dialect: process.env.PLOYLORA_PROD_DIALECT,
    port: process.env.PLOYLORA_PROD_PORT,
    pool: {
      max: Number(process.env.PLOYLORA_PROD_POOL_MAX),
      min: Number(process.env.PLOYLORA_PROD_POOL_MIN),
      acquier: Number(process.env.PLOYLORA_PROD_POOL_ACQUIER),
      idle: Number(process.env.PLOYLORA_PROD_POOL_IDLE)
    }
  },
}

module.exports = {
  localDB,
  ployloraDB
}
