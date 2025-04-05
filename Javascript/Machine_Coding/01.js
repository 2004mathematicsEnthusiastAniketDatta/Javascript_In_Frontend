//Machine_Coding -> concept , task based
//task based : Design a quiz app
// concept based : Pollyfills ,NegativeIndexedArray
//NegativeIndexedArray : With proxy object(The Proxy object enables you to create a proxy for another object, which can intercept and redefine fundamental operations for that object.)
let arr = [1, 2, 3, 4, 5 , 6, 7, 8, 9, 10];
// arr.length is a property of proxy object of arr i.e, proxied property
function createArrayWithNegativeIndices(arr){
    return new Proxy(arr,{
        get(target,property){
                const index = Number(property); // Convert string to number
                if (index < 0){
                    return target[target.length + index]; // Convert negative index to positive
                }
                return target[index]; // Return the property as is
            },
        set(target,property,value){
           const index = Number(property); // Convert string to number
           if(index < 0){
              target[target.length + index] = value; // Convert negative index to positive
           }
           else{
              target[index] = value; // Set the property as is
           }
           return true; // Indicate success        
        }
    })
}
// let arr = [1, 2, 3, 4, 5 , 6, 7, 8, 9, 10];
let arr2 = createArrayWithNegativeIndices(arr);
console.log(arr2[-1]); // 10
arr2[-1] = 0; // Set the last element to 100
console.log(arr2); // 0
console.log(arr); // 0
 // Proxy is neither a shallow copy nor a deep copy of the original object
 //A Proxy appears to be a wrapper that intercepts operations on an object
console.log( arr[-1]);

/**
 * Problem 1: Implement a debounce function (legacy version)
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @return {Function} - The debounced function
 */
function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

/**
 * Problem 2: Implement a throttle function (legacy version)
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @return {Function} - The throttled function
 */
function throttle(func, limit) {
    var inThrottle = false;
    return function() {
        var context = this;
        var args = arguments;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

/**
 * Problem 3: Implement a deep clone function (legacy version)
 * @param {Object} obj - The object to clone
 * @return {Object} - A deep copy of the input
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    if (obj instanceof Date) {
        return new Date(obj);
    }
    
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0; i < obj.length; i++) {
            copy[i] = deepClone(obj[i]);
        }
        return copy;
    }
    
    if (obj instanceof Object) {
        var copy = {};
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                copy[key] = deepClone(obj[key]);
            }
        }
        return copy;
    }
}

/**
 * Problem 4: Implement a Promise.all polyfill (legacy version)
 * @param {Array<Promise>} promises - Array of promises
 * @return {Promise} - Promise that resolves with array of results or rejects with first error
 */
function promiseAll(promises) {
    return new Promise(function(resolve, reject) {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('Argument must be an array'));
        }
        
        var results = new Array(promises.length);
        var completed = 0;
        
        if (promises.length === 0) {
            return resolve(results);
        }
        
        for (var i = 0; i < promises.length; i++) {
            (function(i) {
                Promise.resolve(promises[i])
                    .then(function(result) {
                        results[i] = result;
                        completed++;
                        
                        if (completed === promises.length) {
                            resolve(results);
                        }
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            })(i);
        }
    });
}

/**
 * Problem 5: Implement a function to flatten a nested array (legacy version)
 * @param {Array} arr - The array to flatten
 * @return {Array} - The flattened array
 */
function flattenArray(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            var flattened = flattenArray(arr[i]);
            for (var j = 0; j < flattened.length; j++) {
                result.push(flattened[j]);
            }
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}
// Example usage for Problem 1: Debounce
function handleSearch(query) {
    console.log('Searching for:', query);
}
const debouncedSearch = debounce(handleSearch, 300);
// Simulate rapid typing in a search box
// Only the last call will execute after 300ms
debouncedSearch('a');
debouncedSearch('ap');
debouncedSearch('app');
debouncedSearch('appl');
debouncedSearch('apple');

// Example usage for Problem 2: Throttle
function handleScroll(event) {
    console.log('Handling scroll event');
}
const throttledScroll = throttle(handleScroll, 1000);
// Attach to scroll event (in a real application)
// window.addEventListener('scroll', throttledScroll);
// Simulate rapid scroll events
// Event will fire immediately, then at most once per second
throttledScroll();
throttledScroll();
throttledScroll();

// Example usage for Problem 3: Deep Clone
const originalObject = {
    name: 'John',
    age: 30,
    address: {
        city: 'New York',
        zip: 10001
    },
    hobbies: ['reading', 'coding'],
    birthday: new Date('1990-01-01')
};
const clonedObject = deepClone(originalObject);
console.log('Original:', originalObject);
console.log('Clone:', clonedObject);
console.log('Are equal?', originalObject === clonedObject); // false
console.log('Nested equal?', originalObject.address === clonedObject.address); // false

// Example usage for Problem 4: Promise.all
const promise1 = Promise.resolve(1);
const promise2 = new Promise(resolve => setTimeout(() => resolve(2), 100));
const promise3 = new Promise(resolve => setTimeout(() => resolve(3), 50));

promiseAll([promise1, promise2, promise3])
    .then(results => console.log('All promises resolved:', results))
    .catch(error => console.error('At least one promise rejected:', error));

// Example with a rejection
const promise4 = Promise.reject('Something went wrong');
promiseAll([promise1, promise4, promise3])
    .then(results => console.log('All promises resolved:', results))
    .catch(error => console.error('At least one promise rejected:', error));

// Example usage for Problem 5: Flatten Array
const nestedArray = [1, [2, 3], [4, [5, 6]], 7, [8, [9, [10]]]];
const flatArray = flattenArray(nestedArray);
console.log('Nested array:', nestedArray);
console.log('Flattened array:', flatArray);