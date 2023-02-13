
// Method that queries a User based on ID
function findID(rows, id) {
    return setJSONObject(rows.data.values.filter(row => row[0].toLowerCase() == id.toLowerCase()));
}

// Method that queries a User based on Name
function findName(rows, name) {
    const nameFetched = removeCaseSensitive(name);

    return setJSONObject(rows.data.values.filter(row => removeCaseSensitive(`${row[1]} ${row[2]}`).includes(nameFetched)));
}

// Method that queries a User based on Name
function findStatusPayment(rows, status, church) {
    let result = rows.data.values;

    if (church) {
        result = rows.data.values.filter((row) =>
            row[19] == church
        );
    }

    if (status != "ALL") {
        result = result.filter((row) =>
            row[23] == status
        );
    }

    return setJSONObject(result);
}

// Method that queries users' check-in status
function findCheckin(rows, checkin) {
    if (checkin == "true") {
        return setJSONObject(rows.data.values.filter((row) =>
            row[24]
        ));
    }

    return setJSONObject(rows.data.values.filter((row) =>
        !row[24]
    ));
}

// Methods Auxiliares
function removeCaseSensitive(string) {
    return string.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

function setJSONObject(rows) {
    let ObjectJSON = [];

    rows.forEach(row => {
        ObjectJSON.push({
            ID: row[0],
            Nome: row[1],
            Sobrenome: row[2],
            Apelido: row[3],
            DataNascimento: row[4],
            NomeAcompanhante: row[5],
            RG: row[6],
            CPF: row[7],
            NomeResponsavel: row[8],
            RGResponsavel: row[9],
            DDD: row[10],
            Telefone: row[11],
            Email: row[12],
            CEP: row[13],
            Logradouro: row[14],
            Numero: row[15],
            Bairro: row[16],
            Cidade: row[17],
            Estado: row[18],
            Igreja: row[19],
            OutraIgreja: row[20],
            Alergias: row[21],
            Remedios: row[22],
            Pagamento: row[23],
            Checkin: row[24]
        });
    });

    return ObjectJSON;
}

module.exports = {findID, findName, findStatusPayment, findCheckin, removeCaseSensitive, setJSONObject}