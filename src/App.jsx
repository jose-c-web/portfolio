import { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Certificados from './components/Certificados';
import Contact from './components/Contact'; 
import Footer from './components/Footer';
import './App.css';

// Importação das músicas da playlist
import track1 from './assets/Musics/perdas.mp3';
import track2 from './assets/Musics/dan(sukuna).mp3'; 
import track3 from './assets/Musics/fenix(nova).mp3';

// Estrutura de dados da Playlist Cyberpunk
const PLAYLIST = [
  { id: 0, nome: "Track 01 - Perdas", arquivo: track1 },
  { id: 1, nome: "Track 02 - Dan (Sukuna)", arquivo: track2 },
  { id: 2, nome: "Track 03 - Fênix (Nova)", arquivo: track3 },
];

// Dicionário de Idiomas para a Internacionalização (Ideia 2)
const traducoes = {
  pt: {
    sistemaConectado: "Sistema Conectado",
    corDestaque: "Cor de Destaque",
    tipografia: "Tipografia",
    efeitosSistema: "Efeitos & Sistema",
    lanterna: "Lanterna Mouse",
    animacoes: "Animações",
    particulas: "Partículas Fundo",
    opacidadeVidro: "Opacidade Vidro",
    glitch: "Efeito Glitch",
    cursorCustom: "Cursor Neon",
    trilhaSonora: "Trilha Synthwave",
    idiomaLabel: "Idioma / Language",
    terminalPlaceholder: "Digite /comandos...",
    comandoInvalido: "Comando não reconhecido.",
    sucessoComando: "Executado com sucesso!"
  },
  en: {
    sistemaConectado: "System Connected",
    corDestaque: "Accent Color",
    tipografia: "Typography",
    efeitosSistema: "Effects & System",
    lanterna: "Mouse Flashlight",
    animacoes: "Animations",
    particulas: "Background Particles",
    opacidadeVidro: "Glass Opacity",
    glitch: "Glitch Effect",
    cursorCustom: "Neon Cursor",
    trilhaSonora: "Synthwave Track",
    idiomaLabel: "Language / Idioma",
    terminalPlaceholder: "Type /commands...",
    comandoInvalido: "Command not recognized.",
    sucessoComando: "Executed successfully!"
  }
};

export default function App() {
  const [menuAberto, setMenuAberto] = useState(false);

  // Estados Base Anteriores
  const [lanternaAtiva, setLanternaAtiva] = useState(true);
  const [animacoesAtivas, setAnimacoesAtivas] = useState(true);
  const [nivelBlur, setNivelBlur] = useState(8);
  const [fonteSelecionada, setFonteSelecionada] = useState("'Poppins', sans-serif");
  const [particulasAtivas, setParticulasAtivas] = useState(true);
  const [contadorVisitas, setContadorVisitas] = useState(1337);

  // NOVOS ESTADOS DAS 5 IDEIAS
  const [idioma, setIdioma] = useState('pt'); 
  const [glitchAtivo, setGlitchAtivo] = useState(false); 
  const [cursorAtivo, setCursorAtivo] = useState(false); 
  const [musicaAtiva, setMusicaAtiva] = useState(false); 
  const [musicaAtualIndex, setMusicaAtualIndex] = useState(0); 
  const [comandoInput, setComandoInput] = useState(''); 
  const [retornoTerminal, setRetornoTerminal] = useState('');

  // 🕹️ Posição Arrastável Livre da Engrenagem (X e Y)
  const [btnPos, setBtnPos] = useState({
    x: window.innerWidth - 60, // Lado direito inicial
    y: window.innerHeight / 2 - 25 // Centralizado verticalmente
  });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false); 

  // Coordenadas do Cursor Customizado (Ideia 5)
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [hoveringLink, setHoveringLink] = useState(false);

  const canvasRef = useRef(null);
  const audioRef = useRef(null); 

  const cores = [
    { nome: "Azul Moderno", valor: "#4b80e2" },
    { nome: "Verde Neon", valor: "#10b981" },
    { nome: "Roxo Holográfico", valor: "#a855f7" },
    { nome: "Rosa Choque", valor: "#f43f5e" },
    { nome: "Ciano Cyberpunk", valor: "#06b6d4" },
    { nome: "Laranja Vivo", valor: "#f97316" }
  ];

  const t = traducoes[idioma];

  const mudarCorPrincipal = (hexColor) => {
    document.documentElement.style.setProperty('--primary', hexColor);
  };

  // Ideia 1: Processador de Comandos do Mini Terminal
  const executarComando = (e) => {
    if (e.key !== 'Enter') return;
    
    const cmd = comandoInput.trim().toLowerCase();
    setComandoInput('');

    if (cmd === '/secret') {
      mudarCorPrincipal('#00ff41');
      setRetornoTerminal("Matrix Mode Active.");
    } else if (cmd === '/dracula') {
      mudarCorPrincipal('#ff79c6');
      setRetornoTerminal("Dracula Mode Active.");
    } else if (cmd === '/social' || cmd === '/contact') {
      const el = document.getElementById('contact') || document.querySelector('footer');
      el?.scrollIntoView({ behavior: 'smooth' });
      setRetornoTerminal("Scrolling to contact...");
    } else if (cmd === '/clear') {
      setRetornoTerminal('');
    } else if (cmd === '/comandos' || cmd === '/commands') {
      setRetornoTerminal("/secret, /dracula, /social, /clear");
    } else {
      setRetornoTerminal(t.comandoInvalido);
    }
  };

  const proximaMusica = () => {
    setMusicaAtualIndex((prevIndex) => (prevIndex + 1) % PLAYLIST.length);
  };

  const musicaAnterior = () => {
    setMusicaAtualIndex((prevIndex) => (prevIndex - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  // 🕹️ Lógica de Arrastar 360 Graus (Mouse e Mobile Touch)
  const iniciarArrastar = (e) => {
    isDragging.current = true;
    hasMoved.current = false;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    dragStart.current = { x: clientX, y: clientY };
    dragStartPos.current = { x: btnPos.x, y: btnPos.y };
  };

  useEffect(() => {
    const aoArrastar = (e) => {
      if (!isDragging.current) return;
      
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      const deltaX = clientX - dragStart.current.x;
      const deltaY = clientY - dragStart.current.y;
      
      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        hasMoved.current = true;
      }

      // Limita as bordas da tela para o botão não sumir para fora
      const novaX = Math.max(10, Math.min(window.innerWidth - 50, dragStartPos.current.x + deltaX));
      const novaY = Math.max(10, Math.min(window.innerHeight - 50, dragStartPos.current.y + deltaY));
      
      setBtnPos({ x: novaX, y: novaY });
    };

    const pararArrastar = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', aoArrastar);
    window.addEventListener('mouseup', pararArrastar);
    window.addEventListener('touchmove', aoArrastar, { passive: false });
    window.addEventListener('touchend', pararArrastar);

    return () => {
      window.removeEventListener('mousemove', aoArrastar);
      window.removeEventListener('mouseup', pararArrastar);
      window.removeEventListener('touchmove', aoArrastar);
      window.removeEventListener('touchend', pararArrastar);
    };
  }, [btnPos]);

  // Recalcula o X inicial caso o usuário redimensione o navegador
  useEffect(() => {
    const tratarResize = () => {
      setBtnPos(prev => ({
        x: window.innerWidth - 60,
        y: prev.y
      }));
    };
    window.addEventListener('resize', tratarResize);
    return () => window.removeEventListener('resize', tratarResize);
  }, []);

  const tratarCliqueBotao = () => {
    if (!hasMoved.current) {
      setMenuAberto(!menuAberto);
    }
  };

  // Contador de visitas simulado
  useEffect(() => {
    const visitasLocais = localStorage.getItem('portfolio_visitas_user') || '0';
    const novaVisitaLocal = parseInt(visitasLocais) + 1;
    localStorage.setItem('portfolio_visitas_user', novaVisitaLocal);
    setContadorVisitas(3412 + novaVisitaLocal);
  }, []);

  // Sincronização de classes e variáveis CSS
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--lanterna-opacity', lanternaAtiva ? '1' : '0');
    root.style.setProperty('--card-blur', `${nivelBlur}px`);
    root.style.setProperty('--font-family', fonteSelecionada);

    if (!animacoesAtivas) document.body.classList.add('disable-animations');
    else document.body.classList.remove('disable-animations');

    if (glitchAtivo) document.body.classList.add('cyber-glitch-active');
    else document.body.classList.remove('cyber-glitch-active');
  }, [lanternaAtiva, animacoesAtivas, nivelBlur, fonteSelecionada, glitchAtivo]);

  // Controle de Playlist
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.15;

    if (musicaAtiva) {
      audioRef.current.load();
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Reprodução bloqueada:", error);
          setMusicaAtiva(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [musicaAtiva, musicaAtualIndex]);

  // Captura movimento do mouse para lanterna e cursor
  useEffect(() => {
    const handleMouseMove = (event) => {
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    const handleMouseOver = (e) => {
      const tag = e.target.tagName.toLowerCase();
      if (tag === 'a' || tag === 'button' || e.target.closest('a') || e.target.closest('button') || e.target.classList.contains('item-cor')) {
        setHoveringLink(true);
      } else {
        setHoveringLink(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Canvas Partículas
  useEffect(() => {
    if (!particulasAtivas) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const redimensionar = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', redimensionar);
    redimensionar();

    const numParticulas = 60;
    const listaParticulas = [];
    for (let i = 0; i < numParticulas; i++) {
      listaParticulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        raio: Math.random() * 1.5 + 0.5,
        velocidadeY: -(Math.random() * 0.4 + 0.1),
        opacidade: Math.random() * 0.5 + 0.2
      });
    }

    const animar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const corPrimaria = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#4b80e2';
      ctx.fillStyle = corPrimaria;

      listaParticulas.forEach((p) => {
        ctx.globalAlpha = p.opacidade;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
        ctx.fill();
        p.y += p.velocidadeY;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(animar);
    };

    animar();
    return () => {
      window.removeEventListener('resize', redimensionar);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particulasAtivas, menuAberto]);

  return (
    <>
      <audio ref={audioRef} src={PLAYLIST[musicaAtualIndex].arquivo} loop />

      {cursorAtivo && (
        <div 
          className={`custom-neon-cursor ${hoveringLink ? 'cursor-expandido' : ''}`}
          style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
        />
      )}

      {particulasAtivas && (
        <canvas 
          ref={canvasRef} 
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1, pointerEvents: 'none' }}
        />
      )}

      <Header idioma={idioma} />
      <About idioma={idioma} />
      <Projects idioma={idioma} />
      <Certificados idioma={idioma} />
      <Contact idioma={idioma} />
      <Footer idioma={idioma} />

      {/* ⚙️ BOTÃO DA ENGRENAGEM MOVEL - TOTALMENTE LIVRE (360°) */}
      <button 
        className="botao-engrenagem" 
        onMouseDown={iniciarArrastar}
        onTouchStart={iniciarArrastar}
        onClick={tratarCliqueBotao}
        style={{
          position: 'fixed',
          // Se o menu estiver aberto, ancora a engrenagem na ponta lateral esquerda do painel.
          // Se fechado, ela obedece livremente a posição X em que foi deixada.
          left: menuAberto ? 'auto' : `${btnPos.x}px`,
          right: menuAberto ? '280px' : 'auto',
          top: `${btnPos.y}px`,
          zIndex: 10000,
          cursor: isDragging.current ? 'grabbing' : 'grab',
          transition: isDragging.current ? 'none' : 'left 0.4s ease, right 0.4s ease, top 0.2s ease-out'
        }}
        title="Arraste para mover / Clique para abrir"
      >
        {menuAberto ? "×" : "⚙️"}
      </button>

      {/* PAINEL FLUTUANTE DE CUSTOMIZAÇÃO PREMIUM */}
      <div className={`GerenciadorCores ${menuAberto ? "aberto" : ""}`}>
        <div className="conteudo-cores" style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '80vh', overflowY: 'auto' }}>
          
          {/* DISPLAY DE VISITAS */}
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-neon)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-gray)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>{t.sistemaConectado}</span>
            <div style={{ fontFamily: "'Fira Code', monospace", color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '2px' }}>
              Nº SYS_{String(contadorVisitas).padStart(6, '0')}
            </div>
          </div>

          {/* IDEIA 1: MINI TERMINAL INTERATIVO */}
          <div className="mini-terminal-container">
            <input 
              type="text" 
              className="terminal-input"
              value={comandoInput}
              onChange={(e) => setComandoInput(e.target.value)}
              onKeyDown={executarComando}
              placeholder={t.terminalPlaceholder}
            />
            {retornoTerminal && <div className="terminal-return">{retornoTerminal}</div>}
          </div>

          {/* IDEIA 2: SELETOR DE IDIOMAS */}
          <div>
            <h4>{t.idiomaLabel}</h4>
            <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
              <button onClick={() => setIdioma('pt')} style={{ ...styles.fontBtn, border: idioma === 'pt' ? '1px solid var(--primary)' : '1px solid #222' }}>PT-BR</button>
              <button onClick={() => setIdioma('en')} style={{ ...styles.fontBtn, border: idioma === 'en' ? '1px solid var(--primary)' : '1px solid #222' }}>EN</button>
            </div>
          </div>

          {/* SEÇÃO: CORES */}
          <div>
            <h4>{t.corDestaque}</h4>
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

          {/* TIPOGRAFIA */}
          <div>
            <h4>{t.tipografia}</h4>
            <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
              <button onClick={() => setFonteSelecionada("'Poppins', sans-serif")} style={{ ...styles.fontBtn, border: fonteSelecionada.includes('Poppins') ? '1px solid var(--primary)' : '1px solid #222' }}>Aa</button>
              <button onClick={() => setFonteSelecionada("'Fira Code', monospace")} style={{ ...styles.fontBtn, fontFamily: "'Fira Code', monospace", border: fonteSelecionada.includes('Fira Code') ? '1px solid var(--primary)' : '1px solid #222' }}>&lt;/&gt;</button>
            </div>
          </div>

          <hr style={{ border: '0', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }} />

          {/* SEÇÃO: INTERRUPTORES DE CONFIGURAÇÃO */}
          <div>
            <h4 style={{ marginBottom: '10px' }}>{t.efeitosSistema}</h4>
            
            <div style={styles.controlRow}>
              <span>{t.lanterna}</span>
              <input type="checkbox" checked={lanternaAtiva} onChange={(e) => setLanternaAtiva(e.target.checked)} style={styles.checkbox} />
            </div>

            <div style={styles.controlRow}>
              <span>{t.animacoes}</span>
              <input type="checkbox" checked={animacoesAtivas} onChange={(e) => setAnimacoesAtivas(e.target.checked)} style={styles.checkbox} />
            </div>

            <div style={styles.controlRow}>
              <span>{t.particulas}</span>
              <input type="checkbox" checked={particulasAtivas} onChange={(e) => setParticulasAtivas(e.target.checked)} style={styles.checkbox} />
            </div>

            <div style={styles.controlRow}>
              <span>{t.glitch}</span>
              <input type="checkbox" checked={glitchAtivo} onChange={(e) => setGlitchAtivo(e.target.checked)} style={styles.checkbox} />
            </div>

            <div style={styles.controlRow}>
              <span>{t.cursorCustom}</span>
              <input type="checkbox" checked={cursorAtivo} onChange={(e) => setCursorAtivo(e.target.checked)} style={styles.checkbox} />
            </div>

            {/* PLAYER DE TRILHA SONORA */}
            <div style={{ ...styles.controlRow, flexDirection: 'column', alignItems: 'stretch', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {t.trilhaSonora} {musicaAtiva && <span className="audio-equalizer-bar"></span>}
                </span>
                <input type="checkbox" checked={musicaAtiva} onChange={(e) => setMusicaAtiva(e.target.checked)} style={styles.checkbox} />
              </div>
              
              <div style={{ background: '#000', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '8px', marginTop: '4px' }}>
                <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.75rem', color: musicaAtiva ? 'var(--primary)' : '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '8px', textAlign: 'center' }}>
                  {PLAYLIST[musicaAtualIndex].nome}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                  <button onClick={musicaAnterior} className="btn-playlist" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} title="Música Anterior">⏮</button>
                  <button onClick={proximaMusica} className="btn-playlist" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} title="Próxima Música">⏭</button>
                </div>
              </div>
            </div>

            <div style={{ ...styles.controlRow, flexDirection: 'column', alignItems: 'flex-start', gap: '6px', marginTop: '5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>{t.opacidadeVidro}</span>
                <span style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>{nivelBlur}px</span>
              </div>
              <input type="range" min="0" max="24" value={nivelBlur} onChange={(e) => setNivelBlur(Number(e.target.value))} style={styles.slider} />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

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
  },
  fontBtn: {
    flex: 1,
    padding: '6px',
    background: '#0d0d0d',
    color: '#fff',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    transition: 'all 0.2s',
    textAlign: 'center'
  }
};