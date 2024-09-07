import React from 'react';
import styles from './Footer.module.css'; // Importa o CSS module
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInfo}>
        <div className={styles.footerContact}>
          <h3>{t('footer.contact')}</h3>
          <p>{t('footer.address')}</p>
          <p>{t('footer.phone')}</p>
          <p>{t('footer.email')}</p>
        </div>
        <div className={styles.footerLinks}>
          <h3>{t('footer.links')}</h3>
          <ul>
            <li><a href="#">{t('footer.about')}</a></li>
            <li><a href="#">{t('footer.service')}</a></li>
            <li><a href="#">{t('footer.policy')}</a></li>
            <li><a href="#">{t('footer.terms')}</a></li>
          </ul>
        </div>
        <div className={styles.footerSocial}>
          <h3>{t('footer.media')}s</h3>
          <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
        </div>
        <div className={styles.footerNewsletter}>
          <h3>{t('footer.news')}</h3>
          <input type="email" placeholder={t('email')} />
          <button>{t('footer.subscribe')}</button>
        </div>
      </div>
      <div className={styles.footerCopyright}>
        <p>&copy; {t('footer.copy')}</p>
      </div>
    </footer>
  );
}

export default Footer;
