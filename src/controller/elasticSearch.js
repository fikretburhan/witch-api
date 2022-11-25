const client = require('../helpers/elasticClientConnection')

const addItem = async (data) => {
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
    console.log('elastic error', err)
  }
}

const searchItem = async (content) => {
  try {
    const {
      hits: { hits, count },
    } = await client.search({
      index: 'witch-products',
      body: {
        query: {
          match: { content: content },
        },
      },
    })

    return { hits, total }
  } catch (err) {
    console.log(err)
  }
}

module.exports = { addItem, searchItem }
