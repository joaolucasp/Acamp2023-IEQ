
/*Events that enable or disable form buttons and change progress bar*/ 
const carousel_form = document.querySelector('#carouselForms');
const carousel = bootstrap.Carousel.getOrCreateInstance(carousel_form);

carousel_form.addEventListener('slid.bs.carousel', event => {
    if (event.to == 0) {
        disableComponent('carousel-control-prev');
    } else if(event.to == 1){
        enableComponent('carousel-control-prev');
    } else if(event.to == 4){
        disableComponent('carousel-control-next');
    } else {
        enableComponent('carousel-control-prev');
        enableComponent('carousel-control-next');
    }

    if(event.to != 4) changeProgressBar(event.to);
})

function changeProgressBar(size){
    document.querySelectorAll(".form-stepper-list").forEach((formStepHeader) => {
        formStepHeader.classList.add("form-stepper-unfinished");
        formStepHeader.classList.remove("form-stepper-active", "form-stepper-completed");
    });
    const formStepCircle = document.querySelector('li[step="' + size + '"]');


    formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-completed");
    formStepCircle.classList.add("form-stepper-active");

    for (let index = 0; index < size; index++) {
        /**
         * Select the form step circle (progress bar).
         */
        const formStepCircle = document.querySelector('li[step="' + index + '"]');
        /**
         * Check if the element exist. If yes, then proceed.
         */
        if (formStepCircle) {
            /**
             * Mark the form step as completed.
             */
            formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-active");
            formStepCircle.classList.add("form-stepper-completed");
        }
    }
}
/*-----------------------------------------------------------------------*/


/*This method is responsible for checking and validating the filling of the fields*/ 
function checkFields(control) {
    if(control == "prev"){
        carousel.prev();
        return;
    }
   
    const section_active = "#" + carousel._getActive().id;
    const class_fields_section_active = getFieldsActiveSection(section_active);
    var fields_section_active = document.querySelectorAll(class_fields_section_active, section_active);
    var filled_fields = true;

    //Assign validations
    for(let i = 0; i < fields_section_active.length; i++){
        var required_field = Boolean(fields_section_active[i].hasAttribute('required'));

        if(!validateFieldSize(fields_section_active[i]) && required_field){
            enableIsInvalid(fields_section_active[i].id)
            fields_section_active[i].classList.add('shake')
            filled_fields = false;
            
        } else if(validateFieldSize(fields_section_active[i]) && required_field) {
            enableIsValid(fields_section_active[i].id)
        }
    }

    //Checks if all fields are filled
    if(filled_fields && control == "next"){
        carousel.next();
    }  
}

function getFieldsActiveSection (section){
    switch (section) {
        case "#section-1":
            return ".field-section-1"
        case "#section-2":
            return ".field-section-2"
        case "#section-3":
            return ".field-section-3"
        case "#section-4":
            return ".field-section-4"
        default:
            return "not-found"
    }
}

function validateFieldSize(field){
    var field_inputmode = field.getAttribute('inputmode')
    var field_length = field.value.length;
    var minimum_field_length = field.getAttribute('minlength');
    var maximum_field_length = field.getAttribute('maxlength');

    if(field_inputmode == 'text') {
        return Boolean(field_length >= minimum_field_length)
    } else if(field_inputmode == 'numeric') {
        return Boolean(field_length >= minimum_field_length && field_length <= maximum_field_length)
    } else if(field_inputmode == 'date' || field_inputmode == 'select' || field_inputmode == 'email') {
        return Boolean(field.value != '')
    }
}
/*-----------------------------------------------------------------------*/


/*Methods responsible for adding or removing validation classes to fields*/
function enableIsValid(id) {
    //First check if you don't have the invalid class applied to the field
    if(document.getElementById(id).classList.contains('is-invalid')){
        document.getElementById(id).classList.remove('is-invalid')
    }
    //Activate the "is-valid" class
    if(!(document.getElementById(id).classList.contains('is-valid'))){
        document.getElementById(id).classList.add('is-valid')
    }
}

function enableIsInvalid(id) {
    //First check if you don't have the valid class applied to the field
    if(document.getElementById(id).classList.contains('is-valid')){
        document.getElementById(id).classList.remove('is-valid')
    }
    //Activate the "is-invalid" class
    if(!(document.getElementById(id).classList.contains('is-invalid'))){
        document.getElementById(id).classList.add('is-invalid')
    }
}

function removeInvalid(){
    const section_active = "#" + carousel._getActive().id;
    const fields_section_active = getFieldsActiveSection(section_active);
    var fields = document.querySelectorAll(fields_section_active, section_active);

    //Assign validations
    for(let i = 0; i < fields.length; i++){
        if(fields[i].value != '' ){
            if(fields[i].classList.contains('is-invalid')){
                fields[i].classList.remove('is-invalid')
            }
        } 
    }
}
/*-----------------------------------------------------------------------*/


/*Methods responsible for enabling or disabling HTML elements*/
function disableComponent(id) {
    if(!(document.getElementById(id).classList.contains('d-none'))){  
        document.getElementById(id).classList.add('d-none');
    }
}

function enableComponent(id) {
    if(document.getElementById(id).classList.contains('d-none')){   
        document.getElementById(id).classList.remove('d-none');
    }
}
/*-----------------------------------------------------------*/


/*Methods responsible for adding the 'required' attribute to HTML elements*/
function enableRequired(id) {
    if(!document.getElementById(id).hasAttribute('required')){
        document.getElementById(id).setAttribute('required','')
    }
}

function disableRequired(id) {
    if(document.getElementById(id).hasAttribute('required')){
        document.getElementById(id).removeAttribute('required')
    }
}
/*---------------------------------------------------------------------------------*/


/*Method responsible for enabling the 'outra-igreja' field*/
document.getElementById('igreja').onchange = function(){
    if(igreja.value == 'outra-igreja') {
        enableComponent('outra-igreja')
        enableComponent('label-outra-igreja')
        enableRequired('outra-igreja')
    } else {
        disableComponent('outra-igreja')
        disableComponent('label-outra-igreja')
        disableRequired('outra-igreja')
    }
};
/*-----------------------------------------------------------------------*/


/*Method called based on participant's date of birth*/
var birth_date_element = document.getElementById('data-nascimento');
var today_date = new Date();

birth_date_element.onchange = function () {
    var birth_date = new Date(String(birth_date_element.value));
    var age = calculateAge(birth_date, today_date);

    if(age >= 18) {
        disableComponent('nome-responsavel');
        disableComponent('label-nome-responsavel')
        disableComponent('rg-responsavel')
        disableComponent('label-rg-responsavel')

        disableRequired('nome-responsavel');
        disableRequired('rg-responsavel');
    } else {
        enableComponent('nome-responsavel');
        enableComponent('label-nome-responsavel')
        enableComponent('rg-responsavel')
        enableComponent('label-rg-responsavel')

        enableRequired('nome-responsavel');
        enableRequired('rg-responsavel');
    }
}

function calculateAge(birth, today){
    return Math.floor(Math.ceil(Math.abs(birth.getTime() - today.getTime()) / (1000 * 3600 * 24)) / 365.25);
}
/*-----------------------------------------------------------------------*/

/*Instance of the subscribed object (performed only after confirmation of the subscription)*/
const submit_button = document.querySelector("#submitButton");

submit_button.addEventListener("click", event => {
    var all_fields = document.querySelectorAll('.field');
    var data_set = [];

    all_fields.forEach((current_field) => {
        data_set.push(current_field.value);
    })

    localStorage.setItem('registered', JSON.stringify(data_set));
})
/*-----------------------*/