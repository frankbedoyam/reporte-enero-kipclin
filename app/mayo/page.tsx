"use client";
import Image from "next/image";
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
    fecha: "1 al 17 de mayo",
    tema: "SEO TÉCNICO",
    actividad: "Seguimiento en Ahrefs y se mantuvo en 99 el Health Score",
    resultado: "Seguimiento sin variaciones con crawl diario",
    kpi: "99% indicador de site health",
  },
  {
    fecha: "18 de mayo",
    tema: "SEO TÉCNICO",
    actividad: "Diagnóstico de errores por migración de Joomla 3 a Joomla 5.4: referencias rotas a archivos JS de caché del plugin JCH Optimize",
    resultado: "Archivos adjuntos con las URLs del reporte:",
    links: [
      { texto: "Reporte 1 - Google Sheets", url: "https://docs.google.com/spreadsheets/d/17OI4rB2Q5rAyN6bcoOsU3-5uJClm5OnH9xPa_6JkyH4/edit?usp=sharing" },
      { texto: "Reporte 2 - Google Sheets", url: "https://docs.google.com/spreadsheets/d/19F2SL0yJkxfq_JVf435EgX-ZfZCw2T0nBCEvJ6m8JoE/edit?usp=sharing" },
    ],
    kpi: "4.570 errores detectados",
  },
  {
    fecha: "19 de mayo",
    tema: "SEO TÉCNICO",
    actividad: "Pago de Ahrefs con nueva tarjeta por vencimiento de la anterior",
    resultado: "Pago realizado con Sara y César. Rastreo reanudado",
    kpi: "Plataforma activa",
  },
  {
    fecha: "20 de mayo",
    tema: "SEO TÉCNICO",
    actividad: "Revisión journey de compra",
    resultado: "Reporte enviado a Jose por correo para hacer correcciones",
    kpi: "Reporte enviado",
  },
  {
    fecha: "20 de mayo",
    tema: "SEO TÉCNICO",
    actividad: "Crawling con Ahrefs tras migración: 7.026 URLs rastreadas, 22.516 issues, 4.733 URLs con errores",
    resultado: "Resumen del crawling:",
    links: [
      { texto: "Ver documento completo", url: "https://docs.google.com/document/d/1WU6EYMb0ce-0IQVsdKnEWxXU9e-UrsDrKA9p6epFWYg/edit?usp=sharing" },
    ],
    kpi: "31% indicador de site health",
  },
  {
    fecha: "26 de mayo",
    tema: "SEO TÉCNICO",
    actividad: "Reporte de recuperación SEO enviado por correo",
    resultado: "Documento de recuperación compartido con el equipo:",
    links: [
      { texto: "Ver reporte de recuperación", url: "https://docs.google.com/document/d/1R36hRiQ61b9sXjXg5prGwEQT32l3RcNiQhW7k6L-aE4/edit?usp=sharing" },
    ],
    kpi: "91% indicador de site health al cierre de mayo",
  },

  // BLOG
  {
    fecha: "4 de mayo",
    tema: "BLOG",
    actividad: "Plan editorial para los siguientes dos meses",
    resultado: "Documento publicado:",
    links: [
      { texto: "Ver plan editorial", url: "https://docs.google.com/document/d/1QnnzUzZtkJcV675pHaAkR_ffbG5fHRhUo1O6BptSUH4/edit?usp=sharing" },
    ],
    kpi: "Plan editorial definido",
  },
  {
    fecha: "5 de mayo",
    tema: "BLOG",
    actividad: "Articulo: Productos de aseo y desinfeccion para veterinarias y peluquerias de mascotas",
    resultado: "Publicado con imagenes ALT, keywords, links a productos, interlinking, H1, H2",
    kpi: "348 hits",
  },
  {
    fecha: "8 de mayo",
    tema: "BLOG",
    actividad: "Articulo: Acido peracético: que es, para que sirve y cuando usarlo",
    resultado: "Publicado con imagenes ALT, keywords, links a productos, interlinking, H1, H2",
    kpi: "364 hits",
  },
  {
    fecha: "12 de mayo",
    tema: "BLOG",
    actividad: "Articulo: Antibacterial: todo lo que necesitas saber para protegerte",
    resultado: "Publicado con imagenes ALT, keywords, links a productos, interlinking, H1, H2",
    kpi: "325 hits",
  },
  {
    fecha: "17 de mayo",
    tema: "BLOG",
    actividad: "Articulo: Suavizante de ropa: todo lo que necesitas saber para usarlo bien",
    resultado: "Publicado con imagenes ALT, keywords, links a productos, interlinking, H1, H2",
    kpi: "413 hits",
  },
  {
    fecha: "18 de mayo",
    tema: "BLOG",
    actividad: "Articulo: Contaminacion cruzada: que es, tipos y como prevenirla en tu empresa",
    resultado: "Publicado con imagenes ALT, keywords, links a productos, interlinking, H1, H2",
    kpi: "195 hits",
  },
  {
    fecha: "24 de mayo",
    tema: "BLOG",
    actividad: "Articulo: Manual de bioseguridad para Pymes",
    resultado: "Publicado con imagenes ALT, keywords, links a productos, interlinking, H1, H2",
    kpi: "128 hits",
  },
  {
    fecha: "28 de mayo",
    tema: "BLOG",
    actividad: "Articulo: Bioseguridad en restaurantes, cafeterias, panaderias y bares",
    resultado: "Publicado con imagenes ALT, keywords, links a productos, interlinking, H1, H2",
    kpi: "45 hits",
  },

  // OTRAS ACTIVIDADES
  {
    fecha: "8 de mayo",
    tema: "OTRAS ACTIVIDADES",
    actividad: "Sistema de puntos para Kipclin",
    resultado: "Alternativas a la plataforma de puntos enviadas por correo:",
    links: [
      { texto: "Ver documento", url: "https://docs.google.com/document/d/1Voj2MnaMkWBCEiw2rux3rt2DBnI_4_4pDWquTWHQsGM/edit?usp=sharing" },
    ],
    kpi: "Alternativas documentadas",
  },
  {
    fecha: "14 al 19 de mayo",
    tema: "OTRAS ACTIVIDADES",
    actividad: "Consulta sobre widget flotante multicanal",
    resultado: "Solucion enviada por correo:",
    links: [
      { texto: "Ver documento", url: "https://docs.google.com/document/d/1vod-9wQ6wYcSNLvLYYet5KMQRNnn5rCz-GYqU3Vk1Pc/edit?usp=sharing" },
    ],
    kpi: "Resuelto",
  },
  {
    fecha: "19 de mayo",
    tema: "OTRAS ACTIVIDADES",
    actividad: "Pago plataforma Zoho",
    resultado: "Plataforma de marketing automation activa",
    kpi: "Plataforma activa",
  },

  // DISEÑO
  {
    fecha: "7 de mayo",
    tema: "DISEÑO",
    actividad: "Reunion para elegir plantillas con Tita",
    resultado: "Seleccion de plantilla: MegaDeal II de JoomShaper, evolucion de la plantilla actual",
    kpi: "Template seleccionado",
  },

  // REUNIONES
  {
    fecha: "6 de mayo",
    tema: "REUNIONES",
    actividad: "Seguimiento con Maria Botero 5:30 am",
    resultado: "Reuniones semanales. Reporte enviado por correo:",
    links: [
      { texto: "Ver reporte", url: "https://docs.google.com/document/d/1ugbiQAy0xuDNpHXHaKplHBLjH_vpNj3Xe3cj3kNde7U/edit?usp=sharing" },
    ],
    kpi: "Cumplida",
  },
  {
    fecha: "6 de mayo",
    tema: "REUNIONES",
    actividad: "Reunion tecnica 8 am (Tita, Miguel y Jose)",
    resultado: "Reunion tecnica",
    kpi: "Cumplida",
  },
  {
    fecha: "13 de mayo",
    tema: "REUNIONES",
    actividad: "Seguimiento con Maria Botero 5:30 am",
    resultado: "Reuniones semanales",
    kpi: "Cumplida",
  },
  {
    fecha: "20 de mayo",
    tema: "REUNIONES",
    actividad: "Reporte semanal enviado por correo",
    resultado: "Documento compartido:",
    links: [
      { texto: "Ver reporte", url: "https://docs.google.com/document/d/1iUfFWJ4f9WUJevNHvPL1v25nsg_T2UrSyHZn3vf8yo4/edit?usp=sharing" },
    ],
    kpi: "Enviado",
  },
  {
    fecha: "20 de mayo",
    tema: "REUNIONES",
    actividad: "Reunion tecnica 8 am tras actualizacion de Joomla (Jose, Miguel y Tita)",
    resultado: "Reunion tecnica",
    kpi: "Cumplida",
  },
  {
    fecha: "27 de mayo",
    tema: "REUNIONES",
    actividad: "Seguimiento con Maria Botero 5:30 am",
    resultado: "Reuniones semanales. Reporte enviado por correo:",
    links: [
      { texto: "Ver reporte", url: "https://docs.google.com/document/d/1hCNvRI4T817MKH5D-k8xgQbT1dj28K-TM1cYbgV9EtA/edit?usp=sharing" },
    ],
    kpi: "Cumplida",
  },

  // REPORTE
  {
    fecha: "29 de mayo",
    tema: "REPORTE",
    actividad: "Generacion reporte",
    resultado: "Seguimiento a actividades",
    kpi: "Completado",
  },
];

// ─── Secciones ────────────────────────────────────────────────
const secciones = [
  { tema: "SEO TÉCNICO",       title: "SEO TÉCNICO",       imagen: "/mayo/sitehealth.png" },
  { tema: "BLOG",              title: "BLOG",              imagen: "/mayo/blog.png" },
  { tema: "OTRAS ACTIVIDADES", title: "OTRAS ACTIVIDADES", imagen: undefined },
  { tema: "DISEÑO",            title: "DISEÑO",            imagen: undefined },
  { tema: "REUNIONES",         title: "REUNIONES",         imagen: undefined },
  { tema: "REPORTE",           title: "REPORTE",           imagen: undefined },
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
          <Image
            src={imagen}
            alt={"Imagen " + title}
            width={900}
            height={400}
            style={{ width: "100%", height: "auto", borderRadius: "6px" }}
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
    doc.text("Reporte Mayo 2026 - Kipclin", 14, 10);
    autoTable(doc, {
      head: [["Fecha", "Tema", "Actividad", "Resultado / Observacion", "KPI"]],
      body: data.map((item) => [
        item.fecha,
        item.tema,
        item.resultado + (item.links ? " " + item.links.map((l) => l.url).join(" ") : ""),
        item.actividad,
        item.kpi,
      ]),
    });
    doc.save("Reporte_Mayo_2026_Kipclin.pdf");
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
            Reporte Mayo 2026 - Kipclin
          </h1>
          <p style={{ fontSize: "16px", margin: 0 }}>
            Seguimiento tecnico, editorial y comercial del sitio web. Incluye actividades SEO, blog, diseno, otras gestiones y reuniones clave.
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