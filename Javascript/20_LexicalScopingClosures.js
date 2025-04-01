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
    //[[global scope]] // Reference to the global scope
    // EXECUTION PHASE: Logs 'Ram' (local function scope variable)
    console.log(`Inside sayNameBlock function the value of first name is ${firstName}`);
    
    if(true){
        // MEMORY PHASE: Block-level execution context
        // Another 'firstName' variable declared in block scope
        // This shadows both the function scope and global firstName variables
        let firstName = 'Aniket';
      //[[sayNameBlock function scope]] // Reference to the function scope
        // EXECUTION PHASE: Logs 'Aniket' (using block-scoped variable)
        console.log(`Inside if block the value of first name is ${firstName}`);
        
        if(firstName === 'Aniket'){
          //[[if block scope]] // Reference to the block scope
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
// function (){
//   [[Scope: parent reference]] 
// }

//closure
// A closure is a function that retains access to its lexical scope,
// even when the function is executed outside that scope.
// In simpler terms, a closure "closes over" its environment.
// This allows the function to remember the variables from its outer scope,
// even after that outer function has finished executing.
// Closures are created every time a function is created.

function outerFunction() {
    let outerVariable = 'I am from outer scope'; //closure for innerFunction
    function innerFunction() {
        console.log(outerVariable); // Accesses the outer variable
        
        return;
    }
    return innerFunction; // Returns the inner function
}
outerFunction()(); // Output: I am from outer scope
//Lecical Environment
// The lexical environment is a data structure that holds the variables
// and functions that are accessible in a given scope.
// It consists of two components:
// 1. Environment Record: This is an object that stores the variables and functions
// defined in that scope.
// 2. Reference to the outer lexical environment: This is a reference to the parent scope,
// allowing access to variables and functions defined in the outer scope.
// The lexical environment is created whenever a function is invoked.
// It allows closures to work by maintaining a reference to the outer scope,
// even after the outer function has finished executing.
// The closure retains access to the lexical environment of the outer function,
// which includes the variables and functions defined within it.
// The closure allows the inner function to access the outer variable,
// even after the outer function has returned.
// The closure retains access to the lexical environment of the outer function,
// which includes the variables and functions defined within it.
// The closure allows the inner function to access the outer variable,
// even after the outer function has returned.
// The closure retains access to the lexical environment of the outer function,
// which includes the variables and functions defined within it.
// The closure allows the inner function to access the outer variable,
// even after the outer function has returned.

//Lexical scope in Javascript is a convention that determines how variables
//  are accessible in a block of code.
//Based on the physical location of variables andcode blocks in the source code.
//Determined when the code is created and not when the code runs.
// Inner functions can access variables from the outer function they are inside of.
// helps to create efficient code patterns.
//more readable and maintainable code.

//counter
Function.prototype.increment = function() {
    let count = 0; // This variable is private to the closure
    return function() {
        count++;
        console.log(count);
        return count;
    }
}

Function.prototype.decrement = function() {
    let count = 0; // This variable is private to the closure
    return function() {
        count--;
        console.log(count);
        return count;
    }
}
// Simple React-like state implementation using closures
Function.prototype.useState = function(initialValue) {
  // Closure to maintain state between renders
  let state = initialValue;
  
  // Setter function that updates state and triggers re-render
  const setState = (newValue) => {
    if (typeof newValue === 'function') {
      // Allow functional updates like setState(prev => prev + 1)
      state = newValue(state);
    } else {
      state = newValue;
    }
    console.log('State updated to:', state);
    // In React, this would trigger a re-render
    return state;
  };
  
  // Return current state value and setter function as array
  return [state, setState];
};

// Example usage:
const [count, setCount] = Function.prototype.useState(0);
console.log('Initial state:', count); // 0
setCount(0); // 5
setCount(prev => prev + 1); // 8
// I should have a function increament() 
// on call of the function , this should increament the number
//and return the current count  
function increment(){
  let count = 0;
  return function(){
    count++;            //0++ //1++
    console.log(count); //1  //2
    return count;
  }

}
const x = increment(); // The function returned has access to the count variable in
// the outer function's / parent function's scope
//Because of closures the returned function remembers the count variable = 0 for the first time
// and the function increment() is executed only once.
// Now as we  call the returned function multiple times
// the count gets incremented by 1 each time from the last value remembered
x(); // Output: 1
x(); // Output: 2 
const y = increment(); // The function returned has access to the count variable in
y(); // Output: 1
y();  // Output: 2
x(); // Output: 3
x(); // Output: 4
y(); // Output: 3
y(); // Output: 4

// Here the inner function updates the value of count variable and 
// does not get reinitialized and declared to 0 every time the outer function is called.

function decreament(){
  let count =10;
  return function(){
    count--;            //10-- //9--
    console.log(count); //9  //8
    return count;
  }
}
const f = decreament(); // The function returned has access to the count variable in
const g = decreament(); // The function returned has access to the count variable in
f(); // Output: 9
f(); // Output: 8
g(); // Output: 9
g(); // Output: 8


// closure : Function binded by the lexical scope of the function in study

// CLOSURE : Implement a memoization function factory

/**
 * Creates a memoized version of any function with custom cache control
 * @param {Function} fn - The function to memoize
 * @param {Object} options - Configuration options
 * @param {Function} options.cacheKeyFn - Function to generate cache keys
 * @param {number} options.maxCacheSize - Maximum number of results to cache
 * @param {number} options.ttl - Time to live for cache entries in milliseconds
 * @returns {Function} - Memoized function with cache stats
 */
function createMemoizedFunction(fn, options = {}) {
  // Default options
  const {
    cacheKeyFn = (...args) => JSON.stringify(args),
    maxCacheSize = 100,
    ttl = Infinity
  } = options;
  
  const cache = new Map();
  const timestamps = new Map();
  const accessCounts = new Map();
  
  // Private cache stats
  let hits = 0;
  let misses = 0;
  
  // Function to handle cache eviction based on LFU (Least Frequently Used)
  function evictLeastUsed() {
    let leastUsedKey = null;
    let leastUsedCount = Infinity;
    
    for (const [key, count] of accessCounts.entries()) {
      if (count < leastUsedCount) {
        leastUsedCount = count;
        leastUsedKey = key;
      }
    }
    
    if (leastUsedKey) {
      cache.delete(leastUsedKey);
      timestamps.delete(leastUsedKey);
      accessCounts.delete(leastUsedKey);
    }
  }
  
  // Create and return the memoized function
  const memoized = function(...args) {
    const key = cacheKeyFn(...args);
    const now = Date.now();
    
    // Check if cached result exists and isn't expired
    if (cache.has(key)) {
      const timestamp = timestamps.get(key);
      if (now - timestamp < ttl) {
        // Update access count and timestamp
        accessCounts.set(key, (accessCounts.get(key) || 0) + 1);
        timestamps.set(key, now);
        hits++;
        return cache.get(key);
      }
    }
    
    // Cache miss - calculate result and store in cache
    misses++;
    const result = fn.apply(this, args);
    
    // Evict least used entry if cache is full
    if (cache.size >= maxCacheSize) {
      evictLeastUsed();
    }
    
    // Update cache
    cache.set(key, result);
    timestamps.set(key, now);
    accessCounts.set(key, 1);
    
    return result;
  };
  
  // Attach cache utilities to the memoized function
  memoized.getCacheStats = () => ({
    size: cache.size,
    hits,
    misses,
    hitRate: hits / (hits + misses || 1)
  });
  
  memoized.clearCache = () => {
    cache.clear();
    timestamps.clear();
    accessCounts.clear();
    hits = 0;
    misses = 0;
  };
  
  return memoized;
}

// Example usage
const expensiveCalculation = (n) => {
  console.log(`Computing fibonacci(${n})...`);
  if (n <= 1) return n;
  return expensiveCalculation(n-1) + expensiveCalculation(n-2);
};

// Create an optimized memoized version
const memoizedFib = createMemoizedFunction(expensiveCalculation, {
  maxCacheSize: 10,
  ttl: 60000 // 1 minute
});

console.log(memoizedFib(10)); // Will compute all values
console.log(memoizedFib(10)); // Will use cached result
console.log(memoizedFib.getCacheStats()); // Check hit rate

//Closure Function: A function returning a function with the lexical scope
//of the function in study binded is known as closure function.

// Implementation of React-style useState hook using closures
function createReactHooks() {
  // Closure to maintain state between renders
  let states = [];
  let currentStateIndex = 0;
  
  // Simulated component rendering cycle
  function renderComponent(component) {
    // Reset state index before each render
    currentStateIndex = 0;
    const result = component();
    console.log('Component rendered with result:', result);
    return result;
  }
  
  // useState hook implementation
  function useState(initialValue) {
    const stateIndex = currentStateIndex;
    
    // Initialize state if it doesn't exist yet
    if (states[stateIndex] === undefined) {
      states[stateIndex] = initialValue;
    }
    
    // Closure for the setState function
    const setState = (newValue) => {
      if (typeof newValue === 'function') {
        // Functional updates (setState(prev => prev + 1))
        states[stateIndex] = newValue(states[stateIndex]);
      } else {
        states[stateIndex] = newValue;
      }
      
      // Trigger re-render after state change
      console.log(`State at index ${stateIndex} updated to:`, states[stateIndex]);
      return renderComponent(currentComponent);
    };
    
    // Increment index for next useState call
    currentStateIndex++;
    return [states[stateIndex - 1], setState];
  }
  
  // useEffect hook implementation
  let effectDeps = [];
  function useEffect(callback, dependencies) {
    const effectIndex = currentStateIndex;
    
    // Check if dependencies changed
    const depsChanged = !effectDeps[effectIndex] || 
      !dependencies || 
      dependencies.some((dep, i) => dep !== effectDeps[effectIndex][i]);
    
    if (depsChanged) {
      // Store new dependencies
      effectDeps[effectIndex] = dependencies;
      
      // Run the effect
      setTimeout(() => {
        console.log('Running effect at index:', effectIndex);
        callback();
      }, 0);
    }
    
    currentStateIndex++;
  }
  
  // Store current component
  let currentComponent = null;
  
  return {
    useState,
    useEffect,
    renderComponent,
    setComponent: (component) => {
      currentComponent = component;
    }
  };
}

// Example usage
const React = createReactHooks();

function Counter() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("User");
  
  React.useEffect(() => {
    console.log(`Effect ran with count: ${count}`);
    return () => console.log('Cleanup effect');
  }, [count]);
  
  return {
    increment: () => setCount(prev => prev + 1),
    decrement: () => setCount(prev => prev - 1),
    changeName: () => setName("John"),
    displayState: () => console.log(`${name}'s count is ${count}`)
  };
}

// Set and render component
React.setComponent(Counter);
const counterInstance = React.renderComponent(Counter);

// Interact with component
counterInstance.displayState();
counterInstance.increment();
counterInstance.changeName();
// Lexical Scope is a convention that takes place at the time of writing code 
// because of closures: function(){[[lexical scope]];//code}.



