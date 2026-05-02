import bcrypt from 'bcrypt';
import userRepository from '../repositories/UserRepository.js';
import { calculateAge } from '../utils/age.js';
import { isStrongPassword, passwordValidationMessage } from '../utils/passwordValidator.js';

function mapUser(user) {
  if (!user) return null;
  const roles = user.roles.map(r => r.name);
  return {
    id: user._id,
    email: user.email,
    name: user.name,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    birthdate: user.birthdate,
    age: calculateAge(user.birthdate),
    url_profile: user.url_profile,
    adress: user.adress,
    roles,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

class UserService {
  async getAll() {
    const users = await userRepository.getAll();
    return users.map(u => mapUser(u));
  }

  async getById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      const err = new Error('Usuario no encontrado');
      err.status = 404;
      throw err;
    }
    return mapUser(user);
  }

  async updateProfile(userId, body) {
    const user = await userRepository.findById(userId);
    if (!user) {
      const err = new Error('Usuario no encontrado');
      err.status = 404;
      throw err;
    }

    const updates = {};

    if (body.name !== undefined) updates.name = body.name;
    if (body.lastName !== undefined) updates.lastName = body.lastName;
    if (body.phoneNumber !== undefined) updates.phoneNumber = body.phoneNumber;
    if (body.url_profile !== undefined) updates.url_profile = body.url_profile;
    if (body.adress !== undefined) updates.adress = body.adress;

    if (body.birthdate !== undefined) {
      const bd = new Date(body.birthdate);
      if (Number.isNaN(bd.getTime())) {
        const err = new Error('birthdate inválido');
        err.status = 400;
        throw err;
      }
      updates.birthdate = bd;
    }

    if (body.password !== undefined && body.password !== '') {
      if (!isStrongPassword(body.password)) {
        const err = new Error(passwordValidationMessage());
        err.status = 400;
        throw err;
      }
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);
      updates.password = await bcrypt.hash(body.password, saltRounds);
    }

    const updated = await userRepository.updateById(userId, updates);
    return mapUser(updated);
  }
}

export default new UserService();
