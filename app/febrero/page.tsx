"use client";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// ─── Tipos ────────────────────────────────────────────────────
type ReportItem = {
  fecha: string;
  tema: string;
  actividad: string;
  resultado: string;
  kpi: string;
};

// ─── Datos ────────────────────────────────────────────────────
const data: ReportItem[] = [
  // SITE HEALTH
  { fecha: "6 y 9 de febrero",   tema: "SITE HEALTH", actividad: "Cierre de Semrush, bajar reportes e informes",              resultado: "Reportes descargados",                                                           kpi: "Completado" },
  { fecha: "10 de febrero",      tema: "SITE HEALTH", actividad: "Inicio con Ahrefs",                                          resultado: "Reporte de esta plataforma enviado por correo",                                   kpi: "98% indicador de site health" },
  { fecha: "16 y 17 de febrero", tema: "SITE HEALTH", actividad: "Mapa de enlaces internos para corregir páginas huérfanas",   resultado: "Documento: https://docs.google.com/spreadsheets/d/1la3af6PyfgEAiaVbVSFYo8bvuVYez6Ol", kpi: "Completado" },
  { fecha: "25 de febrero",      tema: "SITE HEALTH", actividad: "Presentación de 65 páginas huérfanas del blog, corregidas",  resultado: "Ver documento de mapa de enlaces internos",                                       kpi: "65 páginas corregidas" },

  // BLOG
  { fecha: "12 de febrero",      tema: "BLOG", actividad: "Publicado el artículo \"Guía completa para pasar la visita sanitaria\"",                                                               resultado: "Contenido publicado",                                              kpi: "99 hits" },
  { fecha: "13 de febrero",      tema: "BLOG", actividad: "Publicado el artículo \"Checklist de limpieza hotelera, como reducir costos\"",                                                        resultado: "Contenido publicado",                                              kpi: "269 hits" },
  { fecha: "18 al 25 de febrero",tema: "BLOG", actividad: "Corrección de 65 artículos del Blog: keywords, fotos con alt óptimo, módulo de compras y links internos", resultado: "65 artículos corregidos", kpi: "65 artículos corregidos" },

  // ANÁLISIS (E) EN TÍTULOS
  { fecha: "24 de febrero", tema: "ANÁLISIS (E)", actividad: "Análisis de la repercusión de añadir (E) en títulos de productos – 5 casos analizados, esperando resto de productos de Tita", resultado: "Documento: https://docs.google.com/document/d/1po8utfsN7_ifqwUuSNZ-bAo-R_lwnYxd", kpi: "En proceso" },

  // HUBSPOT
  { fecha: "9 de febrero", tema: "HUBSPOT", actividad: "Diseño y publicación del Formulario en Hubspot para campaña", resultado: "https://ue3ss.share.hsforms.com/2kt435btqRJWMSeV4HkoKQg", kpi: "Completado" },

  // MAILING
  { fecha: "3 de febrero",  tema: "MAILING", actividad: "Realización de diseños de propuesta de mailing con producto, fotos e ilustración",                resultado: "En reunión de 4 se eligió con foto",               kpi: "Aprobado" },
  { fecha: "6 de febrero",  tema: "MAILING", actividad: "Envío del artículo \"4 áreas donde los hoteles pierden dinero en limpieza y cómo evitarlo\"",     resultado: "Base de datos: 93 alojamientos",                    kpi: "19.8% de apertura" },
  { fecha: "18 de febrero", tema: "MAILING", actividad: "Diseño y envío para pruebas del Sistema de Puntos para Copropiedades",                            resultado: "En aprobación y ajustes",                          kpi: "En proceso" },

  // REUNIONES
  { fecha: "4 de febrero",  tema: "REUNIONES", actividad: "Seguimiento",                              resultado: "Reuniones semanales",              kpi: "Cumplida" },
  { fecha: "11 de febrero", tema: "REUNIONES", actividad: "Seguimiento",                              resultado: "Reuniones semanales",              kpi: "Cumplida" },
  { fecha: "18 de febrero", tema: "REUNIONES", actividad: "Seguimiento",                              resultado: "Reuniones semanales",              kpi: "Cumplida" },
  { fecha: "25 de febrero", tema: "REUNIONES", actividad: "Seguimiento",                              resultado: "Reuniones semanales",              kpi: "Cumplida" },
  { fecha: "16 de febrero", tema: "REUNIONES", actividad: "Presentación necesidad a Hubspot",         resultado: "Reunión solo Frank y Mateo de Hubspot", kpi: "Cumplida" },
  { fecha: "20 de febrero", tema: "REUNIONES", actividad: "Hubspot presenta sus funcionalidades",     resultado: "Reunión con Tita",                 kpi: "Cumplida" },
  { fecha: "25 de febrero", tema: "REUNIONES", actividad: "Hubspot presenta propuesta",               resultado: "Reunión con Tita",                 kpi: "Cumplida" },
  { fecha: "25 de febrero", tema: "REUNIONES", actividad: "Sistema de Puntos de Copropiedades",       resultado: "Reunión con Tita, Miguel y José",  kpi: "Cumplida" },

  // REPORTE
  { fecha: "27 de febrero", tema: "REPORTE", actividad: "Generación reporte", resultado: "Seguimiento a actividades", kpi: "Completado" },
];

// ─── Secciones ────────────────────────────────────────────────
const secciones = [
  { tema: "SITE HEALTH",   title: "SITE HEALTH",                                         emoji: "🔧" },
  { tema: "BLOG",          title: "BLOG",                                                emoji: "📝" },
  { tema: "ANÁLISIS (E)",  title: "ANÁLISIS DE (E) EN TÍTULOS DE PRODUCTOS",             emoji: "🔍" },
  { tema: "HUBSPOT",       title: "FORMULARIO HUBSPOT PARA CAMPAÑA",                     emoji: "📋" },
  { tema: "MAILING",       title: "MAILING",                                             emoji: "📨" },
  { tema: "REUNIONES",     title: "REUNIONES",                                           emoji: "🤝" },
  { tema: "REPORTE",       title: "REPORTE",                                             emoji: "📑" },
];

// ─── Componente tabla ─────────────────────────────────────────
function Section({ title, emoji, items }: { title: string; emoji: string; items: ReportItem[] }) {
  return (
    <section className="mb-10 font-sans">
      <h2
        style={{
          backgroundColor: "#0056A6",
          color: "white",
          padding: "12px 16px",
          borderRadius: "6px 6px 0 0",
          fontSize: "20px",
          fontWeight: "bold",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {emoji} {title}
      </h2>

      <div style={{ border: "1px solid #ddd", borderRadius: "0 0 6px 6px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#0056A6", color: "white" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Fecha</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Actividad</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Resultado/Observación</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>KPI</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#f9f9f9" : "white" }}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{row.fecha}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{row.actividad}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{row.resultado}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "#666", fontStyle: "italic" }}>{row.kpi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── Página ───────────────────────────────────────────────────
export default function Page() {
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte Febrero 2026 – Kipclin", 14, 10);

    autoTable(doc, {
      head: [["Fecha", "Tema General", "Actividad", "Resultado/Observación", "KPI"]],
      body: data.map((item) => [item.fecha, item.tema, item.actividad, item.resultado, item.kpi]),
    });

    doc.save("Reporte_Febrero_2026_Kipclin.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div
          style={{
            backgroundColor: "#0056A6",
            padding: "20px",
            borderRadius: "8px",
            color: "white",
            marginBottom: "24px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            borderBottom: "4px solid #4FA3D1",
          }}
        >
          <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>
            📊 Reporte Febrero 2026 – Kipclin
          </h1>
          <p style={{ fontSize: "18px", margin: 0 }}>
            Seguimiento técnico, editorial y comercial del sitio web. Incluye actividades SEO, mailing, contenido y reuniones clave.
          </p>
        </div>

        {/* Secciones */}
        {secciones.map((s) => (
          <Section
            key={s.tema}
            title={s.title}
            emoji={s.emoji}
            items={data.filter((d) => d.tema === s.tema)}
          />
        ))}

        {/* Botón PDF */}
        <button
          onClick={exportPDF}
          style={{
            backgroundColor: "#0056A6",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          📥 Descargar PDF
        </button>
      </div>
    </div>
  );
}