import bcrypt from "bcryptjs";

class PasswordEncrypter {
  private readonly salt = 10;

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.salt);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export default new PasswordEncrypter();
