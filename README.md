# Landing Page - CHUDBI

Landing page moderna y optimizada para GitHub Pages del Sistema de Contabilidad Inteligente con IA Local para PYMEs.

## 🚀 Características

- ✅ Diseño moderno y responsivo
- ✅ Optimizado para GitHub Pages
- ✅ Animaciones suaves y efectos de scroll
- ✅ 100% HTML, CSS y JavaScript vanilla (sin frameworks)
- ✅ Navegación móvil con menú hamburguesa
- ✅ Secciones completas: Hero, Características, Módulos, IA, Tech Stack, CTA
- ✅ Demo interactiva del chat de CHUDBOT (asistente IA local)
- ✅ Énfasis en privacidad y procesamiento local de datos

## 📁 Estructura de Archivos

```
WEB HTML/
├── index.html       # Página principal
├── styles.css       # Estilos CSS
├── script.js        # JavaScript para interactividad
└── README.md        # Este archivo
```

## 🌐 Despliegue en GitHub Pages

### Opción 1: Desde la carpeta raíz

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: `main` → Folder: `/WEB HTML`
5. Save

### Opción 2: Mover archivos a la raíz (recomendado)

```bash
# Desde la raíz del proyecto
cp -r "WEB HTML"/* ./docs/
```

Luego en GitHub Pages:
- Branch: `main` → Folder: `/docs`

### Opción 3: Rama separada

```bash
git checkout --orphan gh-pages
git rm -rf .
cp -r "WEB HTML"/* .
git add .
git commit -m "Deploy landing page"
git push origin gh-pages
```

Luego en GitHub Pages:
- Branch: `gh-pages` → Folder: `/` (root)

## 🎨 Personalización

### Colores (en `styles.css`)

```css
:root {
    --primary: #1e40af;        /* Color principal */
    --secondary: #f59e0b;      /* Color secundario */
    --accent: #10b981;         /* Color de acento */
}
```

### Contenido

- **Hero**: Edita `.hero-title` y `.hero-subtitle` en `index.html`
- **Características**: Modifica `.feature-card` items (incluyendo CHUDBOT - IA Local)
- **Módulos**: Actualiza `.module-category` sections
- **Footer**: Cambia links y contacto en `.footer-section`

### Enlaces de Contacto

Actualiza el email de contacto en `index.html`:
- Email: `contacto@chudbi.com`

## 📱 Responsividad

La landing page está optimizada para:

- 📱 Móviles: < 480px
- 📱 Tablets: 481px - 768px
- 💻 Desktop: 769px - 1024px
- 🖥️ Large Desktop: > 1024px

## ✨ Funcionalidades JavaScript

- Menú móvil hamburguesa
- Scroll suave a secciones
- Animaciones on-scroll con Intersection Observer
- Efecto parallax en hero section
- Contador animado en estadísticas
- Efectos de navbar al hacer scroll

## 📨 Formulario de Contacto + Google Sheets

El formulario en el footer envia los datos a Google Sheets usando Google Apps Script.

### 1) Crear la hoja

- Crea un Google Sheet llamado, por ejemplo, **Contactos**
- En la primera fila agrega estos encabezados:

```
Timestamp | Nombre | Email | Empresa | Telefono | Mensaje
```

### 2) Crear Apps Script

En el Google Sheet:

1. Extensions -> Apps Script
2. Reemplaza el contenido con:

```javascript
const SHEET_NAME = 'Contactos';

function doPost(e) {
    const lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
        const data = e.parameter;

        sheet.appendRow([
            new Date(),
            data.nombre || '',
            data.email || '',
            data.empresa || '',
            data.telefono || '',
            data.mensaje || ''
        ]);

        return ContentService
            .createTextOutput(JSON.stringify({ result: 'success' }))
            .setMimeType(ContentService.MimeType.JSON)
            .setHeader('Access-Control-Allow-Origin', '*')
            .setHeader('Access-Control-Allow-Methods', 'POST');
    } finally {
        lock.releaseLock();
    }
}
```

### 3) Publicar como Web App

1. Deploy -> New deployment
2. Select type: Web app
3. Execute as: Me
4. Who has access: Anyone
5. Deploy y copia el URL que termina en `/exec`

### 4) Pegar el URL en la web

En [script.js](script.js) reemplaza:

```
const scriptURL = 'PASTE_APPS_SCRIPT_URL_HERE';
```

con tu URL de Apps Script.

## 🔧 Desarrollo Local

Para probar localmente:

```bash
# Opción 1: Python
cd "WEB HTML"
python -m http.server 8000

# Opción 2: Node.js (http-server)
npx http-server "WEB HTML" -p 8000

# Opción 3: VS Code Live Server
# Click derecho en index.html → Open with Live Server
```

Luego abre: `http://localhost:8000`

## 📊 SEO

Incluye:

- ✅ Meta descripción
- ✅ Meta keywords
- ✅ Meta autor
- ✅ Títulos semánticos (H1, H2, H3)
- ✅ Alt text en imágenes (cuando se agreguen)
- ✅ Links con target="_blank" y rel apropiados

### Mejoras SEO adicionales (opcional)

Agrega a `index.html`:

```html
<!-- Open Graph (Facebook, LinkedIn) -->
<meta property="og:title" content="CHUDBOT - Sistema Contable con IA">
<meta property="og:description" content="Sistema de contabilidad inteligente para PYMEs">
<meta property="og:image" content="URL_DE_IMAGEN">
<meta property="og:url" content="https://tudominio.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="CHUDBOT">
<meta name="twitter:description" content="Sistema Contable IA">
<meta name="twitter:image" content="URL_DE_IMAGEN">

<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
```

## 🎯 Próximos Pasos

- [ ] Agregar imágenes reales del dashboard (y reemplazar el div de dashboard simulado)
- [x] Sustituir emojis por iconos/imágenes reales de la marca
- [x] Crear favicon
- [x] Agregar Google Analytics
- [x] Implementar formulario de contacto funcional
- [ ] Agregar capturas de pantalla de módulos
- [x] Crear página de documentación separada
- [x] Agregar testimonios de usuarios

## 🔒 Privacidad y Seguridad

La landing page enfatiza que:
- **CHUDBI** es el sistema de contabilidad
- **CHUDBOT** es el asistente de IA local
- Toda la IA funciona 100% en el servidor del cliente
- Los datos nunca salen del negocio
- Máxima privacidad y control total

## 📄 Licencia

MIT - Ver LICENSE en la raíz del proyecto

## 👨‍💻 Autor

**CHUDBI** - Sistema de Contabilidad Inteligente con IA Local para PYMEs  
**CHUDBOT** - Asistente de IA que protege tu información

---

💼 Hecho con ❤️ y mucho ☕
