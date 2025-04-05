// ============= PROMISES IN JAVASCRIPT =============
// A Promise is an object representing the eventual completion or failure of an asynchronous operation.
// Promises help manage asynchronous operations more elegantly than callbacks.

// 1. Creating a basic Promise
const simplePromise = new Promise((resolve, reject) => {
  // Inside this function, we perform some operation
  const success = true;
  
  if (success) {
    // If operation succeeds, call resolve with the result
    resolve("Operation successful!");
  } else {
    // If operation fails, call reject with the error
    reject(new Error("Operation failed!"));
  }
});

// 2. Using a Promise with then/catch
simplePromise
  .then(result => {
    console.log("Success:", result); // Executes if promise resolves
  })
  .catch(error => {
    console.error("Error:", error); // Executes if promise rejects
  });

// 3. Creating a delay function using Promises
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`Delayed for ${ms} ms`), ms);
  });
}

// Using the delay function
delay(2000).then(message => console.log(message));

// 4. Promise chaining - each then returns a new Promise
delay(1000)
  .then(result => {
    console.log(result);
    return "First chain complete";
  })
  .then(result => {
    console.log(result);
    return "Second chain complete";
  })
  .then(console.log);

// 5. Promise.all - waits for all promises to resolve
Promise.all([
  delay(1000),
  delay(2000),
  delay(1500)
]).then(results => {
  console.log("All promises resolved:", results);
});

// 6. Promise.race - resolves/rejects as soon as one promise resolves/rejects
Promise.race([
  delay(1000),
  delay(500),
  delay(1500)
]).then(result => {
  console.log("Fastest promise:", result); // Will be the 500ms one
});

// 7. Converting your fetch example to use then/catch instead of async/await
const url = 'https://api.freeapi.app/api/v1/public/randomproducts/product/random';
const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch(url, options)
  .then(response => response.json())
  .then(data => console.log("Fetched data:", data))
  .catch(error => console.error("Fetch error:", error));

// 8. Creating a utility function that retries failed promises
function fetchWithRetry(url, options, retries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    function attempt() {
      fetch(url, options)
        .then(response => response.json())
        .then(resolve)
        .catch(error => {
          if (retries <= 0) {
            return reject(error);
          }
          
          console.log(`Retrying... (${retries} attempts left)`);
          retries--;
          setTimeout(attempt, delay);
        });
    }
    
    attempt();
  });
}

// Using the retry function
fetchWithRetry(url, options, 2, 2000)
  .then(data => console.log("Data after potential retries:", data))
  .catch(error => console.error("All retries failed:", error));

  // 9. Understanding Promise mechanics by implementing a simplified version
  
  /**
   * A simplified Promise implementation that follows standard Promise/A+ behavior
   */
  class CustomPromise {
    constructor(executor) {
      this.state = 'pending';
      this.value = undefined;
      this.reason = undefined;
      this.onFulfilledCallbacks = [];
      this.onRejectedCallbacks = [];

      const resolve = value => {
        if (this.state === 'pending') {
          this.state = 'fulfilled';
          this.value = value;
          this.onFulfilledCallbacks.forEach(callback => queueMicrotask(() => callback(this.value)));
        }
      };

      const reject = reason => {
        if (this.state === 'pending') {
          this.state = 'rejected';
          this.reason = reason;
          this.onRejectedCallbacks.forEach(callback => queueMicrotask(() => callback(this.reason)));
        }
      };

      try {
        executor(resolve, reject);
      } catch (error) {
        reject(error);
      }
    }

    /**
     * Registers a callback to be executed when the promise resolves
     * @param {Function} onFulfilled - Callback for resolution
     * @param {Function} onRejected - Callback for rejection
     * @returns {CustomPromise} A new promise for chaining
     */
    then(onFulfilled, onRejected) {
      return new CustomPromise((resolve, reject) => {
        const fulfilledHandler = value => {
          if (typeof onFulfilled !== 'function') {
            resolve(value);
            return;
          }
          
          try {
            const result = onFulfilled(value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        };

        const rejectedHandler = reason => {
          if (typeof onRejected !== 'function') {
            reject(reason);
            return;
          }
          
          try {
            const result = onRejected(reason);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        };

        if (this.state === 'fulfilled') {
          queueMicrotask(() => fulfilledHandler(this.value));
        } else if (this.state === 'rejected') {
          queueMicrotask(() => rejectedHandler(this.reason));
        } else {
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
      return this.then(null, onRejected);
    }

    /**
     * Registers a callback to be executed when the promise settles
     * @param {Function} onFinally - Callback for settlement
     * @returns {CustomPromise} A new promise for chaining
     */
    finally(onFinally) {
      return this.then(
        value => {
          onFinally();
          return value;
        },
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

  // Demo: Using our implementation
  console.log('--- CustomPromise Demo ---');

  const customPromise = new CustomPromise((resolve, reject) => {
    console.log('Promise executor running');
    setTimeout(() => resolve('Operation completed successfully'), 1000);
  });

  customPromise
    .then(result => {
      console.log('Promise resolved:', result);
      return 'Chain step 1';
    })
    .then(result => {
      console.log('Chain result:', result);
      return 'Chain step 2';
    })
    .catch(error => {
      console.error('Error caught:', error);
    })
    .finally(() => {
      console.log('Promise settled (finally callback)');
    });

  // Example with rejection
  const failingPromise = new CustomPromise((resolve, reject) => {
    setTimeout(() => reject(new Error('Operation failed')), 1500);
  });

  failingPromise
    .then(result => {
      console.log('This will not run');
    })
    .catch(error => {
      console.error('Error handled:', error.message);
    })
    .finally(() => {
      console.log('Failing promise settled');
    });
