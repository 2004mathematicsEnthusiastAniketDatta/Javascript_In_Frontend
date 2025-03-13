class Arrays{
    constructor(){
        this.data = [];
    }

arrays(){
    let fruits=["Apple","Banana","Mango","Orange"];
    console.log(fruits.length);
    console.log(fruits[0]);
    console.log(fruits[1]);
    console.log(fruits[2]);
    console.log(fruits[3]);
    fruits.push("Pineapple"); // at the end
    fruits.unshift("Strawberry"); // at the beginning
    console.log(fruits);
    let intFruits=new Array("kiwi","avacado","dragon fruit");
    console.log(intFruits.length);
    console.log(intFruits[0]);
    console.log(intFruits[1]);
    console.log(intFruits[2]);
    intFruits.pop(); // removes last element
    intFruits.shift(); // removes first element
    console.log(intFruits);
    console.log(intFruits.indexOf("kiwi"));
    console.log(intFruits.indexOf("avacado"));
    console.log(intFruits.indexOf("dragon fruit"));
}
}
Arrays.prototype.arrays();