const { format } = require('date-fns')
const manipulateOcrData = (data) => {
  const price = data.find((f) => f.isNumeric == true).description
  const descriptionDataArray = data[0].description.split('\n').join(',')

  const resultData = {
    price: price,
    content: descriptionDataArray,
    createdDate: format(new Date(), 'dd-MM-yyyy HH:mm'),
  }

  return resultData
}

module.exports = manipulateOcrData
