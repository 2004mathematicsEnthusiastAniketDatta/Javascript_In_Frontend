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
