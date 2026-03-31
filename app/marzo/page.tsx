"use client";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Image from "next/image";
import MesNav from "../Components/MesNav";

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
  { fecha: "5 de marzo",   tema: "SITE HEALTH", actividad: "Análisis con Ahrefs gratuito", resultado: "Reporte de páginas huérfanas", kpi: "Completado" },
  { fecha: "11 de marzo",      tema: "SITE HEALTH", actividad: "Análisis con Sitebulb gratuito", resultado: "Corrección de errores ",  kpi: "mejorar la salud del sitio" },
  { fecha: "19 de marzo", tema: "SITE HEALTH", actividad: "Configuración Ahrefs pago",   resultado: "Configuración de nueva plataforma", kpi: "Completado" },
  { fecha: "19 de marzo",      tema: "SITE HEALTH", actividad: "Crawling de la totalidad del sitio",  resultado: "Rastreo total del sitio para identificar prioridades",kpi: "7.461 páginas analizadas " },
{ fecha: "20 al 24 de marzo",      tema: "SITE HEALTH", actividad: "Correcciones de link rotos, errores 404 y canonicals",  resultado: "Sitio más saludable",kpi: "98% indicador de site health " },
{ fecha: "25 de marzo",      tema: "SITE HEALTH", actividad: "Nuevo crawling para lograr calificación de 99",  resultado: "Sitio más saludable",kpi: "99% indicador de site health " },

  // BLOG
  { fecha: "1 al 15 de marzo", tema: "BLOG", actividad: "Se han corregido 110 artículos del Blog, que ya tienen keywords, fotos con alt óptimo, módulo que conduce a compras y links internos.", resultado: "110 artículos corregidos", kpi: "proyección en elevar el índice de Autoridad de 4 a 12 semanas" },
  { fecha: "26 de marzo", tema: "BLOG", actividad: "Publicado el artículo: Cómo transformar el presupuesto de Asamblea", resultado: "Artículo publicado", kpi: "107 hits" },
  
  // DESCRIPCIONES DE PRODUCTOS
  { fecha: "11 al 18 de marzo", tema: "DESCRIPCIONES DE PRODUCTOS", actividad: "Agregar Descripciones a productos que no las tenían ", resultado: "Todos los productos de Kipclin.com tienen descripciones ahora", kpi: "Mejora en SEO para ecommerce de 4 a 12 semanas" },

    // MAILING
  { fecha: "20 de marzo",  tema: "MAILING", actividad: "Cancelar Mailchimp", resultado: "Cierre de plataforma", kpi: "N/A" },
  { fecha: "23 al 27 de marzo",  tema: "MAILING", actividad: "Configurar plataforma Zoho para nuevas campañas de Copropiedades y Refill",     resultado: "Nueva plataforma de envíos y automatización", kpi: "Plataforma configurada" },
  

  // REUNIONES
  { fecha: "4 de marzo",  tema: "REUNIONES", actividad: "Seguimiento con María y Sara 6:30 am", resultado: "Reuniones semanales",kpi: "Cumplida" },
  { fecha: "10 de marzo", tema: "REUNIONES", actividad: "Reunión con Hubspot ajustes a la cotización",     resultado: "Reunión entre Mateo y Frank", kpi: "Cumplida" },
  { fecha: "11 de marzo", tema: "REUNIONES", actividad: "Seguimiento con María 5:30 am", resultado: "Reuniones semanales", kpi: "Cumplida" },
  { fecha: "11 de marzo", tema: "REUNIONES", actividad: "Reunión técnica con Tita y Jose 8 am", resultado: "Seguimiento a temas técnicos", kpi: "Cumplida" },
  { fecha: "12 de marzo", tema: "REUNIONES", actividad: "Reunión con Martín Moreno de Process Automation", resultado: "Introducción para identificar necesidades de Kipclin entre Martín y Frank",  kpi: "Cumplida" },
  { fecha: "18 de marzo", tema: "REUNIONES", actividad: "Seguimiento con María 5:30 am",resultado: "Reuniones semanales",kpi: "Cumplida" },
  { fecha: "16 de marzo", tema: "REUNIONES", actividad: "Reunión sobre necesidades de Kipclin en Marketing",  resultado: "Reunión entre Tita, Daniel y Frank",  kpi: "Cumplida" },
  { fecha: "20 de marzo", tema: "REUNIONES", actividad: "Zoho presenta Marketing Automation", resultado: "Reunión de Zoho con Tita, Miguel y Frank",  kpi: "Cumplida" },
  { fecha: "25 de marzo", tema: "REUNIONES", actividad: "Reunión técnica con Tita y Jose 8 am", resultado: "Seguimiento a temas técnicos", kpi: "Cumplida" },
 
  // REPORTE
  { fecha: "30 de marzo", tema: "REPORTE", actividad: "Generación reporte", resultado: "Seguimiento a actividades", kpi: "Completado" },
];

// ─── Secciones ────────────────────────────────────────────────
const secciones = [
  { tema: "SITE HEALTH", title: "SITE HEALTH", emoji: "🔧", imagen: "/marzo/sitehealth.png" },
  { tema: "BLOG", title: "BLOG", emoji: "📝", imagen: "/marzo/huerfanas.png" },
  { tema: "DESCRIPCIONES DE PRODUCTOS", title: "DESCRIPCIONES", emoji: "🔍", imagen: "/marzo/descripciones.jpg" },
  { tema: "MAILING", title: "MAILING", emoji: "📨", imagen: "/marzo/marketingautomation.jpg" },
  { tema: "REUNIONES", title: "REUNIONES", emoji: "🤝", imagen: "/marzo/reuniones.jpg" },
  { tema: "REPORTE", title: "REPORTE", emoji: "📑", imagen: "/marzo/reporte.jpg" },
];

// ─── Componente tabla ─────────────────────────────────────────
function Section({
  title,
  emoji,
  items,
  imagen,
}: {
  title: string;
  emoji: string;
  items: ReportItem[];
  imagen?: string;
}) {
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

      {/* Imagen por sección */}
      {imagen && (
  <div style={{ textAlign: "center", margin: "16px 0" }}>
    <Image
      src={imagen}
      alt={title}
      width={1299}   // ancho real del archivo
      height={446}   // alto real del archivo (ejemplo real)
      sizes="(max-width: 768px) 100vw, 1299px" // 👈 responsive: en móvil ocupa todo el ancho
      style={{ borderRadius: "8px", height: "auto", width: "100%", objectFit: "contain" }}
    />
  </div>
)}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "0 0 6px 6px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
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
    doc.text("Reporte Marzo 2026 – Kipclin", 14, 10);

    autoTable(doc, {
      head: [["Fecha", "Tema General", "Actividad", "Resultado/Observación", "KPI"]],
      body: data.map((item) => [item.fecha, item.tema, item.actividad, item.resultado, item.kpi]),
    });

    doc.save("Reporte_Marzo_2026_Kipclin.pdf");
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
            📊 Reporte Marzo 2026 – Kipclin
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
          imagen={s.imagen}   // 👈 aquí pasas la imagen
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