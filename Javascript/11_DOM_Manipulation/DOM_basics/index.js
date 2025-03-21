'use strict';

const darkButton = document.getElementById('darkButton');

function toggleDarkMode() {
  // Check current state
  const isDarkMode = document.body.style.backgroundColor === 'black';
  
  if (isDarkMode) {
    // Switch to light mode
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
    darkButton.innerText = 'Dark Mode';
  } else {
    // Switch to dark mode
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
    darkButton.innerText = 'Light Mode';
  }
}

darkButton.addEventListener('click', function() {
  console.log('Button clicked');
  toggleDarkMode();
});

//Refactor -> renaming
//Rendering -> # Rendering in React JS


// Rendering in React JS is the process of converting React components into actual DOM elements that can be displayed in the browser. It's one of the core concepts that makes React powerful and efficient.

// ## Key Aspects of Rendering in React

// 1. **Component-Based Rendering**: React builds UIs from reusable components that manage their own state and rendering logic.

// 2. **Virtual DOM**: React maintains a lightweight copy of the real DOM called the Virtual DOM.
//    ```javascript
//    // React components describe what should be rendered
//    function Greeting({name}) {
//      return <h1>Hello, {name}!</h1>;
//    }
//    ```

// 3. **Declarative Approach**: You describe the desired UI state, and React handles updating the DOM.
//    ```javascript
//    // You declare what you want, not how to change the DOM
//    function DarkModeToggle({isDark}) {
//      return (
//        <div className={isDark ? 'dark-theme' : 'light-theme'}>
//          <h1>{isDark ? 'Dark Mode' : 'Light Mode'}</h1>
//        </div>
//      );
//    }
//    ```

// 4. **Reconciliation**: React's algorithm that determines what parts of the UI need to change when state updates.

// 5. **Diffing**: The process of comparing the previous render with the new one to determine what DOM changes are necessary.

// ## Rendering Workflow

// 1. **Initial Render**:
//    ```javascript
//    // Creating the root and rendering a component
//    const root = ReactDOM.createRoot(document.getElementById('root'));
//    root.render(<App />);
//    ```

// 2. **Re-rendering** (when state or props change):
//    ```javascript
//    // When setState is called, React schedules a re-render
//    function Counter() {
//      const [count, setCount] = useState(0);
     
//      return (
//        <div>
//          <p>Count: {count}</p>
//          <button onClick={() => setCount(count + 1)}>
//            Increment
//          </button>
//        </div>
//      );
//    }
//    ```

// 3. **Conditional Rendering**:
//    ```javascript
//    function Welcome({isLoggedIn}) {
//      return isLoggedIn 
//        ? <h1>Welcome back!</h1> 
//        : <h1>Please sign in</h1>;
//    }
//    ```

// ## Compared to Your Current Code

// Your current JavaScript code manually manipulates the DOM:

// ```javascript
// // Direct DOM manipulation in vanilla JS
// function toggleDarkMode() {
//   const isDarkMode = document.body.style.backgroundColor === 'black';
  
//   if (isDarkMode) {
//     document.body.style.backgroundColor = 'white';
//     document.body.style.color = 'black';
//     darkButton.innerText = 'Dark Mode';
//   } else {
//     document.body.style.backgroundColor = 'black';
//     document.body.style.color = 'white';
//     darkButton.innerText = 'Light Mode';
//   }
// }
// ```

// In React, the same functionality would be implemented declaratively:

// ```javascript
// // React component with state-based rendering
// function DarkModeToggle() {
//   const [isDarkMode, setIsDarkMode] = useState(false);
  
//   return (
//     <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
//       <button 
//         onClick={() => setIsDarkMode(!isDarkMode)}
//       >
//         {isDarkMode ? 'Light Mode' : 'Dark Mode'}
//       </button>
//       <p>Current theme: {isDarkMode ? 'Dark' : 'Light'}</p>
//     </div>
//   );
// }
// ```

// // ## Key Differences

// // 1. **Direct vs. Declarative**: Vanilla JS directly manipulates DOM elements; React declares what the UI should look like based on state.

// // 2. **Manual vs. Automatic**: In vanilla JS, you manually update each DOM element; React automatically updates the DOM based on state changes.

// // 3. **Imperative vs. Declarative**: Your code tells the browser *how* to update; React code describes *what* the UI should be.

// // 4. **Performance**: React's Virtual DOM and diffing algorithm optimize rendering performance by minimizing actual DOM operations.

// // 5. **Maintainability**: As applications grow, React's component-based approach and unidirectional data flow make code more maintainable and predictable.

// // React's rendering approach makes complex UIs more manageable by abstracting away direct DOM manipulation and providing a consistent mental model for UI updates.

// // Similar code found with 2 license types
