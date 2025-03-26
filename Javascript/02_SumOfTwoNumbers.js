class SumOfTwoNumbers {
    static sum(a, b) {
        return a + b;
    }
}
SumOfTwoNumbers.sum(1, 2); //3 
console.log(`Sum of 1 + 2 = ${SumOfTwoNumbers.sum(1, 2)}`); // 3

/*# Static Functions in JavaScript Classes

A static function (also called a static method) is a method that belongs to the class itself rather than to instances of the class. Let's examine how static methods work using your `SumOfTwoNumbers` example:

```javascript
class SumOfTwoNumbers {
    static sum(a, b) {
        return a + b;
    }
}
```

## Key Characteristics of Static Methods

1. **Called on the Class, Not Instances**: Static methods are called directly on the class itself, not on instances of the class:
   ```javascript
   // Correct usage
   SumOfTwoNumbers.sum(1, 2);
   
   // Incorrect usage
   const calculator = new SumOfTwoNumbers();
   calculator.sum(1, 2); // This would cause an error
   ```

2. **Cannot Access Instance Properties/Methods**: Static methods cannot access instance properties or methods using `this` because they are not called on an instance:
   ```javascript
   class Example {
     constructor() {
       this.value = 10;
     }
     
     static doSomething() {
       // Cannot access this.value here
       // "this" refers to the class, not an instance
       return "Static method";
     }
   }
   ```

3. **Can Access Other Static Methods/Properties**: Static methods can access other static methods and properties of the same class:
   ```javascript
   class Calculator {
     static PI = 3.14159;
     
     static calculateArea(radius) {
       return Calculator.PI * radius * radius;
     }
   }
   ```

## Use Cases for Static Methods

Static methods are ideal for:

1. **Utility Functions**: Operations that don't require instance state
2. **Factory Methods**: Methods that create and return instances of the class
3. **Helper Functions**: Functionality related to the class but not to a specific instance
4. **Pure Functions**: Functions where the output depends only on the input parameters

## Your Example Explained

In your code:
```javascript
class SumOfTwoNumbers {
    static sum(a, b) {
        return a + b;
    }
}
SumOfTwoNumbers.sum(1, 2); // Returns 3 
console.log(`Sum of 1 + 2 = ${SumOfTwoNumbers.sum(1, 2)}`); // Outputs: Sum of 1 + 2 = 3
```

1. The `sum` method is defined as `static`, meaning it belongs to the `SumOfTwoNumbers` class itself
2. You call it directly on the class with `SumOfTwoNumbers.sum(1, 2)`
3. No instance of the class needs to be created

This approach makes sense for a simple arithmetic operation like addition, as it doesn't require any instance-specific state or behavior. It's essentially a stateless utility function organized within a class.

Key Characteristics of Static Methods
Called on the Class, Not Instances: Static methods are called directly on the class itself, not on instances of the class:
// Correct usage
SumOfTwoNumbers.sum(1, 2);

// Incorrect usage
const calculator = new SumOfTwoNumbers();
calculator.sum(1, 2); // This would cause an error
// class Example {
  constructor() {
    this.value = 10;
  }
  
  static doSomething() {
    // Cannot access this.value here
    // "this" refers to the class, not an instance
    return "Static method";
  }
}
  Can Access Other Static Methods/Properties: Static methods can access other static methods and properties of the same class:

class Calculator {
  static PI = 3.14159;
  
  static calculateArea(radius) {
    return Calculator.PI * radius * radius;
  }
}
  Use Cases for Static Methods
Static methods are ideal for:

Utility Functions: Operations that don't require instance state
Factory Methods: Methods that create and return instances of the class
Helper Functions: Functionality related to the class but not to a specific instance
Pure Functions: Functions where the output depends only on the input parameters
Your Example Explained
In your code:

The sum method is defined as static, meaning it belongs to the SumOfTwoNumbers class itself
You call it directly on the class with SumOfTwoNumbers.sum(1, 2)
No instance of the class needs to be created
This approach makes sense for a simple arithmetic operation like addition, as it doesn't require any instance-specific state or behavior. It's essentially a stateless utility function organized within a class.Use Cases for Static Methods
Static methods are ideal for:

Utility Functions: Operations that don't require instance state
Factory Methods: Methods that create and return instances of the class
Helper Functions: Functionality related to the class but not to a specific instance
Pure Functions: Functions where the output depends only on the input parameters
Your Example Explained
In your code:
class SumOfTwoNumbers {
    static sum(a, b) {
        return a + b;
    }
}
SumOfTwoNumbers.sum(1, 2); // Returns 3 
console.log(`Sum of 1 + 2 = ${SumOfTwoNumbers.sum(1, 2)}`); // Outputs: Sum of 1 + 2 = 3
The sum method is defined as static, meaning it belongs to the SumOfTwoNumbers class itself
You call it directly on the class with SumOfTwoNumbers.sum(1, 2)
No instance of the class needs to be created
This approach makes sense for a simple arithmetic operation like addition, as it doesn't require any instance-specific state or behavior. It's essentially a stateless utility function organized within a class.*/


