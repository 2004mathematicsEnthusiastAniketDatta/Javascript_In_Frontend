// Prototypes
//Object Prototypes
Object.prototype.chai=()=>{
    console.log('This is a chai tea');
}
const chaiTea={
    name:"Ice tea Lemon",
    type:"Cool",
};
chaiTea.chai();
console.log(chaiTea);
//Prototype:**Object Prototype**: A template object that defines the structure and behavior of other objects, serving as a blueprint for creating new objects that inherit its properties and methods.
//Be careful with the quirky behaviour of the languages.
//Array Prototypes
const arr =[0,1,2,3,4,5,6,7,8,9,10]; 
arr
let arr2=new Array(10).fill(0).map((v,i)=>i);
arr2.at(0); // arr2.__proto__.at(0) 
arr2.map((v,i)=>v*2); // [0,2,4,6,8,10,12,14,16,18] searches map  function is there in code or modules imported or not if not, then map is searched in prototype  of arr2
//arr.__proto__=Array.prototype; //Array is a constructor function and Array.prototype is a object which contains all the properties and methods of Array
// str.__proto__; /*String {'', anchor: ƒ, at: ƒ, big: ƒ, blink: ƒ, …}anchor: ƒ anchor()length: 1name: "anchor"arguments: (...)caller: (...)[[Prototype]]: ƒ ()[[Scopes]]: Scopes[0]at: ƒ at()length: 1name: "at"arguments: (...)caller: (...)[[Prototype]]: ƒ ()[[Scopes]]: Scopes[0]big: ƒ big()length: 0name: "big"arguments: (...)caller: (...)[[Prototype]]: ƒ ()[[Scopes]]: Scopes[0]blink: ƒ blink()length: 0name: "blink"arguments: (...)caller: (...)[[Prototype]]: ƒ ()[[Scopes]]: Scopes[0]bold: ƒ bold()length: 0name: "bold"arguments: (...)caller: (...)[[Prototype]]: ƒ ()[[Scopes]]: Scopes[0]charAt: ƒ charAt()length: 1name: "charAt"arguments: (...)caller: (...)[[Prototype]]: ƒ ()[[Scopes]]: Scopes[0]charCodeAt: ƒ charCodeAt()length: 1name: "charCodeAt"arguments: (...)caller: (...)[[Prototype]]: ƒ ()[[Scopes]]: Scopes[0]codePointAt: ƒ codePointAt()length: 1name: "codePointAt"arguments: (...)caller: (...)[[Prototype]]: ƒ ()[[Scopes]]: Scopes[0]concat: ƒ concat()constructor: ƒ String()endsWith: ƒ endsWith()fixed: ƒ fixed()fontcolor: ƒ fontcolor()fontsize: ƒ fontsize()includes: ƒ includes()indexOf: ƒ indexOf()isWellFormed: ƒ isWellFormed()italics: ƒ italics()lastIndexOf: ƒ lastIndexOf()length: 0link: ƒ link()localeCompare: ƒ localeCompare()match: ƒ match()matchAll: ƒ matchAll()normalize: ƒ normalize()padEnd: ƒ padEnd()padStart: ƒ padStart()repeat: ƒ repeat()replace: ƒ replace()replaceAll: ƒ replaceAll()search: ƒ search()slice: ƒ slice()small: ƒ small()split: ƒ split()startsWith: ƒ startsWith()strike: ƒ strike()sub: ƒ sub()substr: ƒ substr()substring: ƒ substring()sup: ƒ sup()toLocaleLowerCase: ƒ toLocaleLowerCase()toLocaleUpperCase: ƒ toLocaleUpperCase()toLowerCase: ƒ toLowerCase()toString: ƒ toString()toUpperCase: ƒ toUpperCase()toWellFormed: ƒ toWellFormed()trim: ƒ trim()trimEnd: ƒ trimEnd()trimLeft: ƒ trimStart()trimRight: ƒ trimEnd()trimStart: ƒ trimStart()valueOf: ƒ valueOf()Symbol(Symbol.iterator): ƒ [Symbol.iterator]()[[Prototype]]: Object[[PrimitiveValue]]: ""*/
// Father {Skin , Height , eyeColor}
//Father.prototype={ Properties and methods of Father}
// child = {} child.__proto__=Father.prototype
//child={Skin , Height , eyeColor}
//child.__proto__={ Properties and methods of Father}
//Array.prototype={ Properies and methods of Array}
arr2.sort();
console.log(arr2);
const str ='Aniket';
// str.__proto__=String.prototype;
str.length; //str.__proto__.length=6
arr2.__proto__.normalsum = function() {
    let sum = 0;
    for (let i = 0; i < this.length; i++) {
      sum = sum + this[i];
    }
    return sum;
  };
summation=arr2.normalsum();
console.log(summation);
  //reduce: Higher Order Function 
arr2.__proto__.reducesum = function() {
   const sumArray = this.reduce((total, num) => total + num, 0);
    console.log(sumArray); 
};
arr2.reducesum();

