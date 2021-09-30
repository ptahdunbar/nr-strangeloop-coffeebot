let faker = require('faker')

const GET = () => Array.from({length: 10}, () => ({
    uuid: faker.datatype.uuid(),
    url: faker.image.imageUrl(),
    title: faker.commerce.productName(),
}))

const POST = () => {}

module.exports = {
    GET,
    POST
}