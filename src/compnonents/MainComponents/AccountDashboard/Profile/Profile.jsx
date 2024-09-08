import React, { useEffect, useState } from "react";
import './Profile.css';

export const Profile = () => {
  const [Accountdata,setAccountData] = useState(JSON.parse(localStorage.getItem("AccountHolderData")))

    return (
        <div>
            <div className="profile-container">
                <div class="container">
                    <header>
                        <h1>Account Information</h1>
                        <nav>
                            <ul>
                                <li><a href="#" >Accounts</a></li>
                                <li><a href="#"  >Transactions</a></li>
                                <li><a href="#">Bill Pay</a></li>
                                <li><a href="#">Fund Transfer</a></li>
                                <li><a href="#">Alerts</a></li>
                            </ul>
                        </nav>
                    </header>

                    <main>
                        <section class="personal-details">
                            <inline>
                                <fieldset>
                            <h2>Personal Details</h2>
                           <strong> <p>Name: {Accountdata.Name}</p>
                           <p>Account ID : {Accountdata.Account_id}</p>
                            <p>Email: {Accountdata.Email}</p>
                            <p>Address : {Accountdata.Address}</p>
                            </strong>
                            </fieldset>

                            </inline>
                        </section>


                        <section class="account-summary">
                           <inline>
                            <fieldset>
                            <h2>Account </h2>
                            <div class="account-details">
                                <div class="account-info">
                                    <h3>Available Balance</h3>
                                    <p style={{fontSize:"35px"}}><strong>Rs. {Accountdata.Balance}</strong></p>
                                </div>
                                
                            </div>
                            </fieldset>
                            </inline>
                        </section>

                        <section class="recent-transactions">
                            
                            <h2>Recent Transactions</h2>
                            <table style={{color:"black"}}>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Receiver A/C</th>
                                        <th>Tnx type</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Avl. Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Accountdata.transactions.map((item)=>{
                                        return(
                                            <tr>
                                        <td>{item.Date.slice(0,10)}</td>
                                        <td>{item.ReceiverAccountId}</td>
                                        <td>{item.TransactionType}</td>
                                        <td>{item.Amount}</td>
                                        <td>{item.Status}</td>
                                        <td>{item.Balance}</td>
                                    </tr>
                                        )
                                    })}
                            
                                </tbody>
                            </table>
                            
                        </section>


                    </main>
                </div>


            </div>


            <div>

            </div>




        </div>
    );
};
export default Profile;
