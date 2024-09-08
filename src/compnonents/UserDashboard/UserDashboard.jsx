import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import CountUp from "react-countup";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyCheckAlt,
  faFileInvoiceDollar,
  faExchangeAlt,
  faUser,
  faBell,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "antd";

const UserDashboard = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [accountHolder, setAccountHolder] = useState({});
  const [totalCreditAmount, setTotalCreditAmount] = useState(0);
  const [totalDebitAmount, setTotalDebitAmount] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const navigate = useNavigate()
  const showTransactionDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, "dd-MM-yyyy");
    setCurrentDate(formattedDate);

    const fetchData = async () => {
      try {
        const accountHolderData = JSON.parse(
          localStorage.getItem("accountholder")
        );
        if (accountHolderData) {
          setAccountHolder(accountHolderData);
          setAvailableBalance(accountHolderData.Balance || 0);

          const response = await axios.get(
            `https://zigma-backend-fp8b.onrender.com/users/transactions/${accountHolderData.Account_id}`
          );
          setTotalCreditAmount(response.data.totalCreditAmount);
          setTotalDebitAmount(response.data.totalDebitAmount);
          const bal = await axios.get(
            `https://zigma-backend-fp8b.onrender.com/admin/useraccount/${accountHolderData.Account_id}`
          );
          setAvailableBalance(bal.data.Balance);

          axios
            .get(
              `https://zigma-backend-fp8b.onrender.com/users/getallusertransactions/${accountHolderData.Account_id}`
            )
            .then((res) => {
              setTransactions(res.data);
              console.log(res.data);
            })
            .catch((err) => setTransactions([]));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const location = useLocation();
  const { state } = location;
  const { email, name, subject } = state || {};

  const handleViewMore = () => {
    navigate("/transactions");
  };

  return (
    <div className="userdashboard-main-container">
      <hr className="horizontal-line" />
      <div className="account-info">
        <div>
          <p className="info-card">{currentDate}</p>
          <p>AccountID: {accountHolder.Account_id}</p>
          <p>Name: {`${accountHolder.FirstName} ${accountHolder.LastName}`}</p>
        </div>
        <div className="in-out-amount-cards">
          <div className="account-info-card">
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="dots bg-green"></div> In Amount
            </p>
            <div>
              <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
              <span style={{ fontSize: "35px" }}>
                <CountUp
                  start={0}
                  end={totalCreditAmount}
                  duration={1.6}
                  separator=","
                />
              </span>
            </div>
          </div>
          <div className="account-info-card">
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="dots bg-yellow"></div> Out Amount
            </p>
            <div>
              <i className="fa-solid fa-indian-rupee-sign"></i>
              <span style={{ fontSize: "35px" }}>
                <CountUp
                  start={0}
                  end={totalDebitAmount}
                  duration={2}
                  separator=","
                />
              </span>
            </div>
          </div>
        </div>

        <div className="balance-info-card ">
          <p>Avl Balance :</p>
          <div>
            <div>
              <i className="fa-solid fa-indian-rupee-sign"></i>
              <span style={{ fontSize: "32px" }}>
                <strong>
                  <CountUp
                    start={0}
                    end={availableBalance}
                    duration={3}
                    separator=","
                  />
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="quick-actions">
        <div className="quick-action">
          <FontAwesomeIcon
            style={{ fontSize: "30px" }}
            icon={faMoneyCheckAlt}
          />
        </div>
        <div className="quick-action">
          <FontAwesomeIcon
            style={{ fontSize: "30px" }}
            icon={faFileInvoiceDollar}
          />
        </div>
        <div className="quick-action">
          <FontAwesomeIcon style={{ fontSize: "30px" }} icon={faExchangeAlt} />
        </div>
        <div className="quick-action">
          <FontAwesomeIcon style={{ fontSize: "30px" }} icon={faUser} />
        </div>
        <div className="quick-action">
          <FontAwesomeIcon style={{ fontSize: "30px" }} icon={faBell} />
        </div>
        <div className="quick-action">
          <FontAwesomeIcon style={{ fontSize: "30px" }} icon={faCreditCard} />
        </div>
      </div> */}
      <div className="recent-transactions">
        <h2>Recent Transactions</h2>
        <Button type="link" onClick={handleViewMore}>
          Show More
        </Button>
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
            {transactions &&
              transactions.slice(0, 3).map((transaction, index) => (
                <tr key={index}>
                  <td>TNX****{transaction._id.slice(-4)}</td>
                  <td>ZBKIN****{transaction.SenderAccountId.slice(-3)}</td>
                  <td>ZBKIN****{transaction.ReceiverAccountId.slice(-3)}</td>
                  <td>₹{transaction.Amount}</td>
                  <td>{transaction.TransactionType}</td>
                  <td className="transaction">
                    {transaction.Status === "Success" ? (
                      <div className="dot-green"></div>
                    ) : (
                      <div className="dot-red"></div>
                    )}
                    {transaction.Status}
                  </td>
                  <td>{format(new Date(transaction.Date), "dd-MM-yyyy")}</td>
                  <td>
                    <button
                      className="details-button"
                      onClick={() => showTransactionDetails(transaction)}
                    >
                      More
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Modal
        title="Transaction Details"
        visible={modalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            Close
          </Button>,
        ]}
      >
        {selectedTransaction && (
          <div className="transaction-details-modal">
            <p><strong>Tnx ID:</strong> TNX{selectedTransaction._id}</p>
            <p><strong>Sender:</strong> {selectedTransaction.SenderAccountId}</p>
            <p><strong>Receiver:</strong> {selectedTransaction.ReceiverAccountId}</p>
            <p><strong>Amount:</strong> ₹{selectedTransaction.Amount}</p>
            <p><strong>Tnx Type:</strong> {selectedTransaction.TransactionType}</p>
            <p><strong>Status:</strong> {selectedTransaction.Status}</p>
            <p><strong>Date:</strong> {format(
              new Date(selectedTransaction.Date),
              "dd-MM-yyyy HH:mm:ss"
            )}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserDashboard;
