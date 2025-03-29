/**
 * JAVASCRIPT 
 * =======================================
 * 
 * Author: Aniket Datta
 * 
 * This file explains the core internals of JavaScript, including:
 * - JavaScript Engine & Execution Context
 * - Memory Management & Garbage Collection
 * - Event Loop & Asynchronous JavaScript
 * - Prototype Chain & Inheritance
 * - Closures & Lexical Environment
 * - Hoisting & TDZ (Temporal Dead Zone)
 * - 'this' Keyword & Binding
 */

// =====================================================
// SECTION 1: JAVASCRIPT ENGINE & EXECUTION CONTEXT
// =====================================================

/**
 * JavaScript is an interpreted language, executed by a JS Engine
 * (like V8 in Chrome, SpiderMonkey in Firefox, etc.)
 * 
 * The JS Engine has two main components:
 * 1. Memory Heap - where memory allocation happens
 * 2. Call Stack - where your code is executed (execution context)
 */

// Example demonstrating execution context
console.log("1. Global context execution starts");

function firstFunction() {
  console.log("3. First function execution context");
  secondFunction();
  console.log("5. Back to first function context");
}

function secondFunction() {
  console.log("4. Second function execution context");
}

console.log("2. Still in global execution context");
firstFunction();
console.log("6. Back to global execution context");

/**
 * EXPLANATION: When this code runs, the JavaScript engine:
 * 1. Creates a Global Execution Context (GEC)
 * 2. Puts the GEC on the call stack
 * 3. Executes code line by line
 * 4. When firstFunction() is called, creates a new execution context for it
 * 5. Inside firstFunction, secondFunction() creates another execution context
 * 6. When secondFunction completes, its context is popped off the stack
 * 7. Execution returns to firstFunction context
 * 8. When firstFunction completes, back to global context
 */

// =====================================================
// SECTION 2: MEMORY MANAGEMENT & GARBAGE COLLECTION
// =====================================================

/**
 * JavaScript handles memory management automatically through a process
 * called Garbage Collection. The main algorithm is "Mark and Sweep":
 * 
 * 1. The garbage collector identifies all "root" objects (global variables)
 * 2. It marks all roots and their references as "active"
 * 3. Anything not marked is considered garbage and is swept away
 */

// Example demonstrating memory allocation
let user = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    zip: 10001
  }
};

// This creates a memory leak (circular reference)
const createMemoryLeak = () => {
  let a = {};
  let b = {};
  a.ref = b;
  b.ref = a;  // Circular reference
  
  return () => {
    console.log(a, b); // Keeps references alive even after function exits
  };
};

const potentialLeak = createMemoryLeak();

// Modern GC algorithms can detect and clean up circular references
// But this is a simplification of how memory leaks can happen

// Best practice: Remove references when done
user = null;  // Now the object can be garbage collected

/**
 * MEMORY LIFECYCLE:
 * 1. Allocate memory - JavaScript does this when you declare variables
 * 2. Use the memory - Read/write operations
 * 3. Release memory - Done automatically by garbage collector
 */

// =====================================================
// SECTION 3: EVENT LOOP & ASYNCHRONOUS JAVASCRIPT
// =====================================================

/**
 * JavaScript is single-threaded but can handle asynchronous operations
 * through the Event Loop architecture:
 * 
 * Components:
 * - Call Stack: Executes code
 * - Web APIs: Browser capabilities (fetch, setTimeout, DOM, etc.)
 * - Callback Queue: Holds callbacks from async operations
 * - Microtask Queue: Higher priority queue (Promises, queueMicrotask)
 * - Event Loop: Checks if call stack is empty, then moves callbacks
 */

console.log("A: Synchronous operation starts");

// Macrotask - goes to Callback Queue
setTimeout(() => {
  console.log("C: setTimeout callback (macrotask)");
}, 0);

// Microtask - goes to Microtask Queue (higher priority)
Promise.resolve()
  .then(() => console.log("B: Promise resolution (microtask)"));

console.log("D: Synchronous operation ends");

/**
 * OUTPUT ORDER: A, D, B, C
 * 
 * EXPLANATION:
 * 1. "A" logs immediately on the call stack
 * 2. setTimeout schedules callback in Web API, later moves to Callback Queue
 * 3. Promise resolves and its .then callback goes to Microtask Queue
 * 4. "D" logs immediately on the call stack
 * 5. Call stack empties
 * 6. Event Loop checks Microtask Queue first → "B" logs
 * 7. Event Loop checks Callback Queue → "C" logs
 */

// =====================================================
// SECTION 4: PROTOTYPE CHAIN & INHERITANCE
// =====================================================

/**
 * JavaScript uses prototypal inheritance rather than classical inheritance.
 * Each object has an internal link to another object called its prototype.
 */

// Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Adding method to prototype (shared across all instances)
Person.prototype.greet = function() {
  return `Hello, my name is ${this.name}`;
};

// Creating instances
const alice = new Person("Alice", 28);
const bob = new Person("Bob", 32);

console.log(alice.greet());  // "Hello, my name is Alice"
console.log(bob.greet());    // "Hello, my name is Bob"

// Inheritance using prototypes
function Employee(name, age, role) {
  // Call parent constructor
  Person.call(this, name, age);
  this.role = role;
}

// Set up prototype chain - Employee inherits from Person
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;  // Fix constructor reference

// Add method specific to Employee
Employee.prototype.describe = function() {
  return `${this.greet()}. I work as a ${this.role}.`;
};

const charlie = new Employee("Charlie", 35, "Developer");
console.log(charlie.describe());  // "Hello, my name is Charlie. I work as a Developer."

/**
 * PROTOTYPE CHAIN EXPLAINED:
 * 1. When you access a property on an object, JS first looks on the object itself
 * 2. If not found, it looks on the object's prototype
 * 3. This continues up the prototype chain until found or null is reached
 * 
 * Modern approach: Use class syntax (syntactic sugar over prototypes)
 */

class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  speak() {
    return `${this.name} barks`;
  }
}

const rex = new Dog("Rex", "German Shepherd");
console.log(rex.speak());  // "Rex barks"

// =====================================================
// SECTION 5: CLOSURES & LEXICAL ENVIRONMENT
// =====================================================

/**
 * A closure is the combination of a function and the lexical environment 
 * within which that function was declared. This allows functions to 
 * "remember" their creation context.
 */

function createCounter() {
  let count = 0;  // Private variable in the lexical scope
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment());  // 1
console.log(counter.increment());  // 2
console.log(counter.decrement());  // 1
console.log(counter.getCount());   // 1

/**
 * CLOSURE EXPLAINED:
 * 1. When createCounter executes, it creates a new lexical environment with 'count'
 * 2. The functions increment, decrement, getCount "close over" this environment
 * 3. When createCounter finishes, its scope normally would be garbage collected
 * 4. But since these functions maintain references to that scope, it stays alive
 * 5. The 'count' variable persists and is accessible only through these functions
 */

// Practical example: Memoization with closure
function memoize(fn) {
  const cache = {};  // Private cache in closure
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache[key] === undefined) {
      console.log("Computing result...");
      cache[key] = fn(...args);
    } else {
      console.log("Returning from cache...");
    }
    
    return cache[key];
  };
}

const expensiveOperation = (a, b) => {
  // Simulate expensive computation
  console.log("Performing expensive calculation");
  return a * b;
};

const memoizedOperation = memoize(expensiveOperation);

console.log(memoizedOperation(4, 5));  // Computes: 20
console.log(memoizedOperation(4, 5));  // Returns from cache: 20

// =====================================================
// SECTION 6: HOISTING & TEMPORAL DEAD ZONE
// =====================================================

/**
 * Hoisting is JavaScript's behavior of moving declarations to the top
 * of their containing scope during the compilation phase.
 */

// Function declarations are fully hoisted
console.log(add(2, 3));  // Works! Outputs: 5

function add(a, b) {
  return a + b;
}

// Variables declared with 'var' are hoisted but initialized as undefined
console.log(hoistedVar);  // undefined (not an error)
var hoistedVar = 10;

// Variables declared with 'let' and 'const' are hoisted but not initialized
// They're in the Temporal Dead Zone (TDZ) until declaration is reached
try {
  console.log(blockVar);  // This will throw ReferenceError
} catch(e) {
  console.log("Error: Can't access 'blockVar' before initialization");
}

let blockVar = 20;
console.log(blockVar);  // 20 - Now it works

/**
 * TEMPORAL DEAD ZONE (TDZ) EXPLAINED:
 * - The period between entering scope and being declared
 * - During this time, the variable exists but cannot be accessed
 * - This helps catch errors and enforce better coding practices
 */

// =====================================================
// SECTION 7: 'THIS' KEYWORD & BINDING
// =====================================================

/**
 * 'this' refers to the execution context of a function.
 * Its value depends on how the function is called, not where it's defined.
 */

// Example 1: Global context
console.log(this);  // In browser: Window object, in Node: global or {}

// Example 2: Object method
const user1 = {
  name: "David",
  greet() {
    console.log(`Hello, I am ${this.name}`);
  }
};

user1.greet();  // "Hello, I am David" - 'this' is user1 object

// Example 3: Function called on its own
function standalone() {
  console.log(this);  // In browser: Window object, in strict mode: undefined
}

standalone();

// Example 4: Event handlers
// document.querySelector("button").addEventListener("click", function() {
//   console.log(this);  // 'this' would be the button element
// });

// Example 5: Arrow functions don't have their own 'this'
const arrowTest = {
  name: "Arrow",
  regularMethod: function() {
    console.log(`Regular method: ${this.name}`);
    
    // Arrow function inherits 'this' from surrounding scope
    const arrowFunction = () => {
      console.log(`Arrow function: ${this.name}`);
    };
    
    arrowFunction();
  }
};

arrowTest.regularMethod();
// Output:
// Regular method: Arrow
// Arrow function: Arrow

// Methods to control 'this' binding
const person1 = { name: "Alex" };
const person2 = { name: "Beth" };

function introduce(greeting, punctuation) {
  console.log(`${greeting}, I am ${this.name}${punctuation}`);
}

// Using call - invokes function with specified 'this' and arguments
introduce.call(person1, "Hi", "!");  // "Hi, I am Alex!"

// Using apply - like call but takes arguments as array
introduce.apply(person2, ["Hello", "."]);  // "Hello, I am Beth."

// Using bind - returns a new function with 'this' permanently bound
const introduceBeth = introduce.bind(person2);
introduceBeth("Hey", "?");  // "Hey, I am Beth?"

/**
 * 'THIS' BINDING RULES (in order of precedence):
 * 1. 'new' binding: 'this' is the new object when constructor is called with 'new'
 * 2. Explicit binding: Using call, apply, or bind
 * 3. Implicit binding: 'this' is the object that owns the method
 * 4. Default binding: 'this' is global object (or undefined in strict mode)
 * 5. Arrow functions: Inherit 'this' from surrounding lexical context
 */

// =====================================================
// SECTION 8: ADVANCED OPTIMIZATIONS & PATTERNS
// =====================================================

/**
 * Modern JavaScript engines use several optimization techniques:
 * - Just-In-Time (JIT) compilation
 * - Inline caching
 * - Hidden classes
 */

// Hidden Classes - Keep object structures consistent for optimization
// Good pattern (V8 optimizes this well):
function Point(x, y) {
  this.x = x;
  this.y = y;
}

const p1 = new Point(10, 20);
const p2 = new Point(30, 40);

// Bad pattern (creates different hidden classes):
const badPoint1 = {};
badPoint1.x = 10;
badPoint1.y = 20;

const badPoint2 = {};
badPoint2.y = 30;  // Different order
badPoint2.x = 40;

// Function inlining and specialized optimization
// Hot functions (called many times) get optimized

// Module Pattern - Encapsulation using closures
const calculator = (function() {
  // Private
  let result = 0;
  
  function validate(n) {
    return typeof n === 'number';
  }
  
  // Public API
  return {
    add(n) {
      if (!validate(n)) throw new Error('Invalid number');
      result += n;
      return this;  // For chaining
    },
    subtract(n) {
      if (!validate(n)) throw new Error('Invalid number');
      result -= n;
      return this;
    },
    getResult() {
      return result;
    }
  };
})();

console.log(
  calculator
    .add(5)
    .subtract(2)
    .add(10)
    .getResult()  // 13
);

/**
 * ADDITIONAL CONCEPTS WORTH EXPLORING:
 * - WeakMap and WeakSet for better memory management
 * - Web Workers for parallel processing
 * - SharedArrayBuffer for shared memory parallelism
 * - JavaScript typed arrays for performance-critical operations
 * - JavaScript engines' optimization techniques like function inlining
 * - JavaScript decorators (experimental)
 * - Proxy and Reflect for metaprogramming
 */

// =====================================================
// CONCLUSION
// =====================================================

/**
 * JavaScript internals are complex but understanding them provides:
 * 1. Better debugging skills
 * 2. Performance optimization abilities
 * 3. Prevention of common pitfalls and bugs
 * 4. Clean code architecture that works with the language, not against it
 * 
 * The JavaScript engine and runtime environment represent a sophisticated
 * system that balances ease of use with powerful capabilities.
 * 
 * As you develop, remember that JavaScript's flexibility is both
 * its greatest strength and its greatest challenge.
 */
