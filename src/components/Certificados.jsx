// 1. Importações corrigidas com nomes únicos para cada imagem
import imgExcel from '../assets/Certificados/Excel_Basico.png';
import imgSeguranca from '../assets/Certificados/Competencia_Trsnversal.png';
import imgFluencia from '../assets/Certificados/Flu.png';

import { useState } from "react";

export default function Certificates() {
  const [expandido, setExpandido] = useState(false);
  const [estaFechando, setEstaFechando] = useState(false);
  const [avisoIndex, setAvisoIndex] = useState(null);
  const [textosExpandidos, setTextosExpandidos] = useState({});

  // 2. Mapeamento da array apontando para as variáveis de imagem importadas acima
  const meusCertificados = [
    {
      title: "Excel Básico",
      issuer: "Executa a edição e formatação de dados em uma planilha e utiliza as funções e fórmulas básicas do Excel.",
      hours: "20 horas",
      image: imgExcel // 👈 Substituído o texto pela variável importada
    },
    {
      title: "Competência Transversal - SEGURANÇA NO TRABALHO",
      issuer: "Conceitos e Principais acidentes de Trabalho no ambiente corporativo e industrial contemporâneo.",
      hours: "14 horas",
      image: imgSeguranca // 👈 Substituído o texto pela variável importada
    },
    {
      title: "Fluência - Fundamentos da inteligência artificial",
      issuer: "Compreende os fundamentos da inteligência artificial para melhoria da produtividade e para o auxílio na tomada de decisões, identificando os impactos nos mecanismos de pesquisa online, reconhecendo o Bing Chat e Copilot do Microsoft 365 como ferramentas de facilitação das tarefas diárias e processos de trabalho e considerando questões éticas.",
      hours: "08 horas",
      image: imgFluencia // 👈 Substituído o texto pela variável importada
    }
  ];

  const certificadosVisiveis = expandido || estaFechando ? meusCertificados : meusCertificados.slice(0, 2);

  const lidarComCliqueVerMais = () => {
    if (expandido) {
      setEstaFechando(true);
      setTimeout(() => {
        setExpandido(false);
        setEstaFechando(false);
        setAvisoIndex(null); 
        document.querySelector("#certificates").scrollIntoView({ behavior: 'smooth' });
      }, 350); 
    } else {
      setExpandido(true);
    }
  };

  const gerenciarAvisoContato = (index) => {
    if (avisoIndex === index) {
      setAvisoIndex(null);
    } else {
      setAvisoIndex(index);
    }
  };

  const alternarTextoLongo = (e, index) => {
    e.stopPropagation(); 
    setTextosExpandidos(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const formatarTextoComLimite = (texto, index, limitePalavras = 12) => {
    const palavras = texto.split(" ");
    
    if (palavras.length <= limitePalavras) {
      return <span>{texto}</span>;
    }

    const textoFormatado = textosExpandidos[index] 
      ? texto 
      : palavras.slice(0, limitePalavras).join(" ") + "...";

    return (
      <span>
        {textoFormatado}{" "}
        <button 
          onClick={(e) => alternarTextoLongo(e, index)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--primary)',
            fontWeight: '600',
            cursor: 'pointer',
            padding: '0 4px',
            fontSize: '0.85rem',
            textDecoration: 'none'
          }}
        >
          {textosExpandidos[index] ? "Ler menos" : "Ler mais"}
        </button>
      </span>
    );
  };

  return (
    <section id="certificates" style={{ minHeight: 'auto', padding: '4rem 0' }}>
      <h2 className="section-title">Certificados</h2>
      
      <div className="certificate-mini-grid">
        {certificadosVisiveis.map((certificado, index) => {
          const ehExtra = index >= 2;
          const classeAnimacao = ehExtra && estaFechando ? "closing" : "";
          const exibindoAviso = avisoIndex === index;

          return (
            <div 
              className={`certificate-mini-card ${classeAnimacao} ${exibindoAviso ? 'aviso-ativo' : ''}`} 
              key={index}
              onClick={() => gerenciarAvisoContato(index)}
              style={{ cursor: 'pointer' }}
            >
              {certificado.image && (
                <div className="mini-img">
                  <img src={certificado.image} alt={certificado.title} />
                </div>
              )}

              <div className="mini-info">
                {!exibindoAviso ? (
                  <>
                    <h3>{certificado.title}</h3>
                    <p>
                      {formatarTextoComLimite(certificado.issuer, index, 12)} • <span style={{ color: 'var(--primary)' }}>{certificado.hours}</span>
                    </p>
                  </>
                ) : (
                  <div className="mensagem-contato">
                    <h4>Solicitar documento</h4>
                    <p>Entre em contato na seção abaixo para solicitar a validação deste certificado.</p>
                  </div>
                )}
              </div>

              <div className="mini-arrow">
                {exibindoAviso ? "×" : "i"}
              </div>
            </div>
          );
        })}
      </div>

      {meusCertificados.length > 2 && (
        <div className="ver-mais-container">
          <button className="btn-ver-mais" onClick={lidarComCliqueVerMais}>
            {expandido ? "Ver menos" : "Ver certificados"}
          </button>
        </div>
      )}
    </section>
  );
}