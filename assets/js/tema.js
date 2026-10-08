/* CHUDBI · Tema claro (Grafito, por defecto) y oscuro (Medianoche), como en la app.
   El tema inicial lo fija un script en <head> (sin parpadeo); aquí viven el botón y el cambio de capturas por tema. */
(() => {
  'use strict';

  const CLAVE = 'chudbi-tema';
  const html = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const meta = document.querySelector('meta[name="theme-color"]');
  const botones = Array.from(document.querySelectorAll('[data-theme-toggle]'));
  const guardar = (t) => { try { localStorage.setItem(CLAVE, t); } catch { /* sin almacenamiento */ } };

  const actual = () => (html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  // Imágenes con versión por tema: src = oscura, data-light = clara
  const cambiarImagenes = (t) => {
    document.querySelectorAll('img[data-light]').forEach((img) => {
      if (!img.dataset.dark) img.dataset.dark = img.getAttribute('src');
      const quiero = t === 'light' ? img.dataset.light : img.dataset.dark;
      if (img.getAttribute('src') !== quiero) img.setAttribute('src', quiero);
    });
  };

  const sincronizar = () => {
    const t = actual();
    if (meta) meta.setAttribute('content', t === 'light' ? '#F5F7FB' : '#050B16');
    botones.forEach((b) => b.setAttribute('aria-label', t === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'));
    cambiarImagenes(t);
    document.dispatchEvent(new CustomEvent('chudbi:tema', { detail: t }));
  };

  const aplicar = (t) => { html.setAttribute('data-theme', t); sincronizar(); };

  const alternar = (boton) => {
    const siguiente = actual() === 'light' ? 'dark' : 'light';
    guardar(siguiente);
    if (document.startViewTransition && !reduce) {
      // Revelado circular desde el botón
      const r = boton.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      const radio = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      const transicion = document.startViewTransition(() => aplicar(siguiente));
      transicion.ready.then(() => {
        html.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radio}px at ${x}px ${y}px)`] },
          { duration: 750, easing: 'cubic-bezier(.22, 1, .36, 1)', pseudoElement: '::view-transition-new(root)' },
        );
      }).catch(() => {});
    } else if (!reduce) {
      html.classList.add('theme-fade');
      aplicar(siguiente);
      setTimeout(() => html.classList.remove('theme-fade'), 500);
    } else {
      aplicar(siguiente);
    }
  };

  botones.forEach((b) => b.addEventListener('click', () => alternar(b)));

  window.chudbiTema = { actual };
  sincronizar();
})();
