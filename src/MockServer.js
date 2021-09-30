let express = require('express')
let cors = require('cors')
const { v4: uuidv4 } = require('uuid')
let faker = require('faker')
let app = express()
let PORT = 8000

const wait = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds))

app.use(cors({
    origin: '*',
}))
app.use(express.json())

app.get('/beverages', function async(req, res) {
    wait(1000).then(() => {
        const ingredients = Array.from({length: 10}, () => ({
            uuid: faker.datatype.uuid(),
            url: faker.image.imageUrl(),
            title: faker.commerce.productName(),
        }))
    
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(ingredients))
    })
})

app.get('/beverages/status/:id', function (req, res) {
    // req.params.id
    res.setHeader('Content-Type', 'application/json')
    
    wait(1000).then(() => res.end(JSON.stringify(faker.random.objectElement([
        {
            status: 104,
            message: 'Dispensing...',
            id: req.params.id,
        },
        {
            status: 104,
            message: 'Dispensing...',
            id: req.params.id,
        },
        {
            status: 104,
            message: 'Dispensing...',
            id: req.params.id,
        },
        {
            status: 104,
            message: 'Dispensing...',
            id: req.params.id,
        },
        {
            status: 104,
            message: 'Dispensing...',
            id: req.params.id,
        },
        {
            status: 104,
            message: 'Dispensing...',
            id: req.params.id,
        },
        {
            status: 104,
            message: 'Dispensing...',
            id: req.params.id,
        },
        {
            status: 200,
            message: 'Done!',
            id: req.params.id,
        }
    ]))))
})

app.post('/beverages/dispense', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    wait(1000).then(() => res.end(JSON.stringify({
        status: 104,
        message: 'Despensing...',
        id: uuidv4(),
    })))
})

app.listen(PORT, function(err){
    if (err) console.log(err)

    console.log('API Mock server listening on PORT', PORT)
})