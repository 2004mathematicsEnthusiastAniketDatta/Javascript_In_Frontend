// import fsv2 from 'fs/promises'; // Importing the fs module
// import fs from 'fs'; // Standard fs module for streams
// import readline from 'readline'; // Import readline module

// // File operations with promises
// fsv2.readFile('./backup.txt', 'utf-8')
//     .then((contents) => {
//         console.log("File read successfully", contents);
//         return fsv2.writeFile('./file.txt', contents);
//     })
//     .then(() => {
//         console.log("File copied successfully");
//         console.log("deleting file ...");
//         return fsv2.unlink('./backup.txt');
//     })
//     .then(() => {
//         console.log("File deleted successfully");
//     })
//     .catch((err) => {
//         console.log("Error:", err);
//     })
//     .finally(() => {
//         console.log("new File replaced");
//     });

// // Example 1: API Fetching with Error Handling
// async function fetchUserData(userId) {
//         try {
//                 const response = await fetch(`https://api.example.com/users/${userId}`);
//                 if (!response.ok) {
//                         throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 const userData = await response.json();
//                 return userData;
//         } catch (error) {
//                 console.error("Error fetching user data:", error);
//                 throw error;
//         }
// }

// // Mock db object for the example
// const db = {
//         accounts: {
//                 findById: async (id) => ({ id, balance: id === 'acc1' ? 1000 : 500 }),
//                 update: async (id, data) => ({ id, ...data })
//         }
// };

// // Example 2: Sequential Database Operations
// async function transferFunds(fromAccountId, toAccountId, amount) {
//         try {
//                 const fromAccount = await db.accounts.findById(fromAccountId);
//                 const toAccount = await db.accounts.findById(toAccountId);
                
//                 if (fromAccount.balance < amount) {
//                         throw new Error("Insufficient funds");
//                 }
                
//                 await db.accounts.update(fromAccountId, { balance: fromAccount.balance - amount });
//                 await db.accounts.update(toAccountId, { balance: toAccount.balance + amount });
                
//                 return { success: true, message: "Transfer completed" };
//         } catch (error) {
//                 console.error("Transfer failed:", error);
//                 return { success: false, message: error.message };
//         }
// }

// // Example 3: Parallel Operations with Promise.all
// async function loadDashboardData(userId) {
//         try {
//                 // Using mock fetch for the example
//                 const mockFetch = async () => ({ json: async () => ({ data: "mock data" }) });
                
//                 const [userData, userPosts, userAnalytics] = await Promise.all([
//                         mockFetch().then(res => res.json()),
//                         mockFetch().then(res => res.json()),
//                         mockFetch().then(res => res.json())
//                 ]);
                
//                 return { userData, userPosts, userAnalytics };
//         } catch (error) {
//                 console.error("Failed to load dashboard data:", error);
//                 throw error;
//         }
// }

// // Utility function for delay
// function sleep(ms) {
//         return new Promise(resolve => setTimeout(resolve, ms));
// }

// // Example 4: Retry Logic with Exponential Backoff
// async function fetchWithRetry(url, options = {}, maxRetries = 3) {
//         let retries = 0;
        
//         while (retries < maxRetries) {
//                 try {
//                         // Using mock fetch for the example
//                         const mockResponse = { ok: retries > 1, status: retries > 1 ? 200 : 429, json: async () => ({ data: "success" }) };
                        
//                         if (mockResponse.ok) return await mockResponse.json();
                        
//                         if (mockResponse.status === 429) {
//                                 throw new Error('Rate limited');
//                         }
                        
//                         return mockResponse;
//                 } catch (error) {
//                         retries++;
//                         if (retries >= maxRetries) throw error;
                        
//                         const delay = Math.pow(2, retries - 1) * 1000;
//                         console.log(`Retrying in ${delay}ms... (${retries}/${maxRetries})`);
//                         await sleep(delay);
//                 }
//         }
// }

// // Example 5: Async Generators
// async function* streamData(dataSource, pageSize = 100) {
//         let currentPage = 1;
//         let hasMoreData = true;
        
//         // Mock data for example
//         const mockData = [
//                 [{ id: 1 }, { id: 2 }],
//                 [{ id: 3 }, { id: 4 }],
//                 []
//         ];
        
//         while (hasMoreData) {
//                 // Mock fetch
//                 const data = mockData[currentPage - 1] || [];
                
//                 if (data.length === 0) {
//                         hasMoreData = false;
//                 } else {
//                         yield data;
//                         currentPage++;
//                 }
//         }
// }

// // Process function for streaming example
// async function processItem(item) {
//         console.log(`Processing item ${item.id}`);
//         await sleep(10); // Simulate processing time
// }

// // Usage of async generator
// async function processStreamingData() {
//         const dataStream = streamData('https://api.example.com/largeDataSet');
        
//         for await (const batch of dataStream) {
//                 console.log(`Processing batch of ${batch.length} items`);
//                 for (const item of batch) {
//                         await processItem(item);
//                 }
//         }
//         console.log('Finished processing all data');
// }

// // Helper function for file processing example
// async function processLine(line) {
//         return line.toUpperCase(); // Simple transformation
// }

// // Example 6: Real-world file processing with streams
// async function processLargeFile(inputFile, outputFile) {
//         try {
//                 const readStream = fs.createReadStream(inputFile); // Use fs, not fsv2
//                 const writeStream = fs.createWriteStream(outputFile);
                
//                 const lineReader = readline.createInterface({
//                         input: readStream,
//                         crlfDelay: Infinity
//                 });
                
//                 for await (const line of lineReader) {
//                         const processedLine = await processLine(line);
                        
//                         if (processedLine) {
//                                 writeStream.write(processedLine + '\n');
//                         }
//                 }
                
//                 writeStream.end();
//                 console.log(`File processing complete: ${inputFile} → ${outputFile}`);
//         } catch (error) {
//                 console.error("Error processing file:", error);
//         }
// }

// // Execute one of the examples safely
// (async () => {
//         try {
//                 // Example using mocked functionality rather than actual API call
//                 const result = await loadDashboardData("user123");
//                 console.log("Result:", result);
                
//                 // Try the streaming example
//                 await processStreamingData();
                
//                 // Try the file operation if files exist (commented out to prevent errors)
//                 // await processLargeFile('input.txt', 'output.txt');
//         } catch (error) {
//                 console.error("Operation failed:", error);
//         }
// })();



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

// Using async/await
function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
 async function doTasks(){
    try{
        const data = await readFileWithPromise('./hello.txt', 'utf-8');
        console.log("File read successfully", data); // Printing the file contents
        await writeFileWithPromise('./hello2.txt', 'Hello World');
        await wait(10);
        console.log("File written successfully"); // Printing the file contents
        await deleteFileWithPromise('./hello.txt');
        console.log("File deleted successfully"); // Printing the file contents
    }
    catch(err){
        console.log("Error:", err); // Printing the file contents
    }
    finally{
        console.log("new File replaced"); // Printing the file contents
    }
 }
doTasks();


// async function registerUser(){
//         await collectData();
//         validateUserEmail();
//         await insertInDb();
//         sendEmail();
//         sendSms();
//         sendPushNotification();
//         sendWhatsAppNotification();
// }

// registerUser().then(() => {
//         console.log("User registered successfully");
// }).catch((err) => {
//         console.log("Error:", err);
// }).finally(() => {
//         console.log("User registration process completed");
// });

