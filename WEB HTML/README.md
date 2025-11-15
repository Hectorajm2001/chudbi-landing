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

- [ ] Agregar imágenes reales del dashboard
- [ ] Crear favicon
- [ ] Agregar Google Analytics
- [ ] Implementar formulario de contacto funcional
- [ ] Agregar capturas de pantalla de módulos
- [ ] Crear página de documentación separada
- [ ] Agregar testimonios de usuarios

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
