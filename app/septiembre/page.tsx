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

// ─── Indicadores destacados del mes (tarjetas superiores) ─────
const destacados = [
  { valor: "10", etiqueta: "artículos publicados en el blog" },
  { valor: "2.590", etiqueta: "hits acumulados en Joomla (corte 29 sep)" },
  { valor: "93 → 5", etiqueta: "URL con metadescripción demasiado larga" },
  { valor: "748", etiqueta: "keywords en el top 10 de Google" },
  { valor: "1.523", etiqueta: "páginas indexadas (1.321 el 26 ago)" },
  { valor: "2", etiqueta: "envíos de la campaña Semana de Receso" },
];

// ─── Datos ────────────────────────────────────────────────────
const data: ReportItem[] = [

  // SEO TÉCNICO
  {
    fecha: "7 y 8 de septiembre",
    tema: "SEO TÉCNICO",
    actividad: "Análisis técnico y de rendimiento del sitio con Ahrefs Site Audit, Search Console y GA4.",
    resultado: "Salud del sitio 96/100, con 248 URL con errores de 6.479 rastreadas. Se identificó que las impresiones subieron 97% entre junio y agosto (371.334 a 730.277) mientras el CTR cayó de 1,11% a 0,83%. Las fichas de comerciante tienen un CTR de 10,2% frente a 1,52% de los fragmentos de producto estándar, lo que convierte la ampliación del schema de producto en la oportunidad de mayor impacto.",
    kpi: "Diagnóstico completo",
  },
  {
    fecha: "8 de septiembre",
    tema: "SEO TÉCNICO",
    actividad: "Reescritura de metadescripciones de las páginas con mayor número de impresiones y menor CTR.",
    resultado: "Se aplicaron en VirtueMart 60 metadescripciones: las 20 páginas prioritarias más 40 de producto y categoría. Se detectó que 7 de las 20 páginas compartían la misma metadescripción genérica de la tienda, con un error de tipeo (\"le limpieza\"). Se entregó un Excel con el H1 y la metadescripción actual frente a la propuesta.",
    kpi: "60 metadescripciones corregidas",
  },
  {
    fecha: "8 de septiembre",
    tema: "SEO TÉCNICO",
    actividad: "Envío a José de los hallazgos técnicos priorizados, con el detalle de URL por punto.",
    resultado: "Seis puntos: 10 páginas con error 410 y 404; 277 URL con error de servidor (5xx) sin validar en Search Console, 271 de ellas de la cola residual del incidente de junio; 17 URL canónicas sin enlaces internos; 13 errores de validación de datos estructurados; 134 URL con respuesta lenta a rastreadores de IA; y confirmación del noindex de unas 2.100 páginas de filtro y paginación.",
    kpi: "6 hallazgos escalados",
  },
  {
    fecha: "8 y 9 de septiembre",
    tema: "SEO TÉCNICO",
    actividad: "Consulta de Mercadeo (Sara) sobre cómo retirar un producto descontinuado sin afectar el SEO.",
    resultado: "Se orientó el retiro del Limpiador de acero inoxidable Dr Beckmann (KIP-OPT-23913): desindexar la página con José y revisar el efecto sobre visitas, impresiones y clics de productos similares.",
    kpi: "Criterio definido",
  },
  {
    fecha: "9 de septiembre",
    tema: "SEO TÉCNICO",
    actividad: "Propuesta de ampliación del schema de producto (datos estructurados).",
    resultado: "Se auditó el código de 3 fichas de producto de distintas categorías. Se propuso agregar brand, aggregateRating, política de devolución, datos de envío, priceValidUntil y gtin en la plantilla común de VirtueMart (668 fichas). Se detectaron 3 problemas de calidad de datos: una reseña sin calificación, identificadores con caracteres de más y precios con decimales espurios.",
    kpi: "Propuesta entregada en Word",
  },
  {
    fecha: "16 de septiembre",
    tema: "SEO TÉCNICO",
    actividad: "Plan de backlinks en dos frentes, empezando por PQP.",
    resultado: "Primer frente: checklist técnico de 10 elementos para revisar los enlaces que las marcas distribuidas hacen hacia Kipclin (atributo del enlace, anchor, ubicación, autoridad, indexabilidad, entre otros). Segundo frente: propuesta de cocreación de contenido con proveedores, con un borrador de entrevista al desarrollador de Brillapool en PQP para sumarse a la campaña de Semana de Receso.",
    kpi: "Plan presentado",
  },
  {
    fecha: "23 de septiembre",
    tema: "SEO TÉCNICO",
    actividad: "Seguimiento de resultados con corte al 21 de septiembre (Search Console y Ahrefs).",
    resultado: "El problema \"Meta description too long\" bajó de 93 a 5 URL (95% corregido). Tres de las páginas reescritas el 8 de septiembre están entre las de mayor crecimiento: Suavizante de ropa (+199 clics), Escobas (+229) y Ácido peracético (+167). Las keywords en top 10 llegaron a 748, 59% por encima del mínimo de julio, y las páginas indexadas subieron de 1.321 a 1.523. Quedó iniciada la validación de los 275 errores de servidor del incidente de junio.",
    kpi: "95% de metadescripciones corregidas",
  },
  {
    fecha: "25 de septiembre",
    tema: "SEO TÉCNICO",
    actividad: "Hallazgo en el contenido de amonio cuaternario.",
    resultado: "La ficha técnica en PDF es la segunda página del sitio en clics (1.420), después del inicio. Los artículos del blog sobre el tema bajaron de 80 a 107 clics semanales en julio a entre 20 y 36 desde agosto, lo que coincide con el cambio de URL del artículo principal sin redirección. También se detectó un artículo publicado bajo dos URL. Ambos casos quedaron escalados a José.",
    kpi: "Pendiente redirección 301",
  },

  // SEO DE CONTENIDOS (BLOG)
  {
    fecha: "1 de septiembre",
    tema: "SEO DE CONTENIDOS",
    actividad: "Productos de limpieza para dejar tu casa impecable antes de la semana de receso",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H2, índice, tabla, preguntas frecuentes y módulo de productos",
    kpi: "302 hits (Joomla)",
  },
  {
    fecha: "3 de septiembre",
    tema: "SEO DE CONTENIDOS",
    actividad: "Prepara tu negocio para la celebración de Amor y Amistad",
    resultado: "Artículo adicional al calendario, aprobado en comité de contenidos, dirigido a restaurantes, centros de estética y hospedajes. Publicado con la estructura estándar del blog y módulo de productos",
    kpi: "353 hits (Joomla)",
  },
  {
    fecha: "7 de septiembre",
    tema: "SEO DE CONTENIDOS",
    actividad: "Gel antibacterial y más: arma tu kit de aseo personal para la semana de receso",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H2, índice, tabla, preguntas frecuentes y módulo de productos",
    kpi: "364 hits (Joomla)",
  },
  {
    fecha: "9 de septiembre",
    tema: "SEO DE CONTENIDOS",
    actividad: "Cómo tener la piscina de tu finca lista para la semana de receso",
    resultado: "Artículo publicado con enfoque en arrendadores de fincas. Se evitó repetir la química de los dos artículos de piscinas ya posicionados, enlazándolos, y se incluyó la dosificación real de Sulfato de Aluminio PQP según la ficha técnica del proveedor",
    kpi: "332 hits (Joomla)",
  },
  {
    fecha: "11 de septiembre",
    tema: "SEO DE CONTENIDOS",
    actividad: "¿Quién limpia en tu casa? Guía Kipclin para dividir las labores del hogar",
    resultado: "Artículo de Amor y Amistad (keyword de 19.000 búsquedas/mes) publicado con la estructura estándar del blog. Es el artículo con más hits del mes",
    kpi: "384 hits (Joomla)",
  },
  {
    fecha: "15 de septiembre",
    tema: "SEO DE CONTENIDOS",
    actividad: "Prepara piscinas y zonas húmedas con Kipclin antes de la semana de receso",
    resultado: "Artículo publicado para centros de entrenamiento, capacitación en natación e hidroterapia, con imágenes con ALT, keywords, links a productos, interlinking y módulo de productos",
    kpi: "259 hits (Joomla)",
  },
  {
    fecha: "17 de septiembre",
    tema: "SEO DE CONTENIDOS",
    actividad: "Reduce el consumo de jabón, papel higiénico y servilletas en tu restaurante",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H2, índice, tabla, preguntas frecuentes y módulo de productos",
    kpi: "281 hits (Joomla)",
  },
  {
    fecha: "21 de septiembre",
    tema: "SEO DE CONTENIDOS",
    actividad: "Cuánto papel higiénico, jabón y servilletas necesita tu hotel, restaurante o finca para la temporada alta",
    resultado: "Artículo publicado sobre la keyword \"papel higiénico\" (4.200 búsquedas/mes), con tabla de cálculo de insumos, links a productos, interlinking y módulo de productos",
    kpi: "213 hits (Joomla)",
  },
  {
    fecha: "25 de septiembre",
    tema: "SEO DE CONTENIDOS",
    actividad: "Cómo preparar tu piscina para la semana de receso con nuestros productos",
    resultado: "Artículo para hoteles, programado alrededor del Día Mundial del Turismo, con imágenes con ALT, keywords, links a productos, interlinking y módulo de productos",
    kpi: "93 hits (Joomla)",
  },
  {
    fecha: "29 de septiembre",
    tema: "SEO DE CONTENIDOS",
    actividad: "Semana de receso en Colombia: restaurantes de Medellín y el Oriente listos para recibir a las familias",
    resultado: "Artículo de cierre de la campaña, con enfoque regional, publicado con la estructura estándar del blog y módulo de productos",
    kpi: "9 hits (Joomla)",
  },

  // ZOHO
  {
    fecha: "2 de septiembre",
    tema: "ZOHO",
    actividad: "Segmentación de la base de piscinas y del universo de fidelización.",
    resultado: "La base de piscinas quedó con 148 pedidos de 90 clientes (hogares, alojamientos, unidades residenciales y comercios), para enviar mensajes diferenciados por segmento. El universo para fidelización y carrito abandonado quedó en 913 clientes recurrentes del último año.",
    kpi: "2 bases segmentadas",
  },
  {
    fecha: "3 al 7 de septiembre",
    tema: "ZOHO",
    actividad: "Inventario de los mensajes automatizados que ya existen en Kipclin.com (venta cruzada, seguimiento, etc.).",
    resultado: "José revisó el código y confirmó dos envíos automáticos activos. Se usará como punto de partida para no duplicar mensajes al configurar la fidelización en Zoho.",
    kpi: "2 automatizaciones identificadas",
  },
  {
    fecha: "7 de septiembre",
    tema: "ZOHO",
    actividad: "Primer envío de la campaña Semana de Receso y creación del código de descuento.",
    resultado: "87 correos enviados, 100% entregados, 15% de apertura y 3,4% de clics, sin rebotes ni spam y con una sola cancelación de suscripción. José creó el mismo día el código RECESO10 (10% de descuento, activo del 10 de septiembre al 15 de octubre).",
    kpi: "15% apertura / 3,4% clics",
  },
  {
    fecha: "9 al 12 de septiembre",
    tema: "ZOHO",
    actividad: "Configuración de Zoho para SMS (Twilio), WhatsApp (Meta) y campañas de fidelización.",
    resultado: "Se pagaron los USD 20 de Twilio para SMS. El plan de Zoho pasó de USD 29 a USD 39 mensuales (de 1.000 a 2.000 contactos) y se cargó la base de 900 clientes con compras entre agosto de 2025 y agosto de 2026. El perfil de cumplimiento de Twilio, inicialmente rechazado, se corrigió y quedó en revisión. Meta no aceptó el número de atención al cliente existente.",
    kpi: "Base de 900 clientes cargada",
  },
  {
    fecha: "15 de septiembre",
    tema: "ZOHO",
    actividad: "Segundo envío de la campaña Semana de Receso, con el código de descuento.",
    resultado: "22 aperturas y 1 clic. Frente al primer envío (13 aperturas y 3 clics), la apertura subió y el clic bajó, por lo que se recomendó revisar el llamado a la acción antes del siguiente envío.",
    kpi: "22 aperturas / 1 clic",
  },
  {
    fecha: "21 y 22 de septiembre",
    tema: "ZOHO",
    actividad: "Bloqueos en la integración de WhatsApp y SMS.",
    resultado: "El número asignado por Meta era de prueba, y la cuenta de Facebook de CC KipClin tiene una restricción activa desde el 30 de abril que bloquea integraciones. En Twilio, el cambio de representación legal de Kipclin obliga a esperar el documento actualizado de Cámara de Comercio para retomar la verificación. Se formalizó por correo con César Rueda la solicitud de una línea virtual dedicada para WhatsApp.",
    kpi: "Bloqueos documentados",
  },
  {
    fecha: "28 de septiembre",
    tema: "ZOHO",
    actividad: "Activación de la nueva línea de WhatsApp para Zoho.",
    resultado: "César Rueda confirmó que la nueva línea ya está activa. Con ella se puede retomar la verificación en Meta; Twilio sigue a la espera del documento de representación legal.",
    kpi: "Línea activa",
  },

  // REUNIONES
  {
    fecha: "2 de septiembre",
    tema: "REUNIONES",
    actividad: "Reunión SEO con María 5:30 am",
    resultado: "Segmentación de la base de piscinas, universo de fidelización, carrito abandonado en Zoho, consentimiento para SMS y WhatsApp, y calendario de contenidos de septiembre.",
    kpi: "8 tareas definidas",
  },
  {
    fecha: "9 de septiembre",
    tema: "REUNIONES",
    actividad: "Reunión Mercadeo y Dirección Técnica 8:00 am"
    resultado: "Seguimiento a los hallazgos técnicos enviados a José el 8 de septiembre (errores 4xx y 5xx, URL canónicas huérfanas y datos estructurados) y a la propuesta de ampliación del schema de producto.",
    kpi: "Seguimiento realizado",
  },
  {
    fecha: "11 de septiembre",
    tema: "REUNIONES",
    actividad: "Reunión SEO con María 6:15 am (trasladada del 9 de septiembre)",
    resultado: "Presentación del análisis técnico y de rendimiento del sitio y del plan de acción priorizado.",
    kpi: "Cumplida",
  },
  {
    fecha: "16 de septiembre",
    tema: "REUNIONES",
    actividad: "Reunión SEO con María 5:30 am",
    resultado: "Estado de la campaña Semana de Receso en Zoho, reporte comparativo semanal de SEO, plan de backlinks y campaña de piscinas con Sandra Alarcón.",
    kpi: "Resumen compartido",
  },
  {
    fecha: "23 de septiembre",
    tema: "REUNIONES",
    actividad: "Reunión SEO con María 5:30 am",
    resultado: "Seguimiento de resultados SEO con corte al 21 de septiembre: tráfico, metadescripciones, categorías, posiciones, amonio cuaternario e indexación.",
    kpi: "Resumen compartido",
  },
  {
    fecha: "23 de septiembre",
    tema: "REUNIONES",
    actividad: "Reunión Mercadeo y Dirección Técnica 8:00 am",
    resultado: "Revisión de los casos escalados a José: redirección de las URL antiguas de amonio cuaternario, artículo publicado bajo dos URL y validación de los 275 errores de servidor del incidente de junio.",
    kpi: "Seguimiento realizado",
  },
  {
    fecha: "30 de septiembre",
    tema: "REUNIONES",
    actividad: "Reunión Seguimiento con María 5:30 am",
    resultado: "Reporte mensual y presentación de resultados. Además de pensientes de backlinsk y Zoho.",
    kpi: "Seguimiento realizado",
  },

  // REPORTES
  {
    fecha: "8 al 11 de septiembre",
    tema: "REPORTES",
    actividad: "Informe de análisis técnico y de rendimiento de Kipclin.com",
    resultado: "Documento en Word con hallazgos de Search Console, GA4 y Ahrefs y plan de acción priorizado con responsables.",
    kpi: "Completado",
  },
  {
    fecha: "16 de septiembre",
    tema: "REPORTES",
    actividad: "Reporte comparativo semanal de SEO",
    resultado: "En las dos primeras semanas de septiembre el tráfico subió 23,7%, con mejoras en keywords, artículos del blog y categorías.",
    links: [
      { texto: "Ver reporte comparativo", url: "https://docs.google.com/presentation/d/10JQbSim6WAkxKv-RlMJ9kYwzA9Xqkiqobf6K5rskZBk/edit?usp=sharing" },
    ],
    kpi: "Tráfico +23,7%",
  },
  {
    fecha: "23 de septiembre",
    tema: "REPORTES",
    actividad: "Reporte de avance SEO con corte al 21 de septiembre",
    resultado: "Clics orgánicos estables desde julio (promedio semanal de 1.427 en septiembre), 75% por encima del mínimo de junio. Las impresiones subieron 29%, por lo que el CTR sigue siendo el principal frente de trabajo.",
    kpi: "Completado",
  },
  {
    fecha: "29 de septiembre",
    tema: "REPORTES",
    actividad: "Generación del reporte de actividades de septiembre",
    resultado: "Seguimiento a actividades",
    kpi: "Completado",
  },
];

// ─── Secciones ────────────────────────────────────────────────
// Espacios para imagen: subir los archivos a public/septiembre/
const secciones = [
  { tema: "SEO TÉCNICO",       title: "SEO TÉCNICO",       imagen: "/septiembre/ahrefs.png",  alt: "Captura de Ahrefs, septiembre 2026" },
  { tema: "SEO DE CONTENIDOS", title: "SEO DE CONTENIDOS", imagen: "/septiembre/joomla.png",  alt: "Captura del backend de Joomla con los artículos del blog de septiembre" },
  { tema: "ZOHO",              title: "ZOHO",              imagen: "/septiembre/zoho.png",    alt: "Captura de Zoho Marketing Automation, campaña Semana de Receso" },
  { tema: "REUNIONES",         title: "REUNIONES",         imagen: undefined,                 alt: "" },
  { tema: "REPORTES",          title: "REPORTES",          imagen: undefined,                 alt: "" },
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
  alt,
}: {
  title: string;
  items: ReportItem[];
  imagen?: string;
  alt?: string;
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
            alt={alt || "Imagen " + title}
            style={{ width: "60%", minWidth: "280px", maxWidth: "100%", height: "auto", borderRadius: "6px", display: "block", margin: "0 auto", border: "1px solid #C8DFF0" }}
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
              <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Resultado / Observación</th>
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

// ─── Tarjetas de indicadores destacados ───────────────────────
function Destacados() {
  return (
    <div className="kpi-grid" style={{ marginBottom: "28px" }}>
      {destacados.map((d, i) => (
        <div key={i} style={{
          backgroundColor: "white",
          border: "1px solid #C8DFF0",
          borderTop: "4px solid #20B6EA",
          borderRadius: "8px",
          padding: "14px 16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}>
          <div style={{ fontSize: "26px", fontWeight: "bold", color: "#055DA7", lineHeight: "1.1" }}>{d.valor}</div>
          <div style={{ fontSize: "13px", color: "#374151", marginTop: "6px", lineHeight: "1.4" }}>{d.etiqueta}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────
export default function Page() {
  const exportPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(14);
    doc.text("Reporte Septiembre 2026 | Kipclin", 14, 12);
    autoTable(doc, {
      startY: 18,
      head: [["Fecha", "Tema", "Actividad", "Resultado / Observación", "KPI"]],
      body: data.map((item) => [
        item.fecha,
        item.tema,
        item.actividad,
        item.resultado + (item.links ? " " + item.links.map((l) => l.url).join(" ") : ""),
        item.kpi,
      ]),
      styles: { fontSize: 8, cellPadding: 2, valign: "top" },
      headStyles: { fillColor: [5, 93, 167], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 249, 253] },
      columnStyles: {
        0: { cellWidth: 28 },
        1: { cellWidth: 28 },
        2: { cellWidth: 60 },
        3: { cellWidth: 120 },
        4: { cellWidth: 33 },
      },
    });
    doc.save("Reporte_Septiembre_2026_Kipclin.pdf");
  };

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .hide-on-mobile { display: none !important; }
          .hide-on-desktop { display: block !important; }
          .kpi-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 641px) {
          .hide-on-mobile { display: block !important; }
          .hide-on-desktop { display: none !important; }
        }
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
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
              Reporte Septiembre 2026 | Kipclin
            </h1>
            <p style={{ fontSize: "16px", margin: 0 }}>
              Seguimiento técnico, editorial y de automatización del sitio web. Incluye SEO técnico, SEO de contenidos (blog), Zoho Marketing Automation, reuniones y reportes del mes.
            </p>
          </div>

          <Destacados />

          {secciones.map((s) => (
            <Section
              key={s.tema}
              title={s.title}
              imagen={s.imagen}
              alt={s.alt}
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
