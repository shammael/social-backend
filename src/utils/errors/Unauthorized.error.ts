class UnauthorizedError extends Error {
  statusCode = 401;
  name = "Unauthorized Error";
  messages: { message: string; field: string }[] = [];

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export default UnauthorizedError;
