import { useState } from "react";

export default function Projects() {
  const [expandido, setExpandido] = useState(false);
  const [estaFechando, setEstaFechando] = useState(false);

  const meusProjetos = [
    {
      title: "GeTech Site",
      description: "Plataforma web desenvolvida para exibição de serviços tecnológicos e design responsivo.",
      tech: "HTML · CSS · JavaScript",
      image: "../assets/IMG/GeTech.png",
      link: "https://jose-c-web.github.io/GeTech/"
    },
    {
      title: "Flix Box",
      description: "FlixBox é uma plataforma de séries simulado (não funcional)",
      tech: "HTML · CSS · JavaScript",
      image: "../assets/IMG/FlixBox.png", 
      link: "https://jose-c-web.github.io/FlixBox/"
    },
    {
      title: "Ana Doces",
      description: "Ana Doces é um site de culinária que foi um dos primeiros projetos feito",
      tech: "HTML · CSS",
      image: "../assets/IMG/Ana_Doces.png", 
      link: "https://jose-c-web.github.io/Ana_Doces/"
    }
  ];

  const projetosVisiveis = expandido || estaFechando ? meusProjetos : meusProjetos.slice(0, 2);

  const lidarComClique = () => {
    if (expandido) {
      setEstaFechando(true); 
      setTimeout(() => {
        setExpandido(false);
        setEstaFechando(false);
        document.querySelector("#projects").scrollIntoView({ behavior: 'smooth' });
      }, 350); 
    } else {
      setExpandido(true);
    }
  };

  return (
    <section id="projects">
      <h2 className="section-title">Meus Projetos</h2>
      
      <div className="projects-grid">
        {projetosVisiveis.map((projeto, index) => {
          const ehExtra = index >= 2;
          const classeAnimacao = ehExtra && estaFechando ? "closing" : "";

          return (
            <div className={`project-card ${classeAnimacao}`} key={index}>
              {projeto.image && (
                <div className="card-img">
                  <img src={projeto.image} alt={projeto.title} />
                </div>
              )}

              <div className="card-body">
                <div>
                  <h3>{projeto.title}</h3>
                  <p>{projeto.description}</p>
                  <p style={{ color: 'var(--primary)', marginBottom: '2rem' }}>
                    <small>{projeto.tech}</small>
                  </p>
                </div>
                
                <div className="project-links">
                  {/* Forçado o link a utilizar a variável de cor global customizável */}
                  <a href={projeto.link} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>
                    Ver Repositório &rarr;
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {meusProjetos.length > 2 && (
        <div className="ver-mais-container">
          <button className="btn-ver-mais" onClick={lidarComClique}>
            {expandido ? "Ver menos" : "Ver mais"}
          </button>
        </div>
      )}
    </section>
  );
}