function generateID(lengthID) {
    const characteres = "0123456789ABCDEFGHIJLMNOPQRSTUVWXYZ";
    let stringID = "";

    for (let i = 0; i < lengthID; i++) {
        var randomNumber = Math.floor(Math.random() * characteres.length);
        stringID += characteres.substring(randomNumber, randomNumber + 1);
    }

    return stringID;
}

module.exports = {generateID}