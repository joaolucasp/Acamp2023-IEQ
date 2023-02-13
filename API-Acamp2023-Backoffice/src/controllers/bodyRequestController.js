
// Method responsible for checking the request body
function checkJSONBody(bodyRequest) {
    let bodyRequestFields = [];
    const expectedBodyFields = ["ID", "Nome", "Sobrenome", "Apelido", "DataNascimento", "NomeAcompanhante", "RG", "CPF", "NomeResponsavel", "RGResponsavel", "DDD", "Telefone", "Email", "CEP", "Logradouro", "Numero", "Bairro", "Cidade", "Estado", "Igreja", "OutraIgreja", "Alergias", "Remedios", "Pagamento", "Checkin"];

    expectedBodyFields.forEach((field) => {
        if (!bodyRequest.find(field2 => field2 == field)) {
            bodyRequestFields.push(`The field ${field} is missing.`);
        }
    })

    return bodyRequestFields;
}

module.exports = {checkJSONBody}