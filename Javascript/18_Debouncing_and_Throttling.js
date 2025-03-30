// Debouncing Implementation
function debounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
      const context = this;
      
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }
  
  // Throttling Implementation
  function throttle(func, limit) {
    let inThrottle = false;
    
    return function(...args) {
      const context = this;
      
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  }
  
  // Example usage
  const expensiveCalculation = () => {
    console.log('Performing expensive calculation:', new Date().toLocaleTimeString());
  };
  
  // Create debounced and throttled versions
  const debouncedCalculation = debounce(expensiveCalculation, 1000);
  const throttledCalculation = throttle(expensiveCalculation, 1000);
  
  // Test debouncing - only the last call within delay period executes
  console.log('--- Testing debounce ---');
  debouncedCalculation(); // ignored
  debouncedCalculation(); // ignored
  debouncedCalculation(); // executes after 1000ms
  
  // Test throttling - executes immediately, then max once per delay period
  console.log('--- Testing throttle ---');
  throttledCalculation(); // executes immediately
  throttledCalculation(); // ignored
  throttledCalculation(); // ignored
  
  // Simulating rapid events
  console.log('--- Simulating rapid events ---');
  const simulateRapidEvents = (fn, count) => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => fn(), i * 100);
    }
  };
  
  setTimeout(() => {
    console.log('Rapid events with debounce:');
    simulateRapidEvents(debouncedCalculation, 10);
  }, 3000);
  
  setTimeout(() => {
    console.log('Rapid events with throttle:');
    simulateRapidEvents(throttledCalculation, 10);
  }, 6000);