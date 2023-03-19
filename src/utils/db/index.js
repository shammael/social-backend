"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var connect = function (cb) {
    mongoose_1["default"]
        .connect(process.env.MONGO_URL || "")
        .then(function () {
        cb();
    })["catch"](function (err) { return console.log(err); });
};
exports["default"] = connect;
