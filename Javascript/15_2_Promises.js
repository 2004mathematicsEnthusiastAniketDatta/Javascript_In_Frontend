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
