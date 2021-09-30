let express = require('express')
let app = express()
let PORT = 8000

let mockGetRequest = require('./mock-api')

app.use(express.json())

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(mockGetRequest()))
})

app.listen(PORT, function(err){
    if (err) console.log(err)
    
    console.log("Server listening on PORT", PORT)
})