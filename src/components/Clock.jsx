import { useState, useEffect } from 'react';

// Mapeamento de Fuso Horário, Locale e Sigla por idioma do Google Translate
const MAPA_IDIOMAS = {
  pt: { timeZone: 'America/Sao_Paulo', locale: 'pt-BR', label: 'BRT' },
  en: { timeZone: 'America/New_York', locale: 'en-US', label: 'EST' },
  es: { timeZone: 'Europe/Madrid', locale: 'es-ES', label: 'CET' },
  fr: { timeZone: 'Europe/Paris', locale: 'fr-FR', label: 'CET' },
  de: { timeZone: 'Europe/Berlin', locale: 'de-DE', label: 'CET' },
  it: { timeZone: 'Europe/Rome', locale: 'it-IT', label: 'CET' },
  ja: { timeZone: 'Asia/Tokyo', locale: 'ja-JP', label: 'JST' },
  zh: { timeZone: 'Asia/Shanghai', locale: 'zh-CN', label: 'CST' },
  'zh-CN': { timeZone: 'Asia/Shanghai', locale: 'zh-CN', label: 'CST' },
  ru: { timeZone: 'Europe/Moscow', locale: 'ru-RU', label: 'MSK' },
  ar: { timeZone: 'Asia/Riyadh', locale: 'ar-SA', label: 'AST' },
  hi: { timeZone: 'Asia/Kolkata', locale: 'hi-IN', label: 'IST' },
  ko: { timeZone: 'Asia/Seoul', locale: 'ko-KR', label: 'KST' },
  // Fuso Padrão caso seja um idioma não listado acima
  default: { timeZone: 'UTC', locale: 'en-US', label: 'UTC' }
};

export default function Clock() {
  const [tempo, setTempo] = useState('');
  const [sigla, setSigla] = useState('BRT');
  const [lang, setLang] = useState('pt');

  // 1. Escuta as mudanças de idioma no seletor do Google Translate
  useEffect(() => {
    const checarIdioma = () => {
      const selectGoogle = document.querySelector('.goog-te-combo');
      if (selectGoogle && selectGoogle.value) {
        setLang(selectGoogle.value);
      }
    };

    // Observa alterações no DOM para capturar quando o Google Translate mudar
    const observer = new MutationObserver(() => checarIdioma());
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    // Evento manual de mudança caso seja disparado via JS
    window.addEventListener('change', checarIdioma);

    return () => {
      observer.disconnect();
      window.removeEventListener('change', checarIdioma);
    };
  }, []);

  // 2. Atualiza o relógio a cada segundo com base no fuso horário do idioma selecionado
  useEffect(() => {
    const atualizarRelogio = () => {
      const agora = new Date();
      const config = MAPA_IDIOMAS[lang] || MAPA_IDIOMAS.default;
      
      setSigla(config.label);

      try {
        const formatador = new Intl.DateTimeFormat(config.locale, {
          timeZone: config.timeZone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });

        // Formatação limpa de data e hora
        const partes = formatador.format(agora).split(' ');
        const data = partes[0] ? partes[0].replace(',', '') : '';
        const hora = partes[1] || partes[0] || '';

        setTempo(`${data} ‖ ${hora}`);
      } catch (e) {
        // Fallback em caso de locale/timezone incompatível
        setTempo(agora.toLocaleTimeString());
      }
    };

    atualizarRelogio();
    const intervalo = setInterval(atualizarRelogio, 1000);

    return () => clearInterval(intervalo);
  }, [lang]);

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
      {sigla}: {tempo}
    </div>
  );
}