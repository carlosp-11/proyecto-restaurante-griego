# El Olivo Azul

Web de un restaurante ficticio de cocina griega de autor. Proyecto de la PEC 1 de **M4.257 Herramientas HTML y CSS** (Máster Universitario en Desarrollo de Sitios y Aplicaciones Web, UOC).

## Requisitos

- Node.js 20 o superior (incluye npm)

## Instalación y uso

```bash
npm install      # instala las dependencias
npm start        # servidor de desarrollo en http://localhost:1234
npm run build    # versión de producción en dist/
```

| Script | Qué hace |
|---|---|
| `npm start` | Borra `dist` y `.parcel-cache` y arranca el servidor de desarrollo con recarga automática |
| `npm run build` | Borra `dist` y `.parcel-cache` y genera la versión de producción (minificada y compatible con navegadores antiguos) |
| `npm run clean` | Solo borra `dist` y `.parcel-cache` |

## Páginas

| URL | Contenido |
|---|---|
| `/` | Portada |
| `/categoria` | Carta con todos los platos y filtro por tipo |
| `/det1` | Detalle: musaka |
| `/det2` | Detalle: souvlaki |
| `/restaurante` | El restaurante y su horario |
| `/reservas` | Formulario de reserva (demostración, no envía datos) |
| `/links` | Fuentes, créditos y uso de inteligencia artificial |

## Estructura

```
src/
├── index.html          portada
├── categoria/ det1/ det2/ restaurante/ reservas/ links/
├── partials/           bloques HTML reutilizables (head, cabecera, pie, tarjeta de plato, vídeo)
├── scss/               estilos en Sass por capas
│   ├── abstracts/      variables y mixins
│   ├── base/           reset y tipografía
│   ├── layout/         contenedor, cabecera y pie
│   ├── components/     botón, tarjeta, carrusel, filtro, galería, vídeo, tabla, formulario…
│   └── pages/          estilos propios de cada página
├── js/                 módulos: menú, carrusel, filtro y formulario
└── img/                imágenes (JPG y PNG)
```

## Herramientas

- **Parcel** como empaquetador, con **Sass** y **PostHTML** (`posthtml-include`) para los parciales HTML.
- **Swiper** para el carrusel de la portada.
- **Browserslist**: en producción se da soporte a los navegadores publicados desde 2016; en desarrollo, solo a la última versión de Chrome, Firefox y Safari.

## Créditos

Las fuentes del contenido, las licencias de terceros y el uso de inteligencia artificial están detallados en la página `/links`.

Autor: Carlos Ponce
