class FactorialSum{
    constructor(){
        this.factorial = new Factorial();
    }
    sum(n){
        let sum = 0;
        for(let i = 1; i <= n; i++){
            sum += this.factorial.get(i);
        }
        return sum;
    }
}
class Factorial{
    get(n){
        let fact = 1;
        for(let i = 1; i <= n; i++){
            fact *= i;
        }
        return fact;
    }
}
let factorialSum = new FactorialSum();
console.log(factorialSum.sum(5)); // 153
console.log(factorialSum.sum(6)); // 873
console.log(factorialSum.sum(7)); // 5913
console.log(factorialSum.sum(8)); // 46233
console.log(factorialSum.sum(9)); // 409113