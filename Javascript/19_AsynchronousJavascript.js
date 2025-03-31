// # Understanding Synchronous Code in JavaScript

// Synchronous code in JavaScript executes line by line, in order, with each operation completing before the next one begins. This is the default behavior in JavaScript.

// ## Key Characteristics of Synchronous Code

// - **Sequential Execution**: Code runs in the order it's written
// - **Blocking**: Each operation blocks execution until it completes
// - **Single-threaded**: Only one operation executes at a time

// ## Example

// ```javascript
// console.log("First");
// console.log("Second");
// console.log("Third");
// ```

// In this example, "First" will always print before "Second", and "Second" before "Third".

// ## Real-world Implications

// Synchronous operations can cause problems when dealing with time-consuming tasks:

// ```javascript
// console.log("Starting...");
// // This would freeze the UI if executed synchronously
// const data = fetchDataFromServer(); // Blocking operation
// console.log("Data:", data);
// console.log("Finished!");
// ```

// This is why JavaScript also offers asynchronous patterns (callbacks, Promises, async/await) for operations that might take time, like:
// - Network requests
// - File operations
// - Timers/delays

// You could expand your active file to contrast synchronous vs asynchronous code patterns.

// Async -> Non-blocking code

