export default function About() {
  return (
    <section id="about">
      <div className="about-content">
        <div className="about-text">
          <h3>Olá, eu sou o <span className="highlight">José</span></h3>
          <p>Desenvolvedor Front-end especializado em construir experiências digitais incríveis. Apaixonado por transformar ideias em códigos limpos, eficientes e visualmente impactantes usando React, JavaScript e CSS moderno.</p>
          <p><strong>Habilidades:</strong> HTML5, CSS3, JavaScript (ES6+), React.js, Git e GitHub.</p>
        </div>
        {/* Adicione uma foto sua na pasta assets ou use uma imagem temporária abaixo */}
        <img src="./src/assets/IMG/foto-perfil.webp" alt="Foto de Perfil" className="profile-pic" />
      </div>
    </section>
  );
}