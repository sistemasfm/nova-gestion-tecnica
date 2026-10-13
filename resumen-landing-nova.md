# NOVA Gestión Técnica — Landing page (resumen para desarrollo)

## Qué es

Landing de captación de leads para un servicio de gestión técnica integral (seguridad, calidad, ambiente, gestión industrial) para empresas, PyMEs, comercios y organismos públicos en Argentina. Base en Villa María, Córdoba; atención presencial y online en todo el país.

## Tecnología

Sitio construido con TanStack Start (React 19 + Vite), Tailwind CSS v4 y TypeScript. Sin backend todavía: los formularios validan y redirigen, pero no persisten datos.

## Identidad visual

- **Paleta:** `#14304D` (azul oscuro, fondos y texto), `#C97B3D` (naranja, solo CTAs — único color cálido), `#EDF1F4` (gris claro, fondos alternativos), blanco para texto sobre oscuro.
- **Tipografía:** Space Grotesk Bold (titulares, hero en mayúsculas) + Inter (cuerpo y botones), vía Google Fonts.
- **Estilo:** técnico, sobrio, documental. Fotos de equipo técnico en acción real. Sin iconografía cliché de consultoría.
- **Mobile-first**, con barra CTA fija en móvil y targets táctiles de mínimo 44–48px.

## Estructura de la landing (`/`)

1. **Hero** a pantalla completa: fondo `#14304D` con foto técnica, headline "UN SOLO EQUIPO TÉCNICO PARA CUMPLIR CON TODO", CTA naranja con pulso sutil.
2. **Problema** (fondo claro).
3. **Solución** (fondo oscuro).
4. **Credenciales del equipo** (Alejandro y Paula, dos tarjetas — sin testimonios inventados).
5. **Oferta**: diagnóstico técnico inicial sin cargo, con checks naranjas.
6. **FAQ** en acordeón (3 objeciones).
7. **Formulario de captación** (Nombre + Email + checkbox de privacidad obligatorio).
8. **CTA final** a pantalla completa con formulario repetido.

Sin menú de navegación ni footer con links externos: todo lleva al formulario. El copy está aprobado y no debe parafrasearse.

## Componentes de conversión

- **Popup de leads:** exit-intent en desktop, 60% de scroll en móvil. Una vez por sesión (sessionStorage), nunca si ya se envió un formulario (localStorage compartido). Zoom-in suave de 250ms.
- **WhatsApp:** botón flotante verde fijo abajo a la derecha (56–60px) con tooltip y onda de pulso; burbuja de chat "NGT" a los 8 segundos (cierre persistente por sesión). Enlace `wa.me` con mensaje pre-rellenado. Número y mensajes centralizados en `src/lib/whatsapp.tsx`.
- **Barra CTA móvil fija:** aparece cuando el hero deja de verse y se oculta en el formulario final; el botón de WhatsApp sube para no superponerse.

## Páginas secundarias

- **`/gracias`:** confirmación con check SVG animado, 3 pasos en línea de tiempo, bloque de WhatsApp, tarjetas de contenido bonus. Dispara evento `Lead` del píxel de Meta al cargar (si el píxel está instalado). `noindex`.
- **`/politica-privacidad`** y **`/aviso-legal`:** páginas legales con índice navegable, misma identidad visual, enlace cruzado entre ambas.

## Pendientes (requieren datos del cliente)

1. **Número de WhatsApp real** — hoy es el placeholder `WHATSAPP_NUMBER = "+54XXXXXXXXX"` en `src/lib/whatsapp.tsx`.
2. **Email de contacto** — placeholder `NOVA_EMAIL_CONTACTO` en la política de privacidad.
3. **Píxel de Meta** — el código espera el píxel instalado para disparar la conversión; aún no está instalado.
4. **Persistencia de leads** — los formularios no guardan ni envían los datos a ningún lado, solo redirigen a `/gracias`. Falta definir destino (email, CRM, base de datos).

## Archivos clave

- `src/routes/index.tsx` — landing completa
- `src/routes/gracias.tsx`, `src/routes/politica-privacidad.tsx`, `src/routes/aviso-legal.tsx`
- `src/components/LeadPopup.tsx`, `src/components/WhatsAppContact.tsx`, `src/components/LegalShell.tsx`
- `src/lib/whatsapp.tsx` — configuración de WhatsApp
- `src/styles.css` — tokens de diseño y animaciones
