"use client";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// ─── Tipos ────────────────────────────────────────────────────
type Link = { texto: string; url: string };

type ReportItem = {
  fecha: string;
  tema: string;
  actividad: string;
  resultado: string;
  links?: Link[];
  kpi: string;
};

// ─── Datos ────────────────────────────────────────────────────
const data: ReportItem[] = [

  // SEO TÉCNICO
  {
    fecha: "2 de junio",
    tema: "SEO TÉCNICO",
    actividad: "Análisis de dos crawls de Ahrefs (AM y PM, score 87 y 89). Priorización de errores. Generación de meta descriptions corregidas para 33 artículos del blog. Plan de enlazado interno para 17 páginas huérfanas. Corrección de enlaces HTTP internos en páginas HTTPS. Diagnóstico de páginas /buscador/ consumiendo crawl budget.",
    resultado: "Generación de meta descriptions corregidas para 33 artículos del blog. Plan de enlazado interno para 17 páginas huérfanas.",
    kpi: "89% en Site Health de Ahrefs",
  },
  {
    fecha: "9 de junio",
    tema: "SEO TÉCNICO",
    actividad: "Score Ahrefs llega a 93 (AM). Análisis de páginas caídas del Top 10. Informe de 8 días de progreso con tabla de evolución del score. Entrega de tres .docx: meta descriptions blog, plan de enlazado interno, reporte de avance.",
    resultado: "Reporte de avance entregado.",
    kpi: "93% en Site Health de Ahrefs",
  },
  {
    fecha: "16 de junio",
    tema: "SEO TÉCNICO",
    actividad: "Detección y neutralización del ataque de cloaking mediante el plugin malicioso plg_system_tiendas. Verificación con Rich Results Test. Solicitud de reindexación de URLs afectadas. Reenvío del sitemap en GSC. Redacción del correo formal para José con María, Sara y Tita en copia.",
    resultado: "Reporte de Cloaking (hackearon la autoridad del sitio en Google).",
    kpi: "67% en Site Health de Ahrefs",
  },
  {
    fecha: "22 de junio",
    tema: "SEO TÉCNICO",
    actividad: "Análisis comparativo de crawls del 9 y 22 de junio (score 93 a 94). Diagnóstico del crecimiento de \"broken JavaScript\" de 1.374 a 4.442 páginas (JCH Optimize). Redacción de correo formal para equipo de marketing explicando el estado técnico del sitio.",
    resultado: "Reporte de salud del sitio enviado por correo.",
    kpi: "94% en Site Health de Ahrefs",
  },
  {
    fecha: "22 de junio",
    tema: "SEO TÉCNICO",
    actividad: "Análisis de CTR e impacto post-migración. Conciliación de métricas GSC vs. GA4 vs. Looker/ERP. Entrega del informe Word y presentación PowerPoint de 4 diapositivas (resultados SEO marzo 2025 a marzo 2026).",
    resultado: "Reporte del impacto de la migración-actualización.",
    kpi: "Fallas en GA4 identificadas, pendientes con José",
  },

  // BLOG
  {
    fecha: "4 de junio",
    tema: "BLOG",
    actividad: "Desarrollo de contenido: Montar una peluquería o spa de uñas: bioseguridad desde el día uno",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H2",
    kpi: "637 visitas",
  },
  {
    fecha: "15 de junio",
    tema: "BLOG",
    actividad: "Desarrollo de contenido: Limpieza y desinfección: guía completa para empresas e instituciones",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H2",
    kpi: "146 visitas",
  },
  {
    fecha: "25 de junio",
    tema: "BLOG",
    actividad: "Desarrollo de contenido: Antes de meterte a la piscina con toda tu familia, asegurate de medir bien el pH",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H2",
    kpi: "139 visitas",
  },

  // ZOHO
  {
    fecha: "12 de junio",
    tema: "ZOHO",
    actividad: "Presentación de plataforma a María para ver posibilidad de integrar campañas de redes, email, WhatsApp, SMS",
    resultado: "Nueva plataforma para envíos",
    kpi: "Presentación realizada",
  },
  {
    fecha: "19 de junio",
    tema: "ZOHO",
    actividad: "Configurar plataforma para el journey de Carrito abandonado",
    resultado: "Nueva plataforma para envíos",
    kpi: "Journey configurado",
  },
  {
    fecha: "24 de junio",
    tema: "ZOHO",
    actividad: "Presentación a María de los borradores de diseño de correo y WhatsApp",
    resultado: "Configuración de plataforma",
    kpi: "Borradores presentados",
  },
  {
    fecha: "26 de junio",
    tema: "ZOHO",
    actividad: "Consulta a soporte de Zoho sobre la efectividad del workflow y la generación de URL inteligente para generar un QR code",
    resultado: "Configuración de plataforma",
    kpi: "Soporte contactado",
  },

  // REUNIONES
  {
    fecha: "3 de junio",
    tema: "REUNIONES",
    actividad: "Seguimiento con María Botero 5:30 am",
    resultado: "Reuniones semanales",
    kpi: "Cumplida",
  },
  {
    fecha: "9 de junio",
    tema: "REUNIONES",
    actividad: "Reunión con Tita sobre presentación general de Marketing",
    resultado: "Reunión especial",
    kpi: "Cumplida",
  },
  {
    fecha: "10 de junio",
    tema: "REUNIONES",
    actividad: "Seguimiento con María Botero 5:30 am",
    resultado: "Reuniones semanales",
    kpi: "Cumplida",
  },
  {
    fecha: "17 de junio",
    tema: "REUNIONES",
    actividad: "Seguimiento con María Botero 5:30 am",
    resultado: "Reuniones semanales",
    kpi: "Cumplida",
  },
  {
    fecha: "24 de junio",
    tema: "REUNIONES",
    actividad: "Seguimiento con María Botero 5:30 am",
    resultado: "Reuniones semanales",
    kpi: "Cumplida",
  },

  // REPORTE
  {
    fecha: "30 de junio",
    tema: "REPORTE",
    actividad: "Generación reporte",
    resultado: "Seguimiento a actividades",
    kpi: "Completado",
  },
];

// ─── Secciones ────────────────────────────────────────────────
const secciones = [
  { tema: "SEO TÉCNICO",  title: "SEO TÉCNICO",  imagen: "/junio/seo-tecnico.png" },
  { tema: "BLOG",         title: "BLOG",         imagen: "/junio/blog.png" },
  { tema: "ZOHO",         title: "ZOHO",         imagen: "/junio/zoho.png" },
  { tema: "REUNIONES",    title: "REUNIONES",    imagen: undefined },
  { tema: "REPORTE",      title: "REPORTE",      imagen: undefined },
];

// ─── Celda de resultado con links ─────────────────────────────
function ResultadoCell({ resultado, links }: { resultado: string; links?: Link[] }) {
  return (
    <div>
      <span>{resultado}</span>
      {links && links.length > 0 && (
        <div style={{ marginTop: "6px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {links.map((l, i) => (
            <a
              key={i}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#055DA7",
                textDecoration: "underline",
                fontSize: "13px",
                wordBreak: "break-word",
              }}
            >
              {l.texto}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Componente de sección ────────────────────────────────────
function Section({
  title,
  items,
  imagen,
}: {
  title: string;
  items: ReportItem[];
  imagen?: string;
}) {
  return (
    <section style={{ marginBottom: "32px" }}>
      <h2
        style={{
          backgroundColor: "#20B6EA",
          color: "white",
          padding: "10px 16px",
          borderRadius: "6px 6px 0 0",
          fontSize: "18px",
          fontWeight: "bold",
          margin: 0,
        }}
      >
        {title}
      </h2>

      {imagen && (
        <div style={{ margin: "16px 0" }}>
          <img
            src={imagen}
            alt={"Imagen " + title}
            style={{ width: "50%", height: "auto", borderRadius: "6px" }}
          />
        </div>
      )}

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr style={{ backgroundColor: "#055DA7", color: "white" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left", minWidth: "130px" }}>Fecha</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Actividad</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Resultado / Observacion</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left", minWidth: "140px" }}>KPI</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#f9f9f9" : "white" }}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{row.fecha}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{row.actividad}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <ResultadoCell resultado={row.resultado} links={row.links} />
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "#666", fontStyle: "italic" }}>{row.kpi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── Página principal ─────────────────────────────────────────
export default function Page() {
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte Junio 2026 - Kipclin", 14, 10);
    autoTable(doc, {
      head: [["Fecha", "Tema", "Actividad", "Resultado / Observacion", "KPI"]],
      body: data.map((item) => [
        item.fecha,
        item.tema,
        item.actividad,
        item.resultado + (item.links ? " " + item.links.map((l) => l.url).join(" ") : ""),
        item.kpi,
      ]),
    });
    doc.save("Reporte_Junio_2026_Kipclin.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto">

        <div
          style={{
            backgroundColor: "#055DA7",
            padding: "20px",
            borderRadius: "8px",
            color: "white",
            marginBottom: "24px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            borderBottom: "4px solid #20B6EA",
          }}
        >
          <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>
            Reporte Junio 2026 - Kipclin
          </h1>
          <p style={{ fontSize: "16px", margin: 0 }}>
            Seguimiento tecnico, editorial, automatizacion y comercial del sitio web. Incluye actividades SEO, blog, Zoho Marketing Automation y reuniones clave.
          </p>
        </div>

        {secciones.map((s) => (
          <Section
            key={s.tema}
            title={s.title}
            imagen={s.imagen}
            items={data.filter((d) => d.tema === s.tema)}
          />
        ))}

        <button
          onClick={exportPDF}
          style={{
            backgroundColor: "#055DA7",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "20px",
            marginBottom: "40px",
          }}
        >
          Descargar PDF
        </button>
      </div>
    </div>
  );
}
