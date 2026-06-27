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

const LISTA_CONQUISTAS = [
  { id: "dj", titulo: "DJ do Ciberespaço", desc: "Ativou a Trilha Sonora Synthwave.", icone: "📻" },
  { id: "hacker", titulo: "Hacker Nato", desc: "Descobriu o diretório secreto digitando /secret.", icone: "🖥️" },
  { id: "linkedin", titulo: "Aprovado pelo RH", desc: "Ativou o Modo Corporativo (/linkedin-mode).", icone: "👔" },
  { id: "curioso", titulo: "Curioso de Hardware", desc: "Abriu o painel de configurações do sistema.", icone: "⚙️" },
  { id: "cor_custom", titulo: "Estilista Cyber", desc: "Alterou a cor de destaque do sistema.", icone: "🎨" },
  { id: "dev", titulo: "Mestre do Código", desc: "Executou o comando secreto de desenvolvedor.", icone: "👨‍💻" }
];

const CORES_PRE_PRONTAS = [
  { nome: "Neon Blue", hex: "#4b80e2" },
  { nome: "Cyberpunk Pink", hex: "#ff007f" },
  { nome: "Matrix Green", hex: "#00ff41" },
  { nome: "Volt Yellow", hex: "#e5ff00" },
  { nome: "Sunset Orange", hex: "#ff5722" }
];

const traducoes = {
  pt: {
    sistemaConectado: "Sistema Connected",
    corDestaque: "Cor de Destaque",
    corHexLabel: "Código Hexadecimal (Bloqueado 🔒)",
    corHexLiberado: "Código Hexadecimal (Liberado! ⚡)",
    corHexPlaceholder: "#4b80e2",
    corHexInvalida: "Hex inválido. Use o formato #RRGGBB",
    tipografia: "Tipografia",
    efeitosSistema: "Efeitos & Sistema",
    lanterna: "Lanterna Mouse",
    animacoes: "Animações",
    partculas: "Partículas Fundo",
    opacidadeVidro: "Opacidade Vidro",
    glitch: "Efeito Glitch",
    cursorCustom: "Cursor Neon",
    trilhaSonora: "Trilha Synthwave",
    idiomaLabel: "Idioma / Language",
    terminalPlaceholder: "Digite /comandos ou /help...",
    comandoInvalido: "Comando não reconhecido. Digite /help",
    sucessoComando: "Executado com sucesso!",
    conquistasTitulo: "Conquistas do Sistema",
    limparConquistas: "Resetar Sistema 🔄"
  },
  en: {
    sistemaConectado: "System Connected",
    corDestaque: "Accent Color",
    corHexLabel: "Hex Code (Locked 🔒)",
    corHexLiberado: "Hex Code (Unlocked! ⚡)",
    corHexPlaceholder: "#4b80e2",
    corHexInvalida: "Invalid hex. Use #RRGGBB format",
    tipografia: "Typography",
    efeitosSistema: "Effects & System",
    lanterna: "Mouse Flashlight",
    animacoes: "Animations",
    partculas: "Background Particles",
    opacidadeVidro: "Glass Opacity",
    glitch: "Glitch Effect",
    cursorCustom: "Neon Cursor",
    trilhaSonora: "Synthwave Track",
    idiomaLabel: "Language / Idioma",
    terminalPlaceholder: "Type /commands or /help...",
    comandoInvalido: "Command not recognized. Type /help",
    sucessoComando: "Executed successfully!",
    conquistasTitulo: "System Achievements",
    limparConquistas: "Reset System 🔄"
  }
};

const FONTES_DISPONIVEIS = [
  { nome: "Poppins", valor: "'Poppins', sans-serif" },
  { nome: "Fira Code", valor: "'Fira Code', monospace" },
];

function hexParaRgbString(hex) {
  const limpo = hex.replace('#', '');
  const r = parseInt(limpo.substring(0, 2), 16);
  const g = parseInt(limpo.substring(2, 4), 16);
  const b = parseInt(limpo.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

function MatrixRainEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖRAﾘﾙﾚﾛﾜﾝ".split("");
    const tamanhoFonte = 14;
    const colunas = canvas.width / tamanhoFonte;
    const gotasChuva = Array.from({ length: colunas }).fill(1);

    const desenhar = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = tamanhoFonte + "px monospace";

      for (let i = 0; i < gotasChuva.length; i++) {
        const texto = caracteres[Math.floor(Math.random() * caracteres.length)];
        ctx.fillText(texto, i * tamanhoFonte, gotasChuva[i] * tamanhoFonte);

        if (gotasChuva[i] * tamanhoFonte > canvas.height && Math.random() > 0.975) {
          gotasChuva[i] = 0;
        }
        gotasChuva[i]++;
      }
    };

    const intervalo = setInterval(desenhar, 30);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        zIndex: 99999, pointerEvents: 'none', background: 'transparent'
      }}
    />
  );
}

function hexValido(hex) {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
}

function ParticulasFundo() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let largura = window.innerWidth;
    let altura = window.innerHeight;
    canvas.width = largura;
    canvas.height = altura;

    const corPrimaria = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#4b80e2';

    const NUM_PARTICULAS = 60;
    const listaParticulas = Array.from({ length: NUM_PARTICULAS }, () => ({
      x: Math.random() * largura,
      y: Math.random() * altura,
      raio: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacidade: Math.random() * 0.5 + 0.2
    }));

    let animId;
    const desenhar = () => {
      ctx.clearRect(0, 0, largura, altura);
      const cor = corPrimaria();
      listaParticulas.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = largura;
        if (p.x > largura) p.x = 0;
        if (p.y < 0) p.y = altura;
        if (p.y > altura) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
        ctx.fillStyle = cor;
        ctx.globalAlpha = p.opacidade;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(desenhar);
    };
    desenhar();

    const aoRedimensionar = () => {
      largura = window.innerWidth;
      altura = window.innerHeight;
      canvas.width = largura;
      canvas.height = altura;
    };
    window.addEventListener('resize', aoRedimensionar);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', aoRedimensionar);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        zIndex: 1, pointerEvents: 'none'
      }}
    />
  );
}

function CursorNeon() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [expandido, setExpandido] = useState(false);

  useEffect(() => {
    const mover = (e) => setPos({ x: e.clientX, y: e.clientY });
    const sobreInterativo = (e) => {
      const alvo = e.target.closest && e.target.closest('a, button, input');
      setExpandido(!!alvo);
    };
    window.addEventListener('mousemove', mover);
    window.addEventListener('mouseover', sobreInterativo);
    return () => {
      window.removeEventListener('mousemove', mover);
      window.removeEventListener('mouseover', sobreInterativo);
    };
  }, []);

  return (
    <div
      className={`custom-neon-cursor ${expandido ? 'cursor-expandido' : ''}`}
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
    />
  );
}

export default function App() {
  const [carregandoSistema, setCarregandoSistema] = useState(true);
  const [linhasBoot, setLinhasBoot] = useState([]);
  const [conquistaAtiva, setConquistaAtiva] = useState(null);

  const [conquistasDesbloqueadas, setConquistasDesbloqueadas] = useState(() => {
    try {
      const salvas = localStorage.getItem('portfolio_conquistas');
      return salvas ? JSON.parse(salvas) : [];
    } catch {
      return [];
    }
  });

  const mestreDoSistema = conquistasDesbloqueadas.length === LISTA_CONQUISTAS.length;

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

  const [chuvaMatrixAtiva, setChuvaMatrixAtiva] = useState(false);
  const [hackSimulacao, setHackSimulacao] = useState(false);
  const [linhasHack, setLinhasHack] = useState([]);
  const [contadorCliquesGlitch, setContadorCliquesGlitch] = useState(0);
  const [telaAzulAtiva, setTelaAzulAtiva] = useState(false);

  const [corHexInput, setCorHexInput] = useState('#4b80e2');
  const [corHexErro, setCorHexErro] = useState(false);

  const [btnPos, setBtnPos] = useState({ x: window.innerWidth - 60, y: window.innerHeight / 2 - 25 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false); 

  const audioRef = useRef(null); 
  const t = traducoes[idioma] || traducoes.pt;

  useEffect(() => {
    const horaAtual = new Date().getHours();
    const eMadrugada = horaAtual >= 0 && horaAtual < 5;

    const logs = [
      "> CONNECTING TO JOSE-C-WEB CORE...",
      "> LOADING PROJECTS [OK]",
      "> LOADING CERTIFICATES [OK]",
      eMadrugada ? "> WARNING: WORKING LATE NIGHT DETECTED... GO TO SLEEP HACKER. 🌙" : null,
      "> INITIALIZING INTERACTIVE UI... [SUCCESS]"
    ].filter(Boolean);

    logs.forEach((log, index) => {
      setTimeout(() => { setLinhasBoot(prev => [...prev, log]); }, (index + 1) * 350);
    });
    setTimeout(() => { setCarregandoSistema(false); }, (logs.length + 1) * 350);

    document.documentElement.style.setProperty('--primary-rgb', hexParaRgbString('#4b80e2'));
  }, []);

  const interagirComSeguranca = () => {
    setContadorCliquesGlitch(prev => {
      const novoContador = prev + 1;
      if (novoContador >= 6) {
        setGlitchAtivo(true);
        setTimeout(() => {
          setTelaAzulAtiva(true);
          setTimeout(() => {
            setTelaAzulAtiva(false);
            setGlitchAtivo(false);
            setRetornoTerminal("> CORE SYSTEM RESTORED IN SAFE MODE.");
          }, 2000);
        }, 800);
        return 0;
      }
      return novoContador;
    });
  };

  const desbloquearConquista = (id, titulo, icone = "🏆") => {
    if (conquistasDesbloqueadas.includes(id)) return; 
    const novaLista = [...conquistasDesbloqueadas, id];
    setConquistasDesbloqueadas(novaLista);
    localStorage.setItem('portfolio_conquistas', JSON.stringify(novaLista));
    setConquistaAtiva({ titulo, icone });
    setTimeout(() => { setConquistaAtiva(null); }, 4000);
  };

  const limparConquistas = () => {
    localStorage.removeItem('portfolio_conquistas');
    setConquistasDesbloqueadas([]);
    setRetornoTerminal("Sistema reiniciado. Conquistas limpas!");
  };

  const mudarCorPrincipal = (hexColor) => {
    document.documentElement.style.setProperty('--primary', hexColor);
    document.documentElement.style.setProperty('--primary-rgb', hexParaRgbString(hexColor));
    desbloquearConquista("cor_custom", "Estilista Cyber: Mudou as cores!", "🎨");
  };

  const aoSelecionarCorPicker = (hexColor) => {
    setCorHexInput(hexColor);
    setCorHexErro(false);
    mudarCorPrincipal(hexColor);
  };

  const aoDigitarCorHex = (valor) => {
    setCorHexInput(valor);
    if (hexValido(valor)) {
      setCorHexErro(false);
      mudarCorPrincipal(valor);
    } else {
      setCorHexErro(true);
    }
  };

  const executarComando = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = comandoInput.trim().toLowerCase();
    setComandoInput('');

    if (cmd === '/secret') {
      mudarCorPrincipal('#00ff41');
      setCorHexInput('#00ff41');
      setRetornoTerminal("Matrix Mode Active.");
      desbloquearConquista("hacker", "Hacker Nato: Usou o terminal!", "🖥️");
    } else if (cmd === '/matrix') {
      setChuvaMatrixAtiva(true);
      setRetornoTerminal("Iniciando Matrix Rain por 5 segundos...");
      setTimeout(() => setChuvaMatrixAtiva(false), 5000);
    } else if (cmd === '/sudo-hack') {
      setHackSimulacao(true);
      setLinhasHack([]);
      setRetornoTerminal("Bypassing firewalls e gerando payloads...");
      const logsInvasao = [
        "ESTABLISHING PROXY CONNECT... [OK]",
        "OVERRIDING SECURITY PROTOCOLS... [OK]",
        "ACCESSING ROOT FILESYSTEM...",
        "DECRYPTING CV_JOSE_C.pdf...",
        "DOWNLOADING ARTIFACT..."
      ];
      logsInvasao.forEach((log, index) => {
        setTimeout(() => {
          setLinhasHack(prev => [...prev, `> ${log}`]);
          if (index === logsInvasao.length - 1) {
            setTimeout(() => {
              setHackSimulacao(false);
              window.open("https://github.com/jose-c-web", "_blank"); 
            }, 800);
          }
        }, (index + 1) * 400);
      });
    } else if (cmd === '/rickroll') {
      setRetornoTerminal("Never gonna give you up! 🎶");
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
    } else if (cmd === '/colors') {
      setRetornoTerminal("Temas disponíveis: /dracula, /matrix-theme, /cyberpunk-theme");
    } else if (cmd === '/matrix-theme') {
      mudarCorPrincipal('#00ff41');
      setCorHexInput('#00ff41');
      setRetornoTerminal("Tema Matrix ativado com sucesso.");
    } else if (cmd === '/cyberpunk-theme') {
      mudarCorPrincipal('#ff007f');
      setCorHexInput('#ff007f');
      setRetornoTerminal("Tema Cyberpunk ativado com sucesso.");
    } else if (cmd === '/dev') { 
      setRetornoTerminal("Modo Desenvolvedor Ativado. Você é fera!");
      desbloquearConquista("dev", "Mestre do Código: Comandou!", "👨‍💻");
    } else if (cmd === '/dracula') {
      mudarCorPrincipal('#ff79c6');
      setCorHexInput('#ff79c6');
      setRetornoTerminal("Dracula Mode Active.");
    } else if (cmd === '/clear') {
      setRetornoTerminal('');
    } else if (cmd === '/ajuda' || cmd === '/help' || cmd === '/comandos' || cmd === '/commands') {
      setRetornoTerminal("/sobre, /projects, /certificados, /contact, /github, /linkedin, /linkedin-mode, /secret, /matrix, /sudo-hack, /rickroll, /colors, /dev, /clear");
    } else if (cmd === '/sobre' || cmd === '/about') {
      setRetornoTerminal("José C. - Dev Front-End focado em criar interfaces imersivas.");
    } else if (cmd === '/github') {
      setRetornoTerminal("Abrindo GitHub...");
      window.open("https://github.com/jose-c-web", "_blank");
    } else if (cmd === '/linkedin') {
      setRetornoTerminal("Abrindo LinkedIn...");
      window.open("https://linkedin.com/", "_blank");
    } else if (cmd === '/linkedin-mode') {
      setLinkedinMode(!linkedinMode);
      if (!linkedinMode) {
        mudarCorPrincipal('#0a66c2');
        setCorHexInput('#0a66c2');
        setGlitchAtivo(false);
        setFonteSelecionada("'Poppins', sans-serif");
        setRetornoTerminal("Modo Corporativo ativado.");
        desbloquearConquista("linkedin", "Aprovado pelo RH: Modo corporativo!", "👔");
      } else {
        mudarCorPrincipal('#4b80e2');
        setCorHexInput('#4b80e2');
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
    interagirComSeguranca();
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
    try {
      const visitasLocais = localStorage.getItem('portfolio_visitas_user') || '0';
      const novaVisitaLocal = parseInt(visitasLocais) + 1;
      localStorage.setItem('portfolio_visitas_user', novaVisitaLocal.toString());
      setContadorVisitas(3412 + novaVisitaLocal);
    } catch {
      setContadorVisitas(3412);
    }
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

  useEffect(() => {
    document.body.classList.toggle('lanterna-ativa', lanternaAtiva);
    document.documentElement.style.setProperty('--lanterna-opacity', lanternaAtiva ? '1' : '0');
  }, [lanternaAtiva]);

  useEffect(() => {
    document.body.classList.toggle('disable-animations', !animacoesAtivas);
  }, [animacoesAtivas]);

  useEffect(() => {
    document.documentElement.style.setProperty('--card-blur', `${nivelBlur}px`);
  }, [nivelBlur]);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-family', fonteSelecionada);
  }, [fonteSelecionada]);

  useEffect(() => {
    document.body.classList.toggle('cyber-glitch-active', glitchAtivo);
  }, [glitchAtivo]);

  return (
    <>
      {carregandoSistema ? (
        <div className="boot-sequence-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#000', color: '#00ff41', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', zIndex: 999999 }}>
          <div className="boot-terminal-text" style={{ textAlign: 'left', maxWidth: '80%' }}>
            {linhasBoot.map((linha, index) => <div key={index} className="boot-line" style={{ margin: '5px 0' }}>{linha}</div>)}
            <div className="boot-blinking-cursor">_</div>
          </div>
        </div>
      ) : (
        <>
          {telaAzulAtiva && (
            <div className="bsod-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0000aa', color: '#fff', fontFamily: 'monospace', padding: '40px', zIndex: 100000, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>:( SYSTEM_ERROR</h1>
              <p style={{ fontSize: '1.2rem' }}>A fatal exception 0x0000007B has occurred at core memory structure mapping system control wrapper.</p>
              <p style={{ fontSize: '1.2rem', marginTop: '20px' }}>* System will attempt auto-recovery into terminal safe mode...</p>
            </div>
          )}

          {chuvaMatrixAtiva && <MatrixRainEffect />}

          {hackSimulacao && (
            <div className="hack-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.95)', color: '#00ff00', fontFamily: "'Fira Code', monospace", padding: '30px', zIndex: 99998, pointerEvents: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ border: '1px solid #ff0055', padding: '20px', background: '#000', borderRadius: '8px', minWidth: '300px', boxShadow: '0 0 15px #ff0055' }}>
                <h3 style={{ color: '#ff0055', textShadow: '0 0 10px #ff0055', margin: '0 0 15px 0', textAlign: 'center' }}>⚠️ OVERRIDE PAYLOAD</h3>
                <div>
                  {linhasHack.map((l, i) => <div key={i} style={{ marginBottom: '8px', fontSize: '0.85rem' }}>{l}</div>)}
                </div>
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

          {particulasAtivas && <ParticulasFundo />}
          {cursorAtivo && <CursorNeon />}

          <audio ref={audioRef} src={PLAYLIST[musicaAtualIndex].arquivo} loop />

          <div onClick={interagirComSeguranca}>
            <Header />
          </div>
          
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

              <div className="mini-terminal-container">
                <input type="text" className="terminal-input" value={comandoInput} onChange={(e) => setComandoInput(e.target.value)} onKeyDown={executarComando} placeholder={t.terminalPlaceholder} />
                {retornoTerminal && <div className="terminal-return" style={{ whiteSpace: 'pre-line', fontSize: '0.8rem', marginTop: '6px', color: 'var(--primary)' }}>{retornoTerminal}</div>}
              </div>

              <div className="secao-conquistas-painel">
                <h4 style={{ margin: 0 }}>{t.conquistasTitulo} ({conquistasDesbloqueadas.length}/{LISTA_CONQUISTAS.length})</h4>
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
                {conquistasDesbloqueadas.length > 0 && (
                  <button onClick={limparConquistas} style={{ ...styles.fontBtn, marginTop: '12px', background: '#2a0808', border: '1px solid #ff4a4a', color: '#ff8888', fontSize: '0.8rem' }}>
                    {t.limparConquistas}
                  </button>
                )}
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
                {!mestreDoSistema ? (
                  <div style={{ marginTop: '8px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#888', display: 'block', marginBottom: '8px' }}>
                      {idioma === 'pt' ? "🔒 Conclua as conquistas para o Seletor Hexadecimal!" : "🔒 Complete achievements for Hex Color Picker!"}
                    </span>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {CORES_PRE_PRONTAS.map((cor) => (
                        <button
                          key={cor.hex}
                          onClick={() => {
                            setCorHexInput(cor.hex);
                            setCorHexErro(false);
                            mudarCorPrincipal(cor.hex);
                          }}
                          style={{
                            width: '28px', height: '28px', borderRadius: '50%', background: cor.hex,
                            border: corHexInput.toLowerCase() === cor.hex.toLowerCase() ? '2px solid #fff' : '1px solid #000',
                            cursor: 'pointer'
                          }}
                          title={cor.nome}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                    <input
                      type="color"
                      value={hexValido(corHexInput) && corHexInput.length === 7 ? corHexInput : '#4b80e2'}
                      onChange={(e) => aoSelecionarCorPicker(e.target.value)}
                      style={{ width: '42px', height: '42px', cursor: 'pointer', background: 'transparent', border: '1px solid var(--border-neon)', borderRadius: '8px' }}
                    />
                    <input
                      type="text"
                      value={corHexInput}
                      onChange={(e) => aoDigitarCorHex(e.target.value)}
                      maxLength={7}
                      style={{ width: '100%', padding: '10px', background: '#0d0d0d', color: '#fff', border: '1px solid #222', borderRadius: '8px', fontFamily: "'Fira Code', monospace" }}
                    />
                  </div>
                )}
              </div>

              <hr style={{ border: '0', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }} />

              <div>
                <h4>{t.tipografia}</h4>
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                  {FONTES_DISPONIVEIS.map((fonte) => (
                    <button key={fonte.valor} onClick={() => setFonteSelecionada(fonte.valor)} style={{ ...styles.fontBtn, fontFamily: fonte.valor, border: fonteSelecionada === fonte.valor ? '1px solid var(--primary)' : '1px solid #222' }}>
                      {fonte.nome}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={styles.controlRow}>
                  <span>{t.opacidadeVidro}</span>
                  <span style={{ fontFamily: "'Fira Code', monospace", color: 'var(--primary)' }}>{nivelBlur}px</span>
                </div>
                <input type="range" min="0" max="20" value={nivelBlur} onChange={(e) => setNivelBlur(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary)' }} />
              </div>

              <hr style={{ border: '0', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }} />

              <div>
                <h4 style={{ marginBottom: '10px' }}>{t.efeitosSistema}</h4>
                <div style={styles.controlRow}><span>{t.lanterna}</span><input type="checkbox" checked={lanternaAtiva} onChange={(e) => setLanternaAtiva(e.target.checked)} style={styles.checkbox} /></div>
                <div style={styles.controlRow}><span>{t.animacoes}</span><input type="checkbox" checked={animacoesAtivas} onChange={(e) => setAnimacoesAtivas(e.target.checked)} style={styles.checkbox} /></div>
                <div style={styles.controlRow}><span>{t.partculas}</span><input type="checkbox" checked={particulasAtivas} onChange={(e) => setParticulasAtivas(e.target.checked)} style={styles.checkbox} /></div>
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
        </>
      )}
    </>
  );
}

const styles = {
  controlRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#a9a9a9', marginBottom: '10px' },
  checkbox: { cursor: 'pointer', accentColor: 'var(--primary)', width: '16px', height: '16px' },
  fontBtn: { flex: 1, padding: '6px', background: '#0d0d0d', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', textAlign: 'center' }
};