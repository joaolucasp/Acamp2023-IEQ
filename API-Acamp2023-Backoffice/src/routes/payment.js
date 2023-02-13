const auth = require('../authSheets');
const find = require('../controllers/findController');
const express = require('express');

const router = express.Router();

router.get('/getPayments/:status', async (req, res) => {
  try {
    const rows = await auth.accessSpreadsheet();
    let content = find.findStatusPayment(rows, req.params.status, req.query.church);

    const response = JSON.stringify({
      totalItems: content.length,
      data: content
    })

    res.status(200).send(JSON.parse(response));

  } catch (ERROR) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;