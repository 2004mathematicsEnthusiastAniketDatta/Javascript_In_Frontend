//polyfills
//Modern Functionalities are provided to the older browsers with the help of polyfills.

Array.prototype.reducing = function(callback, initialValue = undefined ) {
    let accumulator = initialValue;
    let i = 0;

    if (initialValue === undefined) {
        accumulator = this[0];
        i = 1;
    }

    for (; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
}
// Example usage:
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reducing((acc, curr) => acc + curr, 0);
console.log(sum); // Output: 15

// Global Execution Context
//Hoisting
console.log(`value of X is ${x}`); // undefined
var x = 10;
console.log(`value of X is ${x}`); // 10
// Hoisting with function
function hoistedFunction() {
    console.log("This function is hoisted!");
}
hoistedFunction(); // This function is hoisted!

console.log("This is the global execution context.");
let globalVariable = "I am a global variable!";
function localFunction() {
    let localVariable = "I am a local variable!";
    console.log(localVariable);
}
localFunction(); // I am a local variable!
console.log(globalVariable); // I am a global variable!

console.log(`Global Execution ends here`);

// Function Execution Context
function functionExecution() {
    console.log("This is the function execution context.");
    let functionVariable = "I am a function variable!";
    console.log(functionVariable);
}
functionExecution(); // This is the function execution context.

console.log('Start of script 2');
setTimeout(() => {
    console.log('Timeout 1'); // Callback Queue
}
, 0);
console.log('End of script 2');
Promise.resolve().then(() => {
    console.log('Promise 1'); //Microtask  Queue
}
);
console.log('Start of script 3'); //Call stack
  
// Objects

// 1. Object Literals:
// Object literals provide a simple way to create objects using curly braces {}
const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    greet: function() {
        return `Hello, my name is ${this.firstName} ${this.lastName}`;
    }
};

console.log(person.firstName); // John
console.log(person.greet()); // Hello, my name is John Doe

// You can also add properties dynamically
person.email = 'john@example.com';
console.log(person.email); // john@example.com

// And use computed property names
const propertyName = 'job';
person[propertyName] = 'Developer';
console.log(person.job); // Developer

//Advantages of object literals: 
// - Easy to read and write.
// - Can be required to create objects with default values.
// - creation of objects with methods
// - If blueprint is not required, then object literals are the best way to create objects.
// - not required to create constructor functions.
// - blue print is not available.
// - heap memory is not required.
// - Good for creating singleton objects.
// - Less verbose than formal class definitions.
// - Useful for configuration and settings objects.
// - Simpler syntax for JSON-like data structures. 

//Normal function - camelCasing
function normalFunction() {
    console.log("This is a normal function.");
}
//Constructor function - PascalCasing
function ConstructorFunction() {
    this.property = "This is a property of the constructor function.";
    this.method = function() {
        console.log("This is a method of the constructor function.");
    };
}
class ClassFunction {
    constructor() {
        this.property = "This is a property of the class function.";
    }
    method() {
        console.log("This is a method of the class function.");
    }
    
}

// 2. Constructor Functions:
function Person(fname, lname, contact){
    this.fname = fname;
    this.lname = lname;
    this.contact = contact;
    this.getFullName = function(){
        return `${this.fname} ${this.lname}`;
    }
}
const person1 = new Person('Stuart', 'Little', '1234567890');

const person2 = new Person('Harry', 'Potter', '0987654321');
console.log(person1.getFullName()); // Stuart Little
console.log(person2.getFullName()); // Harry Potter