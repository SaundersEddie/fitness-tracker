const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000
const app = express()

app.use(logger('dev'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines'
//mongoose.connect(MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fitness', {
  useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('mongoose connected')
})

// routes
app.use(require('./routes/api'))
app.use(require('./routes/html'))

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`)
})