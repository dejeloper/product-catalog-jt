# Product Catalog

Este es un proyecto de **prueba técnica** que consiste en un catálogo de productos con carrito de compras, que consume la API pública de [DummyJSON](https://dummyjson.com/).

Desarrollado por [**Jhonatan Guerrero**](https://dejeloper.com) — [@dejeloper](https://github.com/dejeloper)

---

## Descargar el código

```bash
git clone https://github.com/dejeloper/product-catalog-jt.git
cd product-catalog-jt
```

## Levantar el proyecto

```bash
pnpm install
pnpm run dev
```

Abrir en el navegador: `http://localhost:4200`

## Construido con

- **Angular 21** (standalone components, signals, zoneless change detection)
- **pnpm** como gestor de paquetes
- **TypeScript**
- **Tailwind CSS v4**
- **DummyJSON API** (`GET https://dummyjson.com/products`)

## Funcionalidades

### Catálogo de productos (`/products`)
- Listado con búsqueda por nombre, filtro por categoría y ordenamiento (ID, nombre, precio, rating).
- Esqueletos animados (skeletons) durante la carga.
- Vista detalle en modal lateral (drawer) con carrusel de imágenes, reseñas y dimensiones.

### Carrito de compras (`/cart`)
- Agregar/quitar productos, control de cantidad con límite de stock.
- Eliminación diferida con timer de 5 segundos y transición de fade-out.
- Persistencia en `localStorage`.
- Indicador "Sin stock" cuando se alcanza el máximo disponible.

### Modo oscuro
- Toggle manual desde el header (🌙/☀️) con persistencia en `localStorage`.
- Fallback automático a `prefers-color-scheme` del sistema operativo.

### Dropdown de carrito
- Acceso rápido desde el header con badge de cantidad.
- Cierre automático al hacer clic fuera o presionar Escape.
- Deshabilitado en la página del carrito.

## API

El proyecto usa un solo endpoint de DummyJSON (`GET /products`) que devuelve productos con campos como `id`, `title`, `price`, `category`, `stock`, `rating`, `thumbnail`, `images`, `description`, `dimensions` y `reviews`.

## Estructura del proyecto

```
src/
├── index.html                     # Entry point HTML
├── main.ts                        # Bootstrap de Angular
├── environments/
│   ├── environment.ts             # Variables de entorno (dev)
│   └── environment.prod.ts        # Variables de entorno (prod)
└── app/
    ├── app.config.ts              # Configuración global (providers)
    ├── app.routes.ts              # Definición de rutas
    ├── app.ts                     # Componente raíz
    ├── app.html                   # Template raíz (header + router-outlet)
    ├── app.spec.ts                # Test unitario del componente raíz
    ├── models/
    │   └── product.interface.ts   # Interfaces Product, RawProduct, Review, Dimensions
    ├── mappers/
    │   └── product.mapper.ts      # Mapeo de RawProduct → Product
    ├── services/
    │   ├── product.service.ts     # Llamada HTTP a DummyJSON
    │   └── cart.service.ts        # Estado del carrito (signals + localStorage)
    ├── pages/
    │       ├── products/                    # Página de listado de productos
    │   ├── products.page.ts/html    # Listado con búsqueda, filtro y orden
    │   └── products.page.spec.ts    # Test unitario
    ├── cart/                        # Página de carrito de compras
    │   └── cart.page.ts/html
    └── components/
        ├── products/                # Componentes del catálogo
        │   ├── product-card.component.ts/html
        │   ├── product-detail.component.ts/html
        │   └── product-sort.component.ts/html
        ├── cart/
        │   └── cart-dropdown.component.ts/html
        └── shared/                  # Componentes reutilizables
            ├── star-rating.component.ts/html
            ├── image-carousel.component.ts/html
            └── modal.component.ts/html
```

## Licencia

Este proyecto es de carácter educativo como parte de una prueba técnica.
