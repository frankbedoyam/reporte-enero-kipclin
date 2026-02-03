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
  { fecha: "7 de enero",  tema: "SITE HEALTH", actividad: "enlaces rotos",          resultado: "847 enlaces borrados",            kpi: "847 enlaces borrados" },
  { fecha: "10 de enero", tema: "SITE HEALTH", actividad: "LLMs",                   resultado: "Sitio optimizado para IA",        kpi: "95% valoración Semrush IA" },
  { fecha: "17 de enero", tema: "SITE HEALTH", actividad: "Baja relación HTML",     resultado: "657 páginas con este problema",  kpi: "Subir 1% Site Health para llegar a 81%" },
  { fecha: "21 de enero", tema: "SITE HEALTH", actividad: "H1 en pages",            resultado: "Se puso H1 a 106 páginas",      kpi: "Subir 1% Site Health para llegar a 82%" },
  { fecha: "26 de enero", tema: "SITE HEALTH", actividad: "Sitemap incorrecto",     resultado: "Corregidas 106 páginas",        kpi: "Subir 1% Site Health para llegar a 83%" },

  // BLOG
  { fecha: "8 de enero",  tema: "BLOG", actividad: "Propuesta temas Alojamientos",  resultado: "Correo enviado",      kpi: "Propuesta enviada" },
  { fecha: "15 de enero", tema: "BLOG", actividad: "4 áreas donde pierden dinero",  resultado: "Contenido publicado", kpi: "208 hits / 16 views" },
  { fecha: "20 de enero", tema: "BLOG", actividad: "Checklist limpieza hotelera",   resultado: "Contenido publicado", kpi: "Enviado y esperando ajustes y correcciones" },
  { fecha: "26 de enero", tema: "BLOG", actividad: "Revisiones sanitarias",         resultado: "Contenido publicado", kpi: "Enviado y esperando ajustes y correcciones" },

  // CATEGORIZACIÓN
  { fecha: "11-17 enero", tema: "CATEGORIZACIÓN", actividad: "Desarrollo categorías",       resultado: "190 artículos categorizados", kpi: "Completado" },
  { fecha: "23 de enero", tema: "CATEGORIZACIÓN", actividad: "Reunión con Tita",            resultado: "Nueva categorización",       kpi: "Definida" },
  { fecha: "26 de enero", tema: "CATEGORIZACIÓN", actividad: "Propuesta recategorización",  resultado: "Correo enviado",             kpi: "Enviado y esperando ajustes y correcciones" },

  // MAILING
  { fecha: "13 de enero", tema: "MAILING", actividad: "Limpieza vs vista",  resultado: "Mailchimp enviado", kpi: "14 aperturas" },
  { fecha: "21 de enero", tema: "MAILING", actividad: "Hoteles pierden $", resultado: "Mailchimp enviado", kpi: "11 aperturas" },
  { fecha: "29 de enero", tema: "MAILING", actividad: "Propuesta de cambio de estructura del mailing", resultado: "Mailchimp enviado", kpi: "Enviado y esperando ajustes y correcciones" },


  // REUNIONES
  { fecha: "7 de enero", tema: "REUNIONES", actividad: "Seguimiento",      resultado: "Reuniones semanales",  kpi: "Cumplidas" },
{ fecha: "14 de enero", tema: "REUNIONES", actividad: "Seguimiento",      resultado: "Reuniones semanales",  kpi: "Cumplidas" },
{ fecha: "21 de enero", tema: "REUNIONES", actividad: "Seguimiento",      resultado: "Reuniones semanales",  kpi: "Cumplidas" },
{ fecha: "28 de enero", tema: "REUNIONES", actividad: "Seguimiento",      resultado: "Reuniones semanales",  kpi: "Cumplidas" },
  { fecha: "31 de enero", tema: "REUNIONES", actividad: "Reunión extraordinaria citada por Tita Ochoa", resultado: "Reunión de 9:30 am a 12 m",   kpi: "Cumplida" },

  // REPORTE
  { fecha: "31 de enero", tema: "REPORTE", actividad: "Generación reporte", resultado: "Seguimiento a actividades", kpi: "Completado" },
];

// ─── Secciones ────────────────────────────────────────────────
const secciones = [
  { tema: "SITE HEALTH",    title: "SITE HEALTH",                            emoji: "🔧" },
  { tema: "BLOG",           title: "BLOG",                                   emoji: "📝" },
  { tema: "CATEGORIZACIÓN", title: "CATEGORIZACIÓN PARRILLA DE CONTENIDOS",  emoji: "📚" },
  { tema: "MAILING",        title: "MAILING",                               emoji: "📨" },
  { tema: "REUNIONES",      title: "REUNIONES",                             emoji: "🤝" },
  { tema: "REPORTE",        title: "REPORTE",                               emoji: "📑" },
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
    doc.text("Reporte Enero 2026 – Kipclin", 14, 10);

    autoTable(doc, {
      head: [["Fecha", "Tema General", "Actividad", "Resultado/Observación", "KPI"]],
      body: data.map((item) => [item.fecha, item.tema, item.actividad, item.resultado, item.kpi]),
    });

    doc.save("Reporte_Enero_2026_Kipclin.pdf");
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
            📊 Reporte Enero 2026 – Kipclin
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