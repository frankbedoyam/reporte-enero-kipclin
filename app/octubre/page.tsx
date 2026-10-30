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
  { valor: "2.111", etiqueta: "hits acumulados en Joomla (corte 30 oct)" },
  { valor: "80", etiqueta: "fichas de producto renovadas (20 más listas para cargar)" },
  { valor: "1.474 → 1.958", etiqueta: "tráfico orgánico estimado en Ahrefs (4 al 26 oct, +33%)" },
  { valor: "164 → 200", etiqueta: "keywords en el top 3 de Google (19 al 26 oct)" },
  { valor: "94", etiqueta: "puntaje de salud del sitio (87 el día de la caída)" },
  { valor: "12,7%", etiqueta: "de las impresiones en Google ya ocurren dentro de respuestas de IA" },
  { valor: "22%", etiqueta: "de clics en el WhatsApp de Semana de Receso (16 de 74 entregados)" },
  { valor: "7", etiqueta: "automatizaciones diseñadas en Zoho (correo y WhatsApp)" },
];

// ─── Datos ────────────────────────────────────────────────────
const data: ReportItem[] = [

  // SEO TÉCNICO
  {
    fecha: "8 y 9 de octubre",
    tema: "SEO TÉCNICO",
    actividad: "Caída del sitio del 8 de octubre: diagnóstico, informe a Mercadeo, María y Tita, y pausa en los cambios de contenido de producto.",
    resultado: "Ahrefs alertó la caída del puntaje de salud de 93 a 87. El sitio respondió error 500 en 154 páginas entre las 5:34 am y las 8:07 am, por cambios técnicos que José estaba haciendo y que repuso el mismo día. Se pausaron los cambios en las fichas de producto hasta que el sitio estuviera estable, para no perder trabajo ni mezclar los efectos de la caída con los de la renovación al medir resultados.",
    kpi: "Sitio repuesto el 13 oct",
  },
  {
    fecha: "13 de octubre",
    tema: "SEO TÉCNICO",
    actividad: "Verificación de la recuperación del sitio y de las posiciones en Google.",
    resultado: "El puntaje de salud volvió a 93, sin páginas con error 500, y el tráfico orgánico estimado subió de 1.474 a 1.519 visitas mensuales. 41 búsquedas con 40 o más consultas al mes entraron al top 10 o subieron dentro de él, entre ellas frotex (de sin posición a 6), sulfato de aluminio (24 a 8), qué es lejía (4 a 1), productos de limpieza (18 a 1) y jabón líquido para ropa (27 a 2). Se retomó la renovación de fichas.",
    kpi: "41 keywords ganan top 10",
  },
  {
    fecha: "13 al 16 de octubre",
    tema: "SEO TÉCNICO",
    actividad: "Solicitud a José de ajustes señalados por Ahrefs Site Audit, con el listado de URL en Google Sheets.",
    resultado: "Regenerar el sitemap (1.170 URL, sin actualizar desde finales de septiembre y con 49 páginas indexables por fuera, entre ellas 7 artículos del blog), quitar la indexación de la página de restablecer contraseña, corregir la canónica del guante mosquetero y enlazar las URL canónicas huérfanas, que pasaron de 17 a 79. José aplicó los cambios, actualizó las fechas del sitemap y pasó la respuesta 410 de Joomla al servidor Nginx. Google leyó el nuevo sitemap el 24 de octubre sin errores.",
    kpi: "Sitemap 1.170 → 1.192 URL",
  },
  {
    fecha: "14 y 15 de octubre",
    tema: "SEO TÉCNICO",
    actividad: "Propuesta para depurar las URL basura del ataque de junio que Search Console reporta como 404.",
    resultado: "Tras revisar el tema con Tita, se propuso a José responder 410 por patrón, no bloquear esas URL en robots.txt para que Google alcance a ver el 410, y subir a la herramienta de desautorización de Google un archivo con 2.616 dominios basura, dejando por fuera los enlaces legítimos. José confirmó que las URL ya respondían 410 y subió el archivo. Se compartió el proceso con María y Mercadeo.",
    kpi: "2.616 dominios desautorizados",
  },
  {
    fecha: "22 de octubre",
    tema: "SEO TÉCNICO",
    actividad: "Revisión de la validación del motivo 404 que Search Console marcó como fallida, y nuevas solicitudes a José.",
    resultado: "La validación falla por diseño: las URL de spam deben seguir respondiendo 404 o 410, así que no indica un problema nuevo ni afecta el posicionamiento. Se pidieron redirecciones 301 para refills, rastrillos y carreteros y el artículo de juntas con tilde en la URL; 410 para el nuevo patrón de spam de video falso; resolver carros de limpieza y el artículo de productos sin IVA, y verificar un archivo interno. José confirmó los cambios el mismo día.",
    kpi: "5 solicitudes atendidas",
  },
  {
    fecha: "26 de octubre",
    tema: "SEO TÉCNICO",
    actividad: "Verificación de las correcciones del área técnica con Ahrefs y la inspección de URL de Search Console.",
    resultado: "Verificadas: redirecciones 301 del amonio cuaternario, URL con texto de plantilla, archivo interno cerrado. Pendiente: el artículo de productos sin IVA sigue respondiendo 404 y Google lo mantiene indexado. Por confirmar, porque Google no las ha vuelto a rastrear: refills, rastrillos y carreteros, carros de limpieza. Páginas con error 4xx: de 12 (13 oct) a 7, todas sin enlaces internos. Se dejó listo el correo de seguimiento a José con 7 puntos.",
    kpi: "4xx: 12 → 7",
  },

  // FICHAS DE PRODUCTO
  {
    fecha: "5 y 6 de octubre",
    tema: "FICHAS DE PRODUCTO",
    actividad: "Piloto de renovación de 10 fichas de producto, segmentadas por tráfico orgánico (poco, regular y bueno).",
    resultado: "Se definió el estándar de ficha: apertura de uno o dos párrafos, tabla de datos clave, preguntas frecuentes en acordeón basadas en lo que la gente pregunta en Google y en la IA, y enlaces internos verificados. Los datos que la ficha original no trae se marcan como pendientes y no se inventan. Se eligieron fichas como Kit de derrames (2.700 búsquedas), Wypall (2.800), Sulfato de aluminio 2 kg (1.500) y Crema Frotex (1.500).",
    kpi: "10 fichas publicadas",
  },
  {
    fecha: "6 de octubre",
    tema: "FICHAS DE PRODUCTO",
    actividad: "Lote 2: 10 fichas de 10 categorías distintas (4 de poco tráfico, 3 regulares y 3 de buen tráfico).",
    resultado: "Incluyó Jabón Rey (2.900 búsquedas), Sulfato de aluminio 25 kg, Bolsa negra 65 x 90, Fin Orín Binner y Quitagrasa 123. Se aplicaron los aprendizajes del piloto: borrar el texto anterior antes de pegar, verificar el título de página y revisar en ventana de incógnito por la caché. Se usaron también las fichas técnicas en PDF del sitio como fuente de datos.",
    kpi: "20 fichas renovadas",
  },
  {
    fecha: "13 de octubre",
    tema: "FICHAS DE PRODUCTO",
    actividad: "Primera medición de las 20 fichas renovadas en Ahrefs.",
    resultado: "Los títulos nuevos quedaron aplicados en las 15 fichas que los llevaban. Primeras mejoras: Vaso medidor de 5 a 12 visitas estimadas, Sulfato 2 kg entra en posición 10 para \"sulfato de aluminio piscina\" y Jabón Rey aparece en posición 9 para \"para qué sirve el jabón rey\", donde antes no figuraba.",
    kpi: "Títulos aplicados 15 de 15",
  },
  {
    fecha: "19 de octubre",
    tema: "FICHAS DE PRODUCTO",
    actividad: "Lotes 3, 4 y 5: 30 fichas de poco tráfico, redactadas, cargadas en VirtueMart y verificadas el mismo día.",
    resultado: "Selección por volumen de búsqueda y cercanía a la primera página (rojo fenol, guantes azules, lavaloza en crema, cepillo de piso, kit de pH y cloro, entre otras). Se verificaron los 66 enlaces internos en Ahrefs. Se documentaron contradicciones en las fichas publicadas (por ejemplo, guantes que dicen resistir aceites mientras sus precauciones lo prohíben) para corregir en el catálogo.",
    kpi: "50 fichas renovadas",
  },
  {
    fecha: "19 y 20 de octubre",
    tema: "FICHAS DE PRODUCTO",
    actividad: "Segunda medición de las 20 primeras fichas (Ahrefs, 4 frente a 19 y 20 de octubre).",
    resultado: "El tráfico estimado de las 20 fichas subió de 150 a 168 visitas mensuales (+12%). Fin Orín pasó de 10 a 36 visitas y de la posición 7 a la 3 para \"fin orin\" (400 búsquedas), ahora con la ficha y no con el PDF. La Bolsa negra 65 x 90 llegó a la posición 1 para \"bolsas negras\". Poopi entró en posición 2 para \"gotas poopi\", la misma pregunta que se agregó a la ficha.",
    kpi: "Tráfico de las fichas +12%",
  },
  {
    fecha: "20 al 24 de octubre",
    tema: "FICHAS DE PRODUCTO",
    actividad: "Lotes 6, 7 y 8: 30 fichas, cargadas en VirtueMart el 24 de octubre.",
    resultado: "19 fichas que ya posicionaban con poco tráfico y 11 sin posición que apuntan a búsquedas de alto volumen: atomizador (5.500), alcohol antiséptico (5.300), haragán (2.800), baldes (1.600) y Dr. Beckmann (450), entre otras. En la verificación, 25 quedaron completas y 5 con correcciones menores pendientes. Medición programada para el 9 de noviembre, con grupo de control.",
    kpi: "80 fichas renovadas",
  },
  {
    fecha: "27 de octubre",
    tema: "FICHAS DE PRODUCTO",
    actividad: "Lote 9: 20 fichas mixtas (12 de tráfico regular y 8 sin tráfico), redactadas y listas para cargar.",
    resultado: "Incluye Alguicida PQP, Alcohol glicerinado (800 búsquedas, posición 1), Clarificador PQP y Limpiahornos Frotex, más fichas sin posición con búsquedas de alto volumen como difusor de aromas (2.600), limpiavidrios (800) y lana de acero (250). Mediciones programadas para el 10 y el 24 de noviembre.",
    kpi: "20 fichas listas",
  },

  // SEO DE CONTENIDOS (BLOG)
  {
    fecha: "1 de octubre",
    tema: "SEO DE CONTENIDOS",
    actividad: "Sales de viaje en la semana de receso: checklist para dejar tu casa limpia, segura y sin malos olores",
    resultado: "Artículo de la campaña Semana de Receso, con enfoque en la casa sola diez días (nevera, sifones, basuras, humedad) y la rutina al volver. Keyword: semana receso octubre 2026 (1.000 búsquedas/mes). Publicado con la estructura estándar del blog: índice, tabla, preguntas frecuentes, enlaces a producto y módulo de productos",
    kpi: "247 hits (Joomla)",
  },
  {
    fecha: "2 de octubre",
    tema: "SEO DE CONTENIDOS",
    actividad: "Día del Odontólogo: guía de bioseguridad y desinfección para consultorios odontológicos",
    resultado: "Artículo dirigido a consultorios, publicado en la categoría Bioseguridad del blog, con productos de bioseguridad y desinfección enlazados. Keyword: dia del odontologo (1.100 búsquedas/mes)",
    kpi: "279 hits (Joomla)",
  },
  {
    fecha: "4 de octubre",
    tema: "SEO DE CONTENIDOS",
    actividad: "Día del Mesero: por qué tus meseros son la clave del ahorro, la limpieza y la buena imagen de tu negocio",
    resultado: "Artículo B2B para dueños de restaurantes, cafés y bares, sobre el papel del mesero en el uso de servilletas, papel y aseo, y en la capacitación del equipo. Keyword: funciones de un mesero (300 búsquedas/mes)",
    kpi: "191 hits (Joomla)",
  },
  {
    fecha: "6 de octubre",
    tema: "SEO DE CONTENIDOS",
    actividad: "Cómo manejar los residuos de tu negocio durante la semana de receso",
    resultado: "Artículo para fincas, hoteles y restaurantes de unas 2.640 palabras, con 2 tablas, 5 preguntas frecuentes y 26 enlaces internos. Se evitó repetir el código de colores de los cuatro artículos que ya existen sobre canecas, enlazándolos. Keyword: manejo de residuos (1.000 búsquedas/mes)",
    kpi: "230 hits (Joomla)",
  },
  {
    fecha: "13 de octubre",
    tema: "SEO DE CONTENIDOS",
    actividad: "La piscina quedó turbia: cómo recuperarla con sulfato de aluminio",
    resultado: "Artículo con diagnóstico por color del agua, dosis por volumen según la ficha técnica de PQP y 3 tablas. Confirmó que existen tres presentaciones de sulfato de aluminio (2, 5 y 25 kg), dato que estaba pendiente desde septiembre. Keyword: sulfato de aluminio (1.300 búsquedas/mes)",
    kpi: "320 hits (Joomla)",
  },
  {
    fecha: "15 de octubre",
    tema: "SEO DE CONTENIDOS",
    actividad: "Crema Frotex: para qué sirve, cómo usarla y en qué superficies no aplicarla",
    resultado: "Artículo sobre la keyword de mayor volumen del calendario de octubre (frotex, 7.400 búsquedas/mes), con usos en baño, cocina, nevera, puertas y ventanas, y enlaces a las presentaciones de la crema",
    kpi: "318 hits (Joomla)",
  },
  {
    fecha: "19 de octubre",
    tema: "SEO DE CONTENIDOS",
    actividad: "¡Feliz día chefs! y gracias por cocinar esas delicias con bioseguridad",
    resultado: "Artículo del Día del Chef, con una guía de limpieza para restaurantes, cafés y panaderías y desengrasantes enlazados. Keyword: desengrasante industrial (1.500 búsquedas/mes)",
    kpi: "106 hits (Joomla)",
  },
  {
    fecha: "22 de octubre",
    tema: "SEO DE CONTENIDOS",
    actividad: "Cómo limpiar muebles de tela y alfombras: ¿shampoo o espuma?",
    resultado: "Artículo adicional al calendario, apoyado en las fichas renovadas del Shampoo Relax y del limpiador de tapicería en espuma Binner. Es el artículo con más hits del mes",
    kpi: "385 hits (Joomla)",
  },
  {
    fecha: "26 de octubre",
    tema: "SEO DE CONTENIDOS",
    actividad: "Detergente en polvo o líquido: cuál usar para lavar disfraces y dejar impecable el uniforme después de Halloween",
    resultado: "Artículo que une dos temas del calendario (detergentes y ropa después de la fiesta de disfraces) en un solo contenido de temporada. Keyword: detergente liquido (1.700 búsquedas/mes)",
    kpi: "15 hits (Joomla, recién publicado)",
  },
  {
    fecha: "28 de octubre",
    tema: "SEO DE CONTENIDOS",
    actividad: "Día del Ahorro: toallas de papel y otras formas de gastar menos en tu negocio",
    resultado: "Artículo publicado antes del Día del Ahorro (31 de octubre) en la categoría Cuidado del medio ambiente del blog, sobre consumo de agua, detergente, jabón y toallas de papel. Keyword: dispensador de toallas de papel (400 búsquedas/mes)",
    kpi: "20 hits (Joomla, recién publicado)",
  },
  {
    fecha: "29 de octubre",
    tema: "SEO DE CONTENIDOS",
    actividad: "Investigación de búsquedas en Google para la producción e inspiración de contenidos en redes sociales, a solicitud de María (solicitada y entregada el mismo día).",
    resultado: "Se revisaron cerca de 260 búsquedas en Ahrefs (Colombia): las que hoy llevan tráfico a Kipclin y las del catálogo que aún no se aprovechan. El documento reúne las 20 búsquedas de mayor volumen (guantes de nitrilo 23.000 y balde 10.000 encabezan la lista y Kipclin no aparece en ninguna), las búsquedas por categoría con su página de destino para el enlace en la biografía o en historias, 19 preguntas que la gente hace (cómo blanquear la ropa blanca 1.300, cómo quitar la grasa de la ropa 800), las marcas que se buscan por nombre (Frotex 7.400, Task 2.000) y cinco pilares de contenido con ejemplos de gancho: La mancha de la semana, Química sin miedo, La herramienta correcta, Negocio impecable y Marcas que ya conoces.",
    links: [
      { texto: "Ver documento: Búsquedas para redes Kipclin", url: "https://docs.google.com/document/d/1FRt3QZvPmOxoitOku2aCXaiX2ljmJVh9aDm5PY1r_TI/edit?usp=drive_link" },
    ],
    kpi: "5 pilares para redes",
  },
  {
    fecha: "29 y 30 de octubre",
    tema: "SEO DE CONTENIDOS",
    actividad: "Planeación de los artículos de noviembre: investigación, presentación y ajustes con datos de Ahrefs, GA4 y Search Console.",
    resultado: "Calendario de 10 artículos los martes y jueves, más tres fechas especiales (30 de octubre, 6 y 11 de noviembre), con el jueves 19 libre para actualizaciones. Se contrastaron 15 fechas Fenalco con su búsqueda real (Viernes Negro 15.237 en noviembre de 2025, Día del Administrador de Empresas 8.308, Día del Psicólogo 6.110) y se aprovechan los puentes festivos para piscinas y turismo. Las decisiones se apoyan en GA4 (transacciones, unidades y páginas orgánicas de octubre a diciembre de 2025) y en Search Console (noviembre frente a octubre de 2025). Guantes de nitrilo (23.000 búsquedas, dificultad 0) es la keyword de mayor volumen del análisis. Se priorizaron además 6 artículos existentes para actualizar, entre ellos hipoclorito, cloro y lejía, la mayor oportunidad de CTR del sitio.",
    links: [
      { texto: "Ver calendario de contenidos de noviembre", url: "https://docs.google.com/spreadsheets/d/1CyQrZLN1j3DKxgAoB9G8QZrhf5Mj5Xx_9cOZqjSKrH8/edit?usp=sharing" },
      { texto: "Reporte de Search Console: rendimiento en búsqueda", url: "https://docs.google.com/spreadsheets/d/1_Boe5I55UFU5FBtwzKQu6p7LDpazP5BvxunEH3uI--E/edit?usp=drive_link" },
      { texto: "Reporte de GA4: productos", url: "https://docs.google.com/spreadsheets/d/1BMidDSCHmz7pSqidq75J7sGbzidgbTSRaDK48v12l-w/edit?usp=drive_link" },
      { texto: "Reporte de GA4: páginas orgánicas", url: "https://docs.google.com/spreadsheets/d/1o_sy7IQVBKdWu9lFD6Nn7c3r6Rva5-Ov9ESnH_2DDiY/edit?usp=drive_link" },
    ],
    kpi: "10 artículos planeados",
  },

  // GERENCIA
  {
    fecha: "14 de octubre",
    tema: "GERENCIA",
    actividad: "Dos reuniones con Tita (8:00 am y 11:45 am, 1 hora cada una) para preparar la presentación de un año de resultados SEO.",
    resultado: "Barrido de todo el año: indicadores, logros, incidentes técnicos y pendientes. De esta revisión salió también la propuesta para depurar las URL basura del ataque de junio.",
    kpi: "2 horas",
  },
  {
    fecha: "14 y 15 de octubre",
    tema: "GERENCIA",
    actividad: "Presentación \"SEO Kipclin: un año de resultados\" para Gerencia (septiembre 2025 a octubre 2026).",
    resultado: "19 diapositivas con datos de Search Console, Ahrefs, GA4 y Core Web Vitals: la posición media en Google pasó de 10,4 a 7,8, las keywords en posiciones 4 a 10 crecieron 55% y las keywords del blog en el top 10 casi se duplicaron (431 a 846). Incluye 923 correcciones de metadatos de producto, 46 subcategorías reescritas, la comparación de citas en IA frente a 6 competidores, una diapositiva de lo que no se presenta como logro y el plan 2027. María la aprobó y sugirió agregar lo que se necesita de Gerencia para seguir mejorando.",
    kpi: "19 diapositivas",
  },
  {
    fecha: "21 de octubre",
    tema: "GERENCIA",
    actividad: "Reunión con Tita (5:30 am, 1 hora) para definir el cuadro de cifras mes a mes.",
    resultado: "Se acordaron las fuentes y los indicadores del cuadro de respaldo de la presentación.",
    kpi: "1 hora",
  },
  {
    fecha: "21 al 26 de octubre",
    tema: "GERENCIA",
    actividad: "Cuadro de cifras mes a mes en Excel, de septiembre de 2025 a octubre de 2026.",
    resultado: "11 hojas con datos, fórmulas y gráficos: Search Console, Ahrefs, keywords del blog, publicaciones del blog (60 artículos), canales de GA4, categorías, salud técnica, Core Web Vitals y búsquedas de marca. El 26 de octubre se agregó la participación del orgánico en las ventas web (GA4): bajó de 21% en septiembre de 2025 a 3,2% en agosto de 2026 y se recuperó a 9,0% en septiembre, cifra que coincide con la reportada por Sandra (+176% de agosto a septiembre). Meta 2027 propuesta: 15%.",
    kpi: "11 hojas de cifras",
  },

  // SEGUIMIENTO Y MEDICIÓN
  {
    fecha: "12 de octubre",
    tema: "SEGUIMIENTO Y MEDICIÓN",
    actividad: "Depuración del Rank Tracker de Ahrefs y puesta en marcha de Brand Radar (visibilidad en asistentes de IA).",
    resultado: "El Rank Tracker usaba 716 de 750 cupos con solo 375 palabras distintas, porque 341 estaban duplicadas entre Colombia y Medellín. La propuesta deja 358 palabras en seguimiento y libera 392 cupos. En Brand Radar se configuraron 35 preguntas de compra de aseo en Colombia, con medición mensual en ChatGPT, Copilot, Perplexity y Google AI Overviews.",
    kpi: "392 cupos liberados",
  },
  {
    fecha: "20 de octubre",
    tema: "SEGUIMIENTO Y MEDICIÓN",
    actividad: "Revisión de la cobertura en Search Console (errores de servidor, noindex, robots.txt y 404).",
    resultado: "Errores 5xx: 275 URL, de las cuales 271 son spam de junio y solo 2 son páginas reales. Páginas con noindex: 8.409, en su mayoría ordenamientos y paginación de VirtueMart, de forma intencional. URL 404: 1,5 millones, estables; el crecimiento se frenó de 9.064 nuevas (julio a agosto) a 1.984 (agosto a octubre). Se detectó un nuevo patrón de spam con URL de video falso.",
    kpi: "Crecimiento 404 frenado",
  },
  {
    fecha: "26 de octubre",
    tema: "SEGUIMIENTO Y MEDICIÓN",
    actividad: "Cierre técnico del mes en Ahrefs (Site Explorer y Site Audit).",
    resultado: "Del 19 al 26 de octubre el tráfico orgánico estimado subió de 1.681 a 1.958 visitas (+16%), las keywords de 746 a 789 y las del top 3 de 164 a 200. Puntaje de salud 94 y URL con errores de 339 (13 oct) a 312. Impulsores: el artículo de bioseguridad (\"bioseguridad\" de la posición 10 a la 4), la subcategoría Detergentes y la ficha técnica del amonio cuaternario.",
    kpi: "Top 3: 164 → 200",
  },
  {
    fecha: "26 de octubre",
    tema: "SEGUIMIENTO Y MEDICIÓN",
    actividad: "Rendimiento en Search Console y estreno del reporte de IA generativa de Google.",
    resultado: "Últimos 28 días: 5.139 clics, 594.550 impresiones, CTR de 0,86% (0,79% en septiembre) y posición media de 7,8. Las fichas de comerciante tienen un CTR de 18,3% frente a 1,69% de los fragmentos de producto, lo que respalda la ampliación del schema. En 3 meses, Kipclin tuvo 265.305 impresiones dentro de AI Overviews y AI Mode, el 12,7% del total, concentradas en las páginas informativas con menor CTR (suavizante, metros cúbicos de piscina, aclarar el agua, escobas).",
    kpi: "CTR 0,79% → 0,86%",
  },
  {
    fecha: "26 de octubre",
    tema: "SEGUIMIENTO Y MEDICIÓN",
    actividad: "Primera medición mensual de Brand Radar (35 preguntas de compra en Colombia).",
    resultado: "Menciones de Kipclin: Google AI Overviews 13, ChatGPT 7, Copilot 5 y Perplexity 0. La página de inicio es la fuente más citada (14 respuestas). Los asistentes citan como alternativa a otros distribuidores de aseo (La Voladora, Maxxiclean, Varquímica, Novaseo, Esmero) que no estaban en la lista de competidores configurada, por lo que se ajustará para que la comparación sea válida desde noviembre.",
    kpi: "25 menciones en IA",
  },

  // ZOHO Y CAMPAÑAS
  {
    fecha: "1 de octubre",
    tema: "ZOHO",
    actividad: "Campaña Semana de Receso por correo: reenvío del segundo envío con un asunto nuevo (\"Últimos días para aprovechar tu descuento\").",
    resultado: "Descuento en toda la categoría Piscinas hasta el 15 de octubre, con enlaces etiquetados para medir el tráfico desde Zoho. Logró 32 aperturas y ningún clic, frente a 24 aperturas y 2 clics del envío del 15 de septiembre: el cambio de asunto subió la apertura pero no mejoró los clics.",
    kpi: "32 aperturas / 0 clics",
  },
  {
    fecha: "1 y 7 de octubre",
    tema: "ZOHO",
    actividad: "Campaña Semana de Receso por WhatsApp: dos envíos hasta el cierre del 15 de octubre.",
    resultado: "1 de octubre, \"Últimos días de descuento\" con botón de enlace: 74 entregados, 56 leídos (76%) y 16 clics (22%), el mejor resultado de la campaña. 7 de octubre, \"Brillapool últimos días\": 73 entregados, 49 leídos (67%) y 4 clics (5%). WhatsApp superó con amplitud al correo, y el mensaje con descuento general generó 4 veces más clics que el centrado en un solo producto.",
    kpi: "16 clics (22%)",
  },
  {
    fecha: "6 al 22 de octubre",
    tema: "ZOHO",
    actividad: "Planeación de 7 automatizaciones en Zoho, una por fase del embudo, con correo y WhatsApp de respaldo.",
    resultado: "Bienvenida (contacto nuevo), navegación abandonada, carrito abandonado (correo a la hora y WhatsApp al día 7), poscompra, reposición (día 85, con cupón de 10% válido por 15 días), fidelización (cliente con 3 pedidos o más) y reactivación (180 días sin comprar). Cada flujo define a quién le llega, su objetivo, cuándo sale el correo y cuándo el WhatsApp si no hubo clic.",
    kpi: "7 flujos diseñados",
  },
  {
    fecha: "6 al 10 de octubre",
    tema: "ZOHO",
    actividad: "Diseños de las 7 automatizaciones: solicitud a Mercadeo y entrega.",
    resultado: "El 6 de octubre se pidió a Sara una imagen por flujo, con titular, idea visual y especificaciones comunes para correo y WhatsApp (1.200 × 628 px, JPG de menos de 200 KB, titular de máximo 6 palabras, zona segura al centro, sin precios ni fechas). Los 7 diseños quedaron listos el 9 y el 10 de octubre y se confirmó que sirven para montar las campañas.",
    kpi: "7 imágenes listas",
  },
  {
    fecha: "15 de octubre",
    tema: "ZOHO",
    actividad: "Formato para proponer los textos de las automatizaciones.",
    resultado: "Formato con una hoja por flujo, los límites de cada campo (asunto de 50 caracteres, preencabezado de 90, cuerpo de 3 a 4 párrafos, botón de 25, WhatsApp de 800 y dos botones) y columnas de aprobación y comentarios.",
    kpi: "Formato creado",
  },
  {
    fecha: "22 de octubre",
    tema: "ZOHO",
    actividad: "Envío de la propuesta de textos de los 7 flujos para aprobación.",
    resultado: "El formato se diligenció con los textos de correo y WhatsApp de los 7 flujos. Está pendiente de aprobación, junto con tres decisiones: el beneficio de Cliente Frecuente, si la reactivación lleva incentivo y si la mención de REFILL aplica a todos los segmentos.",
    kpi: "Pendiente de aprobación",
  },
  {
    fecha: "15 de octubre",
    tema: "ZOHO",
    actividad: "Prueba de la plantilla de carrito abandonado en Zoho y coordinación con Sandra sobre la pauta.",
    resultado: "Se recibió el correo de prueba de carrito abandonado. Sandra planteó conectar la pauta con el CRM de Zoho y coordinar el acceso.",
    kpi: "Plantilla en prueba",
  },
  {
    fecha: "25 de octubre",
    tema: "ZOHO",
    actividad: "Verificación de identidad en Twilio para los envíos de SMS.",
    resultado: "César Rueda envió el certificado de existencia y representación legal actualizado, que bloqueaba el trámite desde septiembre. Queda pendiente la autenticación final, que requiere un código enviado al correo y al celular del representante legal: el Director Administrativo y Financiero salió a vacaciones y regresa el 3 de noviembre, así que el envío de SMS desde Zoho se activa a su regreso.",
    kpi: "Pendiente: autenticación Twilio",
  },
  {
    fecha: "12 de octubre",
    tema: "ZOHO",
    actividad: "Revisión de un anuncio en Meta de la campaña de piscinas.",
    resultado: "El anuncio decía Rapifloc pero mostraba la imagen de Brillapool, llevaba al precio normal y tenía un mensaje de cliente sin responder. Se reportó a María de forma directa y Sandra pausó la campaña ese mismo día.",
    kpi: "Anuncio pausado",
  },

  // REUNIONES
  {
    fecha: "7 de octubre",
    tema: "REUNIONES",
    actividad: "Reunión SEO con María 5:30 am",
    resultado: "Seguimiento semanal: renovación de fichas de producto, calendario de contenidos de octubre y automatizaciones de Zoho.",
    kpi: "Seguimiento realizado",
  },
  {
    fecha: "7 de octubre",
    tema: "REUNIONES",
    actividad: "Reunión Mercadeo y Dirección Técnica 8:00 am",
    resultado: "Seguimiento con José a los pendientes técnicos del sitio.",
    kpi: "Seguimiento realizado",
  },
  {
    fecha: "14 de octubre",
    tema: "REUNIONES",
    actividad: "Reunión SEO con María 5:30 am",
    resultado: "Estado del sitio tras la caída, posiciones de la semana y avance de la presentación para Gerencia. Se aclaró después que los descuentos vistos en la web eran el descuento de empleados, visible solo al iniciar sesión.",
    kpi: "Seguimiento realizado",
  },
  {
    fecha: "14 de octubre",
    tema: "REUNIONES",
    actividad: "Reunión con Tita 8:00 am (1 hora)",
    resultado: "Preparación de la presentación de un año de resultados SEO.",
    kpi: "1 hora",
  },
  {
    fecha: "14 de octubre",
    tema: "REUNIONES",
    actividad: "Reunión con Tita 11:45 am (1 hora)",
    resultado: "Continuación de la preparación de la presentación de un año de resultados SEO.",
    kpi: "1 hora",
  },
  {
    fecha: "21 de octubre",
    tema: "REUNIONES",
    actividad: "Reunión con Tita 5:30 am (1 hora)",
    resultado: "Preparación del cuadro de cifras mes a mes.",
    kpi: "1 hora",
  },
  {
    fecha: "21 de octubre",
    tema: "REUNIONES",
    actividad: "Reunión Mercadeo y Dirección Técnica 8:00 am",
    resultado: "Revisión con José de los ajustes de sitemap, URL del ataque de junio y cobertura en Search Console.",
    kpi: "Seguimiento realizado",
  },
  {
    fecha: "22 de octubre",
    tema: "REUNIONES",
    actividad: "Reunión SEO con María 6:00 am (trasladada del 21 de octubre)",
    resultado: "Resultados de la segunda medición de fichas, lotes 6 a 8 y propuesta de textos de las automatizaciones.",
    kpi: "Seguimiento realizado",
  },
  {
    fecha: "28 de octubre",
    tema: "REUNIONES",
    actividad: "Reunión SEO con María 5:30 am",
    resultado: "Reporte mensual y presentación de resultados de octubre.",
    kpi: "Seguimiento realizado",
  },

  // REPORTES
  {
    fecha: "9 de octubre",
    tema: "REPORTES",
    actividad: "Informe de la caída del sitio del 8 de octubre",
    resultado: "Enviado a María, Tita y Mercadeo, con la cronología, las cifras de Ahrefs y la decisión de pausar los cambios de producto. María respaldó la pausa para medir limpio.",
    kpi: "Completado",
  },
  {
    fecha: "13 de octubre",
    tema: "REPORTES",
    actividad: "Informe de recuperación del sitio y posiciones en Google",
    resultado: "Puntaje de salud de vuelta en 93, 41 búsquedas que ganaron top 10 y primeros resultados de las fichas renovadas.",
    kpi: "Completado",
  },
  {
    fecha: "27 de octubre",
    tema: "REPORTES",
    actividad: "Reporte técnico SEO y visibilidad en IA",
    resultado: "Enviado a María, Mercadeo, Tita y José: salud técnica, estado de las correcciones, rendimiento en Search Console, reporte de IA generativa y primera medición de Brand Radar.",
    kpi: "Completado",
  },
  {
    fecha: "27 y 30 de octubre",
    tema: "REPORTES",
    actividad: "Generación del reporte de actividades de octubre",
    resultado: "Seguimiento a actividades",
    kpi: "Completado",
  },
];

// ─── Secciones ────────────────────────────────────────────────
// Espacios para imagen: subir los archivos a public/octubre/
const secciones = [
  { tema: "SEO TÉCNICO",            title: "SEO TÉCNICO",            imagen: "/octubre/ahrefs.png", alt: "Captura de Ahrefs Site Audit, octubre 2026" },
  { tema: "FICHAS DE PRODUCTO",     title: "FICHAS DE PRODUCTO",     imagen: "/octubre/fichas.png", alt: "Fichas renovadas que subieron y bajaron de posición en Google, octubre 2026" },
  { tema: "SEO DE CONTENIDOS",      title: "SEO DE CONTENIDOS",      imagen: "/octubre/joomla.png", alt: "Captura del backend de Joomla con los artículos del blog de octubre" },
  { tema: "GERENCIA",               title: "INFORMES PARA GERENCIA", imagen: undefined,             alt: "" },
  { tema: "SEGUIMIENTO Y MEDICIÓN", title: "SEGUIMIENTO Y MEDICIÓN", imagen: undefined,             alt: "" },
  { tema: "ZOHO",                   title: "ZOHO Y CAMPAÑAS",        imagen: "/octubre/zoho.png",   alt: "Captura de Zoho Marketing Automation, automatizaciones" },
  { tema: "REUNIONES",              title: "REUNIONES",              imagen: undefined,             alt: "" },
  { tema: "REPORTES",               title: "REPORTES",               imagen: undefined,             alt: "" },
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
    doc.text("Reporte Octubre 2026 | Kipclin", 14, 12);
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
    doc.save("Reporte_Octubre_2026_Kipclin.pdf");
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
              Reporte Octubre 2026 | Kipclin
            </h1>
            <p style={{ fontSize: "16px", margin: 0 }}>
              Seguimiento técnico, editorial y de automatización del sitio web. Incluye SEO técnico, renovación de fichas de producto, SEO de contenidos (blog), informes para Gerencia, seguimiento en Ahrefs, Search Console y Analytics, Zoho Marketing Automation, reuniones y reportes del mes.
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
