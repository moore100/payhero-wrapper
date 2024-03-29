import axios from 'axios';

class Payhero{
    constructor(Authorization){
        this.Authorization = Authorization;
        this.baseUrl = 'https://backend.payhero.co.ke/api/v2/'
    }
async makeStkPush(details){
    try{
        const response = await axios.post(`${this.baseUrl}payments `, details, {
            headers: {
                Authorization: this.Authorization
            }
        });
        return response.data;   
    }catch(err){
        consoel.log(err);
        throw err;
    }
                
};
//get service wallet balance
async serviceWalletBalance(){
    try{
        const response = await axios.get(`${this.baseUrl}wallets?wallet_type=service_wallet`, {
            headers: {
                Authorization: this.Authorization
            }
        });
        return response.data;   
    }catch(err){
        console.log(err);
        throw err;
    }
};
//get wallet balance
async paymentsWalletBalance(){
    try{
        const response = await axios.get(`${this.baseUrl}wallets?wallet_type=payment_wallet`, {
            headers: {
                Authorization: this.Authorization
            }
        });
        return response.data;   
    }catch(err){
        console.log(err);
        throw err;
    }
};
//top up service wallet 
async topUpServiceWallet(details){
    try{
        const response = await axios.post(`${this.baseUrl}topup`, details, {
            headers: {
                Authorization: this.Authorization
            }
        });
        return response.data;   
    }catch(err){
        console.log(err);
        throw err;
    }
};
//get account transactions
async accountTransactions(){
    try{
        const response = await axios.get(`${this.baseUrl}transactions`, {
            headers: {
                Authorization: this.Authorization
            }
        });
        return response.data;   
    }catch(err){
        console.log(err);
        throw err;
    }
};
//get transaction status
async transactionStatus(transactionId){
    try{
        const response = await axios.get(`${this.baseUrl}transaction-status?reference=${transactionId}`, {
            headers: {
                Authorization: this.Authorization
            }
        });
        return response.data;   
    }catch(err){
        console.log(err);
        throw err;
    }
};

}
export default Payhero;