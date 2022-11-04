class appError extends Error {
    status: number;
  
    constructor(message: string, statusCode: number = 400) {
      super();
  
      this.message = message;
      this.status = statusCode;
    }
  }
  
  export { appError };