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
  // SEO TÉCNICO
  { fecha: "1 al 17 de mayo", tema: "SEO TÉCNICO", actividad: "Seguimiento en Ahrefs y se mantuvo en 99 el Health Score", resultado: "Seguimiento sin variaciones con crawl diario", kpi: "99% indicador de site health" },
  { fecha: "18 de mayo", tema: "SEO TÉCNICO", actividad: "Diagnóstico de errores por migración de Joomla 3 a Joomla 5.4: referencias rotas a archivos JS de caché del plugin JCH Optimize", resultado: "Archivos adjuntos con las URLs del reporte en Google Sheets", kpi: "4.570 errores detectados" },
  { fecha: "19 de mayo", tema: "SEO TÉCNICO", actividad: "Pago de Ahrefs con nueva tarjeta por vencimiento de la anterior", resultado: "Pago realizado con Sara y César. Rastreo reanudado", kpi: "Plataforma activa" },
  { fecha: "20 de mayo", tema: "SEO TÉCNICO", actividad: "Revisión journey de compra", resultado: "Reporte enviado a Jose por correo para hacer correcciones", kpi: "Reporte enviado" },
  { fecha: "20 de mayo", tema: "SEO TÉCNICO", actividad: "Crawling con Ahrefs tras migración: 7.026 URLs rastreadas, 22.516 issues, 4.733 URLs con errores", resultado: "Documento con resumen completo enviado al equipo", kpi: "31% indicador de site health" },
  { fecha: "26 de mayo", tema: "SEO TÉCNICO", actividad: "Reporte de recuperación SEO enviado por correo", resultado: "Documento de recuperación compartido con el equipo", kpi: "91% indicador de site health al cierre de mayo" },

  // BLOG
  { fecha: "4 de mayo", tema: "BLOG", actividad: "Plan editorial para los siguientes dos meses", resultado: "Documento publicado en Google Docs", kpi: "Plan editorial definido" },
  { fecha: "5 de mayo", tema: "BLOG", actividad: "Artículo: Productos de aseo y desinfección para veterinarias y peluquerías de mascotas", resultado: "Publicado con imágenes ALT, keywords, links a productos, interlinking, H1, H2", kpi: "348 hits" },
  { fecha: "8 de mayo", tema: "BLOG", actividad: "Artículo: Ácido peracético: qué es, para qué sirve y cuándo usarlo", resultado: "Publicado con imágenes ALT, keywords, links a productos, interlinking, H1, H2", kpi: "364 hits" },
  { fecha: "12 de mayo", tema: "BLOG", actividad: "Artículo: Antibacterial: todo lo que necesitas saber para protegerte", resultado: "Publicado con imágenes ALT, keywords, links a productos, interlinking, H1, H2", kpi: "325 hits" },
  { fecha: "17 de mayo", tema: "BLOG", actividad: "Artículo: Suavizante de ropa: todo lo que necesitas saber para usarlo bien", resultado: "Publicado con imágenes ALT, keywords, links a productos, interlinking, H1, H2", kpi: "413 hits" },
  { fecha: "18 de mayo", tema: "BLOG", actividad: "Artículo: Contaminación cruzada: qué es, tipos y cómo prevenirla en tu empresa", resultado: "Publicado con imágenes ALT, keywords, links a productos, interlinking, H1, H2", kpi: "195 hits" },
  { fecha: "24 de mayo", tema: "BLOG", actividad: "Artículo: Manual de bioseguridad para Pymes", resultado: "Publicado con imágenes ALT, keywords, links a productos, interlinking, H1, H2", kpi: "128 hits" },
  { fecha: "28 de mayo", tema: "BLOG", actividad: "Artículo: Bioseguridad en restaurantes, cafeterías, panaderías y bares", resultado: "Publicado con imágenes ALT, keywords, links a productos, interlinking, H1, H2", kpi: "45 hits" },

  // OTRAS ACTIVIDADES
  { fecha: "8 de mayo", tema: "OTRAS ACTIVIDADES", actividad: "Sistema de puntos para Kipclin", resultado: "Documento con alternativas a la plataforma de puntos actual enviado por correo", kpi: "Alternativas documentadas" },
  { fecha: "14 al 19 de mayo", tema: "OTRAS ACTIVIDADES", actividad: "Consulta sobre widget flotante multicanal", resultado: "Documento con solución enviado por correo", kpi: "Resuelto" },
  { fecha: "19 de mayo", tema: "OTRAS ACTIVIDADES", actividad: "Pago plataforma Zoho", resultado: "Plataforma de marketing automation activa", kpi: "Plataforma activa" },

  // DISEÑO
  { fecha: "7 de mayo", tema: "DISEÑO", actividad: "Reunión para elegir plantillas con Tita", resultado: "Selección de plantilla: MegaDeal II de JoomShaper, evolución de la plantilla actual", kpi: "Template seleccionado" },

  // REUNIONES
  { fecha: "6 de mayo", tema: "REUNIONES", actividad: "Seguimiento con María Botero 5:30 am", resultado: "Reuniones semanales. Reporte enviado por correo", kpi: "Cumplida" },
  { fecha: "6 de mayo", tema: "REUNIONES", actividad: "Reunión técnica 8 am (Tita, Miguel y Jose)", resultado: "Reunión técnica", kpi: "Cumplida" },
  { fecha: "13 de mayo", tema: "REUNIONES", actividad: "Seguimiento con María Botero 5:30 am", resultado: "Reuniones semanales", kpi: "Cumplida" },
  { fecha: "20 de mayo", tema: "REUNIONES", actividad: "Reporte semanal enviado por correo", resultado: "Documento compartido con el equipo", kpi: "Enviado" },
  { fecha: "20 de mayo", tema: "REUNIONES", actividad: "Reunión técnica 8 am tras actualización de Joomla (Jose, Miguel y Tita)", resultado: "Reunión técnica", kpi: "Cumplida" },
  { fecha: "27 de mayo", tema: "REUNIONES", actividad: "Seguimiento con María Botero 5:30 am", resultado: "Reuniones semanales. Reporte enviado por correo", kpi: "Cumplida" },

  // REPORTE
  { fecha: "29 de mayo", tema: "REPORTE", actividad: "Generación reporte", resultado: "Seguimiento a actividades", kpi: "Completado" },
];

// ─── Secciones ────────────────────────────────────────────────
const secciones = [
  { tema: "SEO TÉCNICO",       title: "SEO TÉCNICO",       emoji: "🔧", imagen: "/mayo/sitehealth.png" },
  { tema: "BLOG",              title: "BLOG",              emoji: "📝", imagen: "/mayo/blog.png" },
  { tema: "OTRAS ACTIVIDADES", title: "OTRAS ACTIVIDADES", emoji: "⚙️", imagen: undefined },
  { tema: "DISEÑO",            title: "DISEÑO",            emoji: "🎨", imagen: undefined },
  { tema: "REUNIONES",         title: "REUNIONES",         emoji: "🤝", imagen: undefined },
  { tema: "REPORTE",           title: "REPORTE",           emoji: "📑", imagen: undefined },
];

// ─── Componente de sección ────────────────────────────────────
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
        {emoji} {title}
      </h2>

      {imagen && (
        <div style={{ margin: "16px 0" }}>
          <Image
            src={imagen}
            alt={`Imagen ${title}`}
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
              <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Resultado / Observación</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left", minWidth: "140px" }}>KPI</th>
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

// ─── Página principal ─────────────────────────────────────────
export default function Page() {
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte Mayo 2026 - Kipclin", 14, 10);
    autoTable(doc, {
      head: [["Fecha", "Tema", "Actividad", "Resultado/Observación", "KPI"]],
      body: data.map((item) => [item.fecha, item.tema, item.actividad, item.resultado, item.kpi]),
    });
    doc.save("Reporte_Mayo_2026_Kipclin.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
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
            📊 Reporte Mayo 2026 – Kipclin
          </h1>
          <p style={{ fontSize: "16px", margin: 0 }}>
            Seguimiento técnico, editorial y comercial del sitio web. Incluye actividades SEO, blog, diseño, otras gestiones y reuniones clave.
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
          📥 Descargar PDF
        </button>