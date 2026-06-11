# Product Catalog

Este es un proyecto de **prueba técnica** que consiste en un catálogo de productos que consume la API pública de [DummyJSON](https://dummyjson.com/).

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

- **Angular 21** (standalone components, signals, zoneless)
- **pnpm** como gestor de paquetes
- **TypeScript**
- **Tailwind CSS v4**
- **DummyJSON API** (`GET https://dummyjson.com/products`)

## API

El proyecto usa un solo endpoint de DummyJSON que devuelve productos con campos como `id`, `title`, `price`, `category`, `stock`, `rating`, `thumbnail`, `images`, `description`, `dimensions` y `reviews`.

## Estructura del proyecto

```
src/
├── app/
│   ├── components/       # Componentes reutilizables (ProductCard)
│   ├── models/           # Interfaces de datos (Product, ProductsResponse)
│   ├── pages/            # Páginas de la aplicación (ProductsPage)
│   ├── services/         # Servicios de datos (ProductService)
│   └── app.routes.ts     # Configuración de rutas
├── environments/         # Variables de entorno
└── main.ts               # Punto de entrada
```

## Licencia

Este proyecto es de carácter educativo como parte de una prueba técnica.
