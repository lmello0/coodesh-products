export class InvalidPathError extends Error {
  constructor(path: string) {
    super(`The given path '${path}' is invalid`);
  }
}
