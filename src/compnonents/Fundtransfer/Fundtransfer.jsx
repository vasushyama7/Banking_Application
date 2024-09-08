import React, { useEffect } from 'react';
import styles from './Fundtransfer.module.css';

const Fundtransfer = () => {
  useEffect(() => {
    localStorage.setItem("loading", "false");
  }, []);

  return (
    <div className={styles.FundsContainer}>
      <hr className={styles.horizontalLine} />
      <form className={styles.fundsForm}>
        <div className={styles.formItem}>
          <label className={styles.label} htmlFor="accountNumber">Account Number</label>
          <input type="text" id="accountNumber" placeholder="Enter Recipient Account Number" required className={styles.antInput} />
        </div>
        <div className={styles.formItem}>
          <label className={styles.label} htmlFor="ifscCode">IFSC Code</label>
          <input type="text" id="ifscCode" placeholder="Enter IFSC Code" required className={styles.antInput} />
        </div>
        <div className={styles.formItem}>
          <label className={styles.label} htmlFor="amount">Amount</label>
          <input type="text" id="amount" placeholder="Enter Amount" required className={styles.antInput} />
        </div>
        <div className={styles.formItem}>
          <button type="submit" className={styles.button}>Continue</button>
        </div>
      </form>
    </div>
  );
}

export default Fundtransfer;
