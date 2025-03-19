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
    