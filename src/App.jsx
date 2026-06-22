import { useEffect } from 'react';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact'; // ou seu componente de formulário
import Footer from './components/Footer';
import './App.css';

export default function App() {
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
      <Contact />
      <Footer />
      
    </>
  );
} 