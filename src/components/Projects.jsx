import { useState } from "react";

export default function Projects() {
  const [expandido, setExpandido] = useState(false);
  // Estado para controlar a animação de fechamento
  const [estaFechando, setEstaFechando] = useState(false);

  const meusProjetos = [
    {
      title: "GeTech Site",
      description: "Plataforma web desenvolvida para exibição de serviços tecnológicos e design responsivo.",
      tech: "HTML · CSS · JavaScript",
      image: "./src/assets/IMG/GeTech.png",
      link: "https://jose-c-web.github.io/GeTech/"
    },
    {
      title: "Flix Box",
      description: "FlixBox é uma plataforma de séries simulado (não funcional)",
      tech: "HTML · CSS · JavaScript",
      image: "./src/assets/IMG/FlixBox.png", 
      link: "https://jose-c-web.github.io/FlixBox/"
    },
    {
      title: "Ana Doces",
      description: "Ana Doces é um site de culinária que foi um dos primeiros projetos feito",
      tech: "HTML · CSS",
      image: "./src/assets/IMG/Ana_Doces.png", 
      link: "https://jose-c-web.github.io/Ana_Doces/"
    }
  ];

  // Se estiver expandido OU no meio do processo de fechar, renderiza todos os cards
  const projetosVisiveis = expandido || estaFechando ? meusProjetos : meusProjetos.slice(0, 2);

  const lidarComClique = () => {
    if (expandido) {
      // Se já está aberto e o usuário quer fechar:
      setEstaFechando(true); // Ativa a animação de saída no CSS
      
      // Espera a animação de CSS acabar (350ms) antes de sumir com o card do HTML
      setTimeout(() => {
        setExpandido(false);
        setEstaFechando(false);
        // Rola a tela de volta para o topo dos projetos de forma sutil
        document.querySelector("#projects").scrollIntoView({ behavior: 'smooth' });
      }, 350); 

    } else {
      // Se está fechado, apenas abre direto (a animação de entrada já roda)
      setExpandido(true);
    }
  };

  return (
    <section id="projects">
      <h2 className="section-title">Meus Projetos</h2>
      
      <div className="projects-grid">
        {projetosVisiveis.map((projeto, index) => {
          // Define se este card específico é um dos "extras" (da terceira posição em diante)
          const ehExtra = index >= 2;
          
          // Se for um card extra e o estado de fechamento estiver ativo, adiciona a classe "closing"
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
                  <p style={{ color: '#38bdf8', marginBottom: '2rem' }}>
                    <small>{projeto.tech}</small>
                  </p>
                </div>
                
                <div className="project-links">
                  <a href={projeto.link} target="_blank" rel="noreferrer">Ver Repositório &rarr;</a>
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