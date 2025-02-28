// console.log(a); //ReferenceError: a is not defined .Cannot access a before initialization . not defined is an error
let a=12;
console.log(a); //12
//Hoisting
console.log(b); //undefined is a value
var b; 
console.log(b); //undefined
b=0;
console.log(b); //b=0
// addition
let sum= 69+a+b;
console.log("69+sum:",sum);
// concatenation
console.log("69"+sum);
// let a0=prompt("please enter a number:");
// if (typeof(a0)===Number) {
    // console.log(a0);
// }
