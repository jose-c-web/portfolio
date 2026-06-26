import { useEffect, useState } from 'react';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Certificados from './components/Certificados';
import Contact from './components/Contact'; 
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [menuAberto, setMenuAberto] = useState(false);

  // Estados dos novos efeitos visuais
  const [lanternaAtiva, setLanternaAtiva] = useState(true);
  const [animacoesAtivas, setAnimacoesAtivas] = useState(true);
  const [nivelBlur, setNivelBlur] = useState(8); // Padrão do seu CSS

  // Lista de cores que combinam com o fundo dark
  const cores = [
    { nome: "Azul Moderno", valor: "#4b80e2" },
    { nome: "Verde Neon", valor: "#10b981" },
    { nome: "Roxo Holográfico", valor: "#a855f7" },
    { nome: "Rosa Choque", valor: "#f43f5e" },
    { nome: "Ciano Cyberpunk", valor: "#06b6d4" },
    { nome: "Laranja Vivo", valor: "#f97316" }
  ];

  // Função que muda a variável global do CSS (--primary)
  const mudarCorPrincipal = (hexColor) => {
    document.documentElement.style.setProperty('--primary', hexColor);
  };

  // Efeito 1: Atualiza variáveis de efeitos dinâmicos (Lanterna, Blur e Animações)
  useEffect(() => {
    const root = document.documentElement;

    // Controla opacidade da lanterna
    root.style.setProperty('--lanterna-opacity', lanternaAtiva ? '1' : '0');

    // Controla o desfoque do Glassmorphism
    root.style.setProperty('--card-blur', `${nivelBlur}px`);

    // Adiciona classe global para travar animações
    if (!animacoesAtivas) {
      document.body.classList.add('disable-animations');
    } else {
      document.body.classList.remove('disable-animations');
    }
  }, [lanternaAtiva, animacoesAtivas, nivelBlur]);

  // Efeito 2: Captura o movimento do mouse
  useEffect(() => {
    const handleMouseMove = (event) => {
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <Header />
      <About />
      <Projects />
      <Certificados />
      <Contact />
      <Footer />

      {/* PAINEL FLUTUANTE DE CUSTOMIZAÇÃO AVANÇADA */}
      <div className={`GerenciadorCores ${menuAberto ? "aberto" : ""}`}>
        <button 
          className="botao-engrenagem" 
          onClick={() => setMenuAberto(!menuAberto)}
          title="Customizar Interface"
        >
          {menuAberto ? "×" : "⚙️"}
        </button>

        <div className="conteudo-cores" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* SEÇÃO 1: CORES */}
          <div>
            <h4>Cor de Destaque</h4>
            <div className="grid-paletas" style={{ marginTop: '8px' }}>
              {cores.map((cor, index) => (
                <button
                  key={index}
                  className="item-cor"
                  style={{ backgroundColor: cor.valor }}
                  onClick={() => mudarCorPrincipal(cor.valor)}
                  title={cor.nome}
                />
              ))}
            </div>
          </div>

          <hr style={{ border: '0', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }} />

          {/* SEÇÃO 2: INTERRUPTORES DE EFEITOS */}
          <div>
            <h4 style={{ marginBottom: '10px' }}>Efeitos Visuais</h4>
            
            {/* Lanterna */}
            <div style={styles.controlRow}>
              <span>Lanterna Mouse</span>
              <input 
                type="checkbox" 
                checked={lanternaAtiva} 
                onChange={(e) => setLanternaAtiva(e.target.checked)} 
                style={styles.checkbox}
              />
            </div>

            {/* Animações */}
            <div style={styles.controlRow}>
              <span>Animações</span>
              <input 
                type="checkbox" 
                checked={animacoesAtivas} 
                onChange={(e) => setAnimacoesAtivas(e.target.checked)}
                style={styles.checkbox}
              />
            </div>

            {/* Intensidade do Desfoque */}
            <div style={{ ...styles.controlRow, flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Efeito Vidro</span>
                <span style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>{nivelBlur}px</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="24" 
                value={nivelBlur} 
                onChange={(e) => setNivelBlur(Number(e.target.value))}
                style={styles.slider}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

// Estilos auxiliares para estruturar os novos inputs organizadamente dentro do painel
const styles = {
  controlRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.85rem',
    color: '#a9a9a9',
    marginBottom: '10px'
  },
  checkbox: {
    cursor: 'pointer',
    accentColor: 'var(--primary)',
    width: '16px',
    height: '16px'
  },
  slider: {
    width: '100%',
    cursor: 'pointer',
    accentColor: 'var(--primary)'
  }
};