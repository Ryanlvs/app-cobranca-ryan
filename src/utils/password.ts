const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

export async function saltAndHashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePassword(
  password: String,
  hashedPassword: String
) {
  return await bcrypt.compare(password, hashedPassword);
}
