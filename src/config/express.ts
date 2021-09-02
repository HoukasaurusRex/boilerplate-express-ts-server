export default {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  host: process.env.IP || 'localhost',
}
