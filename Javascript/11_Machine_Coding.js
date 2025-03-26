/**
 * Enhanced Arrays - OOP implementation with negative indexing
 * @class
 */
class EnhancedArray extends Array {
    /**
     * Constructor for creating an enhanced array
     * @param {...*} items - Items to initialize the array with
     */
    constructor(...items) {
      super(...items);
      this._setupNegativeIndexing();
    }
    
    /**
     * Creates an EnhancedArray from an existing array
     * @param {Array} array - Source array
     * @returns {EnhancedArray} New EnhancedArray instance
     * @static
     */
    static from(array) {
      const enhanced = new EnhancedArray(...array);
      return enhanced;
    }
    
    /**
     * Set up negative indexing capabilities
     * @private
     */
    _setupNegativeIndexing() {
      // Store original array methods we need to preserve
      const originalPush = this.push;
      const originalPop = this.pop;
      const originalSplice = this.splice;
      const originalShift = this.shift;
      const originalUnshift = this.unshift;
      
      // Override push method to maintain negative indexing
      this.push = function(...items) {
        const result = originalPush.apply(this, items);
        return result;
      };
      
      // Override pop method to maintain negative indexing
      this.pop = function() {
        const result = originalPop.apply(this);
        return result;
      };
      
      // Other method overrides follow the same pattern...
    }
    
    /**
     * Enhanced version of at() method
     * @param {number} index - Index to access, can be negative
     * @returns {*} Element at the specified position
     */
    at(index) {
      if (index < 0) {
        return this[this.length + index];
      }
      return this[index];
    }
    
    /**
     * Get element at negative index
     * @param {number} index - Negative index
     * @returns {*} Element at the negative index
     */
    getNegative(index) {
      if (index >= 0) {
        throw new Error('getNegative() requires a negative index');
      }
      return this[this.length + index];
    }
  }
  
  /**
   * Legacy compatibility for browsers without ES6 support
   * Provides negative array indexing without modern JavaScript features
   */
  var ArrayUtils = (function() {
    /**
     * Polyfill for Array.prototype.at if not available
     */
    function polyfillAt() {
      if (!Array.prototype.at) {
        Array.prototype.at = function(index) {
          if (index < 0) {
            return this[this.length + index];
          }
          return this[index];
        };
      }
    }
    
    /**
     * Creates a wrapper object with negative indexing capabilities
     * @param {Array} array - Array to enhance
     * @returns {Object} Enhanced array wrapper
     */
    function createEnhancedArray(array) {
      var wrapper = {
        _array: array,
        
        /**
         * Get element at specified index (supports negative)
         * @param {number} index - Index, can be negative
         * @returns {*} Element at the index
         */
        get: function(index) {
          if (index < 0) {
            return this._array[this._array.length + index];
          }
          return this._array[index];
        },
        
        /**
         * Set element at specified index (supports negative)
         * @param {number} index - Index, can be negative
         * @param {*} value - Value to set
         */
        set: function(index, value) {
          if (index < 0) {
            this._array[this._array.length + index] = value;
          } else {
            this._array[index] = value;
          }
          return this;
        },
        
        /**
         * Get the original array
         * @returns {Array} Original array
         */
        getArray: function() {
          return this._array;
        },
        
        /**
         * Get the length of the array
         * @returns {number} Array length
         */
        length: function() {
          return this._array.length;
        },
        
        /**
         * Add elements to the end of the array
         * @param {...*} items - Items to add
         * @returns {number} New array length
         */
        push: function() {
          return Array.prototype.push.apply(this._array, arguments);
        },
        
        /**
         * Remove the last element and return it
         * @returns {*} Removed element
         */
        pop: function() {
          return this._array.pop();
        },
        
        /**
         * Convert the enhanced array to a string
         * @returns {string} String representation
         */
        toString: function() {
          return this._array.toString();
        }
      };
      
      return wrapper;
    }
    
    /**
     * Extends an existing array with negative indexing
     * @param {Array} array - Array to extend
     */
    function extendArrayWithNegativeIndexing(array) {
      // Save original array methods to avoid infinite recursion
      var originalGet = Array.prototype.valueOf;
      
      // Define custom properties for negative indices
      for (var i = 1; i <= array.length; i++) {
        (function(index) {
          Object.defineProperty(array, -index, {
            get: function() {
              return this[this.length - index];
            },
            set: function(value) {
              this[this.length - index] = value;
            },
            configurable: true,
            enumerable: false
          });
        })(i);
      }
      
      // Add method to update negative indices when array changes
      array._updateNegativeIndices = function() {
        for (var i = 1; i <= this.length; i++) {
          (function(index) {
            Object.defineProperty(array, -index, {
              get: function() {
                return this[this.length - index];
              },
              set: function(value) {
                this[this.length - index] = value;
              },
              configurable: true,
              enumerable: false
            });
          })(i);
        }
      };
      
      // Override push to update negative indices
      var originalPush = array.push;
      array.push = function() {
        var result = originalPush.apply(this, arguments);
        this._updateNegativeIndices();
        return result;
      };
      
      // Override pop to update negative indices
      var originalPop = array.pop;
      array.pop = function() {
        var result = originalPop.apply(this);
        this._updateNegativeIndices();
        return result;
      };
      
      return array;
    }
    
    // Public API
    return {
      polyfillAt: polyfillAt,
      createEnhancedArray: createEnhancedArray,
      extendArrayWithNegativeIndexing: extendArrayWithNegativeIndexing
    };
  })();
  
  // Demo and usage examples
  (function() {
    console.log('==== OOP Implementation ====');
    
    // Create an enhanced array using OOP approach
    const enhancedFruits = new EnhancedArray('apple', 'orange', 'banana', 'grapes', 'mango');
    console.log('Last fruit:', enhancedFruits.at(-1)); // mango
    console.log('Second to last:', enhancedFruits.at(-2)); // grapes
    console.log('Using getNegative():', enhancedFruits.getNegative(-3)); // banana
    
    // Convert existing array to enhanced array
    const regularArray = ['red', 'green', 'blue'];
    const enhancedColors = EnhancedArray.from(regularArray);
    console.log('Last color:', enhancedColors.at(-1)); // blue
    
    console.log('\n==== Legacy Implementation ====');
    
    // Apply polyfill for older browsers
    ArrayUtils.polyfillAt();
    
    // Create a wrapped array with the legacy approach
    const fruits = ['apple', 'orange', 'banana', 'grapes', 'mango'];
    const wrappedFruits = ArrayUtils.createEnhancedArray(fruits);
    
    console.log('Last fruit with wrapper:', wrappedFruits.get(-1)); // mango
    console.log('Change last fruit:');
    wrappedFruits.set(-1, 'pineapple');
    console.log('Updated last fruit:', wrappedFruits.get(-1)); // pineapple
    console.log('Original array also updated:', fruits[4]); // pineapple
    
    console.log('\n==== Direct Extension Implementation ====');
    
    // Directly extend an array with negative indexing
    const colors = ['red', 'green', 'blue'];
    ArrayUtils.extendArrayWithNegativeIndexing(colors);
    
    console.log('Direct negative index access:');
    console.log('colors[-1]:', colors[-1]); // blue
    console.log('colors[-2]:', colors[-2]); // green
    
    console.log('Modify with negative index:');
    colors[-1] = 'purple';
    console.log('Updated array:', colors); // ['red', 'green', 'purple']
    
    console.log('Test array modifications:');
    colors.push('yellow');
    console.log('After push - colors[-1]:', colors[-1]); // yellow
    colors.pop();
    console.log('After pop - colors[-1]:', colors[-1]); // purple
    
    console.log('\n==== Proxy Implementation (Modern) ====');
    
    // Using Proxy for comparison (modern approach)
    function createArrayWithNegativeIndices(array) {
      return new Proxy(array, {
        get(target, prop) {
          if (typeof prop === 'string' && !isNaN(prop)) {
            const index = parseInt(prop);
            if (index < 0) {
              return target[target.length + index];
            }
          }
          return target[prop];
        }
      });
    }
    
    const numbers = [1, 2, 3, 4, 5];
    const proxiedNumbers = createArrayWithNegativeIndices(numbers);
    console.log('proxiedNumbers[-1]:', proxiedNumbers[-1]); // 5
    console.log('proxiedNumbers[-3]:', proxiedNumbers[-3]); // 3
  })();