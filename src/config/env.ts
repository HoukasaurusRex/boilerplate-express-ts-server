import { env } from './enums'

const getEnvironment = (environ?: unknown) =>
  Object.values(env).find((e) => e === environ) || env.DEV

export default getEnvironment(process.env.NODE_ENV)
