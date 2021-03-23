export class ApiError extends Error {
  readonly status: number;

  constructor(
    message = '',
    status = 500,
  ) {
    super(message);
    this.status = status;
  }
}
