function test(){
    let obj = {value: 10};
    return function() {
        console.log(obj);
    }
}

const testFunc = test();
testFunc(); // { value: 10 }
// -101 (Garbage Collection) -
testFunc(); // { value: 10 }
// -10 (Garbage Collection) -
testFunc(); // { value: 10 }
// -1 (Garbage Collection) -



