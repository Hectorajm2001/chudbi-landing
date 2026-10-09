<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/brand/logo-h-white.png">
    <img src="assets/brand/logo-h.png" alt="CHUDBI · Debe Haber" width="360">
  </picture>
</p>

<p align="center">
  <strong>Sitio oficial de CHUDBI</strong><br>
  El sistema contable y administrativo para PYMEs mexicanas, con un asistente de inteligencia artificial privado.
</p>

<p align="center">
  <a href="https://chudbi-landing.vercel.app/"><strong>Ver el sitio</strong></a>
  &nbsp;·&nbsp;
  <a href="https://chudbi-landing.vercel.app/documentacion.html">Guía de uso</a>
  &nbsp;·&nbsp;
  <a href="https://chudbi-landing.vercel.app/#contacto">Solicitar demo</a>
</p>

---

## Contenido

- [El sitio](#el-sitio)
- [Ejecutar en local](#ejecutar-en-local)
- [Publicación](#publicación)
- [Estructura](#estructura)
- [Mantenimiento](#mantenimiento)
- [Formulario de contacto](#formulario-de-contacto)

## El sitio

| Sección | Qué comunica |
|---|---|
| Inicio | La propuesta de valor y una captura real del sistema |
| Biblioteca normativa | Las leyes, reglamentos y guías del SAT que consulta CHUDBOT |
| Manifiesto | Debe ▲ Haber: de dónde viene la contabilidad y lo que CHUDBI hace con esa tradición |
| Recorrido | Once módulos del sistema, pantalla por pantalla |
| Módulos | Los 24 módulos del sistema, agrupados por área |
| CHUDBOT | Qué hace el asistente y cómo llega al artículo exacto de la ley |
| Modo claro y oscuro | Los dos temas del sistema, lado a lado |
| Seguridad | Accesos, bitácora, cierre de periodos y cumplimiento fiscal |
| En cifras | Datos medidos del producto |
| Contacto | Formulario para solicitar una demostración |

El sitio arranca en **modo claro**; el botón de sol y luna cambia al oscuro y recuerda la elección. En celular, el
recorrido y los módulos se fijan en pantalla y avanzan con el scroll, igual que en escritorio.

## Ejecutar en local

No necesita instalación ni compilación:

```bash
python -m http.server 8000
```

Después abre <http://localhost:8000>.

## Publicación

Cada push a `main` publica el sitio automáticamente en:

- **Vercel:** <https://chudbi-landing.vercel.app/>
- **GitHub Pages:** <https://hectorajm2001.github.io/chudbi-landing/>

Este README no se publica en Vercel (`.vercelignore`).

## Estructura

```
├── index.html             Página principal
├── documentacion.html     Guía de uso para clientes
├── assets/
│   ├── css/main.css       Estilos y colores de los dos temas
│   ├── js/tema.js         Modo claro y oscuro
│   ├── js/main.js         Animaciones, chat de CHUDBOT y formulario
│   ├── brand/             Logotipos, isotipo por capas e íconos del sitio
│   ├── icons/             Ilustraciones de la identidad gráfica
│   └── shots/             Capturas del sistema
└── images/                Originales de la identidad gráfica
```

## Mantenimiento

### Cifras y textos

Todas las cifras del sitio son datos reales del producto, contados el 8 de octubre de 2026. Si cambian, actualízalas
en `index.html` (atributo `data-count` de cada contador) y en `documentacion.html`.

### Capturas

Cada captura existe en dos versiones dentro de `assets/shots/`: `nombre.webp` para el tema oscuro y
`nombre-claro.webp` para el claro, en WebP a 1600 px de ancho. En el recorrido, cada paso las indica con
`data-shot` y `data-shot-light`; en el resto de la página, las imágenes usan `data-light` o las clases `only-dark` y
`only-light`.

### Colores

Los colores de los dos temas están al inicio de `assets/css/main.css`: el bloque `:root` es el tema claro (por defecto)
y `[data-theme="dark"]` el oscuro. La paleta parte del isotipo:

| Navy | Azul | Teal | Menta | Oro |
|:---:|:---:|:---:|:---:|:---:|
| `#18365E` | `#21658F` | `#1D979E` | `#36B5AC` | `#E6C064` |

### Animaciones

Usan GSAP 3.12.5 con ScrollTrigger, cargados desde CDN con versión fija. Si la persona tiene activado «Reducir
movimiento», el sitio conserva transiciones suaves sin desplazamientos grandes. Si las librerías no cargan, el contenido
sigue completo y legible.

## Formulario de contacto

Cada mensaje llega a una hoja de Google Sheets mediante un Web App de Apps Script. La dirección del Web App está en
`assets/js/main.js` (constante `scriptURL`) y los campos que envía son `nombre`, `email`, `empresa`, `telefono` y
`mensaje`.

<details>
<summary>Configurar el Web App</summary>

1. Crea una hoja con una pestaña llamada `Contactos` y estos encabezados:
   `Timestamp | Nombre | Email | Empresa | Telefono | Mensaje`.
2. En **Extensiones → Apps Script**, pega este código:

   ```javascript
   const SHEET_NAME = 'Contactos';

   function doPost(e) {
     const lock = LockService.getScriptLock();
     lock.tryLock(10000);
     try {
       const ss = SpreadsheetApp.getActiveSpreadsheet();
       let sheet = ss.getSheetByName(SHEET_NAME);
       if (!sheet) { // si la pestaña no existe (o tiene otro nombre), se crea con encabezados
         sheet = ss.insertSheet(SHEET_NAME);
         sheet.appendRow(['Timestamp', 'Nombre', 'Email', 'Empresa', 'Telefono', 'Mensaje']);
       }
       const d = e.parameter;
       sheet.appendRow([new Date(), d.nombre || '', d.email || '', d.empresa || '', d.telefono || '', d.mensaje || '']);
       return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
         .setMimeType(ContentService.MimeType.JSON);
     } finally {
       lock.releaseLock();
     }
   }
   ```

3. Publica con **Implementar → Nueva implementación → Aplicación web**, ejecutando como tú y con acceso para
   cualquier persona.
4. Copia la URL que termina en `/exec` en `scriptURL`.

</details>

---

<p align="center">© 2026 CHUDBI · Debe ▲ Haber · Orgullosamente mexicanos</p>
