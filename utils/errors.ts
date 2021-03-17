export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class InsufficientPrivilegesError extends Error {
  constructor(message) {
    super(message);
    this.name = "InsufficientPrivilegesError";
  }
}

export const convertErrorToStatusCode = (error: Error) => {
  if (error instanceof NotFoundError) {
    return 404;
  }

  if (error instanceof InsufficientPrivilegesError) {
    return 401;
  }

  return 500;
};
