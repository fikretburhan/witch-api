const { format } = require('date-fns')
const manipulateOcrData = (data) => {
  const priceItem = data.find((f) => f.isNumeric == true)
  const price = priceItem ? priceItem.description : ''
  const content = data[0]?.description.split('\n').join(',')

  const resultData = {
    price: price,
    content: content,
    createdDate: format(new Date(), 'dd-MM-yyyy HH:mm'),
  }

  return resultData
}

module.exports = manipulateOcrData
