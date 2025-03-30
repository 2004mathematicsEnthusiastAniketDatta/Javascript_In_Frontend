// console.log(`Age is ${age}`); // ReferenceError: age is not defined
console.log(`Age is ${a}`); //Age is undefined
var a= 20; // Hoisted to the top of the function scopeA
let age = 20; // Hoisted to the top of the block scope
console.log(`Age is ${age}`); //Age is 20
console.log(`Age is ${a}`); //Age is 20
a= null; // a is now null

// Global Execution Context

// Memory Phase:                                  // Code Phase:
// age: undefined                               // console.log(`Age is ${age}`); // age: undefined                                 // var a= 20;  
//                                              // var age = 20;
// age= 20;                                    // console.log(`Age is ${age}`); // age: 20
//function square(n){...}                      //n: undefined
//function square(n=5){...}                      //console.log(square(5)); // 25
/*JavaScript Hoisting refers to the process whereby the interpreter appears to move the declaration of functions, variables, classes, or imports to the top of their scope, prior to execution of the code.

Hoisting is not a term normatively defined in the ECMAScript specification. The spec does define a group of declarations as HoistableDeclaration, but this only includes function, function*, async function, and async function* declarations. Hoisting is often considered a feature of var declarations as well, although in a different way. In colloquial terms, any of the following behaviors may be regarded as hoisting:

Being able to use a variable's value in its scope before the line it is declared. ("Value hoisting")
Being able to reference a variable in its scope before the line it is declared, without throwing a ReferenceError, but the value is always undefined. ("Declaration hoisting")
The declaration of the variable causes behavior changes in its scope before the line in which it is declared.
The side effects of a declaration are produced before evaluating the rest of the code that contains it.
The four function declarations above are hoisted with type 1 behavior; var declaration is hoisted with type 2 behavior; let, const, and class declarations (also collectively called lexical declarations) are hoisted with type 3 behavior; import declarations are hoisted with type 1 and type 4 behavior.
 Some prefer to see let, const, and class as non-hoisting, because the temporal dead zone strictly forbids any use of the variable before its declaration. This dissent is fine, since hoisting is not a universally-agreed term. However, the temporal dead zone can cause other observable changes in its scope, which suggests there's some form of hoisting:*/

 console.log(square(5)); // 25

function square(n) {
  return n * n;
}
/*This code runs without any error, despite the square() function being called before 
it's declared. 
This is because the JavaScript interpreter hoists the entire function declaration 
to the top of the current scope, so the code above is equivalent to:
*/
console.log(square(5)); // 25

/* console.log(square(5)); // ReferenceError: Cannot access 'square' before initialization
const square = function (n) {
  return n * n;
};
*/
/*This code throws a ReferenceError because the square variable is not hoisted.*/

// Recursion
let document = {
  body: {
    childNodes: [
      { childNodes: [] },
      { childNodes: [{ childNodes: [] }] },
      { childNodes: [] },
    ],
  },
};
function walkTree(node) {
    if (node === null) {
      return;
    }
    // do something with node
    for (let i = 0; i < node.childNodes.length; i++) {
      walkTree(node.childNodes[i]);
    }
  }
  walkTree(document.body);

// ------------------- JAVASCRIPT CALL STACK EXPLAINED -------------------

/*
 * THE CALL STACK IN JAVASCRIPT
 * 
 * The call stack is a data structure that records where in the program we are.
 * It works on the LIFO principle (Last In, First Out).
 * 
 * When we execute a script, JavaScript creates a Global Execution Context and pushes it onto the stack.
 * When a function is called, JavaScript creates a new Function Execution Context for that function
 * and pushes it on top of the current context.
 * 
 * When the current function completes, its Execution Context is popped off the stack,
 * and control returns to the context below it.
 */

// Let's visualize the call stack:
function firstFunction() {
  console.log("Inside first function");
  secondFunction();
  console.log("Back to first function");
}

function secondFunction() {
  console.log("Inside second function");
  thirdFunction();
  console.log("Back to second function");
}

function thirdFunction() {
  console.log("Inside third function");
  // Call stack at this point:
  // 1. thirdFunction() - top of stack
  // 2. secondFunction()
  // 3. firstFunction()
  // 4. Global Execution Context - bottom of stack
}

console.log("Starting call stack example");
firstFunction();
console.log("Call stack example complete");

/*
 * EXECUTION CONTEXT IN DETAIL
 * 
 * Each execution context has two phases:
 * 1. Creation Phase:
 *    - Creates the Variable Environment (memory space)
 *    - Sets up the scope chain
 *    - Determines the value of 'this'
 * 
 * 2. Execution Phase:
 *    - Assigns values to variables
 *    - Executes function calls and code
 */

// Example of execution context and scope chain
function outer() {
  let outerVar = "I'm from outer";
  
  function inner() {
    let innerVar = "I'm from inner";
    console.log(innerVar); // Accessible
    console.log(outerVar); // Accessible through scope chain
    // console.log(globalVar); // Accessible through scope chain
  }
  
  inner();
}

let globalVar = "I'm global";
outer();

/*
 * CALL STACK LIMITATIONS
 * 
 * The call stack has a size limit.
 * When too many function calls accumulate on the stack, it leads to "stack overflow".
 */

// Stack overflow example (don't run this - it's for demonstration)
function recursiveFunction() {
  recursiveFunction(); // Calls itself indefinitely until stack overflows
}

// setTimeout and the Event Loop
console.log("Start");

setTimeout(function() {
  console.log("Timeout callback");
}, 0);

console.log("End");

/*
 * The above code will log:
 * "Start"
 * "End"
 * "Timeout callback"
 * 
 * Even though the timeout is 0ms, the callback function goes through the task queue
 * and only executes after the call stack is empty.
 * 
 * EXECUTION MODEL:
 * 1. Global code runs ("Start" logs)
 * 2. setTimeout is processed, callback is sent to Web API
 * 3. Global code continues ("End" logs)
 * 4. Call stack empties
 * 5. Event loop checks queue, finds callback
 * 6. Callback is moved to stack and executed ("Timeout callback" logs)
 */

// Error handling and stack traces
// function errorGenerator() {
//   throw new Error('Something went wrong!');
// }

// function intermediateFunction() {
//   errorGenerator();
// }

// try {
//   intermediateFunction();
// } catch (error) {
//   console.log('Error caught!');
//   console.log('Stack trace shows the call path:');
//   console.log(error.stack);
//   // The stack trace will show:
//   // errorGenerator -> intermediateFunction -> global scope
// }

/*
 * SUMMARY OF JAVASCRIPT EXECUTION:
 * 
 * 1. JavaScript is single-threaded with one call stack
 * 2. Function calls create new execution contexts
 * 3. Execution contexts have creation and execution phases
 * 4. The event loop enables asynchronous behavior
 * 5. Call stack maintains the order of execution
 * 6. Scope chain determines variable access
 */
//let -> Can't do hoisting 
//const -> Can't do hoisting
// Temporal Dead Zone (TDZ) -> The time between the start of the block 
// and the declaration of the variable

// The variable is in the TDZ and cannot be accessed
// until it is declared. Accessing it will throw a ReferenceError.

/*Temporal Dead Zone and Hoisting are two essential terms in JavaScript. But understanding how they work can easily confuse you if you don't approach them properly.

But don't fret! This article is here to help you get a good grasp of the two terms.

So relax, grab your favorite cup of coffee, and let’s get started with TDZ.

What Exactly Is a Temporal Dead Zone in JavaScript?
A temporal dead zone (TDZ) is the area of a block where a variable is inaccessible until the moment the computer completely initializes it with a value.

A block is a pair of braces ({...}) used to group multiple statements.
Initialization occurs when you assign an initial value to a variable.
Suppose you attempt to access a variable before its complete initialization. In such a case, JavaScript will throw a ReferenceError.

So, to prevent JavaScript from throwing such an error, you’ve got to remember to access your variables from outside the temporal dead zone.

But where exactly does the TDZ begin and end? Let’s find out below.

Where Exactly Is the Scope of a Temporal Dead Zone?
A block’s temporal dead zone starts at the beginning of the block’s local scope. It ends when the computer fully initializes your variable with a value.

Here’s an example:

{
  // bestFood’s TDZ starts here (at the beginning of this block’s local scope)
  // bestFood’s TDZ continues here
  // bestFood’s TDZ continues here
  // bestFood’s TDZ continues here
  console.log(bestFood); // returns ReferenceError because bestFood’s TDZ continues here
  // bestFood’s TDZ continues here
  // bestFood’s TDZ continues here
  let bestFood = "Vegetable Fried Rice"; // bestFood’s TDZ ends here
  // bestFood’s TDZ does not exist here
  // bestFood’s TDZ does not exist here
  // bestFood’s TDZ does not exist here
}
Try it on StackBlitz

In the snippet above, the block’s TDZ starts from the opening curly bracket ({) and ends once the computer initializes bestFood with the string value "Vegetable Fried Rice".

When you run the snippet, you will see that the console.log() statement will return a ReferenceError.

JavaScript will return a ReferenceError because we used the console.log() code to access bestFood before its complete initialization. In other words, we invoked bestFood within the temporal dead zone.

However, here is how you can access bestFood successfully after its complete initialization:

{
  // TDZ starts here (at the beginning of this block’s local scope)
  // bestFood’s TDZ continues here
  // bestFood’s TDZ continues here
  // bestFood’s TDZ continues here
  // bestFood’s TDZ continues here
  // bestFood’s TDZ continues here
  // bestFood’s TDZ continues here
  let bestFood = "Vegetable Fried Rice"; // bestFood’s TDZ ends here
  console.log(bestFood); // returns "Vegetable Fried Rice" because bestFood’s TDZ does not exist here
  // bestFood’s TDZ does not exist here
  // bestFood’s TDZ does not exist here
}
Try it on StackBlitz

Now, consider this example:

{
  // TDZ starts here (at the beginning of this block’s local scope)
  // bestFood’s TDZ continues here
  // bestFood’s TDZ continues here
  // bestFood’s TDZ continues here
  // bestFood’s TDZ continues here
  // bestFood’s TDZ continues here
  // bestFood’s TDZ continues here
  let bestFood; // bestFood’s TDZ ends here
  console.log(bestFood); // returns undefined because bestFood’s TDZ does not exist here
  bestFood = "Vegetable Fried Rice"; // bestFood’s TDZ does not exist here
  console.log(bestFood); // returns "Vegetable Fried Rice" because bestFood’s TDZ does not exist here
}
Try it on StackBlitz

You can see that the first console.log code in the snippet above returned undefined.

JavaScript returned undefined because we did not assign bestFood a value before using (invoking) it. As such, JavaScript defaulted its value to undefined.

Keep in mind that you must specify a value for a const variable while declaring it. Apart from this exception, all other temporal dead zone principles of let variables apply also to const. However, var works differently.

How Does Var’s TDZ Differ from Let and Const Variables?
The main difference between the temporal dead zone of a var, let, and const variable is when their TDZ ends.

For instance, consider this code:

{
  // bestFood’s TDZ starts and ends here
  console.log(bestFood); // returns undefined because bestFood’s TDZ does not exist here
  var bestFood = "Vegetable Fried Rice"; // bestFood’s TDZ does not exist here
  console.log(bestFood); // returns "Vegetable Fried Rice" because bestFood’s TDZ does not exist here
  // bestFood’s TDZ does not exist here
  // bestFood’s TDZ does not exist here
}
Try it on StackBlitz

When you run the snippet above, you will see that the first console.log statement will return undefined.

The console.log statement successfully returned a value (undefined) because JavaScript automatically assigns undefined to a hoisted var variable.

In other words, when the computer hoists a var variable, it automatically initializes the variable with the value undefined.

In contrast, JavaScript does not initialize a let (or const) variable with any value whenever it hoists the variable. Instead, the variable remains dead and inaccessible.

Therefore, a let (or const) variable’s TDZ ends when JavaScript fully initializes it with the value specified during its declaration.

However, a var variable’s TDZ ends immediately after its hoisting—not when the variable gets fully initialized with the value specified during its declaration.

But what exactly does “hoisting” mean? Let’s find out below.

What Exactly Does Hoisting Mean in JavaScript?
Hoisting refers to JavaScript giving higher precedence to the declaration of variables, classes, and functions during a program’s execution.

Hoisting makes the computer process declarations before any other code.

Note: Hoisting does not mean JavaScript rearranges or moves code above one another.

Hoisting simply gives higher specificity to JavaScript declarations. Thus, it makes the computer read and process declarations first before analyzing any other code in a program.

For instance, consider this snippet:

{
  // Declare a variable:
  let bestFood = "Fish and Chips";

  // Declare another variable:
  let myBestMeal = function () {
    console.log(bestFood);
    let bestFood = "Vegetable Fried Rice";
  };

  // Invoke myBestMeal function:
  myBestMeal();
}

// The code above will return:
"Uncaught ReferenceError: Cannot access 'bestFood' before initialization"
Try it on StackBlitz

The snippet above returned a ReferenceError because of the order of precedence by which the computer executed each code.

In other words, the program’s declarations got higher precedence over initializations, invocations, and other code.

Let’s go through a step-by-step tour of how JavaScript executed the snippet above.

How JavaScript Hoisting Works Step-by-Step
Below is a walk-through of how JavaScript executed the previous snippet.

1. JavaScript parsed the first bestFood declaration
let bestFood // This is the first bestFood declaration in the program
The first bestFood variable declaration is the first code the computer analyzed.

Note that after the computer read the bestFood variable declaration, JavaScript automatically kept the variable in a temporal dead zone until it got fully initialized.

Therefore, any attempt to access bestFood before its complete initialization would return a ReferenceError.

2. The computer parsed myBestMeal variable declaration
let myBestMeal
The myBestMeal variable declaration was the second code JavaScript analyzed.

Immediately after the computer read the myBestMeal variable declaration, JavaScript automatically kept the variable in a temporal dead zone until it got fully initialized.

Therefore, any attempt to access myBestMeal before its complete initialization would return a ReferenceError.

3. The computer initialized the bestFood variable
bestFood = "Fish and Chips";
The computer’s third step was to initialize bestFood with the “Fish and Chips” string value.

Therefore, invoking bestFood at this point would return “Fish and Chips”.

4. JavaScript initialized myBestMeal variable
myBestMeal = function() {
  console.log(bestFood);
  let bestFood = "Vegetable Fried Rice";
};
Fourthly, JavaScript initialized myBestMeal with the specified function. So, if you had invoked myBestMeal at this point, the function would have returned.

5. The computer invoked myBestMeal’s function
myBestMeal();
The invocation of myBestMeal’s function was the computer’s fifth action.

After the invocation, the computer processed each code in the function’s block. However, the declarations had higher precedence over other code.

6. JavaScript parsed the function’s bestFood declaration
let bestFood // This is the second bestFood declaration in the program
JavaScript’s sixth task was to analyze the function’s bestFood variable declaration.

After the analysis, JavaScript automatically kept the variable in a temporal dead zone—until its complete initialization.

Therefore, any attempt to access bestFood before its complete initialization would return a ReferenceError.

7. The computer parsed the function’s console.log statement
console.log(bestFood);
Finally, the computer read the console.log statement—which instructed the system to log bestFood’s content to the browser’s console.

However, remember that the computer has not fully initialized the function’s bestFood variable yet. As such, the variable is currently in a temporal dead zone.

Therefore, the system’s attempt to access the variable returned a ReferenceError.

Note: After the ReferenceError returned, the computer stopped reading the function’s code. Therefore, JavaScript did not initialize the function’s bestFood variable with "Vegetable Fried Rice".

Wrapping It Up
Let’s see the previous walk-through of our program in one piece:

let bestFood // 1. JavaScript parsed the first bestFood declaration

let myBestMeal // 2. the computer parsed myBestMeal variable declaration

bestFood = "Fish and Chips"; // 3. the computer initialized the bestFood variable

myBestMeal = function () {
  console.log(bestFood);
  let bestFood = "Vegetable Fried Rice";
}; // 4. JavaScript initialized myBestMeal variable

myBestMeal(); // 5. the computer invoked myBestMeal’s function

let bestFood // 6. JavaScript parsed the function’s bestFood declaration

console.log(bestFood); // 7. the computer parsed the function’s console.log statement

Uncaught ReferenceError // bestFood’s invocation returned an Error
You can see that JavaScript processed the program’s declarations before other code.

The parsing of declarations before other code in a program is what we call “hoisting”.

Overview
This article discussed what temporal dead zone and hoisting mean in JavaScript. We also used examples to illustrate how they both work.

Thanks for reading!

And here's a useful ReactJS resource:
I wrote a book about React!

It's beginners friendly ✔
It has live code snippets ✔
It contains scalable projects ✔
It has plenty of easy-to-grasp examples ✔
The React Explained Clearly book is all you need to understand ReactJS.
 # Hoisting in let and const
hoisting happens in let but cannot be accessed because of temporal dead zone.
hoisting in const occurs but cannot be accessed because of temporal dead zone.
*/
