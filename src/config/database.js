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
      idle: Number(process.env.LOCAL_DEV_POOL_IDLE),
    },
  },
  production: {
    host: process.env.LOCAL_HOST,
    username: process.env.LOCAL_USER,
    password: process.env.LOCAL_PASSWORD,
    database: process.env.LOCAL_DATABASE,
    dialect: process.env.LOCAL_DIALECT,
    port: process.env.LOCAL_PORT,
    pool: {
      max: Number(process.env.LOCAL_POOL_MAX),
      min: Number(process.env.LOCAL_POOL_MIN),
      acquier: Number(process.env.LOCAL_POOL_ACQUIER),
      idle: Number(process.env.LOCAL_POOL_IDLE),
    },
  },
};

const ployloraDB = {
  host: process.env.PLOYLORA_HOST,
  username: process.env.PLOYLORA_USER,
  password: process.env.PLOYLORA_PASSWORD,
  database: process.env.PLOYLORA_DATABASE,
  dialect: process.env.PLOYLORA_DIALECT,
  port: process.env.PLOYLORA_PORT,
  pool: {
    max: Number(process.env.PLOYLORA_POOL_MAX),
    min: Number(process.env.PLOYLORA_POOL_MIN),
    acquier: Number(process.env.PLOYLORA_POOL_ACQUIER),
    idle: Number(process.env.PLOYLORA_POOL_IDLE),
  },
};

module.exports = {
  localDB,
  ployloraDB,
};
