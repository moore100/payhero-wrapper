import axios from "axios";
import crypto from 'crypto';

class PayHero {
  constructor(config) {
    this.Authorization = config.Authorization;
    this.baseUrl = "https://backend.payhero.co.ke/api/v2/";
    this.pesapalConfig = {
      consumerKey: config.pesapalConsumerKey,
      consumerSecret: config.pesapalConsumerSecret,
      apiUrl: config.pesapalApiUrl,
      callbackUrl: config.pesapalCallbackUrl,
      ipnId: config.pesapalIpnId
    };
  }

  async makeStkPush(details) {
    try {
      const response = await axios.post(`${this.baseUrl}payments`, details, {
        headers: {
          Authorization: this.Authorization,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //get service wallet balance
  async serviceWalletBalance() {
    try {
      const response = await axios.get(
        `${this.baseUrl}wallets?wallet_type=service_wallet`,
        {
          headers: {
            Authorization: this.Authorization,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //get wallet balance
  async paymentsWalletBalance() {
    try {
      const response = await axios.get(
        `${this.baseUrl}wallets?wallet_type=payment_wallet`,
        {
          headers: {
            Authorization: this.Authorization,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //top up service wallet
  async topUpServiceWallet(details) {
    try {
      const response = await axios.post(`${this.baseUrl}topup`, details, {
        headers: {
          Authorization: this.Authorization,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //get account transactions
  async accountTransactions() {
    try {
      const response = await axios.get(`${this.baseUrl}transactions`, {
        headers: {
          Authorization: this.Authorization,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //get transaction status
  async transactionStatus(transactionId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}transaction-status?reference=${transactionId}`,
        {
          headers: {
            Authorization: this.Authorization,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //get payment channels
  async paymentChannels() {
    try {
      const response = await axios.get(`${this.baseUrl}payment_channels`, {
        headers: {
          Authorization: this.Authorization,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //create a payment channel
  async createPaymentChannel(details) {
    try {
      const response = await axios.post(
        `${this.baseUrl}payment_channels`,
        details,
        {
          headers: {
            Authorization: this.Authorization,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //get banks
  async getBanks() {
    try {
      const response = await axios.get(`${this.baseUrl}bank_paybills`, {
        headers: {
          Authorization: this.Authorization,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //withdraw to mobile
  async withdraw(details) {
    try {
      const response = await axios.post(
        `${this.baseUrl}withdraw`,
        details,
        {
          headers: {
            Authorization: this.Authorization,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //whatsapp payments
  async makeWhatsappPayment(details) {
    try {
      const response = await axios.post(
        `${this.baseUrl}whatspp/sendText`,
        details,
        {
          headers: {
            Authorization: this.Authorization,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // Function to initiate Pesapal payment
  async initiatePesapalPayment(paymentDetails) {
    try {
      const pesaPalService = new PesaPalService(this.pesapalConfig);
      const { orderTrackingId, merchantReference, redirectUrl } = await pesaPalService.initiatePayment(paymentDetails);
     
      return {
        orderTrackingId,
        merchantReference,
        redirectUrl
      };
    } catch (error) {
      throw new Error(`Pesapal Payment Initiation Error: ${error.message}`);
    }
  }

  // Function to verify Pesapal transaction
  async verifyPesapalTransaction(orderTrackingId) {
    try {
      const pesaPalService = new PesaPalService(this.pesapalConfig);
      const paymentStatus = await pesaPalService.checkPaymentStatus(orderTrackingId);
      return paymentStatus;
    } catch (error) {
      throw new Error(`Pesapal Transaction Verification Error: ${error.message}`);
    }
  }
}

class PesaPalService {
    constructor(config) {
        this.consumerKey = config.consumerKey;
        this.consumerSecret = config.consumerSecret;
        this.apiUrl = config.apiUrl; // Sandbox or production URL
        this.callbackUrl = config.callbackUrl;
        this.ipnId = config.ipnId; // Your registered IPN ID
    }

    /**
     * Generate authentication token
     * @returns {Promise<string>} Authentication token
     */
    async generateAuthToken() {
        try {
            const response = await axios.post(`${this.apiUrl}/api/Auth/RequestToken`, {
                consumer_key: this.consumerKey,
                consumer_secret: this.consumerSecret
            });
            return response.data.token;
        } catch (error) {
            throw new Error(`Auth Token Error: ${error.message}`);
        }
    }

    /**
     * Register IPN URL (Should be called once during setup)
     * @returns {Promise<Object>} IPN registration response
     */
    async registerIPN() {
        try {
            const token = await this.generateAuthToken();
            const response = await axios.post(
                `${this.apiUrl}/api/URLSetup/RegisterIPN`,
                {
                    url: this.callbackUrl,
                    ipn_notification_type: 'GET'
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            response.data;
            return console.log(response.data)
        } catch (error) {
            throw new Error(`IPN Registration Error: ${error.message}`);
        }
    }

    /**
     * Initiate a payment
     * @param {Object} paymentDetails - Payment details
     * @returns {Promise<Object>} Payment initiation response
     */
    async initiatePayment(paymentDetails) {
        try {
            const token = await this.generateAuthToken();
            
            const orderData = {
                id: crypto.randomUUID(),
                currency: paymentDetails.currency,
                amount: paymentDetails.amount,
                description: paymentDetails.description,
                callback_url: this.callbackUrl,
                notification_id: this.ipnId,
                billing_address: {
                    email_address: paymentDetails.customerEmail,
                    phone_number: paymentDetails.phoneNumber,
                    first_name: paymentDetails.customerFirstName,
                    last_name: paymentDetails.customerLastName,
                    country_code: paymentDetails.countryCode || 'KE'
                }
            };

            const response = await axios.post(
                `${this.apiUrl}/api/Transactions/SubmitOrderRequest`,
                orderData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            return {
                orderTrackingId: response.data.order_tracking_id,
                merchantReference: response.data.merchant_reference,
                redirectUrl: response.data.redirect_url
            };
        } catch (error) {
            throw new Error(`Payment Initiation Error: ${error.message}`);
        }
    }

    /**
     * Check payment status
     * @param {string} orderTrackingId - Order tracking ID
     * @returns {Promise<Object>} Payment status
     */
    async checkPaymentStatus(orderTrackingId) {
        try {
            const token = await this.generateAuthToken();
            
            const response = await axios.get(
                `${this.apiUrl}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            return {
                status: response.data.status_code,
                paymentMethod: response.data.payment_method,
                amount: response.data.amount,
                currency: response.data.currency,
                createdDate: response.data.created_date,
                confirmationCode: response.data.confirmation_code,
                paymentAccount: response.data.payment_account,
                merchantReference: response.data.merchant_reference
            };
        } catch (error) {
            throw new Error(`Payment Status Check Error: ${error.message}`);
        }
    }

    /**
     * Process IPN callback
     * @param {Object} queryParams - Query parameters from callback URL
     * @returns {Promise<Object>} Payment status
     */
    async processIPNCallback(queryParams) {
        try {
            const { OrderTrackingId, OrderMerchantReference } = queryParams;
            return await this.checkPaymentStatus(OrderTrackingId);
        } catch (error) {
            throw new Error(`IPN Processing Error: ${error.message}`);
        }
    }
}

export default PayHero;