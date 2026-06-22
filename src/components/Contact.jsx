import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  return (
    <section id="contact">
      <h2>Vamos conversar?</h2>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Estou disponível para novos projetos, freelances ou oportunidades de trabalho.</p>
      <div className="contact-links">
        <a href="https://github.com/jose-c-web" target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
        <a href="https://linkedin.com/in/seu-perfil" target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn</a>
        <a href="mailto:seu-email@email.com"><FaEnvelope /> Email</a>
      </div>
    </section>
  );
}