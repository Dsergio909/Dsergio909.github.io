# Portafolio · Sergio García

**[dsergio909.github.io](https://dsergio909.github.io/)** · Automatización de procesos, agentes de IA y contenido con IA. Bogotá, Colombia.

Sitio estático en español e inglés con cinco casos (Comercio exterior de Colombia, Supplier Radar, Supplier Scout, Mesa de Cotejo y FoxyMaker3D), cada uno con problema, qué hice, lo que decidí y por qué, resultados con fuente y lo que aún falta. Debajo, en «También hice», el [Ojo del mundo](https://github.com/Dsergio909/ojo-del-mundo): un servidor MCP para que Claude vea un mundo de Minecraft en 3D.

## Lo que lo hace distinto

- **Una vista por rol.** Quien revisa elige el rol que está cubriendo (automatización, compras y datos, operaciones con IA o contenido con IA) y la página pone primero lo que le sirve. Cada vista tiene su enlace, así que se puede mandar uno distinto en cada postulación:
  - `https://dsergio909.github.io/?rol=automatizacion`
  - `https://dsergio909.github.io/?rol=datos`
  - `https://dsergio909.github.io/?rol=ia`
  - `https://dsergio909.github.io/?rol=contenido`
  - Agrega `&lang=en` para abrirla en inglés, por ejemplo `?rol=ia&lang=en`.
- **Demo en vivo con código real.** La sección «Pruébalo» corre el clasificador de [Supplier Radar](https://github.com/Dsergio909/supplier-radar) (el mismo archivo que corre en Google Apps Script). Incluye el caso de fraude por cambio de cuenta bancaria.
- **Cada cifra tiene fuente** y cada caso dice qué falta. Nada inventado.

## Técnica

- HTML, CSS y JavaScript sin dependencias ni paso de compilación.
- Diseño sobrio: fondo blanco neutro, un solo acento verde oscuro (#1d4a35), titulares en Inter Tight y texto en IBM Plex Sans; modo oscuro automático.
- Reels reales de FoxyMaker3D en bucle y sin sonido (se reproducen solo cuando están en pantalla), con enlace al video completo en TikTok.
- Fuentes servidas desde el propio sitio (SIL Open Font License, ver `fonts/`): cero peticiones a terceros, sin cookies ni rastreadores.
- Política de seguridad de contenido estricta (`<meta>`), todo lo dinámico se pinta con `textContent`.
- Accesible: navegación con teclado, foco visible, textos alternativos y respeta «reducir movimiento».
- Al imprimir la página sale una versión limpia en blanco, útil como resumen en papel.

## Estructura

```
index.html          toda la página; cada texto está dos veces: <span class="es"> y <span class="en">
css/style.css       estilos (paleta, fuentes y modo oscuro)
js/main.js          idioma, vista por rol, copiar enlace y la demo
js/classifier.js    clasificador de Supplier Radar (copiado tal cual, licencia MIT)
js/messages.js      explicaciones del clasificador en español e inglés (Supplier Radar, MIT)
img/                capturas de las demos, favicon e imagen para compartir (og.png)
media/reels/        3 reels en bucle (mp4), sus portadas (jpg) y reels.json con enlaces y cifras de TikTok
```

## Cómo editarlo

- **Cambiar un texto:** búscalo en `index.html` y cambia las dos versiones (`es` y `en`).
- **Agregar o cambiar un reel:** pon el bucle (`-loop.mp4`, sin sonido) y su portada (`.jpg`) en `media/reels/` y copia una tarjeta `<article class="reel-card">` de la sección Contenido en `index.html`. La música queda solo en TikTok, porque su licencia no cubre la página.
- **Verlo en el PC antes de publicar:** desde la carpeta del sitio, `python -m http.server 8090` y abre `http://localhost:8090`.

## Cómo explicarlo en 2 minutos

> «Mi portafolio no es una lista de herramientas: son cuatro problemas reales y cómo los resolví.
>
> El primero viene de mi práctica en compras. El seguimiento de proveedores era manual: pedir documentos uno por uno y buscar las respuestas en Gmail. Construí cuatro automatizaciones en Google Workspace y las entregué con acta. La decisión clave fue no mandar los correos a una IA externa, porque el consentimiento no lo cubría, sino armar un motor de reglas con niveles de confianza: solo confirma lo que tiene evidencia fuerte y única, y lo dudoso va a una persona. En la página se puede probar en vivo, incluido un correo falso que pide cambiar la cuenta bancaria: el sistema no lo confirma porque Gmail no verificó al remitente. Y como los proveedores mandan fotos y escaneos con nombres que no dicen nada, lee cada documento por dentro y revisa que siga vigente: lo puse a prueba con 201 fotos difíciles y no aplicó ninguna sola con un error; lo dudoso va a una persona.
>
> El segundo, Supplier Scout, busca proveedores como lo hace compras: los distribuidores nacionales que ya le venden eso al Estado (datos abiertos de SECOP II), los proveedores que ya tengo, los negocios cercanos y búsquedas listas en internet, para llegar a tres cotizaciones. No me quedé con que «parece que funciona»: armé una prueba en vivo con datos reales, y los 58 proveedores que mostró tienen contratos bajo ese NIT. Esa misma prueba encontró fallas reales, como palabras ambiguas que traían empresas equivocadas («vigilancia» traía vigilancia epidemiológica), y las corregí.
>
> El tercero, la Mesa de Cotejo, nace de una ley nueva: desde noviembre de 2026, si una entidad de crédito no responde un reclamo por suplantación en 15 días hábiles, el reclamo se entiende resuelto a favor del cliente. Hice una mesa que calcula cada plazo con los festivos de Colombia, compara lo que se recibió al aprobar el crédito con lo que trae el cliente y une los casos que comparten dispositivo o asesor. Las fechas las calcula código, nunca la IA, y no hay botón de rechazar, porque eso solo lo decide un juez. Tiene 109 pruebas, 37 de ellas contra un calendario de festivos escrito a mano.
>
> El cuarto es mi negocio de impresión 3D, donde agentes de IA hacen diseño y marketing y yo dirijo y verifico. Ahí aprendí a medir antes de agrandar: lancé 189 agentes al tiempo y 165 no terminaron; con 9 bien acotados, terminaron los 9.
>
> Y cada caso dice qué le falta, porque prefiero que lo sepan por mí.»

Si preguntan por qué el sitio tiene «vistas por rol»: postulo a roles distintos (automatización, compras, IA, contenido) y en vez de cuatro portafolios hice uno que se reordena según quien lo mire, con un enlace para cada rol.

## Créditos

- Fuentes: IBM Plex Sans, IBM Plex Mono e Inter Tight (SIL Open Font License 1.1, ver `fonts/OFL-IBM-Plex.txt` y `fonts/OFL-Inter-Tight.txt`).
- Clasificador: [Supplier Radar](https://github.com/Dsergio909/supplier-radar), licencia MIT (copia al día del 3-nov-2026).
- Hecho con Claude Code.
