export function APIError(message) {
  const error = Error.call(this, message);

  this.name = 'APIError';
  this.message = error.message;
  this.stack = error.stack;
  this.expose = true;
}

APIError.prototype = Object.create(Error.prototype);
APIError.prototype.constructor = APIError;
