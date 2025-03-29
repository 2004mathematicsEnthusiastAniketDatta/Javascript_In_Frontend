// //Promise: A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It is a placeholder for a value that will be available in the future. Promises are used to handle asynchronous operations in JavaScript, allowing you to write cleaner and more manageable code.
// // Client <-> Server <-> Database
// //When information moves from one node (say Client) to another node (say Server) and vice versa, some time is required.
// //Suppose we make an weather application and we want to fetch the weather data from the server. The processing and response time of the server is not in our control. So, we need to wait for the server to respond.
// // In this case, we require a Promise to handle the asynchronous operation of fetching weather data.
// // A Promise can be in one of three states:
// // 1. Pending: The initial state, neither fulfilled nor rejected.
// // 2. Fulfilled: The operation completed successfully.
// // 3. Rejected: The operation failed.
// //Promise are returned when APIs are called.
import axios from "axios";
const getData = async () => {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts"); //JSON data
        console.log(response.data); // This will log the actual data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
