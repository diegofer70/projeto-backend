const app = require('express')()

// HTTP METHODS - Métodos HTTP
// GET - cRud = READ
// POST - crud = CREATE
// PUT - crUd = UPDATE
// PATCH - crUd = UPDATE
// DELETE - cruD = DELETE
app.get('/', (req, res) => {
    res.send('GET /, AGORA É TUDO NOSSO')
})

app.post('/teste',  (req, res) => {
    res.send('POST /teste, AGORA É TUDO NOSSO')
})

app.listen(3000, () => {
    console.log('TESTE SUBIU')
})