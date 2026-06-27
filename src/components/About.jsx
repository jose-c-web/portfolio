import fotoPerfil from '../assets/IMG/foto-perfil.webp';

export default function About() {
  return (
    <section id="about" className="font-style-custom">
      <div className="about-content">
        <div className="about-text">
          <p className="greeting">{"// Olá mundo"}</p>
          <h3>Olá, eu sou o <span style={{ color: 'var(--primary)' }}>José</span></h3>
          <p>Desenvolvedor Front-end especializado em construir experiências digitais incríveis. Apaixonado por transformar ideias em códigos limpos, eficientes e visualmente impactantes usando React, JavaScript e CSS moderno.</p>
          <p><strong>Habilidades:</strong> HTML5, CSS3, JavaScript (ES6+), React.js, Git e GitHub.</p>
        </div>
        
        <div className="profile-wrapper">
          <img src={fotoPerfil} alt="Perfil" className="profile-pic" />
        </div>
      </div>
    </section>
  );
}