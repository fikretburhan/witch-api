const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const multer = require('multer')
const uploadMiddleware = multer({
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
  fileFilter: (req, res, cb) => {
    cb(undefined, true)
  },
  // storage: multer.diskStorage({
  //   filename: (req, file, cb) => {
  //     cb(null, file.originalname)
  //   },
  //   destination: (req, file, cb) => {
  //     cb(null, 'uploads/')
  //   },
  // }),
})
const PORT = process.env.PORT || 3500
const { errorHandler } = require('./src/middleware/errorHandler')
const corsOptions = require('./config/corsOptions')
const { imageCrop } = require('./src/helpers/imageCrop')
const { searchProduct } = require('./src/controller/searchProduct')

// built-in middleware to handle urlencoded form data
//app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
//app.use(express.json())
app.use(bodyParser.json())

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }))
//form-urlencoded

// for parsing multipart/form-data
//app.use(upload.array())

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  next()
}
app.use(allowCrossDomain)
app.use(cors())

app.use(errorHandler)
//app.use('/searchProduct', require('./src/routes/searchProduct'))

app.post(
  '/searchProduct',
  uploadMiddleware.single('file'),
  async (req, res) => {
    if (!req.file) {
      return res.json({
        success: false,
        message: 'Dosya bulunamadı!',
      })
    } else {
      const data = await searchProduct(req.file.buffer)
      const { hits, total } = data.result.hits
      if (data.success) {
        res.status(200)
        return res.json({
          success: true,
          hits: hits,
          total: total,
        })
      } else {
        res.status(500)
        return res.json({
          success: false,
          error: data.error,
        })
      }
    }
  }
)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
