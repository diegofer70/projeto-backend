const { Category } = require('../models/models.js')
const app = require('./app-express.js')

app.get('/v1/category/:id', (request, res) => {
    console.log('request.url', request.url) // debug
    console.log('request.params.id', request.params.id)

    Category.findOne({ where: { id: request.params.id } })
        .then((result) => res.send(result))
})