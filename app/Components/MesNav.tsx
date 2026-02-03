"use client";

export default function MesNav() {
  const meses = [
    { nombre: "Enero",      ruta: "/",     activo: true  },
    { nombre: "Febrero",    ruta: null,    activo: false },
    { nombre: "Marzo",      ruta: null,    activo: false },
    { nombre: "Abril",      ruta: null,    activo: false },
    { nombre: "Mayo",       ruta: null,    activo: false },
    { nombre: "Junio",      ruta: null,    activo: false },
    { nombre: "Julio",      ruta: null,    activo: false },
    { nombre: "Agosto",     ruta: null,    activo: false },
    { nombre: "Septiembre", ruta: null,    activo: false },
    { nombre: "Octubre",    ruta: null,    activo: false },
    { nombre: "Noviembre",  ruta: null,    activo: false },
    { nombre: "Diciembre",  ruta: null,    activo: false },
  ];

  return (
    <nav style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid #E5E7EB", padding: "28px 0" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#6B7280", marginBottom: "20px" }}>
          📅Reportes mes a mes en 2026
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "12px",
        }}>
          {meses.map((mes) => (
            <a
              key={mes.nombre}
              href={mes.activo ? mes.ruta ?? undefined}
              onClick={(e) => { if (!mes.activo) e.preventDefault(); }}
              style={{
                display: "block",
                textAlign: "center",
                padding: "10px 8px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "600",
                textDecoration: "none",
                boxShadow: mes.activo ? "0 2px 4px rgba(0,0,0,0.15)" : "none",
                backgroundColor: mes.activo ? "#055DA7" : "#E5E7EB",
                color: mes.activo ? "white" : "#9CA3AF",
                cursor: mes.activo ? "pointer" : "default",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => { if (mes.activo) (e.target as HTMLAnchorElement).style.backgroundColor = "#4FA3D1"; }}
              onMouseLeave={(e) => { if (mes.activo) (e.target as HTMLAnchorElement).style.backgroundColor = "#055DA7"; }}
            >
              {mes.nombre}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}