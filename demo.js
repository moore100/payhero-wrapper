import PayHero from './index.js'



const apiUsername = 'z7VoCJ66CJF97hqrHt5P';
const apiPassword = 'MOXOaMuthM7jhNLmkpuzzqbjHLtMkyJAEvG6RfJx';

// Concatenating username and password with colon
const credentials = `${apiUsername}:${apiPassword}`;

// Base64 encode the credentials
const encodedCredentials = Buffer.from(credentials).toString('base64');

// Creating the Basic Auth token
const basicAuthToken = `Basic ${encodedCredentials}`;

//Output the token
 console.log(basicAuthToken);
 const payHero=new PayHero(basicAuthToken)
const paymentDetails={
    "amount": 10,
    "phone_number": "0740161331",
    "channel_id": 333, 
    "provider": "m-pesa", 
    "external_reference": "INV-009",
    "callback_url": "https://example.com/callback.php"
}
const sasapayments={ 
    "amount": 10,
    "phone_number": "0740161331",
    "provider": "sasapay", 
    "network_code":"63902",
    "external_reference": "INV-99992",
    "callback_url": "https://example.com/callback.php"

}
const topUpDetails={
    amount: 10,
    phone_number: "0740161331"
}

//payhero sasapay
 payHero.sasaPayment(sasapayments).then(response=>console.log(response)).catch(err=>console.log(err.message))

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

// payHero.transactionStatus('ae3bbe21-6e7c-4ec4-a76c-b3f340ec0990').then(response=>console.log(response)).catch(err=>console.log(err))
// .catch(err=>console.log(err))