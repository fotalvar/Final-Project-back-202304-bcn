class CustomError extends Error {
  publicMessage: any;
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export default CustomError;
