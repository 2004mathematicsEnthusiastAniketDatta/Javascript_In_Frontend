// Data Type -> null , Number -> Integer, Number -> Float, String, Boolean, BigInt, Symbol
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
person.favoriteClass = undefined;
console.log(person.profileIndividual());

// in object , if key is not present then it will be undefined , key: value pairs in memory
//in array , the first key is - , second is 1, third is 2 and so on
