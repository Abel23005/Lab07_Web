import dotenv from 'dotenv';
import path from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { createApp } from './app.js';
import seedRoles from './utils/seedRoles.js';
import seedUsers from './utils/seedUsers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envApp = path.join(__dirname, '..', '.env');
const envRepoRoot = path.join(__dirname, '..', '..', '.env');
if (existsSync(envApp)) dotenv.config({ path: envApp });
else if (existsSync(envRepoRoot)) dotenv.config({ path: envRepoRoot });
else dotenv.config();

const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
const app = createApp();

if (!mongoUri) {
  console.error('Falta MONGODB_URI o MONGO_URI en el entorno (.env o variables del host).');
  process.exit(1);
}

mongoose
  .connect(mongoUri, { autoIndex: true })
  .then(async () => {
    console.log('Mongo connected');
    await seedRoles();
    await seedUsers();
    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
  })
  .catch(err => {
    console.error('Error al conectar con Mongo:', err);
    process.exit(1);
  });
