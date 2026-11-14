import { MotionConfig } from 'motion/react';
import { ProveedorPreferencias, usePreferencias } from './contexto/preferencias';
import { Nav } from './componentes/Nav';
import { Portada } from './componentes/Portada';
import { Contacto, Investigacion, Pie, Proyectos, SobreMi, Trayectoria } from './secciones/Secciones';

function Sitio() {
  const { t } = usePreferencias();
  return (
    <>
      <a className="saltar" href="#proyectos">{t.saltar}</a>
      <Nav />
      <Portada />
      <main>
        <Proyectos />
        <Investigacion />
        <SobreMi />
        <Trayectoria />
        <Contacto />
      </main>
      <Pie />
    </>
  );
}

export default function App() {
  return (
    // reducedMotion="user": con movimiento reducido, Motion deja solo la opacidad (skill animate).
    <MotionConfig reducedMotion="user">
      <ProveedorPreferencias>
        <Sitio />
      </ProveedorPreferencias>
    </MotionConfig>
  );
}
