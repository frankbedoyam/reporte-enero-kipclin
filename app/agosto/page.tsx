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
    fecha: "4 de agosto",
    tema: "SEO TÉCNICO",
    actividad: "Alerta en Ahrefs por caída de posiciones de \"Jabón Rey\" (de 4.500 a 800 búsquedas/mes en el término principal).",
    resultado: "Se detectaron 6 URLs distintas sirviendo el mismo producto en GA4. José confirmó que todas comparten la misma URL canonical y que la ruta /sitio/tienda/ corresponde a URLs de pruebas de Joomla que Google tomó por error durante una actualización.",
    kpi: "Diagnóstico confirmado",
  },
  {
    fecha: "5 de agosto",
    tema: "SEO TÉCNICO",
    actividad: "22 productos con alerta de precio en Merchant Center de Google.",
    resultado: "Frank cruzó el precio del feed contra el precio real del sitio, producto por producto, y detectó un patrón: el feed no se había resincronizado tras dos rondas de aumento de precio (13 productos -5%, 6 productos -10%, 3 excepciones puntuales). José confirmó la causa y actualizó el feed el mismo día.",
    kpi: "22 productos corregidos",
  },
  {
    fecha: "12 de agosto",
    tema: "SEO TÉCNICO",
    actividad: "Análisis de categorías y subcategorías: redacción y publicación de 23 páginas de subcategoría (Lavandería, Limpieza y Desinfección, Piscinas, Papeles de Aseo).",
    resultado: "Se redactaron y publicaron: Blanqueadores, Cepillos de Ropa, Detergentes, Quita Manchas y Suavizantes (Lavandería); Refill, Ambientadores y Desinfectantes, Blanqueadores, Desengrasantes, Desinfectantes, Especializados en Superficies, Insecticidas, Lavalozas, Limpia Pisos y Limpia Vidrios (Limpieza y Desinfección); Balance de pH, Clarificadores, Desinfección de Agua y Especializados para Piscina (Piscinas); Servilletas, Limpiones, Papel Higiénico y Toallas de Manos (Papeles de Aseo). Quedó registrado el tráfico base (sesiones ene-ago) de cada una para medir su efecto en los próximos checkpoints.",
    links: [
      { texto: "Ver Cuadro de Seguimiento de Categorías", url: "https://docs.google.com/spreadsheets/d/1TwIzF_zW3eEiTpf37ozb7o8RxmqshGSqc5tEQ6QgUjE/edit?usp=sharing" },
    ],
    kpi: "23 subcategorías publicadas",
  },
  {
    fecha: "17 de agosto",
    tema: "SEO TÉCNICO",
    actividad: "Análisis de categorías y subcategorías: redacción y publicación de 3 páginas de subcategoría (Manejo de Residuos).",
    resultado: "Se redactaron y publicaron Bolsas, Papeleras y Contenedores, y Puntos Ecológicos.",
    kpi: "3 subcategorías publicadas",
  },
  {
    fecha: "18 de agosto",
    tema: "SEO TÉCNICO",
    actividad: "Datos estructurados de Fichas de comerciantes: falta el campo \"price\" en offers.",
    resultado: "Search Console notificó 5 páginas afectadas desde el 11 de agosto. José corrigió el mismo día en que se le reportó.",
    kpi: "5 páginas corregidas",
  },
  {
    fecha: "18 de agosto",
    tema: "SEO TÉCNICO",
    actividad: "Análisis de categorías y subcategorías: redacción y publicación de 20 páginas de subcategoría (Implementos, Aseo Personal, Bioseguridad).",
    resultado: "Se redactaron y publicaron: Achicadores, Mopas y Haraganes, Baldes y Carros de Limpieza, Cepillos/Rastrillos/Carreteros, Escobas y Recogedores, Esponjas y Paños, Espumadores y Aspersores, Traperos y Otros Implementos (Implementos); Antibacteriales y Jabones de Manos (Aseo Personal); Alcoholes, Antibacteriales, Desinfectantes, Gafas y Visores, Gorros, Guantes, Señalización, Tapabocas, Tapetes de Desinfección y Termómetros (Bioseguridad). Mientras se trabajaban estos textos surgió la duda sobre URLs duplicadas por producto que se resolvió al día siguiente con José.",
    kpi: "20 subcategorías publicadas",
  },
  {
    fecha: "19 de agosto",
    tema: "SEO TÉCNICO",
    actividad: "Duda sobre URLs duplicadas de productos en varias subcategorías (Implementos, Aseo Personal, Bioseguridad).",
    resultado: "José confirmó que, aunque un producto puede tener varias URLs según la subcategoría desde la que se accede, siempre existe una única URL canonical configurada; no genera contenido duplicado para Google.",
    kpi: "Comportamiento validado",
  },
  {
    fecha: "19 de agosto",
    tema: "SEO TÉCNICO",
    actividad: "Hallazgo de 1,5M de URLs en estado 404 en Search Console.",
    resultado: "Se identificó que es la cola residual del cloaking del plugin plg_system_tiendas (detectado y desactivado en junio). Frank propuso 4 soluciones (pasar de 404 a 410, bloquear el patrón, limpiar el sitemap, confirmar eliminación del plugin). José aclaró que el plugin es un desarrollo interno necesario para la operación de Bogotá y pidió no desactivarlo.",
    kpi: "1.503.372 URLs en 404 identificadas",
  },
  {
    fecha: "19 de agosto",
    tema: "SEO TÉCNICO",
    actividad: "Verificación en GSC Inspector de las subcategorías redactadas en el mes.",
    resultado: "Se confirmó un caso real de contenido duplicado entre dos subcategorías (no solo URLs de producto): Blanqueadores de Lavandería y Blanqueadores de Limpieza y Desinfección — Google consolidó la indexación bajo la de Lavandería como canónica; queda pendiente diferenciar el texto/listado de productos entre ambas o decidir cuál debe existir. Por otro lado, Desinfectantes (Limpieza y Desinfección) y Termómetros (Bioseguridad) se confirmaron correctamente indexados, con 0 impresiones aún por ser publicaciones muy recientes; se hará seguimiento en el próximo checkpoint.",
    kpi: "1 duplicado real detectado, pendiente de resolver",
  },
  {
    fecha: "20 de agosto",
    tema: "SEO TÉCNICO",
    actividad: "Search Console valida la corrección de Datos estructurados de Fichas de comerciantes.",
    resultado: "Google confirmó que la corrección quedó resuelta correctamente.",
    kpi: "Problema resuelto",
  },
  {
    fecha: "23-24 de agosto",
    tema: "SEO TÉCNICO",
    actividad: "Search Console reporta fallos parciales en la validación de indexación de páginas y nuevos motivos de bloqueo.",
    resultado: "Se identificaron nuevos motivos que impiden la indexación (acceso bloqueado); queda pendiente de revisión técnica con José.",
    kpi: "Hallazgos documentados",
  },
  {
    fecha: "25 de agosto",
    tema: "SEO TÉCNICO",
    actividad: "Análisis de keywords en Ahrefs (proyecto Rank Tracker, 716 keywords) para definir el artículo pilar del mes.",
    resultado: "Se evaluaron 3 candidatos (papel higiénico, desinfectantes, productos de aseo) y se eligió \"productos de aseo\" (1.500-1.600 búsquedas/mes, sin cobertura previa) como keyword cabeza de un contenido pilar que enlaza las 8 categorías del catálogo. También se definió el estándar de estructura para todos los artículos del blog (índice, H2/H3, tabla, FAQ, CTA, colores corporativos).",
    kpi: "Keyword pilar seleccionada",
  },

  // BLOG
  {
    fecha: "31 de julio",
    tema: "BLOG",
    actividad: "Feria de las Flores 2026: el aliado de aseo para brillar en la fiesta más grande",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H2, módulo de productos",
    kpi: "407 hits (Joomla)",
  },
  {
    fecha: "4 de agosto",
    tema: "BLOG",
    actividad: "Una desinfección impecable con amonio cuaternario o ácido peracético",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H2, módulo de productos",
    kpi: "303 hits (Joomla)",
  },
  {
    fecha: "5 de agosto",
    tema: "BLOG",
    actividad: "Piscina lista para el calor: lo que no puede faltar en Medellín y el Occidente antioqueño",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H2, módulo de productos",
    kpi: "342 hits (Joomla)",
  },
  {
    fecha: "7 de agosto",
    tema: "BLOG",
    actividad: "Kit de derrames: qué contiene y cómo usarlo correctamente",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H2, módulo de productos",
    kpi: "778 hits (Joomla)",
  },
  {
    fecha: "10 de agosto",
    tema: "BLOG",
    actividad: "Guantes de seguridad: cómo elegir el correcto según el tipo de trabajo",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H2, módulo de productos",
    kpi: "585 hits (Joomla)",
  },
  {
    fecha: "11 de agosto",
    tema: "BLOG",
    actividad: "Cómo elegir el dispensador de papel higiénico correcto para tu negocio",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H2, módulo de productos",
    kpi: "328 hits (Joomla)",
  },
  {
    fecha: "16 de agosto",
    tema: "BLOG",
    actividad: "Papeleras para tu negocio: cómo elegir la correcta según el tipo de residuo",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H2, módulo de productos",
    kpi: "199 hits (Joomla)",
  },
  {
    fecha: "18 de agosto",
    tema: "BLOG",
    actividad: "Fenómeno del Niño en Colombia: cómo ahorrar agua en casa y en tu negocio",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H2, módulo de productos",
    kpi: "241 hits (Joomla)",
  },
  {
    fecha: "20 de agosto",
    tema: "BLOG",
    actividad: "Qué es el sistema Refill y cómo te puede servir en tu casa o negocio",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H2, módulo de productos",
    kpi: "210 hits (Joomla)",
  },
  {
    fecha: "25 de agosto",
    tema: "BLOG",
    actividad: "Productos de aseo para tu negocio: la guía de abastecimiento antes de cerrar el mes",
    resultado: "Artículo publicado con imágenes con ALT, keywords, links a productos, interlinking, H1, H2, módulo de productos",
    kpi: "115 hits (Joomla)",
  },

  // ZOHO
  {
    fecha: "4 de agosto",
    tema: "ZOHO",
    actividad: "Reporte de avance: Campaña Feria de las Flores (mailing Zoho).",
    resultado: "Corte al 4 de agosto, 4 de 6 envíos realizados: 1.808 correos enviados, 1.754 entregados (97%), 3,6% de apertura y 0,2% de clics. Se detectaron 6 rebotes duros en Hoteles y 0 clics en el envío de Hoteles del 3 de agosto. Recomendaciones: depurar rebotes, evitar lanzar campañas en viernes, faltan el recordatorio (9 de agosto) y el cierre (15 de agosto).",
    kpi: "1.808 envíos / 3,6% apertura",
  },
  {
    fecha: "18 de agosto",
    tema: "ZOHO",
    actividad: "Solicitud de BD de Piscinas para la campaña de Semana de Receso de octubre.",
    resultado: "Frank pidió a José extraer de VirtueMart el listado de clientes que compraron productos de piscina (cloro, alguicidas, clarificador, kit de pH) con los campos necesarios para cruzarlos con Zoho MA.",
    kpi: "Solicitud enviada",
  },
  {
    fecha: "19 de agosto",
    tema: "ZOHO",
    actividad: "Reunión con María: campaña de receso de octubre, journey multicanal y migración a Zoho.",
    resultado: "Se definió el journey para hoteles, conjuntos y compradores de piscina (se excluyen restaurantes), con descuentos limitados al 10%. Queda pendiente el costo de migrar el correo de carrito abandonado a Zoho, a consultar con Tita.",
    links: [
      { texto: "Ver Cuadro de Seguimiento de Categorías", url: "https://docs.google.com/spreadsheets/d/1TwIzF_zW3eEiTpf37ozb7o8RxmqshGSqc5tEQ6QgUjE/edit?usp=sharing" },
    ],
    kpi: "Journey y campaña aprobados",
  },
  {
    fecha: "26 de agosto",
    tema: "ZOHO",
    actividad: "María comparte la primera propuesta de copies (\"Copies piscinas\") para la campaña.",
    resultado: "Quedan pendientes de definir buenas prácticas de imágenes y longitud de textos para WhatsApp y SMS antes de trabajarlo con Sara y Armando.",
    kpi: "Primera propuesta de copies compartida",
  },
  {
    fecha: "26-27 de agosto",
    tema: "ZOHO",
    actividad: "José entrega las bases de datos de \"compras frecuentes\" y \"piscinas\".",
    resultado: "Segmentos de clientes que compraron en los últimos 12 y 6 meses respectivamente, excluyendo clientes con vendedor asignado; insumo para segmentar la campaña de receso de octubre en Zoho.",
    kpi: "2 bases de datos entregadas",
  },

  // REUNIONES
  {
    fecha: "6 de agosto",
    tema: "REUNIONES",
    actividad: "Reunión SEO con María 5:30 am",
    resultado: "Reuniones semanales",
    kpi: "Cumplida",
  },
  {
    fecha: "13 de agosto",
    tema: "REUNIONES",
    actividad: "Reunión SEO con María 5:30 am",
    resultado: "Reuniones semanales",
    kpi: "Cumplida",
  },
  {
    fecha: "19 de agosto",
    tema: "REUNIONES",
    actividad: "Reunión con María 5:30 am",
    resultado: "Revisión de la campaña de receso de octubre, SEO y migración de automatizaciones a Zoho; se definieron 7 puntos de acción.",
    kpi: "Resumen y tareas compartidos",
  },
  {
    fecha: "19 de agosto",
    tema: "REUNIONES",
    actividad: "Reunión técnica (Mercadeo) con José 8:30 am",
    resultado: "Seguimiento a los hallazgos de Search Console: URLs en 404, datos estructurados y URLs duplicadas por subcategoría.",
    kpi: "Seguimiento realizado",
  },
   {
    fecha: "26 de agosto",
    tema: "REUNIONES",
    actividad: "Reunión con María 5:30 am",
    resultado: "Campaña de receso de octubre, SEO y migración de automatizaciones a Zoho; revisión de copies e imágenes.",
    kpi: "Seguimiento realizado"
  },
   {
    fecha: "26 de agosto",
    tema: "REUNIONES",
    actividad: "Reunión técnica con José 8:30 am",
    resultado: "Hablamos de las bases se datos, qué deben tener, cómo se van a usar y cómo se van a cruzar con Zoho; revisión de hallazgos de Search Console.",
    kpi: "Seguimiento realizado"
  },

  // REPORTES
  
  {
    fecha: "31 de agosto",
    tema: "REPORTES",
    actividad: "Generación reporte de actividades de agosto",
    resultado: "Seguimiento a actividades",
    kpi: "Completado",
  },
];

// ─── Secciones ────────────────────────────────────────────────
const secciones = [
  { tema: "SEO TÉCNICO",  title: "SEO TÉCNICO",  imagen: "/agosto/seo-tecnico.png" },
  { tema: "BLOG",         title: "BLOG",         imagen: "/agosto/blog.png" },
  { tema: "ZOHO",         title: "ZOHO",         imagen: "/agosto/zoho.png" },
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
    doc.text("Reporte Agosto 2026 - Kipclin", 14, 10);
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
    doc.save("Reporte_Agosto_2026_Kipclin.pdf");
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
              Reporte Agosto 2026 - Kipclin
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
