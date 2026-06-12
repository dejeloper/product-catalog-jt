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

## Ejecutar tests

```bash
pnpm run test
```

Los tests están implementados con **Vitest** (vía `@angular/build:unit-test`) — **+130 tests, 14 archivos, 0 fallos**.

### Escribir tests

Los tests se colocan junto al archivo que prueban con el sufijo `.spec.ts`. El proyecto usa `TestBed` de Angular y Vitest.

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { MiComponente } from './mi-componente.component';

describe('MiComponente', () => {
  let fixture: ComponentFixture<MiComponente>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(MiComponente);
    await fixture.whenStable();
  });

  it('debería hacer algo', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
```

Para servicios que usan `HttpClient`:

```typescript
TestBed.configureTestingModule({
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideHttpClientTesting(),
  ],
});
```

| Archivo | Tests | Cobertura |
|---|---|---|
| `cart.service.spec.ts` | 32 | `add`, `updateQuantity`, `remove`, `clear`, `count`, `total`, `stockLimitReached`, `localStorage`, `removingItems/timer` |
| `products.page.spec.ts` | 20 | `toggleSort`, `openDetail`, `closeDetail`, `categories`, `filteredProducts`, `sortedProducts`, `ngOnInit` |
| `image-carousel.component.spec.ts` | 19 | `currentIndex`, `prev`, `next`, `goTo`, `isSingle`, template rendering, dot navigation |
| `product-detail.component.spec.ts` | 7 | `cartItem`, `onAddToCart`, `onIncrement`, `onDecrement`, `isRemoving` |
| `star-rating.component.spec.ts` | 6 | `aria-label`, width calculation, size classes |
| `modal.component.spec.ts` | 6 | escape key, body scroll lock, overlay/panel click |
| `cart-dropdown.component.spec.ts` | 6 | toggle, route guard, badge, escape, outside click |
| `product-card.component.spec.ts` | 5 | click/keyboard events, add to cart, stock limit |
| `product.mapper.spec.ts` | 5 | field mapping, email/date stripping, edge cases |
| `product-sort.component.spec.ts` | 3 | emit event, active state, arrow direction |
| `product.service.spec.ts` | 3 | fetch & map, empty list, HTTP error propagation |
| `app.spec.ts` | 4 | component creation, header, router-outlet, cart-dropdown |
| `cart.page.spec.ts` | 2 | component creation, empty state |
| `test-import.spec.ts` | 1 | path alias resolution |

## Construido con

- **Angular 21** (standalone components, signals, zoneless change detection)
- **pnpm** como gestor de paquetes
- **TypeScript**
- **Tailwind CSS v4**
- **Vitest** para pruebas unitarias
- **DummyJSON API** (`GET https://dummyjson.com/products`)

## Funcionalidades

### Catálogo de productos (`/products`)

- Listado con búsqueda por nombre, filtro por categoría y ordenamiento (precio, rating, nombre, ID).
- Esqueletos animados (skeletons) durante la carga.
- Vista detalle en modal lateral (drawer) con carrusel de imágenes, reseñas y dimensiones.

### Carrito de compras (`/cart`)

- Agregar/quitar productos, control de cantidad con límite de stock.
- Eliminación diferida con timer de 5 segundos y transición de fade-out.
- Persistencia en `localStorage`.
- Indicador "Sin stock" cuando se alcanza el máximo disponible.

### Modo oscuro

- Toggle manual desde el header con persistencia en `localStorage`.
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
├── index.html                         # Entry point HTML
├── main.ts                            # Bootstrap de Angular
├── styles.css                         # Estilos globales
├── environments/
│   ├── environment.ts                 # Variables de entorno (dev)
│   └── environment.prod.ts            # Variables de entorno (prod)
└── app/
    ├── app.config.ts                  # Configuración global (providers)
    ├── app.routes.ts                  # Definición de rutas
    ├── app.ts                         # Componente raíz
    ├── app.html                       # Template raíz (header + router-outlet)
    ├── app.spec.ts                    # Test del componente raíz
    ├── test-import.spec.ts            # Test de path aliases
    ├── models/
    │   └── product.interface.ts       # Interfaces Product, RawProduct, Review, Dimensions
    ├── mappers/
    │   ├── product.mapper.ts          # Mapeo RawProduct → Product
    │   └── product.mapper.spec.ts     # Tests del mapper
    ├── services/
    │   ├── product.service.ts         # Llamada HTTP a DummyJSON
    │   ├── product.service.spec.ts    # Tests del servicio de productos
    │   ├── cart.service.ts            # Estado del carrito (signals + localStorage)
    │   └── cart.service.spec.ts       # Tests del carrito
    ├── pages/
    │   ├── products/
    │   │   ├── products.page.ts       # Página de listado
    │   │   ├── products.page.html     # Template del listado
    │   │   └── products.page.spec.ts  # Tests
    │   └── cart/
    │       ├── cart.page.ts           # Página de carrito
    │       ├── cart.page.html         # Template del carrito
    │       └── cart.page.spec.ts      # Tests
    └── components/
        ├── products/
        │   ├── product-card.component.ts/html      # Tarjeta de producto
        │   ├── product-card.component.spec.ts
        │   ├── product-detail.component.ts/html    # Detalle en modal
        │   ├── product-detail.component.spec.ts
        │   ├── product-sort.component.ts/html      # Controles de orden
        │   └── product-sort.component.spec.ts
        ├── cart/
        │   ├── cart-dropdown.component.ts/html     # Dropdown del carrito
        │   └── cart-dropdown.component.spec.ts
        └── shared/
            ├── star-rating.component.ts/html       # Estrellas de calificación
            ├── star-rating.component.spec.ts
            ├── image-carousel.component.ts/html    # Carrusel de imágenes
            ├── image-carousel.component.spec.ts
            ├── modal.component.ts/html             # Modal lateral (drawer)
            └── modal.component.spec.ts
```

## Licencia

Este proyecto es de carácter educativo como parte de una prueba técnica.
