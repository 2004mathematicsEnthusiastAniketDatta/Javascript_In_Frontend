//Problem : Create an array containing different types of teas.
let teas=["Chamomile Tea","green Tea","Black Tea","Oolong Tea","Earl Grey Tea","Peppermint Tea","Ginger Tea","Lemon Tea","Masala Tea","Herbal Tea"];
console.log(teas);
//Problem : Add "sweet Tea" at the end of the array.
teas.push("Sweet Tea");
console.log(teas);
//Problem : Remove the element "Oolong Tea" of the array.
// teas.splice(3,1);
// console.log(teas);
const index = teas.indexOf("Oolong Tea");
if (index > -1) {
  teas.splice(index, 1);
}
console.log(teas);
//Problem : Filter the list to include teas that are caffeinated

const caffinatedTeas = teas.filter(tea =>  tea === "Black Tea" || tea === "Oolong Tea" || tea === "Earl Grey Tea" || tea === "Masala Tea");
console.log(caffinatedTeas);

//Problem : Sort the array alphabetically.
teas.sort();
console.log(teas);
//Problem : Reverse the array.
const teaz= teas.reverse();
console.log(teaz);
//Problem : Use a for Loop to print each type of tea in the array.
const newTeas=teas.forEach(tea => console.log(tea));
//Problem : Use a for...of loop to print each type of tea in the array.
for (const tea of teas) {
  console.log(tea);
}
//Problem : Use the .map() method to print each type of tea in the array.
const teaList = teas.map(tea => console.log(tea));
//Problem : Use the .reduce() method to create a sentence from the array.
const teaSentence = teas.reduce((sentence, tea) => sentence + tea + ", ", "Teas: ");
console.log(teaSentence);
//Problem : Use the .join() method to create a sentence from the array.
const teaSentence2 = teas.join(", ");
console.log(teaSentence2);
//Problem : Use the .every() method to check if all the teas are herbal.
const areAllHerbal = teas.every(tea => tea === "Chamomile Tea" || tea === "Peppermint Tea" || tea === "Ginger Tea" || tea === "Lemon Tea");
console.log(areAllHerbal);
//Problem: Use a For Loop to count how many teas are caffeinated (excluding "Herbal Tea")
let caffienatedMyTeas = 0;
for (let i=0;i<teas.length;i++){
  if(teas[i]!=="Herbal Tea"){
    caffienatedMyTeas++;
  }
}

console.log(caffienatedMyTeas);
//Problem: Use the .filter() method to count how many teas are herbal.
const notherbalTeas = teas.filter(tea => tea !=="Herbal Tea");
console.log(notherbalTeas.length);

//Problem: Use a for Loop to create a new array with all tea names in uppercase.
let upperCaseTeas = [];
for(let i=0;i<teas.length;i++){
    upperCaseTeas.push(teas[i].toUpperCase());
}
console.log(upperCaseTeas.sort());
//Problem: With a for loop , find the tea name with the most characters.
let longestTeaName = "";
for(let i=0;i<teas.length;i++){
    if(teas[i].length > longestTeaName.length){
        longestTeaName = teas[i];
    }
}
console.log(longestTeaName);
//Problem: Use the .find() method to find the tea that includes the word "Tea".
const teaWithWord = teas.find(tea => tea.includes("Tea"));
console.log(teaWithWord);
//Problem: Use the .findIndex() method to find the index of the tea that includes the word "Tea".
const teaIndex = teas.findIndex(tea => tea.includes("Tea"));
console.log(teaIndex);
//Problem: Use the .some() method to check if any of the teas include the word "Tea".
const includesTea = teas.some(tea => tea.includes("Tea"));
console.log(includesTea);
//Problem: Use the .includes() method to check if the array includes "Green Tea".
const hasGreenTea = teas.includes("Green Tea");
console.log(hasGreenTea);
//Problem: Use the .indexOf() method to find the index of "Green Tea".
const greenTeaIndex = teas.indexOf("Green Tea");
console.log(greenTeaIndex);
//Problem: Use the .lastIndexOf() method to find the last index of "Green Tea".
const lastGreenTeaIndex = teas.lastIndexOf("Green Tea");
console.log(lastGreenTeaIndex);
//Problem: Use the .slice() method to create a new array with only the first three teas.
const firstThreeTeas = teas.slice(0, 3);
console.log(firstThreeTeas);
//Problem: Use the .slice() method to create a new array with only the last three teas.
const lastThreeTeas = teas.slice(-3);
console.log(lastThreeTeas);
//Problem: Use the .splice() method to remove "Green Tea" and "Black Tea" from the array.
const removedTeas = teas.splice(1, 2);
console.log(teas);
console.log(removedTeas);
//Problem: Use the .splice() method to add "Green Tea" and "Black Tea" back to the array.
teas.splice(1, 0, "Green Tea", "Black Tea");
console.log(teas);
//Problem: Use the .concat() method to combine two tea arrays.
const moreTeas = ["White Tea", "Yellow Tea"];
const allTeas = teas.concat(moreTeas);
console.log(allTeas);
//Problem: Use the .concat() method to combine three tea arrays.
const evenMoreTeas = ["Blue Tea", "Purple Tea"];
const allTheTeas = teas.concat(moreTeas, evenMoreTeas);
console.log(allTheTeas);
//Problem: Use the .flat() method to combine two tea arrays.
const allTeasFlat = [teas, moreTeas].flat();
console.log(allTeasFlat);
//Problem: Use the .flat() method to combine three tea arrays.
const allTheTeasFlat = [teas, moreTeas, evenMoreTeas].flat();
console.log(allTheTeasFlat);
//Problem: Use a for loop to reverse the order of the teas in the array.
let reversedTeas = [];
for(let i=teas.length-1;i>=0;i--){
    reversedTeas.push(teas[i]);
}
console.log(reversedTeas);
//Objects-Data Structures in JS
// Data Structure is a particular way of organizing and storing data in a computer so that it can be accessed and modified efficiently.
// Objects are used to store multiple pieces of information in a single place.
// Objects are created using curly braces {}.
// Objects are made up of key-value pairs.
// Keys are strings that identify the values.
// Values can be any data type, such as strings, numbers, booleans, arrays, or even other objects.
// Keys and values are separated by a colon :.
// Key-value pairs are separated by commas ,.
// Objects can be stored in variables.
// Objects can be nested inside other objects.
// Objects can be passed as arguments to functions.
// Objects can be returned from functions.
// Objects can be used to create complex data structures.
// Objects can be used to model real-world entities.
// Objects can be used to represent data in a structured way.
// Objects can be used to organize and manipulate data.
//Objects-Properties and Methods
// Properties are values associated with an object. 
// 2 Types of data types are Primitive and Non Primitive Data Types.
// Primitive Data Types are stored directly in the location the variable accesses.
// Primitive Data Types are stored on the stack.
// Primitive Data Types are accessed by their actual value.
// Primitive Data Types are immutable.
// Primitive Data Types are passed by value.
// Primitive Data Types are copied by their value.
// Non-Primitive Data Types are stored in the heap.
// Non-Primitive Data Types are accessed by reference.
// Non-Primitive Data Types are mutable.
// Non-Primitive Data Types are passed by reference.
// Non-Primitive Data Types are copied by their reference.
// Methods are functions associated with an object.
// Methods are called using dot notation.
// Methods can be used to perform actions on objects.
// Methods can be used to modify objects.
// Methods can be used to access object properties.
// Methods can be used to interact with objects.
// For objects we need Curly Braces {}.
// For arrays we need Square Brackets [].
// For functions we need Parentheses ().
const x=10
console.log(x+10);
const person ={
    firstname: 'Aniket',
    lastname: 'Datta',
    age: 20,
    hobbies: ['coding', 'reading', 'gaming'],
    isMarried: false,
    address: {
        pin: 700035,
        city: 'Kolkata',
        state: 'West Bengal',
        country: 'India'
    },
    getFullName: function(){
        return `${this.firstname} ${this.lastname}`;
    }
}
console.log(person.hobbies);
console.table([person.address.pin,person.address.city, person.address.state, person.address.country]);
console.log(person.getFullName());
console.log(person['getFullName']());
console.log(person.firstname);
console.log(person['firstname']);
console.log(person.age);
console.log(person['age']);
console.log(person.isMarried);
console.log(person['isMarried']);
console.log(person.address.pin);
console.log(person['address']['pin']);
//Real=World stuff are represented by Objects.
const remote ={
    color: 'black',
    brand: 'sony',
    dimensions:{height: 1, width: 1},
    turnOff: function(){
        console.log('turning off');
    },
    turnOn: function(){
        console.log('turning on');
    },
    volumeUp: function(){
        console.log('volume up');
    },
    volumeDown: function(){
        console.log('volume down');
    },
    changeChannel: function(){
        console.log('changing channel');
    },
    changeColor: function(){
        console.log('changing color');
    },
};
console.log(remote.brand);
console.log(remote['brand']);
console.log(remote.dimensions.height);
console.log(remote['dimensions']['height']);
let fname ='Aniket';
let middleName = '';
let lastname ='Datta';
console.log(fname + ' ' + middleName + ' ' + lastname);
middleName = null;
console.log(fname + ' ' + middleName + ' ' + lastname);
middleName = undefined;
console.log(fname + ' ' + middleName  +' ' + lastname);
let p1 = {
    fname: "Hussein",
}

let p2 = p1;
console.log(p2);
p2["lname"] = "Nasser";
console.log(p1);
console.log(p2);

//Stack and Heap Memory
// Stack Memory is used to store variables that are declared inside a function.
// Stack Memory is used to store primitive data types.
// Stack Memory is used to store function calls.
// Stack Memory is used to store function arguments.
// Stack Memory is used to store function local variables.
// Stack Memory is used to store function return addresses.
// Stack Memory is used to store function execution context.
// Stack Memory is used to store function scope.
// Stack Memory is used to store function parameters.
// Stack Memory is used to store function references.
// Stack Memory is used to store function pointers.
// Stack Memory is used to store function variables.
// Stack Memory is used to store function values.
// Stack Memory is used to store function expressions.
// Stack Memory is used to store function declarations.
// Stack Memory is used to store function closures. 
// Heap Memory is used to store objects.
// Heap Memory is used to store arrays.
// Heap Memory is used to store functions.
// Heap Memory is used to store objects created with new.
// Heap Memory is used to store objects created with Object.create.
// Heap Memory is used to store objects created with Object.assign.
// Heap Memory is used to store objects created with Object.setPrototypeOf.
// Heap Memory is used to store objects created with Object.defineProperties.
// Heap Memory is used to store objects created with Object.defineProperty.
// Heap Memory is used to store objects created with Object.freeze.
// Heap Memory is used to store objects created with Object.seal.
// Heap Memory is used to store objects created with Object.preventExtensions.
// Heap Memory is used to store objects created with Object.fromEntries.    
// Heap Memory is used to store objects created with Object.entries.
// Heap Memory is used to store objects created with Object.keys.
// Heap Memory is used to store objects created with Object.values.
// Heap Memory is used to store objects created with Object.getOwnPropertyNames.
// Heap Memory is used to store objects created with Object.getOwnPropertySymbols.
// Heap Memory is used to store objects created with Object.getPrototypeOf.
// Heap Memory is used to store objects created with Object.setPrototypeOf.
// Heap Memory is used to store objects created with Object.is.
// Heap Memory is used to store objects created with Object.assign.
// Heap Memory is used to store objects created with Object.create.
// Heap Memory is used to store objects created with Object.defineProperties.
// Heap Memory is used to store objects created with Object.defineProperty.
// Heap Memory is used to store objects created with Object.freeze.
// Heap Memory is used to store objects created with Object.seal.
// Heap Memory is used to store objects created with Object.preventExtensions.
// Heap Memory is used to store objects created with Object.fromEntries.
// Heap Memory is used to store objects created with Object.entries.

//Stack does not grow dynamically like heap memory.
//Heap memory grows dynamically.
//Objects, arrays, and functions are stored in heap memory and are reference data types->
//  reference gets copied when some object array or function is assigned to another function.
//Primitive data types are stored in stack memory.
//Stack memory is faster than heap memory.
//References are stored in stack memory with the variable storing the reference data types and data structures.
//here , Say p1 is having some reference 0x1 in the heap memory 
// which is in the stack memory and the object is stored in the heap memory with the same refernce 0x1. Now
// on copying p2 = p1 , the reference 0x1 is copied to p2 and the object is not copied to p2. So, if we change the object in p1 ,
//  the object in p2 will also change and vice versa.
//let var=Reference Pointer Memory address in heap memory , var = reference is in stack memory.
//p2=0x1 , with change in the object with reference 0x1 in p2 , the object in p1 will also change.
//Objects are reference data types and are stored in heap memory.
// TradeOffs between stack and heap memory.
// Stack memory is faster than heap memory.
// Stack memory is limited in size.
// Stack memory is used for primitive data types.
// Stack memory is used for function calls.
// Stack memory is used for function arguments.
// Stack memory is used for function local variables.
// Stack memory is used for function return addresses.
// Stack memory is used for function execution context.
// Stack memory is used for function scope.
// Stack memory is used for function parameters.
// Stack memory is used for function references.
// Stack memory is used for function pointers.
// Stack memory is used for function variables.
//Heap memory is used for objects.
// Heap memory is used for arrays.
// Heap memory is used for functions.
// Heap memory grows dynamically and reading and writing will be sow because of extra hop to the heap memory.
//Heap memory is used for objects created with new.
// Heap memory is used for objects created with Object.create.

//Garbage Collection
// Garbage Collection is the process of automatically freeing up memory that is no longer being used.
// Garbage Collection is the process of automatically deallocating memory that is no longer needed.
// Garbage Collection is the process of automatically reclaiming memory that is no longer in use.
// Garbage Collection is the process of automatically cleaning up memory that is no longer required.
// Garbage Collection is the process of automatically releasing memory that is no longer necessary.
// Garbage Collection is the process of automatically disposing of memory that is no longer useful.

//Garbage Collector is a program that automatically frees up memory that is no longer being used.
// The variables are removed from STACK memory and the objects are removed from the HEAP memory with the help of automatic garbage collection.

//Memory Leaks
// Memory Leaks are the result of a program using memory inefficiently.
// Memory Leaks are the result of a program not releasing memory that is no longer needed.
// Memory Leaks are the result of a program not deallocating memory that is no longer in use.
// Memory Leaks are the result of a program not reclaiming memory that is no longer required.
// Memory Leaks are the result of a program not cleaning up memory that is no longer necessary.
p2 = null;
console.log(p2);
console.log(p1);
let p3={
    Frontend: 'ReactJs',
    Backend: 'NodeJs with ExpressJs',
    Database: 'Mongoose and MongoDB',
    Projects:{
        Project1: 'E-Commerce Website',
        Project2: 'Blog Website',
        Project3: 'Social Media Website',
    }
}
let p4={
    ...p3 //Spread Operator ... Shallow Copy -> Pass by Reference
}
p4.Backend='Bun with ExpressJs';
console.log(p3);
console.log(p4);
p3.Projects={

}
//Deep Copy -> Convert object to string and then convert string to object.
let p5 = JSON.parse(JSON.stringify(p3));
p5.Projects.Project1='E-Commerce Website with ReactJs';
console.log(p3);
console.log(p5);

//Classes
// Classes are a blueprint for creating objects.
// Classes are used to create objects.
// Classes are used to create instances of objects.
/**
 * Demonstrating object-oriented concepts with JavaScript prototypes
 */

// Creating a base Tea class
class Tea {
    constructor(name, type) {
      this.name = name;
      this.type = type;
    }
    
    brew() {
      console.log(`Brewing ${this.name}, a ${this.type} tea`);
    }
  }
  
  // ChaiTea extends Tea
  class ChaiTea extends Tea {
    constructor(name, type, spices = []) {
      super(name, type);
      this.spices = spices;
    }
    
    addSpice(spice) {
      this.spices.push(spice);
      return this;
    }
    
    serve() {
      console.log(`Serving ${this.name} with ${this.spices.join(', ')}`);
    }
  }
  
  // Create instance and use methods
  const icedChaiTea = new ChaiTea("Ice Tea Lemon", "Cool");
  icedChaiTea.brew();
  icedChaiTea.addSpice("cinnamon").addSpice("cardamom").serve();
  console.log(icedChaiTea);
  
  // Enhanced Array functionality - proper way using prototypes
  // Note: In production, extending native prototypes is generally not recommended
  if (!Array.prototype.sum) {
    Array.prototype.sum = function() {
      // Using regular function to ensure proper 'this' binding
      let sum = 0;
      for (let i = 0; i < this.length; i++) {
        sum += this[i];
      }
      return sum;
    };
  }
  
  // Using Array prototype methods
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  console.log("Original array:", arr);
  console.log("Sum of array elements:", arr.sum());
  
  // Creating array with generator pattern
  class EnhancedArray extends Array {
    static createSequence(length) {
      const array = new EnhancedArray(length);
      return array.fill(0).map((v, i) => i);
    }
    
    // Adding custom methods to our enhanced array
    sum() {
      return this.reduce((acc, val) => acc + val, 0);
    }
    
    average() {
      return this.sum() / this.length;
    }
  }
  
  // Using our enhanced array class
  const arr2 = EnhancedArray.createSequence(10);
  console.log("Generated sequence:", arr2);
  arr2.sort(); // Still has access to normal Array methods
  console.log("Sorted sequence:", arr2);
  console.log("Sum using enhanced method:", arr2.sum());
  console.log("Average:", arr2.average());
  
  // String operations - proper OOP approach
  class StringProcessor {
    constructor(text) {
      this.text = String(text);
    }
    
    get length() {
      return this.text.length;
    }
    
    toUpperCase() {
      return new StringProcessor(this.text.toUpperCase());
    }
    
    charAt(index) {
      return this.text.charAt(index);
    }
    
    toString() {
      return this.text;
    }
  }
  
  const name = new StringProcessor('Aniket');
  console.log("String length:", name.length);
  console.log("First character:", name.charAt(0));
  console.log("Uppercase:", name.toUpperCase().toString());
  
  // Demo of inheritance chain
  console.log("\nInheritance chain demonstration:");
  console.log("EnhancedArray is instance of Array:", arr2 instanceof Array);
  console.log("icedChaiTea is instance of ChaiTea:", icedChaiTea instanceof ChaiTea);
  console.log("icedChaiTea is instance of Tea:", icedChaiTea instanceof Tea);
  console.log("icedChaiTea is instance of Object:", icedChaiTea instanceof Object);
  