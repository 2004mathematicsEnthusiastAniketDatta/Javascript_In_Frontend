const obj ={
    name: "John",
    greet : function() {
        console.log(`Hello, ${this.name}`);
    },
}
console.log("Namaste"); //1
setTimeout(() => {
    console.log("Hello World");
}, 1000); // waits for 1 second before executing the function
console.log('Welcome to the world of JavaScript');//2
setTimeout(() => {
    console.log("Javascript is awesome");
}, 0); // waits for 0 seconds from the time all other lines of code are executed before executing the function
setTimeout(obj.greet,2*1000);

// How setTimeout works with Browser APIs and Event Loop:
// 1. When setTimeout is encountered, it's a Web API provided by the browser
// 2. The call stack processes each line of code synchronously
// 3. When setTimeout is executed, its callback is registered with the browser API
// 4. Code execution continues without waiting for the timer
// 5. After the timer expires, the callback is moved to the Callback Queue (Macrotask Queue)
// 6. The Event Loop constantly checks if the call stack is empty
// 7. Once the call stack is empty (all synchronous code is done), the Event Loop
//    moves callbacks from the queue to the call stack based on priority:
//    - Microtask Queue (Promises) has higher priority than Macrotask Queue (setTimeout)
// 8. In this example, even setTimeout(0) waits until all synchronous code completes
//    before executing, which is why "Hello World" appears after "Namaste" and "Welcome"
// 9. The obj.greet callback loses its original 'this' context in setTimeout,
//    so 'this.name' becomes undefined when the function executes after 2 seconds