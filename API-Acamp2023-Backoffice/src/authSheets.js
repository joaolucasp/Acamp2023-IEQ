const { google, appengine_v1alpha } = require('googleapis');

//Method to get the auth and the sheets
async function getAuthSheets() {
    const auth = new google.auth.GoogleAuth({
        keyFile: './credentials.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({
        version: 'v4',
        auth: client,
    })

    const spreadsheetId = "1VcvNguUvQJrh8nstwFvdyeT4xBIIm4v9_EhmknLkqwQ";

    return {
        auth,
        client,
        googleSheets,
        spreadsheetId,
    };
}

async function accessSpreadsheet() {
    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

    return await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Página1!A2:Y1000",
    });
}

module.exports = {getAuthSheets, accessSpreadsheet}

