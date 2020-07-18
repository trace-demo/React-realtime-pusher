const express = require('express')

const bodyParser = require('body-parser')
const app = express()

const Pusher = require('pusher')


// attention to how to link to React App / Today.js
const pusher = new Pusher({
    appId: '',                  /* filled by your own */
    key: '',
    secret: '',
    cluster: '',
    encrypted: true
})




app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})


app.set('port', (5000))


app.get('/', (req, res) => {
    res.send('Welcome')
})


app.post('/prices/new', (req, res) => {
    pusher.trigger('coin-prices', 'prices', {
        prices: req.body.prices
    });
    res.sendStatus(200);
})


app.listen(app.get('port'), () => {
    console.log('Node running on', app.get('port'))
})
