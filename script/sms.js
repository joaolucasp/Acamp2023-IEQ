let key = "2RXL23O8JMDGBI7P5UZNFT6MGIICY5MWSKUIB1MZX2WTSER53IIKXPCI9FX08A5B68YNKTP3WWG78YSJ01XVVYE10SJJCRB4AVGC8H80FZS5O42AHUW49KD70I7WL177"
let type = "9"
let number = `${camping_person.ddd}${camping_person.numero_telefone}`
let txt = "Uhuul 😃 " + camping_person.apelido + ",\\nAgora só falta realizar o pagamento de R$ 300,00 para garantir sua vaga!\\nAcamp Deeper 2023"

let url = `https://api.smsdev.com.br/v1/send?key=${key}&type=${type}&number=${number}&msg=${txt}`;

var xhttp = new XMLHttpRequest();

xhttp.open("GET", url, true);
xhttp.send();
// console.log(url);
