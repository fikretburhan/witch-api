const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3500
const { errorHandler } = require('./src/middleware/errorHandler')

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json

// var allowCrossDomain = function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
//   res.header('Access-Control-Allow-Headers', 'Content-Type')

//   next()
// }
app.use(cors())

app.use(errorHandler)
app.use('/searchProduct', require('./src/routes/searchProduct'))

app.post('/hello', (req, res) => {
  res.send({
    message: 'hello world again bro',
    data: req.body,
  })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
