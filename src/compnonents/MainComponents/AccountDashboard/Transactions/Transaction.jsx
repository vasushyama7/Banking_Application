import React, { useState } from 'react';
import './Transaction.css';
import { Form, Input, Pagination } from 'antd';

function Transactions() {
  const transactions = [
    {id:1, date: '2024-06-01',accountid:12345678, type: 'Debit', amount: 100,description:'mobile recharge',status:'success', balance: 500 },
    {id:2, date: '2024-06-02',accountid:12345678, type: 'Credit', amount: 200,description:'electricity',status:'success', balance: 700 },
    { id:3,date: '2024-06-02',accountid:12345678, type: 'Credit', amount: 200,description:'mobile recharge',status:'success', balance: 700 },
    { id:4,date: '2024-06-02',accountid:12345678, type: 'Credit', amount: 200,description:'electricity',status:'success', balance: 700 },
    { id:5,date: '2024-06-03',accountid:12345678, type: 'Debit', amount: 150,description:'mobile recharge',status:'success', balance: 550 },
    { id:6,date: '2024-06-04',accountid:12345678, type: 'Credit', amount: 300,description:'electricity',status:'success', balance: 850 },
    { id:7,date: '2024-06-03',accountid:12345678, type: 'Debit', amount: 150,description:'mobile recharge',status:'success', balance: 550 },
    {id:8, date: '2024-06-04',accountid:12345678, type: 'Credit', amount: 300,description:'electricity',status:'success', balance: 850 },
    { id:9,date: '2024-06-01',accountid:12345678, type: 'Debit', amount: 100,description:'mobile recharge',status:'success', balance: 500 },
    { id:10,date: '2024-06-02',accountid:12345678, type: 'Credit', amount: 200,description:'mobile recharge',status:'success', balance: 700 },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 9;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div class="header">
        <h1>Transactions</h1>
      </div>
      
      
        <table>
          <thead>
            <tr>
              <th>Transaction Id</th>
              <th>Date</th>
              <th>Account Id</th>
              <th>Debit/Credit</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Status</th>
              <th>Total balance</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.id}</td>
                <td>{transaction.date}</td>
                <td>{transaction.accountid}</td>
                <td>{transaction.type}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.description}</td>
                <td>{transaction.status}</td>
                <td>{transaction.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            pageSize={transactionsPerPage}
            total={transactions.length}
            onChange={handleChangePage}
          />
        </div>
      </div>
  
  );
}

export default Transactions;
