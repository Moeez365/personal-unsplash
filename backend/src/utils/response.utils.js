class ApiRespose {
  constructor(statuscode, message, data = null) {
    this.message = message;
    this.statuscode = statuscode;
    this.data = data;
    this.success = true;
  }
}

export { ApiRespose };
