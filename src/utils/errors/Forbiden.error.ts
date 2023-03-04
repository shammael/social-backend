class ForbidenError extends Error {
  status = 403;
  messages: { message: string; field: string }[] = [];
  name = "Forbiden Error";

  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, ForbidenError.prototype);
  }
}

export default ForbidenError;
