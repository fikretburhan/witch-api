const client = require('../helpers/elasticClientConnection')
const { errorHandler } = require('../middleware/errorHandler')

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
    errorHandler('elastic error', err)
  }
}

const searchItem = (content) => {
  return new Promise((resolve, reject) => {
    client
      .search({
        index: 'witch-products',
        body: {
          query: {
            match: { content: content },
          },
        },
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = { addItem, searchItem }
