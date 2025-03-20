// Prototypes
//Object Prototypes
Object.prototype.chai=()=>{
    console.log('This is a chai tea');
}
const chaiTea={
    name:"Ice tea Lemon",
    type:"Cool",
};
chaiTea.chai();
console.log(chaiTea);
//Prototype:**Object Prototype**: A template object that defines the structure and behavior of other objects, serving as a blueprint for creating new objects that inherit its properties and methods.
//Be careful with the quirky behaviour of the languages.
//Array Prototypes
const arr =[0,1,2,3,4,5,6,7,8,9,10]; 
arr
let arr2=new Array(10).fill(0).map((v,i)=>i);
arr2.at(0); // arr2.__proto__.at(0) 
arr2.map((v,i)=>v*2); // [0,2,4,6,8,10,12,14,16,18] searches map  function is there in code or modules imported or not if not, then map is searched in prototype  of arr2
//arr.__proto__=Array.prototype; //Array is a constructor function and Array.prototype is a object which contains all the properties and methods of Array
// str.__proto__; /*String {'', anchor: ƒ, at: ƒ, big: ƒ, blink: ƒ, …}anchor: ƒ anchor()length: 1name: "anchor"arguments: (...)caller: (...)[[Prototype]]: ƒ ()[[Scopes]]: Scopes[0]at: ƒ at()length: 1name: "at"arguments: (...)caller: (...)[[Prototype]]: ƒ ()[[Scopes]]: Scopes[0]big: ƒ big()length: 0name: "big"arguments: (...)caller: (...)[[Prototype]]: ƒ ()[[Scopes]]: Scopes[0]blink: ƒ blink()length: 0name: "blink"arguments: (...)caller: (...)[[Prototype]]: ƒ ()[[Scopes]]: Scopes[0]bold: ƒ bold()length: 0name: "bold"arguments: (...)caller: (...)[[Prototype]]: ƒ ()[[Scopes]]: Scopes[0]charAt: ƒ charAt()length: 1name: "charAt"arguments: (...)caller: (...)[[Prototype]]: ƒ ()[[Scopes]]: Scopes[0]charCodeAt: ƒ charCodeAt()length: 1name: "charCodeAt"arguments: (...)caller: (...)[[Prototype]]: ƒ ()[[Scopes]]: Scopes[0]codePointAt: ƒ codePointAt()length: 1name: "codePointAt"arguments: (...)caller: (...)[[Prototype]]: ƒ ()[[Scopes]]: Scopes[0]concat: ƒ concat()constructor: ƒ String()endsWith: ƒ endsWith()fixed: ƒ fixed()fontcolor: ƒ fontcolor()fontsize: ƒ fontsize()includes: ƒ includes()indexOf: ƒ indexOf()isWellFormed: ƒ isWellFormed()italics: ƒ italics()lastIndexOf: ƒ lastIndexOf()length: 0link: ƒ link()localeCompare: ƒ localeCompare()match: ƒ match()matchAll: ƒ matchAll()normalize: ƒ normalize()padEnd: ƒ padEnd()padStart: ƒ padStart()repeat: ƒ repeat()replace: ƒ replace()replaceAll: ƒ replaceAll()search: ƒ search()slice: ƒ slice()small: ƒ small()split: ƒ split()startsWith: ƒ startsWith()strike: ƒ strike()sub: ƒ sub()substr: ƒ substr()substring: ƒ substring()sup: ƒ sup()toLocaleLowerCase: ƒ toLocaleLowerCase()toLocaleUpperCase: ƒ toLocaleUpperCase()toLowerCase: ƒ toLowerCase()toString: ƒ toString()toUpperCase: ƒ toUpperCase()toWellFormed: ƒ toWellFormed()trim: ƒ trim()trimEnd: ƒ trimEnd()trimLeft: ƒ trimStart()trimRight: ƒ trimEnd()trimStart: ƒ trimStart()valueOf: ƒ valueOf()Symbol(Symbol.iterator): ƒ [Symbol.iterator]()[[Prototype]]: Object[[PrimitiveValue]]: ""*/
// Father {Skin , Height , eyeColor}
//Father.prototype={ Properties and methods of Father}
// child = {} child.__proto__=Father.prototype
//child={Skin , Height , eyeColor}
//child.__proto__={ Properties and methods of Father}
//Array.prototype={ Properies and methods of Array}
arr2.sort();
console.log(arr2);
const str ='Aniket';
// str.__proto__=String.prototype;
str.length; //str.__proto__.length=6
arr2.__proto__.normalsum = function() {
    let sum = 0;
    for (let i = 0; i < this.length; i++) {
      sum = sum + this[i];
    }
    return sum;
  };
summation=arr2.normalsum();
console.log(summation);
  //reduce: Higher Order Function 
arr2.__proto__.reducesum = function() {
   const sumArray = this.reduce((total, num) => total + num, 0);
    console.log(sumArray); 
};
arr2.reducesum();
//Why in Javascript, Everything is an Object?
//Ans: Why Everything in JavaScript Is (Almost) an Object
//In JavaScript, the statement "everything is an object" is often used but isn't strictly accurate. Instead, it's better to say that most values in JavaScript can behave like objects. Here's the technical explanation:

//The Technical Truth
//Primitive Types: JavaScript has primitive data types that are not objects:

//string
//number
//boolean
//null
//undefined
//symbol (added in ES6)
//bigint (added in ES2020)
//Object Types: Only these are truly objects:

//Object literals {}
//Arrays []
//Functions function(){}
//RegExp /pattern/
//Date objects
//Other built-in constructor objects
//Why the Confusion?
//The confusion stems from these key JavaScript behaviors:

//1. Primitive Wrapper Objects
//When you try to access properties or methods on primitives, JavaScript automatically wraps them in temporary objects:
const name = "Aniket";  // primitive string
console.log(name.length);  // 6 - accessing property on a primitive!
//1. Javascript actually creates a temporary string object
//2. The operation is performed 
//3. The temporary object is destroyed
//4. The result is returned
//This is called automatic boxing or autoboxing.
//The temporary object is created and destroyed so quickly that you don't notice it.
//Even though str is a primitive , str can access methods and properties of String.prototype
//through the automatic boxing mechanism.
//2. Prototype Chain
// Almost everything in Javascript is linked to the prototype chain:
//Objects inherit properties and methods from their prototype.
//The prototype chain is a series of objects linked together.
//Autoboxing also takes place in the prototype chain.
const str1 = `Aniket`;
console.log(str1.__proto__);//String {"", anchor: ƒ, at: ƒ, big: ƒ, blink: ƒ, …}
console.log(str1.__proto__.__proto__);//Object {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
console.log(str1.__proto__.__proto__.__proto__);//null
// console.log(str1.__proto__.__proto__.__proto__.__proto__);
console.log( str1.length); //6
//3. Functions as First-Class Objects
//Functions in Javascript are full objects with properties and methods.
function greet() { 
  return "Hello";
}

// Functions can have properties
greet.language = "English";
console.log(greet.__proto__);//{constructor: ƒ}
console.log(greet.__proto__.__proto__);//Object {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
console.log(greet.__proto__.__proto__.__proto__);//null
console.log(greet.language); // English
//4. Object Literals
//Object literals are objects created by {}:
const person = {
  name: "Aniket",
  age: 25,
};
console.log(person.__proto__);//Object {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
console.log(person.__proto__.__proto__);//null
//5.Everything inherits from Object.prototype
//Object.prototype is the top of the prototype chain.
//All objects inherit from Object.prototype.
//Object.prototype is the parent of all objects.
//Object.prototype is the ultimate parent of all objects.
//Almost all Javascript constructs except null and undefined inherit from Object.prototype.
//Object.prototype gives them access to methods like toString() and ValueOf().
// From your code
const arr2 = new Array(10).fill(0).map((v,i) => i);
arr2.__proto__.normalsum = function() {
    let sum = 0;
    for (let i = 0; i < this.length; i++) {
      sum = sum + this[i];
    }
    return sum;
};
summation = arr2.normalsum();
console.log(summation);
//The Benifits of this design are:
//1. Extensibility: You can extend built-in types via prototypes(though this is not always recommended).
//2. Consistency: All objects have a common set of methods and properties.
//Similar Object-Oriented behaviour across different value types.
//3. Multiprogramming: Powerful runtime manipulation of objects and their behaviour.
//4. Flexibility: You can treat all values as objects.
//5. Simplicity: Fewer rules to remember.
//6. Easy to learn: The same rules apply to all values.
//7. Easy to use: You can treat all values as objects.
//8. Easy to understand: Fewer rules to remember.
//Technical Explanation
//To be precise:
//1. Primitive types are not objects.
//2. Primitive types are automatically wrapped in objects when necessary.
//3. Functions, arrays and Regular expressions are objects.
//4. Almost everything shares inheritance from Object.prototype.

arr2.__proto__.normalsum = function() {
  let sum = 0;
  for (let i = 0; i < this.length; i++) {
    sum = sum + this[i];
  }
  return sum;
};
summation = arr2.normalsum();
console.log(summation);
//reduce: Polyfill

arr2.__proto__.reducesum = function() {
  const sumArray = this.reduce((total, num) => total + num, 0);
  console.log(sumArray);
}
arr2.reducesum();
//reduce: Higher Order Function
//reduce() is a higher-order function that takes a callback function as an argument.
//The callback function takes two arguments: the accumulator and the current value.
//The callback function returns a single value.
//reduce() returns the final value of the accumulator.
//reduce() has an optional initial value argument.
//reduce() is used to reduce an array to a single value.

//reduce() Syntax

arr2.__proto__.Reduce = function(callback, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < this.length; i++) {
    accumulator = callback(accumulator, this[i]);
  }
  return accumulator;
}
const sum = arr2.Reduce((total, num) => total + num, 0);
console.log(sum);

//We can add methods to Array.prototype to extend the functionality of arrays.

