// // Comprehensive Summary


// // ## 1. How JavaScript Works & Execution Context

// // - JavaScript is a **single-threaded, synchronous language** in its core nature.
// // - The JavaScript engine creates an **Execution Context** containing:
// //   - Memory Component (Variable Environment) - stores variables and functions as key-value pairs
// //   - Code Component (Thread of Execution) - executes code line by line

// // ## 2. How JavaScript Code is Executed

// // - JavaScript execution happens in two phases:
// //   - **Creation Phase**: Memory allocation for variables (undefined) and functions (entire code)
// //   - **Execution Phase**: Actual code execution and variable assignment
// // - Each function creates its own execution context when invoked

// // ## 3. Hoisting in JavaScript

// // - **Hoisting** allows variables and functions to be accessed before declaration
// // - Function declarations are fully hoisted (can be called before defined)
// // - Variable declarations with `var` are hoisted but initialized as `undefined`
// // - `let` and `const` are hoisted but remain in the "Temporal Dead Zone" until declaration

// // ## 4. Functions and Variable Environments

// // - Each function call creates a new execution context with its own variable environment
// // - Function execution contexts are stacked in the **Call Stack**
// // - When a function completes, its context is popped off the stack

// // ## 5. Shortest JS Program & Window Object

// // - The empty JS file is the shortest program
// // - **Window object** is created by the browser as the global object
// // - `this` in the global context refers to the window object
// // - Variables and functions declared globally become properties of the window object

// // ## 6. Undefined vs Not Defined

// // - `undefined` is a placeholder value for variables declared but not assigned
// // - `not defined` means the variable doesn't exist in memory
// // - JavaScript never allocates `null` by default (it must be explicitly assigned)

// // ## 7. The Scope Chain & Lexical Environment

// // - **Lexical Environment** = Local Memory + Lexical Environment of Parent
// // - **Scope Chain**: The mechanism of searching for variables in nested lexical environments
// // - Functions can access variables defined in their parent scopes
// // - The chain continues up to the global scope

// // ## 8. Let & Const in JS, Temporal Dead Zone

// // - `let` and `const` are block-scoped (only accessible within their block `{}`)
// // - Variables declared with `let` and `const` are hoisted but not initialized
// // - **Temporal Dead Zone**: Time between hoisting and variable declaration
// // - `const` must be initialized at declaration and cannot be reassigned

// // ## 9. Block Scope & Shadowing

// // - A **Block** is defined by curly braces `{}`
// // - Variables declared with `let` and `const` are block-scoped
// // - **Shadowing**: When a variable in an inner scope has the same name as in outer scope
// // - `var` ignores blocks and is function-scoped

// // ## 10. Closures in JavaScript

// // - **Closure**: A function bundled with its lexical environment
// // - Inner functions have access to variables of outer functions even after the outer function has finished execution
// // - Closures enable data privacy, function factories, and maintaining state
// // - Common use cases: Module pattern, currying, memoization

// // ## 11. First Class Functions & Anonymous Functions

// // - Functions in JS are **first-class citizens** - they can be:
// //   - Assigned to variables
// //   - Passed as arguments
// //   - Returned from other functions
// // - **Anonymous Functions**: Functions without a name (often used in callbacks)
// // - **Function Expression**: Assigning a function to a variable

// // ## 12. Callback Functions & Event Listeners

// // - **Callback Function**: A function passed as an argument to another function
// // - JavaScript uses callbacks for asynchronous operations and event handling
// // - Event listeners use callbacks to respond to user interactions
// // - Callbacks enable non-blocking behavior in JS applications

// // ## 13. Asynchronous JavaScript & Event Loop

// // - **Event Loop**: Mechanism that handles asynchronous operations in JavaScript
// // - Components of JavaScript runtime:
// //   - Call Stack: Tracks function execution
// //   - Web APIs: Browser features like DOM, AJAX, setTimeout
// //   - Callback Queue: Stores callbacks ready for execution
// //   - Microtask Queue: Higher priority queue for Promises
// // - Event Loop continuously checks if the call stack is empty and moves callbacks from queues to stack

// // ## 14. Trust Issues with setTimeout
// // 
// // - `setTimeout` doesn't guarantee exact timing - only minimum delay
// // - Factors affecting setTimeout execution:
// //   - Call stack blocking
// //   - Callback queue waiting time
// //   - Browser throttling (for inactive tabs)
// // - Demonstrates JavaScript's non-blocking nature
// // 
// // ## 15. Higher-Order Functions
// // 
// // - Functions that either:
// //   - Take other functions as arguments
// //   - Return functions
// // - Enable function composition, abstraction, and reusability
// // - Examples: map, filter, reduce

// // ## 16. Map, Filter & Reduce

// // - **Map**: Transforms each array element using a callback
// // - **Filter**: Creates a new array with elements that pass a test
// // - **Reduce**: Accumulates array values into a single result
// // - All three are immutable operations (create new arrays)

// // ## 17. Prototype & Prototypal Inheritance
// //
// // - Every object in JavaScript has a hidden `[[Prototype]]` property
// // - This property points to the object's prototype
// // - Objects inherit properties and methods from their prototype chain
// // - Prototypal inheritance is more flexible than classical inheritance

// // ## Key Takeaways from the Points

// // 1. JavaScript's execution model is foundational to understanding the language
// // 2. Scope and closures are crucial concepts for writing effective JS code
// // 3. JavaScript's asynchronous nature works through callbacks, promises, and the event loop
// // 4. Understanding prototypal inheritance helps master object-oriented programming in JS
// // 5. First-class functions enable powerful functional programming paradigms
// # Document Object Model (DOM) in JavaScript: Comprehensive Summary

// Based on the "Namaste JavaScript DOM Series" playlist by Akshay Saini, here's a detailed summary with examples of key DOM concepts:

// ## 1. Introduction to the DOM

// The Document Object Model (DOM) is a programming interface for web documents, representing the page as a tree of objects.

// ```javascript
// // Basic DOM access example
// const heading = document.getElementById('heading');
// console.log(heading); // Returns the element with id="heading"

// // The document object is the entry point to the DOM
// console.log(typeof document); // "object"
// console.log(document.constructor.name); // "HTMLDocument"
// ```

// ## 2. DOM Selectors and Their Optimization

// Various ways to select DOM elements with performance considerations:

// ```javascript
// // ID selector (fastest)
// const mainHeading = document.getElementById('main-heading');

// // Query selectors (versatile but slower)
// const firstParagraph = document.querySelector('p');
// const allParagraphs = document.querySelectorAll('p');

// // Class selectors
// const highlights = document.getElementsByClassName('highlight');

// // Tag selectors
// const allDivs = document.getElementsByTagName('div');

// // Combining selectors for precision
// const nestedButton = document.querySelector('.container .btn-primary');
// ```

// ## 3. DOM Traversal Techniques

// Navigating through the DOM tree:

// ```javascript
// // Parent traversal
// const child = document.querySelector('.child');
// const parent = child.parentElement;
// const grandparent = parent.parentElement;

// // Child traversal
// const children = parent.children; // HTMLCollection
// const firstChild = parent.firstElementChild;
// const lastChild = parent.lastElementChild;

// // Sibling traversal
// const nextSibling = child.nextElementSibling;
// const previousSibling = child.previousElementSibling;

// // Advanced traversal with NodeList
// const allChildNodes = parent.childNodes; // Includes text nodes, comments, etc.
// ```

// ## 4. Creating, Modifying and Removing DOM Elements

// Dynamic DOM manipulation:

// ```javascript
// // Creating new elements
// const newDiv = document.createElement('div');
// newDiv.textContent = 'I was created with JavaScript!';
// newDiv.classList.add('dynamic');

// // Adding to DOM
// document.body.appendChild(newDiv);

// // Inserting at specific position
// const referenceElement = document.querySelector('.reference');
// document.body.insertBefore(newDiv, referenceElement);

// // Modern insertion methods
// referenceElement.before(newDiv); // Insert before
// referenceElement.after(newDiv);  // Insert after
// referenceElement.prepend(newDiv); // Insert as first child
// referenceElement.append(newDiv);  // Insert as last child

// // Modifying elements
// const paragraph = document.querySelector('p');
// paragraph.textContent = 'Updated content';
// paragraph.innerHTML = 'Content with <strong>HTML</strong>';
// paragraph.setAttribute('data-custom', 'value');

// // Removing elements
// paragraph.remove(); // Modern way
// // OR
// paragraph.parentElement.removeChild(paragraph); // Traditional way
// ```

// ## 5. DOM Element Attributes vs Properties

// Understanding the difference between HTML attributes and DOM properties:

// ```javascript
// // HTML attribute vs DOM property
// const input = document.querySelector('input');

// // Attribute (initial HTML value)
// console.log(input.getAttribute('value')); // Gets initial value attribute

// // Property (current value)
// console.log(input.value); // Gets current value property

// // Setting attributes vs properties
// input.setAttribute('value', 'attribute value'); // Updates HTML attribute
// input.value = 'property value'; // Updates property (what user sees)

// // Custom attributes
// input.setAttribute('data-custom', 'custom value');
// console.log(input.dataset.custom); // Accessing data-* attributes
// ```

// ## 6. Working with CSS through JavaScript

// Manipulating styles dynamically:

// ```javascript
// const element = document.querySelector('.styled-element');

// // Direct style manipulation
// element.style.color = 'blue';
// element.style.backgroundColor = 'yellow';
// element.style.padding = '10px';

// // Multiple styles at once
// Object.assign(element.style, {
//   fontSize: '18px',
//   borderRadius: '5px',
//   boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
// });

// // Classes manipulation
// element.classList.add('highlight');
// element.classList.remove('old-class');
// element.classList.toggle('active');
// element.classList.replace('old-class', 'new-class');
// element.classList.contains('highlight'); // true

// // Getting computed styles
// const computedStyle = window.getComputedStyle(element);
// console.log(computedStyle.fontSize); // Returns computed font size
// ```

// ## 7. Event Handling Deep Dive

// Complex event handling concepts:

// ```javascript
// // Basic event handling
// const button = document.querySelector('button');
// button.addEventListener('click', function() {
//   console.log('Button clicked!');
// });

// // Event object properties
// button.addEventListener('click', function(event) {
//   console.log('Event type:', event.type);
//   console.log('Target element:', event.target);
//   console.log('Current target:', event.currentTarget);
//   console.log('Mouse position:', event.clientX, event.clientY);
// });

// // Preventing default behavior
// const link = document.querySelector('a');
// link.addEventListener('click', function(event) {
//   event.preventDefault();
//   console.log('Link click prevented');
// });

// // Event delegation (handling many elements efficiently)
// document.querySelector('ul').addEventListener('click', function(event) {
//   if (event.target.tagName === 'LI') {
//     console.log('List item clicked:', event.target.textContent);
//   }
// });

// // Event propagation phases
// const outer = document.querySelector('.outer');
// const inner = document.querySelector('.inner');

// // Capturing phase (down the DOM tree)
// outer.addEventListener('click', e => console.log('Outer capturing'), true);
// inner.addEventListener('click', e => console.log('Inner capturing'), true);

// // Bubbling phase (up the DOM tree)
// outer.addEventListener('click', e => console.log('Outer bubbling'));
// inner.addEventListener('click', e => console.log('Inner bubbling'));

// // Stopping propagation
// inner.addEventListener('click', function(event) {
//   event.stopPropagation();
//   console.log('Inner click - propagation stopped');
// });
// ```

// ## 8. Event Bubbling, Capturing and Delegation

// Detailed explanation of event flow:

// ```javascript
// // DOM hierarchy for demonstration
// // <div class="container">
// //   <div class="level-1">
// //     <div class="level-2">
// //       <button>Click Me</button>
// //     </div>
// //   </div>
// // </div>

// const container = document.querySelector('.container');
// const level1 = document.querySelector('.level-1');
// const level2 = document.querySelector('.level-2');
// const button = document.querySelector('button');

// // Event bubbling (default)
// container.addEventListener('click', () => console.log('Container bubbling'));
// level1.addEventListener('click', () => console.log('Level 1 bubbling'));
// level2.addEventListener('click', () => console.log('Level 2 bubbling'));
// button.addEventListener('click', () => console.log('Button bubbling'));

// // Event capturing (set third parameter to true)
// container.addEventListener('click', () => console.log('Container capturing'), true);
// level1.addEventListener('click', () => console.log('Level 1 capturing'), true);
// level2.addEventListener('click', () => console.log('Level 2 capturing'), true);
// button.addEventListener('click', () => console.log('Button capturing'), true);

// // Event delegation example
// // Instead of adding event listeners to each button:
// document.querySelector('.buttons-container').addEventListener('click', function(event) {
//   if (event.target.classList.contains('btn')) {
//     const buttonId = event.target.dataset.id;
//     console.log(`Button ${buttonId} clicked through delegation`);
//   }
// });
// ```

// ## 9. DOM Performance and Optimization

// Techniques for efficient DOM operations:

// ```javascript
// // BAD: Multiple direct manipulations (causes layout thrashing)
// function badPerformance() {
//   const element = document.getElementById('target');
//   element.style.width = '100px';
//   console.log(element.offsetHeight); // Forces reflow
//   element.style.height = '100px';
//   console.log(element.offsetWidth); // Forces reflow again
//   element.style.margin = '10px';
//   // Many separate DOM operations
// }

// // GOOD: Batch DOM operations
// function goodPerformance() {
//   // Read operations
//   const element = document.getElementById('target');
//   const height = element.offsetHeight;
//   const width = element.offsetWidth;
  
//   // Write operations (batched)
//   element.style.cssText = 'width: 100px; height: 100px; margin: 10px;';
// }

// // Using document fragments for multiple insertions
// function addManyItems() {
//   const fragment = document.createDocumentFragment();
//   const list = document.getElementById('list');
  
//   for (let i = 0; i < 1000; i++) {
//     const item = document.createElement('li');
//     item.textContent = `Item ${i}`;
//     fragment.appendChild(item);
//   }
  
//   // Only one reflow/repaint with all 1000 items
//   list.appendChild(fragment);
// }

// // Reducing reflows with class changes
// function animateEfficiently() {
//   const element = document.getElementById('animated');
  
//   // Add class with all styles instead of setting styles individually
//   element.classList.add('animated-state');
// }
// ```

// ## 10. Virtual DOM Concept

// Understanding how modern frameworks optimize DOM operations:

// ```javascript
// // Simplified Virtual DOM implementation concept
// class VirtualDOMElement {
//   constructor(type, props, children) {
//     this.type = type;
//     this.props = props;
//     this.children = children;
//   }
// }

// // Creating virtual DOM elements
// function createElement(type, props, ...children) {
//   return new VirtualDOMElement(type, props, children);
// }

// // Example of virtual DOM tree
// const virtualTree = createElement('div', { className: 'container' },
//   createElement('h1', { className: 'title' }, 'Hello Virtual DOM'),
//   createElement('p', { className: 'text' }, 'This is much faster than real DOM operations')
// );

// // Diff algorithm concept (simplified)
// function diff(oldTree, newTree) {
//   // Return a list of operations to transform oldTree into newTree
//   const patches = [];
//   // Diff logic here...
//   return patches;
// }

// // Patch function concept to apply changes
// function patch(realDOM, patches) {
//   // Apply minimal changes to real DOM
//   patches.forEach(operation => {
//     // Apply operation
//   });
// }

// // This is how React, Vue, etc. minimize actual DOM manipulations
// ```

// ## 11. Browser Rendering Pipeline

// Understanding how the browser processes DOM changes:

// ```javascript
// // The rendering pipeline process:
// // 1. JavaScript → 2. Style calculations → 3. Layout → 4. Paint → 5. Composite

// // Layout-triggering properties (expensive)
// element.style.width = '200px';       // Triggers layout
// element.style.height = '100px';      // Triggers layout
// element.style.fontSize = '20px';     // Triggers layout

// // Paint-only properties (better performance)
// element.style.color = 'blue';        // Only triggers paint
// element.style.backgroundColor = 'red'; // Only triggers paint

// // Composite-only properties (best performance)
// element.style.transform = 'translateX(10px)'; // Only composite
// element.style.opacity = '0.5';       // Only composite

// // Performance measurements
// console.time('DOM operation');
// // Perform DOM operations here
// console.timeEnd('DOM operation');

// // Using requestAnimationFrame for visual updates
// function animateSmooth() {
//   const element = document.getElementById('animated');
//   let position = 0;
  
//   function step() {
//     position += 5;
//     element.style.transform = `translateX(${position}px)`;
    
//     if (position < 300) {
//       requestAnimationFrame(step);
//     }
//   }
  
//   requestAnimationFrame(step);
// }
// ```

// ## 12. DOM Content Loading and ReadyState

// Understanding when the DOM is ready for manipulation:

// ```javascript
// // Different ways to wait for DOM ready

// // 1. DOMContentLoaded event
// document.addEventListener('DOMContentLoaded', function() {
//   console.log('DOM fully loaded and parsed');
//   // Safe to manipulate DOM now
// });

// // 2. load event (waits for all resources)
// window.addEventListener('load', function() {
//   console.log('Page fully loaded');
//   // All resources (images, stylesheets) are loaded
// });

// // 3. readyState check
// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', initApp);
// } else {
//   // DOM already ready
//   initApp();
// }

// function initApp() {
//   console.log('Initializing application');
//   // DOM manipulation code here
// }

// // 4. Modern async/defer script attributes
// // <script async src="script.js"></script>
// // <script defer src="script.js"></script>
// ```

// ## 13. IntersectionObserver and Lazy Loading

// Modern ways to detect element visibility and optimize page load:

// ```javascript
// // Lazy loading images
// const imageObserver = new IntersectionObserver((entries, observer) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       const img = entry.target;
//       // Replace placeholder with actual image
//       img.src = img.dataset.src;
//       // Stop observing once loaded
//       observer.unobserve(img);
//     }
//   });
// }, {
//   rootMargin: '0px 0px 200px 0px' // Start loading 200px before visible
// });

// // Observe all lazy images
// document.querySelectorAll('img[data-src]').forEach(img => {
//   imageObserver.observe(img);
// });

// // Implementing infinite scroll
// const loadMoreObserver = new IntersectionObserver((entries) => {
//   if (entries[0].isIntersecting) {
//     loadMoreContent();
//   }
// }, {
//   root: null,
//   threshold: 0.1
// });

// // Observe the sentinel element at the bottom
// loadMoreObserver.observe(document.querySelector('#sentinel'));

// function loadMoreContent() {
//   // Fetch and append new content
//   fetch('/api/more-content')
//     .then(response => response.json())
//     .then(data => {
//       // Append new items to the container
//       const container = document.querySelector('.content-container');
//       data.items.forEach(item => {
//         const element = document.createElement('div');
//         element.textContent = item.text;
//         container.appendChild(element);
//       });
//     });
// }
// ```

// ## 14. Shadow DOM and Web Components

// Encapsulating DOM and CSS with modern web standards:

// ```javascript
// // Creating a custom web component
// class UserCard extends HTMLElement {
//   constructor() {
//     super();
    
//     // Create a shadow root
//     const shadow = this.attachShadow({mode: 'open'});
    
//     // Create elements
//     const wrapper = document.createElement('div');
//     wrapper.setAttribute('class', 'user-card');
    
//     const avatar = document.createElement('img');
//     avatar.src = this.getAttribute('avatar') || 'default.png';
//     avatar.alt = 'User Avatar';
    
//     const info = document.createElement('div');
//     info.setAttribute('class', 'info');
    
//     const name = document.createElement('h3');
//     name.textContent = this.getAttribute('name');
    
//     const email = document.createElement('p');
//     email.textContent = this.getAttribute('email');
    
//     // Encapsulated CSS
//     const style = document.createElement('style');
//     style.textContent = `
//       .user-card {
//         display: flex;
//         align-items: center;
//         background-color: #f4f4f4;
//         border-radius: 4px;
//         padding: 15px;
//         width: 300px;
//         box-shadow: 0 2px 5px rgba(0,0,0,0.1);
//       }
//       .user-card img {
//         width: 60px;
//         height: 60px;
//         border-radius: 50%;
//         margin-right: 15px;
//       }
//       .info h3 {
//         margin: 0 0 5px;
//         color: #333;
//       }
//       .info p {
//         margin: 0;
//         color: #666;
//       }
//     `;
    
//     // Assemble the component
//     info.appendChild(name);
//     info.appendChild(email);
//     wrapper.appendChild(avatar);
//     wrapper.appendChild(info);
    
//     // Attach to shadow DOM
//     shadow.appendChild(style);
//     shadow.appendChild(wrapper);
//   }
// }

// // Register the component
// customElements.define('user-card', UserCard);

// // Usage in HTML:
// // <user-card name="John Doe" email="john@example.com" avatar="avatar.jpg"></user-card>
// ```

// ## 15. DOM Manipulation Projects

// Practical implementation examples:

// ```javascript
// // Example: Interactive To-Do List
// document.addEventListener('DOMContentLoaded', function() {
//   const form = document.querySelector('#task-form');
//   const taskInput = document.querySelector('#task-input');
//   const taskList = document.querySelector('#task-list');
  
//   // Load tasks from localStorage
//   loadTasks();
  
//   // Add task event
//   form.addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     if (taskInput.value.trim() === '') {
//       showError('Please add a task');
//       return;
//     }
    
//     // Create task item
//     addTaskToDOM(taskInput.value);
    
//     // Save to localStorage
//     saveTask(taskInput.value);
    
//     // Clear input
//     taskInput.value = '';
//   });
  
//   // Task list event delegation (delete and toggle completion)
//   taskList.addEventListener('click', function(e) {
//     if (e.target.classList.contains('delete-btn')) {
//       const taskItem = e.target.parentElement;
//       removeTask(taskItem);
//     } else if (e.target.tagName === 'LI') {
//       e.target.classList.toggle('completed');
//       updateTaskStatus(e.target);
//     }
//   });
  
//   function addTaskToDOM(taskText) {
//     const li = document.createElement('li');
//     li.textContent = taskText;
    
//     const deleteBtn = document.createElement('button');
//     deleteBtn.className = 'delete-btn';
//     deleteBtn.innerHTML = '&times;';
    
//     li.appendChild(deleteBtn);
//     taskList.appendChild(li);
    
//     // Animation for new task
//     li.style.opacity = '0';
//     li.style.transform = 'translateY(-20px)';
    
//     setTimeout(() => {
//       li.style.transition = 'all 0.3s ease';
//       li.style.opacity = '1';
//       li.style.transform = 'translateY(0)';
//     }, 10);
//   }
  
//   function showError(message) {
//     const errorDiv = document.createElement('div');
//     errorDiv.className = 'error';
//     errorDiv.textContent = message;
    
//     form.insertBefore(errorDiv, taskInput);
    
//     setTimeout(() => {
//       errorDiv.remove();
//     }, 3000);
//   }
  
//   function saveTask(taskText) {
//     let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//     tasks.push({
//       text: taskText,
//       completed: false
//     });
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }
  
//   function loadTasks() {
//     let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
//     tasks.forEach(task => {
//       const li = document.createElement('li');
//       li.textContent = task.text;
      
//       if (task.completed) {
//         li.classList.add('completed');
//       }
      
//       const deleteBtn = document.createElement('button');
//       deleteBtn.className = 'delete-btn';
//       deleteBtn.innerHTML = '&times;';
      
//       li.appendChild(deleteBtn);
//       taskList.appendChild(li);
//     });
//   }
  
//   function removeTask(taskElement) {
//     // Animation for removal
//     taskElement.style.opacity = '0';
//     taskElement.style.transform = 'translateX(20px)';
    
//     setTimeout(() => {
//       taskElement.remove();
      
//       // Update localStorage
//       const taskText = taskElement.textContent.slice(0, -1); // Remove the × character
//       let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//       tasks = tasks.filter(task => task.text !== taskText);
//       localStorage.setItem('tasks', JSON.stringify(tasks));
//     }, 300);
//   }
  
//   function updateTaskStatus(taskElement) {
//     const taskText = taskElement.textContent.slice(0, -1);
//     let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
//     tasks = tasks.map(task => {
//       if (task.text === taskText) {
//         task.completed = !task.completed;
//       }
//       return task;
//     });
    
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }
// });
// ```

// // ## Key Takeaways from the DOM Series

// // 1. The DOM provides a structured representation of HTML documents that JavaScript can interact with
// // 2. Efficient selectors and traversal methods are crucial for performance
// // 3. DOM manipulation should be batched to avoid excessive reflows and repaints
// // 4. Event delegation is powerful for handling many similar elements efficiently
// // 5. Modern APIs like IntersectionObserver and the Shadow DOM offer powerful new capabilities
// // 6. Understanding the browser rendering pipeline helps write performant code
// //  7. Practical DOM manipulation is core to building interactive web applications

