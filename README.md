# Portafolio · Sergio García

**[dsergio909.github.io](https://dsergio909.github.io/)** · Automatización de procesos, agentes de IA y contenido con IA. Bogotá, Colombia.

Sitio estático en español e inglés con cuatro casos (Supplier Radar, Supplier Scout, Mesa de Cotejo y FoxyMaker3D), cada uno con problema, qué construí, la decisión que defiendo, resultados con fuente y lo que aún falta.

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
- Diseño sobrio, el mismo de Supplier Radar y Supplier Scout: IBM Plex, fondo claro con banda oscura y un solo color de acento; modo oscuro automático.
- Fuentes servidas desde el propio sitio (SIL Open Font License, ver `fonts/`): cero peticiones a terceros, sin cookies ni rastreadores.
- Política de seguridad de contenido estricta (`<meta>`), todo lo dinámico se pinta con `textContent`.
- Accesible: navegación con teclado, foco visible, textos alternativos y respeta «reducir movimiento».
- Al imprimir la página sale una versión limpia en blanco, útil como resumen en papel.

## Estructura

```
index.html          toda la página; cada texto está dos veces: <span class="es"> y <span class="en">
css/style.css       estilos (paleta y fuentes iguales a Supplier Radar y Supplier Scout)
js/main.js          idioma, vista por rol, copiar enlace y la demo
js/classifier.js    clasificador de Supplier Radar (copiado tal cual, licencia MIT)
js/messages.js      explicaciones del clasificador en español e inglés (Supplier Radar, MIT)
img/                capturas de las demos, favicon e imagen para compartir (og.png)
```

## Cómo editarlo

- **Cambiar un texto:** búscalo en `index.html` y cambia las dos versiones (`es` y `en`).
- **Agregar el reel:** en `index.html`, quita `hidden` de `<div class="reel" id="reel" hidden>` y cambia el contenido de `.reel__frame` por el video (por ejemplo un `<video>` con `controls`, `playsinline`, `poster` y el archivo dentro de `img/`, o un enlace a YouTube).
- **Verlo en el PC antes de publicar:** desde la carpeta del sitio, `python -m http.server 8090` y abre `http://localhost:8090`.

## Cómo explicarlo en 2 minutos

> «Mi portafolio no es una lista de herramientas: son tres problemas reales y cómo los resolví.
>
> El primero viene de mi práctica en compras. El seguimiento de proveedores era manual: pedir documentos uno por uno y buscar las respuestas en Gmail. Construí cuatro automatizaciones en Google Workspace y las entregué con acta. La decisión clave fue no usar una API de IA para leer los correos, por el consentimiento de datos, sino un motor de reglas con niveles de confianza: solo confirma lo que tiene evidencia fuerte y única, y lo dudoso va a una persona. En la página se puede probar en vivo, incluido un correo falso que pide cambiar la cuenta bancaria: el sistema no lo confirma porque Gmail no verificó al remitente. Y como los proveedores mandan fotos y escaneos con nombres que no dicen nada, lee cada documento por dentro y revisa que siga vigente: lo puse a prueba con 201 fotos difíciles y no aplicó ninguna sola con un error; lo dudoso va a una persona.
>
> El segundo, Supplier Scout, busca proveedores como lo hace compras: los distribuidores nacionales que ya le venden eso al Estado (datos abiertos de SECOP II), los proveedores que ya tengo, los negocios cercanos y búsquedas listas en internet, para llegar a tres cotizaciones. No me quedé con que «parece que funciona»: armé una prueba en vivo con datos reales, y los 58 proveedores que mostró tienen contratos bajo ese NIT. Esa misma prueba encontró fallas reales, como palabras ambiguas que traían empresas equivocadas («vigilancia» traía vigilancia epidemiológica), y las corregí.
>
> El tercero es mi negocio de impresión 3D, donde agentes de IA hacen diseño y marketing y yo dirijo y verifico. Ahí aprendí a medir antes de escalar: 189 agentes en paralelo fallaron; 9 bien acotados terminaron todos.
>
> Y cada caso dice qué le falta, porque prefiero que lo sepan por mí.»

Si preguntan por qué el sitio tiene «vistas por rol»: postulo a roles distintos (automatización, compras, IA, contenido) y en vez de cuatro portafolios hice uno que se reordena según quien lo mire, con un enlace para cada rol.

## Créditos

- Fuentes: IBM Plex Sans y IBM Plex Mono (SIL Open Font License 1.1, ver `fonts/OFL-IBM-Plex.txt`).
- Clasificador: [Supplier Radar](https://github.com/Dsergio909/supplier-radar), licencia MIT (copia al día del 3-nov-2026).
- Hecho con Claude Code.
