class ApiError extends Error {
  constructor(statuscode, message = "Some thing went wrong") {
    super(message);
    this.statuscode = statuscode;
    this.success = false;
  }
}

export { ApiError };
