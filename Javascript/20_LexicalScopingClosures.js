//Global scope 
let fname ='Aniket';
console.log(`Value of fname is ${fname}`);
if (!String.prototype.caesarCipher) {
String.prototype.caesarCipher = function(shift) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const shiftedAlphabet = alphabet.slice(shift) + alphabet.slice(0, shift);
  const cipheredStr = this.split('').map(char => {
    const index = alphabet.indexOf(char.toLowerCase());
    return index !== -1 ? shiftedAlphabet[index] : char;
  }).join('');
  return cipheredStr;
}
} else {
  console.log('Polyfill already exists');
}
console.log(fname.caesarCipher(2)); // Output: Cpkmgv
// console.log(alphabet) //ReferenceError: alphabet is not defined

// Function scope
//Global variable can be accessed inside function because of lexical scoping.
// Lexical Scoping in Javascript means that the accessibility of variable is 
// determined by their physical placement in the source code.
// In other words, a function can access variables from its own scope,
// its parent scope, and the global scope ,which are its outer (enclosing) scopes.
//This relationship is fixed at the time the code is written(or "compiled").
// This does not change at runtime.
// In the example below, the function sayName() can access the variable fName
// declared in the global scope. 
let fName='Aniket';
// Create a reference comparison example
let FName = fName; // FName references the same string as fName

// Check if they reference the same value
console.log('fName:', fName);
console.log('FName:', FName);
console.log('Do fName and FName reference the same string?', fName === FName);

// Change one variable and see if it affects the other
// For primitive types like strings, they are copied by value
FName = 'Changed';
console.log('After modification:');
console.log('fName:', fName);
console.log('FName:', FName);
console.log('Do they still reference the same string?', fName === FName);

// // Object example to show reference behavior
const nameObj = { name: 'Aniket' };
const nameObjRef = nameObj;
console.log('Reference example with objects:');
console.log('Do nameObj and nameObjRef reference the same object?', nameObj === nameObjRef);
nameObjRef.name = 'Modified';
console.log('nameObj after modification:', nameObj.name);
  
function sayName(){
    // fName is accessible here because of lexical scoping of global scope
    console.log(`Inside sayName function the value of first name is ${fName}`);
    function nameLength(){
        // fName is accessible here because of lexical scoping of sayName(){}
        let length = fName.length;
        console.log(`Length of name is ${length}`);
        return length;
    }
    nameLength();
}
sayName(); //Output: Inside sayName function the value of fname is Aniket

// Block scope

// Global scope variable 'firstName' declared and initialized
let firstName = 'Aniket';

function sayNameBlock(){
    // MEMORY PHASE: New execution context created for sayNameBlock
    // Local 'firstName' variable created in function scope, shadows the global variable
    let firstName = 'Ram'; 
    
    // EXECUTION PHASE: Logs 'Ram' (local function scope variable)
    console.log(`Inside sayNameBlock function the value of first name is ${firstName}`);
    
    if(true){
        // MEMORY PHASE: Block-level execution context
        // Another 'firstName' variable declared in block scope
        // This shadows both the function scope and global firstName variables
        let firstName = 'Aniket';
        
        // EXECUTION PHASE: Logs 'Aniket' (using block-scoped variable)
        console.log(`Inside if block the value of first name is ${firstName}`);
        
        if(firstName === 'Aniket'){
            // EXECUTION PHASE: Condition is true because firstName in this scope is 'Aniket'
            // Accesses the length property of the block-scoped firstName variable
            // Note: This value isn't used or logged anywhere
            firstName.length;   // Returns 6 but isn't used
        }
        else{
            // This block never executes as the condition above is true
            console.log('Inside else block');
        }
    }
    // After exiting the if block, firstName reverts to 'Ram' (function scope)
    // Block-scoped variables are no longer accessible
}


// EXECUTION PHASE: Function called, creating a new execution context
sayNameBlock(); 
// Output sequence:
// 1. "Inside sayNameBlock function the value of first name is Ram"
// 2. "Inside if block the value of first name is Aniket"


{ let a=5;
    {
      let a=5.002;  
      if(a===5.002)
      {console.log(typeof a);//Output: number
        console.log(`a: ${a} is float`);
      }
        else if(a===5)
        console.log(`a is integer`);        
    }
    console.log(`a: ${a} is integer`); //Output: a: 5 is integer
}





