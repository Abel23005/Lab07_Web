import express from 'express';
import cors from 'cors';
import path from 'path';
import { ROOT_DIR } from './config/paths.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import webRoutes from './routes/web.routes.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(ROOT_DIR, 'public')));

  app.set('view engine', 'ejs');
  app.set('views', path.join(ROOT_DIR, 'views'));

  app.get('/health', (req, res) => res.status(200).json({ ok: true }));

  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/', webRoutes);

  app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return res.status(404).json({ message: 'Recurso no encontrado' });
    }
    next();
  });

  app.use((req, res) => {
    res.status(404).render('pages/not-found', { title: 'No encontrada' });
  });

  app.use((err, req, res, next) => {
    console.error(err);
    if (req.originalUrl.startsWith('/api')) {
      return res.status(err.status || 500).json({
        message: err.message || 'Error interno del servidor'
      });
    }
    res.status(err.status || 500).send(err.message || 'Error');
  });

  return app;
}
