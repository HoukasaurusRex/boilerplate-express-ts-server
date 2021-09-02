export const env = {
  DEV: 'development',
  PROD: 'production',
  TEST: 'test',
} as const

export const dialects = {
  MYSQL: 'mysql',
  PSQL: 'postgres',
  SQLITE: 'sqlite',
  MDB: 'mariadb',
  MSSQL: 'mssql',
} as const
