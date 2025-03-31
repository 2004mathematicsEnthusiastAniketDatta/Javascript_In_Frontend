//Promisification of the promise is the wrapping of the callback function in a promise .
//promisify package is required to convert the callback function into a promise.
// import promisify from 'util.promisify'; // Importing the promisify function from blue bird
import fs from 'fs'; // Importing the fs module
// import fsv2 from 'fs/promises'; // Importing the fs module

function readFileWithPromise(filePath , encoding ) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                reject(err); //go to catch
            } else {
                resolve(data); //go to then
            }
        });
    }
    );
}
function writeFileWithPromise(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                reject(err); //go to catch
            } else {
                resolve(); //go to then
            }
        });
    }
    );
}
function deleteFileWithPromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(err); //go to catch
            } else {
                resolve(); //go to then
            }
        });
    }
    );
}
// Reading the file
const result = readFileWithPromise('./hello.txt', 'utf-8');
result
    .then((data) => {
        console.log("File read successfully", data); // Printing the file contents
    })
    .catch((err) => {
        console.log("Error:", err); // Printing the file contents
    })
    .finally(() => {
        console.log("new File replaced"); // Printing the file contents
    }
    ); // Printing the file contents
// Writing the file
writeFileWithPromise('./hello2.txt', 'Hello World')
    .then(() => {
        console.log("File written successfully"); // Printing the file contents
    })
    .catch((err) => {
        console.log("Error:", err); // Printing the file contents
    })
    .finally(() => {
        console.log("new File replaced"); // Printing the file contents
    }
    ); // Printing the file contents
// Deleting the file
deleteFileWithPromise('./hello.txt')
    .then(() => {
        console.log("File deleted successfully"); // Printing the file contents
    })
    .catch((err) => {
        console.log("Error:", err); // Printing the file contents
    })
    .finally(() => {
        console.log("new File replaced"); // Printing the file contents
    }
    ); // Printing the file contents
