import React, { useState } from "react";
import styles from "./SideNav.module.css";
import codeSandBoxIcon from "../../assets/icons/codeSandBox.svg";
import layoutIcon from "../../assets/icons/layout.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import settingsIcon from "../../assets/icons/settings.svg";
import databaseIcon from "../../assets/icons/database.svg";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutModal from "../LogoutModal/LogoutModal";
function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.mainSection}>
      <div className={styles.topSection}>
        <div className={`${styles.iconPlusText} ${styles.projectTitle}`}>
          <img src={codeSandBoxIcon} alt="Icon" />
          <p>Pro Manage</p>
        </div>
        <div
          onClick={() => navigate("/board")}
          className={
            location.pathname === "/board"
              ? `${styles.iconPlusText} ${styles.pageBtn} ${styles.active}`
              : `${styles.iconPlusText} ${styles.pageBtn}`
          }
        >
          <img src={layoutIcon} alt="Icon" />
          <p>Board</p>
        </div>
        <div
          onClick={() => navigate("/analytics")}
          className={
            location.pathname === "/analytics"
              ? `${styles.iconPlusText} ${styles.pageBtn} ${styles.active}`
              : `${styles.iconPlusText} ${styles.pageBtn}`
          }
        >
          <img src={databaseIcon} alt="Icon" />
          <p>Analytics</p>
        </div>
        <div
          onClick={() => navigate("/settings")}
          className={
            location.pathname === "/settings"
              ? `${styles.iconPlusText} ${styles.pageBtn} ${styles.active}`
              : `${styles.iconPlusText} ${styles.pageBtn}`
          }
        >
          <img src={settingsIcon} alt="Icon" />
          <p>Settings</p>
        </div>
      </div>
      <div
        className={`${styles.iconPlusText} ${styles.logout}`}
        onClick={handleOpenModal}
      >
        <img src={logoutIcon} alt="Icon" />
        <p>Log out</p>
      </div>
      <LogoutModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default SideNav;
