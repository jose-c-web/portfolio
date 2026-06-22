export default function Projects() {
  // Array de objetos em JavaScript simulando seus projetos
  const meusProjetos = [
    {
      title: "GeTech Site",
      description: "Plataforma web desenvolvida para exibição de serviços tecnológicos e design responsivo.",
      tech: "React · CSS Modules",
      image: "./src/assets/IMG/GeTech.png",
      link: "https://jose-c-web.github.io/GeTech/site/Site%20C/pages/index.html"
    },
    {
      title: "Flix Box",
      description: "FlixBox é uma plataforma de séries simulado (não funcional)",
      tech: "HTML · CSS · JavaScript",
      image: "./src/assets/IMG/FlixBox.png", // Adicionado link temporário para não quebrar o segundo card
      link: "https://jose-c-web.github.io/FlixBox/"
    }
  ];

  return (
    <section id="projects">
      {/* Classe para ativar o estilo do título do seu CSS */}
      <h2 className="section-title">Meus Projetos</h2>
      
      <div className="projects-grid">
        {meusProjetos.map((projeto, index) => (
          <div className="project-card" key={index}>
            
            {/* Bloco da Imagem (Ativa a classe .card-img do seu CSS) */}
            {projeto.image && (
              <div className="card-img">
                <img src={projeto.image} alt={projeto.title} />
              </div>
            )}

            {/* Bloco do Conteúdo (Ativa a classe .card-body do seu CSS) */}
            <div className="card-body">
              <div>
                <h3>{projeto.title}</h3>
                <p>{projeto.description}</p>
                <p style={{ color: '#38bdf8', marginBottom: '1rem' }}>
                  <small>{projeto.tech}</small>
                </p>
              </div>
              
              <div className="project-links">
                <a href={projeto.link} target="_blank" rel="noreferrer">Ver Repositório &rarr;</a>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}