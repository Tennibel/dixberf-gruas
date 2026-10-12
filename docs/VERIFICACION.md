# Verificación del sitio DIXBERF

Fecha: 11 de octubre de 2026. Sitio local, todavía sin publicar.

## Resultado

- Compilación de 17 páginas: correcta, sin errores ni advertencias.
- Auditoría axe de 17 páginas: sin incidencias detectadas en los criterios automáticos WCAG A/AA usados.
- Enlaces internos de las páginas revisadas: sin destinos rotos.
- Imágenes: texto alternativo y dimensiones presentes.
- Cinco tamaños revisados: 320×568, 375×667, 390×600, 768×500 y 844×390.
- Comprobación final adicional: todas las 17 páginas a 320×480 y 844×390, sin desbordamiento ni texto recortado (34 combinaciones).
- Menú: abre, cierra con Escape y devuelve el foco. La altura permite desplazamiento en pantallas bajas.
- Cookies: persistencia, rechazo, aceptación y ausencia de peticiones de analítica sin ID comprobadas.
- Formulario: campos obligatorios, aceptación de privacidad y mensaje correcto para WhatsApp comprobados. La navegación externa se interceptó durante la prueba: no se envió ningún mensaje real.
- Servidor de cotización: cuatro pruebas automatizadas correctas con validación de campos, métodos, origen, honeypot, credenciales, Turnstile y fallo/éxito del proveedor simulado.
- Contenido principal disponible sin JavaScript, con teléfonos y enlaces de contacto.

## Lighthouse móvil local, primera versión

Esta medición se realizó antes del rediseño del hero y movimientos de scroll. Ver `HERO_MOTION.md` para las comprobaciones posteriores.

| Categoría | Resultado |
|---|---:|
| Rendimiento | 100/100 |
| Accesibilidad | 100/100 |
| Buenas prácticas | 100/100 |
| SEO | 100/100 |

- Primera pintura con contenido: 1.1 s.
- Elemento principal visible: 1.9 s.
- Bloqueo total: 0 ms.
- Desplazamiento visual acumulado: 0.

Resultados de laboratorio en Chrome local con simulación móvil. No equivalen a mediciones de usuarios reales ni sustituyen revisar dispositivos físicos. Hosting, conexiones e integraciones finales pueden modificar los resultados.

## Pendientes acordados

Datos legales definitivos, ID de Analytics, ficha de Google, hosting/dominio/TLS y credenciales de Turnstile/correo. El código de integración está preparado; esos servicios externos no están activos. El formulario usa WhatsApp mientras tanto. Certificar HTTPS y recepción real del correo sólo es posible al publicar en el hosting elegido.

La marca tipográfica es provisional. Las capacidades 60/160 t no se anuncian como confirmadas. Revisar WhatsApp y correo del documento antes de lanzamiento.

## Vista previa

http://localhost:4321/

Configuración y comandos en `README.md`. Sistema visual en `DESIGN.md`.
