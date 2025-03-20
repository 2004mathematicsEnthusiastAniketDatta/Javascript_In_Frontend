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
