# Landing page · CHUDBI

Sitio estático de CHUDBI: HTML, CSS y JavaScript sin compilación. Cada push a `main` se despliega en Vercel
(https://chudbi-landing.vercel.app/) y en GitHub Pages. Este README no se publica en Vercel (`.vercelignore`).

## Estructura

```
index.html            Landing
documentacion.html    Guía de uso para clientes
assets/
  css/main.css        Estilos; tokens de color para modo oscuro (Medianoche) y claro (Grafito)
  js/tema.js          Modo claro/oscuro: botón, transición circular, capturas por tema, tema del sistema
  js/main.js          Movimiento: GSAP + ScrollTrigger (+ Lenis solo con mouse)
  brand/              Logotipo blanco y a color, isotipo separado en capas, favicon, imagen para redes
  icons/              Ilustraciones de la identidad gráfica (WebP con transparencia)
  shots/              Capturas reales del sistema; las que terminan en -claro son del tema claro
images/               Archivos originales de la identidad gráfica
```

Librerías por CDN (versiones fijas): GSAP 3.12.5 y ScrollTrigger (cdnjs), Lenis 1.1.13 (unpkg). Si no cargan, la página
sigue completa y legible.

## Tono del contenido

La página es para clientes: habla de beneficios y datos del producto, sin jerga técnica ni nombres de librerías,
modelos o infraestructura. Las cifras son reales y se cuentan en el sistema; si cambian, se actualizan aquí y en la página.

## Modo claro y oscuro

El tema inicial es el que la persona eligió antes (`localStorage`, clave `chudbi-tema`) o el de su sistema. Un script
en `<head>` lo fija antes de pintar para evitar parpadeos. Las imágenes con versión clara llevan `data-light`; los pasos
del recorrido, `data-shot-light`. Elementos solo de un tema: clases `only-dark` y `only-light`.

## Secciones y movimiento

| Sección | Qué hace |
|---|---|
| Intro | El isotipo se arma capa por capa (menta, teal, azul, «C», línea dorada) |
| Hero | Título por palabras y captura real del Dashboard que se endereza con el scroll; en celular la captura se recorre como una cámara |
| Biblioteca normativa | Marquesina de los documentos que consulta CHUDBOT; acelera con la velocidad del scroll |
| Manifiesto | Frase de marca que se enciende palabra por palabra |
| Recorrido | 11 módulos con la pantalla fijada y transición de capturas; en celular, captura arriba con paneo |
| Módulos | Scroll horizontal fijado con los 24 módulos del menú real |
| CHUDBOT | Robot en SVG (parpadea, sigue el puntero o el dedo, habla) y chat animado |
| Temas | Comparador claro/oscuro que se mueve con el scroll o se arrastra |
| Seguridad, cifras | Diagrama con flujos animados y contadores |

Con «Reducir movimiento» activado se conservan fundidos, contadores, el chat y el recorrido con fundidos; se quitan
intro, parallax, marquesina y desplazamientos grandes.

## De dónde salen las cifras

Conteo del 8 de octubre de 2026 en el sistema: 24 módulos del menú, 36 acciones de CHUDBOT (20 piden confirmación),
40 documentos normativos en 22,232 fragmentos, 1,076 cuentas del código agrupador del SAT, parámetros de nómina 2026 y
7 de 8 casos contables y fiscales correctos en las pruebas internas del asistente. El chat animado usa preguntas de esas
pruebas.

Las capturas se tomaron del sistema real con las empresas de demostración. Algunos acentos de esos datos estaban
dañados («N├│mina»); solo para las capturas se corrigieron en pantalla.

## Formulario de contacto

Envía a Google Sheets mediante un Web App de Apps Script (URL en `assets/js/main.js`, constante `scriptURL`). Campos:
`nombre`, `email`, `empresa`, `telefono`, `mensaje`. Apps Script no expone CORS, así que se envía con `mode: 'no-cors'`
y solo se detectan errores de red.

## Desarrollo local

```bash
python -m http.server 8000
```

Abre `http://localhost:8000`.
