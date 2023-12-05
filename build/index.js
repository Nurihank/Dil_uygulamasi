"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _kullaniciRouter = _interopRequireDefault(require("./routes/kullaniciRouter.js"));
var _authorizedRouter = _interopRequireDefault(require("./routes/authorizedRouter.js"));
var _os = require("os");
var _adminLoginRouter = _interopRequireDefault(require("./routes/adminLoginRouter.js"));
require('dotenv').config(); //tokenlerin gözükmesi için yazdık bunu

var jwt = require("jsonwebtoken"); //token oluşturmak için
var crypto = require("crypto");
var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json()); //verileri json formatına çeviriyor  

app.listen(3000, function (err) {
  if (err) {
    console.log("hata verdi");
  }
});

/* var getUserInfo = userModel.user
var sifre = new getUserInfo("NurihanK");
sifre.getUser(); 
sifre.userFind();
 */

app.use("/kullanici", _kullaniciRouter["default"]);
app.use("/authorized", _authorizedRouter["default"]);
app.use("/adminLogin", _adminLoginRouter["default"]);