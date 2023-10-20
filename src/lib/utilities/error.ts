import Util from 'util';
import Cuid from 'cuid';

export class GeneralError extends Error {
  code: number;

  debugId: string;

  name: string;

  message: string;

  path: string | undefined;

  details: string;

  logOnly: boolean;

  constructor(
    code: number,
    name: string,
    message: string,
    details: string,
    logOnly: boolean,
  ) {
    super();
    this.code = code;
    this.debugId = Cuid();
    this.name = name;
    this.message = message;
    this.details = details;
    this.logOnly = logOnly || false;
  }

  printForHTTPResponse() {
    return {
      code: this.debugId,
      name: this.name,
      message: this.message,
      details: this?.details || '',
    };
  }

  printForLogging() {
    return {
      code: this.code,
      debugId: this.debugId,
      name: this.name,
      message: this.message,
      path: this.path,
      details:
        typeof this.details === 'object'
          ? Util.inspect(this.details)
          : this.details,
    };
  }

  getCode() {
    return this.code;
  }

  setPath(path: string) {
    this.path = path;
  }
}

export class BadRequest extends GeneralError {
  constructor(details: string, logOnly: boolean = false) {
    super(
      400,
      'Bad Request',
      'Your request contains invalid or missing data',
      details,
      logOnly,
    );
  }
}

export class NotAuthenticated extends GeneralError {
  constructor(details: string, logOnly: boolean = false) {
    super(
      401,
      'Not Authenticated',
      'Missing authentication or invalid credentials',
      details,
      logOnly,
    );
  }
}

export class NotAuthorized extends GeneralError {
  constructor(details: string, logOnly: boolean = false) {
    super(
      403,
      'Not Authorized / Forbidden',
      'Your request cannot be completed due to missing permissions',
      details,
      logOnly,
    );
  }
}

export class NotFound extends GeneralError {
  constructor(details: string, logOnly: boolean = false) {
    super(
      404,
      'Not Found',
      'The requested item was not found',
      details,
      logOnly,
    );
  }
}

export class UnprocessableEntity extends GeneralError {
  constructor(details: string, logOnly: boolean = false) {
    super(
      422,
      'Unprocessable Entity',
      'Your request was understood but could not be completed due to semantic errors',
      details,
      logOnly,
    );
  }
}

export class TooManyRequests extends GeneralError {
  constructor(details: string, logOnly: boolean = false) {
    super(
      429,
      'Too Many Requests',
      'Number of requests for a time interval reached it maximal number !',
      details,
      logOnly,
    );
  }
}

export class InternalError extends GeneralError {
  constructor(details: string, logOnly: boolean = false) {
    super(
      500,
      'Internal Server Error',
      'Operation cannot be completed due to a problem',
      details,
      logOnly,
    );
  }
}

export class ServiceUnavailable extends GeneralError {
  constructor(details: string, logOnly: boolean = false) {
    super(
      503,
      'Service Unavailable Error',
      'Operation cannot be completed due to a problem',
      details,
      logOnly,
    );
  }
}
