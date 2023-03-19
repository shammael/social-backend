import jwt, { SignOptions } from "jsonwebtoken";

class Token {
  sign(
    value: string | object | Buffer,
    secret: string,
    options?: SignOptions
  ): string {
    return jwt.sign(value, secret, options);
  }

  verify<T>(value: string, secret: string) {
    return jwt.verify(value, secret) as T;
  }
}

export default new Token();
