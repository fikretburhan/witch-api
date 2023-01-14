const path = require('path')
const fs = require('fs')
const fsPromise = require('fs').promises
const { format } = require('date-fns')

const logEvents = async (message) => {
  const time = format(new Date(), 'dd.MM.yyyy HH:mm')
  const logName = format(new Date(), 'dd.MM.yyyy')
  const logItem = `${time}\t${message}\n`
  try {
    if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
      await fsPromise.mkdir(path.join(__dirname, '..', '..', 'logs'))
    }
    fs.writeFile(
      path.join(__dirname, '..', '..', 'logs', logName),
      `${logItem}\n`
    )
    // await fsPromise.appendFile(
    //   path.join(__dirname, '..', '..', 'logs', logName),
    //   logItem
    // )
  } catch (err) {
    console.error(err)
  }
}

module.exports = logEvents
