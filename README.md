# DIXBERF · sitio web Astro

Sitio de 17 páginas, desarrollado con Astro, TypeScript y CSS. Contenido basado en `DIXBERF_Textos_Finales_del_Sitio.docx` y fotografías de la carpeta del cliente.

## GitHub Pages

El flujo `.github/workflows/deploy.yml` compila y publica automáticamente la rama `main` en GitHub Pages. La publicación inicial usa la ruta `/dixberf-gruas/`, mantiene `PUBLIC_PREVIEW=true` y deja el formulario en modo WhatsApp porque GitHub Pages no ejecuta funciones de servidor.

Para lanzar el dominio definitivo, configurar DNS y el dominio personalizado en GitHub Pages, agregar `public/CNAME` con `dixberfgruas.com.mx`, eliminar `SITE_BASE` del flujo y cambiar `PUBLIC_SITE_URL` al dominio final. Antes de permitir indexación, completar los datos legales y cambiar `PUBLIC_PREVIEW` a `false`.

## Vista previa

```sh
npm install
npm run dev
```

Abrir http://localhost:4321. Para producción: `npm run build`. La salida estática se genera en `dist/`.

## Incluido

- Inicio; seis páginas comerciales del documento; montacargas; equipos; proyectos; nosotros; cobertura; contacto; aviso legal; privacidad; cookies; 404.
- Fotografías WebP con variantes responsive, dimensiones y texto alternativo. Fuentes locales, carga diferida y JavaScript ligero.
- Navegación accesible, foco visible, menú desplazable en pantallas bajas, reducción de movimiento y estilos móviles.
- WhatsApp visible con mensajes por servicio, llamadas y cotización desde el formulario.
- Metadatos, canonical, Open Graph, favicon, sitemap, robots y datos estructurados LocalBusiness, Service, FAQPage y BreadcrumbList.
- Analítica GA4 opcional detrás de consentimiento, eventos de WhatsApp/llamada/correo/inicio/error/envío de formulario. No se envían datos personales del formulario a Analytics.
- Reglas HTTPS, cabeceras de seguridad y caché para Netlify; alternativa `.htaccess` para Apache.

## Integraciones pendientes por indicación del cliente

Copiar `.env.example` a `.env` y completar cuando se proporcionen datos. Actualmente no hay ID de Analytics, enlace de la ficha de Google, credenciales de correo/captcha ni datos legales. No se fabricaron valores.

- `PUBLIC_GA_ID`: propiedad GA4 real. Sin valor no se carga ni se envía analítica. Revisar en GA4 la configuración de medición mejorada y evitar duplicar los eventos manuales.
- `PUBLIC_GOOGLE_BUSINESS_URL`: enlace oficial verificado. Sin valor no se presenta un vínculo a una ficha ficticia. Crear o editar la ficha requiere acceso del propietario; ver `docs/FICHA_GOOGLE.md`.
- `PUBLIC_LEGAL_NAME`, `PUBLIC_LEGAL_ADDRESS`: responsable y domicilio. Los avisos son borradores no indexables y deben completarse/revisarse antes de publicar.
- Capacidades de 60 y 160 t: pendientes; no se anuncian como confirmadas. El rescate vial se excluyó por la anotación del documento. WhatsApp 55 2519 4278 y correo corporativo se tomaron del documento; confirmar antes del lanzamiento.
- Logotipo oficial: se usa propuesta tipográfica provisional.

## Formulario

Sin claves, prepara la solicitud y abre WhatsApp para que la persona la envíe; no afirma haberla recibido. No transmite datos a un servidor del sitio en este modo.

Para enviar por correo, se incluyó una función de Netlify en `netlify/functions/quote.mjs`. Configurar en hosting:

- `PUBLIC_FORM_ENABLED=true`
- `PUBLIC_TURNSTILE_SITE_KEY` y `TURNSTILE_SECRET_KEY` (sitio autorizado, acción `quote`).
- `RESEND_API_KEY`, `QUOTE_FROM_EMAIL` con dominio verificado y `QUOTE_TO_EMAIL`.
- `SITE_ORIGIN=https://dixberfgruas.com.mx`.

Validaciones en servidor: origen, método, tipo y tamaño del cuerpo, límites por campo, consentimiento, honeypot y token Turnstile de uso único con hostname y acción. Sólo confirma éxito cuando Resend acepta el correo. No registra datos personales en logs. Para producción con alto tráfico, configurar también límites de solicitudes en la plataforma.

La función no se ejecuta con `astro dev/preview`; probarla con Netlify Dev o un deploy de prueba al habilitar correo. En Apache u otro hosting, portar la función a su entorno o conservar el modo WhatsApp. La configuración de Netlify es una opción preparada, no una decisión de hosting ni una publicación realizada.

## HTTPS y publicación

El certificado TLS y el dominio requieren configuración del hosting. Las reglas incluidas redirigen al dominio HTTPS y agregan HSTS en producción. Verificar certificado, redirección HTTP/WWW, 404 y recepción real del formulario al publicar. Si hay un proxy delante de Apache, adaptar la detección HTTPS en `.htaccess` a los encabezados de confianza del proveedor para evitar bucles.

No se conocen las rutas del sitio antiguo; sólo se incluyó la equivalencia `/aviso-de-privacidad/` a `/politica-de-privacidad/`. Las demás redirecciones requieren inventario del sitio anterior.

## Verificación

```sh
npm run build
npm test
npm run audit
```

La auditoría usa Chrome instalado y el servidor local en el puerto 4321 (o `AUDIT_URL`). Revisa las páginas, enlaces, accesibilidad con axe, imágenes, menú y desbordamiento en cinco tamaños. Los resultados se guardan en `.work/audit.json`. Las pruebas del servidor usan proveedores simulados, no envían correos reales.

## Referencias de implementación

- [Imágenes en Astro](https://docs.astro.build/en/guides/images/)
- [Sitemap de Astro](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [Validación Turnstile en servidor](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- [Envío con Resend](https://resend.com/docs/api-reference/emails/send-email)
