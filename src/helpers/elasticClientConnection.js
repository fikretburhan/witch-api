const { Client } = require('@elastic/elasticsearch')
const fs = require('fs')
const path = require('path')

const crt = fs.readFileSync(
  path.join(__dirname, '..', '..', 'assets', 'certificates', 'ca.crt')
)

const client = new Client({
  node: 'https://elk.ucuzuapp.com.tr:9200',
  auth: {
    username: 'elastic',
    password: '2531.Fiko',
  },
  tls: {
    ca: crt,
    rejectUnauthorized: false,
  },
})

module.exports = client
