//polyfills
//Modern Functionalities are provided to the older browsers with the help of polyfills.

Array.prototype.reducing = function(callback, initialValue = undefined ) {
    let accumulator = initialValue;
    let i = 0;

    if (initialValue === undefined) {
        accumulator = this[0];
        i = 1;
    }

    for (; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
}
// Example usage:
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reducing((acc, curr) => acc + curr, 0);
console.log(sum); // Output: 15