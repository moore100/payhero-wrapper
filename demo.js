import PayHero from './index.js'
const payHero=new PayHero('')




const paymentDetails={
    "amount": 10,
    "phone_number": "0740161331",
    "channel_id": 333, 
    "provider": "m-pesa", 
    "external_reference": "INV-009",
    "callback_url": "https://example.com/callback.php"
}
const topUpDetails={
    amount: 10,
    phone_number: "0740161331"
}

// payHero.makeStkPush(paymentDetails)
// .then(response=>console.log(response))
// .catch(err=>console.log(err))


// payHero.paymentsWalletBalance().then(response=>console.log(response)).catch(err=>console.log(err))
// .catch(err=>console.log(err))


// payHero.serviceWalletBalance().then(response=>console.log(response)).catch(err=>console.log(err))
// .catch(err=>console.log(err))

// payHero.topUpServiceWallet(topUpDetails).then(response=>console.log(response)).catch(err=>console.log(err))
// .catch(err=>console.log(err))

// payHero.accountTransactions(topUpDetails).then(response=>console.log(response)).catch(err=>console.log(err))
// .catch(err=>console.log(err))

payHero.transactionStatus('ae3bbe21-6e7c-4ec4-a76c-b3f340ec0990').then(response=>console.log(response)).catch(err=>console.log(err))
.catch(err=>console.log(err))