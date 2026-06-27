import { useState, useEffect } from 'react';

export default function Clock() {
  const [tempo, setTempo] = useState('');

  useEffect(() => {
    const atualizarRelogio = () => {
      const agora = new Date();
      
      const formatador = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      const partes = formatador.format(agora).split(' ');
      const data = partes[0];
      const hora = partes[1];

      setTempo(`${data} ‖ ${hora}`);
    };

    atualizarRelogio();
    const intervalo = setInterval(atualizarRelogio, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div 
      className="font-style-custom"
      style={{
        fontFamily: "'Fira Code', monospace",
        fontSize: 'calc(var(--font-size-base) * 0.85)',
        color: 'var(--primary)',
        background: 'rgba(0, 0, 0, 0.6)',
        padding: '6px 12px',
        borderRadius: '6px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        textShadow: '0 0 8px var(--primary)',
        display: 'inline-block',
        letterSpacing: '1px'
      }}
    >
      BRT: {tempo}
    </div>
  );
}