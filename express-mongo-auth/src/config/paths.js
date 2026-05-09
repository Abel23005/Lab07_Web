import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Raíz del proyecto (directorio que contiene package.json). */
export const ROOT_DIR = path.join(__dirname, '..', '..');
