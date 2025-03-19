//Problem:  Create an Object representating a type of tea with properties for name, type, and caffeine content.
let tea = {
    name: "Lemon Tea",
    type: "Green",
    caffeine: "Low"
};
console.log(tea);
console.log(tea.name);
console.log(tea[`type`]);
//Problem: Access andd Print the name and type properties of the tea object.
tea.origin = "China";
console.log(tea);
tea["made with"]= "Lemon";
console.log(tea);
//Problem: Add a new property origin to the tea object.
const teas={
    name:'Black Tea',
    type:'Black',
    caffeine:'High',
    origin:'India',
    madeWith:'Milk',
    price:2.99
}
teas['taste']='Strong';
console.log(teas);
//Problem: Change the caffeine level of the tea object to medium.
teas.caffeine='Medium';
console.log(teas);
//Problem: Remove the type property from the tea object.
delete teas.type;
console.log(teas);
// Problem: Check if the object has a property origin.
console.log("origin" in teas);
console.log("type" in teas);
//Problem: Use a for...in loop to print all properties of the tea object.
console.log("Printing all properties of the tea object");
for (let props in teas){
    console.log(`Keys/Properties : ${props}`);
}
//Problem: Create a nested object  representing different types of teas and their properties.
const teaTypes={
    greenTea:{
        name:'Green Tea',
        type:'Green',
        caffeine:'Low',
        origin:'China',
        madeWith:'Lemon',
        price:1.99
    },
    blackTea:{
        name:'Black Tea',
        type:'Black',
        caffeine:'High',
        origin:'India',
        madeWith:'Milk',
        price:2.99
    },
    whiteTea:{
        name:'White Tea',
        type:'White',
        caffeine:'Low',
        origin:'China',
        madeWith:'Milk',
        price:3.99
    },
    milkTea:{
        name:'Milk Tea',
        type:'Black',
        caffeine:'High',
        origin:'India',
        madeWith:'Milk',
        price:2.99
    }
}
console.log(teaTypes);
//Problem: Access and print the name and type of the greenTea object.
console.log(teaTypes.greenTea.name);
console.log(teaTypes.greenTea.type);
//Problem: Add a new property taste to the greenTea object.
teaTypes.greenTea['taste']='Strong';
console.log(teaTypes.greenTea);
//Problem: Change the caffeine level of the greenTea object to medium.
teaTypes.greenTea.caffeine='Medium';
console.log(teaTypes.greenTea);

//Problem: Check if the object has a property origin.  
console.log("origin" in teaTypes.greenTea);
console.log("type" in teaTypes.greenTea);
//Problem: Use a for...in loop to print all properties of the greenTea object. 
console.log("Printing all properties of the greenTea object");
for (let props in teaTypes.greenTea){
    console.log(`Keys/Properties : ${props}`);
}
//Problem: Use a for...in loop to print all properties of the teaTypes object.
console.log("Printing all properties of the teaTypes object");
for (let props in teaTypes){
    console.log(`Keys/Properties : ${props}`);
}     //prints the keys of the teaTypes object
for (let props in teaTypes){
    console.log(`Keys/Properties : ${teaTypes[props]}`);
}     //prints the values of the teaTypes object
for (let props in teaTypes){
    console.log(`Keys/Properties : ${teaTypes[props].name}`);
}     //prints the name of the teaTypes object
for (let props in teaTypes){
    console.log(`Keys/Properties : ${teaTypes[props].type}`);
}     //prints the type of the teaTypes object      
//Problem: Use a for...in loop to print all properties of the teaTypes object.
console.log("Printing all properties of the teaTypes object");
for (let props in teaTypes){
    console.log(`Keys/Properties : ${props}`);
    for (let prop in teaTypes[props]){
        console.log(`Keys/Properties : ${prop}`);
    }
}
//Problem: Use a for...in loop to print all properties of the teaTypes object.
console.log("Printing all properties of the teaTypes object");
for (let props in teaTypes){
    console.log(`Keys/Properties : ${props}`);
    for (let prop in teaTypes[props]){
        console.log(`Keys/Properties : ${teaTypes[props][prop]}`);
    }
}
//Creare a copy of the tea object using the Object.assign() method.
let teaCopy=Object.assign({},teas);
console.log(teaCopy); 
//Create a copy of the tea object using the spread operator.
let teaCopy2={...teas};
console.log(teaCopy2);

//Shallow Copy
let Teas={
    'Black Teat':{
        name:'Black Tea',
        type:'Black',
        caffeine:'High',
        origin:'India',
        madeWith:'Milk',
        price:2.99
    },
    'Green Tea':{
        name:'Green Tea',
        type:'Green',
        caffeine:'Low',
        origin:'China',
        madeWith:'Lemon',
        price:1.99
    },
    'White Tea':{
        name:'White Tea',
        type:'White',
        caffeine:'Low',
        origin:'China',
        madeWith:'Milk',
        price:3.99
    },
    'Milk Tea':{
        name:'Milk Tea',
        type:'Black',
        caffeine:'High',
        origin:'India',
        madeWith:'Milk',
        price:2.99
    },
    'Herbal Tea':{
        name:'Herbal Tea',
        type:'Herbal',
        caffeine:'None',
        origin:'India',
        madeWith:'Herbs',
        price:2.99
    },
    'Oolong Tea':{
        name:'Oolong Tea',
        type:'Oolong',
        caffeine:'Medium',
        origin:'China',
        madeWith:'Milk',
        price:3.99
    },
    'Chai Tea':{
        name:'Chai Tea',
        type:'Black',
        caffeine:'High',
        origin:'India',
        madeWith:'Spices',
        price:2.99
    },
    TeasCount:7,
}
//Reference
const anotherCopy=Teas;
console.log(anotherCopy);
  

let TeasCopy=Object.assign({},Teas);
Teas['Green Tea'].price=2.50; 
console.log(TeasCopy);

//Shallow Copy: 
let TeasCopy2={...Teas};
TeasCopy2['Chai Tea']['price']=3.00;
console.log(TeasCopy2);
//Deep Copy 
let TeasCopy3=JSON.parse(JSON.stringify(Teas));
TeasCopy3['Milk Tea']['price']=3.50;
console.log(TeasCopy3);
console.log(Teas);
