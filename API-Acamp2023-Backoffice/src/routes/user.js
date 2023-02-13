const authSheets = require('../authSheets');
const find = require('../controllers/findController');
const checkBody = require('../controllers/bodyRequestController');
const express = require('express');

const router = express.Router();

router.get('/getUsers', async (req, res) => {
  try {
    const rows = await authSheets.accessSpreadsheet();
    let content = [];
    let query = req.query;

    if (query.name) {
      content = find.findName(rows, query.name);

    } else if (query.checkin) {
      content = find.findCheckin(rows, query.checkin);

    } else {
      content = rows.data.values.map((row) => {
        return {
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
          Checkin: row[24],
        };
      });
    }

    const response = JSON.stringify({
      totalItems: content.length,
      data: content
    })

    res.status(200).send(JSON.parse(response));

  } catch (ERROR) {
    res.status(500).send("Internal Server Error");
  }
});

router.get('/getSingleUser/:id', async (req, res) => {
  try {
    const rows = await authSheets.accessSpreadsheet();
    const content = find.findID(rows, req.params.id);

    const response = JSON.stringify({
      data: content
    });

    if (content.length == 0) {
      res.status(404).send("User not found");
      return;
    }

    res.status(200).send(JSON.parse(response));

  } catch (ERROR) {
    res.status(500).send("Internal Server Error");
  }
});

router.patch('/updateUser/:id', async (req, res) => {
  try {
    const { googleSheets, auth, spreadsheetId } = await authSheets.getAuthSheets();
    const rows = await authSheets.accessSpreadsheet();
    const IDRowIndex = rows.data.values.findIndex((row) => row[0] === req.params.id) + 2;

    const values = req.body;
    const statusBody = checkBody.checkJSONBody(Object.keys(req.body));

    if (statusBody.length > 0) {
      res.status(400).send({
        statusCode: 400,
        message: statusBody,
        error: "Bad Request"
      });
      return;
    }

    if (find.findID(rows, req.params.id).length == 0) {
      res.status(404).send("User not found");
      return;
    }

    const updateRow = await googleSheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: `Página1!A${IDRowIndex}:Y${IDRowIndex}`,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[
          values.ID,
          values.Nome,
          values.Sobrenome,
          values.Apelido,
          values.DataNascimento,
          values.NomeAcompanhante,
          values.RG,
          values.CPF,
          values.NomeResponsavel,
          values.RGResponsavel,
          values.DDD,
          values.Telefone,
          values.Email,
          values.CEP,
          values.Logradouro,
          values.Numero,
          values.Bairro,
          values.Cidade,
          values.Estado,
          values.Igreja,
          values.OutraIgreja,
          values.Alergias,
          values.Remedios,
          values.Pagamento,
          values.Checkin,
        ]],
      },
    });

    res.status(201).send({
      statusCode: 201,
      message: "User updated successfully!",
      data: values
    });

  } catch (ERROR) {
    console.log(ERROR)
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;