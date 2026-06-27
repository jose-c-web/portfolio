export default function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="font-style-custom">
      <div className="footer-content">
        <h2 className="typing-wrapper typing-footer">
          &lt;/Jose.<span>Web</span>&gt;
        </h2>
        <p className="footer-tagline">Desenvolvendo ideias em código.</p>
      </div>

      <div className="footer-bottom">
        <p>&copy; {anoAtual} Jose.Web. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}