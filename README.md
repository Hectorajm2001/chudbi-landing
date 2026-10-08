# Landing page · CHUDBI

Sitio estático de CHUDBI, el ERP fiscal mexicano con IA local. HTML, CSS y JavaScript sin compilación, listo para GitHub Pages.

## Estructura

```
index.html            Landing
documentacion.html    Guía de instalación y uso
assets/
  css/main.css        Estilos (tokens de color tomados del isotipo)
  js/main.js          Movimiento: GSAP + ScrollTrigger + Lenis
  brand/              Logotipo blanco, isotipo separado en capas, favicon, imagen para redes
  icons/              Ilustraciones de la identidad gráfica (WebP con transparencia)
  shots/              Capturas reales del sistema (WebP)
images/               Archivos originales de la identidad gráfica
```

Librerías por CDN (versiones fijas): GSAP 3.12.5 y ScrollTrigger (cdnjs), Lenis 1.1.13 (unpkg). Si no cargan, la página
sigue completa y legible: `main.js` quita la intro y deja el recorrido como tarjetas.

## Secciones y movimiento

| Sección | Qué hace |
|---|---|
| Intro | El isotipo se arma capa por capa (menta, teal, azul, «C», línea dorada) |
| Hero | Título por palabras, captura real del Dashboard que se endereza con el scroll, ilustraciones con parallax y foco que sigue al puntero |
| Biblioteca normativa | Marquesina de los documentos que consulta CHUDBOT; acelera con la velocidad del scroll |
| Manifiesto | Las palabras se encienden al avanzar |
| Recorrido | En escritorio se fija la pantalla y cambian 11 módulos con transición de capturas; en móvil son tarjetas |
| Módulos | Scroll horizontal fijado con los 24 módulos del menú real |
| CHUDBOT | Robot en SVG (parpadea, sus ojos siguen al puntero, habla), chat animado con casos del banco de pruebas, flujo RAG y benchmark de modelos |
| Temas | Comparador arrastrable entre Medianoche y Grafito |
| Tecnología, Números | Arquitectura con flujos animados, contadores y barras de evolución |

Con `prefers-reduced-motion` no hay intro, pines ni marquesina.

## De dónde salen los datos

Todo número de la página está medido, no estimado. Conteo del 8 de octubre de 2026:

- **Código** (rama `production` del repositorio de CHUDBI): 24 módulos en `Sidebar.jsx`, 273 endpoints en `routes/` y
  `backend.js`, 36 herramientas de IA (20 de escritura) en `routes/iaTools/`, 219 pruebas en `tests/*.test.js`,
  ≈58,200 líneas (backend sin pruebas, semillas ni respaldos + `client/src`).
- **Base de datos de desarrollo**: 119 tablas, 1,141 columnas, 180 índices; 40 documentos normativos, 8,238 secciones y
  22,232 fragmentos en `documentos_ia`; 1,076 cuentas del código agrupador en `utils/satCatalogoCompletoSAT.json`.
- **IA**: modelo, velocidades y aciertos de `scripts/feria-ia/LEEME.md`.
- **Nómina 2026**: `services/nominaParametros2026.js`.
- **ALPHA 2.0.0** (7,700 líneas, 40+ endpoints, 15 tablas, SQLite): plan de negocios del proyecto.
- **Chat de CHUDBOT**: las preguntas son casos de `scripts/feria-ia/bench-chatbot.js`; la página aclara que es una recreación.

Las capturas se tomaron del sistema real (worktree de diseño, tema oscuro y claro, 1440×900 a 2x) con las empresas de
demostración. Varias de esas empresas tienen acentos dañados en la base («N├│mina»); solo para las capturas se
corrigieron en pantalla, sin tocar la base.

## Formulario de contacto

Envía a Google Sheets mediante un Web App de Apps Script (URL en `assets/js/main.js`, constante `scriptURL`). Campos:
`nombre`, `email`, `empresa`, `telefono`, `mensaje`. Apps Script no expone CORS, así que se envía con `mode: 'no-cors'`
y solo se detectan errores de red.

Código del Web App (la hoja necesita una pestaña `Contactos` con los encabezados
`Timestamp | Nombre | Email | Empresa | Telefono | Mensaje`):

```javascript
const SHEET_NAME = 'Contactos';
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const d = e.parameter;
    sheet.appendRow([new Date(), d.nombre || '', d.email || '', d.empresa || '', d.telefono || '', d.mensaje || '']);
    return ContentService.createTextOutput(JSON.stringify({ result: 'success' })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

## Desarrollo local

```bash
python -m http.server 8000
```

Abre `http://localhost:8000`. GitHub Pages publica la rama `main` desde la raíz.
