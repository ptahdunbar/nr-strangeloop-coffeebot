let express = require('express')
let app = express()
let PORT = 8000

let mockGetRequest = require('./mock-api')

app.use(express.json())

app.get('/beverages', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(mockGetRequest()))
})

app.get('/beverages/status/:id', function (req, res) {
    // req.params.id
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
        status: 200,
        message: 'Done!'
    }))
})

app.post('/beverages/dispense', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
        status: 104,
        message: 'Despensing...', 
    }))
})

app.listen(PORT, function(err){
    if (err) console.log(err)
    
    console.log("Server listening on PORT", PORT)
})