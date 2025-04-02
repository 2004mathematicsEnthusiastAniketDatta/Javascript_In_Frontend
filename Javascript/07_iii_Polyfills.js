if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement) {
      return this.indexOf(searchElement) !== -1;
    };
  }
    const arr =[0,1,2,3,4,5,6,7,8,9,10];
    console.log(arr.includes(5));  
    console.log(arr.includes(11));
    // Output: true false

    // For all the functions within some object within some class in a module in some file
    //  written in Javascript,
    // Some APIs exposed from other code bases and sections written in Javascript,Java, C , C++
    // ,Python, we can use polyfills to add the functionality to the object, class, module, or file.
    // Polyfills are the code that adds a feature which the engine may lack.
    // The code can be more optimised for spidermonkey and is less optimised for V8 
    // and might be moderately optimised for chakra.
    
    const arr3=['A',1,2,3];
    if(!Array.prototype.fill) throw new Error('Please update the browser');
    arr3.fill(0,0,1);
    console.log(arr3);
    if(!Array.prototype.fill){
      //Fallback - Polyfill - Backup function
      if(!Array.prototype.fill){
        Array.prototype.fill = function(value,start,end){
          if(this == null) throw new TypeError('this is null or not defined');
          var O = Object(this);
          var len = O.length >>> 0;
          var relativeStart = start >> 0;
          var k = relativeStart < 0 ? Math.max(len + relativeStart,0) : Math.min(relativeStart,len);
          var relativeEnd = end === undefined ? len : end >> 0;
          var final = relativeEnd < 0 ? Math.max(len + relativeEnd,0) : Math.min(relativeEnd,len);
          while(k < final){
            O[k] = value;
            k++;
          }
          return O;
        };
    }
    }
    arr3.fill(0,0,1);
    console.log(arr3);
    // Output: ['A',1,2,3] ['A',1,2,3]

    //for each  Polyfill
    // 1.Signature and return type Analysis 
    const arr4 = [1,2,3,4,5];
    if(!Array.prototype.forEach) throw new Error('Please update the browser');
//    arr4.forEach(function(element,index,arr4){});
    let ret = arr4.forEach(function(element,index){
      //Calls my function for every value in the array 
      console.log(`Value at index ${index} is ${element}`);
    }
    );
    console.log(`Return value of forEach is ${ret}`); // No return value
    //2. Implementation
    if(!Array.prototype.forEvery){
      Array.prototype.forEvery = function(callback){
        if(this == null) throw new TypeError('this is null or not defined');
        let O = Object(this); //this points to the current object
        //O is assigned to the object form of the array which is calling the function
        let len = O.length >>> 0;
        for(let i = 0; i < len; i++){
          if(i in O){
            callback(O[i],i,O);
          }
        }
      };
    }
    console.log(arr4.forEvery(function(element,index){
      console.log(`Value at index ${index} is ${element}`);
    }
    ));
    //map function Polyfill
    //1. Signature and return type Analysis
    const arr5 = [1,2,3,4,5,6];
    if(!Array.prototype.map) throw new Error('Please update the browser');
    //arr5.map(function(element,index,arr5){});
    let ret2 = arr5.map(function(element,index){
      return element*2;
    });
    console.log(ret2);//[2,4,6,8,10,12] -> Returns a new array
    //2. Implementation
    if(!Array.prototype.Maps){
      Array.prototype.Maps=function(callback){
          if(this == null) throw new TypeError('this is null or not defined');
          let O= Object(this);
          let len = O.length >>> 0;
          let mappedArr = new Array(len);
          for(let i=0;i<len;i++){
            if(i in O){
              mappedArr[i] = callback(O[i],i,O);
            }
          }
          return mappedArr;
      };
    }
    let ret02 = arr5.Maps(function(element,index){
      if(index % 2 == 0){
          return element*2;
      }
      else{
        return element*3;
      }
    }
    );
    // let ret3 = arr5.Maps(function(element,index){
    //   return element*3;
      
    // }
    // );
console.log(ret02);
//Output: [ 2, 6, 6, 12, 10, 18]
//Filter Polyfill
//1. Signature and return type Analysis
const arr6 = [1,2,3,4,5,6,7,8,9,10];
if(!Array.prototype.filter) throw new Error('Please update the browser');
//arr6.filter(function(element,index,arr6){});
let ret3 = arr6.filter(function(element,index){
  return element%2==0;
});
console.log(ret3); //[2,4,6,8,10] -> Returns a new array
//when functions are passed as a parameter to another function, they are called callback functions.
//2. Implementation
if(!Array.prototype.Filter){
  Array.prototype.Filter=function(callback){
    if(this == null) throw new TypeError('this is null or not defined');
    let O = Object(this);
    let len = O.length >>> 0;
    let filteredArr = [];
    for(let i=0;i<len;i++){
      if(i in O){
        if(callback(O[i],i,O)){
          filteredArr.push(O[i]);
        }
      }
    }
    return filteredArr;
  };
}
let ret4 = arr6.Filter(function(element,index){
  return element%2==1;
});
console.log(ret4);

//Reduce Polyfill
//1. Signature and return type Analysis
const arr7 = [1,2,3,4,5,6,7,8,9,10];
if(!Array.prototype.reduce) throw new Error('Please update the browser');
//arr7.reduce(function(accumulator,element,index,arr7){},initialValue);
let ret5 = arr7.reduce(function(accumulator,element){
  return accumulator+element;
},0);
console.log(ret5); //55 -> Returns a single value
//2. Implementation
if(!Array.prototype.Reduce){
  Array.prototype.Reduce = function(callback,initialValue){
    if(this == null) throw new TypeError('this is null or not defined');
    let O = Object(this);
    let len = O.length >>> 0;
    let accumulator = initialValue;
    let k = 0;
    if(accumulator === undefined){
      for(;k<len;k++){
        if(k in O){
          accumulator = O[k];
          k++;
          break;
        }
      }
    }
    for(;k<len;k++){
      if(k in O){
        accumulator = callback(accumulator,O[k],k,O);
      }
    }
    return accumulator;
  };
}
let ret6 = arr7.Reduce(function(accumulator,element){
  return accumulator+element;
},0);
console.log(ret6);
//Output: 55

Array.prototype.Reduces = function(callback, initialValue){
  let accumulator = initialValue;
  for(let i=0; i<this.length; i++){
      accumulator = callback(accumulator, this[i]);
  }
  return accumulator;
}
let arr8 = [1,2,3,4,5];
let initialValue = 0;
let total = arr8.Reduces((accumulator, currentValue) => accumulator + currentValue, initialValue);
console.log(total);
//Output: 15

//Pollyfills -> Object.__proto__.name = function(){}

// arr.map(e => e*2); Arrays-> Arrays.__proto__.map = function(callback){  
  //   if(this == null) throw new TypeError('this is null or not defined');
  //       let O= Object(this);
  //       let len = O.length >>> 0;
  //       let mappedArr = new Array(len);
  //       for(let i=0;i<len;i++){
  //         if(i in O){
  //           mappedArr[i] = callback(O[i],i,O);
  //         }
  //       }
  //       return mappedArr;
  //   };
  // } }

// Promises , Modern Functionalities

//Internet Exploer old version may not support arr.map(e=>e*2);
// Fallback
// Providing functionalities not available because of Browser
// A polyfill is apiece of code that allows older browsers to implement modern javascript features.
// Razorpay -> polyfill.js

//class Array in the browser
//class Array{
//Constructor(){
//    this.length = 0;
//    this.push = function(){}
//    this.pop = function(){}
//    this.shift = function(){}
//    this.unshift = function(){}
//    this.splice = function(){}
//    this.slice = function(){}   
//    this.concat = function(){}
//    this.join = function(){}
//    this.indexOf = function(){}
// .....
//}
// Array.prototype = {
//    constructor: Array,
//    push: function(){},
//    pop: function(){},
//    shift: function(){},
//    unshift: function(){},
//    splice: function(){},
//    slice: function(){},
//    concat: function(){},
//    join: function(){},
//    indexOf: function(){},
//    forEach: function(){},
// ..........
//}
// 
//}

// class.object.method

if(!Array.prototype.myForEach){
  Array.prototype.myForEach = function(cb){
      for (let i = 0; i< this.length; i++) {
          cb(this[i], i, this); 
      }
  }
}
const arr10 = [1, 2, 3, 4, 5];
arr.myForEach((item, index, array) => {
  console.log(`Item: ${item}, Index: ${index}, Array: ${array}`);
}
);

if(!Array.prototype.myMap){
  Array.prototype.myMap = function(cb){
      let newArr =[];
      for (let i = 0; i < this.length; i++) {
          newArr.push(cb(this[i],i));
      }
      return newArr;
  }
}
const arr11 = [1, 2, 3, 4, 5];
const newArr = arr11.myMap((item, index) => {
  return item * 2;
}
);
console.log(newArr); // [2, 4, 6, 8, 10]


let person = {
  firstname: "Aniket",
  lastname: "Datta",
  print: function (country) {
    console.log(this.firstname + " " + this.lastname+ " from " + country);
  }
}
person.print("India");
let printName = function (country) {
  console.log(this.firstname + " " + this.lastname + " from " 
  + country);
}
// person.printName("India");
//Call -> The call() method of Function instances calls this function with a given this value 
// and arguments provided individually. 
printName.call(person, "India");
//Polyfill for call
if(!Function.prototype.calls){
  Function.prototype.calls = function(obj,...args){
    obj.fn = this;
    obj.fn(...args);
    delete obj.fn;
  }
}
let user = {
  firstname: "John",
  lastname: "Doe",
}
printName.calls(user, "USA");

// Apply -> The apply() method of Function instances calls this function with a given this value,
// and arguments provided as an array (or an array-like object).

printName.apply(user, ["USA"]);


// Polyfill for apply

if(!Function.prototype.applies){
  Function.prototype.applies = function(obj,args){
    obj.fn = this;
    obj.fn(...args);
    delete obj.fn;
  }
}
printName.applies(user, ["USA"]);

// Bind -> The bind() method of Function instances creates a new function that, 
// when called, calls this function with its this keyword set to the provided value, 
// and a given sequence of arguments preceding 
// any provided when the new function is called.

// Polyfill for bind

if (!Function.prototype.binds) {
	Function.prototype.binds = function (oThis) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5 internal IsCallable function
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}

		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function () {},
			fBound = function () {
				return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
			};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}
let printNameBind = printName.binds(user, "USA");
printNameBind("India");











