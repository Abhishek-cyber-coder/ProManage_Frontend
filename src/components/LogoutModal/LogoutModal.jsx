import React from "react";
import styles from "./LogoutModal.module.css";
function LogoutModal({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalBackground}></div>
          <div className={styles.modalContent}>
            <div className={styles.modalBox}>
              <p>Are you sure you want to Logout?</p>
              <div className={styles.buttons}>
                <button className={styles.logoutBtn}>Yes, Logout</button>
                <button className={styles.cancelBtn} onClick={onClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LogoutModal;
