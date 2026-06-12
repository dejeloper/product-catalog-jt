# Product Catalog - Development Specification

## Estado del Proyecto

### Configuración Inicial

- [x] Crear proyecto frontend.
- [x] Configurar estructura de carpetas.
- [ ] Configurar manejo de estados.
- [x] Configurar cliente HTTP para consumo de API.
- [x] Configurar variables de entorno si son necesarias.
- [x] Configurar sistema de estilos.
- [x] Configurar linting y formateo.
- [x] Configurar repositorio Git.

---

# DAT-001 - Consumo de Datos

## Objetivo

Consumir información desde:

```http
GET https://dummyjson.com/products
```

## Requisitos

- [x] Obtener listado de productos desde API.
- [x] Manejar estado de carga.
- [x] Manejar errores de red.
- [x] Transformar datos si es necesario.
- [x] Exponer información al catálogo.

## Campos requeridos

- [x] id
- [x] title
- [x] price
- [x] category
- [x] stock
- [x] rating
- [x] images

## Campos requeridos para detalle

- [x] description
- [x] dimensions
- [x] reviews

---

# CAT-001 - Catálogo de Productos

## Objetivo

Mostrar todos los productos disponibles.

## Requisitos

- [x] Renderizar listado dinámico.
- [x] Mostrar imagen principal.
- [x] Mostrar nombre.
- [x] Mostrar precio.
- [x] Mostrar categoría.
- [x] Mostrar stock.
- [x] Mostrar calificación.

## Criterios de aceptación

- [x] Todos los productos recibidos son visibles.
- [x] No existen productos hardcodeados.
- [x] La información proviene exclusivamente de la API.

---

# IMG-001 - Gestión de Imágenes

## Objetivo

Permitir navegar entre imágenes de un producto.

## Requisitos

- [x] Detectar cantidad de imágenes.
- [x] Mostrar imagen única cuando exista una sola.
- [x] Mostrar carrusel cuando existan múltiples imágenes.
- [x] Permitir navegación hacia adelante.
- [x] Permitir navegación hacia atrás.

## Criterios de aceptación

- [x] El usuario puede visualizar todas las imágenes disponibles.
- [x] No se rompe la interfaz cuando falta alguna imagen.

---

# DET-001 - Detalle de Producto

## Objetivo

Mostrar información ampliada de un producto.

## Requisitos

- [x] Permitir abrir detalle desde catálogo.
- [x] Mostrar título.
- [x] Mostrar precio.
- [x] Mostrar categoría.
- [x] Mostrar stock.
- [x] Mostrar rating.
- [x] Mostrar descripción.
- [x] Mostrar dimensiones.
- [x] Mostrar reviews.
- [x] Mostrar imágenes asociadas.

## Navegación

- [x] Permitir regresar al catálogo.

## Criterios de aceptación

- [x] La información mostrada corresponde al producto seleccionado.
- [x] El detalle se actualiza correctamente al seleccionar otro producto.

---

# ORD-001 - Ordenamiento por Precio

## Objetivo

Permitir ordenar productos por precio.

## Requisitos

- [x] Orden ascendente.
- [x] Orden descendente.

## Criterios de aceptación

- [x] El orden se aplica inmediatamente.
- [x] No requiere nueva consulta a la API.

---

# ORD-002 - Ordenamiento por Calificación

## Objetivo

Permitir ordenar productos por rating.

## Requisitos

- [x] Orden ascendente.
- [x] Orden descendente.

## Criterios de aceptación

- [x] El orden se aplica inmediatamente.
- [x] No requiere nueva consulta a la API.

---

# CAR-001 - Agregar al Carrito

## Objetivo

Permitir agregar productos al carrito.

## Requisitos

- [ ] Agregar producto desde catálogo.
- [ ] Agregar producto desde detalle.
- [ ] Actualizar estado del carrito.

## Criterios de aceptación

- [ ] El producto aparece en el carrito.
- [ ] El contador del carrito se actualiza.

---

# CAR-002 - Eliminar del Carrito

## Objetivo

Permitir remover productos del carrito.

## Requisitos

- [ ] Eliminar producto agregado.
- [ ] Actualizar estado del carrito.

## Criterios de aceptación

- [ ] El producto desaparece del carrito.
- [ ] Los totales se recalculan correctamente.

---

# CAR-003 - Visualización del Carrito

## Objetivo

Permitir visualizar el estado actual del carrito.

## Requisitos

- [ ] Mostrar productos agregados.
- [ ] Mostrar cantidad.
- [ ] Mostrar precio unitario.
- [ ] Mostrar subtotal por producto.

## Criterios de aceptación

- [ ] El carrito refleja el estado actual de la aplicación.

---

# UI-001 - Feedback Visual

## Requisitos

### Agregar producto

- [ ] Mostrar confirmación visual.

### Eliminar producto

- [ ] Mostrar actualización visual inmediata.

### Apertura de detalle

- [ ] Mostrar transición o indicador de carga cuando aplique.

---

# UI-002 - Responsive Design

## Requisitos

### Mobile

- [ ] Adaptación correcta.

### Tablet

- [ ] Adaptación correcta.

### Desktop

- [ ] Adaptación correcta.

## Criterios de aceptación

- [ ] No existe scroll horizontal.
- [ ] El catálogo se reorganiza automáticamente.
- [ ] El carrusel funciona correctamente en dispositivos táctiles.

---

# STA-001 - Estados de Aplicación

## Loading

- [x] Mostrar indicador de carga durante consultas.

## Error

- [x] Mostrar mensaje de error cuando falle la API.

## Estado vacío

- [x] Mostrar mensaje cuando no existan productos.

---

# ACC-001 - Accesibilidad

## Requisitos

- [x] Navegación por teclado.
- [x] Texto alternativo para imágenes.
- [x] Contraste adecuado.
- [x] Componentes interactivos identificables.

---

# QUA-001 - Calidad

## Requisitos

- [x] Código tipado (si aplica).
- [x] Componentes reutilizables.
- [x] Separación de responsabilidades.
- [ ] Manejo centralizado de estados.

---

# TEST-001 - Pruebas Unitarias (Extra)

## Requisitos

- [ ] Ordenamiento por precio.
- [ ] Ordenamiento por rating.
- [ ] Agregado al carrito.
- [ ] Eliminación del carrito.

---

# TEST-002 - Pruebas de Integración (Extra)

## Requisitos

- [ ] Consumo de API.
- [ ] Renderizado de catálogo.
- [ ] Apertura de detalle.
- [ ] Flujo de carrito.

---

# DOC-001 - Entrega

## Requisitos

- [x] Repositorio GitHub.
- [x] README.
- [x] Instrucciones de instalación.
- [x] Instrucciones de ejecución.
- [ ] Instrucciones de pruebas.

---

# Extras No Requeridos

## Funcionalidades

- [ ] Persistencia de carrito en localStorage.
- [ ] Buscador por nombre.
- [ ] Filtro por categoría.
- [ ] Paginación.
- [x] Lazy loading de imágenes.
- [x] Skeleton loaders.
- [ ] Dark mode.
- [x] Animaciones.

## Calidad

- [ ] Cobertura de pruebas superior al 80%.
- [ ] Pruebas E2E.
- [ ] CI/CD.

## Deploy

- [x] Deploy en Vercel.
- [x] URL pública funcional.
