"use strict";

var jwt = require('jsonwebtoken');
var db = require("../model/database"); //database modelini çağırdık
var getDb = new db(); //objemizi oluşturduk

getDb.connect(); //veri tabanı bağlantısını yaptık

var userMiddleware = function userMiddleware(req, res, next) {
  //database kontrolüde yapcaz UNUTMA

  var requestToken = req.headers["authorization"] || req.headers["Authorization"];
  if (!requestToken) {
    return res.status(403).json({
      message: "Token gereklidir"
    });
  }
  var token = requestToken.substring(7); // "Bearer " uzunluğu 7
  if (token.startsWith('"') && token.endsWith('"')) {
    token = token.substring(1, token.length - 1); // Başındaki ve sonundaki tırnak işaretlerini kaldır
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          message: "Token süresi dolmuş"
        });
      } else {
        return res.status(401).json({
          message: "Token doğrulama hatası",
          error: err.message
        });
      }
    }
    req.user = decoded;
    next();
  });
};
module.exports = userMiddleware;