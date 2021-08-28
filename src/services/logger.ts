import { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import { createLogger, format, transports, Logger } from 'winston'
import { enums, environment } from '../config'

const { combine, colorize, timestamp, align, printf } = format

const errorStackFormat = format((info) =>
  info instanceof Error
    ? Object.assign({}, info, {
        stack: info.stack,
        message: info.message,
      })
    : info
)

const customFormat = printf(({ level, message, timestamp, stack }) => {
  const colorizer = colorize().colorize
  const formattedTimestamp = colorizer('debug', timestamp)
  const formattedLevel = colorizer(level, level.toUpperCase())
  return `[${formattedLevel}] ${formattedTimestamp}: ${stack || message}`
})

const logger = createLogger({
  level: 'info',
  format: format.combine(errorStackFormat(), format.json()),
  transports: [
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
})

// Log to console in development
if (environment === enums.DEV) {
  logger.add(
    new transports.Console({
      format: combine(
        timestamp({ format: 'HH:mm:ss' }),
        align(),
        errorStackFormat(),
        customFormat
      ),
    })
  )
}

export const httpLogger = (env: string | undefined): morgan => {
  switch (env) {
    case enums.PROD:
      // use winston logger in production
      return morgan('combined', {
        stream: { write: (message): Logger => logger.info(message) },
      })
    case enums.TEST:
      // no logging in tests
      return (_req: Request, _res: Response, next: NextFunction): void => next()
    default:
      // console logging in development
      return morgan('dev')
  }
}

export default logger
