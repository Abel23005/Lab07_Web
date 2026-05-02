import bcrypt from 'bcrypt';
import userRepository from '../repositories/UserRepository.js';
import roleRepository from '../repositories/RoleRepository.js';

export default async function seedUsers() {
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@lab.local';
  const plainPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin#12345';

  const existing = await userRepository.findByEmail(email);
  if (existing) {
    console.log('Seed admin: ya existe', email);
    return;
  }

  const adminRole = await roleRepository.findByName('admin');
  if (!adminRole) {
    console.error('Seed admin: rol admin no encontrado');
    return;
  }

  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);
  const hashed = await bcrypt.hash(plainPassword, saltRounds);

  await userRepository.create({
    email,
    password: hashed,
    name: 'Admin',
    lastName: 'Sistema',
    phoneNumber: '00000000',
    birthdate: new Date('1990-01-01'),
    url_profile: '',
    adress: '',
    roles: [adminRole._id]
  });

  console.log(`Seed admin creado: ${email} (contraseña en SEED_ADMIN_PASSWORD / .env)`);
}
