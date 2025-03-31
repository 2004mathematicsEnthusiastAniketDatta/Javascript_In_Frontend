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
console.log(arr2); // arr2[-1] = 0
console.log(arr); // arr[-1] = 0
 // Proxy is neither a shallow copy nor a deep copy of the original object
 //A Proxy appears to be a wrapper that intercepts operations on an object
console.log( arr[-1]);
let arr3 = createArrayWithNegativeIndices([...arr]);
console.log(arr3[-1]); // 10
arr3[-1] = 5; // Set the last element to 5
console.log(arr3); // arr3[-1]=5
console.log(arr);  //arr[-1]=0

let a=[1,[2.1,2.2,2.3],3,[4,5,6]];
let a1=createArrayWithNegativeIndices(a);
console.log(a1[-1]); // [4,5,6]
a1[-1]=[100,200,300];
console.log(a1); // [100,200,300]
console.log(a); // [100,200,300]
let a2=createArrayWithNegativeIndices([...a]);
console.log(a2[-1]); // [4,5,6]
a2[-1]=[4,8,16];
console.log(a2); // [4,8,16]
console.log(a); // [100,200,300]


