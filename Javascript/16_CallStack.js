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


