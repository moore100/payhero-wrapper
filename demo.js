
import PayHero from './index.js'

const apiUsername ="" ;
const apiPassword = "";

// Concatenating username and password with colon
const credentials = `${apiUsername}:${apiPassword}`;

// Base64 encode the credentials
const encodedCredentials = Buffer.from(credentials).toString('base64');

// Creating the Basic Auth token
const basicAuthToken = `Basic ${encodedCredentials}`;


const PayHeroConfig = {
    Authorization: basicAuthToken,
    pesapalConsumerKey: '',
    pesapalConsumerSecret: '',
    pesapalApiUrl: 'https://pay.pesapal.com/v3', // Sandbox or production URL
    pesapalCallbackUrl: 'https://your-application.com/pesapal-callback',
    pesapalIpnId: ''
  };
  


//Output the token
 console.log(basicAuthToken);
 const PayHero=new PayHero(PayHeroConfig)
//Output the token

const paymentetails={
    "amount": 10,
    "phone_number": "0740161331",
    "channel_id": 333, 
    "provider": "m-pesa", 
    "external_reference": "INV-009",
    "callback_url": "https://example.com/callback.php"
}


const withdrawal={ 
    "amount": 10,
    "phone_number": "0759408403",
    "channel": "mpesa101",
    "network_code":"63902",
    "external_reference": "INV-99992",
    "callback_url": "https://example.com/callback.php"

}
const topUpDetails={
    amount: 10,
    phone_number: "0740161331"
}
const paymentDetails = {
    currency: 'KES',
    amount: 1000,
    description: 'Test payment',
    customerEmail: 'wahomemutahi8@gmail.com',
    customerFirstName: 'John',
    customerLastName: 'Doe',
    phoneNumber: '0740161331',
    countryCode: 'KE'
  };
// const whatsappDetails = {
//     "message": "My First Text",
//     "phone_number": "0740161331",
//     "session": "haHybLB7nmx3OPPuhtTF"
// }
// PayHero.makeWhatsappPayment(whatsappDetails).then(response=>{
//         console.log(response)}).catch(err=>console.log(err))


//list payment channels
//PayHero.paymentChannels().then(response=>console.log(response)).catch(err=>console.log(err))
//create payment channel
// const channelDetails={
    
//         "channel_type": "bank", //short_code
//         "short_code": "247247",
//         "account_number": "Bank Account Number",
//         "description": "Equity Bank"
      
      


// // }
//PayHero.createPaymentChannel(channelDetails).then(response=>console.log(response)).catch(err=>console.log(err))
// PayHero.getBanks().then(response=>{
//     console.log(response)}).catch(err=>console.log(err))

//withdraw
//PayHero.withdraw(withdrawal).then(response=>console.log(response));
// async function initiatePesapalPayment() {
//     try {
//         const paymentDetails = {
//             currency: 'KES',
//             amount: 1000,
//             description: 'Test payment',
//             customerEmail: 'customer@example.com',
//             customerFirstName: 'John',
//             customerLastName: 'Doe',
//             phoneNumber: '0712345678',
//             countryCode: 'KE'
//           };
      
//           const { orderTrackingId, merchantReference, redirectUrl } = await PayHero.initiatePesapalPayment(paymentDetails);
//           console.log('Pesapal payment initiated:');
//           console.log('Order Tracking ID:', orderTrackingId);
//           console.log('Merchant Reference:', merchantReference);
//           console.log('Redirect URL:', redirectUrl);
      
         
//     } catch (error) {
//       console.error('Error initiating Pesapal payment:', error.message);
//     }
//   }
  
  //initiatePesapalPayment();

PayHero.accountTransactions().then(response=>{
    console.log(response)}).catch(err=>console.log(err))


//PayHero sasapay
 //PayHero.sasaPayment(sasapayments).then(response=>console.log(response)).catch(err=>console.log(err.message))

// PayHero.makeStkPush(paymentDetails)
// .then(response=>console.log(response))
// .catch(err=>console.log(err))
//list payment channels

// PayHero.paymentsWalletBalance().then(response=>console.log(response)).catch(err=>console.log(err))
// .catch(err=>console.log(err))


// PayHero.serviceWalletBalance().then(response=>console.log(response)).catch(err=>console.log(err))
// .catch(err=>console.log(err))

// PayHero.topUpServiceWallet(topUpDetails).then(response=>console.log(response)).catch(err=>console.log(err))
// .catch(err=>console.log(err))

// PayHero.accountTransactions(topUpDetails).then(response=>console.log(response)).catch(err=>console.log(err))
// .catch(err=>console.log(err))

// PayHero.transactionStatus('ae3bbe21-6e7c-4ec4-a76c-b3f340ec0990').then(response=>console.log(response)).catch(err=>console.log(err))
// .catch(err=>console.log(err))