// In programming, when you create a copy of an object, you can either create a shallow copy or a deep copy. The main difference between the two is how they handle nested objects or references.

// **Shallow Copy**

// A shallow copy of an object creates a new object which stores the references of the original elements. It means if you modify a sub-object of the original object, the same modification will be reflected in the copied object.

// In the case of a nested object, a shallow copy will only copy the references to the nested objects, not the nested objects themselves. This means that both the original and copied objects will point to the same nested objects.

// Example:
// ```python
// import copy

// original_object = {
//     "name": "John",
//     "age": 30,
//     "address": {
//         "street": "123 Main St",
//         "city": "New York"
//     }
// }

// shallow_copy = copy.copy(original_object)

// print(shallow_copy)  # {'name': 'John', 'age': 30, 'address': {'street': '123 Main St', 'city': 'New York'}}

// # Modify the nested object in the original object
// original_object["address"]["street"] = "456 Park Ave"

// print(original_object)  # {'name': 'John', 'age': 30, 'address': {'street': '456 Park Ave', 'city': 'New York'}}
// print(shallow_copy)  # {'name': 'John', 'age': 30, 'address': {'street': '456 Park Ave', 'city': 'New York'}}

// # As you can see, the modification to the nested object is reflected in both the original and copied objects
// ```
// **Deep Copy**

// A deep copy of an object creates a new object and then, recursively, inserts copies into it of the objects found in the original. It means if you modify a sub-object of the original object, the same modification will not be reflected in the copied object.

// In the case of a nested object, a deep copy will recursively create new copies of the nested objects, so that the copied object has its own independent copy of the nested objects.

// Example:
// ```python
// import copy

// original_object = {
//     "name": "John",
//     "age": 30,
//     "address": {
//         "street": "123 Main St",
//         "city": "New York"
//     }
// }

// deep_copy = copy.deepcopy(original_object)

// print(deep_copy)  # {'name': 'John', 'age': 30, 'address': {'street': '123 Main St', 'city': 'New York'}}

// # Modify the nested object in the original object
// original_object["address"]["street"] = "456 Park Ave"

// print(original_object)  # {'name': 'John', 'age': 30, 'address': {'street': '456 Park Ave', 'city': 'New York'}}
// print(deep_copy)  # {'name': 'John', 'age': 30, 'address': {'street': '123 Main St', 'city': 'New York'}}

// # As you can see, the modification to the nested object is not reflected in the copied object
// ```
// **First level of object**

// When we talk about the first level of an object, we're referring to the top-level properties or keys of the object, as opposed to nested objects or properties.

// In the case of a shallow copy, the first level of the object is copied, but the references to the nested objects are not. This means that if you modify a property at the first level of the original object, the copied object will not be affected.

// Example:
// ```python
// import copy

// original_object = {
//     "name": "John",
//     "age": 30,
//     "address": {
//         "street": "123 Main St",
//         "city": "New York"
//     }
// }

// shallow_copy = copy.copy(original_object)

// # Modify a property at the first level of the original object
// original_object["name"] = "Jane"

// print(original_object)  # {'name': 'Jane', 'age': 30, 'address': {'street': '123 Main St', 'city': 'New York'}}
// print(shallow_copy)  # {'name': 'John', 'age': 30, 'address': {'street': '123 Main St', 'city': 'New York'}}

// # As you can see, the modification to the property at the first level is not reflected in the copied object
// ```
// In summary:

// * Shallow copy: copies the references to the original elements, including nested objects.
// * Deep copy: recursively creates new copies of the original elements, including nested objects.
// * First level of object: refers to the top-level properties or keys of the object, as opposed to nested objects or properties.

original_object = {
    "name": "John",
    "age": 30,
    "address": {
        "street": "123 Main St",
        "city": "New York"
    }
}

 shallow_copy = { ...original_object }

console.log(shallow_copy);
  // {'name': 'John', 'age': 30, 'address': {'street': '123 Main St', 'city': 'New York'}}

// # Modify the nested object in the original object
original_object["address"]["street"] = "456 Park Ave"

console.log(original_object)  // {'name': 'John', 'age': 30, 'address': {'street': '456 Park Ave', 'city': 'New York'}}
console.log(shallow_copy)  // {'name': 'John', 'age': 30, 'address': {'street': '456 Park Ave', 'city': 'New York'}};
// # As you can see, the modification to the nested object is reflected in both the original and copied objects

// **Deep Copy**
deep_copy = JSON.parse(JSON.stringify(original_object));
original_object["address"]["street"] = "374 Park Ave";
deep_copy["address"]["city"] = "Los Angeles";
console.log(original_object); // {'name': 'John', 'age': 30, 'address': {'street': '374 Park Ave', 'city': 'New York'}}
console.log(deep_copy); // {'name': 'John', 'age': 30, 'address': {'street': '456 Park Ave', 'city': 'Los Angeles'}}

