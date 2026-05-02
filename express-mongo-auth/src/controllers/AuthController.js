import authService from '../services/AuthService.js';

class AuthController {
  async signUp(req, res, next) {
    try {
      const payload = req.body;
      const required = ['email', 'password', 'name', 'lastName', 'phoneNumber', 'birthdate'];
      const missing = required.filter(k => payload[k] === undefined || payload[k] === '');
      if (missing.length) {
        return res.status(400).json({
          message: `Campos requeridos: ${missing.join(', ')}`
        });
      }
      const user = await authService.signUp({
        email: payload.email,
        password: payload.password,
        name: payload.name,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
        birthdate: payload.birthdate,
        url_profile: payload.url_profile,
        adress: payload.adress,
        roles: ['user']
      });
      return res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'El email y password son requeridos' });
      }
      const token = await authService.signIn({ email, password });
      return res.status(200).json(token);
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
