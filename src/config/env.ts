import { enums } from './enums'

const getEnvironment = (env?: unknown) =>
  Object.values(enums).find((e) => e === env) || enums.DEV

export const environment = getEnvironment(process.env.NODE_ENV)
