/*Funções que fazem verificações (não validações) de campos vazios*/ 
const carousel_form = document.querySelector('#carouselForms');
const carousel = bootstrap.Carousel.getOrCreateInstance(carousel_form);

function checkFields(control, position) {
    /*Essa função deve ser responsável por checar os campos antes de avançar para a proxima etapa (ou quando clicar no botao de avançar*/ 
   
    const section_active = "#" + carousel._getActive().id;
    const class_fields_section_active = getFieldsActiveSection(section_active);
    var fields_section_active = document.querySelectorAll(class_fields_section_active, section_active);
    var filled_fields = true;

    //Assign validations
    for(let i = 0; i < fields_section_active.length; i++){
        if(fields_section_active[i].value == '' && fields_section_active[i].hasAttribute('required')){
            enableIsInvalid(fields_section_active[i].id)
            filled_fields = false;
        } else if(fields_section_active[i].value != '' && fields_section_active[i].hasAttribute('required')) {
            enableIsValid(fields_section_active[i].id)
        }
    }

    //Checks if all fields are filled
    if(filled_fields && control == "next"){
        carousel.next();
    }
    if(control == "prev"){
        carousel.prev();
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

/*Funções responsáveis por exibir um componente baseado em uma informação*/
document.getElementById('igreja').onchange = function(){
    if(igreja.value == 'outra-igreja') {
        enableComponent('outra-igreja')
        enableRequired('outra-igreja')
    } else {
        disableComponent('outra-igreja')
        disableRequired('outra-igreja')
    }
};

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
/*-----------------------------------------------------------------------*/

/*Funções responsáveis por atribuir o atributo de required à elementos especificos*/
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


/*Funções responsáveis pela exibicação de alguns itens baseado na idade*/
var birth_date_element = document.getElementById('data-nascimento');
var data_today = new Date();

birth_date_element.onchange = function () {
    var birth_date = new Date(String(birth_date_element.value));
    var age = calculateAge(birth_date, data_today);

    if(age >= 18) {
        disableComponent('nome-responsavel');
        disableComponent('rg-responsavel')

        disableRequired('nome-responsavel');
        disableRequired('rg-responsavel');
    } else {
        enableComponent('nome-responsavel');
        enableComponent('rg-responsavel') 

        enableRequired('nome-responsavel');
        enableRequired('rg-responsavel');
    }
}

function calculateAge(birth, today){
    return Math.floor(Math.ceil(Math.abs(birth.getTime() - today.getTime()) / (1000 * 3600 * 24)) / 365.25);
}
/*-----------------------------------------------------------------------*/