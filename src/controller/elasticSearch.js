const client = require('../helpers/elasticClientConnection')
const { errorHandler } = require('../middleware/errorHandler')
const fs = require('fs')
const logEvents = require('../middleware/logEvents')
const addItem = async (data) => {
  console.log('additem', data)
  const { content, price, createdDate } = data
  try {
    await client.index({
      index: 'witch-products',
      body: {
        content: content,
        price: price,
        createdDate: createdDate,
      },
    })

    await client.indices.refresh({ index: 'witch-products' })
  } catch (err) {
    logEvents(`Elastic Insert Error: ${err}`)
    //errorHandler('elastic error', err)
  }
}

const searchItem = async (content) => {
  const result = await client.search({
    index: 'witch-products',
    body: {
      query: {
        match: { content: content },
      },
    },
  })
  const resultData = await result
  return resultData
  // return new Promise((resolve, reject) => {
  //   client
  //     .search({
  //       index: 'witch-products',
  //       body: {
  //         query: {
  //           match: { content: content },
  //         },
  //       },
  //     })
  //     .then((res) => {
  //       resolve(res)
  //     })
  //     .catch((err) => {
  //       fs.writeFile(
  //         path.join(__dirname, '..', '..', 'logs', `${time}.txt`),
  //         `Elastic Search Error: ${err}\n`
  //       )
  //       reject(err)
  //     })
  // })
}

module.exports = { addItem, searchItem }
