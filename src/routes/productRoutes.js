const app = require('./app-express.js')

const { Product } = require('../models/models.js');

app.get('/', (req, res) => {
    res.send('Olá, mundo')
})

app.get('/v1/product/:id', (request, res) => {
    console.log('request.url', request.url) // debug
    console.log('request.params.id', request.params.id)

    Product.findOne({ where: { id: request.params.id } })
        .then((result) => res.send(result))
})

app.post('/v1/product', (request, res) => {
    Product.findAll()
})

app.put('/v1/product/:id', (request, res) => {
    console.log('request.url', request.url) // debug

    Product.update()
    .then((result) => res.send(result))
})

app.delete('/v1/product/:id', (request, res) => {
    console.log('request.url', request.url) // debug
    Product.destroy({ where: { id: request.params.id } }).then((result) => {
        res.send('deletei com sucesso essa quantidade de linhas: '+result)
    })
})