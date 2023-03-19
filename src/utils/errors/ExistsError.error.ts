class BadRequest extends Error {
  statusCode = 400;
  name = "Bad Request";
  messages: { message: string; field: string }[] = [];

  constructor(readonly message: string) {
    super(message);
  }
}

export default BadRequest;
