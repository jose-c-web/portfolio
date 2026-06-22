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

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Atualiza as variáveis CSS globais com a posição exata do cursor na tela
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Limpa o evento ao desmontar o componente para otimizar performance
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

      {/* PAINEL FLUTUANTE DE CUSTOMIZAÇÃO DE CORES */}
      <div className={`GerenciadorCores ${menuAberto ? "aberto" : ""}`}>
        <button 
          className="botao-engrenagem" 
          onClick={() => setMenuAberto(!menuAberto)}
          title="Customizar Cores"
        >
          {menuAberto ? "×" : "⚙️"}
        </button>

        <div className="conteudo-cores">
          <h4>Cor de Destaque</h4>
          <div className="grid-paletas">
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
      </div>
    </>
  );
}