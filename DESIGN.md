# DIXBERF — sistema visual

Dirección: editorial industrial. Fotografías propias, bloques amplios y geometría de maquinaria. Amarillo de seguridad, grafito y papel cálido. Sin métricas inventadas ni imágenes de stock.

## Color
- Amarillo principal: `#f3cf21`. Texto siempre grafito sobre este fondo.
- Grafito: `#191c1c`. Fondos de portada, proyectos y pie.
- Papel: `#f7f7f2`. Superficies principales.
- Texto secundario: `#646a66` sobre papel.
- WhatsApp: `#195c3a` con texto blanco.

## Tipografía
Barlow Condensed 600/700 en titulares; Manrope variable en cuerpo y controles. Fuentes alojadas localmente. Titulares fluidos y sin alturas fijas para texto. En formularios móviles, entradas de 16 px para evitar zoom automático.

## Layout
Contenedor máximo de 1320 px. Márgenes de 56, 32 y 20 px. Grillas adaptables, navegación móvil desplegable y desplazable en pantallas bajas. Fotografías con dimensiones declaradas. La portada crece según su contenido.

## Componentes
Botones rectangulares con flecha diagonal, movimiento de 2 px y sombra dura al pasar el cursor. Foco visible azul. WhatsApp persistente. FAQ con elementos nativos details/summary. Apariciones discretas por desplazamiento y respeto de `prefers-reduced-motion`.

La marca tipográfica y el monograma usados son una propuesta provisional, ya que no se encontró un logotipo oficial independiente en la carpeta de materiales. Los nombres de clientes se presentan como texto, sin recrear sus logotipos.

## Hero y movimiento — segunda versión

Referencia compositiva: [Udrone Home 2](https://demo.bravisthemes.com/udrone/home-2/). Se adapta su composición de título a la izquierda y equipo destacado a la derecha, con fondo oscuro técnico. Se conservan colores, tipografías, contenido y fotografías de DIXBERF.

La grúa del hero es un recorte asistido de una fotografía del cliente. Fondo de cuadrícula y órbitas en CSS; no se usan recursos gráficos del sitio de referencia. La versión móvil apila texto, CTA y equipo, y puede crecer sin altura fija.

Movimientos: entrada escalonada del título, profundidad suave en la grúa al desplazar, respuesta al puntero sólo en dispositivos con ratón, franja tipográfica vinculada al scroll, aparición escalonada de tarjetas, desplazamiento moderado en fotos, línea de avance del proceso y progreso de lectura. No hay scroll interceptado, sección fijada ni bucles decorativos. Se anima transform/opacity con requestAnimationFrame sólo al cambiar scroll o puntero.

Se respeta `prefers-reduced-motion`, incluidos cambios en tiempo real. El botón «Pausar efectos» permite desactivar el movimiento y recordar la elección. El contenido se mantiene disponible con efectos desactivados o sin JavaScript.
