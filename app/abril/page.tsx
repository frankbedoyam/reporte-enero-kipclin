"use client";
import Image from "next/image";
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
  { fecha: "6 de abril",  tema: "SITE HEALTH", actividad: "Crawling con Ahrefs pago", resultado: "Reporte de esta plataforma.", kpi: "99% indicador de site health" },
  { fecha: "6 de abril",  tema: "SITE HEALTH", actividad: "211 Metadescripciones demasiado largas", resultado: "Listado en Google Sheets", kpi: "Pendiente corrección" },
  { fecha: "7 de abril",  tema: "SITE HEALTH", actividad: "Corrección 174 errores imagen alt: Blog de Kipclin", resultado: "Correcciones documentadas en Google Sheets", kpi: "Completado" },
  { fecha: "10 de abril", tema: "SITE HEALTH", actividad: "Optimización páginas lentas según Google", resultado: "Revisión HTML y servidor", kpi: "Pendiente optimización" },
  { fecha: "13 de abril", tema: "SITE HEALTH", actividad: "Crawling con Ahrefs pago", resultado: "Reporte de esta plataforma.", kpi: "99% indicador de site health" },
  { fecha: "20 de abril", tema: "SITE HEALTH", actividad: "Crawling con Ahrefs pago", resultado: "Reporte de esta plataforma.", kpi: "99% indicador de site health" },
  { fecha: "27 de abril", tema: "SITE HEALTH", actividad: "Crawling con Ahrefs pago", resultado: "Reporte de esta plataforma.", kpi: "99% indicador de site health" },
  { fecha: "27 de abril", tema: "SITE HEALTH", actividad: "Correcciones de errores 404", resultado: "8 errores enviados y corregidos el mismo día", kpi: "99% indicador de site health" },

  // BLOG
  { fecha: "9 de abril",  tema: "BLOG", actividad: "Artículo: Manchas difíciles: la solución que tu ropa estaba esperando", resultado: "Publicado con SEO completo", kpi: "178 visitas" },
  { fecha: "10 de abril", tema: "BLOG", actividad: "Artículo: Cómo quitar manchas de sudor y desodorante", resultado: "Publicado con SEO completo", kpi: "333 visitas" },
  { fecha: "13 de abril", tema: "BLOG", actividad: "Artículo: Alcohol Antiséptico vs Alcohol Glicerinado", resultado: "Publicado con SEO completo", kpi: "891 visitas" },
  { fecha: "14 de abril", tema: "BLOG", actividad: "Artículo: Traperos: tipos, diferencias y cómo elegir", resultado: "Publicado con SEO completo", kpi: "434 visitas" },
  { fecha: "16 de abril", tema: "BLOG", actividad: "Artículo: Papel higiénico: guía completa", resultado: "Publicado con SEO completo", kpi: "393 visitas" },
  { fecha: "22 de abril", tema: "BLOG", actividad: "Artículo: Jabón: guía completa sobre tipos y usos", resultado: "Publicado con SEO completo", kpi: "233 visitas" },
  { fecha: "24 de abril", tema: "BLOG", actividad: "Artículo: Amonio cuaternario de quinta generación", resultado: "Publicado con SEO completo", kpi: "875 visitas" },
  { fecha: "28 de abril", tema: "BLOG", actividad: "Artículo: Escobas: tipos, usos y cómo elegir", resultado: "Publicado con SEO completo", kpi: "53 visitas" },

  // DESCRIPCIONES DE PRODUCTOS
  { fecha: "8 al 22 de abril", tema: "DESCRIPCIONES DE PRODUCTOS", actividad: "Acortar descripciones siguiendo regla SEO 160 caracteres", resultado: "960 productos con descripciones optimizadas", kpi: "Mejora SEO ecommerce" },

  // MAILING
  { fecha: "1 al 12 de abril", tema: "MAILING", actividad: "Configurar Zoho para campañas de copropiedades y Refill", resultado: "Nueva plataforma de envíos", kpi: "Plataforma configurada" },
  { fecha: "13 de abril",      tema: "MAILING", actividad: "Enviar prueba", resultado: "Prueba realizada en Zoho", kpi: "Completado" },

  // REUNIONES
  { fecha: "1 de abril",  tema: "REUNIONES", actividad: "Seguimiento con María Botero 5:30 am", resultado: "Reuniones semanales", kpi: "Cumplida" },
  { fecha: "8 de abril",  tema: "REUNIONES", actividad: "Reunión técnica 8 am (Tita, Miguel y Jose)", resultado: "Reunión técnica", kpi: "Cumplida" },
  { fecha: "11 de abril", tema: "REUNIONES", actividad: "Seguimiento con María Botero 8 am", resultado: "Reuniones semanales", kpi: "Cumplida" },
  { fecha: "15 de abril", tema: "REUNIONES", actividad: "Seguimiento con María Botero 5:30 am", resultado: "Reuniones semanales", kpi: "Cumplida" },
  { fecha: "22 de abril", tema: "REUNIONES", actividad: "Seguimiento con María Botero 5:30 am", resultado: "Reuniones semanales", kpi: "Cumplida" },
  { fecha: "22 de abril", tema: "REUNIONES", actividad: "Reunión técnica 8 am (Jose, Miguel y Tita)", resultado: "Reunión técnica", kpi: "Cumplida" },
  { fecha: "29 de abril", tema: "REUNIONES", actividad: "Seguimiento con María Botero 5:30 am", resultado: "Reuniones semanales", kpi: "Cumplida" },

  // REPORTE
  { fecha: "30 de abril", tema: "REPORTE", actividad: "Generación reporte", resultado: "Seguimiento a actividades", kpi: "Completado" },
];

// ─── Secciones ────────────────────────────────────────────────
// ✅ imagen como string, NO como JSX dentro del objeto
const secciones = [
  { tema: "SITE HEALTH",              title: "SITE HEALTH",   emoji: "🔧", imagen: "/abril/sitehealth.png" },
  { tema: "BLOG",                     title: "BLOG",          emoji: "📝", imagen: "/abril/blog.png" },
  { tema: "DESCRIPCIONES DE PRODUCTOS", title: "DESCRIPCIONES", emoji: "🔍", imagen: undefined },
  { tema: "MAILING",                  title: "MAILING",       emoji: "📨", imagen: "/abril/mailing.png" },
  { tema: "REUNIONES",                title: "REUNIONES",     emoji: "🤝", imagen: undefined },
  { tema: "REPORTE",                  title: "REPORTE",       emoji: "📑", imagen: undefined },
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

      {imagen && (
        <div style={{ textAlign: "center", margin: "16px 0" }}>
          <Image
            src={imagen}
            alt={title}
            width={1299}
            height={446}
            sizes="(max-width: 768px) 100vw, 1299px"
            style={{ borderRadius: "8px", height: "auto", width: "100%", objectFit: "contain" }}
          />
        </div>
      )}

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
    doc.text("Reporte Abril 2026 – Kipclin", 14, 10);
    autoTable(doc, {
      head: [["Fecha", "Tema General", "Actividad", "Resultado/Observación", "KPI"]],
      body: data.map((item) => [item.fecha, item.tema, item.actividad, item.resultado, item.kpi]),
    });
    doc.save("Reporte_Abril_2026_Kipclin.pdf");
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
            📊 Reporte Abril 2026 – Kipclin
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
            imagen={s.imagen}
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