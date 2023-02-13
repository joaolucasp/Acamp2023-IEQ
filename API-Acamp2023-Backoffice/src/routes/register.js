const authSheets = require('../authSheets');
const find = require('../controllers/findController');
const checkBody = require('../controllers/bodyRequestController');
const idGenerator = require('../controllers/idController');
const express = require('express');

const router = express.Router();

// Method to addUser
router.post('/addUser', async (req, res) => {
    try {
        const { googleSheets, auth, spreadsheetId } = await authSheets.getAuthSheets();
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

        const row = googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Página1",
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
            }
        });

        res.status(201).send({
            statusCode: 201,
            message: "User created successfully!",
            data: values
        });

    } catch (ERROR) {
        res.status(500).send("Internal Server Error");
    }
});

// Method to generate ID's
router.post('/generateID', async (req, res) => {
    try {
        const { googleSheets, auth, spreadsheetId } = await authSheets.getAuthSheets();
        const allRows = await authSheets.accessSpreadsheet();
        const allRowsLength = allRows.data.values.length;

        const updatedRows = await googleSheets.spreadsheets.values.update({
            auth,
            spreadsheetId,
            range: `Página1!A${2}:A${allRowsLength + 2}`,
            valueInputOption: "USER_ENTERED",
            resource: {
                values: allRows.data.values.map((row) => {
                    if (row[0] == "") {
                        return [idGenerator.generateID(4)];
                    }
                    return [row[0]];
                })
            }
        });

        res.status(201).send("Success generating ID's.");

    } catch (ERROR) {
        res.status(500).send("Internal Server Error");
    }
});

// Method to register a checkin of a user specifying ID
router.post('/checkin/:id', async (req, res) => {
    try {
        const { googleSheets, auth, spreadsheetId } = await authSheets.getAuthSheets();
        const rows = await authSheets.accessSpreadsheet();
        const { values } = req.body;
        const IDRowIndex = rows.data.values.findIndex((row) => row[0] === req.params.id) + 2;

        if (find.findID(rows, req.params.id).length == 0) {
            res.status(404).send("User not found");
            return;
        }

        const updateRow = await googleSheets.spreadsheets.values.update({
            auth,
            spreadsheetId,
            range: `Página1!Y${IDRowIndex}:Y${IDRowIndex}`,
            valueInputOption: "USER_ENTERED",
            resource: {
                values: values
            },
        });

        res.status(201).send({
            statusCode: 201,
            message: "Checkin created successfully!",
            data: values
        });

    } catch (ERROR) {
        console.log(ERROR)
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;