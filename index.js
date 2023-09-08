import { accounts, transactions, monthly_rates } from "./data.js";
/*
    =================================================
    Please read the questions carefully
    Each function should return its corresponding question's answer
    =================================================
*/
//  =================================================
/* 
    #1. Return a list containing the total transactional value of every 
    account in order of ascending account ID.
    note: to calculate the rate adjusted value of a given transaction, 
    find the rate that was effective on the transaction's book_date and 
    multiply the rate's multiplier by the transaction's value.
    Please round the (rate-adjusted) transactional values DOWN to the nearest integer. Hint: use floor().
   
    - Example:
        
        1. Let's consider the second transaction for account_id = 2: {sequence_number: 2, book_date: "2020-04-03", account_id: 2, value: 142592} 
        2. We see that the rate that was effective on 2020-04-03 is 1.3
        3. Therefore, its rate adjusted value = multiplier * value = 1.3 * 142592
       
*/

export const adjustedTransactionalValues = () => {
    accounts.sort((a, b) => a.id - b.id);
    let retArray = new Array(accouts.length).fill(0);

    transactions.sort((a, b) => new Date(a.book_date) - new Date(b.book_date));
    monthly_rates.wort((a, b) => new Date(a.effective_date) - new Date(b.effective_date));
    let rate = monthly_rates[0].multiplier;
    let c = 0;

    for (const transaction of transactions) {
        //console.log(transaction);
        if (transaction.book_date > monthly_rates[c + 1].effective_date) {
            c++;
            rate = monthly_rates[c].multiplier;
        }
        val = floor(transaction.value * rate);
        retArray[transaction.account_id - 1] += val;
    }
    return retArray;
};

//  =================================================
/*
    #2. Return an array containing only the out-of-sequence transactions for a given accountId.
    Note: a transaction is out of sequence if its book date is earlier than any preceding transaction when ordered by sequence number.
    Please return your answer in an array its elements are the out-of-sequence transactions.
*/
export const getOutOfSequenceByAccountId = (accountId) => {
    let retArray = [];
    transactions.sort((a, b) => a.sequence_number - b.sequence_number);
    let curdate = transactions[0].book_date;

    for (const transaction of transactions) {
        if (transaction.account_id == accountId) {
            if (transaction.book_date < curdate) {
                retArray.push(transaction);
            } else {
                curdate = transaction.book_date;
            }
        }
    }
    return retArray;
};

//  =================================================
/* 
    #3. Return a copy of the transactions list where the out of sequence transactions are corrected.
    Please return your answer in an array its elements are the transactions with the out-of-sequence transactions that are corrected per account_id.
*/
export const getCorrectedTransactions = () => {
    
    let retArray = [];
    accounts.sort((a, b) => a.id - b.id);
    let minId = accounts[0].id;
    let maxId = accounts[accounts.length - 1].id;

    for(let i = minId; i <= maxId; i++){
        transactionsAccount = [];
        for (const transaction of transactions) {
            if (transaction.account_id == i) {
                transactionsAccount.push(transaction);
            }
        }
        transactionsAccount.sort((a, b) =>new Date(a.book_date) - new Date(b.book_date));
        for(let i = 0; i < transactionsAccount.length; i++){
            transactionsAccount[i].sequence_number = i + 1;
        }
        let outOfSequenceTransactions = getOutOfSequenceByAccountId(i);

        for(const outOfSeqTransaction of outOfSequenceTransactions){
            for(const transaction of transactionsAccount){
                if(transaction.book_date == outOfSeqTransaction.book_date && transaction.value == outOfSeqTransaction.value &&
                    transaction.accountId == outOfSeqTransaction.accountId){
                    retArray.push(transaction);
                    break;
                }
            }
        }
    }
    return retArray;
};

//  =================================================
/*
    4 - Return an array of objects where the property of each object is
      {
        date: "YYYY-MM",
        average: average_value,
        max:[max_transaction.value, max_transaction.sequence_number, max_transaction.account.name],
      }

    date: the corresponding date to the average_value and the max value in this form year-month ("2020-02", "2020-06", ....)
    average_value: represents the average of all transactional values in the specific month (round the transactional values DOWN to the nearest integer - use floor())
    max: an array of elements that are the max transactional value of that specific month with its corresponding value of sequence_number and account.name


    Example:
    [obj1, obj2, .......]
    obj1 = {
             date:"2020-01",
             average: 23542,
             max:[3423, 1, "ACME Co."]
           }

*/
export const getAvgMaxValues = () => {}
