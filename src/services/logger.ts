import { createLogger, format, transports } from 'winston'

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
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
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

export default logger
