//Problem : Create an array containing different types of teas.
let teas=["Chamomile Tea","green Tea","Black Tea","Oolong Tea","Earl Grey Tea","Peppermint Tea","Ginger Tea","Lemon Tea","Masala Tea","Herbal Tea"];
console.log(teas);
//Problem : Add "sweet Tea" at the end of the array.
teas.push("Sweet Tea");
console.log(teas);
//Problem : Remove the element "Oolong Tea" of the array.
// teas.splice(3,1);
// console.log(teas);
const index = teas.indexOf("Oolong Tea");
if (index > -1) {
  teas.splice(index, 1);
}
console.log(teas);
//Problem : Filter the list to include teas that are caffeinated

const caffinatedTeas = teas.filter(tea =>  tea === "Black Tea" || tea === "Oolong Tea" || tea === "Earl Grey Tea" || tea === "Masala Tea");
console.log(caffinatedTeas);

//Problem : Sort the array alphabetically.
teas.sort();
console.log(teas);
//Problem : Reverse the array.
const teaz= teas.reverse();
console.log(teaz);
//Problem : Use a for Loop to print each type of tea in the array.
const newTeas=teas.forEach(tea => console.log(tea));
//Problem : Use a for...of loop to print each type of tea in the array.
for (const tea of teas) {
  console.log(tea);
}
//Problem : Use the .map() method to print each type of tea in the array.
const teaList = teas.map(tea => console.log(tea));
//Problem : Use the .reduce() method to create a sentence from the array.
const teaSentence = teas.reduce((sentence, tea) => sentence + tea + ", ", "Teas: ");
console.log(teaSentence);
//Problem : Use the .join() method to create a sentence from the array.
const teaSentence2 = teas.join(", ");
console.log(teaSentence2);
//Problem : Use the .every() method to check if all the teas are herbal.
const areAllHerbal = teas.every(tea => tea === "Chamomile Tea" || tea === "Peppermint Tea" || tea === "Ginger Tea" || tea === "Lemon Tea");
console.log(areAllHerbal);
//Problem: Use a For Loop to count how many teas are caffeinated (excluding "Herbal Tea")
let caffienatedMyTeas = 0;
for (let i=0;i<teas.length;i++){
  if(teas[i]!=="Herbal Tea"){
    caffienatedMyTeas++;
  }
}

console.log(caffienatedMyTeas);
//Problem: Use the .filter() method to count how many teas are herbal.
const notherbalTeas = teas.filter(tea => tea !=="Herbal Tea");
console.log(notherbalTeas.length);

//Problem: Use a for Loop to create a new array with all tea names in uppercase.
let upperCaseTeas = [];
for(let i=0;i<teas.length;i++){
    upperCaseTeas.push(teas[i].toUpperCase());
}
console.log(upperCaseTeas.sort());
//Problem: With a for loop , find the tea name with the most characters.
let longestTeaName = "";
for(let i=0;i<teas.length;i++){
    if(teas[i].length > longestTeaName.length){
        longestTeaName = teas[i];
    }
}
console.log(longestTeaName);
//Problem: Use the .find() method to find the tea that includes the word "Tea".
const teaWithWord = teas.find(tea => tea.includes("Tea"));
console.log(teaWithWord);
//Problem: Use the .findIndex() method to find the index of the tea that includes the word "Tea".
const teaIndex = teas.findIndex(tea => tea.includes("Tea"));
console.log(teaIndex);
//Problem: Use the .some() method to check if any of the teas include the word "Tea".
const includesTea = teas.some(tea => tea.includes("Tea"));
console.log(includesTea);
//Problem: Use the .includes() method to check if the array includes "Green Tea".
const hasGreenTea = teas.includes("Green Tea");
console.log(hasGreenTea);
//Problem: Use the .indexOf() method to find the index of "Green Tea".
const greenTeaIndex = teas.indexOf("Green Tea");
console.log(greenTeaIndex);
//Problem: Use the .lastIndexOf() method to find the last index of "Green Tea".
const lastGreenTeaIndex = teas.lastIndexOf("Green Tea");
console.log(lastGreenTeaIndex);
//Problem: Use the .slice() method to create a new array with only the first three teas.
const firstThreeTeas = teas.slice(0, 3);
console.log(firstThreeTeas);
//Problem: Use the .slice() method to create a new array with only the last three teas.
const lastThreeTeas = teas.slice(-3);
console.log(lastThreeTeas);
//Problem: Use the .splice() method to remove "Green Tea" and "Black Tea" from the array.
const removedTeas = teas.splice(1, 2);
console.log(teas);
console.log(removedTeas);
//Problem: Use the .splice() method to add "Green Tea" and "Black Tea" back to the array.
teas.splice(1, 0, "Green Tea", "Black Tea");
console.log(teas);
//Problem: Use the .concat() method to combine two tea arrays.
const moreTeas = ["White Tea", "Yellow Tea"];
const allTeas = teas.concat(moreTeas);
console.log(allTeas);
//Problem: Use the .concat() method to combine three tea arrays.
const evenMoreTeas = ["Blue Tea", "Purple Tea"];
const allTheTeas = teas.concat(moreTeas, evenMoreTeas);
console.log(allTheTeas);
//Problem: Use the .flat() method to combine two tea arrays.
const allTeasFlat = [teas, moreTeas].flat();
console.log(allTeasFlat);
//Problem: Use the .flat() method to combine three tea arrays.
const allTheTeasFlat = [teas, moreTeas, evenMoreTeas].flat();
console.log(allTheTeasFlat);
//Problem: Use a for loop to reverse the order of the teas in the array.
let reversedTeas = [];
for(let i=teas.length-1;i>=0;i--){
    reversedTeas.push(teas[i]);
}
console.log(reversedTeas);
//Objects-Data Structures in JS
// Data Structure is a particular way of organizing and storing data in a computer so that it can be accessed and modified efficiently.
// Objects are used to store multiple pieces of information in a single place.
// Objects are created using curly braces {}.
// Objects are made up of key-value pairs.
// Keys are strings that identify the values.
// Values can be any data type, such as strings, numbers, booleans, arrays, or even other objects.
// Keys and values are separated by a colon :.
// Key-value pairs are separated by commas ,.
// Objects can be stored in variables.
// Objects can be nested inside other objects.
// Objects can be passed as arguments to functions.
// Objects can be returned from functions.
// Objects can be used to create complex data structures.
// Objects can be used to model real-world entities.
// Objects can be used to represent data in a structured way.
// Objects can be used to organize and manipulate data.
//Objects-Properties and Methods
// Properties are values associated with an object. 
// 2 Types of data types are Primitive and Non Primitive Data Types.
// Primitive Data Types are stored directly in the location the variable accesses.
// Primitive Data Types are stored on the stack.
// Primitive Data Types are accessed by their actual value.
// Primitive Data Types are immutable.
// Primitive Data Types are passed by value.
// Primitive Data Types are copied by their value.
// Non-Primitive Data Types are stored in the heap.
// Non-Primitive Data Types are accessed by reference.
// Non-Primitive Data Types are mutable.
// Non-Primitive Data Types are passed by reference.
// Non-Primitive Data Types are copied by their reference.
// Methods are functions associated with an object.
// Methods are called using dot notation.
// Methods can be used to perform actions on objects.
// Methods can be used to modify objects.
// Methods can be used to access object properties.
// Methods can be used to interact with objects.
// For objects we need Curly Braces {}.
// For arrays we need Square Brackets [].
// For functions we need Parentheses ().
const x=10
console.log(x+10);
const person ={
    firstname: 'Aniket',
    lastname: 'Datta',
    age: 20,
    hobbies: ['coding', 'reading', 'gaming'],
    isMarried: false,
    address: {
        pin: 700035,
        city: 'Kolkata',
        state: 'West Bengal',
        country: 'India'
    },
    getFullName: function(){
        return `${this.firstname} ${this.lastname}`;
    }
}
console.log(person.hobbies);
console.table([person.address.pin,person.address.city, person.address.state, person.address.country]);
console.log(person.getFullName());
console.log(person['getFullName']());
console.log(person.firstname);
console.log(person['firstname']);
console.log(person.age);
console.log(person['age']);
console.log(person.isMarried);
console.log(person['isMarried']);
console.log(person.address.pin);
console.log(person['address']['pin']);
//Real=World stuff are represented by Objects.
const remote ={
    color: 'black',
    brand: 'sony',
    dimensions:{height: 1, width: 1},
    turnOff: function(){
        console.log('turning off');
    },
    turnOn: function(){
        console.log('turning on');
    },
    volumeUp: function(){
        console.log('volume up');
    },
    volumeDown: function(){
        console.log('volume down');
    },
    changeChannel: function(){
        console.log('changing channel');
    },
    changeColor: function(){
        console.log('changing color');
    },
};
console.log(remote.brand);
console.log(remote['brand']);
console.log(remote.dimensions.height);
console.log(remote['dimensions']['height']);
