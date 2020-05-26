import logger from '../../services/logger'

export default {
  notFound(_req, res, _next): void {
    res.status(404).jsend.error('Resource not found')
  },
  handleError(err, _req, res, _next): void {
    logger.error(err)
    res
      .status(err.status || 500)
      .jsend.error(err.message || 'Something went wrong')
  },
}
