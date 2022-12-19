const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3500
const { errorHandler } = require('./src/middleware/errorHandler')

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

app.use(cors())

app.use(errorHandler)
app.use('/searchProduct', require('./src/routes/searchProduct'))

app.post('/hello', (req, res) => {
  res.send({ message: 'hello world again', data: req })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
