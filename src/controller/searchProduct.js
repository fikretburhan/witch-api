const { imageCrop } = require('../helpers/imageCrop')
const manipulateOcrData = require('../helpers/manipulateOcrData')
const { searchItem, addItem } = require('./elasticSearch')
const getOCR = require('./ocr')

const searchProduct = async (imageBuffer) => {
  const croppedImage = await imageCrop(imageBuffer)
  //const { data } = croppedImage
  if (croppedImage) {
    const ocrResult = await getOCR(croppedImage)
    const { success, data, error } = ocrResult
    if (success) {
      const manipulatedData = manipulateOcrData(data)
      addItem(manipulatedData)
      const result = await searchItem(manipulatedData.content)
      return { success: true, result: result }
    } else {
      return {
        success: false,
        error: error,
      }
    }
    //.then((response) => {
    // searchItem(manipulatedData.content)
    //   .then((resData) => {
    //     const { hits, total } = resData
    //     addItem(manipulatedData)
    //     return {
    //       success: true,
    //       hits: hits,
    //       total: total,
    //     }
    //   })
    //   .catch((elkError) => {
    //     return {
    //       success: false,
    //       error: elkError,
    //     }
    //   })
    //})
    // .catch((ocrErr) => {
    //   return {
    //     success: false,
    //     error: ocrErr,
    //   }
    // res.status(500)
    // res.json({ error: err })
    //})
  } else {
    return {
      success: false,
      error: croppedImage.error,
    }
  }
}

module.exports = { searchProduct }
