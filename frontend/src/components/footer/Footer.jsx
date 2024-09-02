import React from "react";
import "./Footer.css";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-info">
        <div className="footer-contact">
          <h3>Contato</h3>
          <p>Endereço da Empresa</p>
          <p>Telefone de Contato</p>
          <p>Email de Suporte</p>
        </div>
        <div className="footer-links">
          <h3>Links Úteis</h3>
          <ul>
            <li><a href="#">Sobre Nós</a></li>
            <li><a href="#">Serviços</a></li>
            <li><a href="#">Política de Privacidade</a></li>
            <li><a href="#">Termos de Serviço</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <h3>Redes Sociais</h3>
          <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
        </div>
        <div className="footer-newsletter">
          <h3>Assine nossa Newsletter</h3>
          <input type="email" placeholder="Digite seu email aqui" />
          <button>Inscrever</button>
        </div>
      </div>
      <div className="footer-copyright">
        <p>&copy; 2024 Fabio Filho. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
