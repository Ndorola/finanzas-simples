const express = require('express')
const router = require('./routes/index')
const session = require('express-session')
const mongo = require('connect-mongodb-session')(session)
require('dotenv').config()

const miStore = new mongo({
    uri: process.env.MONGODB,
    collection: 'sessions'
})

require('./config/database')

const app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: process.env.FRASE,
    resave: false,
    saveUninitialized: false,
    store: miStore
}))

app.use('/', router)

app.listen(process.env.PORT || 4000, process.env.HOST || '0.0.0.0', () => console.log('Server listening!'))