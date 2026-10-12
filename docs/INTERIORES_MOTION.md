# Continuidad visual en páginas interiores

Actualización: 11 de octubre de 2026.

Se aplicó el lenguaje visual de inicio a Equipos, Proyectos y las siete páginas de servicios, incluida Montacargas: cabecera grafito, cuadrícula técnica, órbitas, tipografía condensada, acentos amarillos y llamadas a la acción consistentes.

## Implementación

- `InteriorHero.astro`: hero compartido con fotografía real o grúa recortada, entrada escalonada, ancla al contenido y control de movimiento.
- `interiors.css`: estilos delimitados para estas páginas, fichas técnicas de equipos y galería de proyectos en dos columnas alternadas (una en móvil).
- El motor de movimiento existente anima fotos al desplazarse y revela fichas, aplicaciones, preguntas frecuentes y CTA. Sólo procesa fotografías visibles, con eventos pasivos y requestAnimationFrame.
- Se conserva el desplazamiento nativo. Los contenedores crecen con el contenido, sin altura fija para los textos. La preferencia de pausa se comparte entre páginas y se respeta `prefers-reduced-motion`. El contenido permanece visible sin JavaScript.
- Se reutilizan los WebP existentes, con tamaños adaptativos y carga diferida fuera del hero. No se añadieron bibliotecas ni imágenes nuevas.
- Se conservan metadatos, datos estructurados y contenido de los servicios. No se activaron integraciones pendientes.

## Verificación de esta actualización

- Astro: 30 archivos revisados, sin errores, advertencias ni sugerencias; 17 páginas generadas.
- Cuatro pruebas existentes de formularios: correctas.
- 628 referencias internas de las 17 páginas exportadas: destinos y anclas presentes.
- Las nueve páginas modificadas revisadas a 320 × 480 y 844 × 390: sin desbordamientos horizontales ni recortes detectados en títulos, párrafos o botones; todas las imágenes con atributo alt.
- Revisión visual de escritorio a 1440 × 900: hero de Equipos, fichas, hero de Proyectos y galería.
- Confirmadas las transformaciones de fotos al desplazarse y las entradas de fichas.
- Pausa comprobada en Proyectos y persistencia al navegar a un servicio. Efectos reactivados después de la prueba.
- Menú probado en pantalla horizontal de poca altura, foco visible mediante teclado y apertura de preguntas frecuentes mediante Enter.
- Sin errores de consola observados. No se repitió Lighthouse ni una auditoría automática completa de accesibilidad en esta actualización.
