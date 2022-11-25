const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3500

const errorHandler = require('./src/middleware/errorHandler')
app.use(cors())
app.use('/searchProduct', require('./src/routes/searchProduct'))
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
