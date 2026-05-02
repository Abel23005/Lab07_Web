import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.redirect(302, '/signin'));

router.get(['/signin', '/signIn'], (req, res) =>
  res.render('pages/signIn', { title: 'Iniciar sesión' })
);

router.get(['/signup', '/signUp'], (req, res) =>
  res.render('pages/signUp', { title: 'Crear cuenta' })
);

router.get('/profile', (req, res) =>
  res.render('pages/profile', { title: 'Mi cuenta' })
);

router.get('/dashboard/user', (req, res) =>
  res.render('pages/dashboard-user', { title: 'Panel de usuario' })
);

router.get('/dashboard/admin', (req, res) =>
  res.render('pages/dashboard-admin', { title: 'Panel de administración' })
);

router.get('/dashboard/admin/user/:id', (req, res) =>
  res.render('pages/admin-user-detail', {
    title: 'Ficha de usuario',
    userId: req.params.id
  })
);

router.get('/403', (req, res) =>
  res.render('pages/forbidden', { title: 'Acceso denegado' })
);

export default router;
