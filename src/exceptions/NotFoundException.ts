export class NotFoundException extends Error {
  constructor() {
    super('No product found with the given code');
  }
}
