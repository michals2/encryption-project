const CryptoJS = require("crypto-js");

// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt("my message", "secret key 123");

// // Decrypt
// var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), "secret key 123");
// var plaintext = bytes.toString(CryptoJS.enc.Utf8);

// console.log(ciphertext.toString().length);
// console.log(bytes.toString());
// console.log(plaintext);

/********************************************* */

// const date = new Date();
// console.log(date);
// const message = "the message is secret";
// var data = { date, message };

// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), "secret key 123");

// // Decrypt
// var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), "secret key 123");
// var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

// console.log(ciphertext.toString().length);
// console.log(bytes.toString());
// console.log(decryptedData);

/***************************** generate a random passphrase */

// const passphrase = Math.random().toString(36).slice(2, 7);
// console.log(passphrase);

// function randomString(length, chars) {
//   var result = "";
//   for (var i = length; i > 0; --i)
//     result += chars[Math.floor(Math.random() * chars.length)];
//   return result;
// }
// var rString = randomString(
//   5,
//   "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
// );

// console.log(rString);

/********************************************* */

const data = {
  name: "Luke",
  message: "This is a test message!",
  expiration: "insert JS date here"
};

const JSONdata = JSON.stringify(data);
console.log(JSONdata);
