import { useState, useEffect } from 'react';

export default function Clock() {
  const [tempo, setTempo] = useState('');

  useEffect(() => {
    const atualizarRelogio = () => {
      const agora = new Date();
      
      // Força o fuso horário do Brasil (Brasília) e formata data e hora
      const formatador = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      // O retorno vem no formato: "DD/MM/AAAA HH:MM:SS"
      const partes = formatador.format(agora).split(' ');
      const data = partes[0];
      const hora = partes[1];

      setTempo(`${data} ‖ ${hora}`);
    };

    atualizarRelogio(); // Executa imediatamente ao carregar
    const intervalo = setInterval(atualizarRelogio, 1000); // Atualiza a cada 1 segundo

    return () => clearInterval(intervalo); // Limpa o intervalo ao desmontar
  }, []);

  return (
    <div style={{
      fontFamily: "'Fira Code', monospace",
      fontSize: '0.85rem',
      color: 'var(--primary)',
      background: 'rgba(0, 0, 0, 0.6)',
      padding: '6px 12px',
      borderRadius: '6px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      textShadow: '0 0 8px var(--primary)',
      display: 'inline-block',
      letterSpacing: '1px'
    }}>
      BRT: {tempo}
    </div>
  );
}