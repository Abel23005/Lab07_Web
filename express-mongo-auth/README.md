# Express + MongoDB + JWT (fullstack)

API REST con autenticación JWT y frontend con **EJS** + **Materialize**.

*(Si tu carpeta padre se llama `lab007`, todo el código del laboratorio está aquí dentro.)*

## Requisitos

- Node.js 18+
- MongoDB local (`mongodb://localhost:27017`) o URI compatible (Atlas).

## Configuración

1. Copia `.env.example` a `.env` y ajusta variables.
2. Instala dependencias: `npm install`
3. Arranca MongoDB y ejecuta: `npm run dev`

Abre `http://localhost:3000/signin`.

## Estructura del proyecto

```
express-mongo-auth/
├── docs/
│   └── entrega/          # Coloca aquí capturas PDF/imágenes para el informe (opcional)
├── public/               # Estáticos (CSS, JS cliente)
│   ├── css/
│   └── js/
├── src/
│   ├── config/           # Rutas del proyecto (paths)
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── repositories/
│   ├── routes/           # API + rutas web (HTML)
│   ├── services/
│   ├── utils/
│   ├── app.js            # Fábrica Express (middlewares y rutas)
│   └── server.js         # Arranque: MongoDB + seeds + listen
├── views/
│   ├── partials/         # Layout EJS compartido
│   └── pages/            # Pantallas por ruta
├── .env.example
├── .gitattributes
└── package.json
```

## Antes de subir a GitHub

1. Confirma que **no existe** `.env` en el commit: solo debe estar **`.env.example`** (sin secretos reales).
2. No subas **`node_modules/`** (ya está en `.gitignore`).
3. Si en algún momento subiste `.env` por error: `git rm --cached .env` y vuelve a hacer commit.
4. Desde esta carpeta: `git init`, `git add .`, `git commit -m "..."`, enlaza `origin` y `git push`.

## Scripts

| Script      | Descripción                    |
|------------|--------------------------------|
| `npm run dev`  | Servidor con recarga (nodemon) |
| `npm start`    | Producción (`node src/server.js`) |

## Endpoints útiles

- `GET /health` — comprobación del servidor.
- `POST /api/auth/signUp`, `POST /api/auth/signIn`
- `GET/PATCH /api/users/me` (JWT)
- `GET /api/users`, `GET /api/users/:id` (admin)
