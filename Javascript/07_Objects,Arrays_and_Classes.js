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

