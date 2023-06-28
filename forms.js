document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');
    form.reset();

    const certificationContainer = document.getElementById('cert-container');
    const yearContainer = document.getElementById('year-container');
    const courseContainer = document.getElementById('course-container');
    const addFieldButton = document.getElementById('add-field-button');

    // Generate unique IDs for the added fields
    let fieldCounter = 1;

    function add_cert_field() {
        const field = document.createElement('div');
        field.innerHTML = `
        <div class="new-input-fields">
            <label for="certification-${fieldCounter}">Certification:</label>
            <select id="certification-${fieldCounter}">
                <option value="associates">Associate's Degree</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">PhD</option>
            </select>
        </div>
        `;
        certificationContainer.appendChild(field);
    }

    function add_year_field() {
        const field = document.createElement('div');
        field.innerHTML = `
        <div class="new-input-fields">
            <label for="year-${fieldCounter}">Year:</label>
            <input type="number" id="year-${fieldCounter}" min="1" placeholder="Select the year" required>
        </div>
        `;
        yearContainer.appendChild(field);
    }

    function add_course_field() {
        const field = document.createElement('div');
        field.innerHTML = `
        <div class="new-input-fields">
            <label for="course-${fieldCounter}">Course:</label>
            <input type="text" id="course-${fieldCounter}" placeholder="Enter your course" required>
        </div>
        `;
        courseContainer.appendChild(field);
    }

    // Attach blur event listener to a specific input field
    function attachBlurEventListener(input) {
        input.addEventListener('blur', function () {
            validateInput(this);
        });
    }

    // Event listener for adding new fields
    addFieldButton.addEventListener('click', function () {
        add_cert_field();
        add_year_field();
        add_course_field();

        // Attach blur event listener to newly added input fields
        const newCertificationField = document.getElementById(`certification-${fieldCounter}`);
        const newYearField = document.getElementById(`year-${fieldCounter}`);
        const newCourseField = document.getElementById(`course-${fieldCounter}`);

        attachBlurEventListener(newCertificationField);
        attachBlurEventListener(newYearField);
        attachBlurEventListener(newCourseField);

        fieldCounter++;
    });

    // Attach blur event listener to initial input fields
    const inputFields = document.querySelectorAll('input[required], select[required]');
    inputFields.forEach(function (input) {
        attachBlurEventListener(input);
    });

    // Validate input fields
    function validateInput(input) {
        if (input.value.trim() === '') {
            input.classList.add('error');
            showErrorMessage(input, 'This field is required.');
        } else {
            input.classList.remove('error');
            hideErrorMessage(input);
        }
    }

    function showErrorMessage(input, message) {
        var errorContainer = input.parentNode.querySelector('.error-message');
        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.className = 'error-message';
            input.parentNode.appendChild(errorContainer);
        }
        errorContainer.textContent = message;
    }

    function hideErrorMessage(input) {
        var errorContainer = input.parentNode.querySelector('.error-message');
        if (errorContainer) {
            errorContainer.parentNode.removeChild(errorContainer);
        }
    }
    
    //live email validation
    const emailInput = document.getElementById('email');

    emailInput.addEventListener('input', validateEmail);

    function validateEmail() {
      const email = emailInput.value;
      const requiredErrorMessage = emailInput.parentNode.querySelector('.error-message');
    
      if (requiredErrorMessage) {
        requiredErrorMessage.remove();
      }
    
      if (email === '') {
        return;
      }
    
      if (!isValidEmail(email)) {
        showErrorMessage(emailInput, 'Invalid email address');
      } else {
        hideErrorMessage(emailInput);
      }
    }

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    //live phone number validation
    const phoneInput = document.getElementById('phone');

    phoneInput.addEventListener('input', validatePhoneNumber);

    function validatePhoneNumber() {
      const phoneNumber = phoneInput.value;
      const requiredErrorMessage = phoneInput.parentNode.querySelector('.error-message');
    
      if (requiredErrorMessage) {
        requiredErrorMessage.remove();
      }
    
      if (phoneNumber === '') {
        return;
      }
    
      if (!isValidPhoneNumber(phoneNumber)) {
        showErrorMessage(phoneInput, 'Invalid phone number');
      } else {
        hideErrorMessage(phoneInput);
      }
    }

    function isValidPhoneNumber(phoneNumber) {
      const phoneRegex = /^7[1-7][0-9]{6}$/;
      return phoneRegex.test(phoneNumber);
    }
});
