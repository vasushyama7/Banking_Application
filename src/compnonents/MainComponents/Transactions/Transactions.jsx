import React, { useEffect, useState } from "react";
import "./Transactions.css";
import { Pagination } from "antd";
import { format } from "date-fns";
import { subDays, subMonths, isWithinInterval } from "date-fns";
import axios from "axios";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionType, setTransactionType] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [accountId, setAccountId] = useState("");
  const transactionsPerPage = 8;

  useEffect(() => {
    const accountHolderData = JSON.parse(localStorage.getItem("accountholder"));
    axios
      .get(`https://zigma-backend-fp8b.onrender.com/users/getallusertransactions/${accountHolderData.Account_id}`)
      .then((res) => {
        setTransactions(res.data);
        setFilteredTransactions(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error fetching transactions:", err);
        setTransactions([]);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [transactionType, dateRange, accountId, transactions]);

  const applyFilters = () => {
    let filtered = transactions;

    if (transactionType) {
      filtered = filtered.filter(
        (transaction) => transaction.TransactionType === transactionType
      );
    }

    if (dateRange) {
      const now = new Date();
      if (dateRange === "lastWeek") {
        filtered = filtered.filter((transaction) =>
          isWithinInterval(new Date(transaction.Date), {
            start: subDays(now, 7),
            end: now,
          })
        );
      } else if (dateRange === "lastMonth") {
        filtered = filtered.filter((transaction) =>
          isWithinInterval(new Date(transaction.Date), {
            start: subMonths(now, 1),
            end: now,
          })
        );
      }
    }

    if (accountId) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.SenderAccountId === accountId ||
          transaction.ReceiverAccountId === accountId
      );
    }

    setFilteredTransactions(filtered);
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const showTransactionDetails = (transaction) => {
    console.log("Show details for transaction:", transaction);
  };

  const closeModal = () => {
    console.log("Close modal");
  };

  return (
    <div className="recent-transactions">
      <h2>Recent Transactions</h2>
      <div className="filter-section">
        <label>
          Transaction Type:
          <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
            <option value="">All</option>
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>
        </label>

        <label>
          Date Range:
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="">All</option>
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
          </select>
        </label>

        <label>
          Account ID:
          <input
            type="text"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            placeholder="Enter Account ID"
          />
        </label>
      </div>

      <table className="recent-transactions">
        <thead>
          <tr>
            <th>Tnx ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Amount</th>
            <th>Tnx Type</th>
            <th>Status</th>
            <th>Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transaction, index) => (
            <tr key={index}>
              <td>TNX****{transaction._id.slice(-4)}</td>
              <td>ZBKIN****{transaction.SenderAccountId.slice(-3)}</td>
              <td>ZBKIN****{transaction.ReceiverAccountId.slice(-3)}</td>
              <td>₹{transaction.Amount}</td>
              <td>{transaction.TransactionType}</td>
              <td className="transaction">
                <div className={transaction.Status === "Success" ? "dot-green" : "dot-red"}></div>
                {transaction.Status}
              </td>
              <td>{format(new Date(transaction.Date), "dd-MM-yyyy")}</td>
              <td>
                <button className="details-button" onClick={() => showTransactionDetails(transaction)}>
                  More
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        className="pagination"
        current={currentPage}
        pageSize={transactionsPerPage}
        total={filteredTransactions.length}
        onChange={handleChangePage}
      />

      <div id="transactionModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeModal()}>&times;</span>
          <div className="transaction-details-modal">
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
