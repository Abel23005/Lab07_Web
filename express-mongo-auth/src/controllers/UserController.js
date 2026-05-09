import mongoose from 'mongoose';
import userService from '../services/UserService.js';

class UserController {
  async getAll(req, res, next) {
    try {
      const users = await userService.getAll();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        const err = new Error('Usuario no encontrado');
        err.status = 404;
        throw err;
      }
      const user = await userService.getById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async getMe(req, res, next) {
    try {
      const user = await userService.getById(req.userId);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async updateMe(req, res, next) {
    try {
      const user = await userService.updateProfile(req.userId, req.body);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
