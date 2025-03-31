// // # Understanding Synchronous Code in JavaScript

// // Synchronous code in JavaScript executes line by line, in order, with each operation completing before the next one begins. This is the default behavior in JavaScript.

// // ## Key Characteristics of Synchronous Code

// // - **Sequential Execution**: Code runs in the order it's written
// // - **Blocking**: Each operation blocks execution until it completes
// // - **Single-threaded**: Only one operation executes at a time

// // ## Example

// // ```javascript
// // console.log("First");
// // console.log("Second");
// // console.log("Third");
// // ```

// // In this example, "First" will always print before "Second", and "Second" before "Third".

// // ## Real-world Implications

// // Synchronous operations can cause problems when dealing with time-consuming tasks:

// // ```javascript
// // console.log("Starting...");
// // // This would freeze the UI if executed synchronously
// // const data = fetchDataFromServer(); // Blocking operation
// // console.log("Data:", data);
// // console.log("Finished!");
// // ```

// // This is why JavaScript also offers asynchronous patterns (callbacks, Promises, async/await) for operations that might take time, like:
// // - Network requests
// // - File operations
// // - Timers/delays

// // You could expand your active file to contrast synchronous vs asynchronous code patterns.

// // Async -> Non-blocking code

// import fs from 'fs';

// console.log('Starting Program');

// const contents = fs.readFileSync('hello.txt', 'utf-8');// Reading file synchronously

// const lines = contents.split('\n'); // Splitting the contents into lines

// const lineCount = lines.length; // Counting the number of lines

// console.log('Number of lines:', lineCount);

// const wordperline = lines.map(line => line.split(' ').length); // Counting the number of words per line

// console.log('Words per line:', wordperline); // Counting the number of words per line

// const longestLine = lines.reduce((a, b) => a.length > b.length ? a : b); // Finding the longest line

// console.log('Longest line:', longestLine);

// const longestWord = lines.reduce((a, b) => {
//     const words = b.split(' ');
//     return words.reduce((longest, word) => word.length > longest.length ? word : longest, a);
// }, ''); // Finding the longest word

// console.log('Longest word:', longestWord); // Finding the longest word

// const longestWordLength = longestWord.length; // Finding the length of the longest word

// console.log('Longest word length:', longestWordLength);

// const longestWordLine = lines.reduce((a, b) => {
//     const words = b.split(' ');
//     return words.reduce((longest, word) => word.length > longest.length ? b : longest, a);
// }, ''); // Finding the line with the longest word

// console.log('Longest word line:', longestWordLine); // Finding the line with the longest word

// console.log('File Contents:', contents); // Printing the file contents

// console.log("End of Program");


// //Asyncheonous code for the above code

// console.log('Starting Program');

// fs.readFile('./hello.txt', 'utf-8', (err, contents) => {
//     if(err){
//         console.log("Error reading file:", err);     
//     }
//     else{
//         const lines = contents.split('\n'); // Splitting the contents into lines

//         const lineCount = lines.length; // Counting the number of lines

//         console.log('Number of lines:', lineCount);

//         const wordperline = lines.map(line => line.split(' ').length); // Counting the number of words per line

//         console.log('Words per line:', wordperline); // Counting the number of words per line

//         const longestLine = lines.reduce((a, b) => a.length > b.length ? a : b); // Finding the longest line

//         console.log('Longest line:', longestLine);

//         const longestWord = lines.reduce((a, b) => {
//             const words = b.split(' ');
//             return words.reduce((longest, word) => word.length > longest.length ? word : longest, a);
//         }, ''); // Finding the longest word

//         console.log('Longest word:', longestWord); // Finding the longest word

//         const longestWordLength = longestWord.length; // Finding the length of the longest word

//         console.log('Longest word length:', longestWordLength);

//         const longestWordLine = lines.reduce((a, b) => {
//             const words = b.split(' ');
//             return words.reduce((longest, word) => word.length > longest.length ? b : longest, a);
//         }, ''); // Finding the line with the longest word

//         console.log('Longest word line:', longestWordLine); // Finding the line with the longest word

//         console.log('File Contents:', contents); // Printing the file contents
//     }
// });

// console.log("End of Program");

// //Asynchronous code with callback function
// sum(2,5,(result)=>{
//     console.log("Sum:", result); // 7
// });
// // console.log("Sum:", result); // 7
// function sum(a, b,cb) {
//     setTimeout(() => {
//         cb(a+b);
//     },5*1000);
// }
// //getWeatherData("London", (data) => {
// //     console.log("Weather data:", data);
// // });

// //1.Read the contents of file from hello.txt
// //2. Then create a new file  named as backup.txt
// //3. Copy the contents of hello file to backup file
// //4. Delete the hello.txt file
// //----------------------LEGACY CODE-----------------------------
// fs.readFile('./hello.txt', 'utf-8', (err, contents) => {
//     if (err){
//         console.log("Error reading file:", err);

//     }
//     else{
//         console.log("File read successfully", contents);
//          fs.writeFile('./backup.txt', contents, (err) => {
//             if (err){
//                 console.log("Error writing file:", err);
//             }
//             else{
//                 console.log("File copied successfully");
//                 fs.unlink('./hello.txt', (err) => {
//                     if (err){
//                         console.log("Error deleting file:", err);
//                     }
//                     else{
//                         console.log("File deleted successfully");
//                     }
//                 });
//             }

//          });
//     } 
// });
// // We are in Callback hell because of two nesting of callback functions
// // We can use Promises to avoid callback hell
// // 1. Create a function that returns a promise
// // 2. Use the promise in the callback function
// // 3. Use the promise in the then function
// // 4. Use the promise in the catch function
// // 5. Use the promise in the finally function
// // 6. Use the promise in the all function

// //Asynchronous code with promise

// //-----------------------MODERN CODE----------------------------
// import fsv2 from 'fs/promises'; // Importing the fs module

// // const res = await fsv2.readFile('./hello.txt', 'utf-8'); // Reading the file

// console.log("File read successfully", res); // Printing the file contents


// fsv2.readFile('./backup.txt', 'utf-8')
// .then((contents) => {
//     console.log("File read successfully", contents); // Printing the file contents
//     return fsv2.writeFile('./backup.txt', contents); // Writing the file
// })
// .then(() => {
//     console.log("File copied successfully"); // Printing the file contents
//     console.log("deleting file ..."); // Printing the file contents
//     return fsv2.unlink('./hello.txt'); // Deleting the file       
// })
// .catch((err) => {
//     console.log("Error:", err); // Printing the file contents
// }
// ).finally(() => {
//     console.log("new File replaced"); // Printing the file contents
// }
// ); // Printing the file contents

import fsv2 from 'fs/promises'; // Importing the fs module

fsv2.readFile('./backup.txt', 'utf-8')
.then((contents) => {
    console.log("File read successfully", contents); // Printing the file contents
    return fsv2.writeFile('./file.txt', contents); // Writing the file
})
.then(() => {
    console.log("File copied successfully"); // Printing the file contents
    console.log("deleting file ..."); // Printing the file contents
    return fsv2.unlink('./backup.txt'); // Deleting the file       
})
.then(() => {   
    console.log("File deleted successfully"); // Printing the file contents
}
).catch((err) => {
    console.log("Error:", err); // Printing the file contents
}
).finally(() => {
    console.log("new File replaced"); // Printing the file contents
}
)
.finally(() => {
    console.log("File deleted successfully"); // Printing the file contents
}
); // Printing the file contents

