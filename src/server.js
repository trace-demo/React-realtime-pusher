const express = require('express')

const bodyParser = require('body-parser')
const app = express()

const Pusher = require('pusher')



const pusher = new Pusher({
    appId: '1037201',
    key: '3978b7a148551aa0410e',
    secret: '294dcf0d0c86bf1bfb50',
    cluster: 'us2',
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