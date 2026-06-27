import { useEffect, useState, useRef, useCallback } from 'react';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Certificados from './components/Certificados';
import Contact from './components/Contact'; 
import Footer from './components/Footer';
import Clock from './components/Clock';
import './App.css';

import track1 from './assets/Musics/perdas.mp3';
import track2 from './assets/Musics/dan(sukuna).mp3'; 
import track3 from './assets/Musics/fenix(nova).mp3';

import imagemMonster from './assets/IMG/monster.png';

const PLAYLIST = [
  { id: 0, nome: "Track 01 - Perdas", arquivo: track1 },
  { id: 1, nome: "Track 02 - Dan (Sukuna)", arquivo: track2 },
  { id: 2, nome: "Track 03 - Fênix (Nova)", arquivo: track3 },
];

const LISTA_CONQUISTAS = [
  { id: "dj",         titulo: "DJ do Ciberespaço",    desc: "Ativou a Trilha Sonora Synthwave.",               icone: "📻" },
  { id: "hacker",     titulo: "Hacker Nato",           desc: "Descobriu o diretório secreto digitando /secret.", icone: "🖥️" },
  { id: "linkedin",   titulo: "Aprovado pelo RH",      desc: "Ativou o Modo Corporativo (/linkedin-mode).",      icone: "👔" },
  { id: "curioso",    titulo: "Curioso de Hardware",   desc: "Abriu o painel de configurações do sistema.",      icone: "⚙️" },
  { id: "cor_custom", titulo: "Estilista Cyber",       desc: "Alterou a cor de destaque do sistema.",            icone: "🎨" },
  { id: "dev",        titulo: "Mestre do Código",      desc: "Executou o comando secreto de desenvolvedor.",     icone: "👨‍💻" },
  { id: "konami",     titulo: "Cheat Ativado",         desc: "Descobriu o Konami Code! ↑↑↓↓←→←→BA",            icone: "🎮" },
  { id: "tempo5min",  titulo: "Tá Curtindo!",          desc: "Ficou mais de 5 minutos no portfólio.",            icone: "⏱️" },
  { id: "snake",      titulo: "Víbora Cibernética",    desc: "Jogou o jogo secreto (/play).",                   icone: "🐍" },
  { id: "monster",    titulo: "Energizado!",           desc: "Tomou um Energético com /monster.",               icone: "⚡" },
  { id: "cafe",       titulo: "Cafeinado(a)",          desc: "Tomou um café com /cafe.",                        icone: "☕" },
  { id: "recruiter",  titulo: "Modo RH",               desc: "Ativou o modo recrutador com /recruiter.",        icone: "📋" },
  { id: "lofi",       titulo: "Lo-Fi Vibes",           desc: "Ativou o modo lo-fi com /lofi.",                  icone: "🎵" },
  { id: "xp1000",     titulo: "Level Up!",             desc: "Acumulou 1000 XP no sistema.",                    icone: "⭐" },
];

const CORES_PRE_PRONTAS = [
  { nome: "Neon Blue",      hex: "#4b80e2" },
  { nome: "Cyberpunk Pink", hex: "#ff007f" },
  { nome: "Matrix Green",   hex: "#00ff41" },
  { nome: "Volt Yellow",    hex: "#e5ff00" },
  { nome: "Sunset Orange",  hex: "#ff5722" }
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
    tamanhoFonteLabel: "Tamanho da Fonte",
    efeitosSistema: "Efeitos & Sistema",
    lanterna: "Lanterna Mouse",
    animacoes: "Animações",
    partculas: "Partículas Fundo",
    opacidadeVidro: "Opacidade Vidro",
    glitch: "Efeito Glitch",
    cursorCustom: "Cursor Neon",
    trilhaSonora: "Trilha Synthwave",
    idiomaLabel: "Idioma / Language",
    terminalPlaceholder: "Digite /help para ver os comandos...",
    comandoInvalido: "Comando não reconhecido. Digite /help",
    sucessoComando: "Executado com sucesso!",
    conquistasTitulo: "Conquistas do Sistema",
    limparConquistas: "Resetar Sistema 🔄",
    xpLabel: "XP do Sistema",
    tempoLabel: "Tempo na página",
  },
  en: {
    sistemaConectado: "System Connected",
    corDestaque: "Accent Color",
    corHexLabel: "Hex Code (Locked 🔒)",
    corHexLiberado: "Hex Code (Unlocked! ⚡)",
    corHexPlaceholder: "#4b80e2",
    corHexInvalida: "Invalid hex. Use #RRGGBB format",
    tipografia: "Typography",
    tamanhoFonteLabel: "Font Size",
    efeitosSistema: "Effects & System",
    lanterna: "Mouse Flashlight",
    animacoes: "Animations",
    partculas: "Background Particles",
    opacidadeVidro: "Glass Opacity",
    glitch: "Glitch Effect",
    cursorCustom: "Neon Cursor",
    trilhaSonora: "Synthwave Track",
    idiomaLabel: "Language / Idioma",
    terminalPlaceholder: "Type /help to see commands...",
    comandoInvalido: "Command not recognized. Type /help",
    sucessoComando: "Executed successfully!",
    conquistasTitulo: "System Achievements",
    limparConquistas: "Reset System 🔄",
    xpLabel: "System XP",
    tempoLabel: "Time on page",
  }
};

const FONTES_DISPONIVEIS = [
  { nome: "Poppins",    valor: "'Poppins', sans-serif" },
  { nome: "Fira Code",  valor: "'Fira Code', monospace" },
  { nome: "Roboto",     valor: "'Roboto', sans-serif" },
  { nome: "Montserrat", valor: "'Montserrat', sans-serif" },
  { nome: "JetBrains",  valor: "'JetBrains Mono', monospace" },
  { nome: "Ubuntu",     valor: "'Ubuntu', sans-serif" },
  { nome: "Retro 8-Bit",valor: "'Press Start 2P', cursive" }
];

const KONAMI_CODE = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

// XP ganho por ação
const XP_ACTIONS = {
  abrir_painel: 10,
  mudar_cor: 15,
  visitar_secao: 20,
  comando_terminal: 25,
  conquista: 50,
};

// Status do Energético (cresce animado até o valor fixo)
const STATUS_ENERGETICO = [
  { label: "Cafeína",    valor: 95 },
  { label: "Taurina",    valor: 80 },
  { label: "Adrenalina", valor: 100 },
  { label: "Açúcar",     valor: 70 },
];

// Status do Café (cresce animado até o valor fixo)
const STATUS_CAFE = [
  { label: "Cafeína", valor: 65 },
  { label: "Aroma",   valor: 90 },
  { label: "Foco",    valor: 85 },
  { label: "Calor",   valor: 75 },
];

function hexParaRgbString(hex) {
  const limpo = hex.replace('#', '');
  const r = parseInt(limpo.substring(0, 2), 16);
  const g = parseInt(limpo.substring(2, 4), 16);
  const b = parseInt(limpo.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

function hexValido(hex) {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
}

function formatarTempo(segundos) {
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  if (m === 0) return `${s}s`;
  return `${m}min ${s}s`;
}

// ─── Barrinhas de status reutilizáveis (Energético / Café) ───
function StatusBars({ itens }) {
  const [larguras, setLarguras] = useState(() => itens.map(() => 0));
  useEffect(() => {
    // começa em 0 e anima até o valor fixo no próximo frame
    const id = requestAnimationFrame(() => {
      setLarguras(itens.map(i => i.valor));
    });
    return () => cancelAnimationFrame(id);
  }, [itens]);
  return (
    <div className="status-bars-container">
      {itens.map((item, i) => (
        <div className="status-bar-row" key={item.label}>
          <div className="status-bar-label">
            <span>{item.label}</span>
            <b>{larguras[i]}%</b>
          </div>
          <div className="status-bar-track">
            <div className="status-bar-fill" style={{ width: `${larguras[i]}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── MatrixRainEffect ──────────────────────────────────────────
function MatrixRainEffect() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒMOYAﾕﾖRAﾘﾙﾚﾛﾜﾝ".split("");
    const fs = 14;
    const cols = canvas.width / fs;
    const drops = Array.from({ length: cols }).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = fs + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, drops[i] * fs);
        if (drops[i] * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const iv = setInterval(draw, 30);
    return () => clearInterval(iv);
  }, []);
  return <canvas ref={canvasRef} style={{ position:'fixed', top:0, left:0, width:'100vw', height:'100vh', zIndex:99999, pointerEvents:'none' }} />;
}

// ─── Partículas de fundo ──────────────────────────────────────
function ParticulasFundo() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth, h = window.innerHeight;
    canvas.width = w; canvas.height = h;
    const cor = () => getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#4b80e2';
    const ps = Array.from({ length: 60 }, () => ({ x: Math.random()*w, y: Math.random()*h, r: Math.random()*1.8+0.6, vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3, op: Math.random()*0.5+0.2 }));
    let anim;
    const draw = () => {
      ctx.clearRect(0,0,w,h);
      const c = cor();
      ps.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=w; if(p.x>w)p.x=0; if(p.y<0)p.y=h; if(p.y>h)p.y=0;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=c; ctx.globalAlpha=p.op; ctx.fill();
      });
      ctx.globalAlpha=1;
      anim=requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { w=window.innerWidth; h=window.innerHeight; canvas.width=w; canvas.height=h; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(anim); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:'fixed', top:0, left:0, width:'100vw', height:'100vh', zIndex:1, pointerEvents:'none' }} />;
}

// ─── Rastro de partículas do cursor ───────────────────────────
function CursorTrail() {
  useEffect(() => {
    const particles = [];
    const onMove = (e) => {
      for (let i = 0; i < 3; i++) {
        const el = document.createElement('div');
        el.className = 'cursor-trail-particle';
        el.style.left = e.clientX + 'px';
        el.style.top  = e.clientY + 'px';
        document.body.appendChild(el);
        particles.push(el);
        setTimeout(() => { el.remove(); }, 600);
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => { window.removeEventListener('mousemove', onMove); particles.forEach(p => p.remove()); };
  }, []);
  return null;
}

// ─── Cursor neon ──────────────────────────────────────────────
function CursorNeon() {
  const [pos, setPos] = useState({ x:-100, y:-100 });
  const [exp, setExp]  = useState(false);
  const [mob, setMob]  = useState(false);
  useEffect(() => {
    const isMob = window.innerWidth < 768;
    setMob(isMob);
    if (isMob) return;
    const mv = (e) => setPos({ x:e.clientX, y:e.clientY });
    const ov = (e) => setExp(!!(e.target.closest && e.target.closest('a,button,input')));
    window.addEventListener('mousemove', mv);
    window.addEventListener('mouseover', ov);
    return () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseover', ov); };
  }, []);
  if (mob) return null;
  return <div className={`custom-neon-cursor ${exp ? 'cursor-expandido' : ''}`} style={{ left:`${pos.x}px`, top:`${pos.y}px` }} />;
}

// ─── Mini jogo Snake ──────────────────────────────────────────
function SnakeGame({ onClose }) {
  const canvasRef = useRef(null);
  const stateRef  = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const SIZE   = 16;
    const W = Math.floor(canvas.width  / SIZE);
    const H = Math.floor(canvas.height / SIZE);

    const rndFood = (snake) => {
      let f;
      do { f = { x: Math.floor(Math.random()*W), y: Math.floor(Math.random()*H) }; }
      while (snake.some(s => s.x===f.x && s.y===f.y));
      return f;
    };

    const init = () => {
      const snake = [{ x:Math.floor(W/2), y:Math.floor(H/2) }];
      return { snake, dir:{x:1,y:0}, next:{x:1,y:0}, food: rndFood(snake), score:0, dead:false };
    };

    stateRef.current = init();

    const onKey = (e) => {
      const d = stateRef.current.next;
      if (e.key==='ArrowUp'    && d.y!==1)  stateRef.current.next={x:0,y:-1};
      if (e.key==='ArrowDown'  && d.y!==-1) stateRef.current.next={x:0,y:1};
      if (e.key==='ArrowLeft'  && d.x!==1)  stateRef.current.next={x:-1,y:0};
      if (e.key==='ArrowRight' && d.x!==-1) stateRef.current.next={x:1,y:0};
      if (e.key==='Escape') onClose();
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);

    const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#4b80e2';

    const tick = () => {
      const s = stateRef.current;
      if (s.dead) {
        ctx.fillStyle='rgba(0,0,0,0.7)'; ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle='#fff'; ctx.font='bold 20px monospace'; ctx.textAlign='center';
        ctx.fillText(`Game Over! Score: ${s.score}`, canvas.width/2, canvas.height/2-10);
        ctx.font='14px monospace';
        ctx.fillText('Pressione R para reiniciar', canvas.width/2, canvas.height/2+20);
        return;
      }

      s.dir = s.next;
      const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };

      // paredes
      if (head.x<0||head.x>=W||head.y<0||head.y>=H||s.snake.some(seg=>seg.x===head.x&&seg.y===head.y)) {
        s.dead=true; return;
      }

      s.snake.unshift(head);
      if (head.x===s.food.x && head.y===s.food.y) {
        s.score++;
        s.food = rndFood(s.snake);
      } else {
        s.snake.pop();
      }

      ctx.fillStyle='#050505'; ctx.fillRect(0,0,canvas.width,canvas.height);

      // grid
      ctx.strokeStyle='rgba(255,255,255,0.04)';
      for (let x=0;x<W;x++) { ctx.beginPath(); ctx.moveTo(x*SIZE,0); ctx.lineTo(x*SIZE,canvas.height); ctx.stroke(); }
      for (let y=0;y<H;y++) { ctx.beginPath(); ctx.moveTo(0,y*SIZE); ctx.lineTo(canvas.width,y*SIZE); ctx.stroke(); }

      // cobra
      s.snake.forEach((seg,i) => {
        ctx.fillStyle = i===0 ? '#fff' : primary;
        ctx.shadowColor = primary; ctx.shadowBlur = 8;
        ctx.fillRect(seg.x*SIZE+1, seg.y*SIZE+1, SIZE-2, SIZE-2);
      });
      ctx.shadowBlur=0;

      // comida
      ctx.fillStyle='#ff007f'; ctx.shadowColor='#ff007f'; ctx.shadowBlur=12;
      ctx.beginPath(); ctx.arc(s.food.x*SIZE+SIZE/2, s.food.y*SIZE+SIZE/2, SIZE/2-2, 0, Math.PI*2); ctx.fill();
      ctx.shadowBlur=0;

      // score
      ctx.fillStyle='#fff'; ctx.font='14px monospace'; ctx.textAlign='left';
      ctx.fillText(`Score: ${s.score}`, 8, 20);
    };

    const onR = (e) => { if(e.key==='r'||e.key==='R') stateRef.current = init(); };
    window.addEventListener('keydown', onR);

    const iv = setInterval(tick, 120);
    return () => { clearInterval(iv); window.removeEventListener('keydown', onKey); window.removeEventListener('keydown', onR); };
  }, [onClose]);

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.92)', zIndex:99999, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'12px' }}>
      <div style={{ color:'var(--primary)', fontFamily:"'Fira Code',monospace", fontSize:'1.1rem', letterSpacing:2 }}>
        🐍 SNAKE — setas para mover · ESC para fechar · R para reiniciar
      </div>
      <canvas ref={canvasRef} width={480} height={320} style={{ border:'1px solid var(--primary)', borderRadius:8, boxShadow:'0 0 24px var(--primary)' }} />
    </div>
  );
}

// ─── Easter egg Energético (lata neon + status bars) ──────────
// Componente Interno do Easter Egg do Energético (Atualizado)
function EnergeticoEasterEgg({ onClose, imagemLata }) {
  const STATUS_ENERGETICO = [
    { label: 'Foco', value: '100%' },
    { label: 'Energia', value: '100%' },
    { label: 'Insônia', value: '85%' },
  ];

  useEffect(() => {
    const esc = (e) => { if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown', esc);
    const tempo = setTimeout(onClose, 7000);
    return () => {
      window.removeEventListener('keydown', esc);
      clearTimeout(tempo);
    };
  }, [onClose]);

  return (
    <div className="energetico-easter-egg" onClick={onClose, imagemLata}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght=700&display=swap');
          
          .monster-lata-premium-wrap {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
            width: 100%;
          }

          .monster-lata-image {
            width: auto;
            height: 320px;
            display: block;
            filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.65));
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
          }

          .monster-lata-image:hover {
            transform: scale(1.06) rotate(1.5deg);
          }
        `}
      </style>

      <div className="energetico-inner" onClick={(e) => e.stopPropagation()}>
        
        {/* Renderização da Imagem Local vinda por Propriedade */}
        <div className="monster-lata-premium-wrap">
          {imagemLata ? (
            <img 
              src={imagemLata} 
              alt="Monster Energy Ultra White" 
              className="monster-lata-image"
            />
          ) : (
            <div style={{ color: '#ff4a4a', fontSize: '0.9rem', textAlign: 'center', height: '320px', display: 'flex', alignItems: 'center' }}>
              [Imagem da lata não encontrada. Verifique o caminho no App.jsx]
            </div>
          )}
        </div>

        {/* Área de Conteúdo Inferior Totalmente Preservada */}
        <div className="energetico-conteudo-inferior" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', boxSizing: 'border-box' }}>
          <div className="energetico-text">
            <span style={{ fontFamily: "'Oswald', 'Arial Black', sans-serif", fontWeight: 700 }}>
              ENERGIA MÁXIMA!
            </span>
            <small style={{ display: 'block' }}>⚡ +100% DE FOCO TURBINADO ⚡</small>
          </div>
          
          <StatusBars itens={STATUS_ENERGETICO} />
          
          <small style={{ color: '#888', fontSize: '0.7rem', display: 'block', textAlign: 'center', marginTop: '5px' }}>
            Clique fora ou ESC para fechar
          </small>
        </div>

      </div>
      <div className="monster-scanlines" />
    </div>
  );
}

// ─── Easter egg Café (xícara com vapor + status bars) ─────────
function CafeEasterEgg({ onClose }) {
  useEffect(() => {
    const esc = (e) => { if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown', esc);
    setTimeout(onClose, 7000);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);
  return (
    <div className="cafe-easter-egg" onClick={onClose}>
      <div className="cafe-inner" onClick={(e) => e.stopPropagation()}>
        <div className="cafe-xicara-wrap">
          <span className="cafe-vapor" />
          <span className="cafe-vapor" />
          <span className="cafe-vapor" />
          <span className="cafe-xicara">☕</span>
        </div>
        <div className="cafe-text">
          <span>HORA DO CAFÉ!</span>
          <small>☕ MODO FOCO ATIVADO ☕</small>
        </div>
        <StatusBars itens={STATUS_CAFE} />
        <small style={{ color:'#888', fontSize:'0.7rem' }}>Clique fora ou ESC para fechar</small>
      </div>
      <div className="monster-scanlines" />
    </div>
  );
}

// ─── Barra de progresso de leitura ────────────────────────────
function BarraProgresso() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? Math.round((window.scrollY / total) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{ position:'fixed', top:0, left:0, width:'100%', height:'3px', zIndex:99999, background:'rgba(255,255,255,0.05)' }}>
      <div style={{ height:'100%', width:`${pct}%`, background:'var(--primary)', boxShadow:'0 0 8px var(--primary)', transition:'width 0.1s linear' }} />
    </div>
  );
}

// ─── Botão voltar ao topo ─────────────────────────────────────
function BotaoTopo() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const onScroll = () => setVis(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className="btn-voltar-topo"
      style={{ opacity: vis ? 1 : 0, pointerEvents: vis ? 'auto' : 'none' }}
      onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
      title="Voltar ao topo"
    >↑</button>
  );
}

// ─── Toast de boas-vindas ─────────────────────────────────────
function ToastBoasVindas() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const j = localStorage.getItem('portfolio_visited');
    if (!j) {
      localStorage.setItem('portfolio_visited', '1');
      setTimeout(() => setVis(true), 1800);
      setTimeout(() => setVis(false), 7000);
    }
  }, []);
  if (!vis) return null;
  return (
    <div className="toast-boasvindas">
      <span>👋 Olá! Digite <strong>/help</strong> no terminal para ver os segredos.</span>
      <button onClick={() => setVis(false)}>×</button>
    </div>
  );
}

// ─── GitHub Activity Feed ──────────────────────────────────────
function GitHubFeed({ usuario = 'jose-c-web' }) {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${usuario}/events/public?per_page=6`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setEventos(data.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [usuario]);

  const tipoIcone = (type) => {
    const map = { PushEvent:'📦', CreateEvent:'🌿', PullRequestEvent:'🔀', IssuesEvent:'🐛', WatchEvent:'⭐', ForkEvent:'🍴' };
    return map[type] || '⚡';
  };

  const tipoLabel = (e) => {
    if (e.type === 'PushEvent') return `Push em ${e.repo.name.split('/')[1]}`;
    if (e.type === 'CreateEvent') return `Criou ${e.payload.ref_type} em ${e.repo.name.split('/')[1]}`;
    if (e.type === 'WatchEvent') return `⭐ ${e.repo.name.split('/')[1]}`;
    return `${e.type.replace('Event','')} em ${e.repo.name.split('/')[1]}`;
  };

  const dataRelativa = (iso) => {
    const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
    if (diff < 60) return `${diff}s atrás`;
    if (diff < 3600) return `${Math.floor(diff/60)}min atrás`;
    if (diff < 86400) return `${Math.floor(diff/3600)}h atrás`;
    return `${Math.floor(diff/86400)}d atrás`;
  };

  return (
    <div className="github-feed">
      <h4 style={{ marginBottom:'10px', color:'var(--primary)', fontSize:'0.85rem', letterSpacing:1 }}>
        ⚡ GitHub Activity
      </h4>
      {loading ? (
        <div style={{ color:'#666', fontSize:'0.8rem', fontFamily:"'Fira Code',monospace" }}>Carregando...</div>
      ) : eventos.length === 0 ? (
        <div style={{ color:'#666', fontSize:'0.8rem' }}>Nenhum evento recente.</div>
      ) : (
        eventos.map((e, i) => (
          <div key={i} className="github-feed-item">
            <span className="gh-icon">{tipoIcone(e.type)}</span>
            <div className="gh-info">
              <span className="gh-label">{tipoLabel(e)}</span>
              <span className="gh-time">{dataRelativa(e.created_at)}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// APP PRINCIPAL
// ═══════════════════════════════════════════════════════════════
export default function App() {
  // ── boot ──
  const [carregando, setCarregando]   = useState(true);
  const [linhasBoot, setLinhasBoot]   = useState([]);

  // ── conquistas ──
  const [conquistaAtiva, setConquistaAtiva]         = useState(null);
  const [conquistasDesbloqueadas, setConquistasDesbloqueadas] = useState(() => {
    try { const s = localStorage.getItem('portfolio_conquistas'); return s ? JSON.parse(s) : []; }
    catch { return []; }
  });

  // ── XP ──
  const [xp, setXp] = useState(() => {
    try { return parseInt(localStorage.getItem('portfolio_xp') || '0'); } catch { return 0; }
  });

  // ── tempo ──
  const [tempoSegundos, setTempoSegundos] = useState(0);

  // ── painel ──
  const [menuAberto, setMenuAberto]       = useState(false);
  const [lanternaAtiva, setLanternaAtiva] = useState(true);
  const [animacoesAtivas, setAnimacoesAtivas] = useState(true);
  const [nivelBlur, setNivelBlur]         = useState(8);
  const [fonteSelecionada, setFonteSelecionada] = useState("'Poppins', sans-serif");
  const [tamanhoFonte, setTamanhoFonte]   = useState(16);
  const [particulasAtivas, setParticulasAtivas] = useState(true);
  const [cursorTrailAtivo, setCursorTrailAtivo] = useState(false);
  const [contadorVisitas, setContadorVisitas]   = useState(1337);

  // ── UI ──
  const [idioma, setIdioma]               = useState('pt');
  const [glitchAtivo, setGlitchAtivo]     = useState(false);
  const [cursorAtivo, setCursorAtivo]     = useState(false);
  const [musicaAtiva, setMusicaAtiva]     = useState(false);
  const [musicaAtualIndex, setMusicaAtualIndex] = useState(0);
  const [comandoInput, setComandoInput]   = useState('');
  const [retornoTerminal, setRetornoTerminal]   = useState('');
  const [linkedinMode, setLinkedinMode]   = useState(false);
  const [lofiMode, setLofiMode]           = useState(false);

  // ── efeitos especiais ──
  const [chuvaMatrix, setChuvaMatrix]     = useState(false);
  const [hackSim, setHackSim]             = useState(false);
  const [linhasHack, setLinhasHack]       = useState([]);
  const [contadorGlitch, setContadorGlitch] = useState(0);
  const [telaAzul, setTelaAzul]           = useState(false);

  // ── easter eggs ──
  const [snakeAberto, setSnakeAberto]     = useState(false);
  const [energeticoAtivo, setEnergeticoAtivo] = useState(false);
  const [cafeAtivo, setCafeAtivo]         = useState(false);
  const [konamiSeq, setKonamiSeq]         = useState([]);
  const [recruiterMode, setRecruiterMode] = useState(false);

  // ── cor ──
  const [corHexInput, setCorHexInput]     = useState('#4b80e2');
  const [corHexErro, setCorHexErro]       = useState(false);

  // ── arrastar botão ───────────────────────────────────────────
  const [btnPos, setBtnPos]               = useState({ x: window.innerWidth - 60, y: window.innerHeight / 2 - 25 });
  const isDragging   = useRef(false);
  const dragStart    = useRef({ x:0, y:0 });
  const dragStartPos = useRef({ x:0, y:0 });
  const hasMoved     = useRef(false);
  const audioRef     = useRef(null);

  const t = traducoes[idioma] || traducoes.pt;
  const mestreDoSistema = conquistasDesbloqueadas.length === LISTA_CONQUISTAS.length;
  const xpLevel = Math.floor(xp / 100) + 1;

  // ── helpers ──────────────────────────────────────────────────
  const ganharXP = useCallback((acao) => {
    const ganho = XP_ACTIONS[acao] || 10;
    setXp(prev => {
      const novo = prev + ganho;
      try { localStorage.setItem('portfolio_xp', String(novo)); } catch {}
      return novo;
    });
  }, []);

  const desbloquearConquista = useCallback((id, titulo, icone = "🏆") => {
    setConquistasDesbloqueadas(prev => {
      if (prev.includes(id)) return prev;
      const nova = [...prev, id];
      try { localStorage.setItem('portfolio_conquistas', JSON.stringify(nova)); } catch {}
      setConquistaAtiva({ titulo, icone });
      setTimeout(() => setConquistaAtiva(null), 4000);
      ganharXP('conquista');
      return nova;
    });
  }, [ganharXP]);

  const limparConquistas = () => {
    localStorage.removeItem('portfolio_conquistas');
    localStorage.removeItem('portfolio_xp');
    setConquistasDesbloqueadas([]);
    setXp(0);
    setRetornoTerminal("Sistema reiniciado. Conquistas e XP limpos!");
  };

  const mudarCorPrincipal = useCallback((hex) => {
    document.documentElement.style.setProperty('--primary', hex);
    document.documentElement.style.setProperty('--primary-rgb', hexParaRgbString(hex));
    desbloquearConquista("cor_custom","Estilista Cyber: Mudou as cores!","🎨");
    ganharXP('mudar_cor');
  }, [desbloquearConquista, ganharXP]);

  // ── boot ─────────────────────────────────────────────────────
  useEffect(() => {
    const h = new Date().getHours();
    const logs = [
      "> CONNECTING TO JOSE-C-WEB CORE...",
      "> LOADING PROJECTS [OK]",
      "> LOADING CERTIFICATES [OK]",
      (h>=0&&h<5) ? "> WARNING: WORKING LATE NIGHT DETECTED... GO TO SLEEP 🌙" : null,
      "> INITIALIZING INTERACTIVE UI... [SUCCESS]",
      "> XP SYSTEM ONLINE [OK]",
      "> TYPE /help FOR COMMANDS",
    ].filter(Boolean);
    logs.forEach((l,i) => setTimeout(() => setLinhasBoot(p=>[...p,l]), (i+1)*350));
    setTimeout(() => setCarregando(false), (logs.length+1)*350);
    document.documentElement.style.setProperty('--primary-rgb', hexParaRgbString('#4b80e2'));
  }, []);

  // ── contador de tempo ─────────────────────────────────────────
  useEffect(() => {
    const iv = setInterval(() => {
      setTempoSegundos(s => {
        const novo = s + 1;
        if (novo === 300) { // 5 min
          desbloquearConquista("tempo5min","Tá Curtindo! 5min no portfólio","⏱️");
        }
        return novo;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [desbloquearConquista]);

  // ── XP 1000 ──────────────────────────────────────────────────
  useEffect(() => {
    if (xp >= 1000) desbloquearConquista("xp1000","Level Up! 1000 XP acumulados","⭐");
  }, [xp, desbloquearConquista]);

  // ── Konami Code ───────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      setKonamiSeq(prev => {
        const next = [...prev, e.key].slice(-KONAMI_CODE.length);
        if (next.join(',') === KONAMI_CODE.join(',')) {
          // ativa efeito especial
          mudarCorPrincipal('#e5ff00');
          setCorHexInput('#e5ff00');
          setChuvaMatrix(true);
          setTimeout(() => setChuvaMatrix(false), 4000);
          setRetornoTerminal("🎮 KONAMI CODE ATIVADO! +100 XP!");
          desbloquearConquista("konami","Cheat Ativado! Konami Code!","🎮");
          setXp(p => { const n=p+100; try{localStorage.setItem('portfolio_xp',String(n));}catch{} return n; });
          return [];
        }
        return next;
      });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mudarCorPrincipal, desbloquearConquista]);

  // ── Intersection Observer (visitar seção) ─────────────────────
  useEffect(() => {
    const secs = document.querySelectorAll('section[id]');
    const visited = new Set();
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting && !visited.has(en.target.id)) {
          visited.add(en.target.id);
          ganharXP('visitar_secao');
        }
      });
    }, { threshold: 0.3 });
    secs.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, [ganharXP]);

  // ── Salvar/restaurar tema no localStorage ──────────────────────
  useEffect(() => {
    try {
      const tema = localStorage.getItem('portfolio_tema');
      if (tema) {
        const { cor, fonte, tamanho } = JSON.parse(tema);
        if (cor)    { setCorHexInput(cor); mudarCorPrincipal(cor); }
        if (fonte)  setFonteSelecionada(fonte);
        if (tamanho) setTamanhoFonte(tamanho);
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_tema', JSON.stringify({ cor: corHexInput, fonte: fonteSelecionada, tamanho: tamanhoFonte }));
    } catch {}
  }, [corHexInput, fonteSelecionada, tamanhoFonte]);

  // ── Compartilhamento de tema via URL ──────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cor    = params.get('cor');
    const fonte  = params.get('fonte');
    const tam    = params.get('tam');
    if (cor && hexValido('#'+cor)) { const h='#'+cor; setCorHexInput(h); mudarCorPrincipal(h); }
    if (fonte) setFonteSelecionada(decodeURIComponent(fonte));
    if (tam)   setTamanhoFonte(Number(tam));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copiarLinkTema = () => {
    const cor   = corHexInput.replace('#','');
    const fonte = encodeURIComponent(fonteSelecionada);
    const url   = `${window.location.origin}${window.location.pathname}?cor=${cor}&fonte=${fonte}&tam=${tamanhoFonte}`;
    navigator.clipboard.writeText(url).then(() => setRetornoTerminal("🔗 Link do tema copiado!")).catch(() => setRetornoTerminal("Erro ao copiar link."));
  };

  // ── Lo-fi mode ────────────────────────────────────────────────
  useEffect(() => {
    if (lofiMode) {
      document.documentElement.style.setProperty('--primary', '#b8a9c9');
      document.documentElement.style.setProperty('--bg-dark', '#1a1a2e');
      document.body.style.filter = 'saturate(0.6) brightness(0.9)';
      setGlitchAtivo(false);
      setParticulasAtivas(false);
    } else {
      document.body.style.filter = '';
      // restaura cor salva
      if (hexValido(corHexInput)) mudarCorPrincipal(corHexInput);
      document.documentElement.style.setProperty('--bg-dark', '#050505');
      setParticulasAtivas(true);
    }
  }, [lofiMode, corHexInput, mudarCorPrincipal]);

  // ── Recruiter mode ────────────────────────────────────────────
  useEffect(() => {
    if (recruiterMode) {
      setGlitchAtivo(false);
      setParticulasAtivas(false);
      setCursorAtivo(false);
      mudarCorPrincipal('#0a66c2');
      setCorHexInput('#0a66c2');
      document.body.classList.add('recruiter-mode');
    } else {
      document.body.classList.remove('recruiter-mode');
      setParticulasAtivas(true);
    }
  }, [recruiterMode, mudarCorPrincipal]);

  // ── glitch na borda ao scroll ─────────────────────────────────
  useEffect(() => {
    if (!glitchAtivo) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastY);
      if (delta > 80) {
        document.body.classList.add('section-glitch-flash');
        setTimeout(() => document.body.classList.remove('section-glitch-flash'), 300);
      }
      lastY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [glitchAtivo]);

  // ── terminal ─────────────────────────────────────────────────
  const executarComando = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = comandoInput.trim().toLowerCase();
    setComandoInput('');
    ganharXP('comando_terminal');

    if (cmd === '/secret') {
      mudarCorPrincipal('#00ff41'); setCorHexInput('#00ff41');
      setRetornoTerminal("Matrix Mode Active.");
      desbloquearConquista("hacker","Hacker Nato: Usou o terminal!","🖥️");

    } else if (cmd === '/matrix') {
      setChuvaMatrix(true);
      setRetornoTerminal("Iniciando Matrix Rain por 5 segundos...");
      setTimeout(() => setChuvaMatrix(false), 5000);

    } else if (cmd === '/play') {
      setSnakeAberto(true);
      setRetornoTerminal("🐍 Snake iniciado! Use as setas. ESC para fechar.");
      desbloquearConquista("snake","Víbora Cibernética: Jogou o Snake!","🐍");

    } else if (cmd === '/monster') {
      setEnergeticoAtivo(true);
      setRetornoTerminal("⚡ ENERGIA MÁXIMA ATIVADA...");
      desbloquearConquista("monster","Energizado! Tomou um Energético!","⚡");

    } else if (cmd === '/cafe') {
      setCafeAtivo(true);
      setRetornoTerminal("☕ PREPARANDO UM CAFÉ...");
      desbloquearConquista("cafe","Cafeinado(a)! Tomou um café!","☕");

    } else if (cmd === '/recruiter') {
      setRecruiterMode(r => !r);
      setRetornoTerminal(recruiterMode ? "Modo RH desativado." : "📋 Modo Recrutador ativado! Bem-vindo, RH.");
      if (!recruiterMode) desbloquearConquista("recruiter","Modo RH ativado!","📋");

    } else if (cmd === '/lofi') {
      setLofiMode(l => !l);
      setRetornoTerminal(lofiMode ? "Lo-fi desativado." : "🎵 Lo-Fi Vibes ativado. Relaxa...");
      if (!lofiMode) desbloquearConquista("lofi","Lo-Fi Vibes!","🎵");

    } else if (cmd === '/share') {
      copiarLinkTema();

    } else if (cmd === '/sudo-hack') {
      setHackSim(true); setLinhasHack([]);
      setRetornoTerminal("Bypassing firewalls...");
      const logs = ["ESTABLISHING PROXY... [OK]","OVERRIDING SECURITY... [OK]","ACCESSING ROOT...","DECRYPTING CV_JOSE_C.pdf...","DOWNLOADING..."];
      logs.forEach((l,i) => setTimeout(() => {
        setLinhasHack(p=>[...p,`> ${l}`]);
        if(i===logs.length-1) setTimeout(()=>{ setHackSim(false); window.open("https://github.com/jose-c-web","_blank"); },800);
      }, (i+1)*400));

    } else if (cmd === '/rickroll') {
      setRetornoTerminal("Never gonna give you up! 🎶");
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ","_blank");

    } else if (cmd === '/colors') {
      setRetornoTerminal("Temas: /dracula /matrix-theme /cyberpunk-theme");

    } else if (cmd === '/matrix-theme') {
      mudarCorPrincipal('#00ff41'); setCorHexInput('#00ff41'); setRetornoTerminal("Tema Matrix ativado.");
    } else if (cmd === '/cyberpunk-theme') {
      mudarCorPrincipal('#ff007f'); setCorHexInput('#ff007f'); setRetornoTerminal("Tema Cyberpunk ativado.");
    } else if (cmd === '/dracula') {
      mudarCorPrincipal('#ff79c6'); setCorHexInput('#ff79c6'); setRetornoTerminal("Dracula Mode Active.");

    } else if (cmd === '/dev') {
      setRetornoTerminal("Modo Dev Ativado. Você é fera!");
      desbloquearConquista("dev","Mestre do Código!","👨‍💻");

    } else if (cmd === '/linkedin-mode') {
      setLinkedinMode(l => !l);
      if (!linkedinMode) {
        mudarCorPrincipal('#0a66c2'); setCorHexInput('#0a66c2');
        setRetornoTerminal("Modo Corporativo ativado.");
        desbloquearConquista("linkedin","Aprovado pelo RH!","👔");
      } else {
        mudarCorPrincipal('#4b80e2'); setCorHexInput('#4b80e2');
        setRetornoTerminal("Modo Cyberpunk restaurado.");
      }

    } else if (cmd === '/clear') {
      setRetornoTerminal('');

    } else if (cmd === '/xp') {
      setRetornoTerminal(`⭐ XP: ${xp} | Level: ${xpLevel}`);

    } else if (cmd === '/tempo') {
      setRetornoTerminal(`⏱️ Você está aqui há ${formatarTempo(tempoSegundos)}`);

    } else if (cmd === '/github') {
      setRetornoTerminal("Abrindo GitHub...");
      window.open("https://github.com/jose-c-web","_blank");

    } else if (cmd === '/linkedin') {
      setRetornoTerminal("Abrindo LinkedIn...");
      window.open("https://linkedin.com/","_blank");

    } else if (['/projects','/certificados','/contact','/sobre','/about'].includes(cmd)) {
      const id = cmd.replace('/','');
      document.getElementById(id==='sobre'||id==='about'?'about':id)?.scrollIntoView({behavior:'smooth'});
      setRetornoTerminal(`Roteando para #${id}...`);

    } else if (cmd === '/help' || cmd === '/comandos' || cmd === '/ajuda' || cmd === '/commands') {
      setRetornoTerminal(
        "/play /monster /cafe /lofi /recruiter /share /xp /tempo\n"+
        "/secret /matrix /sudo-hack /rickroll /dev /clear\n"+
        "/colors /dracula /matrix-theme /cyberpunk-theme\n"+
        "/github /linkedin /linkedin-mode /sobre /projects"
      );
    } else {
      setRetornoTerminal(t.comandoInvalido);
    }
  };

  // ── segurança / BSOD ─────────────────────────────────────────
  const interagirComSeguranca = () => {
    setContadorGlitch(p => {
      const n = p + 1;
      if (n >= 6) {
        setGlitchAtivo(true);
        setTimeout(() => { setTelaAzul(true); setTimeout(() => { setTelaAzul(false); setGlitchAtivo(false); setRetornoTerminal("> CORE RESTORED IN SAFE MODE."); }, 2000); }, 800);
        return 0;
      }
      return n;
    });
  };

  const abrirConfiguracoes = () => {
    interagirComSeguranca();
    setMenuAberto(m => !m);
    desbloquearConquista("curioso","Curioso: Abriu as configurações!","⚙️");
    ganharXP('abrir_painel');
  };

  // ── música ───────────────────────────────────────────────────
  const proximaMusica  = () => setMusicaAtualIndex(i => (i+1) % PLAYLIST.length);
  const musicaAnterior = () => setMusicaAtualIndex(i => (i-1+PLAYLIST.length) % PLAYLIST.length);

  useEffect(() => {
    if (!audioRef.current) return;
    if (musicaAtiva) {
      audioRef.current.load();
      audioRef.current.play().catch(() => setMusicaAtiva(false));
      desbloquearConquista("dj","DJ do Ciberespaço!","📻");
    } else {
      audioRef.current.pause();
    }
  }, [musicaAtiva, musicaAtualIndex, desbloquearConquista]);

  // ── arrastar botão ───────────────────────────────────────────
  const iniciarArrastar = (e) => {
    isDragging.current = true; hasMoved.current = false;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    dragStart.current = { x:cx, y:cy };
    dragStartPos.current = { x:btnPos.x, y:btnPos.y };
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging.current) return;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = cx - dragStart.current.x, dy = cy - dragStart.current.y;
      if (Math.abs(dx)>4||Math.abs(dy)>4) hasMoved.current = true;
      setBtnPos({ x: Math.max(10,Math.min(window.innerWidth-50,dragStartPos.current.x+dx)), y: Math.max(10,Math.min(window.innerHeight-50,dragStartPos.current.y+dy)) });
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', () => isDragging.current=false);
    return () => window.removeEventListener('mousemove', onMove);
  }, [btnPos]);

  // ── visitas ──────────────────────────────────────────────────
  useEffect(() => {
    try {
      const v = parseInt(localStorage.getItem('portfolio_visitas_user')||'0') + 1;
      localStorage.setItem('portfolio_visitas_user', v);
      setContadorVisitas(3412 + v);
    } catch { setContadorVisitas(3412); }
  }, []);

  // ── mouse lanterna ───────────────────────────────────────────
  useEffect(() => {
    const root = document.documentElement;
    const mv = (e) => { root.style.setProperty('--mouse-x',`${e.clientX}px`); root.style.setProperty('--mouse-y',`${e.clientY}px`); };
    const tm = (e) => { if(e.touches.length>0){ root.style.setProperty('--mouse-x',`${e.touches[0].clientX}px`); root.style.setProperty('--mouse-y',`${e.touches[0].clientY}px`); } };
    window.addEventListener('mousemove', mv);
    window.addEventListener('touchmove', tm, { passive:true });
    window.addEventListener('touchstart', tm, { passive:true });
    return () => { window.removeEventListener('mousemove', mv); window.removeEventListener('touchmove', tm); window.removeEventListener('touchstart', tm); };
  }, []);

  // ── efeitos CSS ──────────────────────────────────────────────
  useEffect(() => { document.body.classList.toggle('lanterna-ativa', lanternaAtiva); document.documentElement.style.setProperty('--lanterna-opacity', lanternaAtiva?'1':'0'); }, [lanternaAtiva]);
  useEffect(() => { document.body.classList.toggle('disable-animations', !animacoesAtivas); }, [animacoesAtivas]);
  useEffect(() => { document.documentElement.style.setProperty('--card-blur', `${nivelBlur}px`); }, [nivelBlur]);
  useEffect(() => { document.documentElement.style.setProperty('--font-family', fonteSelecionada); }, [fonteSelecionada]);
  useEffect(() => { document.documentElement.style.setProperty('--font-size-base', `${tamanhoFonte}px`); document.documentElement.style.fontSize = `${tamanhoFonte}px`; }, [tamanhoFonte]);
  useEffect(() => { document.body.classList.toggle('cyber-glitch-active', glitchAtivo); }, [glitchAtivo]);

  const aoSelecionarCorPicker = (hex) => { setCorHexInput(hex); setCorHexErro(false); mudarCorPrincipal(hex); };
  const aoDigitarCorHex = (v) => { setCorHexInput(v); if(hexValido(v)){setCorHexErro(false);mudarCorPrincipal(v);}else{setCorHexErro(true);} };

  // ────────────────────────────────────────────────────────────
  // RENDER
  // ────────────────────────────────────────────────────────────
  return (
    <>
      {carregando ? (
        <div style={{ position:'fixed', inset:0, background:'#000', color:'#00ff41', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'monospace', zIndex:999999 }}>
          <div style={{ textAlign:'left', maxWidth:'80%' }}>
            {linhasBoot.map((l,i) => <div key={i} style={{ margin:'5px 0' }}>{l}</div>)}
            <div className="boot-blinking-cursor">_</div>
          </div>
        </div>
      ) : (
        <>
          {/* ── overlays ── */}
          {telaAzul && (
            <div style={{ position:'fixed', inset:0, background:'#0000aa', color:'#fff', fontFamily:'monospace', padding:'40px', zIndex:100000, display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <h1 style={{ fontSize:'3rem', marginBottom:'20px' }}>:( SYSTEM_ERROR</h1>
              <p>A fatal exception 0x0000007B has occurred at core memory structure mapping.</p>
              <p style={{ marginTop:'20px' }}>* System will attempt auto-recovery...</p>
            </div>
          )}
          {chuvaMatrix && <MatrixRainEffect />}
          {hackSim && (
            <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.95)', color:'#00ff00', fontFamily:"'Fira Code',monospace", padding:'30px', zIndex:99998, pointerEvents:'none', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
              <div style={{ border:'1px solid #ff0055', padding:'20px', background:'#000', borderRadius:'8px', minWidth:'300px', boxShadow:'0 0 15px #ff0055' }}>
                <h3 style={{ color:'#ff0055', textAlign:'center', marginBottom:'15px' }}>⚠️ OVERRIDE PAYLOAD</h3>
                {linhasHack.map((l,i)=><div key={i} style={{ marginBottom:'8px', fontSize:'0.85rem' }}>{l}</div>)}
              </div>
            </div>
          )}
          {snakeAberto && <SnakeGame onClose={() => setSnakeAberto(false)} />}
          {energeticoAtivo && <EnergeticoEasterEgg onClose={() => setEnergeticoAtivo(false)} />}
          {cafeAtivo && <CafeEasterEgg onClose={() => setCafeAtivo(false)} />}

          {/* ── conquista popup ── */}
          {conquistaAtiva && (
            <div className="achievement-popup">
              <div className="achievement-icon">{conquistaAtiva.icone}</div>
              <div className="achievement-info">
                <h5>CONQUISTA DESBLOQUEADA</h5>
                <p>{conquistaAtiva.titulo}</p>
              </div>
            </div>
          )}

          {/* ── elementos globais ── */}
          <BarraProgresso />
          <ToastBoasVindas />
          <BotaoTopo />
          {particulasAtivas && <ParticulasFundo />}
          {cursorAtivo && <CursorNeon />}
          {cursorTrailAtivo && <CursorTrail />}
          <audio ref={audioRef} src={PLAYLIST[musicaAtualIndex].arquivo} loop />

          {/* ── conteúdo principal ── */}
          <div onClick={interagirComSeguranca}><Header /></div>
          <About />
          <Projects />
          <Certificados />
          <Contact />
          <Footer />

          {/* ── botão flutuante ── */}
          <button
            className="botao-engrenagem"
            onMouseDown={iniciarArrastar}
            onTouchStart={iniciarArrastar}
            onClick={() => { if(!hasMoved.current) abrirConfiguracoes(); }}
            style={{ position:'fixed', left:menuAberto?'auto':`${btnPos.x}px`, right:menuAberto?'280px':'auto', top:`${btnPos.y}px`, zIndex:10000, touchAction:'none', cursor:isDragging.current?'grabbing':'grab', transition:isDragging.current?'none':'left 0.4s ease,right 0.4s ease,top 0.2s ease-out' }}
          >
            {menuAberto ? "×" : "⚙️"}
          </button>

          {/* ── painel lateral ── */}
          <div className={`GerenciadorCores ${menuAberto?"aberto":""}`}>
            <div className="conteudo-cores" style={{ display:'flex', flexDirection:'column', gap:'15px', maxHeight:'85vh', overflowY:'auto' }}>

              <div style={{ textAlign:'center' }}><Clock /></div>

              {/* sistema ID */}
              <div style={{ background:'rgba(0,0,0,0.4)', padding:'10px', borderRadius:'8px', border:'1px solid var(--border-neon)', textAlign:'center' }}>
                <span style={{ fontSize:'0.7rem', color:'var(--text-gray)', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'4px' }}>{t.sistemaConectado}</span>
                <div style={{ fontFamily:"'Fira Code',monospace", color:'var(--primary)', fontWeight:'bold', fontSize:'1.1rem', letterSpacing:'2px' }}>
                  Nº SYS_{String(contadorVisitas).padStart(6,'0')}
                </div>
              </div>

              {/* ── XP + Tempo ── */}
              <div style={{ background:'rgba(0,0,0,0.3)', padding:'10px', borderRadius:'8px', border:'1px solid var(--border-neon)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'6px' }}>
                  <span style={{ fontSize:'0.75rem', color:'var(--text-gray)' }}>⭐ {t.xpLabel} — Lv.{xpLevel}</span>
                  <span style={{ fontFamily:"'Fira Code',monospace", fontSize:'0.75rem', color:'var(--primary)' }}>{xp} XP</span>
                </div>
                <div style={{ height:'6px', background:'rgba(255,255,255,0.08)', borderRadius:'3px', overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${(xp % 100)}%`, background:'var(--primary)', boxShadow:'0 0 6px var(--primary)', transition:'width 0.3s ease', borderRadius:'3px' }} />
                </div>
                <div style={{ marginTop:'8px', fontSize:'0.75rem', color:'var(--text-gray)', display:'flex', justifyContent:'space-between' }}>
                  <span>⏱️ {t.tempoLabel}</span>
                  <span style={{ fontFamily:"'Fira Code',monospace", color:'var(--primary)' }}>{formatarTempo(tempoSegundos)}</span>
                </div>
              </div>

              {/* terminal */}
              <div className="mini-terminal-container">
                <input type="text" className="terminal-input" value={comandoInput} onChange={(e) => setComandoInput(e.target.value)} onKeyDown={executarComando} placeholder={t.terminalPlaceholder} />
                {retornoTerminal && <div className="terminal-return" style={{ whiteSpace:'pre-line', fontSize:'0.8rem', marginTop:'6px', color:'var(--primary)' }}>{retornoTerminal}</div>}
              </div>

              {/* botão compartilhar tema */}
              <button onClick={copiarLinkTema} style={{ ...styles.fontBtn, border:'1px solid var(--border-neon)', color:'var(--primary)', fontSize:'0.78rem' }}>
                🔗 Compartilhar Tema
              </button>

              {/* conquistas */}
              <div className="secao-conquistas-painel">
                <h4 style={{ margin:0 }}>{t.conquistasTitulo} ({conquistasDesbloqueadas.length}/{LISTA_CONQUISTAS.length})</h4>
                <div className="lista-conquistas-grid">
                  {LISTA_CONQUISTAS.map(c => {
                    const ok = conquistasDesbloqueadas.includes(c.id);
                    return (
                      <div key={c.id} className={`item-conquista-status ${ok?'desbloqueada':'bloqueada'}`}>
                        <div className="icone-conquista-status">{ok ? c.icone : "🔒"}</div>
                        <div className="info-conquista-status"><h6>{c.titulo}</h6><p>{c.desc}</p></div>
                      </div>
                    );
                  })}
                </div>
                {conquistasDesbloqueadas.length > 0 && (
                  <button onClick={limparConquistas} style={{ ...styles.fontBtn, marginTop:'12px', background:'#2a0808', border:'1px solid #ff4a4a', color:'#ff8888', fontSize:'0.8rem' }}>
                    {t.limparConquistas}
                  </button>
                )}
              </div>

              <hr style={{ border:0, borderTop:'1px solid rgba(255,255,255,0.08)' }} />

              {/* GitHub Feed */}
              <GitHubFeed />

              <hr style={{ border:0, borderTop:'1px solid rgba(255,255,255,0.08)' }} />

              {/* idioma */}
              <div>
                <h4>{t.idiomaLabel}</h4>
                <div style={{ display:'flex', gap:'6px', marginTop:'8px' }}>
                  <button onClick={() => setIdioma('pt')} style={{ ...styles.fontBtn, border: idioma==='pt'?'1px solid var(--primary)':'1px solid #222' }}>PT-BR</button>
                  <button onClick={() => setIdioma('en')} style={{ ...styles.fontBtn, border: idioma==='en'?'1px solid var(--primary)':'1px solid #222' }}>EN</button>
                </div>
              </div>

              {/* cor */}
              <div>
                <h4>{t.corDestaque}</h4>
                {!mestreDoSistema ? (
                  <div style={{ marginTop:'8px' }}>
                    <span style={{ fontSize:'0.75rem', color:'#888', display:'block', marginBottom:'8px' }}>
                      {idioma==='pt' ? "🔒 Conclua as conquistas para o Seletor Hexadecimal!" : "🔒 Complete achievements for Hex Color Picker!"}
                    </span>
                    <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                      {CORES_PRE_PRONTAS.map(c => (
                        <button key={c.hex} onClick={() => { setCorHexInput(c.hex); setCorHexErro(false); mudarCorPrincipal(c.hex); }}
                          style={{ width:'28px', height:'28px', borderRadius:'50%', background:c.hex, border:corHexInput.toLowerCase()===c.hex.toLowerCase()?'2px solid #fff':'1px solid #000', cursor:'pointer' }}
                          title={c.nome}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginTop:'8px' }}>
                    <input type="color" value={hexValido(corHexInput)&&corHexInput.length===7?corHexInput:'#4b80e2'} onChange={(e)=>aoSelecionarCorPicker(e.target.value)} style={{ width:'42px', height:'42px', cursor:'pointer', background:'transparent', border:'1px solid var(--border-neon)', borderRadius:'8px' }} />
                    <input type="text" value={corHexInput} onChange={(e)=>aoDigitarCorHex(e.target.value)} maxLength={7} style={{ width:'100%', padding:'10px', background:'#0d0d0d', color:'#fff', border:'1px solid #222', borderRadius:'8px', fontFamily:"'Fira Code',monospace" }} />
                  </div>
                )}
                {corHexErro && <span style={{ color:'#ff4a4a', fontSize:'0.75rem' }}>{t.corHexInvalida}</span>}
              </div>

              <hr style={{ border:0, borderTop:'1px solid rgba(255,255,255,0.08)' }} />

              {/* tipografia */}
              <div>
                <h4>{t.tipografia}</h4>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px', marginTop:'8px' }}>
                  {FONTES_DISPONIVEIS.map(f => (
                    <button key={f.valor} onClick={() => setFonteSelecionada(f.valor)}
                      style={{ ...styles.fontBtn, fontFamily:f.valor, fontSize:'0.75rem', border:fonteSelecionada===f.valor?'1px solid var(--primary)':'1px solid #222' }}>
                      {f.nome}
                    </button>
                  ))}
                </div>
              </div>

              {/* tamanho fonte */}
              <div>
                <div style={styles.controlRow}>
                  <span>{t.tamanhoFonteLabel}</span>
                  <span style={{ fontFamily:"'Fira Code',monospace", color:'var(--primary)' }}>{tamanhoFonte}px</span>
                </div>
                <input type="range" min="12" max="24" value={tamanhoFonte} onChange={(e)=>setTamanhoFonte(Number(e.target.value))} style={{ width:'100%', accentColor:'var(--primary)' }} />
              </div>

              {/* blur */}
              <div>
                <div style={styles.controlRow}>
                  <span>{t.opacidadeVidro}</span>
                  <span style={{ fontFamily:"'Fira Code',monospace", color:'var(--primary)' }}>{nivelBlur}px</span>
                </div>
                <input type="range" min="0" max="20" value={nivelBlur} onChange={(e)=>setNivelBlur(Number(e.target.value))} style={{ width:'100%', accentColor:'var(--primary)' }} />
              </div>

              <hr style={{ border:0, borderTop:'1px solid rgba(255,255,255,0.08)' }} />

              {/* efeitos */}
              <div>
                <h4 style={{ marginBottom:'10px' }}>{t.efeitosSistema}</h4>
                <div style={styles.controlRow}><span>{t.lanterna}</span><input type="checkbox" checked={lanternaAtiva} onChange={(e)=>setLanternaAtiva(e.target.checked)} style={styles.checkbox}/></div>
                <div style={styles.controlRow}><span>{t.animacoes}</span><input type="checkbox" checked={animacoesAtivas} onChange={(e)=>setAnimacoesAtivas(e.target.checked)} style={styles.checkbox}/></div>
                <div style={styles.controlRow}><span>{t.partculas}</span><input type="checkbox" checked={particulasAtivas} onChange={(e)=>setParticulasAtivas(e.target.checked)} style={styles.checkbox}/></div>
                <div style={styles.controlRow}><span>{t.glitch}</span><input type="checkbox" checked={glitchAtivo} onChange={(e)=>setGlitchAtivo(e.target.checked)} style={styles.checkbox}/></div>
                <div style={styles.controlRow}><span>{t.cursorCustom}</span><input type="checkbox" checked={cursorAtivo} onChange={(e)=>setCursorAtivo(e.target.checked)} style={styles.checkbox}/></div>
                <div style={styles.controlRow}><span>Rastro de Cursor</span><input type="checkbox" checked={cursorTrailAtivo} onChange={(e)=>setCursorTrailAtivo(e.target.checked)} style={styles.checkbox}/></div>
                <div style={styles.controlRow}><span>Modo Lo-Fi</span><input type="checkbox" checked={lofiMode} onChange={(e)=>setLofiMode(e.target.checked)} style={styles.checkbox}/></div>
                <div style={styles.controlRow}><span>Modo Recrutador</span><input type="checkbox" checked={recruiterMode} onChange={(e)=>setRecruiterMode(e.target.checked)} style={styles.checkbox}/></div>

                {/* música */}
                <div style={{ ...styles.controlRow, flexDirection:'column', alignItems:'stretch', gap:'8px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span>{t.trilhaSonora}</span>
                    <input type="checkbox" checked={musicaAtiva} onChange={(e)=>setMusicaAtiva(e.target.checked)} style={styles.checkbox}/>
                  </div>
                  <div style={{ background:'#000', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'6px', padding:'8px' }}>
                    <div style={{ fontFamily:"'Fira Code',monospace", fontSize:'0.75rem', color:musicaAtiva?'var(--primary)':'#666', textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap', marginBottom:'6px' }}>{PLAYLIST[musicaAtualIndex].nome}</div>
                    <div style={{ display:'flex', justifyContent:'center', gap:'15px' }}>
                      <button onClick={musicaAnterior} style={{ background:'none', border:'none', color:'#fff', cursor:'pointer' }}>⏮</button>
                      <button onClick={proximaMusica}  style={{ background:'none', border:'none', color:'#fff', cursor:'pointer' }}>⏭</button>
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
  controlRow: { display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'0.85rem', color:'#a9a9a9', marginBottom:'10px' },
  checkbox:   { cursor:'pointer', accentColor:'var(--primary)', width:'16px', height:'16px' },
  fontBtn:    { flex:1, padding:'6px', background:'#0d0d0d', color:'#fff', borderRadius:'6px', cursor:'pointer', fontSize:'0.85rem', textAlign:'center' }
};