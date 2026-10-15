# Handoff: Pequeños Exploradores — sitio web educativo (React + Tailwind)

## Overview
Sitio para niños (aprox. 6–11 años) sobre cuidado de plantas y del planeta. Proyecto "Ecosistemas y empresas", Universidad Modelo (Avance 2). Cuatro secciones:
1. **Inicio** — presentación y acceso a todo.
2. **Aprende** — cómo cuidar una planta desde cero (4 pasos) + catálogo "Conoce las plantas" con fichas.
3. **Juegos** — 3 minijuegos: Cultiva tu planta, Separa los residuos, Quiz ecológico.
4. **Contacto** — formulario para ideas, dudas, comentarios y propuestas de mejora.

Todo el texto de la interfaz va en **español (México)**.

## About the Design Files
Los archivos de `design/` son **referencias de diseño hechas en HTML** (prototipos estáticos que muestran el aspecto y el comportamiento esperados). **No son código de producción para copiar.** La tarea es **recrearlos en React + Tailwind CSS** con patrones idiomáticos (componentes, rutas, estado). Abre los `.dc.html` en el navegador para verlos; los estilos están inline, así que puedes leer valores exactos inspeccionando el código.

Stack sugerido: Vite + React + TypeScript + React Router + Tailwind. Sin backend obligatorio (ver Contacto).

## Fidelity
**High-fidelity.** D01–D04 recrean pixel a pixel los 4 mockups originales (`reference_mockups/mockup1-4.jpg`, 1672×941, escalados a 1440×810). D05–D12 son pantallas nuevas con el mismo sistema. Respeta colores, tipografía, radios, bordes y posiciones. Para comparar, `Desktop.dc.html` tiene un tweak "Referencia" que superpone el mockup original.

## Layout global
- Fondo de página `#FFF8EE` (crema). Contenido diseñado a **1440 px**; centrar con `max-w-[1440px] mx-auto`. Primer pantallazo = 810 px de alto.
- **Arbustos decorativos** en las esquinas inferiores de todas las páginas: `bush-left.png` (izq., 206 px ancho escritorio / 104 px móvil) y `bush-right.png` (der., 227 / 114 px). `position:absolute; bottom:0; pointer-events:none`, por encima del contenido.
- **Rayos** (`rays.svg`): 3 trazos amarillos que flanquean títulos y botones; el lado derecho es el mismo SVG con `scale-x-[-1]`.
- **Nubes** verdes (`cloud*.png`) decorativas, con posiciones absolutas.
- Breakpoint: < 768 px usa el layout móvil (390 px de referencia, padding horizontal 20 px). Entre 768 y 1440, escala o reacomoda con grids (las tarjetas de 4 columnas pasan a 2).

## Header (componente `<Header active>`)
Referencia: `design/PEHeader.dc.html`.
- **Escritorio** (alto 100): logo `logo.png` 94 px ancho en left 51 / top 20; a 27 px del logo, el texto "PEQUEÑOS / EXPLORADORES" en 2 líneas, Lilita One 35/32, `#0F2E22`. Nav a right 42 / top 29, gap 4: items INICIO, APRENDE, JUEGOS, CONTACTO; cada uno es una pill de alto 48, padding 0 23, Lilita 22, radio completo. Activo: fondo `#FFCD33`. Hover: `#FCF3D9`.
- **Móvil** (alto 80): logo 56 px + texto Lilita 20/19 en left 16. Botón de menú 48×48 en right 16 / top 16, radio 16, fondo `#FFCD33`, 3 barras de 22×3.5 con gap 5. Abierto: fondo crema, borde 3 `#0F2E22`, X.
- **Menú móvil abierto (M02)**: 4 tarjetas de 84 de alto, gap 12, borde 3, radio 20, ícono en una columna de 64 + Lilita 30. Activa: fondo amarillo y borde tinta; el resto rota verde/amarillo/coral. Abajo, la mascota (250 px) y "Un planeta más verde empieza contigo." (Playpen 500 18, `#246F47`). Cerrar con la X, con Escape o al navegar.
- La sección activa se calcula por prefijo de ruta (`/aprende/*` marca APRENDE).

## Componentes reutilizables
- **Button** `primary`: fondo `#FFCD33` → hover `#FFC21A`; Lilita; radio full; sin sombra; texto `#0F2E22`. Tamaños: hero 280×83 / 38px (móvil 64 alto / 30px); md alto 60, padding-x 34, 24px; card "JUGAR" 214×58 / 32px. `secondary`: transparente + borde 3 `#0F2E22`. `disabled`: opacity .35.
- **Card** con 3 variantes que rotan en este orden: verde → amarillo → verde (alt) → coral.
  - verde: bg `#E2F2D7` (alt `#DCF0D3`), borde 3 `#1F6E44`
  - amarillo: bg `#FCF3D9`, borde 3 `#C9B262`
  - coral: bg `#FEDFCF` (juegos `#FEE4D8`), borde 3 `#DA7A5E`
  - radio 16 (tarjetas grandes 18–28). Ilustración arriba centrada, título Lilita centrado abajo.
- **Chip** (filtros): alto 48, padding 0 24, Lilita 20; activo = fondo amarillo; inactivo = fondo `#FFFCF7` + borde 2.5 `#1F6E44`.
- **Tag**: alto 34, borde 2.5 verde, texto verde, Lilita 16.
- **Field** (input/textarea): alto 57, radio 12, borde 2 `#6B9B82`, fondo `#FFFCF7`, Playpen 20, padding-x 17, placeholder `#8F9A95`. Focus: borde `#1A7A4A` + `shadow-focus` (anillo amarillo de 4 px). Error: borde 2.5 `#B8513A`, fondo `#FFF4EF` y mensaje Playpen 600 15 `#B8513A` debajo. Label: Lilita 23, a 10 px del campo y a 22 px del campo anterior.
- **ProgressBar** (juego Cultiva): alto 22, borde 2.5 tinta, radio 11, fondo `#FFFCF7`, relleno de color.
- **StepDots**: 4 segmentos de 44×10, radio 5. Actual: amarillo con borde interior tinta. Pendiente: `#E2F2D7` con borde `#9CC5A8`. Completado: verde `#1F6E44`.
- **BackLink**: flecha + Lilita 18 `#1F6E44` (móvil: botón circular de 44 con borde 3).

## Screens / Views
Las medidas son de escritorio a 1440. Las coordenadas absolutas de los `.dc.html` sirven de guía; en React usa flex/grid que reproduzcan esas posiciones.

### D01 / M01 — Inicio `/`
- H1 "¡EXPLORA,<br>APRENDE Y CUIDA!" Lilita 84/80 en left 95 / top 136, con rayos a la izquierda.
- Lead "Descubre cómo cuidar las plantas / y proteger nuestro planeta." Playpen 500 30/37, top 309.
- Botón COMENZAR 280×83 en left 112 / top 404, con rayos a ambos lados → `/aprende`.
- Ilustración `hero.png` en left 573 / top 88, ancho 867 (hasta el borde derecho); nube en left 654 / top 121.
- 4 tarjetas en top 527, left 56, columnas de 320, gap 16, alto 239. Ilustración + título Lilita 36 en top 156 + `tuft.png` (48 px) en top 201.
  - APRENDE → `/aprende/plantas`
  - CUIDA → `/aprende`
  - JUEGA → `/juegos`
  - ESCRÍBENOS → `/contacto`
- Móvil: H1 50/48 en 3 líneas, lead 19/27, botón 230×64; hero a todo el ancho (390); tarjetas en grid 2×2 de 168 de alto, gap 12.

### D02 / M03 — Aprende a cuidar tu planta `/aprende`
- H1 centrado en 2 líneas "APRENDE A CUIDAR / TU PLANTA" Lilita 82/80, caja de 800 en left 151 / top 131. Subtítulo "Sigue estos pasos para ayudarla a crecer sana y fuerte." Playpen 500 29.
- Mascota `mascot.png` 445 px en left 930 / top 121; nubes a izquierda y derecha.
- 4 tarjetas en top 380, alto 278: "1. SIEMBRA", "2. RIEGA", "3. DALE LUZ", "4. CUÍDALA" (Lilita 34). Cada una → `/aprende/paso/:n`.
- COMENZAR 300×83 centrado en top 684 → `/aprende/paso/1`.

### D05 / M04 — Paso a paso `/aprende/paso/:n` (n = 1–4)
- Izquierda: tarjeta de 540×518 (variante según el paso) con un círculo amarillo de 72 con el número y la ilustración del paso (430 px).
- Derecha (left 700, ancho 644):
  - "PASO n DE 4" + StepDots; a la derecha, el enlace "VER TODOS LOS PASOS"
  - H1 del paso, Lilita 76/72
  - Subtítulo Playpen 500 24
  - Lista de 3 instrucciones con círculos amarillos numerados de 40
  - Caja coral "¿SABÍAS QUE…?"
  - Botones ANTERIOR (secondary; disabled en el paso 1) y "SIGUIENTE PASO: {nombre}" (en el paso 4: "¡TERMINÉ!" → `/juegos/cultiva`)
- Contenido por paso (ponlo en `data/pasos.ts`):
  1. **SIEMBRA** — "Todo empieza con una pequeña semilla." · Llena tu maceta con tierra hasta casi arriba. / Haz un hoyito del tamaño de tu dedo. / Pon la semilla y tápala con poquita tierra. · Dato: Dentro de cada semilla hay una plantita bebé esperando crecer.
  2. **RIEGA**, 3. **DALE LUZ**, 4. **CUÍDALA** — mismo formato; redacta el texto con el mismo tono (frases cortas, en segunda persona, para niños) y deja un `TODO` para que lo revise el equipo.

### D06 / M05 — Conoce las plantas `/aprende/plantas`
- H1 "CONOCE LAS PLANTAS" a la izquierda, subtítulo "Cada planta es diferente. Descubre qué necesita para crecer feliz."
- Chips de filtro: TODAS · DE INTERIOR · PARA COMER · DEL DESIERTO · CON FLORES (filtrado en el cliente).
- Grid de 4 columnas de 320, gap 16; tarjeta de 300 de alto: imagen de 170 (por ahora un placeholder rayado), nombre Lilita 30, 2 tags y un botón circular amarillo de 40 con flecha → `/aprende/plantas/:slug`.
- Plantas: Girasol, Frijol, Cactus, Albahaca, Sábila, Jitomate, Cempasúchil, Menta (ver `plants` en el JS de `Desktop.dc.html`).
- Móvil: grid de 2 columnas y chips con scroll horizontal.

### D07 / M06 — Ficha de planta `/aprende/plantas/:slug`
- BackLink "TODAS LAS PLANTAS".
- Imagen 540×500 en una tarjeta amarilla.
- Tags, H1 con el nombre (Lilita 82) y una frase corta.
- 3 mini-tarjetas: AGUA, LUZ y CRECE EN, cada una con ilustración de 70 px de alto.
- "DATOS CURIOSOS": lista con viñetas amarillas.
- CTA "APRENDE A SEMBRARLA" → `/aprende/paso/1`.

### D03 / M07 — Juegos `/juegos`
- H1 "APRENDE JUGANDO" Lilita 84, subtítulo "Elige una aventura ecológica." Playpen 500 34; mascota `mascot-juegos.png` a la derecha.
- 3 tarjetas en top 341, left 99, columnas de 402, gap 19, alto 369. Ilustración, título Lilita 33 en top 247 y botón JUGAR 214×58 en top 293.
  - CULTIVA TU PLANTA → `/juegos/cultiva`
  - SEPARA LOS RESIDUOS → `/juegos/residuos`
  - QUIZ ECOLÓGICO → `/juegos/quiz`
- Móvil: tarjetas apiladas.

### D08 / M08 — Cultiva tu planta `/juegos/cultiva`
- Barra superior: BackLink JUEGOS · título del juego (Lilita 48) · pill "DÍA n DE 7" · botón de pausa.
- Escena (tarjeta verde 1248×500, radio 28):
  - mascota a la izquierda, con un globo de diálogo
  - línea de etapas abajo: SEMILLA → BROTE → PLANTA → FLOR
  - a la derecha, "¿QUÉ NECESITA HOY?" con 3 ProgressBar (AGUA `#4892C4`, SOL `#FFCD33`, CARIÑO `#F07A5C`), cada una con su estado (¡Muy poca! en `#B8513A` / Bien)
  - 3 botones de acción de 72 de alto (REGAR / DAR SOL / DAR CARIÑO); la acción recomendada lleva un anillo
- **Reglas sugeridas:**
  - Cada acción = 1 día: sube +40 su medidor y baja −15 los otros dos (rango 0–100).
  - Si al final del día todos los medidores quedan entre 30 y 90, la planta avanza una etapa.
  - Con 4 etapas antes del día 7 = gana (FLOR). Si no, termina en el día 7 con la etapa alcanzada.
  - Globo: muestra la necesidad más baja ("¡Tengo sed!", "¡Quiero sol!", "¿Me das cariño?").
  - Al terminar → Resultado.

### D09 / M09 — Separa los residuos `/juegos/residuos`
- Barra superior con contador "n / 10" y "PUNTOS x".
- Instrucción: "Arrastra cada residuo al bote correcto."
- Tarjeta del residuo (220×200, rotada −4°, sombra `0 12px 0 rgba(15,46,34,.10)`), con imagen y nombre.
- 3 botes como zonas de soltar (300×220, borde punteado 3):
  - ORGÁNICO (verde)
  - PAPEL Y CARTÓN (azul `#4A86B5` / `#DDEBF6`)
  - PLÁSTICO Y LATAS (amarillo)
- Zona activa al pasar por encima: borde sólido 4, sube 8 px y anillo `shadow-drop-target`.
- **Reglas:**
  - 10 residuos al azar de una lista; acierto = +10 y pill verde "¡MUY BIEN! +10".
  - Error: tarjeta en sacudida (shake) + pill coral "¡Ups! Va en {bote}" y pasa al siguiente.
  - Usa pointer events (o dnd-kit) para que funcione con touch. Alternativa accesible: tocar la tarjeta y luego el bote, o usar el teclado.
- Lista de residuos sugerida:
  - Orgánico: cáscara de plátano, hojas secas, restos de manzana, cáscara de huevo
  - Papel y cartón: periódico, caja de cartón, cuaderno viejo
  - Plástico y latas: botella de plástico, lata de refresco, envase de yogur

### D10 / M10 — Quiz ecológico `/juegos/quiz`
- Barra superior: "PREGUNTA n DE 5" + 5 puntos de progreso.
- Ilustración `game-quiz.png` a la izquierda; tarjeta coral de 804×500 con:
  - pregunta en Lilita 40/46 (text-wrap: balance)
  - grid 2×2 de opciones de 76 de alto, con círculo de letra A–D
- **Al responder:** la correcta se pinta en verde con palomita; las demás quedan en opacity .55. Si fue incorrecta, la elegida se pinta en coral. Aparece la retroalimentación ("¡CORRECTO!" / "¡CASI!" + explicación de una línea) y el botón SIGUIENTE.
- 5 preguntas de un banco de ~15 (`data/quiz.ts`). Ejemplo: "¿Qué necesita una planta para hacer su propio alimento?" → Luz del sol (correcta) / Dulces / Música fuerte / Oscuridad.

### D11 / M11 — Resultado (compartido)
- Mascota grande, H1 "¡BIEN HECHO!" (o "¡BUEN INTENTO!" si va por debajo del 50 %) y resumen (por ejemplo, "Respondiste 4 de 5 preguntas correctas.").
- Pill verde de insignia y botones JUGAR OTRA VEZ / OTRO JUEGO.
- Recibe `{game, score, total}`. Guarda las insignias en localStorage.

### D04 / M12 — Contacto `/contacto`
- Izquierda: H1 "¡ESCRÍBENOS!" Lilita 84, subtítulo en 2 líneas Playpen 500 30/36, `mailbox.png` 593 px.
- Derecha: formulario 550×568 en left 766 / top 162, borde 3 `#1A7A4A`, radio 24, fondo `#E8F5E3`, padding 31/30:
  - NOMBRE ("Escribe tu nombre"), CORREO ("Escribe tu correo"), MENSAJE (textarea de 120, "Cuéntanos qué quieres compartir")
  - botón ENVIAR MENSAJE 380×65 centrado
  - nota "¡Nos encantará leerte!" Playpen 500 21 `#246F47` entre rayos
- **Validación** (al enviar y al salir de cada campo):
  - nombre: obligatorio, ≥ 2 caracteres → "¿Cómo te llamas?"
  - correo: formato válido → "Revisa tu correo, parece que le falta algo."
  - mensaje: ≥ 10 caracteres → "Cuéntanos un poquito más."
- **Envío:** no hay backend. Usa un servicio de formularios (Formspree, EmailJS) o un endpoint `POST /api/contacto` con interfaz intercambiable. Mientras se envía, el botón dice "ENVIANDO…" y se desactiva.

### D12 / M13 — Mensaje enviado
- Mismo layout; el formulario se reemplaza por una tarjeta de confirmación:
  - círculo amarillo de 120 con palomita
  - "¡MENSAJE ENVIADO!" Lilita 44
  - "Gracias, {nombre}. Leeremos tu mensaje y te responderemos a {correo}"
  - ESCRIBIR OTRO MENSAJE (resetea el formulario) y enlace VOLVER AL INICIO

## Interactions & Behavior
- **Hover:** botones amarillos → `#FFC21A`; tarjetas clicables → `translateY(-4px)` + `transition 150ms ease-out`; nav → fondo `#FCF3D9`.
- **Focus visible:** anillo `shadow-focus` en todo lo interactivo. Hit targets ≥ 44 px en móvil.
- **Movimiento:** respeta `prefers-reduced-motion`. Animaciones sugeridas:
  - rayos con un pulso suave (scale 1→1.08, 1.6 s, alternate)
  - la mascota crece con spring al subir de etapa
  - confeti opcional en Resultado
- Los juegos guardan su progreso en `localStorage` y se pueden reanudar.

## State Management
- Router: rutas listadas arriba y página 404 con la mascota ("¡Ups! Esta página se perdió en el bosque.").
- Estado local por juego, con `useReducer`:
  - **Cultiva:** `{day, stage, water, sun, love, status}`
  - **Residuos:** `{queue, index, score, feedback}`
  - **Quiz:** `{questions, index, selected, correctCount}`
- Contacto: `{values, errors, touched, status: 'idle'|'sending'|'sent'|'error'}`.
- Datos estáticos en `src/data/` (pasos, plantas, residuos, quiz).

## Design Tokens
Ver `tailwind.tokens.js` (listo para `theme.extend`). Resumen:
- **Colores:** crema `#FFF8EE` · tinta `#0F2E22` · sol `#FFCD33` (hover `#FFC21A`, rayos `#FCCB2B`) · hoja `#1F6E44` · texto verde `#246F47` · verde suave `#E2F2D7` / `#DCF0D3` / form `#E8F5E3` · arena `#C9B262` / `#FCF3D9` · coral `#DA7A5E` / `#FEDFCF` / `#F07A5C` · agua `#4892C4` · campo `#FFFCF7` / borde `#6B9B82` / placeholder `#8F9A95` · error `#B8513A`.
- **Tipografía:** Lilita One 400 (títulos, nav, labels, botones; siempre MAYÚSCULAS) + Playpen Sans 400/500/600 (texto). Google Fonts: `family=Lilita+One&family=Playpen+Sans:wght@400;500;600;700`.
- **Bordes:** 3 px en tarjetas y formulario; 2.5 en chips; 2 en inputs. **Radios:** 12 inputs · 16 tarjetas · 18–28 tarjetas grandes · full en botones y pills.
- **Sombras:** el estilo es plano (sin sombras, salvo los anillos de focus/drop y la tarjeta arrastrable).
- **Espaciado:** margen lateral de 56 en escritorio (contenido 96 en páginas de detalle), 20 en móvil; gaps de 16–19 en grids de tarjetas, 12 en móvil.

## Assets (`assets/`)
PNG con fondo transparente, recortados de los mockups originales: sirven para maquetar, pero tienen resolución 1x. **Para producción, pide a quien hizo las ilustraciones los originales en SVG o PNG @2x.**
- `logo.png`, `hero.png`, `mascot.png`, `mascot-juegos.png`, `mailbox.png`
- `cloud.png`, `cloud-2.png`, `cloud-3.png`, `bush-left.png`, `bush-right.png`, `tuft.png`
- `icon-aprende.png`, `icon-cuida.png`, `icon-juega.png`, `icon-escribenos.png`
- `step-siembra.png`, `step-riega.png`, `step-luz.png`, `step-cuidala.png`
- `game-cultiva.png`, `game-residuos.png`, `game-quiz.png`
- `bin-green.png`, `bin-blue.png`, `bin-yellow.png`
- `rays.svg` (vector; el lado derecho es el espejo)

**Faltan** (en el diseño aparecen como recuadros rayados): ilustraciones de las 8 plantas, de los ~10 residuos y la de la ficha de planta. Usa un componente `<Placeholder label>` hasta tenerlas.

## Files
- `design/Pequenos Exploradores - Desktop.dc.html` — D01–D12 (escritorio)
- `design/Pequenos Exploradores - Mobile.dc.html` — M01–M13 (móvil)
- `design/Pequenos Exploradores - Sistema.dc.html` — tokens, componentes, mapa de rutas
- `design/PEHeader.dc.html` — header (escritorio/móvil, abierto/cerrado)
- `design/support.js` — runtime que permite abrir los `.dc.html` en el navegador (no forma parte del sitio)
- `reference_mockups/mockup1-4.jpg` — mockups originales del Avance 2
- `tailwind.tokens.js` — tokens de Tailwind

## Orden sugerido de construcción
1. Tokens + fuentes + layout base (fondo, arbustos, Header y menú móvil).
2. Componentes: Button, Card, Chip, Tag, Field, ProgressBar, StepDots, BackLink, Placeholder.
3. Páginas estáticas: Inicio, Aprende, Paso, Plantas, Ficha, Juegos, Contacto (con validación y estado de éxito).
4. Juegos: Quiz → Residuos → Cultiva → Resultado.
5. Revisión con las referencias (D01–D04 deben coincidir con los mockups), responsive y accesibilidad (alt, foco, teclado, reduced-motion).
