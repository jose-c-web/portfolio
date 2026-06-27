import { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Certificados from './components/Certificados';
import Contact from './components/Contact'; 
import Footer from './components/Footer';
import './App.css';

import track1 from './assets/Musics/perdas.mp3';
import track2 from './assets/Musics/dan(sukuna).mp3'; 
import track3 from './assets/Musics/fenix(nova).mp3';

const PLAYLIST = [
  { id: 0, nome: "Track 01 - Perdas", arquivo: track1 },
  { id: 1, nome: "Track 02 - Dan (Sukuna)", arquivo: track2 },
  { id: 2, nome: "Track 03 - Fênix (Nova)", arquivo: track3 },
];

// 📜 LISTA OFICIAL DE CONQUISTAS DO SISTEMA
const LISTA_CONQUISTAS = [
  { id: "dj", titulo: "DJ do Ciberespaço", desc: "Ativou a Trilha Sonora Synthwave.", icone: "📻" },
  { id: "hacker", titulo: "Hacker Nato", desc: "Descobriu o diretório secreto digitando /secret.", icone: "🖥️" },
  { id: "linkedin", titulo: "Aprovado pelo RH", desc: "Ativou o Modo Corporativo (/linkedin-mode).", icone: "👔" },
  { id: "curioso", titulo: "Curioso de Hardware", desc: "Abriu o painel de configurações do sistema.", icone: "⚙️" },
  { id: "cor_custom", titulo: "Estilista Cyber", desc: "Alterou a cor de destaque do sistema.", icone: "🎨" }
];

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
    terminalPlaceholder: "Digite /comandos ou /help...",
    comandoInvalido: "Comando não reconhecido. Digite /help",
    sucessoComando: "Executado com sucesso!",
    conquistasTitulo: "Conquistas do Sistema"
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
    terminalPlaceholder: "Type /commands or /help...",
    comandoInvalido: "Command not recognized. Type /help",
    sucessoComando: "Executed successfully!",
    conquistasTitulo: "System Achievements"
  }
};

export default function App() {
  const [carregandoSistema, setCarregandoSistema] = useState(true);
  const [linhasBoot, setLinhasBoot] = useState([]);
  const [conquistaAtiva, setConquistaAtiva] = useState(null);

  // 💾 Carrega as conquistas salvas localmente logo ao iniciar o app
  const [conquistasDesbloqueadas, setConquistasDesbloqueadas] = useState(() => {
    const salvas = localStorage.getItem('portfolio_conquistas');
    return salvas ? JSON.parse(salvas) : [];
  });

  const [menuAberto, setMenuAberto] = useState(false);
  const [lanternaAtiva, setLanternaAtiva] = useState(true);
  const [animacoesAtivas, setAnimacoesAtivas] = useState(true);
  const [nivelBlur, setNivelBlur] = useState(8);
  const [fonteSelecionada, setFonteSelecionada] = useState("'Poppins', sans-serif");
  const [particulasAtivas, setParticulasAtivas] = useState(true);
  const [contadorVisitas, setContadorVisitas] = useState(1337);

  const [idioma, setIdioma] = useState('pt'); 
  const [glitchAtivo, setGlitchAtivo] = useState(false); 
  const [cursorAtivo, setCursorAtivo] = useState(false); 
  const [musicaAtiva, setMusicaAtiva] = useState(false); 
  const [musicaAtualIndex, setMusicaAtualIndex] = useState(0); 
  const [comandoInput, setComandoInput] = useState(''); 
  const [retornoTerminal, setRetornoTerminal] = useState('');
  const [linkedinMode, setLinkedinMode] = useState(false);

  const [btnPos, setBtnPos] = useState({ x: window.innerWidth - 60, y: window.innerHeight / 2 - 25 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false); 

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

  // Loader do Boot
  useEffect(() => {
    const logs = [
      "> CONNECTING TO JOSE-C-WEB CORE...",
      "> LOADING PROJECTS [OK]",
      "> LOADING CERTIFICATES [OK]",
      "> INITIALIZING INTERACTIVE UI... [SUCCESS]"
    ];
    logs.forEach((log, index) => {
      setTimeout(() => { setLinhasBoot(prev => [...prev, log]); }, (index + 1) * 450);
    });
    setTimeout(() => { setCarregandoSistema(false); }, 2400);
  }, []);

  // 🏆 FUNÇÃO ATUALIZADA: DISPARAR E SALVAR CONQUISTAS
  const desbloquearConquista = (id, titulo, icone = "🏆") => {
    if (conquistasDesbloqueadas.includes(id)) return; 

    const novaLista = [...conquistasDesbloqueadas, id];
    setConquistasDesbloqueadas(novaLista);
    localStorage.setItem('portfolio_conquistas', JSON.stringify(novaLista));

    setConquistaAtiva({ titulo, icone });
    setTimeout(() => { setConquistaAtiva(null); }, 4000);
  };

  const mudarCorPrincipal = (hexColor) => {
    document.documentElement.style.setProperty('--primary', hexColor);
    desbloquearConquista("cor_custom", "Estilista Cyber: Mudou as cores!", "🎨");
  };

  // Terminal de comandos
  const executarComando = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = comandoInput.trim().toLowerCase();
    setComandoInput('');

    if (cmd === '/secret') {
      mudarCorPrincipal('#00ff41');
      setRetornoTerminal("Matrix Mode Active.");
      desbloquearConquista("hacker", "Hacker Nato: Usou o terminal!", "🖥️");
    } else if (cmd === '/dracula') {
      mudarCorPrincipal('#ff79c6');
      setRetornoTerminal("Dracula Mode Active.");
    } else if (cmd === '/clear') {
      setRetornoTerminal('');
    } else if (cmd === '/ajuda' || cmd === '/help' || cmd === '/comandos' || cmd === '/commands') {
      setRetornoTerminal("/sobre, /projects, /certificados, /contact, /github, /linkedin, /linkedin-mode, /secret, /clear");
    } else if (cmd === '/sobre' || cmd === '/about') {
      setRetornoTerminal("José C. - Dev Front-End focado em criar interfaces imersivas.");
    } else if (cmd === '/github') {
      setRetornoTerminal("Abrindo GitHub...");
      window.open("https://github.com/jose-c-web", "_blank");
    } else if (cmd === '/linkedin') {
      setRetornoTerminal("Abrindo LinkedIn...");
      window.open("https://linkedin.com/in/seu-usuario", "_blank");
    } else if (cmd === '/linkedin-mode') {
      setLinkedinMode(!linkedinMode);
      if (!linkedinMode) {
        mudarCorPrincipal('#0a66c2');
        setGlitchAtivo(false);
        setFonteSelecionada("'Poppins', sans-serif");
        setRetornoTerminal("Modo Corporativo ativado.");
        desbloquearConquista("linkedin", "Aprovado pelo RH: Modo corporativo!", "👔");
      } else {
        mudarCorPrincipal('#4b80e2');
        setRetornoTerminal("Modo Cyberpunk restaurado.");
      }
    } else if (['/projects', '/certificados', '/contact', '/sobre'].includes(cmd)) {
      const idMapeado = cmd.replace('/', '');
      const el = document.getElementById(idMapeado === 'sobre' ? 'about' : idMapeado);
      el?.scrollIntoView({ behavior: 'smooth' });
      setRetornoTerminal(`Roteando para #${idMapeado}...`);
    } else {
      setRetornoTerminal(t.comandoInvalido);
    }
  };

  const abrirConfiguracoes = () => {
    setMenuAberto(!menuAberto);
    desbloquearConquista("curioso", "Curioso: Abriu as configurações!", "⚙️");
  };

  const proximaMusica = () => setMusicaAtualIndex((prevIndex) => (prevIndex + 1) % PLAYLIST.length);
  const musicaAnterior = () => setMusicaAtualIndex((prevIndex) => (prevIndex - 1 + PLAYLIST.length) % PLAYLIST.length);

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
      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) hasMoved.current = true;
      setBtnPos({
        x: Math.max(10, Math.min(window.innerWidth - 50, dragStartPos.current.x + deltaX)),
        y: Math.max(10, Math.min(window.innerHeight - 50, dragStartPos.current.y + deltaY))
      });
    };
    window.addEventListener('mousemove', aoArrastar);
    window.addEventListener('mouseup', () => isDragging.current = false);
    return () => { window.removeEventListener('mousemove', aoArrastar); };
  }, [btnPos]);

  useEffect(() => {
    const visitasLocais = localStorage.getItem('portfolio_visitas_user') || '0';
    const novaVisitaLocal = parseInt(visitasLocais) + 1;
    localStorage.setItem('portfolio_visitas_user', novaVisitaLocal);
    setContadorVisitas(3412 + novaVisitaLocal);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (musicaAtiva) {
      audioRef.current.load();
      audioRef.current.play().catch(() => setMusicaAtiva(false));
      desbloquearConquista("dj", "DJ do Ciberespaço: Som ligado!", "📻");
    } else {
      audioRef.current.pause();
    }
  }, [musicaAtiva, musicaAtualIndex]);

  // 🖱️ & 📱 RASTREAMENTO UNIFICADO (MOUSE + TOQUE PARA CELULAR)
  useEffect(() => {
    const root = document.documentElement;

    const handleMouseMove = (e) => {
      root.style.setProperty('--mouse-x', `${e.clientX}px`);
      root.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        root.style.setProperty('--mouse-x', `${e.touches[0].clientX}px`);
        root.style.setProperty('--mouse-y', `${e.touches[0].clientY}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
    };
  }, []);

  return (
    <>
      {carregandoSistema && (
        <div className="boot-sequence-container">
          <div className="boot-terminal-text">
            {linhasBoot.map((linha, index) => <div key={index} className="boot-line">{linha}</div>)}
            <div className="boot-blinking-cursor">_</div>
          </div>
        </div>
      )}

      {conquistaAtiva && (
        <div className="achievement-popup">
          <div className="achievement-icon">{conquistaAtiva.icone}</div>
          <div className="achievement-info">
            <h5>CONQUISTA DESBLOQUEADA</h5>
            <p>{conquistaAtiva.titulo}</p>
          </div>
        </div>
      )}

      <audio ref={audioRef} src={PLAYLIST[musicaAtualIndex].arquivo} loop />

      <div style={{ visibility: carregandoSistema ? 'hidden' : 'visible' }}>
        <Header />
        <About />
        <Projects />
        <Certificados />
        <Contact />
        <Footer />

        <button 
          className="botao-engrenagem" 
          onMouseDown={iniciarArrastar}
          onTouchStart={iniciarArrastar}
          onClick={() => { if(!hasMoved.current) abrirConfiguracoes(); }}
          style={{
            position: 'fixed', left: menuAberto ? 'auto' : `${btnPos.x}px`, right: menuAberto ? '280px' : 'auto', top: `${btnPos.y}px`, zIndex: 10000,
            cursor: isDragging.current ? 'grabbing' : 'grab', transition: isDragging.current ? 'none' : 'left 0.4s ease, right 0.4s ease, top 0.2s ease-out'
          }}
        >
          {menuAberto ? "×" : "⚙️"}
        </button>

        <div className={`GerenciadorCores ${menuAberto ? "aberto" : ""}`}>
          <div className="conteudo-cores" style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '85vh', overflowY: 'auto' }}>
            
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-neon)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-gray)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>{t.sistemaConectado}</span>
              <div style={{ fontFamily: "'Fira Code', monospace", color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '2px' }}>
                Nº SYS_{String(contadorVisitas).padStart(6, '0')}
              </div>
            </div>

            {/* MINI TERMINAL INTERATIVO COMPACTO */}
            <div className="mini-terminal-container">
              <input type="text" className="terminal-input" value={comandoInput} onChange={(e) => setComandoInput(e.target.value)} onKeyDown={executarComando} placeholder={t.terminalPlaceholder} />
              {retornoTerminal && <div className="terminal-return">{retornoTerminal}</div>}
            </div>

            {/* 🏆 NOVA SEÇÃO: MOSTRAR AS CONQUISTAS DO PORTFÓLIO */}
            <div className="secao-conquistas-painel">
              <h4>{t.conquistasTitulo} ({conquistasDesbloqueadas.length}/{LISTA_CONQUISTAS.length})</h4>
              <div className="lista-conquistas-grid">
                {LISTA_CONQUISTAS.map((conquista) => {
                  const jaGanhou = conquistasDesbloqueadas.includes(conquista.id);
                  return (
                    <div key={conquista.id} className={`item-conquista-status ${jaGanhou ? 'desbloqueada' : 'bloqueada'}`}>
                      <div className="icone-conquista-status">{jaGanhou ? conquista.icone : "🔒"}</div>
                      <div className="info-conquista-status">
                        <h6>{conquista.titulo}</h6>
                        <p>{conquista.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <hr style={{ border: '0', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }} />

            <div>
              <h4>{t.idiomaLabel}</h4>
              <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                <button onClick={() => setIdioma('pt')} style={{ ...styles.fontBtn, border: idioma === 'pt' ? '1px solid var(--primary)' : '1px solid #222' }}>PT-BR</button>
                <button onClick={() => setIdioma('en')} style={{ ...styles.fontBtn, border: idioma === 'en' ? '1px solid var(--primary)' : '1px solid #222' }}>EN</button>
              </div>
            </div>

            <div>
              <h4>{t.corDestaque}</h4>
              <div className="grid-paletas" style={{ marginTop: '8px' }}>
                {cores.map((cor, index) => <button key={index} className="item-cor" style={{ backgroundColor: cor.valor }} onClick={() => mudarCorPrincipal(cor.valor)} />)}
              </div>
            </div>

            <hr style={{ border: '0', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }} />

            <div>
              <h4 style={{ marginBottom: '10px' }}>{t.efeitosSistema}</h4>
              <div style={styles.controlRow}><span>{t.lanterna}</span><input type="checkbox" checked={lanternaAtiva} onChange={(e) => setLanternaAtiva(e.target.checked)} style={styles.checkbox} /></div>
              <div style={styles.controlRow}><span>{t.animacoes}</span><input type="checkbox" checked={animacoesAtivas} onChange={(e) => setAnimacoesAtivas(e.target.checked)} style={styles.checkbox} /></div>
              <div style={styles.controlRow}><span>{t.particulas}</span><input type="checkbox" checked={particulasAtivas} onChange={(e) => setParticulasAtivas(e.target.checked)} style={styles.checkbox} /></div>
              <div style={styles.controlRow}><span>{t.glitch}</span><input type="checkbox" checked={glitchAtivo} onChange={(e) => setGlitchAtivo(e.target.checked)} style={styles.checkbox} /></div>
              <div style={styles.controlRow}><span>{t.cursorCustom}</span><input type="checkbox" checked={cursorAtivo} onChange={(e) => setCursorAtivo(e.target.checked)} style={styles.checkbox} /></div>

              <div style={{ ...styles.controlRow, flexDirection: 'column', alignItems: 'stretch', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{t.trilhaSonora}</span>
                  <input type="checkbox" checked={musicaAtiva} onChange={(e) => setMusicaAtiva(e.target.checked)} style={styles.checkbox} />
                </div>
                <div style={{ background: '#000', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '8px' }}>
                  <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.75rem', color: musicaAtiva ? 'var(--primary)' : '#666', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginBottom: '6px' }}>{PLAYLIST[musicaAtualIndex].nome}</div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <button onClick={musicaAnterior} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>⏮</button>
                    <button onClick={proximaMusica} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>⏭</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  controlRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#a9a9a9', marginBottom: '10px' },
  checkbox: { cursor: 'pointer', accentColor: 'var(--primary)', width: '16px', height: '16px' },
  fontBtn: { flex: 1, padding: '6px', background: '#0d0d0d', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', textAlign: 'center' }
};