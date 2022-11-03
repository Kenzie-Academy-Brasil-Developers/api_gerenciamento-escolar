class appError extends Error {
  statusCode: number;
  data: null;

  constructor(message: string, statusCode: number = 400) {
    super();

    this.message = message;
    this.statusCode = statusCode;
  }
}

export { appError };
