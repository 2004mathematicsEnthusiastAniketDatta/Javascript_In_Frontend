// Enable negative indexing in array in Javascript
//const fruits = ['apple', 'orange', 'banana', 'grapes', 'mango'];
//console.log(fruits[-1]); // mango
//console.log(fruits[-2]); // grapes
//console.log(fruits[-3]); // banana
//console.log(fruits[-4]); // orange
//console.log(fruits[-5]); // apple
//console.log(fruits[-6]); // undefined
//console.log(fruits[-7]); // undefined
//console.log(fruits[-8]); // undefined
//console.log(fruits[-9]); // undefined
//console.log(fruits[-10]); // undefined
//console.log(fruits[-11]); // undefined
//console.log(fruits[-12]); // undefined
//console.log(fruits[-13]); // undefined
//console.log(fruits[-14]); // undefined
let name="Aniket";
const pi=3.14;
let number =42; //Number
let isTrue =true; //Boolean
let empty=null; //Null
let unDefined; //Undefined
let text="Hello"; //String
let SymbolVar = Symbol(); //Symbol
let bigint = 1234567890123456789012345678901234567890n; //BigInt
console.log(typeof unDefined);
console.log(typeof empty);
console.log(typeof SymbolVar);

let person = {
    name: 'Aniket',
    age: 21,
    isAdult: true,
    hobbies: ['Reading', 'Coding', 'Travelling'],
    greet: function() {
        console.log('Hello');
    }
};
console.log(person.name);
console.log(person.__proto__);
//Most of the data travels in the form of strings in the web. 
// So, we need to convert the data into JSON format.

//Explicit Type Conversion
let num = "42";
let convertedNum = Number(num); //Industry standard way to convert string to number
console.log(typeof num);
console.log(typeof convertedNum);
console.log(convertedNum);

let num01 = "42a";
let convertedNum01 = Number(num01);
console.log(typeof num01);
console.log(typeof convertedNum01);
console.log(convertedNum01);

let convertedNum02 = +num;
console.log(typeof convertedNum02);
console.log(convertedNum02);

let convertedNum03 = parseFloat(num);
console.log(typeof convertedNum03);
console.log(convertedNum03);

let convertedNum04 = parseInt(num);
console.log(typeof convertedNum04);

//Page,Forms and Sessions
//https://www.google.co.in/events/1232435abbcd2313 -> the number at the end provides an object id in MongoDB
// We should always  know the data and type of data that we are sending to the server or recieving from the server.

let str ="42";
let convertedStr = String(str); //less computation
let convertedStr01 = str.toString(); //more computation
let convertedStr02 = JSON.stringify(str); //more computation
console.log(typeof str);
console.log(typeof convertedStr);
console.log(typeof convertedStr01);
console.log(typeof convertedStr02);

//Operations
let result = ((4+(4-6))*3);
let a = 10;
let b = 3;

let sum = a+b;
let difference = a-b;
let product = a*b;
let quotient = a/b;
let remainder = a%b;
let power = a**b;
let dividend = Math.floor(a/b);
console.log(dividend);

let random = Math.random();
random.toExponential(2);
random.toFixed(2);
random.toPrecision(2);
console.log(random);
console.table({sum, difference, product, quotient, remainder, power});
console.table([random.toExponential(2),
    random.toFixed(2),
    random.toPrecision(2)])

let x="42";
let y=42;
console.log(x==y); //true
console.log(x===y); //false
console.log(x!=y); //false
console.log(x!==y); //true

console.log(x>y); //false
console.log(x<y); //false
console.log(x>=y); //true
console.log(x<=y); //true
console.log('42' && 42); //42
console.log(typeof('42' && 42)); //Number
console.log('42' || 42); //42
console.log(typeof('42' || 42)); //string

//Libraries:
//Javascipt:                                       //Node.js:
//1.Math                                           //1.crypto
//2.DateTime                                       //2.http

console.log(Math.sin(30));
console.log(Math.cos(30));
console.log(Math.tan(30));
console.log(Math.PI);
console.log(Math.E);
console.log(Math.abs(-42));
console.log(Math.ceil(42.1));
console.log(Math.floor(42.9));
console.log(Math.round(42.5));
console.log(Math.max(1,2,3,4,5));
console.log(Math.min(1,2,3,4,5));
console.log(Math.pow(2,3));
console.log(Math.sqrt(4));
console.log(Math.random());

console.log(Math.floor(Math.random()*10)); //0-9
console.log(Math.floor(Math.random()*10)+1); //1-10
console.log(Math.floor(Math.random()*10)+1); //1-10

//1-6 
console.log(Math.floor(Math.random()*6)+1);

//String
let firstName = "Aniket";
let lastName = "Datta";
console.log(firstName + " " + lastName);
console.log(`${firstName} ${lastName}`);

let message="Hello";
console.log(message.length);
console.log(message.toUpperCase());
console.log(message.toLowerCase());
console.log(message.charAt(0));
console.log(message.charCodeAt(0));
console.log(message.concat(" World"));
console.log(message.includes("Hello"));
console.log(message.indexOf("l"));
console.log(message.lastIndexOf("l"));
console.log(message.match(/l/g));
console.log(message.slice(0,2) + "y");

let templateLiterals = `I am ${firstName} ${lastName}`;
console.log(templateLiterals);







