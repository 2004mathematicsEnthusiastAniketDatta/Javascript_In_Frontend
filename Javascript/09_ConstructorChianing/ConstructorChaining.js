/**
 * @fileoverview UI Component hierarchy demonstrating constructor chaining
 * in an enterprise application architecture.
 */

/**
 * Base Component class that all UI elements inherit from
 */
class Component {
    /**
     * @param {Object} options - Component configuration
     * @param {string} options.id - Unique identifier
     * @param {HTMLElement} options.container - Parent container
     * @param {Object} [options.styles={}] - CSS styles
     * @param {boolean} [options.visible=true] - Initial visibility
     */
    constructor(options) {
      if (!options.id) {
        throw new Error('Component requires an id');
      }
      
      this.id = options.id;
      this.container = options.container || document.body;
      this.styles = options.styles || {};
      this.visible = options.visible !== undefined ? options.visible : true;
      this.element = null;
      
      console.log(`Base Component constructor: Initializing ${this.id}`);
      
      // Create and initialize the DOM element
      this._createDOMElement();
    }
    
    /**
     * Creates the component's DOM structure
     * @protected
     */
    _createDOMElement() {
      this.element = document.createElement('div');
      this.element.id = this.id;
      this.element.className = 'component';
      
      // Apply styles
      Object.assign(this.element.style, this.styles);
      
      // Set visibility
      if (!this.visible) {
        this.hide();
      }
      
      // Add to container
      this.container.appendChild(this.element);
    }
    
    /**
     * Show the component
     */
    show() {
      this.visible = true;
      this.element.style.display = '';
      return this;
    }
    
    /**
     * Hide the component
     */
    hide() {
      this.visible = false;
      this.element.style.display = 'none';
      return this;
    }
  }
  
  /**
   * Interactive UI control that users can interact with
   * Extends base Component with interaction capabilities
   */
  class Control extends Component {
    /**
     * @param {Object} options - Component configuration
     * @param {Function} [options.onActivate] - Click handler
     * @param {boolean} [options.enabled=true] - Whether control is enabled
     */
    constructor(options) {
      // Call parent constructor first (crucial for proper inheritance)
      super(options);
      
      // Initialize Control-specific properties
      this.enabled = options.enabled !== undefined ? options.enabled : true;
      this.onActivate = options.onActivate || null;
      
      console.log(`Control constructor: Extending ${this.id} with interaction`);
      
      // Set up event listeners
      this._setupEventListeners();
    }
    
    /**
     * @override
     * @protected
     */
    _createDOMElement() {
      // Call parent method
      super._createDOMElement();
      
      // Enhance with Control-specific attributes
      this.element.className += ' control';
      this.element.setAttribute('tabindex', '0');
      
      if (!this.enabled) {
        this.disable();
      }
    }
    
    /**
     * @protected
     */
    _setupEventListeners() {
      this.element.addEventListener('click', (e) => {
        if (this.enabled && this.onActivate) {
          this.onActivate(e);
        }
      });
      
      this.element.addEventListener('keydown', (e) => {
        if (this.enabled && e.key === 'Enter' && this.onActivate) {
          this.onActivate(e);
        }
      });
    }
    
    /**
     * Enable the control
     */
    enable() {
      this.enabled = true;
      this.element.classList.remove('disabled');
      this.element.removeAttribute('aria-disabled');
      return this;
    }
    
    /**
     * Disable the control
     */
    disable() {
      this.enabled = false;
      this.element.classList.add('disabled');
      this.element.setAttribute('aria-disabled', 'true');
      return this;
    }
  }
  
  /**
   * Button control for user interactions
   */
  class Button extends Control {
    /**
     * @param {Object} options - Button configuration
     * @param {string} options.text - Button text
     * @param {string} [options.type='default'] - Button type/style
     * @param {string} [options.icon] - Optional icon class
     */
    constructor(options) {
      // Ensure options has required properties with defaults
      options.styles = options.styles || {};
      options.styles.cursor = 'pointer';
      
      // Call parent constructor
      super(options);
      
      // Button-specific properties
      this.text = options.text || 'Button';
      this.type = options.type || 'default';
      this.icon = options.icon || null;
      
      console.log(`Button constructor: Creating button "${this.text}"`);
      
      // Update the element with button-specific content
      this._updateContent();
    }
    
    /**
     * @override
     * @protected
     */
    _createDOMElement() {
      // Call parent method first
      super._createDOMElement();
      
      // Enhance for button semantics
      this.element.className += ` button button-${this.type}`;
      this.element.setAttribute('role', 'button');
    }
    
    /**
     * @protected
     */
    _updateContent() {
      // Clear existing content
      this.element.innerHTML = '';
      
      // Add icon if specified
      if (this.icon) {
        const iconElement = document.createElement('span');
        iconElement.className = `icon ${this.icon}`;
        this.element.appendChild(iconElement);
      }
      
      // Add text
      const textElement = document.createElement('span');
      textElement.className = 'button-text';
      textElement.textContent = this.text;
      this.element.appendChild(textElement);
    }
    
    /**
     * Set button text
     * @param {string} text - New button text
     */
    setText(text) {
      this.text = text;
      this._updateContent();
      return this;
    }
  }
  
  /**
   * Specialized submit button for forms
   */
  class SubmitButton extends Button {
    /**
     * @param {Object} options - Submit button configuration
     * @param {Function} [options.validateForm] - Optional form validation function
     */
    constructor(options) {
      // Set defaults appropriate for submit buttons
      options.text = options.text || 'Submit';
      options.type = options.type || 'primary';
      options.icon = options.icon || 'icon-check';
      
      // Call parent constructor
      super(options);
      
      // SubmitButton-specific properties
      this.validateForm = options.validateForm || null;
      this.isSubmitting = false;
      
      console.log(`SubmitButton constructor: Creating submit button for form actions`);
      
      // Override click handler to implement submission logic
      this._overrideActivateHandler(options.onActivate);
    }
    
    /**
     * @override
     * @protected
     */
    _createDOMElement() {
      // Call parent method
      super._createDOMElement();
      
      // Add submit-specific classes and attributes
      this.element.className += ' submit-button';
      this.element.setAttribute('type', 'submit');
    }
    
    /**
     * @protected
     */
    _overrideActivateHandler(originalHandler) {
      // Store original handler
      const userHandler = originalHandler;
      
      // Replace with our enhanced handler
      this.onActivate = async (e) => {
        e.preventDefault();
        
        // Prevent double submission
        if (this.isSubmitting) {
          return;
        }
        
        // Validate if validation function exists
        if (this.validateForm && !this.validateForm()) {
          console.log('Form validation failed');
          return;
        }
        
        // Show submitting state
        this.showSubmitting();
        
        try {
          // Call original handler if it exists
          if (userHandler) {
            // Handle both promise and non-promise handlers
            const result = userHandler(e);
            if (result instanceof Promise) {
              await result;
            }
          }
          
          // Handle successful submission
          this.showSuccess();
        } catch (error) {
          console.error('Submission error:', error);
          this.showError();
        }
      };
    }
    
    /**
     * Show submitting state
     */
    showSubmitting() {
      this.isSubmitting = true;
      this.setText('Submitting...');
      this.element.classList.add('submitting');
      return this;
    }
    
    /**
     * Show success state
     */
    showSuccess() {
      this.isSubmitting = false;
      this.setText('Success!');
      this.element.classList.remove('submitting');
      this.element.classList.add('success');
      
      // Reset after 2 seconds
      setTimeout(() => {
        this.reset();
      }, 2000);
      
      return this;
    }
    
    /**
     * Show error state
     */
    showError() {
      this.isSubmitting = false;
      this.setText('Error!');
      this.element.classList.remove('submitting');
      this.element.classList.add('error');
      
      // Reset after 2 seconds
      setTimeout(() => {
        this.reset();
      }, 2000);
      
      return this;
    }
    
    /**
     * Reset button to initial state
     */
    reset() {
      this.isSubmitting = false;
      this.setText('Submit');
      this.element.classList.remove('submitting', 'success', 'error');
      return this;
    }
  }
  
  // Usage example
  document.addEventListener('DOMContentLoaded', () => {
    // Create a container
    const container = document.createElement('div');
    container.className = 'demo-container';
    document.body.appendChild(container);
    
    // Create a submit button
    const submitBtn = new SubmitButton({
      id: 'demo-submit',
      container: container,
      text: 'Save Changes',
      validateForm: () => {
        // Mock validation
        console.log('Validating form...');
        return true;
      },
      onActivate: async () => {
        // Mock API call
        console.log('Submitting form...');
        return new Promise(resolve => {
          setTimeout(resolve, 1500);
        });
      }
    });
    
    // Log the created object to show the inheritance chain
    console.log('Final button instance:', submitBtn);
    console.log('Prototype chain verification:');
    console.log('- Is Button?', submitBtn instanceof Button);
    console.log('- Is Control?', submitBtn instanceof Control);
    console.log('- Is Component?', submitBtn instanceof Component);
  });

  