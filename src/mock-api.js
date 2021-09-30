let faker = require('faker')

const fetchAll = () => Array.from({length: 10}, () => ({
    uuid: faker.datatype.uuid(),
    url: faker.image.imageUrl(),
    title: faker.commerce.productName(),
}))

const checkStatus = () => new Promise((resolve, reject) => ({
    code: 102,
    message: 'Dispensing...',
}))

const dispense = () => new Promise((resolve, reject) => setTimeout(resolve, 1000))

const wait = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds))

module.exports = {
    fetchAll,
    checkStatus,
    dispense,
    wait
}