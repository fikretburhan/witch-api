const logEvents = require('./logEvents')

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name} ${err.message}`, 'errorLogs.txt')
  res.status(500).send(err.message)
}

module.exports = errorHandler
