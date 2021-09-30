let axios = require('axios')

const baseURL = 'http://localhost:8000'

const API = axios.create({
    baseURL,
    timeout: 3000,
})

const fetchAll = () => API.get('/beverages')
const checkStatus = (id) => API.get(`/beverages/status/${id}`)
const dispense = (ingredients = []) => API.post('/beverages/dispense/', {
    ingredients,
})

module.exports = {
    baseURL,
    API,
    fetchAll,
    checkStatus,
    dispense
}