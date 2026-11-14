import { useRef } from 'react';
import { HUBS, NODOS, caminata, par, radio } from './cerebro';
import { RedCerebral } from './RedCerebral';
import { SVG_NS, gsap, reducido, token, useGSAP } from './animacion';

/** Portada 1 · el cerebro se dibuja, lo recorren señales y reacciona al cursor (GSAP). */
export function CerebroVivo() {
  const svg = useRef<SVGSVGElement>(null);

  useGSAP((_contexto, contextSafe) => {
    const raiz = svg.current!;
    const grupo = raiz.querySelector<SVGGElement>('.grupo')!;
    const capaSenales = raiz.querySelector<SVGGElement>('.senales')!;
    const aristas = gsap.utils.toArray<SVGLineElement>('.arista', raiz);
    const nodos = gsap.utils.toArray<SVGCircleElement>('.nodos circle', raiz);
    const porPar = new Map(aristas.map((l) => [l.dataset.par!, l]));
    if (reducido()) return;

    // 1. Entrada: las aristas se trazan y los nodos aparecen.
    gsap.timeline()
      .from(aristas, { drawSVG: 0, duration: 0.8, ease: 'power2.inOut', stagger: 0.025 })
      .from(nodos, { opacity: 0, scale: 0.6, transformOrigin: '50% 50%', duration: 0.45, ease: 'salida', stagger: { each: 0.02, from: 'random' } }, 0.25);

    // 2. Señales: un punto recorre una caminata al azar; la arista que cruza se ilumina y el hub al que llega late.
    const brillar = contextSafe!((arista: SVGLineElement) => {
      const base = Number(arista.getAttribute('stroke-opacity'));
      gsap.timeline()
        .to(arista, { strokeOpacity: Math.min(1, base + 0.55), duration: 0.12, overwrite: 'auto' })
        .to(arista, { strokeOpacity: base, duration: 0.6 });
    });
    const latir = contextSafe!((id: string) => {
      const [x, y] = NODOS[id];
      const anillo = document.createElementNS(SVG_NS, 'circle');
      anillo.setAttribute('class', 'anillo');
      anillo.setAttribute('cx', String(x));
      anillo.setAttribute('cy', String(y));
      anillo.setAttribute('r', String(radio(id)));
      anillo.setAttribute('stroke-width', '1.6');
      capaSenales.appendChild(anillo);
      gsap.fromTo(anillo, { attr: { r: radio(id), 'stroke-width': 1.6 }, opacity: 0.9 },
        { attr: { r: radio(id) + 9, 'stroke-width': 0.3 }, opacity: 0, duration: 1.1, ease: 'power2.out', onComplete: () => anillo.remove() });
    });
    let vivo = true;
    const lanzar = contextSafe!(() => {
      if (!vivo) return;
      const ruta = caminata(gsap.utils.random(2, 5, 1));
      const [x0, y0] = NODOS[ruta[0]];
      const punto = document.createElementNS(SVG_NS, 'circle');
      punto.setAttribute('class', 'senal');
      punto.setAttribute('r', '1.5');
      punto.setAttribute('cx', String(x0));
      punto.setAttribute('cy', String(y0));
      capaSenales.appendChild(punto);
      const viaje = gsap.timeline({ onComplete: () => punto.remove() }).from(punto, { opacity: 0, duration: 0.15 });
      for (let i = 1; i < ruta.length; i++) {
        const [x, y] = NODOS[ruta[i]];
        const arista = porPar.get(par(ruta[i - 1], ruta[i]))!;
        viaje.call(() => brillar(arista)).to(punto, { attr: { cx: x, cy: y }, duration: 0.4, ease: 'none' });
        if (HUBS.includes(ruta[i])) viaje.call(() => latir(ruta[i]));
      }
      viaje.to(punto, { opacity: 0, duration: 0.2 });
      gsap.delayedCall(gsap.utils.random(0.3, 0.8), lanzar);
    });
    gsap.delayedCall(1.4, lanzar);

    // 3. Cursor: los nodos cercanos crecen y se pintan de cobalto; el cerebro sigue al puntero apenas (paralaje).
    const cerca = new Set<string>();
    const punteroSvg = (e: PointerEvent) => {
      const p = raiz.createSVGPoint();
      p.x = e.clientX;
      p.y = e.clientY;
      return p.matrixTransform(raiz.getScreenCTM()!.inverse());
    };
    const mover = contextSafe!((e: PointerEvent) => {
      const p = punteroSvg(e);
      for (const c of nodos) {
        const id = c.dataset.id!;
        const [x, y] = NODOS[id];
        const adentro = Math.hypot(p.x - x, p.y - y) < 18;
        if (adentro === cerca.has(id)) continue;
        if (adentro) {
          cerca.add(id);
          gsap.to(c, { attr: { r: radio(id) * 1.7 }, fill: token('--cobalto'), duration: 0.25, overwrite: 'auto' });
        } else {
          cerca.delete(id);
          gsap.to(c, { attr: { r: radio(id) }, fill: HUBS.includes(id) ? token('--cobalto') : token('--texto'), duration: 0.4, overwrite: 'auto',
            onComplete: () => gsap.set(c, { clearProps: 'fill' }) });
        }
      }
    });
    const salir = contextSafe!(() => {
      for (const id of [...cerca]) {
        const c = nodos.find((n) => n.dataset.id === id)!;
        gsap.to(c, { attr: { r: radio(id) }, duration: 0.4, overwrite: 'auto', onComplete: () => gsap.set(c, { clearProps: 'fill' }) });
      }
      cerca.clear();
    });
    const vaX = gsap.quickTo(grupo, 'x', { duration: 0.9, ease: 'power3' });
    const vaY = gsap.quickTo(grupo, 'y', { duration: 0.9, ease: 'power3' });
    const paralaje = (e: PointerEvent) => {
      vaX((e.clientX / window.innerWidth - 0.5) * 6);
      vaY((e.clientY / window.innerHeight - 0.5) * 6);
    };
    raiz.addEventListener('pointermove', mover);
    raiz.addEventListener('pointerleave', salir);
    window.addEventListener('pointermove', paralaje);

    // 4. Al bajar, el cerebro se aleja y se apaga (ScrollTrigger con scrub).
    gsap.to(raiz, {
      yPercent: 14, opacity: 0.25, ease: 'none',
      scrollTrigger: { trigger: raiz.closest('.portada'), start: 'top top', end: 'bottom top', scrub: true },
    });

    return () => {
      vivo = false;
      raiz.removeEventListener('pointermove', mover);
      raiz.removeEventListener('pointerleave', salir);
      window.removeEventListener('pointermove', paralaje);
      capaSenales.replaceChildren();
    };
  }, { scope: svg });

  return <RedCerebral ref={svg} etiqueta="Brain drawn as a network of nodes, with signals travelling between them" />;
}
