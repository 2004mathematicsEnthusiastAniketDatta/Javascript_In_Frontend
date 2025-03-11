// Data Type: Primitive (Most simple or basic) Data Types-> null , Number -> Integer, Number -> Float, String, Boolean, BigInt, Symbol
//Non-Primitive Data Type: Object, Array, Function.
// Primitive Data Types are immutable (unchangeable) and Non-Primitive Data Types are mutable (changeable).
// Shallow copy: /*# Shallow Copy in JavaScript

// A shallow copy creates a new object or array, but doesn't copy nested objects/arrays. Instead, it copies references to those nested objects/arrays.

// ## Key Characteristics of Shallow Copy

// 1. **First-level properties** are copied as new values
// 2. **Nested objects/arrays** are copied as references to the original objects/arrays
// 3. **Changes to nested objects** in the copy will affect the original (and vice versa)

// ## Methods to Create Shallow Copies

// ### For Objects

// ```javascript
// // Using Object.assign()
// const original = { name: "John", address: { city: "New York" } };
// const copy = Object.assign({}, original);

// // Using spread syntax (...)
// const copy2 = { ...original };
// ```

// ### For Arrays

// ```javascript
// // Using slice()
// const originalArray = [1, 2, [3, 4]];
// const copyArray = originalArray.slice();

// // Using spread syntax (...)
// const copyArray2 = [...originalArray];

// // Using Array.from()
// const copyArray3 = Array.from(originalArray);
// ```

// ## Example Demonstrating Shallow Copy Behavior

// ```javascript
// // Create an original object with nested object
// const user = {
//   name: "Alice",
//   contact: {
//     email: "alice@example.com",
//     phone: "123-456-7890"
//   }
// };

// // Create a shallow copy
// const userCopy = { ...user };

// // Modify a top-level property (creates a new value)
// userCopy.name = "Bob";
// console.log(user.name);      // "Alice" (original unchanged)
// console.log(userCopy.name);  // "Bob" (copy changed)

// // Modify a nested object property (modifies shared reference)
// userCopy.contact.email = "bob@example.com";
// console.log(user.contact.email);      // "bob@example.com" (original changed!)
// console.log(userCopy.contact.email);  // "bob@example.com" (copy changed)
// ```

// ## Contrast with Deep Copy

// A deep copy creates entirely new copies of nested objects/arrays, ensuring that modifications to any level of the copy don't affect the original.

// To create a deep copy:

// ```javascript
// // Simple but limited to JSON-serializable data
// const deepCopy = JSON.parse(JSON.stringify(original));

// // Or using libraries like lodash
// // const deepCopy = _.cloneDeep(original);
// ```
/**# Deep Copy in JavaScript

A deep copy creates completely independent copies of nested objects or arrays, ensuring modifications to any level of the copied structure don't affect the original.

## Key Characteristics of Deep Copy

1. **All levels of properties** are copied as new values
2. **Nested objects/arrays** are copied completely, not just references
3. **Changes at any level** in the copy won't affect the original (and vice versa)

## Methods to Create Deep Copies

### Using JSON Methods (Simple Approach)

```javascript
// Using JSON.parse and JSON.stringify
const original = { 
  name: "John", 
  address: { city: "New York" },
  hobbies: ["reading", "swimming"]
};
const deepCopy = JSON.parse(JSON.stringify(original));
```

**Limitations:**
- Cannot copy functions, undefined values, symbols, or circular references
- Loses date objects (converts to strings)
- May have performance issues with large objects

### Using Structured Clone API (Modern Browsers)

```javascript
// Modern approach available in newer browsers
const deepCopy = structuredClone(original);
```

**Benefits:**
- Handles circular references
- Preserves most built-in types (Maps, Sets, Dates, etc.)
- Usually better performance than JSON approach

### Using Libraries

```javascript
// Using lodash
const deepCopy = _.cloneDeep(original);

// Using Ramda
const deepCopy = R.clone(original);
```

## Example Demonstrating Deep Copy Behavior

  */
// ## Implications for Your Code

// In your `Profile` class, if you create a shallow copy of a profile instance, changes to nested objects like `personalInfo.contact` would affect both the copy and the original. This is important to consider when manipulating complex data structures like your profile objects.*/
//

// Data Structure
// Data Processing -> Conditional Statements, Loops 
// Data Validation
// Data Manipulation

/**
 * @typedef {Object} ProfileData
 * @property {string} name - Person's full name
 * @property {number} age - Person's age
 * @property {string} city - City of residence
 * @property {string} country - Country of residence
 * @property {string} dob - Date of birth (YYYY-MM-DD)
 * @property {string} email - Contact email address
 * @property {string} phone - Contact phone number
 * @property {string} clg - College/University name
 * @property {string} degree - Degree name
 * @property {number} passout - Graduation year
 * @property {string} company - Current company name
 * @property {string} designation - Current job title
 * @property {number} exp - Years of experience
 * @property {boolean} isPaid - Payment status
 * @property {string} favoriteClass - Preferred subject
 * @property {string[]} skills - Technical skills
 */

// Available skills
const SKILLS = ["HTML", "CSS", "JS"];
let minage = 18;
/**
 * Profile class for managing personal, educational and professional information
 */
class Profile {
    /**
     * Creates a new profile
     * @param {string} name - Person's name
     * @param {number} age - Person's age
     * @param {string} city - City of residence
     * @param {string} country - Country of residence
     * @param {string} dob - Date of birth
     * @param {string} email - Contact email
     * @param {string} phone - Contact phone
     * @param {string} clg - College name
     * @param {string} degree - Degree type
     * @param {number} passout - Graduation year
     * @param {string} company - Company name
     * @param {string} designation - Job title
     * @param {number} exp - Years of experience
     * @param {boolean} isPaid - Payment status
     * @param {string} favoriteClass - Favorite subject
     * @param {string[]} skills - Technical skills
     */
    constructor(name, age, city, country, dob, email, phone, clg, degree, passout, company, designation, exp, isPaid, favoriteClass, skills) {
        this.name = name;
        this.age = age;
        this.city = city;
        this.country = country;
        this.dob = dob;
        this.email = email;
        this.phone = phone;
        this.clg = clg;
        this.degree = degree;
        this.passout = passout;
        this.company = company;
        this.designation = designation;
        this.exp = exp;
        this.isPaid = isPaid;
        this.favoriteClass = favoriteClass;
        this.skills = skills;
    }

    /**
     * Generates a structured object representation of the profile
     * @returns {Object} Organized profile information
     */
    profileIndividual = () => {
        return {
            personalInfo: {
                name: this.name,
                age: this.age,
                isPaid: this.isPaid,
                dateOfBirth: this.dob,
                contact: {
                    email: this.email,
                    phone: this.phone
                },
                location: {
                    city: this.city,
                    country: this.country
                }
            },
            education: {
                college: this.clg,
                degree: this.degree,
                graduationYear: this.passout,
                favoriteClass: this.favoriteClass
            },
            professional: {
                currentCompany: this.company,
                designation: this.designation,
                yearsOfExperience: this.exp,
                skills: this.skills,
            }
        };
    }
}

// Create a new profile instance
//person is a reference to the object in memory
const person = new Profile(
    "Rohit", // String - "",'',``
    20, // Number - Integer
    "Kolkata", // String - "",'',``
    "India", // String - "",'',``
    "2004-07-15", // String - "",'',``
    "rohit@example.com", // String - "",'',`` Special Characters Included
    "9123456789", // String - "",'',``
    "Maulana Abul Kalam Azad University of Technology", // String - "",'',``
    "Computer Science with AIML", // String - "",'',``
    2026, // Number
    "TCS", // String - "",'',``
    "Software Development Practitioner", // String - "",'',``
    2.5, // Number - Float
    true, // Boolean - true/false
    "backend", // String - "",'',`` - Note the comma was missing here
    ["HTML", "CSS", "JS"] // Array
);

console.log(person.profileIndividual());
console.log(typeof(person.favoriteClass));
person.favoriteClass = undefined;
console.log(person.profileIndividual());
console.log(typeof(person.favoriteClass));
console.log(typeof(person.isPaid));
console.log(typeof(person.skills));
// in object , if key is not present then it will be undefined , key: value pairs in memory
//in array , the first key is - , second is 1, third is 2 and so on




