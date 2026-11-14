// Un solo lugar donde se registran los plugins de GSAP (todos gratis desde la versión 3.13).
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(useGSAP, DrawSVGPlugin, ScrollTrigger, SplitText, CustomEase);

// Curvas de la skill animate (Emil Kowalski): las mismas que --ease-salida y --ease-vaiven del CSS.
CustomEase.create('salida', 'M0,0 C0.23,1 0.32,1 1,1');   // entrar y salir
CustomEase.create('vaiven', 'M0,0 C0.77,0 0.175,1 1,1');  // moverse en pantalla
/** Las mismas curvas para Motion. */
export const SALIDA = [0.23, 1, 0.32, 1] as const;
export const VAIVEN = [0.77, 0, 0.175, 1] as const;

export { gsap, useGSAP, SplitText, ScrollTrigger };

/** Si la persona pidió menos movimiento, todo arranca en su estado final. */
export const reducido = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** El valor real de un token de color (los tweens de color no interpolan var()). */
export const token = (nombre: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(nombre).trim();

export const SVG_NS = 'http://www.w3.org/2000/svg';

/** Efectos que siguen al cursor: solo con mouse (en pantallas táctiles, el hover se dispara al tocar). */
export const conMouse = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
