const form = document.querySelector('form');
const textInputs = document.querySelectorAll('input');
const typeContainers = document.querySelectorAll('.typeContainer');
const consentBox = document.querySelector('.consentDiv .customRadio');
const consentCheckbox = document.getElementById('consentCheckbox');

consentBox.addEventListener('click', function(){
    consentBox.classList.toggle('active')
    consentCheckbox.checked = !consentCheckbox.checked
});

const radioChecks = document.getElementsByName('queryType');
const formSubmissionConfirmation = document.querySelector('.formSubmissionConfirmation');
form.addEventListener('submit', function(event){
    event.preventDefault()
    validateInputs()
});

//----------------------------- QUERY TYPE CODE --------------------------------------------

typeContainers.forEach(typeContainer => typeContainer.addEventListener('click', function(){
    toggleActive(typeContainer) 
}));

function toggleActive(clickedType){
    typeContainers.forEach(typeContainer => {

        const customRadio = typeContainer.querySelector('.customRadio')
        const radioInner = customRadio.querySelector('.radioInner')
        const radio = typeContainer.querySelector('input')

        if (typeContainer === clickedType) {

            typeContainer.classList.add('active');
            customRadio.classList.add('active')
            radioInner.classList.add('active')
            radio.checked = true      
        } 
        else {

            typeContainer.classList.remove('active');
            customRadio.classList.remove('active')
            radioInner.classList.remove('active')
        }
    });   
};

function validateInputs(){
   
    const inputs = form.elements
    let textValid = true;
    let radioValid = false;
    let checkboxValid = false;
    let textareaValid = true;
    let emailValid = true;

    for(let input of inputs){
        if(input.type === 'radio'){
            if(input.checked){
               radioValid = true;
            }
        }
        else if(input.type === 'text'){
            if(input.value.trim() === ''){
                textValid = false;
                input.parentElement.querySelector('.errorMessage').style.display = 'block'
                input.classList.add('error')
            }else{
                input.parentElement.querySelector('.errorMessage').style.display = 'none'
                input.classList.remove('error')
            }
        }else if(input.type === 'checkbox'){
            if(input.checked){
                checkboxValid = true;
            }
        }else if(input.tagName.toLowerCase() === 'textarea'){
            if(input.value.trim() === ''){
                textareaValid = false;
                input.parentElement.querySelector('.errorMessage').style.display = 'block'
                input.classList.add('error')
            }else{
                input.parentElement.querySelector('.errorMessage').style.display = 'none'
                input.classList.remove('error')
            }
        }else if(input.type === 'email'){
            if(input.value.trim() === ''){
                emailValid = false;
                input.parentElement.querySelector('.errorMessage').style.display = 'block'
                input.classList.add('error')
            }else if(!validateEmail(input.value)){
                input.parentElement.querySelector('.errorMessage').style.display = 'block'
                input.classList.add('error')
            }else{
                input.parentElement.querySelector('.errorMessage').style.display = 'none'
                input.classList.remove('error')
            }
        }
    }

    const radioError = document.querySelector('.radioError')
    const checkboxError = document.querySelector('.checkboxError')

    if(!radioValid){
      radioError.style.display = 'block'
    }else{
        radioError.style.display = 'none'
    }
    if(!checkboxValid){
        checkboxError.style.display = 'block'
    }else{
        checkboxError.style.display = 'none'
    }
    
    const formSubmissionConfirmation = document.querySelector('.formSubmissionConfirmation')

    if(textValid && radioValid && checkboxValid && textareaValid && emailValid){
        formSubmissionConfirmation.style.display = 'block'
        setTimeout(resetForm, 5000)
    }else{
        return
    }
};

function validateEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(email).toLowerCase());
};

function resetForm(){
    formSubmissionConfirmation.style.display = 'none'
    consentBox.classList.remove('active')
    form.reset()

    const customRadio = document.querySelectorAll('.customRadio')
    const radioInner = document.querySelectorAll('.radioInner')
    
    customRadio.forEach(customRadio =>{
        customRadio.classList.remove('active')
    });

    radioInner.forEach(radioInner =>{
     radioInner.classList.remove('active')
    });

    typeContainers.forEach(typeContainers =>{
        typeContainers.classList.remove('active')
    });
};



/*

// Cache DOM elements
const form = document.querySelector('form');
const typeContainers = document.querySelectorAll('.typeContainer');
const consentBox = document.querySelector('.consentDiv .customRadio');
const consentCheckbox = document.getElementById('consentCheckbox');
const formSubmissionConfirmation = document.querySelector('.formSubmissionConfirmation');
const radioError = document.querySelector('.radioError');
const checkboxError = document.querySelector('.checkboxError');

// Event listeners
consentBox.addEventListener('click', toggleConsent);
form.addEventListener('submit', handleFormSubmission);

// Toggle consent checkbox and styling
function toggleConsent() {
    consentBox.classList.toggle('active');
    consentCheckbox.checked = !consentCheckbox.checked;
}

// Event delegation for typeContainers
form.addEventListener('click', function(event) {
    if (event.target.classList.contains('typeContainer')) {
        toggleActive(event.target);
    }
});

// Toggle active class for typeContainers
function toggleActive(clickedType) {
    typeContainers.forEach(typeContainer => {
        const customRadio = typeContainer.querySelector('.customRadio');
        const radioInner = customRadio.querySelector('.radioInner');
        const radio = typeContainer.querySelector('input');

        if (typeContainer === clickedType) {
            typeContainer.classList.add('active');
            customRadio.classList.add('active');
            radioInner.classList.add('active');
            radio.checked = true;
        } else {
            typeContainer.classList.remove('active');
            customRadio.classList.remove('active');
            radioInner.classList.remove('active');
        }
    });
}

// Form submission handling
function handleFormSubmission(event) {
    event.preventDefault();
    validateInputs();
}

// Validate form inputs
function validateInputs() {
    const inputs = form.elements;
    let textValid = true;
    let radioValid = false;
    let checkboxValid = false;
    let textareaValid = true;
    let emailValid = true;

    for (let input of inputs) {
        if (input.type === 'radio') {
            if (input.checked) {
                radioValid = true;
            }
        } else if (input.type === 'text') {
            if (input.value.trim() === '') {
                textValid = false;
                showErrorMessage(input);
            } else {
                hideErrorMessage(input);
            }
        } else if (input.type === 'checkbox') {
            if (input.checked) {
                checkboxValid = true;
            }
        } else if (input.tagName.toLowerCase() === 'textarea') {
            if (input.value.trim() === '') {
                textareaValid = false;
                showErrorMessage(input);
            } else {
                hideErrorMessage(input);
            }
        } else if (input.type === 'email') {
            if (input.value.trim() === '') {
                emailValid = false;
                showErrorMessage(input);
            } else if (!validateEmail(input.value)) {
                emailValid = false;
                alert('Invalid email format');
            } else {
                hideErrorMessage(input);
            }
        }
    }

    // Display radio and checkbox errors
    radioError.style.display = radioValid ? 'none' : 'block';
    checkboxError.style.display = checkboxValid ? 'none' : 'block';

    // Display form submission confirmation if all inputs are valid
    if (textValid && radioValid && checkboxValid && textareaValid && emailValid) {
        formSubmissionConfirmation.style.display = 'block';
        setTimeout(resetForm, 5000);
    }
}

// Validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(email).toLowerCase());
}

// Display error message for an input
function showErrorMessage(input) {
    input.parentElement.querySelector('.errorMessage').style.display = 'block';
    input.classList.add('error');
}

// Hide error message for an input
function hideErrorMessage(input) {
    input.parentElement.querySelector('.errorMessage').style.display = 'none';
    input.classList.remove('error');
}

// Reset form after submission
function resetForm() {
    formSubmissionConfirmation.style.display = 'none';
    consentBox.classList.remove('active');
    form.reset();

    // Remove active classes from custom radios and typeContainers
    document.querySelectorAll('.customRadio.active').forEach(customRadio => {
        customRadio.classList.remove('active');
    });

    document.querySelectorAll('.radioInner.active').forEach(radioInner => {
        radioInner.classList.remove('active');
    });

    document.querySelectorAll('.typeContainer.active').forEach(typeContainer => {
        typeContainer.classList.remove('active');
    });
}
*/

