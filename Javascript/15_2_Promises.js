// ==================== PROMISES IN JAVASCRIPT ====================
// A Promise is an object representing the eventual completion or failure of an asynchronous operation.
// Promises provide a cleaner alternative to callback-based asynchronous programming.

// 1. Creating a basic Promise
const simplePromise = new Promise((resolve, reject) => {
  // The Promise constructor takes an executor function with resolve and reject parameters
  const success = true; // Simulating a condition for success
  
  // Based on the operation result, we either:
  if (success) {
    resolve("Operation successful!"); // Call resolve with the result if successful
  } else {
    reject(new Error("Operation failed!")); // Call reject with an error if failed
  }
});

// 2. Consuming a Promise with then/catch methods
simplePromise
  .then(result => {
    // .then registers a callback to be executed when the promise resolves successfully
    console.log("Success:", result);
  })
  .catch(error => {
    // .catch registers a callback to be executed when the promise is rejected
    console.error("Error:", error);
  });

// 3. Creating a utility function that returns a Promise to implement delay
/**
 * Creates a promise that resolves after a specified delay
 * @param {number} ms - The delay time in milliseconds
 * @returns {Promise<string>} A promise that resolves after the specified delay
 */
function delay(ms) {
  return new Promise(resolve => {
    // setTimeout is used to delay the resolution of the promise
    setTimeout(() => resolve(`Delayed for ${ms} ms`), ms);
  });
}

// Using the delay function
delay(2000).then(message => console.log(message));

// 4. Promise chaining - each .then returns a new Promise allowing for sequential operations
delay(1000)
  .then(result => {
    console.log(result); // Logs "Delayed for 1000 ms"
    return "First chain complete"; // The return value becomes the resolved value of the new promise
  })
  .then(result => {
    console.log(result); // Logs "First chain complete"
    return "Second chain complete"; // Return another value for the next chain
  })
  .then(console.log); // Shorthand for result => console.log(result)

// 5. Promise.all - waits for all promises to resolve or any to reject
Promise.all([
  delay(1000), // First promise - resolves after 1000ms
  delay(2000), // Second promise - resolves after 2000ms
  delay(1500)  // Third promise - resolves after 1500ms
]).then(results => {
  // Results is an array containing the resolved values of all promises, in order
  console.log("All promises resolved:", results);
});

// 6. Promise.race - resolves/rejects as soon as one promise resolves/rejects
Promise.race([
  delay(1000), // Resolves after 1000ms
  delay(500),  // Resolves after 500ms - this will win the race
  delay(1500)  // Resolves after 1500ms
]).then(result => {
  // Result is the value of the first promise to resolve (the 500ms one)
  console.log("Fastest promise:", result);
});

// 7. API fetch example using Promises with then/catch
const url = 'https://api.freeapi.app/api/v1/public/randomproducts/product/random';
const options = { 
  method: 'GET', 
  headers: { accept: 'application/json' } 
};

// The fetch API returns a promise
fetch(url, options)
  .then(response => {
    // First .then receives the Response object
    return response.json(); // response.json() also returns a Promise
  })
  .then(data => {
    // Second .then receives the parsed JSON data
    console.log("Fetched data:", data);
  })
  .catch(error => {
    // .catch handles any errors that occur in the fetch or in any .then block
    console.error("Fetch error:", error);
  });

// 8. Creating a utility function that retries failed promises
/**
 * Attempts to fetch data with automatic retries when failed
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @param {number} retries - Number of retry attempts
 * @param {number} delayMs - Delay between retries in milliseconds
 * @returns {Promise<any>} Promise resolving to the fetched data
 */
function fetchWithRetry(url, options, retries = 3, delayMs = 1000) {
  return new Promise((resolve, reject) => {
    // Define a recursive function for retry attempts
    function attempt() {
      fetch(url, options)
        .then(response => {
          if (!response.ok) {
            // Handle HTTP error status codes
            throw new Error(`HTTP error: ${response.status}`);
          }
          return response.json();
        })
        .then(resolve) // If successful, resolve the outer promise
        .catch(error => {
          if (retries <= 0) {
            // If no more retries left, reject the outer promise
            return reject(error);
          }
          
          console.log(`Retrying... (${retries} attempts left)`);
          retries--;
          // Wait before the next attempt
          setTimeout(attempt, delayMs);
        });
    }
    
    // Start the first attempt
    attempt();
  });
}

// Using the retry function
fetchWithRetry(url, options, 2, 2000)
  .then(data => console.log("Data after potential retries:", data))
  .catch(error => console.error("All retries failed:", error));

// 9. Custom Promise implementation to understand how Promises work internally

/**
 * A simplified Promise implementation that follows Promise/A+ specification
 */
class CustomPromise {
  /**
   * Creates a new CustomPromise
   * @param {Function} executor - Function that initiates the asynchronous operation
   */
  constructor(executor) {
    // Promise states: 'pending', 'fulfilled', or 'rejected'
    this.state = 'pending';
    this.value = undefined; // Value when fulfilled
    this.reason = undefined; // Reason when rejected
    this.onFulfilledCallbacks = []; // Callbacks for resolution
    this.onRejectedCallbacks = []; // Callbacks for rejection

    // Function to resolve the promise
    const resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        // Execute all registered fulfillment callbacks asynchronously
        this.onFulfilledCallbacks.forEach(callback => 
          queueMicrotask(() => callback(this.value))
        );
      }
    };

    // Function to reject the promise
    const reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        // Execute all registered rejection callbacks asynchronously
        this.onRejectedCallbacks.forEach(callback => 
          queueMicrotask(() => callback(this.reason))
        );
      }
    };

    // Execute the provided executor function
    try {
      executor(resolve, reject);
    } catch (error) {
      // If executor throws, the promise is rejected
      reject(error);
    }
  }

  /**
   * Registers callbacks to be executed when the promise resolves or rejects
   * @param {Function} onFulfilled - Callback for resolution
   * @param {Function} onRejected - Callback for rejection
   * @returns {CustomPromise} A new promise for chaining
   */
  then(onFulfilled, onRejected) {
    return new CustomPromise((resolve, reject) => {
      // Handler for when the promise is fulfilled
      const fulfilledHandler = value => {
        // If no onFulfilled function is provided, pass through the value
        if (typeof onFulfilled !== 'function') {
          resolve(value);
          return;
        }
        
        try {
          // Execute the callback and resolve the returned promise with its result
          const result = onFulfilled(value);
          resolve(result);
        } catch (error) {
          // If callback throws, reject the returned promise
          reject(error);
        }
      };

      // Handler for when the promise is rejected
      const rejectedHandler = reason => {
        // If no onRejected function is provided, propagate the rejection
        if (typeof onRejected !== 'function') {
          reject(reason);
          return;
        }
        
        try {
          // Execute the callback and resolve the returned promise with its result
          const result = onRejected(reason);
          resolve(result);
        } catch (error) {
          // If callback throws, reject the returned promise
          reject(error);
        }
      };

      // Handle already settled promises
      if (this.state === 'fulfilled') {
        queueMicrotask(() => fulfilledHandler(this.value));
      } else if (this.state === 'rejected') {
        queueMicrotask(() => rejectedHandler(this.reason));
      } else {
        // For pending promises, store the handlers for later execution
        this.onFulfilledCallbacks.push(fulfilledHandler);
        this.onRejectedCallbacks.push(rejectedHandler);
      }
    });
  }

  /**
   * Registers a callback to be executed when the promise rejects
   * @param {Function} onRejected - Callback for rejection
   * @returns {CustomPromise} A new promise for chaining
   */
  catch(onRejected) {
    // catch is syntactic sugar for then(null, onRejected)
    return this.then(null, onRejected);
  }

  /**
   * Registers a callback to be executed when the promise settles (resolves or rejects)
   * @param {Function} onFinally - Callback for settlement
   * @returns {CustomPromise} A new promise for chaining
   */
  finally(onFinally) {
    return this.then(
      // For resolution: execute onFinally and pass through the value
      value => {
        onFinally();
        return value;
      },
      // For rejection: execute onFinally and re-throw the reason
      reason => {
        onFinally();
        throw reason;
      }
    );
  }

  /**
   * Creates a resolved promise
   * @param {*} value - The value to resolve with
   * @returns {CustomPromise} A resolved promise
   */
  static resolve(value) {
    return new CustomPromise(resolve => resolve(value));
  }

  /**
   * Creates a rejected promise
   * @param {*} reason - The reason for rejection
   * @returns {CustomPromise} A rejected promise
   */
  static reject(reason) {
    return new CustomPromise((_, reject) => reject(reason));
  }
}

// Demo: Using our custom Promise implementation
console.log('--- CustomPromise Demo ---');

// Creating a promise that resolves after 1 second
const customPromise = new CustomPromise((resolve, reject) => {
  console.log('Promise executor running');
  setTimeout(() => resolve('Operation completed successfully'), 1000);
});

// Demonstrate chaining, error handling, and finally
customPromise
  .then(result => {
    console.log('Promise resolved:', result);
    return 'Chain step 1'; // Return value for the next .then
  })
  .then(result => {
    console.log('Chain result:', result);
    return 'Chain step 2'; // Return another value
  })
  .catch(error => {
    // This won't run unless an error occurs in the chain
    console.error('Error caught:', error);
  })
  .finally(() => {
    // This runs regardless of resolution or rejection
    console.log('Promise settled (finally callback)');
  });

// Example with rejection
const failingPromise = new CustomPromise((resolve, reject) => {
  setTimeout(() => reject(new Error('Operation failed')), 1500);
});

// Demonstrate error handling with rejection
failingPromise
  .then(result => {
    // This won't run because the promise rejects
    console.log('This will not run');
  })
  .catch(error => {
    // This will execute when the promise rejects
    console.error('Error handled:', error.message);
  })
  .finally(() => {
    // This runs after the promise settles
    console.log('Failing promise settled');
  });
