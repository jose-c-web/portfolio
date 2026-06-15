export default function Projects() {
  // Array de objetos em JavaScript simulando seus projetos
  const meusProjetos = [
    {
      title: "GeTech Site",
      description: "Plataforma web desenvolvida para exibição de serviços tecnológicos e design responsivo.",
      tech: "React · CSS Modules",
      link: "https://github.com/seu-usuario/GeTech"
    },
    {
      title: "E-Commerce Dashboard",
      description: "Painel de controle administrativo com gráficos em tempo real e gerenciamento de estoque.",
      tech: "React · JavaScript · Chart.js",
      link: "#"
    }
  ];

  return (
    <section id="projects">
      <h2>Meus Projetos</h2>
      <div className="projects-grid">
        {meusProjetos.map((projeto, index) => (
          <div className="project-card" key={index}>
            <h3>{projeto.title}</h3>
            <p>{projeto.description}</p>
            <p style={{ color: '#38bdf8', marginBottom: '1rem' }}><small>{projeto.tech}</small></p>
            <div className="project-links">
              <a href={projeto.link} target="_blank" rel="noreferrer">Ver Repositório &rarr;</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}