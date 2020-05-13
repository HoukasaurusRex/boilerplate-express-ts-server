import { createLogger, format, transports } from 'winston'

const { combine, colorize, timestamp, align, printf } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  const colorizer = colorize().colorize
  const formattedTimestamp = colorizer('debug', timestamp)
  const formattedLevel = colorizer(level, level.toUpperCase())
  return `[${formattedLevel}] ${formattedTimestamp}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ]
});
 
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: combine(
      timestamp({ format: 'HH:mm:ss' }),
      align(),
      customFormat
    )
  }))
}

export default logger