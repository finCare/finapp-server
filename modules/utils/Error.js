let Error = class {
  constructor(code, errorInfo) {
    this.code = code;
    this.errorInfo = errorInfo;
  }
};

module.exports = Error;
