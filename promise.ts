// Promise states
enum PromiseState {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}

// Type definitions
type Executor<T> = (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void;
type OnFulfilled<T, U> = ((value: T) => U | PromiseLike<U>) | null | undefined;
type OnRejected<U> = ((reason: any) => U | PromiseLike<U>) | null | undefined;

interface PromiseLike<T> {
  then<U1 = T, U2 = never>(
    onFulfilled?: ((value: T) => U1 | PromiseLike<U1>) | null | undefined,
    onRejected?: ((reason: any) => U2 | PromiseLike<U2>) | null | undefined
  ): PromiseLike<U1 | U2>;
}

class MyPromise<T> {
  private state: PromiseState = PromiseState.PENDING;
  private value: T | undefined = undefined;
  private reason: any = undefined;
  private onFulfilledCallbacks: Array<(value: T) => void> = [];
  private onRejectedCallbacks: Array<(reason: any) => void> = [];

  constructor(executor: Executor<T>) {
    const resolve = (value: T | PromiseLike<T>): void => {
      if (this.state === PromiseState.PENDING) {
        // Handle thenable values
        if (value && typeof value === 'object' && 'then' in value && typeof value.then === 'function') {
          try {
            value.then(resolve, reject);
          } catch (error) {
            reject(error);
          }
          return;
        }

        this.state = PromiseState.FULFILLED;
        this.value = value as T;
        
        // Execute all queued onFulfilled callbacks
        this.onFulfilledCallbacks.forEach(callback => {
          this.executeCallback(() => callback(this.value!));
        });
        this.onFulfilledCallbacks = [];
      }
    };

    const reject = (reason?: any): void => {
      if (this.state === PromiseState.PENDING) {
        this.state = PromiseState.REJECTED;
        this.reason = reason;
        
        // Execute all queued onRejected callbacks
        this.onRejectedCallbacks.forEach(callback => {
          this.executeCallback(() => callback(this.reason));
        });
        this.onRejectedCallbacks = [];
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then<U1 = T, U2 = never>(
    onFulfilled?: OnFulfilled<T, U1>,
    onRejected?: OnRejected<U2>
  ): MyPromise<U1 | U2> {
    return new MyPromise<U1 | U2>((resolve, reject) => {
      const handleFulfilled = (value: T): void => {
        try {
          if (typeof onFulfilled === 'function') {
            const result = onFulfilled(value);
            resolve(result);
          } else {
            resolve(value as unknown as U1);
          }
        } catch (error) {
          reject(error);
        }
      };

      const handleRejected = (reason: any): void => {
        try {
          if (typeof onRejected === 'function') {
            const result = onRejected(reason);
            resolve(result);
          } else {
            reject(reason);
          }
        } catch (error) {
          reject(error);
        }
      };

      if (this.state === PromiseState.FULFILLED) {
        this.executeCallback(() => handleFulfilled(this.value!));
      } else if (this.state === PromiseState.REJECTED) {
        this.executeCallback(() => handleRejected(this.reason));
      } else {
        // Promise is still pending, queue the callbacks
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }

  catch<U = never>(onRejected?: OnRejected<U>): MyPromise<T | U> {
    return this.then(undefined, onRejected);
  }

  finally(onFinally?: (() => void) | null | undefined): MyPromise<T> {
    return this.then(
      (value) => {
        if (typeof onFinally === 'function') {
          onFinally();
        }
        return value;
      },
      (reason) => {
        if (typeof onFinally === 'function') {
          onFinally();
        }
        throw reason;
      }
    );
  }

  // Static methods
  static resolve<T>(value: T | PromiseLike<T>): MyPromise<T> {
    return new MyPromise<T>((resolve) => resolve(value));
  }

  static reject<T = never>(reason?: any): MyPromise<T> {
    return new MyPromise<T>((_, reject) => reject(reason));
  }

  static all<T>(promises: Array<T | PromiseLike<T>>): MyPromise<T[]> {
    return new MyPromise<T[]>((resolve, reject) => {
      if (promises.length === 0) {
        resolve([]);
        return;
      }

      const results: T[] = new Array(promises.length);
      let completedCount = 0;

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          (value) => {
            results[index] = value;
            completedCount++;
            if (completedCount === promises.length) {
              resolve(results);
            }
          },
          reject
        );
      });
    });
  }

  static allSettled<T>(promises: Array<T | PromiseLike<T>>): MyPromise<Array<{status: 'fulfilled', value: T} | {status: 'rejected', reason: any}>> {
    return new MyPromise((resolve) => {
      if (promises.length === 0) {
        resolve([]);
        return;
      }

      const results: Array<{status: 'fulfilled', value: T} | {status: 'rejected', reason: any}> = new Array(promises.length);
      let completedCount = 0;

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          (value) => {
            results[index] = { status: 'fulfilled', value };
            completedCount++;
            if (completedCount === promises.length) {
              resolve(results);
            }
          },
          (reason) => {
            results[index] = { status: 'rejected', reason };
            completedCount++;
            if (completedCount === promises.length) {
              resolve(results);
            }
          }
        );
      });
    });
  }

  static race<T>(promises: Array<T | PromiseLike<T>>): MyPromise<T> {
    return new MyPromise<T>((resolve, reject) => {
      if (promises.length === 0) {
        // According to spec, Promise.race with empty array never settles
        return;
      }

      promises.forEach(promise => {
        MyPromise.resolve(promise).then(resolve, reject);
      });
    });
  }

  static any<T>(promises: Array<T | PromiseLike<T>>): MyPromise<T> {
    return new MyPromise<T>((resolve, reject) => {
      if (promises.length === 0) {
        reject(new AggregateError([], 'All promises were rejected'));
        return;
      }

      const errors: any[] = new Array(promises.length);
      let rejectedCount = 0;

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          resolve, // First fulfilled promise resolves the any
          (reason) => {
            errors[index] = reason;
            rejectedCount++;
            if (rejectedCount === promises.length) {
              reject(new AggregateError(errors, 'All promises were rejected'));
            }
          }
        );
      });
    });
  }

  // Helper method to execute callbacks asynchronously
  private executeCallback(callback: () => void): void {
    // Use setTimeout to ensure callbacks are executed asynchronously
    // In a real implementation, this would use microtasks
    setTimeout(callback, 0);
  }
}

// Example usage and testing
export { MyPromise };

// Usage examples:
/*
// Basic usage
const promise1 = new MyPromise<number>((resolve, reject) => {
  setTimeout(() => resolve(42), 100);
});

promise1.then(value => {
  console.log('Resolved with:', value); // 42
}).catch(error => {
  console.log('Rejected with:', error);
});

// Chaining
const promise2 = MyPromise.resolve(10)
  .then(value => value * 2)
  .then(value => value + 5)
  .then(value => {
    console.log('Final value:', value); // 25
  });

// Error handling
const promise3 = new MyPromise<string>((resolve, reject) => {
  reject(new Error('Something went wrong'));
});

promise3.catch(error => {
  console.log('Caught error:', error.message);
});

// Static methods
MyPromise.all([
  MyPromise.resolve(1),
  MyPromise.resolve(2),
  MyPromise.resolve(3)
]).then(values => {
  console.log('All resolved:', values); // [1, 2, 3]
});
*/
