Here's the updated README with the Pesapal integration:

# Unofficial PayHero Node.js SDK

Welcome to the unofficial PayHero Node.js SDK, this SDK provides a convenient way to integrate PayHero and Pesapal payment functionality into your Node.js applications.

## Installation

You can install the PayHero Node.js SDK via npm:

```bash
npm i payhero-wrapper
```

## Usage

First, import the PayHero class:

```javascript
import PayHero from 'payhero-wrapper';
```

Then, initialize PayHero with your API keys:

```javascript
const PayHeroConfig = {
  Authorization: 'your_PayHero_authorization_token',
  pesapalConsumerKey: 'your_pesapal_consumer_key',
  pesapalConsumerSecret: 'your_pesapal_consumer_secret',
  pesapalApiUrl: 'https://payments.pesapal.com/pesapalv3/api', // Sandbox or production URL
  pesapalCallbackUrl: 'https://your-application.com/pesapal-callback',
  pesapalIpnId: 'your_pesapal_ipn_id'
};

const PayHero = new PayHero(PayHeroConfig);
```

### Making STK Push Payments

```javascript
const paymentDetails = {
    amount: 10,
    phone_number: "0740161331",
    channel_id: 333,
    provider: "m-pesa",
    external_reference: "INV-009",
    callback_url: "https://example.com/callback.php"
};

PayHero.makeStkPush(paymentDetails)
    .then(response => console.log(response))
    .catch(error => console.error(error));
```

### Initiating Pesapal Payments

```javascript
const pesapalPaymentDetails = {
    currency: 'KES',
    amount: 1000,
    description: 'Test payment',
    customerEmail: 'customer@example.com',
    customerFirstName: 'John',
    customerLastName: 'Doe',
    phoneNumber: '0712345678',
    countryCode: 'KE'
};

const { orderTrackingId, merchantReference, redirectUrl } = await PayHero.initiatePesapalPayment(pesapalPaymentDetails);
console.log('Pesapal payment initiated:');
console.log('Order Tracking ID:', orderTrackingId);
console.log('Merchant Reference:', merchantReference);
console.log('Redirect URL:', redirectUrl);

// Redirect the user to the Pesapal payment page
you can use the redirectUrl to open it on your app or give users to open and make the payment;
```

### Verifying Pesapal Transactions

```javascript
const paymentStatus = await PayHero.verifyPesapalTransaction('your_order_tracking_id');
console.log('Pesapal transaction status:', paymentStatus);
```

### Retrieving Payment Channels, Banks, Wallet Balances, Transactions, and more

The SDK provides the following additional functions:

- `paymentChannels()`
- `createPaymentChannel(channelDetails)`
- `getBanks()`
- `serviceWalletBalance()`
- `paymentsWalletBalance()`
- `topUpServiceWallet(topUpDetails)`
- `accountTransactions()`
- `transactionStatus(transactionId)`
- `withdraw(withdrawalDetails)`
- `makeWhatsappPayment(whatsappDetails)`

Please refer to the code examples in the previous section for usage.

## Configuration

To use the PayHero Node.js SDK, you need to initialize it with your PayHero and Pesapal API keys:

```javascript
const PayHeroConfig = {
  Authorization: 'your_PayHero_authorization_token',
  pesapalConsumerKey: 'your_pesapal_consumer_key',
  pesapalConsumerSecret: 'your_pesapal_consumer_secret',
  pesapalApiUrl: 'https://payments.pesapal.com/pesapalv3/api', // Sandbox or production URL
  pesapalCallbackUrl: 'https://your-application.com/pesapal-callback',
  pesapalIpnId: 'your_pesapal_ipn_id'
};

const PayHero = new PayHero(PayHeroConfig);
```

## Issues and Contributions

If you encounter any issues with the SDK or have suggestions for improvements, feel free to [open an issue](https://github.com/moore100/PayHero-wrapper/issues) on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.