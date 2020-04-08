/* Password validation rules:
    * Letters & numbers & only these symbols !@#$&*
    * Must have at least 1 letter, 1 number and 1 of the above symbols
    * Can't have 3 consecutive numbers in accending order, example 123 or 890
*/
var MyInput = class extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById('my-input');
    const templateContent = template.content;

    this.el = this.attachShadow({mode: 'open'});
    this.el.appendChild(templateContent.cloneNode(true));
     
    this.inputEl = this.el.querySelector('#input');
    /* 
     * showing the password field if showPassword attribute present
     */
    if (this.getAttribute('showPassword')) { 
       this.el.querySelector('#passwordField').parentElement.remove();       
     } else {
       this.inputEl.setAttribute("maxlength", "8"); // Adding max length for password field
     }   
  }

  connectedCallback() {
    this.el.querySelector('#input').addEventListener('keyup', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    const isValid = this.validate();
    if (!isValid) {
      if (this.el.querySelector('[name=validation-type]:checked').value === 'number') {
        this.inputEl.setCustomValidity('Only numbers');
      } else if (this.el.querySelector('[name=validation-type]:checked').value === 'letter') {
        this.inputEl.setCustomValidity('Only letters');
      } else {
        this.inputEl.setCustomValidity('Must have at least 1 letter, 1 number and 1 of the these !@#$& symbols');
      }
      this.inputEl.reportValidity();
    } else {
      this.inputEl.setCustomValidity('');
      this.inputEl.reportValidity();
    }
  }

  validate() {
    if (this.el.querySelector('[name=validation-type]:checked').value === 'number') {
      if (/[^0-9]/.test(this.inputEl.value)) return false;
    } else if (this.el.querySelector('[name=validation-type]:checked').value === 'letter') {
      if (/[^a-zA-Z]/.test(this.inputEl.value)) return false;
    } else {
      return /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$&*]).{8}$/ .test(this.inputEl.value);      
    }
    return true;  
  }
}
customElements.define('my-input', MyInput);