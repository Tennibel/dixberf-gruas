# Hero y movimientos de scroll

## Resultado

Adaptación de la composición de [Udrone Home 2](https://demo.bravisthemes.com/udrone/home-2/) a la marca DIXBERF. Hero con grúa aislada, título grande y acentos amarillos; fondo técnico generado con CSS. Fotos y contenido del resto del sitio conservados.

## Asset y procedencia

- Fuente del cliente: `Fotos Gruas DIXBERF/60 tons_/313efec3-89b3-43fb-a4f1-60a97b50e8c2.jpeg`.
- Recorte realizado con la herramienta integrada de imagen, preservando la foto original sin modificarla.
- Archivo maestro: `src/assets/grua-hero-source.png` (RGBA).
- Versiones comprimidas: `public/images/grua-hero-640.webp` y `public/images/grua-hero-1200.webp`.

### Prompt utilizado

Edit target: the supplied real DIXBERF crane photo. Create an accurate photographic transparent cutout of ONLY the yellow mobile crane, entire boom, hanging cables and hook, cab, truck chassis, wheels and outriggers. Remove all sky, warehouse, ground, power lines, people, the lifted blue/white machine, and background vehicles. This is background removal, NOT a redesign: preserve the actual perspective, geometry, yellow and gray paint, wear, details, and DIXBERF boom lettering exactly. No new crane, no invented parts, no new text, no stylization, no neon. Frame the complete existing crane comfortably with a small transparent margin, maintaining its original boom reaching upper left and truck body lower right. Retain all original crane components visible in source. Output high quality RGBA with true alpha, suitable to place on a dark graphite website background.

## Interacciones

- Entrada breve y escalonada del hero.
- Movimiento de profundidad de la grúa al hacer scroll.
- Respuesta ligera al puntero en escritorio.
- Franja tipográfica que avanza con el scroll, sin reproducción infinita.
- Revelado escalonado de servicios y proyectos.
- Parallax ligero en fotos de nosotros y proyectos.
- Indicadores de avance en proceso y lectura.
- Botón de pausa, persistencia de preferencia y respeto al movimiento reducido del sistema.

## Verificación de esta versión

Compilación Astro y TypeScript sin errores. Revisión visual en navegador y medición de desbordamiento en 320×480, 375×667, 390×600, 768×500, 844×390 y escritorio de 1440×900. Pausa y reactivación de efectos, persistencia y disponibilidad del contenido comprobadas en navegador.

Las puntuaciones Lighthouse de `VERIFICACION.md` corresponden a la primera versión, antes de este cambio del hero. No deben presentarse como una medición nueva de esta versión.
