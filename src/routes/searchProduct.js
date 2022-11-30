const express = require('express')
const router = express.Router()
const getOcr = require('../controller/ocr')
const manipulateOcrData = require('../helpers/manipulateOcrData')
const { addItem, searchItem } = require('../controller/elasticSearch')
router.post('/', async (req, res) => {
  const image = req.body.image
  getOcr(image)
    .then((response) => {
      const manipulatedData = manipulateOcrData(response)
      searchItem(manipulatedData.content).then((resData) => {
        const { hits, total } = resData
        addItem(manipulatedData)
        console.log('hits', hits)
        res.status(200)
        res.send({ hits: hits })
      })
    })
    .catch((err) => {
      res.status(500)
      res.json({ error: err })
    })
})

module.exports = router
