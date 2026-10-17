\# Mini Marketplace



App pequeña donde se consultan productos, se agregan a un carrito y se confirma un pedido.

El catálogo viene de DummyJSON; los pedidos se guardan en el backend.



\- Backend: Node.js + Express

\- Frontend: React + Vite

\- Persistencia: en memoria



\## Requisitos



\- Node.js 20.19+ (yo usé Node 24)

\- npm



\## Cómo correr



Backend:



```bash

cd backend

npm install

npm start

```



Queda en http://localhost:3000



Frontend (en otra terminal):



```bash

cd frontend

npm install

npm run dev

```



Queda en http://localhost:5173



El frontend redirige `/api/\*` al backend con el proxy de Vite, así que no hay problema de CORS en local.



Tests:



```bash

cd backend

npm test

```



\## Endpoints



\- `GET /api/products` → lista de productos (`id`, `title`, `price`, `thumbnail`)

\- `GET /api/products/:id` → un producto por id

\- `POST /api/orders` → crea un pedido

\- `GET /api/orders` → pedidos, más reciente primero



`POST /api/orders` solo recibe `productId` y `quantity`. El backend calcula los precios con su propio catálogo.



Ejemplo válido:



```bash

curl -X POST http://localhost:3000/api/orders \\

&#x20; -H "Content-Type: application/json" \\

&#x20; -d '{"items":\[{"productId":1,"quantity":2}]}'

```



Ejemplo inválido (cantidad fuera de rango):



```bash

curl -X POST http://localhost:3000/api/orders \\

&#x20; -H "Content-Type: application/json" \\

&#x20; -d '{"items":\[{"productId":1,"quantity":99}]}'

```



Respuesta: `{"message":"La cantidad debe ser un entero entre 1 y 10"}`



\## Notas



\- \*\*Persistencia en memoria:\*\* los pedidos se pierden al reiniciar el backend. Está todo aislado en `store/memory.js`, así que migrar a MongoDB sería reescribir solo ese archivo.

\- \*\*Precios en el servidor:\*\* el backend ignora cualquier precio que mande el cliente.

\- \*\*Extras implementados:\*\* búsqueda por nombre, `GET /api/products/:id`, carrito que se conserva al recargar (`localStorage`) y tests del validador.

\- \*\*Pruebas manuales:\*\* usé Postman para probar y confirmar cada endpoint (casos válidos e inválidos: cantidad fuera de rango, `productId` duplicado, producto inexistente).



\## Qué completé



Flujo completo (ver productos → agregar → confirmar → historial), los tres endpoints obligatorios más el extra, validaciones de la sección 06, estados de carga/vacío/error en la UI, y los cuatro extras de la sección 09.



\## Qué quedó pendiente



MongoDB real (usé memoria por decisión documentada), caché del catálogo si DummyJSON falla, y diseño elaborado.



\## Qué mejoraría



Migrar a MongoDB sin tocar el resto, caché con fallback cuando DummyJSON falla, tests de integración del flujo de pedidos, y Docker Compose para levantar todo con un comando.

