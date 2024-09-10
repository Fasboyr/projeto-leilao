import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Logout from "../../logout/logout";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [languageMenuVisible, setLanguageMenuVisible] = useState(false);
  const currentLanguage = i18n.language;

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setLanguageMenuVisible(false); // Fecha o menu após a troca de idioma
  };

  const toggleLanguageMenu = () => {
    setLanguageMenuVisible(!languageMenuVisible);
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
          <li>
            <button className={styles.languageButton} onClick={toggleLanguageMenu}>
              {currentLanguage.toUpperCase()}
            </button>
            {languageMenuVisible && (
              <ul className={styles.languageMenu}>
                <li onClick={() => changeLanguage('pt')}>PT</li>
                <li onClick={() => changeLanguage('en')}>EN</li>
              </ul>
            )}
          </li>
          <li><Link className={styles.headerNavLink} to="/profile"><i className="fas fa-user"></i></Link></li>
          <li><Logout /></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
