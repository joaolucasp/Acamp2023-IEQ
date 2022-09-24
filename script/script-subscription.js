/*Funções que fazem verificações (não validações) de campos vazios*/ 

function checkFields() {
   /*Essa função deve ser responsável por checar os campos antes de avançar para a proxima etapa (ou quando clicar no botao de avançar*/ 
}


function removeInvalid(id) {
    /*Essa função deve ser responsável por remover a classe INVALID quando o usuário alterar o valor do campo*/
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
var birthDateElement = document.getElementById('data-nascimento');
var dataToday = new Date();

birthDateElement.onchange = function () {
    var birthDate = new Date(String(birthDateElement.value));
    var age = calculateAge(birthDate, dataToday);

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