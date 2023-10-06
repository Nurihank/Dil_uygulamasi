"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _kullaniciRouter = _interopRequireDefault(require("./kullaniciRouter.js"));
var _authorizedRouter = _interopRequireDefault(require("./authorizedRouter.js"));
var _default = [_kullaniciRouter["default"], _authorizedRouter["default"]];
exports["default"] = _default;