const express = require('express')
const app = express()

app.use(express.static('public'))
app.listen(3000, () => console.log('Server running on port 3000'))

// GET method route
app.get('/testGetter', function (req, res) {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})