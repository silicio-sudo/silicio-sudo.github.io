/* ============================================================
   Datos curados de los proyectos (se combinan con la API de GitHub)
   ------------------------------------------------------------
   Añade aquí descripciones, funcionalidades y colores a medida.
   Cualquier repositorio de GitHub que NO esté aquí aparecerá
   igualmente de forma automática con sus datos públicos.

   Claves: nombre del repo en minúsculas.
   ============================================================ */

const GITHUB_USER = "silicio-sudo";

const CURATED = {
  "rutalibre": {
    order: 1,
    emoji: "🚴",
    color: "#22d3ee",
    tagline: "Registra, compite y mejora",
    description: "Registra tus salidas en bicicleta, corriendo o andando y compite contra tus propios segmentos. Gratis y sin cuentas.",
    features: [
      "Registro GPS en vivo de tus salidas",
      "Segmentos propios para competir contra ti",
      "Sensores BLE (pulsómetro, cadencia…)",
      "Entrenador por voz en español",
      "Exportación a GPX e historial completo"
    ],
    tech: ["Android", "Java", "GPS", "Bluetooth LE"]
  },
  "rutagrava": {
    order: 2,
    emoji: "🧭",
    color: "#a3e635",
    tagline: "Rutas gravel, sin sorpresas",
    description: "Calcula rutas en bicicleta y descubre el tipo de firme, el tráfico y el porcentaje de asfalto frente a pista.",
    features: [
      "Tipo de ruta: asfalto, pista, sendero",
      "Estimación de tráfico en cada tramo",
      "Porcentaje asfalto vs. pista",
      "Totalmente gratuita"
    ],
    tech: ["Android", "Mapas", "GPS"]
  },
  "rutaclima": {
    order: 3,
    emoji: "🌬️",
    color: "#60a5fa",
    tagline: "El tiempo de tu ruta, kilómetro a kilómetro",
    description: "Sube tu GPX y obtén previsión de viento, lluvia y temperatura a lo largo de toda tu ruta, con el tiempo ganado o perdido por el viento.",
    features: [
      "Importa rutas GPX/TCX",
      "Viento cefálico, de cola o cruzado",
      "Lluvia, temperatura y sensación térmica",
      "Mapa con la ruta coloreada",
      "Tiempo ganado/perdido vs. sin viento"
    ],
    tech: ["Android", "HTML/CSS/JS", "Open-Meteo", "Leaflet"]
  },
  "futboltotal": {
    order: 4,
    emoji: "⚽",
    color: "#fbbf24",
    tagline: "Todo el fútbol, en tu mano",
    description: "Calendario, resultados y encuentros de fútbol nacional e internacional, gratis y solo para Android.",
    features: [
      "Calendario de competiciones",
      "Resultados en tiempo real",
      "Ligas nacionales e internacionales"
    ],
    tech: ["Android"]
  },
  "baskettotal": {
    order: 5,
    emoji: "🏀",
    color: "#fb7185",
    tagline: "El baloncesto, al completo",
    description: "Aplicación dedicada al mundo del baloncesto para Android: ligas, NBA, FIBA y competiciones europeas.",
    features: [
      "NBA y FIBA",
      "Ligas y competiciones europeas",
      "Resultados y calendario"
    ],
    tech: ["Android"]
  },
  "ciclismototal": {
    order: 6,
    emoji: "🚵",
    color: "#a855f7",
    tagline: "El calendario del ciclismo",
    description: "Calendario y pruebas de ciclismo para Android: carretera, gravel, MTB, ciclocross y pruebas UCI.",
    features: [
      "Calendario de pruebas",
      "Carretera, gravel, MTB y ciclocross",
      "Pruebas UCI"
    ],
    tech: ["Android"]
  }
};

/* Paleta por defecto para repos nuevos (se asignan en rotación) */
const AUTO_COLORS = ["#22d3ee", "#a3e635", "#60a5fa", "#fbbf24", "#fb7185", "#a855f7", "#e879f9"];

/* Emoji por palabra clave para repos nuevos sin datos curados */
const AUTO_EMOJI = [
  [/cicl|cycl|gravel|bike|mtb|route|ruta/i, "🚴"],
  [/futbol|football|fútbol|soccer/i, "⚽"],
  [/baloncesto|basket/i, "🏀"],
  [/clima|weather|tiempo|meteo/i, "🌦️"],
  [/gps|map|ruta|track/i, "🗺️"],
  [/seguridad|security|hack|cyber/i, "🛡️"],
  [/app|android|movil/i, "📱"]
];
