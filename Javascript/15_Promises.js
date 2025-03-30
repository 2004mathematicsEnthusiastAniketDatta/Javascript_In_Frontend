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
console.log('Can a Promise be a function?');

import axios from "axios";
setTimeout(() => {
    const getData = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts"); //JSON data
            console.log(response.data); // This will log the actual data
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    getData();
}, 1000); // waits for 1 second before executing the function
//We promise the Client that we will return the data in the future when we recieve the data.
//The client can use the .then() method to handle the fulfilled state of the promise.
//The .catch() method is used to handle the rejected state of the promise.
//The .finally() method is used to execute code after the promise is settled, regardless of its outcome.
//The .then() method takes two arguments: the first is a callback function to handle the fulfilled state, and the second is a callback function to handle the rejected state.
//The .catch() method takes one argument: a callback function to handle the rejected state.

//Resolve: The promise is fulfilled successfully.

Promise.resolve("Success").then((data) => {
    console.log(data); // Output: Success
}
).catch((error) => {
    console.error(error);
});
console.log('Promise can be a function and required to handle asynchronous operations.');

//In browser , we have timers, Promises, and DOM events.
//In Node.js, we have timers, Promises, and I/O operations.
//There is MicroTask Queue and Task Queue /Callback Queue.
//MicroTask Queue has higher priority than Task Queue.
//MicroTask Queue: Promises
//Task Queue: setTimeout, setInterval, setImmediate
//MicroTask Queue is executed before the Task Queue.
//MicroTask Queue is executed after the current stack is empty.
//MicroTask Queue is executed before the next event loop iteration.
//MicroTask Queue is executed before the next task in the Task Queue.
//MicroTask Queue is executed before the next timer.
//Starvation is a situation where a task is never executed because there are always tasks in the queue.

// Promise chaining

const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise 1 resolved");
    }, 1000);
}
);

const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise 3 resolved");
    }, 0);
}
);
const promise4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise 4 resolved");
    }, 0);
}
);
const promise5 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise 5 resolved");
    }, 0);
}
);

/**
 * E-Commerce Order Processing System
 * 
 * Demonstrates:
 * - OOP design with encapsulation and inheritance
 * - Promise chaining for sequential operations
 * - Error handling strategies
 * - Logging and monitoring integration
 * - Retry mechanisms
 */

// Base class for all order processing steps
class OrderProcessor {
    constructor(orderId, logger) {
      this.orderId = orderId;
      this.logger = logger || console;
      this.retryCount = 0;
      this.maxRetries = 3;
    }
    
    async process() {
      throw new Error('Method process() must be implemented by subclass');
    }
    
    async executeWithRetry() {
      try {
        return await this.process();
      } catch (error) {
        if (this.retryCount < this.maxRetries) {
          this.retryCount++;
          this.logger.warn(`Retrying ${this.constructor.name} for order ${this.orderId}, attempt ${this.retryCount}`);
          // Exponential backoff
          const delay = 1000 * Math.pow(2, this.retryCount - 1);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.executeWithRetry();
        } else {
          this.logger.error(`Failed to process ${this.constructor.name} for order ${this.orderId} after ${this.maxRetries} attempts`);
          throw error;
        }
      }
    }
  }
  
  // Step 1: Inventory Verification
  class InventoryProcessor extends OrderProcessor {
    constructor(orderId, items, inventoryService, logger) {
      super(orderId, logger);
      this.items = items;
      this.inventoryService = inventoryService;
    }
    
    async process() {
      this.logger.info(`Checking inventory for order ${this.orderId}`);
      
      const inventoryChecks = this.items.map(item => 
        this.inventoryService.checkAvailability(item.productId, item.quantity)
      );
      
      const results = await Promise.all(inventoryChecks);
      
      // Check if all items are available
      const unavailableItems = results
        .filter(result => !result.available)
        .map(result => result.productId);
        
      if (unavailableItems.length > 0) {
        const error = new Error(`Some items are out of stock`);
        error.unavailableItems = unavailableItems;
        throw error;
      }
      
      this.logger.info(`Inventory check passed for order ${this.orderId}`);
      return this.items;
    }
  }
  
  // Step 2: Payment Processing
  class PaymentProcessor extends OrderProcessor {
    constructor(orderId, paymentDetails, paymentService, logger) {
      super(orderId, logger);
      this.paymentDetails = paymentDetails;
      this.paymentService = paymentService;
    }
    
    async process() {
      this.logger.info(`Processing payment for order ${this.orderId}`);
      
      const paymentResult = await this.paymentService.processPayment(
        this.orderId,
        this.paymentDetails.amount,
        this.paymentDetails.method,
        this.paymentDetails.cardInfo
      );
      
      if (!paymentResult.success) {
        const error = new Error(`Payment failed: ${paymentResult.message}`);
        error.paymentError = paymentResult.errorCode;
        throw error;
      }
      
      this.logger.info(`Payment successful for order ${this.orderId}, transaction ID: ${paymentResult.transactionId}`);
      return {
        orderId: this.orderId,
        transactionId: paymentResult.transactionId,
        amount: this.paymentDetails.amount
      };
    }
  }
  
  // Step 3: Order Fulfillment
  class FulfillmentProcessor extends OrderProcessor {
    constructor(orderId, items, paymentInfo, fulfillmentService, logger) {
      super(orderId, logger);
      this.items = items;
      this.paymentInfo = paymentInfo;
      this.fulfillmentService = fulfillmentService;
    }
    
    async process() {
      this.logger.info(`Creating fulfillment request for order ${this.orderId}`);
      
      const fulfillmentResult = await this.fulfillmentService.createFulfillmentRequest({
        orderId: this.orderId,
        items: this.items,
        paymentId: this.paymentInfo.transactionId
      });
      
      if (!fulfillmentResult.success) {
        const error = new Error(`Fulfillment request failed: ${fulfillmentResult.message}`);
        error.fulfillmentError = fulfillmentResult.errorCode;
        throw error;
      }
      
      this.logger.info(`Fulfillment request created for order ${this.orderId}, tracking ID: ${fulfillmentResult.trackingId}`);
      return {
        orderId: this.orderId,
        trackingId: fulfillmentResult.trackingId,
        estimatedDelivery: fulfillmentResult.estimatedDelivery
      };
    }
  }
  
  // Step 4: Notification Service
  class NotificationProcessor extends OrderProcessor {
    constructor(orderId, customer, orderDetails, notificationService, logger) {
      super(orderId, logger);
      this.customer = customer;
      this.orderDetails = orderDetails;
      this.notificationService = notificationService;
    }
    
    async process() {
      this.logger.info(`Sending notifications for order ${this.orderId}`);
      
      // Parallel notifications to different channels
      await Promise.all([
        this.notificationService.sendEmail(
          this.customer.email,
          'Order Confirmation',
          {
            orderId: this.orderId,
            trackingId: this.orderDetails.trackingId,
            estimatedDelivery: this.orderDetails.estimatedDelivery,
            items: this.orderDetails.items
          }
        ),
        this.customer.phone ? 
          this.notificationService.sendSMS(
            this.customer.phone,
            `Your order ${this.orderId} has been confirmed. Track it with ID: ${this.orderDetails.trackingId}`
          ) : Promise.resolve()
      ]);
      
      this.logger.info(`Notifications sent for order ${this.orderId}`);
      return {
        orderId: this.orderId,
        notificationStatus: 'sent'
      };
    }
  }
  
  // Order Orchestrator - Chains the entire process
  class OrderOrchestrator {
    constructor(logger) {
      this.logger = logger || console;
    }
    
    async processOrder(order, services) {
      const { 
        inventoryService, 
        paymentService, 
        fulfillmentService, 
        notificationService 
      } = services;
      
      try {
        this.logger.info(`Starting order process for ${order.orderId}`);
        
        // Step 1: Check inventory
        const inventoryProcessor = new InventoryProcessor(
          order.orderId, 
          order.items, 
          inventoryService,
          this.logger
        );
        
        // Step 2: Process payment
        const paymentProcessor = new PaymentProcessor(
          order.orderId, 
          order.paymentDetails, 
          paymentService,
          this.logger
        );
        
        // Note the Promise chaining pattern
        return inventoryProcessor.executeWithRetry()
          .then(verifiedItems => {
            order.verifiedItems = verifiedItems;
            return paymentProcessor.executeWithRetry();
          })
          .then(paymentInfo => {
            // Step 3: Create fulfillment
            const fulfillmentProcessor = new FulfillmentProcessor(
              order.orderId,
              order.verifiedItems,
              paymentInfo,
              fulfillmentService,
              this.logger
            );
            return fulfillmentProcessor.executeWithRetry();
          })
          .then(fulfillmentInfo => {
            // Step 4: Send notifications
            const notificationProcessor = new NotificationProcessor(
              order.orderId,
              order.customer,
              {
                ...fulfillmentInfo,
                items: order.verifiedItems
              },
              notificationService,
              this.logger
            );
            return notificationProcessor.executeWithRetry();
          })
          .then(() => {
            this.logger.info(`Order ${order.orderId} processed successfully`);
            return {
              success: true,
              orderId: order.orderId,
              status: 'COMPLETED'
            };
          })
          .catch(error => {
            // Comprehensive error handling and recovery
            this.logger.error(`Error processing order ${order.orderId}: ${error.message}`);
            
            // Different error types might require different recovery strategies
            if (error.paymentError) {
              return this.handlePaymentError(order, error);
            } else if (error.fulfillmentError) {
              return this.handleFulfillmentError(order, error);
            } else {
              return {
                success: false,
                orderId: order.orderId,
                status: 'FAILED',
                reason: error.message
              };
            }
          });
      } catch (error) {
        this.logger.error(`Unexpected error in order orchestration: ${error.message}`);
        return {
          success: false,
          orderId: order.orderId,
          status: 'ERROR',
          reason: 'Unexpected system error'
        };
      }
    }
    
    async handlePaymentError(order, error) {
      // Implement recovery strategy for payment errors
      // Could involve automatic retries with different payment methods,
      // holding the order for manual customer action, etc.
      this.logger.warn(`Handling payment error for order ${order.orderId}: ${error.paymentError}`);
      
      return {
        success: false,
        orderId: order.orderId,
        status: 'PAYMENT_FAILED',
        reason: error.message,
        recoveryAction: 'REQUEST_ALTERNATIVE_PAYMENT'
      };
    }
    
    async handleFulfillmentError(order, error) {
      // Implement recovery strategy for fulfillment errors
      this.logger.warn(`Handling fulfillment error for order ${order.orderId}: ${error.fulfillmentError}`);
      
      return {
        success: false,
        orderId: order.orderId,
        status: 'FULFILLMENT_FAILED',
        reason: error.message,
        recoveryAction: 'RETRY_LATER'
      };
    }
  }
  
  // Usage example
  async function processCustomerOrder() {
    // Mock services
    const services = {
      inventoryService: {
        async checkAvailability(productId, quantity) {
          // In real implementation, this would call a database or microservice
          await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
          return { productId, available: Math.random() > 0.1, stock: 100 };
        }
      },
      paymentService: {
        async processPayment(orderId, amount, method) {
          await new Promise(resolve => setTimeout(resolve, 500));
          return { 
            success: Math.random() > 0.1, 
            transactionId: `tx-${Date.now()}`,
            message: 'Payment processed successfully' 
          };
        }
      },
      fulfillmentService: {
        async createFulfillmentRequest(orderInfo) {
          await new Promise(resolve => setTimeout(resolve, 800));
          return {
            success: Math.random() > 0.1,
            trackingId: `track-${Date.now()}`,
            estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
          };
        }
      },
      notificationService: {
        async sendEmail(email, subject, data) {
          await new Promise(resolve => setTimeout(resolve, 200));
          return { sent: true, recipient: email };
        },
        async sendSMS(phone, message) {
          await new Promise(resolve => setTimeout(resolve, 200));
          return { sent: true, recipient: phone };
        }
      }
    };
    
    // Customer order
    const order = {
      orderId: `order-${Date.now()}`,
      customer: {
        id: 'cust123',
        email: 'customer@example.com',
        phone: '+15551234567'
      },
      items: [
        { productId: 'prod-1', quantity: 2, price: 29.99 },
        { productId: 'prod-2', quantity: 1, price: 49.99 }
      ],
      paymentDetails: {
        amount: 109.97,
        method: 'credit_card',
        cardInfo: { 
          // In a real app, this would be tokenized
          last4: '4242'
        }
      }
    };
    
    // Process the order
    const orderOrchestrator = new OrderOrchestrator();
    const result = await orderOrchestrator.processOrder(order, services);
    
    console.log('Order processing result:', result);
    return result;
  }
  
  // Execute the order process
  processCustomerOrder()
    .then(result => {
      if (result.success) {
        console.log(`Order ${result.orderId} completed successfully`);
      } else {
        console.log(`Order ${result.orderId} failed: ${result.reason}`);
        
        // Handle different recovery actions
        if (result.recoveryAction === 'REQUEST_ALTERNATIVE_PAYMENT') {
          console.log('Requesting alternative payment method from customer');
        } else if (result.recoveryAction === 'RETRY_LATER') {
          console.log('Will retry fulfillment process later');
        }
      }
    });


    