import express from 'express';
import UserController from '../controllers/UserController.js';
import authenticate from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

const router = express.Router();

router.get('/me', authenticate, authorize([]), UserController.getMe.bind(UserController));
router.patch('/me', authenticate, authorize([]), UserController.updateMe.bind(UserController));

router.get('/', authenticate, authorize(['admin']), UserController.getAll.bind(UserController));
router.get(
  '/:id',
  authenticate,
  authorize(['admin']),
  UserController.getById.bind(UserController)
);

export default router;
