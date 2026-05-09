/**
 * Reglas laboratorio: mín 8 caracteres, 1 mayúscula, 1 dígito,
 * 1 carácter especial entre # $ % & * @
 */
export function isStrongPassword(password) {
  if (typeof password !== 'string' || password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/\d/.test(password)) return false;
  if (!/[#$%&*@]/.test(password)) return false;
  return true;
}

export function passwordValidationMessage() {
  return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un dígito y un carácter especial (# $ % & * @)';
}
