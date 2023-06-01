export class AppError extends Error {
  #errors = null
  #httpCode = null
  #errorCode = "error.app"

  constructor(
    errors = ["Oops. Something went wrong"],
    httpCode = 500,
    errorCode
  ) {
    super(errors.join(" | "))

    this.#errors = errors
    this.#httpCode = httpCode
    this.#errorCode = errorCode
  }

  get errors() {
    return this.#errors
  }

  get httpCode() {
    return this.#httpCode
  }

  get errorCode() {
    return this.#errorCode
  }
}

export class NotFoundError extends AppError {
  constructor(errors = ["Not found"]) {
    super(errors, 404, "error.app.notFound")
  }
}

export class InvalidArgumentError extends AppError {
  constructor(errors = ["Invalid arguments"]) {
    super(errors, 422, "error.app.InvalidArgumentError")
  }
}

export class InvalidCredentialsError extends AppError {
  constructor(errors = ["Invalid credentials"]) {
    super(errors, 401, "error.app.InvalidCredentialsError")
  }
}

export class InvalidSessionError extends AppError {
  constructor(errors = ["Invalid session"]) {
    super(errors, 403, "error.app.InvalidSessionError")
  }
}

export class InvalidAccessError extends AppError {
  constructor(errors = ["Not enough permission."]) {
    super(errors, 403, "error.app.InvalidAccessError")
  }
}
