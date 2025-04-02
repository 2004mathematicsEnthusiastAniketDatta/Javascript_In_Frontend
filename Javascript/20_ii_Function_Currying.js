function createCounter(stepSize = 1 , initialValue = 0) {
    let count = initialValue;
    return function() {
        count += stepSize;
        return count;
    }
}
const counter1 = createCounter(1, 1);
console.log(counter1()); // 2
console.log(counter1()); // 3
console.log(counter1()); // 4

function createDebouncedVersion(fn , delay){
    let timerId = null;
    return function(...args){
        if(timerId){
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}

function apiCall(){
    console.log("API called");
    // Simulate API call
    return fetch('https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=10&inc=category%252Cprice%252Cthumbnail%252Cimages%252Ctitle%252Cid&query=mens-watches');
}

const apiCallWithDebounce = createDebouncedVersion(apiCall, 5*1000);
apiCallWithDebounce();

