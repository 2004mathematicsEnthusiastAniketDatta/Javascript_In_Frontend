function createCounter(stepSize = 1 , initialValue = 0) {
    let count = initialValue;
    return function() {
        count += stepSize;
        return count;
    }
}
const counter1 = createCounter(1, 1);
console.log(counter1()); // 2
console.log(counter1()); // 3
console.log(counter1()); // 4

function createDebouncedVersion(fn , delay){
    let timerId = null;
    return function(...args){
        if(timerId){
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}

function apiCall(){
    console.log("API called");
    // Simulate API call
    return fetch('https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=10&inc=category%252Cprice%252Cthumbnail%252Cimages%252Ctitle%252Cid&query=mens-watches');
}

const apiCallWithDebounce = createDebouncedVersion(apiCall, 5*1000);
apiCallWithDebounce();
/**In JavaScript, currying is a functional programming technique that transforms a function
 *  with multiple arguments into a sequence of functions, 
 * each taking a single argument, allowing for partial application 
 * and creating new functions by fixing some parameters.  */

// your normal function
const addition = (a, b) => {
    return a + b;
  }
  
  console.log(addition(1,2)); // 3
  
  //  currying
  const add = (a) => {
    return (b) => {
      return a + b;
    }
  }
  
  console.log(add(1)(2)); // 3

  const distance = function(start){
    // we have a closed scope here, but we'll return a function that
    //  can access it - effectively creating a "closure".
    return function(end){
      // now, in this function, we have everything we need. we can do
      //  the calculation and return the result.
      return Math.sqrt( Math.pow(end.x-start.x, 2) + Math.pow(end.y-start.y, 2) );
    }
  }
  
  console.log( distance({x:2, y:2})({x:11, y:8}));

//   const distancewithCurrying = 
//   (start) => 
//     (end) => Math.sqrt( Math.pow(end.x-start.x, 2) +
//                         Math.pow(end.y-start.y, 2) );

// Curried version using arrow functions
const distanceWithCurrying = 
    (start) => 
        (end) => Math.sqrt(Math.pow(end.x-start.x, 2) + 
                                             Math.pow(end.y-start.y, 2));

console.log(distanceWithCurrying({x:2, y:2})({x:11, y:8}));

// Example of multi-argument currying
const multiply = (a) => (b) => (c) => a * b * c;
console.log(multiply(2)(3)(4)); // 24

// Practical example: Creating a configurable formatter
const formatCurrency = (currency) => (amount) => 
    `${currency}${amount.toFixed(2)}`;

const formatUSD = formatCurrency('$');
const formatEUR = formatCurrency('€');

console.log(formatUSD(100)); // $100.00
console.log(formatEUR(100)); // €100.00

// Curry function to transform any function into curried version
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...moreArgs) {
                return curried.apply(this, args.concat(moreArgs));
            };
        }
    };
}

// Using the curry function
const sum = curry((a, b, c) => a + b + c);
console.log(sum(1)(2)(3)); // 6
console.log(sum(1, 2)(3)); // 6
console.log(sum(1)(2, 3)); // 6

