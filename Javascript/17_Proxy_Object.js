//Proxy Object :  The Proxy object allows you to create an object that can be used in place of the original object, but which may redefine fundamental Object operations like getting, setting, and defining properties. Proxy objects are commonly used to log property accesses, validate, format, or sanitize inputs, and so on.

// You create a Proxy with two parameters:

// target: the original object which you want to proxy
// handler: an object that defines which operations will be intercepted and how to redefine intercepted operations.
const user = {
    name: "Aniket",
    age: 20,
    password: "123"
}
const proxyUser = new Proxy(user, {
    get(target,prop){ // target is the original object, prop is the property being accessed
        if (prop === "password"){
            // console.log("****************");
            // return "Access Denied";
            throw new Error("Access Denied");
        }
        if (prop === "name"){
            return "Aniket";
        }
        if (prop === "age"){
            return 20;
        }
         return target[prop];
    },
    set(target,prop,value){ // target is the original object, prop is the property being set
        if (prop === "password"){
            throw new Error("Access Denied");
        }
        target[prop] = value;
        return true; // Indicate success
    }
});
console.log(proxyUser.name); // Aniket
console.log(proxyUser.age); // 20
// console.log(proxyUser.password); // 123
//target's address is passed to the proxy object. 



