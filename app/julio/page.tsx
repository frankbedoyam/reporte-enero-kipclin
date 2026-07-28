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
    fecha: "1 de julio",
    tema: "SEO TÉCNICO",
    actividad: "Se activó Ahrefs en modalidad Always On Audit para mantener el rastreo permanente del sitio de Kipclin.",
    resultado: "Se estableció auditoría continua sin consumo de créditos de rastreo mensuales.",
    kpi: "Always On Audit activo",
  },
  {
    fecha: "4 de julio",
    tema: "SEO TÉCNICO",
    actividad: "Se revisaron los errores de rastreo detectados el 4 de julio.",
    resultado: "Se identificaron los errores que afectaron temporalmente la salud del sitio.",
    links: [
      { texto: "Ver errores del crawl (4 de julio)", url: "https://drive.google.com/file/d/1RnnLMSIdIiCtiunGn3WbIcrwAzcPKaY8/view?usp=drive_link" },
    ],
    kpi: "67% de score en Site Health",
  },
  {
    fecha: "14 de julio",
    tema: "SEO TÉCNICO",
    actividad: "Se revisaron los errores y hallazgos de Analytics GA4.",
    resultado: "Se documentaron los hallazgos, pendientes de corrección técnica por parte de José.",
    links: [
      { texto: "Ver hallazgos de GA4", url: "https://drive.google.com/file/d/1YxVMsWjKVIfRPc1lS4ijzgD4VxregL6T/view?usp=sharing" },
    ],
    kpi: "Hallazgos documentados",
  },
  {
    fecha: "20 de julio",
    tema: "SEO TÉCNICO",
    actividad: "Se analizaron los errores detectados por Ahrefs que afectan la salud del sitio web KIPCLIN.com.",
    resultado: "Se priorizaron las correcciones necesarias para mejorar el Site Health.",
    links: [
      { texto: "Ver errores detectados por Ahrefs (20 de julio)", url: "https://drive.google.com/file/d/1YkY-_8qPbotdA4JdEdQynaPM7pXy_RXF/view?usp=sharing" },
    ],
    kpi: "Correcciones y mejoras para alcanzar el 98% en Site Health de Ahrefs",
  },
  {
    fecha: "22 de julio",
    tema: "SEO TÉCNICO",
    actividad: "Se elaboró el informe de posicionamiento SEO de las keywords: qué pasó, por qué, y dónde estamos hoy.",
    resultado: "Se entregó un informe explicativo sobre la evolución del posicionamiento de las keywords principales.",
    kpi: "Informe entregado",
  },
  {
    fecha: "24 de julio",
    tema: "SEO TÉCNICO",
    actividad: "Score Ahrefs llega a 98.",
    resultado: "Reporte de avance.",
    kpi: "98% de score en Site Health",
  },

  // BLOG
  {
    fecha: "2 de julio",
    tema: "BLOG",
    actividad: "Mantenimiento y limpieza de piscinas: guía completa paso a paso",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H9",
    kpi: "607 hits (Joomla)",
  },
  {
    fecha: "6 de julio",
    tema: "BLOG",
    actividad: "Productos para piscinas: todo lo que necesitas tener siempre a la mano",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H8",
    kpi: "497 hits (Joomla)",
  },
  {
    fecha: "12 de julio",
    tema: "BLOG",
    actividad: "Una piscina bien cuidada no se nota, se disfruta",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H7",
    kpi: "161 hits (Joomla)",
  },
  {
    fecha: "13 de julio",
    tema: "BLOG",
    actividad: "Productos de limpieza y desinfección para restaurantes",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H6",
    kpi: "261 hits (Joomla)",
  },
  {
    fecha: "16 de julio",
    tema: "BLOG",
    actividad: "Servilletas para tu negocio: guía de tipos, marcas y dispensadores",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H5",
    kpi: "257 hits (Joomla)",
  },
  {
    fecha: "17 de julio",
    tema: "BLOG",
    actividad: "Cómo limpiar y desinfectar bien los pisos: guía por tipo de superficie",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H4",
    kpi: "374 hits (Joomla)",
  },
  {
    fecha: "19 de julio",
    tema: "BLOG",
    actividad: "Paños de microfibra y esponjas: elija el implemento correcto según la tarea",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H3",
    kpi: "267 hits (Joomla)",
  },
  {
    fecha: "22 de julio",
    tema: "BLOG",
    actividad: "Cómo elegir el desengrasante correcto y usarlo bien en cualquier superficie",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H2",
    kpi: "181 hits (Joomla)",
  },
  {
    fecha: "23 de julio",
    tema: "BLOG",
    actividad: "Desengrasante: cuál usar según lo que necesitas desengrasar",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H2",
    kpi: "198 hits (Joomla)",
  },
  {
    fecha: "24 de julio",
    tema: "BLOG",
    actividad: "Qué va en cada caneca: el código de colores para el manejo de residuos en Colombia",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H2",
    kpi: "90 hits (Joomla)",
  },

  // ZOHO
  {
    fecha: "1 de julio",
    tema: "ZOHO",
    actividad: "Zoho confirmó que quedó resuelto lo de Smart URL para la campaña de ascensores.",
    resultado: "Se validó la corrección de la URL inteligente reportada anteriormente.",
    kpi: "Incidencia resuelta",
  },
  {
    fecha: "14 de julio",
    tema: "ZOHO",
    actividad: "Se habló con Zoho para resolver lo del doble código de seguimiento.",
    resultado: "Se escaló el caso a soporte de Zoho para su corrección.",
    kpi: "En proceso con soporte de Zoho",
  },
  {
    fecha: "21 de julio",
    tema: "ZOHO",
    actividad: "Se verificó con José el código snippet de seguimiento.",
    resultado: "Se confirmó la correcta instalación del snippet en el sitio.",
    kpi: "Snippet verificado",
  },
  {
    fecha: "23 de julio",
    tema: "ZOHO",
    actividad: "Se trabajó la base de datos enviada por José.",
    resultado: "Se depuró y organizó la base de datos para su uso en campaña.",
    kpi: "Base de datos lista",
  },
  {
    fecha: "25 de julio",
    tema: "ZOHO",
    actividad: "Reunión con Tita, María y Sara sobre Zoho",
    resultado: "Aquí se decidió la campaña Feria de Flores",
    kpi: "Campaña aprobada",
  },
  {
    fecha: "25 de julio",
    tema: "ZOHO",
    actividad: "Se montó la base de datos de hoteles y restaurantes para la campaña Feria de Flores.",
    resultado: "Se cargó y segmentó la base de datos del sector hotelero y gastronómico.",
    kpi: "Base de datos cargada",
  },
  {
    fecha: "25 de julio",
    tema: "ZOHO",
    actividad: "Se definió el esquema del journey para la campaña de mailing Feria de Flores.",
    resultado: "Se diseñó el flujo de envíos automatizados de la campaña.",
    kpi: "Journey configurado",
  },
  {
    fecha: "28 de julio",
    tema: "ZOHO",
    actividad: "Pruebas de correo",
    resultado: "Se realizaron pruebas de envío previas al lanzamiento de la campaña.",
    kpi: "Pruebas realizadas",
  },
  {
    fecha: "28 de julio",
    tema: "ZOHO",
    actividad: "Reunión con Sara para establecer los 6 diseños de Armando.",
    resultado: "Se aprobaron los 6 diseños de correo propuestos.",
    kpi: "Diseños aprobados",
  },
  {
    fecha: "30 de julio",
    tema: "ZOHO",
    actividad: "Pruebas de envíos de correos",
    resultado: "Se realizó una segunda ronda de pruebas antes del lanzamiento oficial.",
    kpi: "Pruebas superadas",
  },
  {
    fecha: "31 de julio",
    tema: "ZOHO",
    actividad: "Primer envío mailing Feria de Flores",
    resultado: "Se realizó el primer envío oficial de la campaña Feria de Flores.",
    kpi: "Campaña lanzada",
  },

  // REUNIONES
  {
    fecha: "1 de julio",
    tema: "REUNIONES",
    actividad: "Seguimiento con María Botero 5:30 am",
    resultado: "Reuniones semanales",
    kpi: "Cumplida",
  },
  {
    fecha: "8 de julio",
    tema: "REUNIONES",
    actividad: "Seguimiento con María Botero 5:30 am",
    resultado: "Reuniones semanales",
    kpi: "Cumplida",
  },
  {
    fecha: "15 de julio",
    tema: "REUNIONES",
    actividad: "Seguimiento con María Botero 5:30 am",
    resultado: "Reuniones semanales",
    kpi: "Cumplida",
  },
  {
    fecha: "22 de julio",
    tema: "REUNIONES",
    actividad: "Seguimiento con María Botero 5:30 am",
    resultado: "Reuniones semanales",
    kpi: "Cumplida",
  },
  {
    fecha: "29 de julio",
    tema: "REUNIONES",
    actividad: "Seguimiento con María Botero 5:30 am",
    resultado: "Reuniones semanales",
    kpi: "Cumplida",
  },

  // REPORTES
  {
    fecha: "7 de julio",
    tema: "REPORTES",
    actividad: "WhatsApp Business: reporte de rendimiento semanal",
    resultado: "Se entregó el informe semanal de desempeño del canal de WhatsApp Business.",
    links: [
      { texto: "Ver reporte de WhatsApp Business", url: "https://docs.google.com/document/d/1ou5zZX6iTlD9qo_NYzxkBDt4mfIHUnRzprq4lA_BpPs/edit?usp=sharing" },
    ],
    kpi: "Entregado",
  },
  {
    fecha: "31 de julio",
    tema: "REPORTES",
    actividad: "Generación reporte de actividades de julio",
    resultado: "Seguimiento a actividades",
    kpi: "Completado",
  },
];

// ─── Secciones ────────────────────────────────────────────────
const secciones = [
  { tema: "SEO TÉCNICO",  title: "SEO TÉCNICO",  imagen: "/julio/seo-tecnico.png" },
  { tema: "BLOG",         title: "BLOG",         imagen: "/julio/blog.png" },
  { tema: "ZOHO",         title: "ZOHO",         imagen: "/julio/zoho.png" },
  { tema: "REUNIONES",    title: "REUNIONES",    imagen: undefined },
  { tema: "REPORTES",     title: "REPORTES",     imagen: undefined },
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

// ─── Tarjeta móvil por fila ───────────────────────────────────
function RowCard({ row }: { row: ReportItem }) {
  return (
    <div style={{
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      padding: "14px",
      marginBottom: "12px",
      backgroundColor: "white",
      boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
    }}>
      <div style={{ fontSize: "12px", color: "#055DA7", fontWeight: "700", marginBottom: "6px", textTransform: "uppercase" }}>
        {row.fecha}
      </div>
      <div style={{ fontSize: "14px", color: "#111827", marginBottom: "8px", lineHeight: "1.5" }}>
        {row.actividad}
      </div>
      <div style={{ fontSize: "13px", color: "#374151", marginBottom: "6px" }}>
        <ResultadoCell resultado={row.resultado} links={row.links} />
      </div>
      <div style={{
        display: "inline-block",
        backgroundColor: "#EFF6FF",
        color: "#1D4ED8",
        fontSize: "12px",
        fontWeight: "600",
        padding: "3px 10px",
        borderRadius: "20px",
      }}>
        {row.kpi}
      </div>
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
      <h2 style={{
        backgroundColor: "#20B6EA",
        color: "white",
        padding: "10px 16px",
        borderRadius: "6px 6px 0 0",
        fontSize: "18px",
        fontWeight: "bold",
        margin: 0,
      }}>
        {title}
      </h2>

      {imagen && (
        <div style={{ margin: "16px 0" }}>
          <img
            src={imagen}
            alt={"Imagen " + title}
            style={{ width: "60%", height: "auto", borderRadius: "6px", display: "block", margin: "0 auto" }}
          />
        </div>
      )}

      {/* Tabla para desktop */}
      <div className="hide-on-mobile" style={{ overflowX: "auto" }}>
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

      {/* Tarjetas para móvil */}
      <div className="hide-on-desktop" style={{ paddingTop: "12px" }}>
        {items.map((row, i) => (
          <RowCard key={i} row={row} />
        ))}
      </div>
    </section>
  );
}

// ─── Página principal ─────────────────────────────────────────
export default function Page() {
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte Julio 2026 - Kipclin", 14, 10);
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
    doc.save("Reporte_Julio_2026_Kipclin.pdf");
  };

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .hide-on-mobile { display: none !important; }
          .hide-on-desktop { display: block !important; }
        }
        @media (min-width: 641px) {
          .hide-on-mobile { display: block !important; }
          .hide-on-desktop { display: none !important; }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 p-6 font-sans">
        <div className="max-w-6xl mx-auto">

          <div style={{
            backgroundColor: "#055DA7",
            padding: "20px",
            borderRadius: "8px",
            color: "white",
            marginBottom: "24px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            borderBottom: "4px solid #20B6EA",
          }}>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>
              Reporte Julio 2026 - Kipclin
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
    </>
  );
}
