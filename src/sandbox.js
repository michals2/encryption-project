const dateString = "2017-09-25T00:07:09.483Z";
const parsedDate = new Date(dateString);
console.log(typeof(dateString))

console.log(Date.parse('Thu, 01 Jan 1970 00:00:00 GMT-0400'));

const date2 = new Date (10, 6, 14);
console.log(date2);
const date2Parsed = Date.parse(date2);
console.log(date2Parsed);
const date2Back = new Date(date2Parsed);
console.log(date2Back < Date.now)

console.log(Date.now())