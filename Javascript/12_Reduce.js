let salesData =[
    {product: 'Laptop', price: 1_20_000, quantity: 10},
    {product: 'Desktop', price: 3_00_000, quantity: 20},
    {product: 'Mobile', price: 24_000, quantity: 30},
    {product: 'Tablet', price: 50_000, quantity: 40},
    {product: 'Smartwatch', price: 6_000, quantity: 50}
];

let initialValue = 0;
let totalSales= salesData.reduce((accumulator, currentValue) => accumulator + currentValue.price*currentValue.quantity, initialValue);
console.log(totalSales);
//polyfill
Array.prototype.Reduce = function(callback, initialValue){
    let accumulator = initialValue;
    for(let i=0; i<this.length; i++){
        accumulator = callback(accumulator, this[i]);
    }
    return accumulator;
}
let totalSales1 = salesData.Reduce((accumulator, currentValue) => accumulator + currentValue.price*currentValue.quantity, initialValue);
console.log(totalSales1);

// let totalSales2 = salesData.Reduce((accumulator, currentValue) => 0 + currentValue.price*currentValue.quantity, 0);
// console.log(totalSales2);
// initially     let accumulator = initialValue;

