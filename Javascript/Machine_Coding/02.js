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

//Class of ES6
class Pers {
    constructor(fname, lname, contact) {
        this.fname = fname;
        this.lname = lname;
        this.contact = contact;
    }
    getFullName() {
        return `${this.fname} ${this.lname}`;
    }
}
const person01 = new Pers('Stuart', 'Little', '1234567890');
person01.getFullName(); // Stuart Little

const person02 = Object.create(Pers.prototype);
console.log(person02); // pers2 -> {} 
person02.fname = 'Mickey';
person02.lname = 'Mouse';
console.log(person02.getFullName()); // Mickey Mouse
const p2 = {
    __proto__: person02,
}
console.log(p2); // Pers -> {}

//Inheritance in Javascript

// 1. Inheritance using Constructor Functions and Prototype
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    return `${this.name} makes a noise.`;
};

// Dog inherits from Animal
function Dog(name, breed) {
    // Call parent constructor
    Animal.call(this, name);
    this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
// Reset constructor
Dog.prototype.constructor = Dog;

// Override the speak method
Dog.prototype.speak = function() {
    return `${this.name} barks!`;
};

// Add new method
Dog.prototype.getBreed = function() {
    return `${this.name} is a ${this.breed}`;
};

const dog = new Dog('Rex', 'German Shepherd');
console.log(dog.speak()); // Rex barks!
console.log(dog.getBreed()); // Rex is a German Shepherd

// 2. Inheritance using Object.create()
const Vehicle = {
    type: 'vehicle',
    init: function(make, model) {
        this.make = make;
        this.model = model;
        return this;
    },
    getInfo: function() {
        return `${this.make} ${this.model}`;
    }
};

const Car = Object.create(Vehicle);
Car.init = function(make, model, doors) {
    Vehicle.init.call(this, make, model);
    this.doors = doors;
    return this;
};
Car.getDetails = function() {
    return `${this.getInfo()} with ${this.doors} doors`;
};

const myCar = Object.create(Car).init('Toyota', 'Corolla', 4);
console.log(myCar.getDetails()); // Toyota Corolla with 4 doors

// 3. Inheritance using ES6 Classes

class PaymentGateway {
    constructor() {
        this.gatewayName = 'Default Gateway';
    }
    processPayment(amount) {
        console.log(`Processing payment of ${amount} using ${this.gatewayName}`);
    }
}
class PayPal extends PaymentGateway {
    constructor() {
        super();
        this.gatewayName = 'PayPal';
    }
    processPayment(amount) {
        console.log(`Processing payment of ${amount} using ${this.gatewayName}`);
    }
}
class Stripe extends PaymentGateway {
    constructor() {
        super();
        this.gatewayName = 'Stripe';
    }
    processPayment(amount) {
        console.log(`Processing payment of ${amount} using ${this.gatewayName}`);
    }
}
const paypal = new PayPal();
const stripe = new Stripe();
paypal.processPayment(100); // Processing payment of 100 using PayPal
stripe.processPayment(200); // Processing payment of 200 using Stripe
console.log(paypal instanceof PaymentGateway); // true
console.log(stripe instanceof PaymentGateway); // true
console.log(paypal instanceof PayPal); // true
console.log(stripe instanceof Stripe); // true
console.log(paypal instanceof Stripe); // false
console.log(stripe instanceof PayPal); // false


// 4. Inheritance using Mixins

const Mixin = {
    init: function(name) {
        this.name = name;
    },
    greet: function() {
        console.log(`Hello, my name is ${this.name}`);
    }
};
const Mixin2 = {
    sayGoodbye: function() {
        console.log(`Goodbye from ${this.name}`);
    }
};
const PersonMixin = Object.assign({}, Mixin, Mixin2);
const personMixin = Object.create(PersonMixin);
personMixin.init('John');
personMixin.greet(); // Hello, my name is John
personMixin.sayGoodbye(); // Goodbye from John
// 5. Inheritance using Object.assign()
const Base = {
    init: function(name) {
        this.name = name;
    },
    greet: function() {
        console.log(`Hello, my name is ${this.name}`);
    }
};                      
const Extended = {
    sayGoodbye: function() {
        console.log(`Goodbye from ${this.name}`);
    }
};
const PersonAssign = Object.assign({}, Base, Extended);
const personAssign = Object.create(PersonAssign);
personAssign.init('John');
personAssign.greet(); // Hello, my name is John
personAssign.sayGoodbye(); // Goodbye from John

//Promises

function customPromise(){
    return new Promise((resolve, reject) => {
        //....
        resolve(Value);
});
}
customPromise().then(() => {}).catch((error)=>{}).finally(() => {});


