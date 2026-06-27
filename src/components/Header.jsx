export default function Header() {
  return (
    <header className="font-style-custom">
      <h1 className="typing-wrapper typing-header">
        &lt;Jose.<span>Web</span> &gt;
      </h1>
      <nav>
        <a href="#about" className="font-style-custom">Sobre</a>
        <a href="#projects" className="font-style-custom">Projetos</a>
        <a href="#certificates" className="font-style-custom">Certificados</a> 
        <a href="#contact" className="font-style-custom">Contato</a>
      </nav>
    </header>
  );
}