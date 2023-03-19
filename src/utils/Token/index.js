"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
var Token = /** @class */ (function () {
    function Token() {
    }
    Token.prototype.sign = function (value, secret, options) {
        return jsonwebtoken_1["default"].sign(value, secret, options);
    };
    Token.prototype.verify = function (value, secret) {
        return jsonwebtoken_1["default"].verify(value, secret);
    };
    return Token;
}());
exports["default"] = new Token();
