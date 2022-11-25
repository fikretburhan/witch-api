const express = require('express')
const router = express.Router()
const getOcr = require('../controller/ocr')
const manipulateOcrData = require('../helpers/manipulateOcrData')
const { addItem, searchItem } = require('../controller/elasticSearch')
router.get('/', async (req, res) => {
  try {
    const ocrResult = await getOcr()
    const manipulatedData = manipulateOcrData(ocrResult)
    const { hits, count } = await searchItem(manipulatedData.content)
    addItem(manipulatedData)
    res.status(200).json({ hits, count })
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
