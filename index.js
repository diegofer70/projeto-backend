const express = require('express')
const cors = require('cors')    
// DESESTRUTURACAO
const { Sequelize, DataTypes, QueryTypes } = require('sequelize');
const { database } = require('pg/lib/defaults');
const app = express()
const port = 3000



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

app.use(cors())

app.get('/', (req, res) => {
    res.send('Clicar produtos')
})
// /v1/user/nome METODOS HTTP

app.get('/v1/user/:id', (request, res) => {
    console.log('request.url', request.url) // debug
    console.log('request.params.id', request.params.id)

    sequelize.query('SELECT * FROM users where id="' + request.params.id + '"', {
        type: QueryTypes.SELECT,
    }).then((result) => res.send(result));
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

app.listen(port, () => {
    console.log(`Exemplo de aplicativo escutando na porta ${port}`)
})

