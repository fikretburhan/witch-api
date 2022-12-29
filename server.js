const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer({
  fileFilter: (req, file, cb) => {
    cb(undefined, true)
  },
})
const PORT = process.env.PORT || 3500
const { errorHandler } = require('./src/middleware/errorHandler')
const corsOptions = require('./config/corsOptions')

// built-in middleware to handle urlencoded form data
//app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
//app.use(express.json())
app.use(bodyParser.json())

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }))
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array())

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  next()
}
app.use(allowCrossDomain)
app.use(cors())

app.use(errorHandler)
app.use('/searchProduct', require('./src/routes/searchProduct'))

app.post('/hello', upload.single('myimage'), (req, res) => {
  if (!req.file) {
    return res.json({
      success: false,
      message: 'dosya yüklenemedi',
    })
  }
  return res.json({
    success: true,
    message: 'dosya yükleme başarılı',
    file: req.file,
  })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
