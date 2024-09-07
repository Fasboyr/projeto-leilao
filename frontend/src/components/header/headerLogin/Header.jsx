import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Logout from "../../logout/logout";
import { useTranslation } from "react-i18next";

const Header = () => {

  const {t, i18n } = useTranslation();

  const changeLanguage = (language) => {
      i18n.changeLanguage(language);
  };

  return (
    <div className={styles.header}>
      <h2>Menu</h2>
      <nav className={styles.navLeft}>
        <ul>
          <li><Link className={styles.headerNavLink} to="/">{t('home')}</Link></li>
          <li><Link className={styles.headerNavLink} to="/change">{t('change.title')}</Link></li>
        </ul>
      </nav>
      <nav className={styles.navRight}>
        <ul>
          <button onClick={() => changeLanguage('pt')} className={styles.languageButton}>Português</button>
          <button onClick={() => changeLanguage('en')} className={styles.languageButton}>English</button>
          <li><Link className={styles.headerNavLink} to="/profile"><i className="fas fa-user"></i></Link></li>
          <li><Logout /></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
