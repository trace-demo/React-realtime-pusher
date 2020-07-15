import React from 'react';
import './today.css'
import axios from 'axios'
import Pusher from 'pusher-js'

class Today extends React.Component {
    constructor () {
        super()
        this.state = {
            btcprice:'',
            ltcprice:'',
            etcprice:''
        }
    }


    sendPricePusher (data) {
        axios.post('/prices/new', {
            prices: data
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }
 

    componentDidMount() {
        this.pusher = new Pusher('3978b7a148551aa0410e', {
            cluster: 'us2',
            encrypted: true
          });
      
        this.prices = this.pusher.subscribe('coin-prices');

        setInterval(() => {
            axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,LTC,ETH&tsyms=USD')
            .then(response => {
                this.sendPricePusher(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }, 100)


        this.prices.bind('prices', price => {
            this.setState({ btcprice: price.prices.BTC.USD })
            this.setState({ ltcprice: price.prices.LTC.USD })
            this.setState({ ethprice: price.prices.ETH.USD })
        }, this)
    }


    render() {
        return (
            <div className="today--section container">
                <h2>Current Price</h2>
                <div className="columns today--section__box">
                    <div className="column btc--section">
                        <h5>${this.state.btcprice}</h5>
                        <p>1 BTC</p>
                    </div>

                    <div className="column ltc--section">
                        <h5>${this.state.ltcprice}</h5>
                        <p>1 LTC</p>
                    </div>

                    <div className="column eth--section">
                        <h5>${this.state.ethprice}</h5>
                        <p>1 ETH</p>
                    </div>
                </div>
            </div>
        )
    }
}


export default Today;