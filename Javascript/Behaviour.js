// function test(){
//     let obj = {value: 10};
//     return function() {
//         console.log(obj);
//     }
// }

// const testFunc = test();
// testFunc(); // { value: 10 }
// // -101 (Garbage Collection) -
// testFunc(); // { value: 10 }
// // -10 (Garbage Collection) -
// testFunc(); // { value: 10 }
// // -1 (Garbage Collection) -

// // this Keyword Powers:
// /**
//  * ==============================================================================
//  * THE 'THIS' KEYWORD IN JAVASCRIPT: A COMPREHENSIVE EXAMINATION
//  * ==============================================================================
//  * 
//  * After working with JavaScript since its inception in 1995 through multiple
//  * paradigm shifts, browser wars, and framework revolutions, I've come to view
//  * the 'this' keyword as JavaScript's most elegant yet frequently misunderstood
//  * feature.
//  * 
//  * Unlike languages where 'this' is lexically determined, JavaScript's 'this'
//  * is dynamically bound at runtime, creating both power and confusion.
//  * 
//  * This file explores the complete mechanics of 'this' binding with practical
//  * examples drawn from three decades of JavaScript development.
//  */

// // ==============================================================================
// // SECTION 1: THE FUNDAMENTAL BINDING RULES
// // ==============================================================================

// /**
//  * JavaScript has four primary rules that determine 'this' binding.
//  * Understanding these rules and their precedence is crucial.
//  */

// // ------------------------------------------------------------------------------
// // RULE 1: DEFAULT BINDING (STANDALONE FUNCTION INVOCATION)
// // ------------------------------------------------------------------------------

// function demonstrateDefaultBinding() {
//   console.log("\n----- DEFAULT BINDING -----");
  
//   function standaloneFunction() {
//     // 'use strict'; // Uncomment to see the difference in strict mode
//     console.log("In standalone function, this is:", this);
//     console.log("Type of this:", typeof this);
    
//     // In non-strict mode, 'this' defaults to the global object
//     // In strict mode, 'this' defaults to undefined
//   }
  
//   standaloneFunction(); 
  
//   // HISTORICAL INSIGHT: This behavior has been a source of bugs since 
//   // early JavaScript (pre-ES5). Strict mode was introduced in ES5 (2009)
//   // partially to address these implicit global references.
// }

// // ------------------------------------------------------------------------------
// // RULE 2: IMPLICIT BINDING (METHOD INVOCATION)
// // ------------------------------------------------------------------------------

// function demonstrateImplicitBinding() {
//   console.log("\n----- IMPLICIT BINDING -----");
  
//   const user = {
//     name: "Alice",
//     age: 32,
//     greet() {
//       console.log(`Hello, I'm ${this.name} and I'm ${this.age} years old.`);
//       console.log("Inside method, this is:", this);
//     }
//   };
  
//   user.greet(); // 'this' is bound to user object
  
//   // The key insight: the object before the dot at call time determines 'this'
  
//   // SCENARIO: What happens if we separate the method from the object?
//   const greetFunction = user.greet;
//   console.log("\nAfter extracting method:");
//   greetFunction(); // 'this' is lost! Default binding applies
  
//   // HISTORICAL CONTEXT: This pattern frequently broke code in early AJAX callbacks
//   // and event handlers, leading to widespread use of 'var self = this' pattern
//   // before bind/arrow functions existed
  
//   // NESTED OBJECTS
//   const company = {
//     name: "TechCorp",
//     department: {
//       name: "Engineering",
//       describe() {
//         // 'this' refers to the immediate object that owns the method
//         console.log(`\nDepartment: ${this.name}`); // Engineering, not TechCorp
//       }
//     }
//   };
  
//   company.department.describe();
// }

// // ------------------------------------------------------------------------------
// // RULE 3: EXPLICIT BINDING (CALL, APPLY, BIND)
// // ------------------------------------------------------------------------------

// function demonstrateExplicitBinding() {
//   console.log("\n----- EXPLICIT BINDING -----");
  
//   function introduce(greeting, punctuation) {
//     console.log(`${greeting}, I'm ${this.name}${punctuation}`);
//   }
  
//   const person1 = { name: "Carlos" };
//   const person2 = { name: "Diana" };
  
//   // Method 1: call - invoke with specific 'this' and comma-separated arguments
//   introduce.call(person1, "Hello", "!");
  
//   // Method 2: apply - invoke with specific 'this' and array of arguments
//   introduce.apply(person2, ["Hi there", "."]);
  
//   // Method 3: bind - creates a new function with 'this' permanently bound
//   const introduceCarlos = introduce.bind(person1);
//   introduceCarlos("Greetings", "...");
  
//   // Bind is hard-binding - it cannot be overridden
//   introduceCarlos.call(person2, "Attempted override", "?"); // Still uses person1
  
//   // PARTIAL APPLICATION: A powerful pattern
//   const sayHelloCarlos = introduce.bind(person1, "Hello");
//   sayHelloCarlos("!"); // Second arg only, first is preset
  
//   // HISTORICAL INSIGHT: bind() wasn't added until ES5 (2009)
//   // Before that, developers created their own bind polyfills like:
//   function customBind(fn, context) {
//     return function(...args) {
//       return fn.apply(context, args);
//     };
//   }
  
//   const customBoundFn = customBind(introduce, person2);
//   customBoundFn("Howdy", "!!");
// }

// // ------------------------------------------------------------------------------
// // RULE 4: CONSTRUCTOR BINDING (NEW KEYWORD)
// // ------------------------------------------------------------------------------

// function demonstrateConstructorBinding() {
//   console.log("\n----- CONSTRUCTOR BINDING -----");
  
//   class Product {
//     constructor(name, price) {
//       // When called with 'new', 'this' is a brand new object
//       // that inherits from Product.prototype
//       this.name = name;
//       this.price = price;
      
//       console.log("Inside constructor, this is:", this);
      
//       // No explicit return needed - 'new' returns 'this' implicitly
      
//       // If you DID return an object explicitly, it would override the default behavior
//       // return { overridden: true }; // This would replace the 'this' object
//     }
    
//     display() {
//       console.log(`Product: ${this.name}, Price: $${this.price}`);
//     }
//   }
  
//   // Using 'new' creates a new object and binds it to 'this' in the constructor
//   const laptop = new Product("Laptop", 999);
//   laptop.display();
  
//   // DANGER: Forgetting 'new' was a common bug in pre-ES6 code
//   // const tablet = Product("Tablet", 499); // 'this' becomes global object!
  
//   // BEST PRACTICE: ES6 classes enforce 'new', preventing this mistake
//   class SafeProduct {
//     constructor(name, price) {
//       this.name = name;
//       this.price = price;
//     }
    
//     display() {
//       console.log(`Product: ${this.name}, Price: $${this.price}`);
//     }
//   }
  
//   const phone = new SafeProduct("Phone", 799);
//   phone.display();
  
//   // ERROR: Cannot call class constructor without 'new'
//   // const mistake = SafeProduct("Mistake", 0);
// }

// // ==============================================================================
// // SECTION 2: SPECIAL CASES AND MODERN PATTERNS
// // ==============================================================================

// // ------------------------------------------------------------------------------
// // ARROW FUNCTIONS AND LEXICAL 'THIS'
// // ------------------------------------------------------------------------------

// function demonstrateArrowFunctions() {
//   console.log("\n----- ARROW FUNCTIONS -----");
  
//   const team = {
//     name: "Dream Team",
//     members: ["Alice", "Bob", "Charlie"],
    
//     // Regular method using function keyword
//     showWithRegularFunction() {
//       console.log(`Team: ${this.name}`); // 'this' is team object
      
//       // Pre-ES6 workaround
//       const self = this; // Capture 'this' in closure
      
//       // Problem: Each function creates its own 'this' binding
//       this.members.forEach(function(member) {
//         // 'this' is undefined (strict mode) or global (non-strict)
//         console.log(`Regular function: ${member} is in ${this?.name || "undefined"}`);
        
//         // Old solution using captured 'self'
//         console.log(`Using self: ${member} is in ${self.name}`);
//       });
      
//       // ES6 solution: Arrow functions inherit 'this' from enclosing scope
//       this.members.forEach(member => {
//         console.log(`Arrow function: ${member} is in ${this.name}`);
//       });
//     },
    
//     // Arrow function as method (ANTI-PATTERN!)
//     showWithArrowMethod: () => {
//       // 'this' is NOT the team object - it's inherited from where the object is defined
//       console.log("In arrow method, this is:", this);
//       console.log(`This won't work as expected: ${this?.name || "undefined"}`);
//     }
//   };
  
//   team.showWithRegularFunction();
//   team.showWithArrowMethod();
  
//   // HISTORICAL CONTEXT: Arrow functions (ES6, 2015) revolutionized callback patterns
//   // Before arrows, libraries like jQuery often provided special 'proxy' methods
//   // to handle 'this' binding in callbacks
// }

// // ------------------------------------------------------------------------------
// // EVENT HANDLERS AND DOM CONTEXT
// // ------------------------------------------------------------------------------

// function demonstrateDOMEvents() {
//   console.log("\n----- DOM EVENTS (code only - not executed) -----");
  
//   // In browser environments, event handlers set 'this' to the DOM element
  
//   /* 
//   // Traditional DOM event handlers (browser code)
//   document.querySelector("button").addEventListener("click", function(event) {
//     // 'this' is the button element (not window, not the handler function)
//     console.log("Button clicked, this is:", this);
//     this.textContent = "Clicked!";
    
//     // Common mistake: using 'this' in nested functions
//     setTimeout(function() {
//       // 'this' is now the global object, not the button
//       this.textContent = "Oops!"; // FAILS
//     }, 1000);
    
//     // Solution 1: Capture 'this'
//     const button = this;
//     setTimeout(function() {
//       button.textContent = "Fixed with variable";
//     }, 2000);
    
//     // Solution 2: Arrow function
//     setTimeout(() => {
//       this.textContent = "Fixed with arrow function";
//     }, 3000);
//   });
//   */
  
//   // MODERN PRACTICE: Many developers now prefer explicit parameters
//   // over relying on 'this' binding in DOM event handlers
  
//   /*
//   document.querySelector("button").addEventListener("click", (event) => {
//     const button = event.currentTarget;
//     button.textContent = "Clicked!";
    
//     // This approach is more predictable and easier to understand
//   });
//   */
// }

// // ==============================================================================
// // SECTION 3: ADVANCED PATTERNS AND EDGE CASES
// // ==============================================================================

// // ------------------------------------------------------------------------------
// // BINDING PRECEDENCE
// // ------------------------------------------------------------------------------

// function demonstrateBindingPrecedence() {
//   console.log("\n----- BINDING PRECEDENCE -----");
  
//   // The rules have a clear order of precedence:
//   // 1. 'new' binding (constructor)
//   // 2. Explicit binding (call/apply/bind)
//   // 3. Implicit binding (method call)
//   // 4. Default binding (fallback)
  
//   function testPrecedence() {
//     console.log("Inside testPrecedence, this is:", this?.name || this);
//   }
  
//   const obj1 = { name: "Object 1", test: testPrecedence };
//   const obj2 = { name: "Object 2" };
  
//   // Default binding
//   testPrecedence(); // this = global object (non-strict) or undefined (strict)
  
//   // Implicit binding
//   obj1.test(); // this = obj1
  
//   // Explicit binding overrides implicit
//   obj1.test.call(obj2); // this = obj2, not obj1
  
//   // Hard binding via bind
//   const boundFunction = testPrecedence.bind(obj1);
//   boundFunction(); // this = obj1
//   boundFunction.call(obj2); // Still obj1 - bind can't be overridden
  
//   class ConstructorFn {
//     constructor() {
//       this.name = "New object";
//       console.log("In constructor, this is:", this);
//     }
//   }
  
//   const boundConstructor = ConstructorFn.bind(obj1);
//   const newInstance = new boundConstructor(); // 'new' wins over bind!
//   console.log("After new binding:", newInstance.name); // "New object", not "Object 1"
  
//   // RARE EDGE CASE: 'new' operator with call/apply
//   // Won't work - call/apply invoke the function immediately rather than constructing
//   // const invalid = new ConstructorFn.call(obj1); // Error
// }

// // ------------------------------------------------------------------------------
// // INDIRECTION AND BORROWING METHODS
// // ------------------------------------------------------------------------------

// function demonstrateMethodBorrowing() {
//   console.log("\n----- METHOD BORROWING -----");
  
//   // Method borrowing is a powerful pattern used since early JavaScript
  
//   const person = {
//     name: "Morgan",
//     greeting: "Hello",
//     greet() {
//       return `${this.greeting}, I'm ${this.name}`;
//     }
//   };
  
//   const alternatePerson = {
//     name: "Taylor",
//     greeting: "Hi there"
//   };
  
//   // Borrowing the greet method
//   console.log(person.greet.call(alternatePerson));
  
//   // NATIVE METHOD BORROWING
//   // This pattern is frequently used with built-in methods
  
//   const arrayLike = {
//     0: "first",
//     1: "second",
//     2: "third",
//     length: 3
//   };
  
//   // Borrow Array.prototype.slice to convert array-like objects to arrays
//   const realArray = Array.prototype.slice.call(arrayLike);
//   console.log("After borrowing slice:", realArray);
  
//   // Modern alternatives:
//   const modernArray = Array.from(arrayLike);
//   console.log("Using Array.from:", modernArray);
  
//   // Array-like to array using spread (requires iterable, not just array-like)
//   // const spreadArray = [...arrayLike]; // Would error as arrayLike isn't iterable
  
//   // HISTORICAL CONTEXT: Method borrowing was essential for working with
//   // DOM NodeLists, arguments objects, and other array-like structures
//   // before ES6 introduced more elegant solutions
// }

// // ------------------------------------------------------------------------------
// // 'THIS' IN MODULE PATTERNS
// // ------------------------------------------------------------------------------

// function demonstrateModulePatterns() {
//   console.log("\n----- MODULE PATTERNS -----");
  
//   // Classic IIFE module pattern (pre-ES6)
//   const counterModule = (function() {
//     // Private variables
//     let count = 0;
    
//     // Public interface with various 'this' contexts
//     return {
//       increment() {
//         count++;
//         return this; // 'this' is the returned object for method chaining
//       },
//       decrement() {
//         count--;
//         return this;
//       },
//       getCount() {
//         return count;
//       },
//       // Arrow function demonstration
//       logCountArrow: () => {
//         // 'this' here is the module's lexical scope (likely window/global)
//         console.log(`Arrow in module: count=${count}, this=`, this);
//       },
//       // Regular function method
//       logCountRegular: function() {
//         // 'this' here is the module object
//         console.log(`Regular in module: count=${count}, this=`, this);
//       }
//     };
//   })();
  
//   counterModule.increment().increment();
//   console.log("Count:", counterModule.getCount());
//   counterModule.logCountArrow();
//   counterModule.logCountRegular();
  
//   // MODERN EQUIVALENT: ES6 modules
//   // In a real ES6 module, 'this' at the top level is undefined,
//   // not the global object as in non-module scripts.
  
//   // Example (as if in a module):
//   /*
//   export class Counter {
//     #count = 0;  // Private field (ES2022)
    
//     increment() {
//       this.#count++;
//       return this;
//     }
    
//     getCount() {
//       return this.#count;
//     }
//   }
//   */
// }

// // ------------------------------------------------------------------------------
// // 'THIS' IN CLASS INHERITANCE
// // ------------------------------------------------------------------------------

// function demonstrateClassInheritance() {
//   console.log("\n----- CLASS INHERITANCE -----");
  
//   // ES6 classes are syntactic sugar over prototypes, but handle 'this' more gracefully
  
//   class Vehicle {
//     constructor(type) {
//       this.type = type;
//     }
    
//     describe() {
//       return `This is a ${this.type}`;
//     }
    
//     static create(type) {
//       // In static methods, 'this' refers to the class itself, not an instance
//       return new this(type); // 'this' is the Vehicle class (or subclass)
//     }
//   }
  
//   class Car extends Vehicle {
//     constructor(make, model) {
//       // Must call super() before accessing 'this' in derived class
//       super("car");
//       this.make = make;
//       this.model = model;
//     }
    
//     describe() {
//       // Can call parent method with super
//       const baseDescription = super.describe();
//       return `${baseDescription} (${this.make} ${this.model})`;
//     }
//   }
  
//   const genericVehicle = Vehicle.create("bike");
//   console.log(genericVehicle.describe());
  
//   const myCar = new Car("Toyota", "Camry");
//   console.log(myCar.describe());
  
//   // HISTORICAL CONTEXT: Before ES6 classes, inheritance was done with
//   // prototypes and constructors, requiring manual 'this' binding with
//   // patterns like Function.prototype.call/apply
// }

// // ==============================================================================
// // SECTION 4: PRACTICAL APPLICATIONS AND BEST PRACTICES
// // ==============================================================================

// // ------------------------------------------------------------------------------
// // EVENT EMITTER PATTERN
// // ------------------------------------------------------------------------------

// function demonstrateEventEmitter() {
//   console.log("\n----- EVENT EMITTER PATTERN -----");
  
//   // An EventEmitter is a classic JavaScript pattern used in Node.js and browsers
  
//   class EventEmitter {
//     constructor() {
//       this.events = {};
//     }
    
//     on(event, listener) {
//       if (!this.events[event]) {
//         this.events[event] = [];
//       }
//       this.events[event].push(listener);
//       return this; // For chaining
//     }
    
//     emit(event, ...args) {
//       if (!this.events[event]) return false;
      
//       this.events[event].forEach((listener) => {
//         // Using arrow function to preserve 'this' context of EventEmitter
//         // The callback will receive its own 'this' binding
//         listener.apply(this, args);
//       });
//       return true;
//     }
    
//     removeListener(event, listener) {
//       if (!this.events[event]) return this;
//       this.events[event] = this.events[event].filter(l => l !== listener);
//       return this;
//     }
//   }
  
//   // Using the EventEmitter
//   const emitter = new EventEmitter();
  
//   function messageHandler(message) {
//     // 'this' here is set by the emitter.emit() call
//     console.log(`Received: ${message}, emitter has ${Object.keys(this.events).length} event types`);
//   }
  
//   emitter.on("message", messageHandler);
//   emitter.emit("message", "Hello from emitter");
  
//   // Node.js uses this pattern extensively in its core libraries
//   // HISTORICAL NOTE: This pattern predates Promises and was the primary
//   // way to handle asynchronous operations for many years
// }

// // ------------------------------------------------------------------------------
// // FLUENT INTERFACES / METHOD CHAINING
// // ------------------------------------------------------------------------------

// function demonstrateFluentInterfaces() {
//   console.log("\n----- FLUENT INTERFACES -----");
  
//   // Fluent interfaces rely on returning 'this' for method chaining
  
//   class QueryBuilder {
//     constructor() {
//       this.query = {
//         select: [],
//         from: "",
//         where: [],
//         orderBy: []
//       };
//     }
    
//     select(...fields) {
//       this.query.select = fields;
//       return this; // Return 'this' for chaining
//     }
    
//     from(table) {
//       this.query.from = table;
//       return this;
//     }
    
//     where(condition) {
//       this.query.where.push(condition);
//       return this;
//     }
    
//     orderBy(field, direction = "ASC") {
//       this.query.orderBy.push({ field, direction });
//       return this;
//     }
    
//     toString() {
//       let sql = `SELECT ${this.query.select.join(", ")} FROM ${this.query.from}`;
      
//       if (this.query.where.length) {
//         sql += ` WHERE ${this.query.where.join(" AND ")}`;
//       }
      
//       if (this.query.orderBy.length) {
//         const orderClauses = this.query.orderBy.map(
//           order => `${order.field} ${order.direction}`
//         );
//         sql += ` ORDER BY ${orderClauses.join(", ")}`;
//       }
      
//       return sql;
//     }
//   }
  
//   const query = new QueryBuilder()
//     .select("id", "name", "email")
//     .from("users")
//     .where("status = 'active'")
//     .where("age > 21")
//     .orderBy("name")
//     .toString();
  
//   console.log("SQL Query:", query);
  
//   // MODERN CONTEXT: Libraries like jQuery popularized this pattern,
//   // which is now ubiquitous in JavaScript libraries and frameworks
// }

// // ------------------------------------------------------------------------------
// // RECOMMENDED BEST PRACTICES
// // ------------------------------------------------------------------------------

// function demonstrateBestPractices() {
//   // 1. Prefer explicit over implicit when it comes to 'this'
//   const explicitThis = (context) => {
//     // Explicitly passing the context is clearer than relying on 'this'
//     console.log(`Name: ${context.name}`);
//   };
  
//   // 1. Prefer explicit over implicit when it comes to 'this'
//   const explicitlyNamed = (context) => {
//     // Explicitly passing the context is clearer than relying on 'this'
//     console.log(`Name: ${context.name}`);
//   };
//   // Example usage
//   explicitlyNamed({ name: "Example Context" });
//       const data = await Promise.resolve([1, 2, 3]);
//       // Arrow function preserves 'this' as the dashboard object
//       console.log(`Data loaded by: ${this.user}`);
//       return data;
//     }
//   };
  
//   // Execute the loadData method to demonstrate
//   dashboard.loadData().then(data => {
//   // 3. Avoid using standalone 'this' in complex applications
//   // BAD:
//   // Execute the loadData method to demonstrate
//   dashboard.loadData().then(() => {
//   };
  
//   // BETTER:
//   const explicitlyBound = function(context) {
//     console.log(context);
//   };
  
//   // Example usage
//   globallyAmbiguous(); // Demonstrates the ambiguity
//   explicitlyBound({ name: "Explicit Context" }); // Clearer approach
  
//   // 3. Avoid using standalone 'this' in complex applications
//   // BAD:
//   function globallyAmbiguous() {
//     console.log(this); // What is 'this'? Depends on how the function is called!
//   }
  
//   // BETTER:
//   function explicitlyBound(context) {
//     console.log(context);
//   }
  
//   // 4. Use destructuring to avoid 'this' altogether when appropriate
//   const user = {
//     name: "Jamie",
//     age: 34,
//     displayInfo() {
//       // Destructure properties instead of using 'this' repeatedly
//       const { name, age } = this;
//       console.log(`Name: ${name}, Age: ${age}`);
//     }
//   };
//   user.displayInfo();
  
//   // 5. Use class instance methods for consistent 'this' binding
//   class Task {
//     constructor(name) {
//       this.name = name;
//       this.completed = false;
      
//       // Bind method if you need to pass it around
//       this.complete = this.complete.bind(this);
//     }
    
//     complete() {
//       this.completed = true;
//       console.log(`Task ${this.name} completed`);
//     }
    
//     // Class fields with arrow functions (modern browsers/environments)
//     describe = () => {
//       return `Task: ${this.name}, Completed: ${this.completed}`;
//     }
//   }
  
//   const task = new Task("Learn this");
//   const completeFunction = task.complete;
//   completeFunction(); // Works because we bound it in constructor
  
//   console.log(task.describe());


// // ==============================================================================
// // SECTION 5: REAL-WORLD INTERVIEW QUESTIONS
// // ==============================================================================

// function demonstrateInterviewQuestions() {
//   console.log("\n----- INTERVIEW QUESTIONS -----");
  
//   // Q1: What will this code output?
//   const obj = { a: 1 };
//   function checkThis() {
//     console.log("Q1:", this.a);
//   }
//   checkThis();
//   checkThis.call(obj);
  
//   // Q2: Fix this code so the button text updates
//   /*
//   function Button(text) {
//     this.text = text;
    
//     document.getElementById('btn').addEventListener('click', function() {
//       console.log('Button clicked with text:', this.text);
//       // 'this' refers to the button element, not the Button instance
//     });
//   }
  
//   // Fix 1: Arrow function
//   function ButtonFixed1(text) {
//     this.text = text;
    
//     document.getElementById('btn').addEventListener('click', () => {
//       console.log('Button clicked with text:', this.text);
//     });
//   }
  
//   // Fix 2: Bind
//   function ButtonFixed2(text) {
//     this.text = text;
    
//     const clickHandler = function() {
//       console.log('Button clicked with text:', this.text);
//     };
    
//     document.getElementById('btn').addEventListener('click', clickHandler.bind(this));
//   }
//   */
  
//   // Q3: What is the value of 'this' in nested functions?
//   const nestedObj = {
//     value: 42,
//     printValue: function() {
//       console.log("Q3 Outer:", this.value);
      
//       function inner() {
//         console.log("Q3 Inner:", this?.value);
//       }
      
//       inner();
//     }
//   };
//   nestedObj.printValue();
  
//   // Q4: How does 'this' work with ES6 classes?
//   class Calculator {
//     constructor(initialValue = 0) {
//       this.value = initialValue;
//     }
    
//     add(n) {
//       this.value += n;
//       return this; // For method chaining
//     }
    
//     multiply(n) {
//       this.value *= n;
//       return this;
//     }
    
//     getValue() {
//       return this.value;
//     }
//   }
  
//   console.log("Q4:", new Calculator(2).add(3).multiply(5).getValue());
// }

// // ==============================================================================
// // EXECUTE DEMONSTRATIONS
// // ==============================================================================

// console.log("===============================================================");
// console.log("                  UNDERSTANDING 'THIS' IN JAVASCRIPT           ");
// console.log("===============================================================");

// // Run all demonstration functions
// demonstrateDefaultBinding();
// demonstrateImplicitBinding();
// demonstrateExplicitBinding();
// demonstrateConstructorBinding();
// demonstrateArrowFunctions();
// // demonstrateDOMEvents(); // Would only work in browser
// demonstrateBindingPrecedence();
// demonstrateMethodBorrowing();
// demonstrateModulePatterns();
// demonstrateClassInheritance();
// demonstrateEventEmitter();
// demonstrateFluentInterfaces();
// demonstrateBestPractices();
// demonstrateInterviewQuestions();

// console.log("\n===============================================================");
// console.log("                         CONCLUSION                            ");
// console.log("===============================================================");
// console.log(`

// The evolution of JavaScript has provided us better tools for managing 'this':

// * ES3/ES5: Function.prototype.bind, strict mode
// * ES6+: Arrow functions, classes, lexical this
// * Modern: Class fields, React hooks (functional approach)

// Understanding when to leverage 'this' and when to avoid it is key to writing
// maintainable JavaScript code. In modern applications, we often use patterns
// that reduce reliance on 'this', but it remains fundamental to the language.

// Remember the binding rules:
// 1. Constructor binding ('new')
// 2. Explicit binding (call/apply/bind)
// 3. Implicit binding (method call)
// 4. Default binding (standalone)

// And when in doubt, use arrow functions for callbacks or explicitly bind your
// functions to ensure the context remains what you expect.
// `);
// }
// )
// }
