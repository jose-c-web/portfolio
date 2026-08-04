import { useEffect, useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════
   CURSOR CUSTOM — Lista expandida + Suporte a Custom / Externo
═══════════════════════════════════════════════════════════════ */

export const CURSOR_ESTILOS = [
  { id: 'dot',             nome: 'Ponto' },
  { id: 'ring',            nome: 'Anel' },
  { id: 'cross',           nome: 'Mira' },
  { id: 'arrow',           nome: 'Seta' },
  { id: 'diamond',         nome: 'Diamante' },
  { id: 'diamond-outline', nome: 'Losango' },
  { id: 'triangle',        nome: 'Triângulo' },
  { id: 'star',            nome: 'Estrela' },
  { id: 'shuriken',        nome: 'Shuriken' },
  { id: 'bolt',            nome: 'Raio' },
  { id: 'heart',           nome: 'Coração' },
  { id: 'target',          nome: 'Alvo Tech' },
  { id: 'hexagon',         nome: 'Hexágono' },
  { id: 'pointer-hand',    nome: 'Mãozinha Cyber' },
  { id: 'pentagram',       nome: 'Pentagrama' },
  { id: 'sword',           nome: 'Espada' },
  { id: 'crown',           nome: 'Coroa' },
  { id: 'drop',            nome: 'Gota Neon' },
  { id: 'custom-image',    nome: '🖼️ Imagem Importada' },
  { id: 'custom-svg',      nome: '✨ Meu SVG Custom' },
  { id: 'custom-url',      nome: '🌐 Link Externo (URL)' },
];

export const TRAIL_ESTILOS = [
  { id: 'none',            nome: 'Nenhum' },
  { id: 'dots',            nome: 'Pontinhos' },
  { id: 'sparkles',        nome: 'Faíscas' },
  { id: 'comet',           nome: 'Cometa' },
  { id: 'ribbon',          nome: 'Fita' },
  { id: 'bubbles',         nome: 'Bolhas' },
  { id: 'snow',            nome: 'Neve' },
  { id: 'rainbow',         nome: 'Arco-íris (partículas)' },
  { id: 'rainbow-ribbon',  nome: '🌈 Fita Arco-íris' },
  { id: 'runner',          nome: '🏃 Boneco Correndo' },
  { id: 'chain',           nome: '⛓️ Cadeia Neon' },
  { id: 'lightning',       nome: '⚡ Raio Elétrico' },
  { id: 'constellation',   nome: '✳️ Constelação' },
  { id: 'fire',            nome: '🔥 Fogo' },
  { id: 'matrix',          nome: '🟩 Matrix' },
  { id: 'confetti',        nome: '🎉 Confete' },
  { id: 'hearts',          nome: '💖 Corações' },
  { id: 'galaxy',          nome: '🌌 Galáxia' },
  { id: 'emoji',           nome: '😄 Emoji Custom' },
];


/* ── helpers de cor ─────────────────────────────────────────── */
function hexToRgb(hex) {
  const limpo = hex.replace('#', '');
  const full = limpo.length === 3 ? limpo.split('').map(c => c + c).join('') : limpo;
  const r = parseInt(full.substring(0, 2), 16) || 0;
  const g = parseInt(full.substring(2, 4), 16) || 0;
  const b = parseInt(full.substring(4, 6), 16) || 0;
  return { r, g, b };
}
function hexToRgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}
function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = x => Math.round(255 * x).toString(16).padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

/* ─────────────────────────────────────────────────────────────
   FORMAS DO CURSOR (SVG) — Formas nativas + Custom SVG / Image URL
───────────────────────────────────────────────────────────── */
export function FormaCursor({ estilo, cor, tamanho = 28, customSvg = '', customUrl = '', customImage = '' }) {
  const glow = { filter: `drop-shadow(0 0 6px ${cor})` };

  if (estilo === 'custom-image') {
    if (!customImage) {
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40">
          <rect x="5" y="5" width="30" height="30" rx="4" fill="none" stroke="#ff4a4a" strokeWidth="2" strokeDasharray="3 3" />
          <text x="20" y="24" fontSize="11" fill="#ff4a4a" textAnchor="middle">IMG?</text>
        </svg>
      );
    }
    return (
      <img
        src={customImage}
        alt="Cursor Imagem Importada"
        style={{ width: tamanho, height: tamanho, objectFit: 'contain', ...glow }}
        draggable={false}
      />
    );
  }

  if (estilo === 'custom-url') {
    if (!customUrl) {
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="12" fill="none" stroke="#ff4a4a" strokeWidth="2" strokeDasharray="3 3" />
          <text x="20" y="24" fontSize="14" fill="#ff4a4a" textAnchor="middle">URL?</text>
        </svg>
      );
    }
    return (
      <img
        src={customUrl}
        alt="Cursor Custom"
        style={{ width: tamanho, height: tamanho, objectFit: 'contain', ...glow }}
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    );
  }

  if (estilo === 'custom-svg') {
    if (!customSvg) {
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40">
          <rect x="5" y="5" width="30" height="30" fill="none" stroke="#ff4a4a" strokeWidth="2" strokeDasharray="3 3" />
          <text x="20" y="24" fontSize="12" fill="#ff4a4a" textAnchor="middle">SVG?</text>
        </svg>
      );
    }
    return (
      <div
        style={{ width: tamanho, height: tamanho, display: 'flex', alignItems: 'center', justifyContent: 'center', ...glow }}
        dangerouslySetInnerHTML={{ __html: customSvg }}
      />
    );
  }

  switch (estilo) {
    case 'ring':
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40" style={glow}>
          <circle cx="20" cy="20" r="14" fill="none" stroke={cor} strokeWidth="3" />
        </svg>
      );
    case 'cross':
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40" style={glow}>
          <circle cx="20" cy="20" r="3" fill={cor} />
          <line x1="20" y1="2" x2="20" y2="14" stroke={cor} strokeWidth="2.5" />
          <line x1="20" y1="26" x2="20" y2="38" stroke={cor} strokeWidth="2.5" />
          <line x1="2" y1="20" x2="14" y2="20" stroke={cor} strokeWidth="2.5" />
          <line x1="26" y1="20" x2="38" y2="20" stroke={cor} strokeWidth="2.5" />
        </svg>
      );
    case 'arrow':
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40" style={glow}>
          <path d="M8 4 L8 32 L15.5 25 L21 36 L26 33.5 L20.5 22.5 L31 22.5 Z" fill={cor} stroke="rgba(0,0,0,0.5)" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      );
    case 'diamond':
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40" style={glow}>
          <rect x="12" y="12" width="16" height="16" fill={cor} transform="rotate(45 20 20)" />
        </svg>
      );
    case 'diamond-outline':
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40" style={glow}>
          <rect x="12" y="12" width="16" height="16" fill="none" stroke={cor} strokeWidth="3" transform="rotate(45 20 20)" />
        </svg>
      );
    case 'triangle':
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40" style={glow}>
          <polygon points="20,4 36,34 4,34" fill={cor} />
        </svg>
      );
    case 'star':
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40" style={glow}>
          <path d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z" fill={cor} />
        </svg>
      );
    case 'shuriken':
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40" style={glow}>
          <path d="M20 20 L6 6 Q20 10 20 4 Q20 10 34 6 L20 20 Q26 20 32 6 Q28 20 36 20 Q28 20 32 34 Q26 20 20 20 Q20 28 34 34 L20 20 Q20 30 20 36 Q20 30 6 34 L20 20 Q14 20 8 34 Q12 20 4 20 Q12 20 8 6 L20 20" fill={cor} />
          <circle cx="20" cy="20" r="3" fill="#111" />
        </svg>
      );
    case 'bolt':
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40" style={glow}>
          <path d="M22 2 L8 22 L18 22 L16 38 L33 16 L22 16 Z" fill={cor} />
        </svg>
      );
    case 'heart':
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40" style={glow}>
          <path d="M20 35 C6 25 2 17 2 11 C2 5 7 2 11 2 C15 2 18 4 20 8 C22 4 25 2 29 2 C33 2 38 5 38 11 C38 17 34 25 20 35 Z" fill={cor} />
        </svg>
      );
    case 'target':
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40" style={glow}>
          <circle cx="20" cy="20" r="16" fill="none" stroke={cor} strokeWidth="2" strokeDasharray="8 4" />
          <circle cx="20" cy="20" r="6" fill="none" stroke={cor} strokeWidth="2" />
          <circle cx="20" cy="20" r="2" fill={cor} />
        </svg>
      );
    case 'hexagon':
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40" style={glow}>
          <polygon points="20,3 35,11 35,29 20,37 5,29 5,11" fill="none" stroke={cor} strokeWidth="2.5" />
          <circle cx="20" cy="20" r="4" fill={cor} />
        </svg>
      );
    case 'pointer-hand':
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40" style={glow}>
          <path d="M14 36 V18 C14 16 16 16 16 18 V6 C16 4 19 4 19 6 V16 C19 16 21 14 23 16 V18 C23 18 25 16 27 18 V20 C27 20 29 18 31 20 V30 C31 36 25 36 20 36 Z" fill={cor} stroke="#000" strokeWidth="1" />
        </svg>
      );
    case 'pentagram':
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40" style={glow}>
          <polygon points="20,2 25,15 38,15 27,23 31,37 20,28 9,37 13,23 2,15 15,15" fill="none" stroke={cor} strokeWidth="2.5" />
        </svg>
      );
    case 'sword':
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40" style={glow}>
          <path d="M6 34 L12 28 L9 25 L7 27 L3 23 L7 19 L9 21 L28 2 L38 2 L38 12 L19 31 L21 33 L17 37 L13 33 L15 31 Z" fill={cor} />
        </svg>
      );
    case 'crown':
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40" style={glow}>
          <path d="M4 32 L36 32 L34 14 L26 24 L20 6 L14 24 L6 14 Z" fill={cor} stroke="#000" strokeWidth="1" />
        </svg>
      );
    case 'drop':
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40" style={glow}>
          <path d="M20 4 C20 4 34 20 34 27 C34 34 28 38 20 38 C12 38 6 34 6 27 C6 20 20 4 20 4 Z" fill={cor} />
        </svg>
      );
    case 'dot':
    default:
      return (
        <svg width={tamanho} height={tamanho} viewBox="0 0 40 40" style={glow}>
          <circle cx="20" cy="20" r="13" fill={cor} />
        </svg>
      );
  }
}

/* ─────────────────────────────────────────────────────────────
   CURSOR QUE SEGUE O MOUSE
───────────────────────────────────────────────────────────── */
export function CustomCursorPointer({ estilo, cor, tamanho, customSvg, customUrl, customImage }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [interagindo, setInteragindo] = useState(false);
  const [clicando, setClicando] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const isMob = window.innerWidth < 768 || ('ontouchstart' in window);
    setMobile(isMob);
    if (isMob) return;

    const mv = (e) => setPos({ x: e.clientX, y: e.clientY });
    const ov = (e) => setInteragindo(!!(e.target.closest && e.target.closest('a,button,input,textarea,select,[role="button"]')));
    const down = () => setClicando(true);
    const up = () => setClicando(false);
    window.addEventListener('mousemove', mv);
    window.addEventListener('mouseover', ov);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', mv);
      window.removeEventListener('mouseover', ov);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  if (mobile) return null;

  const escala = clicando ? 0.8 : (interagindo ? 1.4 : 1);

  return (
    <div
      className="custom-cursor-wrapper"
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        zIndex: 99991,
        pointerEvents: 'none',
        transform: `translate(-50%, -50%) scale(${escala})`,
        transition: 'transform 0.15s ease',
        willChange: 'transform',
      }}
    >
      <FormaCursor estilo={estilo} cor={cor} tamanho={tamanho} customSvg={customSvg} customUrl={customUrl} customImage={customImage} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOTOR DE RASTRO v2 — arco-íris, boneco correndo, fogo, matrix...
═══════════════════════════════════════════════════════════════ */

function criarParticula(x, y, estilo, cor, extra = {}) {
  const ang = Math.random() * Math.PI * 2;
  const base = {
    x, y, life: 1,
    decay: 0.02 + Math.random() * 0.02,
    size: 4 + Math.random() * 4,
    cor,
    rot: Math.random() * Math.PI * 2,
    vrot: (Math.random() - 0.5) * 0.2,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    shape: 'circle',
  };
  switch (estilo) {
    case 'sparkles':
      return { ...base, shape: 'star', vx: Math.cos(ang) * 0.6, vy: Math.sin(ang) * 0.6, decay: 0.035 };
    case 'bubbles':
      return { ...base, vx: (Math.random() - 0.5) * 0.4, vy: -0.6 - Math.random() * 0.6, size: 3 + Math.random() * 5, decay: 0.015 };
    case 'snow':
      return { ...base, shape: 'square', vx: (Math.random() - 0.5) * 0.6, vy: 0.8 + Math.random() * 0.8, gravity: 0.01, decay: 0.012 };
    case 'rainbow':
      return { ...base, decay: 0.02, hue: Math.random() * 360 };
    case 'confetti':
      return { ...base, shape: 'rect', hue: Math.random() * 360, size: 4 + Math.random() * 6,
               vx: (Math.random() - 0.5) * 3, vy: -1 - Math.random() * 2, gravity: 0.09, decay: 0.011, vrot: (Math.random() - 0.5) * 0.4 };
    case 'fire':
      return { ...base, shape: 'fire', size: 8 + Math.random() * 10, vx: (Math.random() - 0.5) * 0.8,
               vy: -1 - Math.random() * 1.4, decay: 0.028, heat: 1 };
    case 'hearts':
      return { ...base, shape: 'heart', size: 8 + Math.random() * 8, vx: (Math.random() - 0.5) * 0.8,
               vy: -0.5 - Math.random() * 0.8, decay: 0.016, hue: 330 + Math.random() * 30 };
    case 'matrix':
      return { ...base, shape: 'glyph', char: MATRIX_CHARS[(Math.random() * MATRIX_CHARS.length) | 0],
               size: 12 + Math.random() * 8, vx: 0, vy: 1.6 + Math.random() * 2, decay: 0.014 };
    case 'emoji':
      return { ...base, shape: 'emoji', char: extra.emoji || '⭐', size: 16 + Math.random() * 12,
               vx: (Math.random() - 0.5) * 1.2, vy: -0.4 - Math.random() * 1, gravity: 0.03, decay: 0.014 };
    case 'galaxy':
      return { ...base, shape: 'orbit', hue: Math.random() * 360, orbit: 8 + Math.random() * 26,
               fase: Math.random() * Math.PI * 2, vel: (Math.random() > 0.5 ? 1 : -1) * (0.03 + Math.random() * 0.05),
               size: 2 + Math.random() * 3, decay: 0.008, ox: x, oy: y };
    default:
      return base;
  }
}


/* ═══════════════════════════════════════════════════════════════
   MODO PERFORMANCE AUTOMÁTICO
   - mede o FPS real e reduz partículas/efeitos quando cai
═══════════════════════════════════════════════════════════════ */

export let PERF_BAIXA = false;   // usado pelos desenhos p/ cortar sombras/glow

/* cache de sprites de emoji: fillText de emoji é MUITO caro,
   aqui desenhamos 1x num canvas offscreen e reusamos com drawImage */
const emojiSpriteCache = new Map();
function getEmojiSprite(char, size) {
  const s = Math.max(8, Math.round(size / 4) * 4);
  const key = char + '@' + s;
  let c = emojiSpriteCache.get(key);
  if (!c) {
    c = document.createElement('canvas');
    const pad = Math.ceil(s * 0.35);
    c.width = c.height = s + pad * 2;
    const cx = c.getContext('2d');
    cx.font = `${s}px serif`;
    cx.textAlign = 'center';
    cx.textBaseline = 'middle';
    cx.fillText(char, c.width / 2, c.height / 2);
    emojiSpriteCache.set(key, c);
    if (emojiSpriteCache.size > 80) {
      emojiSpriteCache.delete(emojiSpriteCache.keys().next().value);
    }
  }
  return c;
}

const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01<>/\\{}[]#$%&*'.split('');

function desenharParticula(ctx, p, tempoMs) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, p.life);
  if (PERF_BAIXA) ctx.shadowBlur = 0;
  const cor = p.hue !== undefined ? hslToHex((p.hue + tempoMs * 0.05) % 360, 90, 60) : p.cor;

  if (p.shape === 'star') {
    ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = cor;
    const s = p.size;
    ctx.beginPath();
    ctx.moveTo(0, -s); ctx.lineTo(s * 0.28, -s * 0.28);
    ctx.lineTo(s, 0); ctx.lineTo(s * 0.28, s * 0.28);
    ctx.lineTo(0, s); ctx.lineTo(-s * 0.28, s * 0.28);
    ctx.lineTo(-s, 0); ctx.lineTo(-s * 0.28, -s * 0.28);
    ctx.closePath(); ctx.fill();
  } else if (p.shape === 'square' || p.shape === 'rect') {
    ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = cor;
    const h = p.shape === 'rect' ? p.size * 0.5 : p.size;
    ctx.fillRect(-p.size / 2, -h / 2, p.size, h);
  } else if (p.shape === 'fire') {
    const t = Math.max(0, Math.min(1, p.life));
    const hue = 55 - (1 - t) * 50;              // amarelo -> vermelho
    const c = hslToHex(hue < 0 ? 0 : hue, 100, 40 + t * 25);
    ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * t);
    g.addColorStop(0, hexToRgba(c, 0.9));
    g.addColorStop(1, hexToRgba(c, 0));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size * t, 0, Math.PI * 2); ctx.fill();
  } else if (p.shape === 'heart') {
    ctx.translate(p.x, p.y); ctx.rotate(p.rot * 0.2); ctx.scale(p.size / 30, p.size / 30);
    ctx.fillStyle = cor; ctx.shadowColor = cor; ctx.shadowBlur = PERF_BAIXA ? 0 : 10;
    ctx.beginPath();
    ctx.moveTo(0, 12);
    ctx.bezierCurveTo(-16, 0, -10, -14, 0, -6);
    ctx.bezierCurveTo(10, -14, 16, 0, 0, 12);
    ctx.fill();
  } else if (p.shape === 'glyph') {
    ctx.fillStyle = p.life > 0.85 ? '#d9ffe4' : cor;
    ctx.shadowColor = cor; ctx.shadowBlur = PERF_BAIXA ? 0 : 8;
    ctx.font = `${p.size}px "JetBrains Mono", monospace`;
    ctx.fillText(p.char, p.x, p.y);
  } else if (p.shape === 'emoji') {
    const sprite = getEmojiSprite(p.char, p.size);
    ctx.drawImage(sprite, p.x - sprite.width / 2, p.y - sprite.height / 2);
  } else if (p.shape === 'orbit') {
    const r = p.orbit * (0.4 + p.life * 0.6);
    const x = p.ox + Math.cos(p.fase) * r;
    const y = p.oy + Math.sin(p.fase) * r * 0.55;
    ctx.fillStyle = cor; ctx.shadowColor = cor; ctx.shadowBlur = PERF_BAIXA ? 0 : 12;
    ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2); ctx.fill();
  } else {
    ctx.fillStyle = cor; ctx.shadowColor = cor; ctx.shadowBlur = PERF_BAIXA ? 0 : 6;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

/* ── Boneco correndo (stickman) ─────────────────────────────── */
function desenharCorredor(ctx, r, cor, escala = 1) {
  const s = escala;
  ctx.save();
  ctx.translate(r.x, r.y);
  ctx.scale(r.dir * s, s);
  ctx.strokeStyle = cor;
  ctx.fillStyle = cor;
  ctx.lineWidth = 2.6;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.shadowColor = cor;
  ctx.shadowBlur = PERF_BAIXA ? 0 : 10;

  const f = r.fase;
  const bob = Math.sin(f * 2) * 1.6;
  const inclina = Math.min(0.5, Math.abs(r.vel) * 0.03);
  ctx.rotate(inclina * 0.6);

  // cabeça
  ctx.beginPath(); ctx.arc(0, -18 + bob, 5, 0, Math.PI * 2); ctx.fill();
  // tronco
  ctx.beginPath(); ctx.moveTo(0, -13 + bob); ctx.lineTo(-1, -1 + bob); ctx.stroke();
  // braços
  const a1 = Math.sin(f) * 1.1, a2 = Math.sin(f + Math.PI) * 1.1;
  ctx.beginPath();
  ctx.moveTo(0, -10 + bob); ctx.lineTo(Math.cos(a1) * 9, -10 + bob + Math.sin(a1) * 7);
  ctx.moveTo(0, -10 + bob); ctx.lineTo(Math.cos(a2) * 9, -10 + bob + Math.sin(a2) * 7);
  ctx.stroke();
  // pernas
  const p1 = Math.sin(f + Math.PI) * 1.0, p2 = Math.sin(f) * 1.0;
  ctx.beginPath();
  ctx.moveTo(-1, -1 + bob); ctx.lineTo(Math.sin(p1) * 9, 10 + Math.abs(Math.cos(p1)) * 2 + bob);
  ctx.moveTo(-1, -1 + bob); ctx.lineTo(Math.sin(p2) * 9, 10 + Math.abs(Math.cos(p2)) * 2 + bob);
  ctx.stroke();
  ctx.restore();
}

/* ─────────────────────────────────────────────────────────────
   CANVAS DO RASTRO
───────────────────────────────────────────────────────────── */
export function CursorTrailCanvas({ ativo, estilo, cor, intensidade = 5, emoji = '⭐', autoPerf = true, onPerfChange }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const pointsRef = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const runnerRef = useRef({ x: -100, y: -100, vx: 0, vy: 0, fase: 0, dir: 1, vel: 0 });
  const chainRef = useRef([]);
  const rafRef = useRef(null);
  const lastSpawnRef = useRef(0);
  const [mobile, setMobile] = useState(false);

  /* estado do modo performance automático */
  const perfRef = useRef({ qualidade: 1, fps: 60, frames: 0, janela: 0, ultimo: 0 });
  const autoPerfRef = useRef(autoPerf);
  useEffect(() => {
    autoPerfRef.current = autoPerf;
    if (!autoPerf) { perfRef.current.qualidade = 1; PERF_BAIXA = false; }
  }, [autoPerf]);

  const PARTICULAS = ['dots', 'sparkles', 'bubbles', 'snow', 'rainbow', 'confetti', 'fire', 'hearts', 'matrix', 'emoji', 'galaxy'];

  useEffect(() => {
    setMobile(window.innerWidth < 768 || ('ontouchstart' in window));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [ativo, estilo]);

  /* captura do mouse + spawn de partículas */
  useEffect(() => {
    if (!ativo || mobile || estilo === 'none') return;
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      pointsRef.current.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      const maxPts = estilo === 'rainbow-ribbon' ? 60 : 30;
      while (pointsRef.current.length > maxPts) pointsRef.current.shift();

      if (PARTICULAS.includes(estilo)) {
        const agora = performance.now();
        const q = perfRef.current.qualidade;                 // 0.2 .. 1
        // emoji é o efeito mais pesado -> teto menor
        const tetoBase = estilo === 'emoji' ? 110 : 220;
        const intervalo = Math.max(6, 45 - intensidade * 4) / Math.max(0.2, q);
        if (agora - lastSpawnRef.current > intervalo) {
          lastSpawnRef.current = agora;
          const qtd = Math.max(1, Math.round((intensidade / 3) * q));
          for (let i = 0; i < qtd; i++) {
            particlesRef.current.push(criarParticula(e.clientX, e.clientY, estilo, cor, { emoji }));
          }
          const limite = Math.max(20, Math.round(tetoBase * q));
          if (particlesRef.current.length > limite) {
            particlesRef.current.splice(0, particlesRef.current.length - limite);
          }
        }
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [ativo, mobile, estilo, cor, intensidade, emoji, onPerfChange]);

  /* loop de render */
  useEffect(() => {
    if (!ativo || mobile || estilo === 'none') {
      particlesRef.current = [];
      pointsRef.current = [];
      chainRef.current = [];
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = () => canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
    const H = () => canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

    if (!chainRef.current.length) {
      chainRef.current = Array.from({ length: 16 }, () => ({ x: -100, y: -100 }));
    }

    const loop = (t) => {
      const m = mouseRef.current;

      /* ── medidor de FPS + ajuste automático de qualidade ── */
      const perf = perfRef.current;
      if (!perf.ultimo) perf.ultimo = t;
      const dt = t - perf.ultimo;
      perf.ultimo = t;
      perf.frames++;
      perf.janela += dt;
      if (perf.janela >= 500) {
        const fps = (perf.frames * 1000) / perf.janela;
        perf.fps = fps;
        perf.frames = 0;
        perf.janela = 0;
        if (autoPerfRef.current) {
          if (fps < 30)      perf.qualidade = Math.max(0.2, perf.qualidade - 0.3);
          else if (fps < 48) perf.qualidade = Math.max(0.2, perf.qualidade - 0.12);
          else if (fps > 57) perf.qualidade = Math.min(1, perf.qualidade + 0.08);
        } else {
          perf.qualidade = 1;
        }
        PERF_BAIXA = autoPerfRef.current && perf.qualidade < 0.7;
        // corta o excesso imediatamente quando a qualidade cai
        const teto = Math.max(20, Math.round((estilo === 'emoji' ? 110 : 220) * perf.qualidade));
        if (particlesRef.current.length > teto) {
          particlesRef.current.splice(0, particlesRef.current.length - teto);
        }
        if (onPerfChange) onPerfChange({ fps: Math.round(fps), qualidade: perf.qualidade });
      }

      if (estilo === 'comet') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0,0,0,0.14)';
        ctx.fillRect(0, 0, W(), H());
        ctx.globalCompositeOperation = 'source-over';
        const raio = 8 + intensidade;
        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, raio);
        grad.addColorStop(0, hexToRgba(cor, 0.9));
        grad.addColorStop(1, hexToRgba(cor, 0));
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(m.x, m.y, raio, 0, Math.PI * 2); ctx.fill();

      } else if (estilo === 'ribbon') {
        ctx.clearRect(0, 0, W(), H());
        const pts = pointsRef.current;
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1], b = pts[i];
          const prog = i / pts.length;
          ctx.strokeStyle = hexToRgba(cor, prog * 0.85);
          ctx.lineWidth = Math.max(1, prog * (intensidade * 0.7));
          ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }

      } else if (estilo === 'rainbow-ribbon') {
        /* 🌈 fita arco-íris fluida com brilho */
        ctx.clearRect(0, 0, W(), H());
        const pts = pointsRef.current;
        if (pts.length > 2) {
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.globalCompositeOperation = 'lighter';
          for (let camada = 0; camada < 2; camada++) {
            for (let i = 1; i < pts.length; i++) {
              const a = pts[i - 1], b = pts[i];
              const prog = i / pts.length;
              const hue = ((i * 9) + t * 0.18) % 360;
              const c = hslToHex(hue, 95, camada === 0 ? 55 : 70);
              ctx.strokeStyle = hexToRgba(c, camada === 0 ? prog * 0.35 : prog * 0.95);
              ctx.lineWidth = Math.max(1, prog * (intensidade * 1.4) * (camada === 0 ? 2.6 : 1));
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2);
              ctx.stroke();
            }
          }
          ctx.globalCompositeOperation = 'source-over';
        }
        if (pts.length) pointsRef.current.shift();

      } else if (estilo === 'runner') {
        /* 🏃 boneco correndo atrás do cursor */
        ctx.clearRect(0, 0, W(), H());
        const r = runnerRef.current;
        const dx = m.x - r.x, dy = m.y - r.y;
        const dist = Math.hypot(dx, dy);
        const alvo = Math.max(0, dist - 34);            // mantém distância do cursor
        const acel = 0.055 + intensidade * 0.006;
        if (dist > 1) {
          r.vx += (dx / dist) * alvo * acel;
          r.vy += (dy / dist) * alvo * acel;
        }
        r.vx *= 0.82; r.vy *= 0.82;
        r.x += r.vx; r.y += r.vy;
        r.vel = Math.hypot(r.vx, r.vy);
        if (Math.abs(r.vx) > 0.4) r.dir = r.vx > 0 ? 1 : -1;
        r.fase += Math.min(0.9, 0.08 + r.vel * 0.16);

        // poeirinha ao correr
        if (r.vel > 2 && Math.random() > 0.5) {
          particlesRef.current.push({
            ...criarParticula(r.x - r.dir * 8, r.y + 11, 'dots', cor),
            size: 3 + Math.random() * 3, decay: 0.05,
            vx: -r.dir * (0.5 + Math.random()), vy: -0.3 - Math.random() * 0.5,
          });
        }
        particlesRef.current = particlesRef.current.filter(p => p.life > 0);
        particlesRef.current.forEach(p => {
          p.x += p.vx; p.y += p.vy; p.life -= p.decay;
          ctx.save(); ctx.globalAlpha = Math.max(0, p.life * 0.5);
          ctx.fillStyle = cor;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        });

        // sombra no "chão"
        ctx.save();
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = cor;
        ctx.beginPath(); ctx.ellipse(r.x, r.y + 13, 9, 2.5, 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();

        desenharCorredor(ctx, r, cor, 0.7 + intensidade * 0.06);

      } else if (estilo === 'chain') {
        /* ⛓️ cadeia elástica de esferas neon */
        ctx.clearRect(0, 0, W(), H());
        const nodes = chainRef.current;
        let px = m.x, py = m.y;
        nodes.forEach((n, i) => {
          n.x += (px - n.x) * 0.35;
          n.y += (py - n.y) * 0.35;
          px = n.x; py = n.y;
          const prog = 1 - i / nodes.length;
          const raio = Math.max(1.5, prog * (3 + intensidade));
          ctx.save();
          ctx.globalAlpha = prog;
          ctx.fillStyle = cor; ctx.shadowColor = cor; ctx.shadowBlur = PERF_BAIXA ? 0 : 14;
          ctx.beginPath(); ctx.arc(n.x, n.y, raio, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        });

      } else if (estilo === 'lightning') {
        /* ⚡ raios elétricos ao longo do caminho */
        ctx.clearRect(0, 0, W(), H());
        const pts = pointsRef.current;
        ctx.globalCompositeOperation = 'lighter';
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1], b = pts[i];
          const prog = i / pts.length;
          const jitter = (1 - prog) * (4 + intensidade);
          ctx.strokeStyle = hexToRgba(cor, prog);
          ctx.lineWidth = Math.max(1, prog * 2.2);
          ctx.shadowColor = cor; ctx.shadowBlur = PERF_BAIXA ? 0 : 12;
          ctx.beginPath();
          ctx.moveTo(a.x + (Math.random() - 0.5) * jitter, a.y + (Math.random() - 0.5) * jitter);
          ctx.lineTo(b.x + (Math.random() - 0.5) * jitter, b.y + (Math.random() - 0.5) * jitter);
          ctx.stroke();
        }
        ctx.globalCompositeOperation = 'source-over';
        if (pts.length) pointsRef.current.shift();

      } else if (estilo === 'constellation') {
        /* ✳️ constelação: pontos ligados por linhas */
        ctx.clearRect(0, 0, W(), H());
        const pts = pointsRef.current;
        for (let i = 0; i < pts.length; i++) {
          const prog = i / pts.length;
          ctx.fillStyle = hexToRgba(cor, prog);
          ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, 1.6 + prog * 2, 0, Math.PI * 2); ctx.fill();
          for (let j = i + 1; j < pts.length; j++) {
            const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
            if (d < 70) {
              ctx.strokeStyle = hexToRgba(cor, (1 - d / 70) * prog * 0.5);
              ctx.lineWidth = 0.8;
              ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
            }
          }
        }
        if (pts.length > 22) pointsRef.current.shift();

      } else {
        ctx.clearRect(0, 0, W(), H());
        particlesRef.current.forEach(p => {
          if (p.shape === 'orbit') {
            p.fase += p.vel;
            p.oy -= 0.2;
          } else {
            p.x += p.vx; p.y += p.vy;
            if (p.gravity) p.vy += p.gravity;
          }
          if (p.vrot) p.rot += p.vrot;
          p.life -= p.decay;
          desenharParticula(ctx, p, t);
        });
        particlesRef.current = particlesRef.current.filter(p => p.life > 0);
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ativo, mobile, estilo, cor, intensidade, emoji, onPerfChange]);

  if (!ativo || mobile || estilo === 'none') return null;

  return (
    <canvas
      ref={canvasRef}
      className="cursor-trail-canvas"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 99990, pointerEvents: 'none' }}
    />
  );
}
