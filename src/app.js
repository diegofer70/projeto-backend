require('dotenv').config()

const jwt = require('jsonwebtoken');

require('./routes/authRoutes')
require('./routes/userRoutes')
require('./routes/productRoutes')
require('./routes/categoryRoutes')

const app = require('./routes/app-express')
const PORT = process.env.PORT || 10000

app.listen(PORT, ()=> { console.log('chuchu atomico')})