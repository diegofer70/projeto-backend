const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')    
// DESESTRUTURACAO
const { Sequelize, DataTypes, QueryTypes } = require('sequelize');
const app = express()
const port = 10000

const sequelize = new Sequelize('postgresql://postgres.hspsjnkdtvcaiuxplsov:chuchu-diego-araujo@aws-0-us-west-1.pooler.supabase.com:6543/postgres');
// temos 3 formas de conectar o banco, vamos tentar outra forma 

const User = sequelize.define(
    'User',
    {
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: true
    },
);

const Category = sequelize.define(
    'Category',
    {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        use_in_menu: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false
        },
    },
    {
        timestamps: true
    },
);

sequelize.sync({alter: true})
.then (() => {
    console.log('Connection has been established successfully.');
})  
   .catch (error => {
  console.error('Unable to connect to the database:', error);
});

app.use(bodyParser.json()) // middleware
app.use(cors()) // middleware

app.get('/', (req, res) => {
    res.send('Olá, mundo!')
})
// /v1/user/nome METODOS HTTP

app.get('/v1/user/:id', (request, res) => {
    console.log('request.url', request.url) // debug
    console.log('request.params.id', request.params.id)

    User.findOne({ where: { id: request.params.id }})
    .then((result) => res.send(result));
})
// app.post('/v1/user/:name', (request, res) => {
//     console.log('request.url', request.url) // debug
//     console.log('request.params.name', request.params.name)

//     sequelize.query("INSERT INTO users (name, email) values ('" + request.params.name + "', '" + request.params.name + "')", {
//         type: QueryTypes.INSERT,
//     }).then((result) => res.status(201).send(result));
// })

app.post('/v1/user', (request, res) => {
    console.log('request.url', request.url) // debug
    console.log('request.body', request.body)
    // res.send(request.body)
    User.create(request.body).then((result) => res.status(201).send(result))

})

app.put('/v1/user/:id', (request, res) => {
    console.log('request.url', request.url) // debug
    console.log('request.body', request.body)
    User.update(request.body, { where: { id: request.params.id } }).then((result) => res.send(result))
})

app.delete('/v1/user/:id', (request, res) => {
    console.log('request.url', request.url) // debug
    User.destroy({ where: { id: request.params.id } }).then((result) => res.send(result))
})

app.listen(port, () => {
    console.log(`Exemplo de aplicativo escutando na porta ${port}`)
})

