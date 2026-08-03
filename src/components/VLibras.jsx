import { useEffect } from "react";

export const VLibras = () => {
  useEffect(() => {
    // Evita inicializar 2x (React 18 StrictMode roda o effect duas vezes em dev)
    if (window.__vlibrasInitStarted) {
      console.log("[VLibras] init já foi iniciado antes, ignorando chamada duplicada.");
      return;
    }
    window.__vlibrasInitStarted = true;

    // 1. Cria os elementos do widget no DOM se não existirem
    if (!document.querySelector("[vw]")) {
      const vwDiv = document.createElement("div");
      vwDiv.setAttribute("vw", "true");
      vwDiv.className = "enabled";

      vwDiv.innerHTML = `
        <div vw-access-button="true" class="active"></div>
        <div vw-plugin-wrapper="true">
          <div class="vw-plugin-top-wrapper"></div>
        </div>
      `;

      document.body.appendChild(vwDiv);
    }

    // 2. Inicializa o Widget com retentativa até o script do governo responder
    let tentativas = 0;
    const initWidget = () => {
      tentativas++;
      if (window.VLibras && typeof window.VLibras.Widget === "function") {
        console.log("[VLibras] window.VLibras encontrado, inicializando widget...");
        new window.VLibras.Widget("https://vlibras.gov.br/app");
        console.log("[VLibras] Widget inicializado com sucesso.");
      } else if (tentativas < 30) {
        setTimeout(initWidget, 300);
      } else {
        console.error("[VLibras] Falhou após 30 tentativas: window.VLibras nunca ficou disponível. Provável bloqueio do script (adblock/extensão/rede).");
      }
    };

    // 3. Injeta o script oficial
    let script = document.getElementById("vlibras-script");
    if (!script) {
      script = document.createElement("script");
      script.id = "vlibras-script";
      script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
      script.async = true;
      script.onload = () => {
        console.log("[VLibras] script vlibras-plugin.js carregou (onload disparou).");
        setTimeout(initWidget, 200);
      };
      script.onerror = (e) => {
        console.error("[VLibras] ERRO ao carregar vlibras-plugin.js. Verifique a aba Network/adblock.", e);
      };
      document.body.appendChild(script);
    } else {
      setTimeout(initWidget, 200);
    }
  }, []);

  return null;
};

export default VLibras;