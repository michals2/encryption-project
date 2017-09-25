var express = require("express");
var bodyParser = require("body-parser");
const CryptoJS = require("crypto-js");

var app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/:passphrase", (req, res) => {
  const passphrase = req.params.passphrase;
  const input = req.body.payload;
  const action = req.body.action;
  switch (action) {
    case "encrypt":
      const cipherText = encryptData(input, passphrase);
      res.send(cipherText);
      break;
    case "decrypt":
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
  let decryptedData;
  try {
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    return (decryptedData = {
      name: "",
      message: "Incorrect input",
      expiration: Date.now()
    });
  }
  if (Date.now() > new Date(decryptedData.expiration))
    return Object.assign(decryptedData, {
      message: "Sorry, this message is expired!"
    });
  return decryptedData;
}

exports.startServer = () => {
  console.log(`Listening on port ${PORT}`);
};
