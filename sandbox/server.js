var express = require("express");
var bodyParser = require("body-parser");
const CryptoJS = require("crypto-js");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/:passphrase", (req, res) => {
  const passphrase = req.params.passphrase;
  const input = req.body.payload;
  const action = req.body.action;
  switch (action) {
    case "encrypt":
      console.log("encrypting");
      const cipherText = encryptData(input, passphrase);
      // console.log(cipherText);
      res.send(cipherText);
      break;
    case "decrypt":
      console.log("decrypting");
      const plainText = decryptData(input, passphrase);
      res.send(plainText);
      break;
    default:
      console.log("invalid action type");
  }
});

function encryptData(plainText, passphrase) {
  const cipherText = CryptoJS.AES
    .encrypt(JSON.stringify(plainText), passphrase)
    .toString();
  return cipherText;
}

function decryptData(cipherText, passphrase) {
  const bytes = CryptoJS.AES.decrypt(cipherText.toString(), passphrase);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

app.listen(3000, () => console.log("app connected"));
