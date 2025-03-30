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

